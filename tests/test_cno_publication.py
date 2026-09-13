"""Science-admission and website/PDF parity regressions for CNO appendices."""
import copy
import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from bs4 import BeautifulSoup
import pymupdf
from generate_cno_publication import audit_feed, select_highlights, forest, OUT
from element_appendix_pdf import make_report, render_pdf


def product(**changes):
    p=dict(element='C',ion='I',band='VIS',instrument='harps',holding='verified',tier='REFERENCE',
           selector='ATOM-CI_5052',line_set='reference-carbon',route='SYNTH',treatment='1D-LTE',
           display='Synth · 1D-LTE',grade='Reference Grade',A=8.321,sigma_stat=.025,sigma_syst=.05,
           n_lines=2,stat_basis='measured standard error')
    p.update(changes)
    return p


def feed(products=None, **buckets):
    return dict(schema='codex.element_product/1',element='C',products=products or [],**buckets)


class AdmissionTests(unittest.TestCase):
    def test_quarantine_never_becomes_a_measurement(self):
        p=product()
        live,audit=audit_feed(feed(quarantine=[p]),{'verified':'applied'})
        self.assertEqual(live,[])
        self.assertFalse(audit[0]['visible'])
        self.assertNotIn(str(p['A']),forest('C',live))

    def test_invalid_and_unverified_products_fail_closed(self):
        for bad in [dict(A=None),dict(A=float('nan')),dict(sigma_stat=float('inf')),
                    dict(sigma_stat=0),dict(sigma_syst=None),dict(n_lines=0),dict(valid=False),
                    dict(constrained=False),dict(railed=True),dict(element='N'),dict(fit_status='FAILED'),dict(adoption='HELD'),
                    dict(publication_disposition='UNRESOLVED'),dict(grade=None),
                    dict(band='H',holding='uncorrected'),dict(band='IR-new',holding='unknown')]:
            with self.subTest(bad=bad):
                live,audit=audit_feed(feed([product(**bad)]),{'verified':'applied'})
                self.assertEqual(live,[])
                self.assertTrue(audit[0]['omission_reason'])

    def test_all_families_alternates_and_unknown_bands_survive(self):
        rows=[product(),product(selector='MOL-CH_Gband'),product(selector='MOL-C2_Swan'),
              product(selector='FORB-CI_8727'),product(selector='MOL-CH_IR',band='new-IR'),
              product(selector='MOL-CO'),product(line_set='alternate'),
              product(treatment='mean-3D',adoption='EXPERIMENTAL-NOT-ADOPTED')]
        live,audit=audit_feed(feed(rows),{'verified':'applied'})
        self.assertEqual(len(live),len(rows))
        markup=forest('C',live)
        soup=BeautifulSoup(markup,'html.parser')
        self.assertEqual(len(soup.select('[data-product-id]')),len(rows))
        self.assertIn('EXPERIMENTAL-NOT-ADOPTED',markup)
        self.assertIn('new-IR',markup)
        for p in live:
            self.assertIn(p['publication_id'],markup)
            self.assertIn(p['selector'],markup)
            self.assertIn(p['line_set'],markup)
            self.assertIn(p['grade'],markup)
        with tempfile.TemporaryDirectory() as tmp:
            pdf=Path(tmp)/'forest.pdf'
            render_pdf(make_report('Solar C appendix','Sun','C','',markup,{},live),pdf,ROOT)
            text=' '.join(p.get_text() for p in pymupdf.open(pdf))
            self.assertIn('MOL-CH_IR',text)
            self.assertIn('A(C)',text)
            self.assertIn('8.321',text)

    def test_completed_systematic_needs_no_legacy_field(self):
        p=product(sigma_syst_complete=.06)
        del p['sigma_syst']
        live,_=audit_feed(feed([p]),{'verified':'applied'})
        self.assertIn('±0.060 syst',forest('C',live))

    def test_highlights_require_unique_scientific_identity(self):
        live,_=audit_feed(feed([product(),product(selector='MOL-CH_Gband')]),{'verified':'applied'})
        self.assertEqual(select_highlights(live,[{'selector':'ATOM-CI_5052'}]),[live[0]])
        for selector in [{'holding':'verified'},{'selector':'missing'},{'A':8.321},{}]:
            with self.assertRaises(ValueError): select_highlights(live,[selector])
        experimental=product(adoption='EXPERIMENTAL-NOT-ADOPTED')
        with self.assertRaises(ValueError): select_highlights([experimental],[{'selector':'ATOM-CI_5052'}])
        with self.assertRaises(ValueError): audit_feed(feed([product(),product(A=8.999)]),{'verified':'applied'})


class GeneratedTests(unittest.TestCase):
    def test_counts_dispositions_and_numerical_blanks(self):
        for e in 'CNO':
            dest=ROOT/OUT/e
            source=json.loads((dest/(e+'.json')).read_text())
            report=json.loads((dest/'report.json').read_text())
            audit=report['visibility_audit']
            self.assertEqual(len(audit),sum(len(source.get(b,[])) for b in ['products','quarantine','archive','superseded']))
            self.assertEqual(report['products'],[])
            soup=BeautifulSoup(report['body_html'],'html.parser')
            self.assertEqual(len(soup.select('[data-audit-id]')),len(audit))
            self.assertFalse(soup.select('.dot'))
            self.assertFalse(soup.select('[data-highlight-product]'))
            self.assertIn('NOT_YET_DEFENSIBLE',soup.get_text())
            self.assertNotIn('Solar Fe',soup.get_text())
            self.assertEqual([h.get_text() for h in soup.select('h2')][:2],['Highlighted Products','Error-bar Forest Plot'])
            page=BeautifulSoup((ROOT/f'systems/sol/elements/{e.lower()}/index.html').read_text(),'html.parser')
            self.assertEqual(page.main.get_text(strip=True),soup.get_text(strip=True))
            self.assertIn(f'solar_{e.lower()}_appendix.pdf',page.main.decode())
            for a in page.select('main a[href^="/"]'):
                path=ROOT/a['href'].lstrip('/')
                self.assertTrue(path.exists(),a['href'])
            for p in source['quarantine']:
                # Failed numerical fields stay exclusively in labelled raw downloads.
                self.assertNotIn(f'{p["A"]:.3f}',page.main.get_text())

    def test_pdf_readability_references_and_determinism(self):
        for e in 'CNO':
            report=json.loads((ROOT/OUT/e/'report.json').read_text())
            path=ROOT/f'assets/docs/appendices/solar_{e.lower()}_appendix.pdf'
            doc=pymupdf.open(path)
            text=' '.join(' '.join(p.get_text().split()) for p in doc)
            for expected in ['Highlighted Products','Error-bar Forest Plot','How to read this forest',
                             'NOT_YET_DEFENSIBLE','References','Reproducibility',report['metadata']['source_commit']]:
                self.assertIn(expected,text)
            for page in doc:
                for x0,y0,x1,y1,*_ in page.get_text('words'):
                    self.assertGreaterEqual(x0,30)
                    self.assertLessEqual(x1,page.rect.width-25)
                    self.assertGreaterEqual(y0,20)
                    self.assertLessEqual(y1,page.rect.height-15)
            links=[l.get('uri') for page in doc for l in page.get_links()]
            for ref in report['references']: self.assertIn(ref['url'],links)
            with tempfile.TemporaryDirectory() as tmp:
                other=Path(tmp)/'copy.pdf'
                render_pdf(report,other,ROOT)
                self.assertEqual(other.read_bytes(),path.read_bytes())
        oxygen=json.loads((ROOT/OUT/'O/report.json').read_text())
        self.assertIn('DISAGREES',oxygen['body_html'])
        self.assertIn('OPEN. Tachiev',oxygen['body_html'])

if __name__=='__main__': unittest.main()
