"""The forest's plot_grid -> product join, and the headings that make two sections readable.

🔴 WHAT SHIPPED, AND FOR HOW LONG. RYA-1213 published the Reference tier over the same
holdings as the Codex pools, so `Fe.json`'s `plot_grid` carries NINETEEN
(ion, band, instrument, holding) groups that are a [Codex pool, Reference pool] PAIR. Two
things were wrong at once and they compounded:

  1. `productIndex` in assets/js/element-products.js derived `line_set` from a hand-written
     tier map that knew GRADED and DEEPGRADED and nothing else, so all 68 REFERENCE
     products indexed under an EMPTY line_set while plot_grid asked for 'reference'. Every
     one of the 19 reference sections resolved 0 of 171 cells.
  2. The section heading printed only the holding, never `line_set`.

Together: the live forest drew a second "Kitt Peak — Kurucz 2005 corrected", a second
"HARPS", a second "IAG" inside the same band under a heading IDENTICAL to the section
beside it, every row reading N/A -- and the entire Reference tier, including the tier the
published 7.477 headline sits in, was invisible on the page that exists to show it.

⚠️ EVERY TEST HERE READS THE PUBLISHED FEED, not a fixture. A fixture would have kept
passing through both defects.
"""
import collections
import json
import re
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/data/fe-publication'
PAGES = {'I': 'systems/sol/elements/fe/index.html',
         'II': 'systems/sol/elements/fe-ii/index.html'}


def join_report(feed, ion):
    """The RENDERER's own view of the join -- one implementation of the identity key."""
    return json.loads(subprocess.check_output(
        ['node', '-e',
         "const fs=require('fs');"
         "const {gridJoinReport}=require('./assets/js/element-products.js');"
         "const x=JSON.parse(fs.readFileSync(0,'utf8'));"
         "process.stdout.write(JSON.stringify(gridJoinReport(x.feed,x.ion)));"],
        input=json.dumps({'feed': feed, 'ion': ion}), text=True, cwd=ROOT))


def sections_in_order(page_text):
    """(band, heading) for every forest section, in document order."""
    toks = re.findall(r'<div class="forest-band">(.*?)</div>'
                      r'|<div class="forest-instrument">(.*?)</div>', page_text, re.S)
    band, out = None, []
    for b, i in toks:
        flat = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', b or i)).strip()
        if b:
            band = flat
        else:
            out.append((band, flat))
    return out


class ForestJoinTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.feed = json.loads((OUT / 'Fe.json').read_text())

    def test_the_feed_really_does_publish_paired_sections(self):
        """The precondition. If this ever reads 0 the rest of the file is vacuous — the
        tests below would pass on a feed with nothing to get wrong."""
        c = collections.Counter(
            (s['ion'], s['band'], s['instrument'], s.get('holding'))
            for s in self.feed['plot_grid']['sections'])
        paired = {k: v for k, v in c.items() if v > 1}
        self.assertTrue(paired, 'no repeated (ion, band, instrument, holding) group in the '
                                'feed — this suite is not testing anything')
        for key, n in paired.items():
            pools = sorted(s.get('line_set') for s in self.feed['plot_grid']['sections']
                           if (s['ion'], s['band'], s['instrument'], s.get('holding')) == key)
            self.assertEqual(len(set(pools)), n,
                             f'{key} repeats {n} times but has {len(set(pools))} distinct '
                             f'line_set values, so something other than the pool differs')

    def test_no_plot_grid_section_resolves_zero_products(self):
        """🔴 THE DEFECT ITSELF. A section that resolves nothing is a broken join, never
        "a model nobody measured": genuine N/A rows are scattered across sections, a broken
        join empties one outright. 19 sections read 0/171 in production."""
        for ion in PAGES:
            r = join_report(self.feed, ion)
            self.assertEqual(r['emptySections'], [],
                             f'Fe {ion}: {len(r["emptySections"])} of {r["sections"]} '
                             f'sections resolve NOT ONE product')
            self.assertGreater(r['resolved'], 0, f'Fe {ion}: nothing resolved at all')

    def test_every_reference_tier_product_is_reachable_from_the_grid(self):
        """The Reference tier is the tier the published headline sits in. All 68 of its
        products were unreachable; a count of resolved cells alone would not have said so."""
        ref = [p for p in self.feed['products'] if p['tier'] == 'REFERENCE']
        self.assertTrue(ref, 'no REFERENCE products in the feed')
        resolved = sum(join_report(self.feed, ion)['resolved'] for ion in PAGES)
        self.assertGreaterEqual(
            resolved, len(ref),
            f'{resolved} cells resolve in total but the feed publishes {len(ref)} REFERENCE '
            f'products alone, so some tier cannot be reaching the grid')

    def test_the_index_is_keyed_on_the_feeds_own_line_set_derivation(self):
        """⚠️ NOT ON A HAND-WRITTEN TIER MAP. `line_set_resolved` is what
        pipeline.reference_lineset.line_set_for_product derives and the feed publishes;
        reading it means the next tier needs no edit to this page. The tier map is retained
        only for a feed older than that field and must never be extended."""
        js = (ROOT / 'assets/js/element-products.js').read_text()
        fn = js.split('function identityValue(')[1].split('\n    }')[0]
        self.assertIn('line_set_resolved', fn)
        self.assertLess(fn.index('line_set_resolved'), fn.index("'our-graded'"),
                        'the tier map is consulted before the feed’s own derivation')
        #: only the two legacy tiers may appear in the fallback; a third means somebody
        #: extended the map instead of reading the feed
        self.assertEqual(sorted(re.findall(r"p\.tier === '([A-Z]+)'", fn)),
                         ['DEEPGRADED', 'GRADED'])

    def test_two_sections_of_one_holding_are_distinguishable_on_the_page(self):
        """🔴 THE OTHER HALF. Resolving the cells stops the section being blank; it does
        NOT stop two sections of one holding carrying the same heading. Within a band, no
        heading may repeat — the pool is the field that differs and it must be shown."""
        for ion, page in PAGES.items():
            got = sections_in_order((ROOT / page).read_text(encoding='utf-8'))
            self.assertTrue(got, f'Fe {ion}: no forest sections found on the page')
            dup = {k: v for k, v in collections.Counter(got).items() if v > 1}
            self.assertEqual(dup, {}, f'Fe {ion}: repeated (band, heading): {dup}')

    def test_the_pool_label_appears_and_names_every_pool_the_feed_uses(self):
        js = (ROOT / 'assets/js/element-products.js').read_text()
        labelled = set(re.findall(r"'?([a-z-]+)'?\s*:\s*'[^']*pool'", js))
        used = {s.get('line_set') for s in self.feed['plot_grid']['sections'] if s.get('line_set')}
        self.assertTrue(used <= labelled,
                        f'plot_grid uses line sets this page cannot name: {sorted(used - labelled)}')
        for ion, page in PAGES.items():
            text = (ROOT / page).read_text(encoding='utf-8')
            self.assertIn('forest-lineset', text, f'Fe {ion}: no pool label rendered')


class GuardTests(unittest.TestCase):
    """🔴 MUTATION-TESTED. A guard that has never been shown to fire is a comment."""

    def test_the_build_refuses_when_a_section_resolves_nothing(self):
        js_path = ROOT / 'assets/js/element-products.js'
        original = js_path.read_text()
        line = ("      if (p.line_set_resolved != null && p.line_set_resolved !== '') "
                "return p.line_set_resolved;")
        self.assertIn(line, original, 'the line this test mutates has moved')
        feed = json.loads((OUT / 'Fe.json').read_text())
        try:
            js_path.write_text(original.replace(line, '      // MUTATED'))
            r = join_report(feed, 'I')
            self.assertTrue(r['emptySections'],
                            'reverting the fix produced no empty section, so the report '
                            'cannot be detecting the defect it exists for')
        finally:
            js_path.write_text(original)
        self.assertEqual(join_report(feed, 'I')['emptySections'], [],
                         'the module was not restored')


if __name__ == '__main__':
    unittest.main()
