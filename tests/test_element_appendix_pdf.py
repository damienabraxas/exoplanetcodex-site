"""Verify report/PDF parity, readable pagination and the generic export contract."""
import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT/'scripts'))
try:
    import pymupdf
    from bs4 import BeautifulSoup
    from element_appendix_pdf import make_report, render_pdf
    PDF_AVAILABLE = True
except ImportError:
    PDF_AVAILABLE = False


@unittest.skipUnless(PDF_AVAILABLE, 'Install scripts/requirements-appendix.txt for PDF checks')
class AppendixPDFTests(unittest.TestCase):
    def test_report_identity_anchor_and_web_parity(self):
        feed = json.loads((ROOT/'assets/data/fe-publication/Fe.json').read_text())
        for ion,slug in [('i','fe'),('ii','fe-ii')]:
            model = json.loads((ROOT/f'assets/data/fe-publication/solar_fe_{ion}_appendix.report.json').read_text())
            expected = [p for p in feed['products'] if p['ion']==ion.upper()]
            self.assertEqual([{k:v for k,v in p.items() if k!='publication_id'} for p in model['products']],expected)
            anchor = model['anchor_product']
            self.assertEqual(anchor['instrument'],'harps')
            self.assertEqual(anchor['grade'],'Reference Grade')
            self.assertEqual(anchor['treatment'],'ENGINE-A-3DNLTE')
            site = BeautifulSoup((ROOT/f'systems/sol/elements/{slug}/index.html').read_text(),'html.parser')
            report = BeautifulSoup(model['body_html'],'html.parser')
            self.assertEqual(site.select_one('.product-forest').get_text(),report.select_one('.product-forest').get_text())
            self.assertEqual(site.select_one('.fe-highlights').get_text(),report.select_one('.fe-highlights').get_text())
            self.assertIn(f'{anchor["A"]:.3f} ± {anchor["sigma_reported"]:.3f}',site.select_one('.fe-anchor').get_text())
            self.assertNotIn('7.466',site.select_one('.fe-anchor').get_text())
            self.assertTrue(site.select_one(f'a[download][href$="solar_fe_{ion}_appendix.pdf"]'))
            if ion=='i': self.assertIn('EW', report.get_text())

    def test_pdf_content_pagination_links_and_boundaries(self):
        for ion in ['i','ii']:
            model=json.loads((ROOT/f'assets/data/fe-publication/solar_fe_{ion}_appendix.report.json').read_text())
            doc=pymupdf.open(ROOT/f'assets/docs/appendices/solar_fe_{ion}_appendix.pdf')
            text=' '.join(page.get_text() for page in doc)
            normalized=' '.join(text.split())
            self.assertGreater(len(doc),1)
            for expected in ['How to read this forest','Deep Grade','References','Reproducibility',
                             model['metadata']['feed_sha256'],model['metadata']['source_commit']]:
                self.assertIn(expected,normalized)
            for product in model['products']:
                self.assertIn(f'{product["A"]:.3f}',normalized)
                self.assertIn(f'{product["sigma_reported"]:.3f}',normalized)
            for page in doc:
                self.assertAlmostEqual(page.rect.width,595.276,delta=.1)
                self.assertGreater(len(page.get_text().split()),10)
                for x0,y0,x1,y1,*_ in page.get_text('words'):
                    self.assertGreaterEqual(x0,30)
                    self.assertLessEqual(x1,page.rect.width-25)
                    self.assertGreaterEqual(y0,20)
                    self.assertLessEqual(y1,page.rect.height-15)
            links=[l.get('uri','') for page in doc for l in page.get_links()]
            for reference in model['references']:
                self.assertIn(reference['url'],links)
            if ion=='i':
                self.assertIn('Frankenstein',normalized)
                self.assertIn('not adopted',normalized)

    def test_same_input_pdf_is_byte_stable(self):
        model=json.loads((ROOT/'assets/data/fe-publication/solar_fe_ii_appendix.report.json').read_text())
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)/'again.pdf'
            render_pdf(model,output,ROOT)
            self.assertEqual(output.read_bytes(),(ROOT/'assets/docs/appendices/solar_fe_ii_appendix.pdf').read_bytes())

    def test_export_accepts_another_target_and_element(self):
        body='<h2>Highlighted products</h2><p>Mg I product: 7.123 ± 0.045</p><h2>References</h2><p>Generic test report.</p>'
        report=make_report('Benchmark Mg I appendix','Benchmark','Mg','I',body,{'feed_version':'test'},[])
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)/'magnesium.pdf'
            render_pdf(report,output,ROOT)
            text=pymupdf.open(output)[0].get_text()
            self.assertIn('Benchmark Mg I appendix',text)
            self.assertIn('7.123 ± 0.045',text)
            self.assertNotIn('Solar Fe',text)

if __name__=='__main__': unittest.main()
