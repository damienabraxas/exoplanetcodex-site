import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class ElementProductTests(unittest.TestCase):
    def setUp(self):
        self.js = (ROOT / "assets/js/element-products.js").read_text()
        self.css = (ROOT / "assets/css/element-products.css").read_text()

    def test_feed_is_live_and_cache_busted(self):
        self.assertIn("raw.githubusercontent.com/damienabraxas/exoplanetcodex/main/", self.js)
        self.assertIn("'?t=' + Date.now()", self.js)
        self.assertNotRegex(self.js, r"\b[78]\.\d{2,}\b")
        self.assertIn("get('feedBase')", self.js)

    def test_telluric_state_comes_from_registry(self):
        self.assertIn("holdings_manifest_registry.csv", self.js)
        self.assertIn("telluric[r.holding_id]=r.telluric_applied", self.js)
        self.assertIn("telluric[p.holding]==='applied'", self.js)

    def test_matrix_preserves_all_four_empty_states(self):
        for state in ("Pending", "Out of band", "N/A for ", "Problem"):
            self.assertIn(state, self.js)
        self.assertIn("feed.quarantine", self.js)
        self.assertIn("num(p.sigma_stat)", self.js)
        self.assertIn("num(p.sigma_syst)", self.js)
        self.assertIn("matrix-uncertainty", self.css)
        self.assertIn("Deepgraded and consistent matrix", self.js)
        self.assertIn("matrix(secondary", self.js)
        self.assertIn("matrix-tier-pending", self.css)

    def test_rya935_forest_geometry_is_exact(self):
        self.assertIn(".forest{display:grid;grid-template-columns:250px 1fr 150px", self.css)
        self.assertIn(".gradedrow .bar", self.css)
        self.assertIn(".gradedrow .sysbar", self.css)
        self.assertIn(".gradedrow .bar{background:var(--accent)}", self.css)
        self.assertIn(".gradedrow .dot{background:var(--accent)}", self.css)
        self.assertIn("live_status.json", self.js)
        self.assertIn("tracker.reference&&tracker.reference.FeI", self.js)
        self.assertIn("solar_kpno_kurucz2005_corrected", self.js)
        self.assertIn("p.band==='near-UV'", self.js)
        self.assertIn("band-near-uv", self.css)
        self.assertIn("band-vis", self.css)
        self.assertIn("band-ir", self.css)
        self.assertIn("forest-instrument", self.js)
        self.assertIn(".forest-instrument", self.css)
        self.assertIn("group=here.filter", self.js)

    def test_fe_page_has_no_generated_abundance_bundle(self):
        html = (ROOT / "systems/sol/elements/fe/index.html").read_text()
        self.assertIn('id="element-products" data-element="Fe"', html)
        self.assertNotIn("solar-report.generated.js", html)
        self.assertIn("element-products.js?v=", html)


if __name__ == "__main__":
    unittest.main()
