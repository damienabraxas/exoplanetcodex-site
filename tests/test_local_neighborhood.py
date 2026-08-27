import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class LocalNeighborhoodTests(unittest.TestCase):
    def test_obsolete_strip_is_physically_removed(self):
        html = (ROOT / "index.html").read_text()
        self.assertNotIn('class="data-strip"', html)
        self.assertNotIn("40.9 ly", html)
        self.assertIn('id="neighborhood-map"', html)

    def test_versioned_data_and_renderer_are_wired(self):
        html = (ROOT / "index.html").read_text()
        js = (ROOT / "assets/js/local-neighborhood.js").read_text()
        self.assertIn("/assets/js/local-neighborhood.js", html)
        self.assertIn("/assets/data/local-stellar-neighborhood.v1.json", js)
        data = json.loads((ROOT / "assets/data/local-stellar-neighborhood.v1.json").read_text())
        self.assertEqual(data["schema_version"], "1.0.0")
        self.assertEqual(len(data["targets"]), 19)

    def test_no_unpublished_target_gets_a_route(self):
        data = json.loads((ROOT / "assets/data/local-stellar-neighborhood.v1.json").read_text())
        for target in data["targets"]:
            if target["publication_status"] != "published":
                self.assertIsNone(target["url"])


if __name__ == "__main__":
    unittest.main()
