"""Behavioral QA against a served static site; pass origin and optional axe path."""
import copy,json,sys
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs/qa/rya1377'
ORIGIN=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8521'
URL=ORIGIN+'/spectroscopic-frontier/'
def ready(page):expect(page.locator('#atlas-filters')).to_be_visible();expect(page.locator('#result-count')).to_contain_text('resource records')
def main():
 OUT.mkdir(parents=True,exist_ok=True);reports=[]
 with sync_playwright() as p:
  b=p.chromium.launch();page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  for width,name in [(1440,'desktop'),(390,'mobile'),(320,'small-mobile')]:
   page.set_viewport_size({'width':width,'height':1000 if width==1440 else 844});page.goto(URL,wait_until='domcontentloaded');ready(page)
   assert page.locator('.coverage-table tbody tr').count()==30
   expect(page.locator('.nav-links a[href="/spectroscopic-frontier/"]')).to_be_visible()
   expect(page.locator('.atlas-jumps')).to_be_visible()
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
   page.screenshot(path=str(OUT/f'atlas-{name}.png'),full_page=True)
   page.locator('#filter-species').select_option('O');expect(page.locator('#result-count')).to_have_text('2 of 30 resource records')
   page.locator('#coverage').screenshot(path=str(OUT/f'oxygen-matrix-{name}.png'))
   page.locator('#atlas-search').fill('777');expect(page.locator('#result-count')).to_have_text('2 of 30 resource records')
   page.locator('.coverage-table a').first.focus();page.keyboard.press('Enter');expect(page.locator('.atlas-detail')).to_be_visible();expect(page.locator('#entry-title')).to_have_text('O I')
   expect(page.locator('.atlas-detail')).to_contain_text('Multiplet-averaged');expect(page.locator('.atlas-detail')).to_contain_text('10.1051/0004-6361/201936265')
   assert page.locator('.atlas-detail .axis-table tbody tr').count()==5
   page.locator('.atlas-detail details summary').focus();page.keyboard.press('Enter');expect(page.locator('.transition-list')).to_be_visible()
   page.screenshot(path=str(OUT/f'oxygen-detail-{name}.png'),full_page=True)
   if len(sys.argv)>2:
    page.add_script_tag(path=sys.argv[2]);r=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');reports.append({'width':width,'violations':r['violations']})
   page.get_by_role('button',name='Reset filters').click();expect(page.locator('#result-count')).to_have_text('30 of 30 resource records')
  page.goto(URL+'?species=Fe&ion=II#entry-fe-ii-gerber-atom');ready(page);expect(page.locator('#entry-title')).to_have_text('Fe II');expect(page.locator('.atlas-detail')).to_contain_text('0 bound-bound transitions');expect(page.locator('.atlas-detail .atlas-badges')).to_contain_text('Known gap')
  page.reload(wait_until='domcontentloaded');ready(page);expect(page.locator('#filter-species')).to_have_value('Fe');expect(page.locator('#filter-ion')).to_have_value('II')
  page.goto(URL+'?q=Fe%20II',wait_until='domcontentloaded');ready(page);expect(page.locator('.coverage-table a[href="#entry-fe-ii-amarsi2022-surrogate"]').first).to_be_visible()
  page.goto(URL+'?teff=99999');ready(page);expect(page.locator('#filter-note')).to_contain_text('envelopes');assert page.locator('.coverage-table').count()==1
  page.locator('.quantitative summary').click();page.locator('#filter-unknown').select_option('exclude');expect(page.locator('.atlas-empty')).to_be_visible()
  page.locator('#filter-status').select_option('outside_scope');expect(page.locator('#result-count')).to_have_text('4 of 30 resource records')
  page.goto(URL+'?co=0.5&unknown=exclude');ready(page);expect(page.locator('.atlas-empty')).to_be_visible()
  page.goto(URL+'?treatment=ONE_POINT_FIVE_D_NLTE',wait_until='domcontentloaded');ready(page);expect(page.locator('.atlas-empty')).to_be_visible()
  page.goto(URL+'?treatment=MEAN3D_NLTE',wait_until='domcontentloaded');ready(page);expect(page.locator('.atlas-empty')).to_be_visible()
  page.goto(URL+'?status=validated');ready(page);expect(page.locator('.atlas-empty')).to_be_visible()
  page.goto(URL+'?stellar=cool');ready(page);expect(page.locator('#filter-note')).to_contain_text('not a validated model');assert page.locator('.coverage-table tbody tr').count()==15
  assert page.locator('#target-pathway a').first.get_attribute('href')=='/systems/gliese581/'
  page.locator('#filter-species').select_option('H2O');expect(page.locator('.coverage-table')).to_contain_text('Not yet audited')
  page.goto(URL+'?isotope=13CH');ready(page);expect(page.locator('#result-count')).to_have_text('1 of 30 resource records')
  page.goto(URL+'?membership=asplund');ready(page);expect(page.locator('.atlas-empty')).to_be_visible();expect(page.locator('#filter-note')).to_contain_text('Source authorship does not imply membership')
  page.goto(URL+'?atmosphere=marcs');ready(page);expect(page.locator('#result-count')).to_have_text('3 of 30 resource records')
  page.goto(URL+'?engine=turbospectrum');ready(page);expect(page.locator('#result-count')).to_have_text('3 of 30 resource records')
  page.goto(URL+'?band=IR&component=correction_grid');ready(page);assert page.locator('.coverage-table tbody tr').count()==4
  data=json.loads((ROOT/'assets/data/frontier-atlas.v1.json').read_text())
  # Future multi-source memberships remain distinct from independent grade evidence.
  fixture=copy.deepcopy(data);fixture['entries'][0]['line_set_memberships']=[{'id':'asplund','reason':'Fixture: source selection only'},{'id':'amarsi','reason':'Fixture: separate membership'}]
  fixture['entries'][0]['summary']='<img src=x onerror="window.injected=1">';fixture['sources']['cno-lines']['evidence_url']='javascript:alert(1)'
  page.route('**/frontier-atlas.v1.json',lambda route:route.fulfill(json=fixture));page.goto(URL+'?membership=asplund#entry-o-i-amarsi2019-3n');ready(page);expect(page.locator('#result-count')).to_have_text('1 of 30 resource records');expect(page.locator('.atlas-detail')).to_contain_text('Fixture: separate membership');assert not page.evaluate('Boolean(window.injected)');assert page.locator('.atlas-detail img,.atlas-detail a[href^="javascript:"]').count()==0;page.unroute('**/frontier-atlas.v1.json')
  # Empty, invalid, failed and loading states never manufacture a result.
  for fixture in [{**data,'entries':[]},{'schema':'invalid','entries':[]}]:
   page.route('**/frontier-atlas.v1.json',lambda route,request,fixture=fixture:route.fulfill(json=fixture));page.goto(URL,wait_until='domcontentloaded')
   if fixture['schema']=='invalid':expect(page.locator('.atlas-error')).to_be_visible()
   else:expect(page.locator('.atlas-empty')).to_be_visible()
   page.unroute('**/frontier-atlas.v1.json')
  page.route('**/frontier-atlas.v1.json',lambda route:route.fulfill(status=503));page.goto(URL,wait_until='domcontentloaded');expect(page.locator('.atlas-error')).to_be_visible();page.unroute('**/frontier-atlas.v1.json')
  page.route('**/frontier-atlas.v1.json',lambda route:route.abort());page.goto(URL,wait_until='domcontentloaded');expect(page.locator('.atlas-error')).to_be_visible();page.unroute('**/frontier-atlas.v1.json')
  # Local navigation, source anchors, research target and downloadable snapshots resolve.
  page.goto(URL,wait_until='domcontentloaded');ready(page)
  urls=page.locator('a[href^="/"],link[href^="/"],script[src^="/"]').evaluate_all('(els)=>els.map(e=>e.getAttribute("href")||e.getAttribute("src"))')
  for href in set(urls):assert page.request.get(ORIGIN+href.split('#')[0]).ok,href
  for e in data['entries']:
   page.goto(URL+'#entry-'+e['id'],wait_until='domcontentloaded');ready(page);expect(page.locator('.atlas-detail')).to_be_visible()
  page.goto(ORIGIN+'/sources/#frontier-attribution');expect(page.locator('#frontier-attribution')).to_be_visible();page.locator('#src-q').fill('fe-ii-gerber-atom');expect(page.locator('#frontier-resource-fe-ii-gerber-atom')).to_be_visible()
  page.goto(ORIGIN+'/');assert page.locator('.nav-links a[href="/spectroscopic-frontier/"]').count()==1;assert page.locator('#release-roadmap[data-mode="summary"]').count()==1;assert page.locator('iframe[src="/roadmap.html"]').count()==0
  assert not errors,errors
  (OUT/'accessibility.json').write_text(json.dumps(reports,indent=2));assert not any(r['violations'] for r in reports),[(r['width'],[(v['id'],[n['target'] for n in v['nodes']]) for v in r['violations']]) for r in reports]
  b.close()
 print('PASS: desktop/mobile/320px, all 30 details, query/deep links, source and quantitative filters, no-claim missing domains, M-dwarf/isotopologue paths, many-to-many membership fixture, keyboard/reset, empty/invalid/failed data, injection safety, links and axe WCAG A/AA.')
if __name__=='__main__':main()
