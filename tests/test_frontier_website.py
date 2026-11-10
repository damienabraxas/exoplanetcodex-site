import hashlib,importlib.util,json,re,unittest
from pathlib import Path
import jsonschema
ROOT=Path(__file__).resolve().parents[1]
def load(path):return json.loads((ROOT/path).read_text())
class FrontierWebsiteTests(unittest.TestCase):
 def setUp(self):self.data=load('assets/data/frontier-atlas.v1.json');self.meta=load('assets/data/frontier-snapshot.v1.json')
 def test_canonical_schema_and_exact_snapshot_hash(self):
  schema=load('assets/data/schemas/frontier-atlas.v1.schema.json');jsonschema.Draft202012Validator(schema,format_checker=jsonschema.FormatChecker()).validate(self.data)
  self.assertEqual(hashlib.sha256((ROOT/'assets/data/frontier-atlas.v1.json').read_bytes()).hexdigest(),self.meta['atlas_sha256'])
  self.assertEqual(hashlib.sha256((ROOT/'assets/data/schemas/frontier-atlas.v1.schema.json').read_bytes()).hexdigest(),self.meta['schema_sha256'])
 def test_no_scientific_promotion_or_invented_memberships(self):
  self.assertTrue(all(not e['execution_approved'] and e['coverage_status']!='validated' for e in self.data['entries']))
  self.assertTrue(all('line_set_memberships' not in e for e in self.data['entries']))
  self.assertEqual(next(e for e in self.data['entries'] if e['id']=='fe-ii-amarsi2019-table4')['treatment'],'3D_LTE')
 def test_sources_attribution_generated_and_complete(self):
  spec=importlib.util.spec_from_file_location('attribution',ROOT/'scripts/render_frontier_attribution.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
  html=(ROOT/'sources/index.html').read_text();self.assertEqual(module.updated(html),html)
  for e in self.data['entries']:self.assertIn('id="frontier-resource-'+e['id']+'"',html)
 def test_all_shared_navigation_exposes_atlas(self):
  spec=importlib.util.spec_from_file_location('navigation',ROOT/'scripts/sync_frontier_navigation.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
  for path in ROOT.rglob('*.html'):
   if any(p in {'.git','docs','assets','node_modules'} for p in path.relative_to(ROOT).parts):continue
   html=path.read_text();self.assertEqual(module.updated(html),html,str(path.relative_to(ROOT)))
   nav=re.search(r'<nav\b[^>]*class="[^"]*codex-nav[^"]*"[^>]*>.*?</nav>',html,re.S)
   if nav:self.assertIn('/spectroscopic-frontier/',nav[0])
 def test_standalone_route_roadmap_and_sitemap(self):
  html=(ROOT/'spectroscopic-frontier/index.html').read_text();self.assertIn('/assets/css/codex.css',html);self.assertIn('aria-current="page">Frontier',html)
  self.assertIn('/spectroscopic-frontier/',(ROOT/'roadmap.html').read_text());self.assertIn('https://exoplanetcodex.org/spectroscopic-frontier/',(ROOT/'sitemap.xml').read_text())
  homepage=(ROOT/'index.html').read_text();self.assertIn('data-mode="summary"',homepage);self.assertNotIn('frontier-atlas.js',homepage)
 def test_payload_is_bounded_and_no_raw_measurements_copied(self):
  self.assertLess((ROOT/'assets/data/frontier-atlas.v1.json').stat().st_size,250_000)
  self.assertNotIn('abundance_products',self.data)
 def test_local_research_target_exists_and_is_not_claimed_valid(self):
  target=self.meta['research_target'];self.assertTrue((ROOT/target['url'].lstrip('/')/'index.html').is_file());self.assertIn('no species/model validation',target['applicability'])
if __name__=='__main__':unittest.main()
