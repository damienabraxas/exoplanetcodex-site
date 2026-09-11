"""Check published artifacts against their own pinned feed, not fixture numbers."""
import csv
import hashlib
import html
import io
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/data/fe-publication'


class FePublicationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.feed = json.loads((OUT / 'Fe.json').read_text())
        cls.manifest = json.loads((OUT / 'manifest.json').read_text())

    def test_every_product_rendered_once_with_correct_species(self):
        for ion, slug in [('I','fe'), ('II','fe-ii')]:
            page = (ROOT / f'systems/sol/elements/{slug}/index.html').read_text()
            expected = [f'Fe-{i:03d}' for i,p in enumerate(self.feed['products']) if p['ion']==ion]
            self.assertCountEqual(re.findall('data-product-id="([^"]+)"', page), expected)
            self.assertNotIn('productMatrix(', page)
            for product in self.feed['products']:
                if product['ion']==ion and product.get('sigma_reported_caveat'):
                    self.assertIn(html.escape(product['sigma_reported_caveat']), page)
            for link in re.findall(r'(?:href|src)="(/assets/data/[^"?#]+)', page):
                self.assertTrue((ROOT / link.lstrip('/')).is_file(), link)

    def test_csv_is_lossless_and_tracker_reconciles(self):
        rows = list(csv.DictReader(io.StringIO((OUT / 'Fe_products.csv').read_text())))
        self.assertEqual(len(rows), len(self.feed['products']))
        for source, exported in zip(self.feed['products'], rows):
            for key, value in source.items():
                if isinstance(value, (list,dict)):
                    self.assertEqual(json.loads(exported[key]), value)
                elif value is not None:
                    self.assertEqual(exported[key], str(value))
        tracker = json.loads((ROOT / 'assets/data/rya935/live_status.json').read_text())
        actual = [p for p in tracker['products'] if p['element']=='Fe']
        self.assertEqual(len(actual), len(rows))
        self.assertTrue(set(p['band'] for p in actual) <= set(tracker['bands']))
        for a,b in zip(actual, self.feed['products']):
            for field in ['A','n_lines','sigma_reported','holding','selector','treatment']:
                self.assertEqual(a[field], b[field])

    def test_line_export_is_honest_about_coverage(self):
        lines = list(csv.DictReader(io.StringIO((OUT/'Fe_graded_perline.csv').read_text())))
        coverage = list(csv.DictReader(io.StringIO((OUT/'Fe_perline_coverage.csv').read_text())))
        self.assertEqual(len(coverage), len(self.feed['products']))
        for r in coverage:
            have = [x for x in lines if x['publication_id']==r['publication_id']]
            if r['resolved']=='True' and r['tier']!='ALL':
                self.assertEqual(len(have), int(r['n_lines']))
            else:
                self.assertEqual(have, [])
                if r['resolved']=='False':
                    self.assertTrue(r['reason'])
        for r in lines:
            for key in ['abundance','wavelength_air_A','ep_eV','log_gf','holding','band','treatment','perline_artifact']:
                self.assertNotIn(r[key], ['', 'nan'])

    def test_manifest_and_social_product_selection(self):
        self.assertEqual(self.manifest['feed_sha256'], hashlib.sha256((OUT/'Fe.json').read_bytes()).hexdigest())
        self.assertEqual(self.manifest['held_products'], sum(p.get('adoption')=='EXPERIMENTAL-NOT-ADOPTED' for p in self.feed['products']))
        social = list(csv.DictReader(io.StringIO((OUT/'Fe_social_products.csv').read_text())))
        self.assertLessEqual(len(social),5)
        self.assertEqual({r['instrument'] for r in social}, {'harps','crires_plus'})
        self.assertTrue((OUT/'fe-social-forest.png').stat().st_size > 10000)


if __name__ == '__main__':
    unittest.main()
