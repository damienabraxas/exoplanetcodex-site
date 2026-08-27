import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class ReleaseRoadmapTests(unittest.TestCase):
    def test_roadmap_is_product_driven_and_has_no_linear_dashboard(self):
        html = (ROOT / "roadmap.html").read_text()
        js = (ROOT / "assets/js/release-roadmap.js").read_text()
        self.assertIn('id="release-roadmap"', html)
        self.assertIn("/assets/data/release-roadmap.v1.json", js)
        self.assertNotIn("fetchLinear", html)
        self.assertNotIn("info-panels", html)
        self.assertNotIn("tasks", html)
        legacy = (ROOT / "roadmap/index.html").read_text()
        self.assertIn('url=/roadmap.html', legacy)
        self.assertNotIn("fetchLinear", legacy)

    def test_release_product_has_separate_alpha_centauri_progress(self):
        data = json.loads((ROOT / "assets/data/release-roadmap.v1.json").read_text())
        self.assertEqual(data["schema"], "codex.release_roadmap/1")
        self.assertEqual(data["canonical_product_count"], 27)
        releases = {release["id"]: release for release in data["releases"]}
        self.assertEqual(releases["foundation"]["status"], "complete")
        self.assertEqual(releases["alpha"]["targets"][0]["complete_products"], 2)
        beta = releases["beta"]["targets"]
        self.assertEqual([target["target_id"] for target in beta], ["alpha_cen_a", "alpha_cen_b"])

    def test_method_is_short_multiband_and_multi_engine_summary(self):
        html = (ROOT / "index.html").read_text()
        self.assertIn("high-resolution UV, visible, and infrared", html)
        self.assertIn("1D/3D and LTE/NLTE", html)
        self.assertNotIn("Equivalent widths</div>", html)


if __name__ == "__main__":
    unittest.main()
