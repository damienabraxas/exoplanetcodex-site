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

    def test_original_forest_hierarchy_and_stylesheet_are_retained(self):
        for ion, slug in [('I', 'fe'), ('II', 'fe-ii')]:
            page = (ROOT / f'systems/sol/elements/{slug}/index.html').read_text()
            sections = [s for s in self.feed['plot_grid']['sections'] if s['ion'] == ion]
            self.assertEqual(page.count('class="forest-instrument"'), len(sections))
            self.assertEqual(page.count('class="forest-band"'), len({s['band'] for s in sections}))
            self.assertEqual(len(re.findall(r'class="forest (?:gradedrow|forest-na)?"', page)),
                             sum(len(s['cells']) for s in sections))
            self.assertIn('/assets/css/element-products.css', page)
            self.assertNotRegex(page, r'<img[^>]+Fe(?:I|II)-(?:VIS|NIR|H|near-UV|red-optical)')

    def test_highlights_references_and_experimental_rows(self):
        for ion, slug in [('I', 'fe'), ('II', 'fe-ii')]:
            page = (ROOT / f'systems/sol/elements/{slug}/index.html').read_text()
            self.assertLess(page.index('<h2>Highlighted band products'), page.index('<h2>Error-bar forest'))
            self.assertIn('https://doi.org/10.1051/0004-6361/202140445', page)
            self.assertIn('https://doi.org/10.1007/s11214-025-01146-w', page)
            expected = sum(p['ion'] == ion and p.get('adoption') == 'EXPERIMENTAL-NOT-ADOPTED' for p in self.feed['products'])
            self.assertEqual(page.count('data-experimental="true"'), expected)
            self.assertIn('reddish orange = experimental Frankenstein', page)
            for src in re.findall(r'<img[^>]+src="([^"]+)"', page):
                if '/fe-publication/' in src:
                    self.assertIn('?v=', src)

    def test_vis_highlights_are_requested_reference_products(self):
        page = (ROOT / 'systems/sol/elements/fe/index.html').read_text()
        ids = re.findall(r'data-highlight-product="Fe-(\d+)"', page)
        vis = [self.feed['products'][int(i)] for i in ids if self.feed['products'][int(i)]['band'] == 'VIS']
        self.assertEqual([p['holding'] for p in vis], ['solar_kpno_molecfit_corrected', 'solar_harps_molecfit_corrected'])
        for p in vis:
            self.assertEqual(p['grade'], 'Reference Grade')
            self.assertEqual(p['treatment'], 'ENGINE-A-3DNLTE')
        grades = {p['grade'] for p in self.feed['products']}
        for slug in ['fe', 'fe-ii']:
            page = (ROOT / f'systems/sol/elements/{slug}/index.html').read_text()
            rows = re.findall(r'<span class="forest-label">.*?<small>(.*?)</small>', page)
            for row in rows:
                if row != 'no product':
                    self.assertIn(html.unescape(row.split(' · n=')[0]), grades)

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
            for field in ['A','n_lines','sigma_reported','holding','selector','treatment','grade']:
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
