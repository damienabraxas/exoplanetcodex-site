#!/usr/bin/env python3
"""Generate independently gated CNO appendices from a clean, pinned science checkout.

Feed products/quarantine/archive membership owns admission. No abundance analysis,
engine ranking, indicator averaging, or promotion from campaign prose happens here.
"""
from __future__ import annotations
import argparse
from collections import Counter
import csv
import hashlib
import html
import json
import math
from pathlib import Path
import re
import subprocess

from element_appendix_pdf import make_report, render_pdf

ROOT = Path(__file__).resolve().parents[1]
OUT = Path('assets/data/cno-publication')
AUDIT = 'data/audit/rya1214_cno_products/'
IDENTITY = ('element', 'ion', 'band', 'instrument', 'holding', 'tier', 'selector', 'route', 'treatment', 'line_set', 'indicator')
NAMES = dict(C='Carbon', N='Nitrogen', O='Oxygen')
CONTEXT = {
    'C': 'Carbon is traced by atomic C I, including forbidden [C I], and molecular CH, C₂ and CO indicators. Each probes different line formation and molecular-equilibrium sensitivities. Indicator families and atmospheric treatments remain separate products.',
    'N': 'The nitrogen strategy uses red-optical N I as the primary atomic route, with NH providing an independent molecular check and CN a carbon-dependent cross-check. An unresolved or unconstrained fit supplies no adopted Solar nitrogen abundance.',
    'O': 'Oxygen is traced by forbidden [O I], permitted O I and molecular OH indicators where available. Blends, departures from LTE and atmospheric structure affect these families differently, so their results retain separate identities.'}
GUIDE = ('Each row is one independent product, preserving its band, holding, engine, indicator and line set. '
         'Engines and indicator families are never averaged. Solid bars show the supplied statistical uncertainty; '
         'wireframes show the supplied systematic uncertainty. The statistical basis and any incomplete error budget remain attached to the row. '
         'Grades describe the supplied line-pool provenance, not engine quality; evaluated theoretical CNO oscillator strengths are not relabelled as laboratory evidence. '
         'Quarantined, failed and unconstrained fits have no abundance mark. Experimental products remain explicitly not adopted. '
         'Literature references provide context, never tuning targets.')


def esc(v):
    return html.escape(str(v if v is not None else 'not supplied'))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def section(title, body):
    return f'<section class="fe-section"><h2>{esc(title)}</h2>{body}</section>'


def identity(p):
    return {k: p.get(k) for k in IDENTITY}


def finite(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool) and math.isfinite(v)


def systematic(p):
    return p.get('sigma_syst_complete') if p.get('sigma_syst_complete') is not None else p.get('sigma_syst')


def audit_feed(feed, telluric):
    """Fail closed; preserve every input row, even when it cannot carry a mark."""
    if feed.get('schema') != 'codex.element_product/1':
        raise ValueError('Unsupported product schema')
    audit, visible, seen = [], [], set()
    for bucket in ('products', 'quarantine', 'archive', 'superseded'):
        for index, original in enumerate(feed.get(bucket, [])):
            p = dict(original)
            key = json.dumps(identity(p), sort_keys=True)
            pid = feed['element'] + '-' + bucket + '-' + digest((key + str(index)).encode())[:12]
            reasons = []
            if bucket != 'products':
                reasons.append(p.get('quarantine_reason') or f'{bucket}: not a current admitted product')
            else:
                if key in seen:
                    raise ValueError('Ambiguous current product identity: '+key)
                seen.add(key)
                if p.get('quarantine_codes') or p.get('quarantine_reason'):
                    reasons.append(p.get('quarantine_reason') or ', '.join(p['quarantine_codes']))
                # An unrecognized future disposition requires an explicit adapter.
                if p.get('adoption') not in (None, '', 'ADOPTED', 'EXPERIMENTAL-NOT-ADOPTED'):
                    reasons.append('adoption: '+str(p['adoption']))
                for field in ('disposition', 'publication_disposition', 'fit_status'):
                    if p.get(field) not in (None, '', 'MEASURED', 'PUBLISHED', 'ADOPTED', 'VALID', 'SUCCESS'):
                        reasons.append(field+': '+str(p[field]))
                if p.get('reliable') is False or p.get('valid') is False or p.get('constrained') is False or p.get('railed') is True:
                    reasons.append('failed/unreliable/unconstrained fit')
                if not finite(p.get('A')) or not finite(p.get('n_lines')) or p['n_lines'] <= 0:
                    reasons.append('no finite measured abundance / positive line count')
                if p.get('element') != feed['element']:
                    reasons.append('product element differs from feed')
                sy = systematic(p)
                if not finite(p.get('sigma_stat')) or p['sigma_stat'] <= 0 or not finite(sy) or sy < 0:
                    reasons.append('missing, nonfinite or invalid uncertainty; no zero substitution')
                if telluric.get(p.get('holding')) != 'applied':
                    reasons.append('telluric correction not verified by holding registry')
                if any(not p.get(k) for k in ('element', 'ion', 'band', 'instrument', 'holding', 'route', 'treatment', 'display', 'grade')):
                    reasons.append('required product identity / grade not supplied')
            disposition = bucket if bucket != 'products' else p.get('adoption') or 'products'
            row = dict(publication_id=pid, source_bucket=bucket, source_index=index,
                       identity=identity(p), disposition=disposition,
                       quarantine_codes=p.get('quarantine_codes', []),
                       visible=not reasons, omission_reason='; '.join(reasons))
            audit.append(row)
            if not reasons:
                visible.append(dict(p, publication_id=pid))
    return visible, audit


def select_highlights(products, selectors):
    result = []
    for selector in selectors:
        if not selector or set(selector) - set(IDENTITY):
            raise ValueError('Highlight selectors must use scientific identity fields')
        matches = [p for p in products if all(p.get(k) == v for k, v in selector.items())
                   and p.get('adoption') != 'EXPERIMENTAL-NOT-ADOPTED']
        if len(matches) != 1:
            raise ValueError('Required highlighted product missing or ambiguous: '+json.dumps(selector))
        if matches[0] in result:
            raise ValueError('Duplicate highlight selector')
        result.extend(matches)
    return result


def product_label(p):
    indicator = p.get('indicator') or p.get('selector') or 'indicator not supplied'
    line_set = p.get('line_set') or 'line set not supplied'
    return f'{indicator} · {p["element"]} {p["ion"]} · {p["display"]} · {p["route"]} · {p["treatment"]} · {line_set}'


def forest(element, products):
    if not products:
        return '<p class="product-pending">No publication-eligible abundance products. Quarantined entries are documented below without plotted values.</p>'
    out = '<div class="product-forest"><div class="product-forest-inner">'
    # Use all actual bands/holdings, including future molecular taxonomy, with no
    # Fe plot_grid tier preference, alternate collapse, or fixed instrument list.
    for band in dict.fromkeys(p['band'] for p in products):
        rows = [p for p in products if p['band'] == band]
        extent = [(p['A']-max(p['sigma_stat'], systematic(p)),
                   p['A']+max(p['sigma_stat'], systematic(p))) for p in rows]
        lo, hi = min(v[0] for v in extent)-.03, max(v[1] for v in extent)+.03
        def x(v): return (v-lo)/(hi-lo)*100
        out += f'<div class="forest-band">{esc(band)}</div>'
        for holding in dict.fromkeys(p['holding'] for p in rows):
            group = [p for p in rows if p['holding'] == holding]
            out += f'<div class="forest-instrument">{esc(group[0]["instrument"])}<small>{esc(holding)}</small></div>'
            for p in group:
                experimental = p.get('adoption') == 'EXPERIMENTAL-NOT-ADOPTED'
                attr = ' data-experimental="true" style="--accent:#f07848;--text:#f07848;--text-dim:#f07848"' if experimental else ''
                st, sy = p['sigma_stat'], systematic(p)
                marks = ''.join(f'<i class="{kind}" style="left:{x(p["A"]-sigma):.6f}%;width:{2*sigma/(hi-lo)*100:.6f}%"></i>' for kind,sigma in [('sysbar',sy),('bar',st)])
                marks += f'<i class="dot" style="left:{x(p["A"]):.6f}%"></i>'
                out += (f'<div class="forest" data-product-id="{p["publication_id"]}"{attr}><span class="forest-label">{esc(product_label(p))}'
                        f'<small>{esc(p["grade"])} · {esc(p.get("tier"))} · n={p["n_lines"]}'
                        + (' · EXPERIMENTAL-NOT-ADOPTED' if experimental else '')
                        + f'</small></span><span class="track">{marks}</span><span class="forest-value">{p["A"]:.3f}'
                        f'<small>±{st:.3f} stat ±{sy:.3f} syst</small></span></div>')
        ticks = ''.join(f'<span class="tick" style="left:{j*25}%">{lo+(hi-lo)*j/4:.2f}</span>' for j in range(5))
        out += f'<div class="axis"><span></span><span class="ticks">{ticks}</span><span class="forest-value">A({element}) dex</span></div>'
    return out+'</div></div>'


def source_evidence(science, element):
    paths = ['data/refs/bibliography.csv', 'data/catalog/holdings_manifest_registry.csv', 'docs/co_indicator_strategy.md',
             AUDIT+'cno_gf_adjudication.prov.json', AUDIT+'agss21_indicator_gf_check.csv']
    pedigree = json.loads((science/paths[3]).read_text())
    notes = []
    if element == 'O':
        with (science/paths[4]).open() as f:
            checks = [r for r in csv.DictReader(f) if r['element']=='O' and 'DISAGREES' in r['verdict']]
        notes.extend(f'{r["species"]} {r["line_label"]}: {r["verdict"]}. {r["grade_verdict"]}. '
                     f'Store log gf {r["store_log_gf"]} ({r["store_nist_grade"]}); summed pull {r["pull_log_gf_summed"]} ({r["pull_grade_worst"]}).' for r in checks)
        notes.append(pedigree['oi_777_decision'])
    if element == 'N': notes.append(pedigree['n_i_caveat'])
    notes = list(dict.fromkeys(notes))
    with (science/paths[0]).open() as f:
        bib = {r['doi']:r for r in csv.DictReader(f)}
    r = bib['10.1051/0004-6361/202140445']
    refs = [dict(authors=r['authors'], year=r['year'], title=r['title'], doi=r['doi'],
                 url='https://doi.org/'+r['doi'], role='Solar atomic and molecular indicator context; no literature abundance is adopted here.')]
    return paths, notes, refs


def build(science, element, selectors, site=ROOT):
    feed_path = f'data/products/solar/{element}.json'
    paths, notes, refs = source_evidence(science, element)
    paths = [feed_path] + paths
    dirty = subprocess.check_output(['git','-C',str(science),'status','--porcelain','--',*paths],text=True)
    if dirty: raise ValueError('Science inputs differ from committed provenance: '+dirty)
    commit = subprocess.check_output(['git','-C',str(science),'rev-parse','HEAD'],text=True).strip()
    stamp = subprocess.check_output(['git','-C',str(science),'show','-s','--format=%cI','HEAD'],text=True).strip()
    feed = json.loads((science/feed_path).read_text())
    if feed.get('element') != element: raise ValueError('Element identity mismatch')
    with (science/'data/catalog/holdings_manifest_registry.csv').open() as f:
        telluric = {r['holding_id']:r['telluric_applied'] for r in csv.DictReader(f)}
    products, audit = audit_feed(feed, telluric)
    highlights = select_highlights(products, selectors)
    status = 'products' if any(p.get('adoption') != 'EXPERIMENTAL-NOT-ADOPTED' for p in products) else 'NOT_YET_DEFENSIBLE'
    base = f'https://github.com/damienabraxas/exoplanetcodex/blob/{commit}'
    meta = dict(generator='scripts/generate_cno_publication.py', version='1.0.0', source_commit=commit,
                source_url=base, generated_at=stamp, timestamp_basis='source commit timestamp (deterministic build)',
                feed_version=feed['version'], feed_updated_at=feed['updated_at'],
                feed_sha256=digest((science/feed_path).read_bytes()),
                source_sha256={p:digest((science/p).read_bytes()) for p in paths},
                generator_sha256=digest(Path(__file__).read_bytes()),
                template_sha256=digest((ROOT/'systems/sol/elements/fe/index.html').read_bytes()),
                highlight_selectors_sha256=digest(json.dumps(selectors,sort_keys=True).encode()),
                pdf_generator_sha256=digest((ROOT/'scripts/element_appendix_pdf.py').read_bytes()),
                counts={b:len(feed.get(b,[])) for b in ('products','quarantine','archive','superseded')},
                visible_products=len(products), dispositions=dict(Counter(r['disposition'] for r in audit)),
                highlight_selectors=selectors, status=status)
    no_adopted = 'No adopted Solar '+NAMES[element].lower()+' abundance is available from this feed.'
    body = f'<p class="fe-stamp">{element}.json v{esc(feed["version"])} · {len(products)} visible products · {len(feed.get("quarantine",[]))} quarantined entries</p>'
    body += f'<p class="fe-anchor">{esc(status)}</p><p>{esc(no_adopted if status != "products" else "Independent admitted products; no combined headline abundance.")}</p>'
    cards = []
    for p in highlights:
        spectrum = 'uv' if p['band']=='near-UV' else 'visible' if p['band'] in ('VIS','red-optical') else 'ir'
        cards.append(f'<article class="fe-highlight-{spectrum}" data-highlight-product="{p["publication_id"]}"><h3>{esc(p["band"])}</h3>'
                     f'<strong>{p["A"]:.3f}</strong><p>±{p["sigma_stat"]:.3f} stat · ±{p.get("sigma_syst_complete",p["sigma_syst"]):.3f} syst</p>'
                     f'<p>{esc(product_label(p))} · {esc(p["holding"])} · {esc(p["grade"])}</p></article>')
    body += section('Highlighted Products','<div class="fe-highlights">'+''.join(cards)+'</div>'+('' if cards else '<p>No adopted highlighted product has been selected. '+esc(no_adopted if status != 'products' else 'See the independent products below.')+'</p>'))
    body += '<section class="product-section"><h2>Error-bar Forest Plot</h2>'+forest(element,products)+f'<p class="product-section-intro"><strong>How to read this forest.</strong> {GUIDE}</p></section>'
    body += section('Solar '+NAMES[element].lower()+' context',f'<p>{CONTEXT[element]}</p><p><a href="{base}/docs/co_indicator_strategy.md">C/O indicator strategy</a> · <a href="/method/">Methodology</a>' + (' · <a href="https://linear.app/ryans-adventure-zone/issue/RYA-369">Nitrogen strategy</a>' if element=='N' else '')+'</p>')
    if products:
        body += section('Product provenance and caveats', ''.join('<p>'+esc(product_label(p))+': '+esc(json.dumps({k:v for k,v in p.items() if k not in IDENTITY and k not in ('A','publication_id')},ensure_ascii=False,sort_keys=True))+'</p>' for p in products))
    if notes:
        body += section('Open provenance decisions', ''.join('<p>'+esc(n)+'</p>' for n in notes)+f'<p><a href="{base}/{AUDIT}cno_gf_adjudication.prov.json">Adjudication record</a> · <a href="{base}/{AUDIT}agss21_indicator_gf_check.csv">Indicator gf checks</a></p>')
    omitted = [r for r in audit if not r['visible']]
    body += section('Product visibility audit', '<p>Every feed entry is accounted for. Quarantined and archived entries retain their source disposition; their numeric fit outputs are available only in the labelled source download.</p>'
                    +'<details><summary>Withheld entries and source reasons ('+str(len(omitted))+')</summary><ul>'
                    +''.join(f'<li data-audit-id="{r["publication_id"]}"><strong>{esc(r["disposition"])}</strong> · '+esc(' · '.join(str(v) for v in r['identity'].values() if v is not None))+f'<br>{esc(r["omission_reason"])}</li>' for r in omitted)+'</ul></details>')
    pdf = f'solar_{element.lower()}_appendix.pdf'
    body += section('Download the evidence',f'<p><a download href="/assets/docs/appendices/{pdf}">Download PDF — Solar {element} appendix</a></p><ul>'
                    +''.join(f'<li><a download href="/{OUT}/{element}/{name}">{esc(label)}</a></li>' for name,label in [(element+'.json','Source feed — includes quarantined fit outputs, not adopted abundances'),('visibility.json','Complete product visibility audit'),('report.json','Shared website/PDF report'),('manifest.json','Reproducibility manifest')])+'</ul>')
    body += section('Reproducibility',f'<p>Generated from the pinned CNO campaign snapshot. Source commit <code>{commit}</code><br>Feed {element}.json v{esc(feed["version"])} · updated {esc(feed["updated_at"])}<br>Generated {esc(stamp)} (source commit timestamp)<br>Feed SHA-256 <code>{meta["feed_sha256"]}</code><br>Generator {meta["generator"]} v{meta["version"]}</p><p><a href="{base}/{feed_path}">Pinned scientific source</a></p>')
    body += section('References', '<ul>'+''.join(f'<li>{esc(r["authors"])} ({esc(r["year"])}). <a href="{esc(r["url"])}">{esc(r["title"])}</a>. {esc(r["role"])}</li>' for r in refs)+'</ul>')
    report = make_report('Solar '+element+' appendix','Sun',element,'',body,meta,products)
    report.update(references=refs, visibility_audit=audit, highlighted_products=highlights)
    dest = site/OUT/element
    dest.mkdir(parents=True,exist_ok=True)
    (dest/(element+'.json')).write_bytes((science/feed_path).read_bytes())
    for name,obj in [('manifest.json',meta),('visibility.json',audit),('report.json',report)]:
        (dest/name).write_text(json.dumps(obj,indent=2,ensure_ascii=False,allow_nan=False)+'\n')
    render_pdf(report,site/'assets/docs/appendices'/pdf,site)
    template = (ROOT/'systems/sol/elements/fe/index.html').read_text()
    start,end = template.index('  <main'),template.index('</main>')+len('</main>')
    template = template[:start]+'  <main class="container fe-publication">\n'+body+'\n  </main>'+template[end:]
    template = template.replace('Solar Iron Appendix','Solar '+NAMES[element]+' Appendix').replace('Iron <em>',''+NAMES[element]+' <em>').replace('<span>Fe Appendix</span>',f'<span>{element} Appendix</span>')
    template = re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="Solar {element} products, publication dispositions, independent indicators and downloadable appendix.">',template)
    template = re.sub(r'<p class="page-subtitle">.*?</p>',f'<p class="page-subtitle">{element} · products, publication readiness and reproducible evidence</p>',template)
    page=site/f'systems/sol/elements/{element.lower()}/index.html'
    page.parent.mkdir(parents=True,exist_ok=True)
    page.write_text(template)
    return meta


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--science-root',required=True,type=Path)
    parser.add_argument('--elements',nargs='+',choices=list(NAMES),default=list(NAMES))
    parser.add_argument('--highlight-selectors',type=Path,default=ROOT/'scripts/cno-highlight-selectors.json')
    args=parser.parse_args()
    selectors=json.loads(args.highlight_selectors.read_text())
    failures=[]
    for element in args.elements:
        try:
            meta=build(args.science_root.resolve(),element,selectors[element])
            print(element,json.dumps({k:meta[k] for k in ('status','counts','visible_products')}))
        except (ValueError,KeyError,OSError) as exc:
            failures.append(element+': '+str(exc))
    if failures: raise SystemExit('\n'.join(failures))

if __name__=='__main__': main()
