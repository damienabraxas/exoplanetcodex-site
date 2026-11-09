import copy
import importlib.util
import json
import unittest
from pathlib import Path
from urllib.parse import urlsplit
import jsonschema
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/'assets/data'/name).read_text())
class ProductRoadmapTests(unittest.TestCase):
    def setUp(self):self.data=load('product-roadmap.v1.json');self.credits=load('roadmap-credits.v1.json')
    def test_schemas_and_invalid_status(self):
        for name in ['product-roadmap','roadmap-credits']:
            jsonschema.Draft202012Validator(load('schemas/'+name+'.v1.schema.json'),format_checker=jsonschema.FormatChecker()).validate(load(name+'.v1.json'))
        bad=copy.deepcopy(self.data);bad['products'][0]['validation']='complete'
        with self.assertRaises(jsonschema.ValidationError):jsonschema.validate(bad,load('schemas/product-roadmap.v1.schema.json'))
    def test_tracks_references_and_no_unverified_percentages(self):
        self.assertEqual({p['id'] for p in self.data['products']},{'stellar-survey','bride','atomic-laboratory','abundance-gui','cross-engine'})
        credits={c['id'] for c in self.credits['credits']};products={p['id'] for p in self.data['products']}
        for p in self.data['products']:
            self.assertTrue(set(p['credits'])<=credits);self.assertTrue(set(p['dependencies'])<=products)
            self.assertEqual(len({m['id'] for m in p['milestones']}),len(p['milestones']))
            self.assertTrue(p['evidence']);self.assertNotIn('percent',p);self.assertNotIn('weight',p)
            self.assertIn(p['validation'],['hold','not_assessed'])
    def test_safe_links_and_local_targets(self):
        def walk(v):
            if isinstance(v,dict):
                for k,x in v.items():
                    if k in ['url','license_url','evidence'] and isinstance(x,str):
                        parsed=urlsplit(x)
                        if x.startswith('/'):
                            self.assertFalse(x.startswith('//'));path=ROOT/parsed.path.lstrip('/');self.assertTrue(path.exists(),x)
                            if parsed.fragment and path.is_dir():self.assertIn('id="'+parsed.fragment+'"',(path/'index.html').read_text())
                        else:self.assertEqual(parsed.scheme,'https',x)
                    else:walk(x)
            elif isinstance(v,list):
                for x in v:walk(x)
        walk(self.data);walk(self.credits)
    def test_shared_shell_and_preserved_legacy(self):
        html=(ROOT/'roadmap.html').read_text();self.assertIn('/assets/css/codex.css',html);self.assertIn('class="codex-nav"',html);self.assertIn('class="codex-footer"',html);self.assertIn('aria-current="page"',html)
        self.assertIn('id="release-roadmap"',html);self.assertIn('url=/roadmap.html',(ROOT/'roadmap/index.html').read_text())
    def test_generated_sources_is_current(self):
        spec=importlib.util.spec_from_file_location('credits',ROOT/'scripts/render_roadmap_credits.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
        html=(ROOT/'sources/index.html').read_text();self.assertEqual(module.updated(html),html)
        for c in self.credits['credits']:self.assertIn('id="software-'+c['id']+'"',html)
if __name__=='__main__':unittest.main()
