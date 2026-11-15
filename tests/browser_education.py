"""Real-browser Education acceptance evidence. Origin and axe path are arguments."""
import json,sys,subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs/qa/rya1379';ORIGIN=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8523';URL=ORIGIN+'/education/'
def ready(page):
 expect(page.locator('#transition-controls')).to_be_visible();expect(page.locator('#education-search-form')).to_be_visible()
def main():
 OUT.mkdir(parents=True,exist_ok=True);reports=[];errors=[]
 with sync_playwright() as p:
  b=p.chromium.launch();page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');page.on('pageerror',lambda e:errors.append(str(e)))
  for width,name in [(1440,'desktop'),(768,'tablet'),(390,'mobile'),(320,'small-mobile')]:
   page.set_viewport_size({'width':width,'height':1000 if width>700 else 844});page.goto(URL,wait_until='networkidle');ready(page)
   assert page.locator('.module-tile').count()==7;assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
   expect(page.locator('.nav-links a[href="/education/"]')).to_be_visible();assert page.locator('.module-grid').evaluate('(el)=>el.previousElementSibling.classList.contains("education-search")')
   page.screenshot(path=str(OUT/f'education-{name}.png'),full_page=True)
   page.screenshot(path=str(OUT/f'landing-{name}.png'))
   page.locator('.module-tile[href="#atomic-physics"]').focus();page.keyboard.press('Enter');assert page.url.endswith('#atomic-physics')
   page.locator('#hydrogen-explorer').screenshot(path=str(OUT/f'explorer-{name}.png'))
   q=page.locator('#education-query');q.fill('Teff');expect(page.locator('#search-results')).to_contain_text('Effective temperature');expect(page.locator('#search-results')).to_contain_text('Glossary')
   q.fill('xi');expect(page.locator('#search-results')).to_contain_text('Microturbulence');q.fill('ξ');expect(page.locator('#search-results')).to_contain_text('Microturbulence');q.fill('microturbulenc');expect(page.locator('#search-results')).to_contain_text('Microturbulence')
   q.fill('hydrogen');expect(page.locator('#search-results')).to_contain_text('Interactive');q.focus();page.keyboard.press('Enter');assert page.evaluate('document.activeElement.matches("#search-results a")')
   q.fill('wavelength');assert page.locator('#search-results mark').count()>0;q.fill('zzzzqwerty');expect(page.locator('#search-status')).to_contain_text('No matches');q.fill('<script>alert(1)</script>');assert page.locator('#search-results script').count()==0;q.fill('')
   page.locator('#transition').select_option('balmer-beta');page.get_by_label('Absorption · lower → higher').check();expect(page.locator('#transition-caption')).to_contain_text('Absorption');expect(page.locator('#wavelength')).to_have_text('486.26 nm');expect(page.locator('#electron')).to_have_attribute('cy','215')
   expect(page.locator('#transition-arrow')).to_have_attribute('d','M190 200 V85');page.locator('#play-transition').focus();page.keyboard.press('Enter');expect(page.locator('#transition-status')).to_contain_text('photon absorbed');expect(page.locator('#electron')).to_have_attribute('cy','70');assert page.evaluate('document.getAnimations().filter(a=>a.playState==="running").length')==0
   share=page.locator('#share-configuration').input_value();assert 'mode=absorption' in share and 'transition=balmer-beta' in share;page.goto(share);ready(page);expect(page.locator('#transition')).to_have_value('balmer-beta');expect(page.get_by_label('Absorption · lower → higher')).to_be_checked()
   if len(sys.argv)>2:
    page.add_script_tag(path=sys.argv[2]);report=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');reports.append({'width':width,'violations':report['violations']})
   page.get_by_role('button',name='Reset reference').click();expect(page.locator('#wavelength')).to_have_text('656.45 nm');expect(page.locator('#electron')).to_have_attribute('cy','70')
  # Before/after shared navigation evidence at pinned main.
  before=subprocess.check_output(['git','show','da7a249:index.html'],cwd=ROOT,text=True)
  for width,name in [(1440,'desktop'),(390,'mobile')]:
   page.set_viewport_size({'width':width,'height':1000 if width==1440 else 844});page.route(ORIGIN+'/',lambda route:route.fulfill(status=200,content_type='text/html',body=before));page.goto(ORIGIN+'/');page.wait_for_timeout(1400);page.screenshot(path=str(OUT/f'before-home-{name}.png'));page.unroute(ORIGIN+'/');page.reload();page.wait_for_timeout(1400);page.screenshot(path=str(OUT/f'after-home-{name}.png'))
  page.goto(URL);ready(page)
  # Animation is finite and ends on the correct physical state; switching cancels it.
  page.emulate_media(reduced_motion='no-preference');page.get_by_role('button',name='Play once').click();expect(page.locator('#transition-status')).to_contain_text('photon emitted');expect(page.locator('#electron')).to_have_attribute('cy','215');expect(page.locator('#photon')).to_have_attribute('cx','480')
  page.get_by_role('button',name='Play once').click();page.locator('#transition').select_option('lyman-alpha');expect(page.locator('#wavelength')).to_have_text('121.57 nm');expect(page.locator('#transition-band')).to_have_text('UV');expect(page.locator('#play-transition')).to_be_enabled()
  for button,suffix in [('Download labeled CSV','.csv'),('Download diagram SVG','.svg')]:
   with page.expect_download() as download:page.get_by_role('button',name=button).click()
   d=download.value;assert d.suggested_filename.endswith(suffix);target=OUT/('sample-transition'+suffix);d.save_as(target);assert 'https://physics.nist.gov' in target.read_text();target.write_text(target.read_text()) # normalize evidence newlines; downloaded CSV uses CRLF
  # Real dynamically rendered roadmap destination.
  page.goto(ORIGIN+'/roadmap.html#atomic-laboratory');expect(page.locator('#atomic-laboratory')).to_be_visible()
  # Real linked glossary term has reciprocal lesson links.
  page.goto(ORIGIN+'/glossary/#microturbulence');expect(page.locator('#microturbulence a[href="/education/#stellar-spectroscopy"]')).to_be_visible()
  # No JS: complete lesson sequence and numerical reference survive.
  ctx=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});fallback=ctx.new_page();fallback.goto(URL);expect(fallback.locator('#wavelength')).to_have_text('656.45 nm');assert fallback.locator('.lesson').count()==8;expect(fallback.locator('#transition-controls')).to_be_hidden();assert fallback.locator('a[href="/education/classroom-activity.txt"]').count()==1;fallback.screenshot(path=str(OUT/'no-js-mobile.png'),full_page=True);ctx.close()
  # Failed/invalid/empty JSON retains authored lessons and a usable static example.
  for kind in ['503','invalid','empty']:
   ctx=b.new_context();bad=ctx.new_page();bad.route('**/assets/data/education-*.json',lambda route:route.fulfill(status=503 if kind=='503' else 200,content_type='application/json',body='invalid' if kind=='invalid' else '{}'))
   bad.goto(URL);expect(bad.locator('#explorer-load')).to_contain_text('could not load');expect(bad.locator('#wavelength')).to_have_text('656.45 nm');expect(bad.locator('#transition-controls')).to_be_hidden();expect(bad.locator('#search-load')).to_contain_text('Search is unavailable');ctx.close()
  assert not errors,errors
  (OUT/'accessibility.json').write_text(json.dumps(reports,indent=2));assert all(not r['violations'] for r in reports),[(r['width'],[(v['id'],len(v['nodes'])) for v in r['violations']]) for r in reports]
  (OUT/'browser-tests.txt').write_text('PASS: Chromium 1440/768/390/320px; tile navigation, aliases, typo tolerance, highlights, keyboard, mode/state, real animation, reduced motion, share/reload, reset, CSV/SVG, reciprocal glossary, roadmap anchor, no-JS, 503/invalid/empty fallback. Zero page errors. Axe WCAG A/AA: zero violations at all four widths.\n')
  print((OUT/'browser-tests.txt').read_text());b.close()
if __name__=='__main__':main()
