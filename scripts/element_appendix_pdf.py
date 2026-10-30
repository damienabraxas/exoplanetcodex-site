#!/usr/bin/env python3
"""Paginated, deterministic PDF export of a generated element report (any target/ion).

Input schema codex.element_appendix/1 carries the generated semantic HTML body,
identity and provenance. No abundance selection, recalculation or Fe-specific code.
"""
import argparse
import io
import json
import re
from html import escape
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote

from bs4 import BeautifulSoup, NavigableString
from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, Flowable

import codex_doc_brand as brand

SCHEMA = 'codex.element_appendix/1'
VERSION = '1.0.0'


def make_report(title, target, element, ion, body, metadata, products):
    return dict(schema=SCHEMA, title=title, target=target, element=element, ion=ion,
                site_url='https://exoplanetcodex.org/', metadata=metadata,
                products=products, body_html=body)


class ForestTrack(Flowable):
    """Vector rendering of the same positioned marks used by the website."""
    def __init__(self, marks, experimental=False, width=165):
        super().__init__()
        self.marks, self.experimental = marks, experimental
        self.width, self.height = width, 24

    def draw(self):
        c = self.canv
        c.setStrokeColor(colors.HexColor('#d5dce1'))
        c.line(0, 1, self.width, 1)
        primary = colors.HexColor('#be4a20' if self.experimental else '#1673a2')
        for m in self.marks:
            css = dict(re.findall(r'([\w-]+):\s*([^;]+)', m.get('style', '')))
            x = float(css.get('left', '0%').rstrip('%')) * self.width / 100
            w = float(css.get('width', '0%').rstrip('%')) * self.width / 100
            cls = m.get('class', [''])[0]
            c.saveState()
            c.setLineWidth(.7)
            if cls in ['ref', 'cmpband']:
                c.setFillColor(colors.HexColor('#dfefe3' if cls == 'ref' else '#f6edcf'))
                c.setStrokeColor(colors.HexColor('#438553' if cls == 'ref' else '#a07818'))
                c.rect(x, 3, max(w, .5), 18, fill=1, stroke=1)
            elif cls in ['refline', 'cmp']:
                c.setStrokeColor(colors.HexColor('#438553' if cls == 'refline' else '#a07818'))
                c.line(x, 3, x, 21)
            elif cls == 'sysbar':
                c.setStrokeColor(primary); c.setDash(2, 1)
                c.rect(x, 7, max(w, .5), 10, fill=0, stroke=1)
            elif cls == 'bar':
                c.setFillColor(primary); c.rect(x, 10, max(w, .5), 4, fill=1, stroke=0)
            elif cls == 'dot':
                c.setFillColor(primary); c.circle(x, 12, 2.7, fill=1, stroke=0)
            c.restoreState()


def render_pdf(report, output, site_root):
    if report['schema'] != SCHEMA:
        raise ValueError('Unsupported appendix report schema')
    import matplotlib
    font_dir = Path(matplotlib.get_data_path()) / 'fonts/ttf'
    for name, file in [('Appendix', 'DejaVuSans.ttf'), ('AppendixBold', 'DejaVuSans-Bold.ttf')]:
        if name not in pdfmetrics.getRegisteredFontNames():
            pdfmetrics.registerFont(TTFont(name, str(font_dir / file)))
    pdfmetrics.registerFontFamily('Appendix', normal='Appendix', bold='AppendixBold', italic='Appendix', boldItalic='AppendixBold')
    rl_config.invariant = 1
    body_style = ParagraphStyle('body', fontName='Appendix', fontSize=9, leading=13, spaceAfter=7,
                                textColor=colors.HexColor('#23313d'), splitLongWords=True)
    small = ParagraphStyle('small', parent=body_style, fontSize=7.5, leading=10, spaceAfter=2)
    heading = ParagraphStyle('heading', parent=body_style, fontName='AppendixBold', fontSize=13,
                             leading=17, spaceBefore=13, spaceAfter=7, keepWithNext=True)
    subhead = ParagraphStyle('subhead', parent=heading, fontSize=10, leading=14, spaceBefore=8)
    width = A4[0] - 80
    story = []
    soup = BeautifulSoup(report['body_html'], 'html.parser')

    def markup(node):
        if isinstance(node, NavigableString):
            return escape(str(node))
        if node.name == 'br': return '<br/>'
        content = ''.join(markup(c) for c in node.children)
        if node.name in ['b', 'strong']: return '<b>'+content+'</b>'
        if node.name == 'small' and node.find_parent('table'):
            return '<br/>' + content
        if node.name == 'a':
            url = urljoin(report['site_url'], node.get('href', ''))
            return '<link href="'+escape(url, quote=True)+'" color="#176a94">'+content+'</link>'
        return content

    def paragraph(node, style=body_style):
        return Paragraph(markup(node), style)

    def forest(node):
        inner = node.select_one('.product-forest-inner')
        band, holding, rows = '', '', []
        axes, current_band = {}, ''
        for child in inner.find_all(recursive=False):
            if 'forest-band' in child.get('class', []): current_band = child.get_text(strip=True)
            if 'axis' in child.get('class', []):
                ticks = child.select('.tick')
                axes[current_band] = child.select_one('.forest-value').get_text()+'; axis '+ticks[0].get_text()+'–'+ticks[-1].get_text()
        col = [width*.40, width*.33, width*.27]
        def flush():
            if not rows: return
            header = Paragraph(escape(band+' — '+holding)+'<br/>'+escape(axes.get(band, '')), subhead)
            table = Table([[header, '', '']]+rows, colWidths=col, repeatRows=1, hAlign='LEFT')
            table.setStyle(TableStyle([
                ('SPAN',(0,0),(-1,0)), ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#edf2f5')),
                ('VALIGN',(0,0),(-1,-1),'MIDDLE'), ('LEFTPADDING',(0,0),(-1,-1),4),
                ('RIGHTPADDING',(0,0),(-1,-1),4), ('TOPPADDING',(0,0),(-1,-1),5),
                ('BOTTOMPADDING',(0,0),(-1,-1),5),
                ('LINEBELOW',(0,1),(-1,-1),.25,colors.HexColor('#e1e6e9'))]))
            story.extend([table, Spacer(1,8)])
            rows.clear()
        for child in inner.find_all(recursive=False):
            classes = child.get('class', [])
            if 'forest-band' in classes:
                flush(); band = child.get_text(' ', strip=True)
            elif 'forest-instrument' in classes:
                flush(); holding = child.get_text(' ', strip=True)
            elif 'forest' in classes:
                label = child.select_one('.forest-label')
                value = child.select_one('.forest-value')
                exp = child.has_attr('data-experimental')
                st = ParagraphStyle('experimental', parent=small, textColor=colors.HexColor('#be4a20')) if exp else small
                # A line break before the grade keeps labels legible on paper.
                for sm in label.select('small'): sm.insert_before(soup.new_tag('br'))
                for sm in value.select('small'): sm.insert_before(soup.new_tag('br'))
                marks = child.select('.track i')
                rows.append([paragraph(label,st), ForestTrack(marks,exp,col[1]-8), paragraph(value,st)])
            elif 'axis' in classes:
                flush()
                ticks = child.select('.tick')
                text = ' · '.join(t.get_text() for t in ticks)
                story.append(Paragraph(escape(band+' axis: '+text+' '+child.select_one('.forest-value').get_text()), small))
        flush()

    def walk(node):
        if isinstance(node, NavigableString): return
        classes = node.get('class', [])
        if 'appendix-table-hint' in classes:
            return  # Keyboard/scroll guidance is specific to the website.
        if 'product-forest' in classes:
            forest(node); return
        if node.name == 'table':
            if 'appendix-table--measurement' in classes:
                # Seven screen columns do not fit on A4 at readable type sizes.
                # Print each source row as labelled fields, with all values and
                # provenance visible and intact rather than squeezing numbers.
                headers = node.thead.find_all('th')
                for row in node.tbody.find_all('tr', recursive=False):
                    fields = row.find_all(['th', 'td'], recursive=False)
                    data = [[paragraph(h, small), paragraph(c, small)] for h, c in zip(headers, fields)]
                    t = Table(data, colWidths=[110, width - 110], hAlign='LEFT', repeatRows=2)
                    t.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#edf2f5')),
                        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                        ('LINEBELOW', (0, 0), (-1, -1), .25, colors.HexColor('#e1e6e9'))]))
                    story.extend([t, Spacer(1, 8)])
                return
            # HTML tables (Line grades, How this was measured, Excluded lines) were walked
            # cell-less and vanished from the PDF; render them as tables.
            data = [[paragraph(c, small) for c in tr.find_all(['th', 'td'], recursive=False)]
                    for tr in node.find_all('tr')]
            data = [r for r in data if r]
            if data:
                n = max(len(r) for r in data)
                data = [r + [''] * (n - len(r)) for r in data]
                # Each column at least its longest word (measured in points, so no word breaks
                # mid-way); the remaining width shared in proportion to each column's text.
                cells = [[c.get_text(strip=True) for c in tr.find_all(['th', 'td'], recursive=False)]
                         for tr in node.find_all('tr')]
                col = lambda i: [r[i] for r in cells if len(r) > i]
                floor = [max((pdfmetrics.stringWidth(w, 'Appendix', small.fontSize) for s in col(i)
                              for w in s.split()), default=0) + 10 for i in range(n)]
                # Long provenance/engine tokens in a seven-column summary may
                # exceed the printable width even before spare space is shared.
                # Paragraphs can wrap long words; the table must stay on the page.
                if sum(floor) > width:
                    total_floor = sum(floor)
                    floor = [f * width / total_floor for f in floor]
                share = [min(60, max((len(s) for s in col(i)), default=1)) for i in range(n)]
                spare = max(0.0, width - sum(floor))
                widths = [f + spare * s / sum(share) for f, s in zip(floor, share)]
                t = Table(data, colWidths=widths, repeatRows=1, hAlign='LEFT')
                t.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#edf2f5')),
                    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                    ('LINEBELOW', (0, 0), (-1, -1), .25, colors.HexColor('#e1e6e9'))]))
                story.extend([t, Spacer(1, 8)])
            return
        if node.name in ['h1','h2','h3']:
            story.append(paragraph(node, heading if node.name in ['h1','h2'] else subhead)); return
        if node.name in ['p','figcaption','li','summary']:
            story.append(paragraph(node)); return
        if node.name == 'img':
            path = (site_root / unquote(urlsplit(node['src']).path).lstrip('/')).resolve()
            if not path.is_relative_to(site_root.resolve()): raise ValueError('Image outside site')
            if path.suffix == '.svg':
                import pymupdf as fitz
                svg = fitz.open(path)
                pix = svg[0].get_pixmap(matrix=fitz.Matrix(2,2), alpha=True)
                from PIL import Image as PILImage
                foreground = PILImage.open(io.BytesIO(pix.tobytes('png'))).convert('RGBA')
                background = PILImage.new('RGBA', foreground.size, report.get('image_background', '#ffffff'))
                background.alpha_composite(foreground)
                data = io.BytesIO(); background.convert('RGB').save(data, format='PNG'); data.seek(0)
                svg.close()
            else: data = str(path)
            image = Image(data)
            scale = min(width/image.imageWidth, 390/image.imageHeight)
            image.drawWidth, image.drawHeight = image.imageWidth*scale, image.imageHeight*scale
            story.extend([image,Spacer(1,8)]); return
        if 'forest-legend' in classes or 'literature-regions' in classes:
            story.append(Paragraph(escape(node.get_text(' · ',strip=True)),small)); return
        if node.name == 'strong':
            story.append(paragraph(node)); return
        for child in node.children: walk(child)

    story.append(Paragraph(escape(report['title']), ParagraphStyle('title',parent=heading,fontSize=19,leading=24)))
    story.append(Paragraph(escape(report['target']+' · '+report['element']+' '+report['ion']+' · downloadable appendix'),body_style))
    # RYA-1271: the document details every Codex download carries. The date is the
    # report's own deterministic build date, never the clock.
    meta = report.get('metadata', {})
    date = str(meta.get('generated_at', ''))[:10]
    subject = ('Solar photospheric abundance appendix · '+report['element']+(' '+report['ion'] if report['ion'] else '')).strip()
    version = ('feed v'+str(meta['feed_version'])) if meta.get('feed_version') else None
    source = ('science commit '+str(meta['source_commit'])[:12]) if meta.get('source_commit') else None
    rows = [[Paragraph('<b>'+escape(k)+'</b>', small), Paragraph(escape(v), small)]
            for k, v in brand.details_rows(report['title'], subject, date, version, source, report.get('site_url'))]
    details = Table(rows, colWidths=[width*.18, width*.82], hAlign='LEFT')
    details.setStyle(TableStyle([('LINEABOVE',(0,0),(-1,0),.6,colors.HexColor('#d5dce1')),
                                 ('LINEBELOW',(0,-1),(-1,-1),.6,colors.HexColor('#d5dce1')),
                                 ('TOPPADDING',(0,0),(-1,-1),1.5),('BOTTOMPADDING',(0,0),(-1,-1),1.5),
                                 ('LEFTPADDING',(0,0),(-1,-1),0)]))
    story.extend([details, Spacer(1, 10)])
    for node in soup.children: walk(node)
    output = Path(output); output.parent.mkdir(parents=True, exist_ok=True)
    def footer(canvas, doc):
        brand.draw_page_header(canvas, A4[0], A4[1], report['title'], date, doc.page)
        canvas.setFont('Appendix',7)
        canvas.setFillColor(colors.HexColor('#526575'))
        canvas.drawString(40,25,report['title'])
        canvas.drawRightString(A4[0]-40,25,str(doc.page))
    doc = SimpleDocTemplate(str(output),pagesize=A4,rightMargin=40,leftMargin=40,topMargin=36+brand.HEADER_HEIGHT,bottomMargin=40,
                            title=report['title'],author=brand.AUTHOR,
                            subject=subject+' · '+brand.PUBLISHER,creator=brand.PUBLISHER,invariant=1)
    doc.build(story,onFirstPage=footer,onLaterPages=footer)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--report',type=Path,required=True)
    parser.add_argument('--output',type=Path,required=True)
    parser.add_argument('--site-root',type=Path,default=Path(__file__).resolve().parents[1])
    args=parser.parse_args()
    render_pdf(json.loads(args.report.read_text()),args.output,args.site_root)

if __name__=='__main__': main()
