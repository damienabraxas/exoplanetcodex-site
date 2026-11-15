"""Static content integrity: real destinations, reciprocal links and generated state."""
import importlib.util,json,re,unittest,sys
from pathlib import Path
from urllib.parse import urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
def module(name):
 spec=importlib.util.spec_from_file_location(name,ROOT/'scripts'/f'{name}.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
class EducationTests(unittest.TestCase):
 def test_generated_outputs_current(self):
  for name,value in module('generate_education').render().items():self.assertEqual((ROOT/name).read_text(),value,name)
 def test_all_education_local_links_and_search_destinations(self):
  page=(ROOT/'education/index.html').read_text();urls=re.findall(r'href="([^"]+)"',page)
  index=json.loads((ROOT/'assets/data/education-search.v1.json').read_text())
  urls += [e['url'] for e in index['entries']]
  for url in urls:
   u=urlsplit(url)
   if u.scheme or u.netloc:continue
   path=(ROOT/u.path.lstrip('/')) if u.path else ROOT/'education/index.html'
   if path.is_dir():path=path/'index.html'
   self.assertTrue(path.exists(),url)
   if u.fragment:
    if u.path=='/roadmap.html':
     roadmap=json.loads((ROOT/'assets/data/product-roadmap.v1.json').read_text());self.assertIn(u.fragment,{x['id'] for x in roadmap['products']})
    else:self.assertRegex(path.read_text(),r'id="'+re.escape(unquote(u.fragment))+'"',url)
 def test_every_lesson_has_required_learning_structure_and_backlinks(self):
  data=json.loads((ROOT/'assets/data/education-lessons.v1.json').read_text());gloss=(ROOT/'glossary/index.html').read_text()
  self.assertEqual(len(data['lessons']),7)
  for l in data['lessons']:
   for field in ['objectives','beginner','mathematics','advanced','diagram','example','misconception','glossary','sources','last_source_check']:self.assertTrue(l[field])
   for term in l['glossary']:
    block=gloss.split('id="'+term+'"',1)[1].split('<div class="term-card"',1)[0]
    self.assertIn('/education/#'+l['id'],block)
   for source in l['sources']:self.assertTrue(data['sources'][source]['url'].startswith('https://'))
 def test_navigation_is_complete_and_idempotent(self):
  sync=module('sync_education_navigation')
  for p in ROOT.rglob('*.html'):
   if any(x in {'.git','assets','docs','node_modules'} for x in p.relative_to(ROOT).parts):continue
   s=p.read_text();self.assertEqual(sync.updated(s),s,str(p))
  self.assertIn('<a href="/education/" class="active" aria-current="page">',(ROOT/'education/index.html').read_text())
  self.assertIn('https://exoplanetcodex.org/education/',(ROOT/'sitemap.xml').read_text())
 def test_no_tracking_requirement_or_runtime_science_dependency(self):
  page=(ROOT/'education/index.html').read_text()
  self.assertNotIn('analytics.js',page)
  self.assertNotIn('starfield.js',page)
  self.assertIn('independent scientific and accessibility review pending',page)
  self.assertEqual(page.count('data-widget='),11)
  self.assertIn('Schematic LTE absorbing slab',page)
  js=(ROOT/'assets/js/education.js').read_text();self.assertNotIn('innerHTML',js)
  self.assertEqual(len(re.findall(r'localJSON\(',js)),4) # definition plus three local assets

 def test_each_main_module_has_a_real_controlled_model(self):
  data=json.loads((ROOT/'assets/data/education-widgets.v1.json').read_text())
  modules={w['module'] for w in data['widgets']}|{'atomic-physics'}
  self.assertEqual(modules,{'light','atomic-physics','stellar-spectroscopy','elemental-abundances','exoplanets','atomic-laboratory','learning-resources'})
  for w in data['widgets']:
   self.assertTrue(w['controls']);self.assertTrue(w['model']);self.assertTrue(w['sources'])
   for c in w['controls']:
    if c['kind']!='select':self.assertTrue(c['min']<=c['value']<=c['max'])
  sodium=json.loads((ROOT/'assets/data/education-sodium.v1.json').read_text())
  self.assertEqual(sodium['line_records'][0]['nist_grade'],'AA')
  self.assertIsNone(sodium['line_records'][2]['nist_grade'])
  for source in sodium['canonical_source'].values():
   self.assertEqual(len(source['sha256']),64);self.assertIn(sodium['science_base'],source['url'])
if __name__=='__main__':unittest.main()
