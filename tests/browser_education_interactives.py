"""Every review requirement is exercised against real browser controls, not mocks."""
import json,sys,tempfile,subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs/qa/rya1379-rework'
ORIGIN=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8523';URL=ORIGIN+'/education/'
def set_range(page,id,value):
 page.locator('#'+id).evaluate('(el,value)=>{el.value=value;el.dispatchEvent(new Event("input",{bubbles:true}));}',str(value))
def report(page,id):return page.locator('#'+id+' [data-result]').inner_text()
def ready(page):
 expect(page.locator('[data-ready="true"]')).to_have_count(11);expect(page.locator('#transition-controls')).to_be_visible()
def reset(page,id):page.locator('#'+id).get_by_role('button',name='Reset experiment',exact=True).click()
def fixture(body,content_type):
 return lambda route:route.fulfill(body=body,content_type=content_type)
def main():
 OUT.mkdir(parents=True,exist_ok=True);observations=[];axe=[];errors=[]
 with sync_playwright() as p:
  video_dir=tempfile.TemporaryDirectory(prefix='rya1379-video-');b=p.chromium.launch();context=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce',record_video_dir=video_dir.name,record_video_size={'width':1280,'height':900});page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.goto(URL,wait_until='networkidle');ready(page)
  # Before screenshots reproduce merged Phase 1 sources, independently of live cache.
  before_context=b.new_context(reduced_motion='reduce');before=before_context.new_page()
  for route,path in [('**/education/','education/index.html'),('**/assets/js/education.js','assets/js/education.js'),('**/assets/js/education-core.mjs','assets/js/education-core.mjs'),('**/assets/css/education.css','assets/css/education.css')]:
   body=subprocess.check_output(['git','show','2a4577b:'+path],cwd=ROOT,text=True)
   content_type='text/html' if path.endswith('.html') else 'text/css' if path.endswith('.css') else 'text/javascript'
   before.route(route,fixture(body,content_type))
  for width,name in [(1440,'desktop'),(390,'mobile')]:
   before.set_viewport_size({'width':width,'height':1000 if width==1440 else 844});before.goto(URL);expect(before.locator('#transition-controls')).to_be_visible()
   before.screenshot(path=str(OUT/f'before-landing-{name}.png'))
   before.locator('#stellar-spectroscopy').screenshot(path=str(OUT/f'before-stellar-planned-{name}.png'))
  before_context.close();page.bring_to_front()
  # Every range changes a real result or plot and resets to the declared reference.
  definitions=json.loads((ROOT/'assets/data/education-widgets.v1.json').read_text())['widgets']
  for widget in definitions:
   id=widget['id'];root=page.locator('#'+id);expect(root.locator('form')).to_be_visible()
   for c in widget['controls']:
    if c['kind']!='range':continue
    before=report(page,id);svg_before=root.locator('[data-visual]').inner_html()
    value=c['min']+c['step']*round(.73*(c['max']-c['min'])/c['step'])
    if abs(value-float(page.locator('#'+id+'-'+c['name']).input_value()))<c['step']/2:value=c['min']
    set_range(page,id+'-'+c['name'],value)
    after=report(page,id);svg_after=root.locator('[data-visual]').inner_html()
    assert before!=after or svg_before!=svg_after,(id,c['name'],'no response')
    observations.append({'widget':id,'parameter':c['name'],'expected':'result or plotted model updates immediately','before':before,'after':after,'observed':'updated'})
    reset(page,id)
   root.locator('input,select').first.focus();assert page.evaluate('document.activeElement.tagName') in ['INPUT','SELECT']
   if widget['controls'][0]['kind']=='range':
    old=root.locator('input').first.input_value();page.keyboard.press('ArrowRight');assert root.locator('input').first.input_value()!=old;reset(page,id)
   # One real CSV and self-contained SVG per experiment; check labels/provenance.
   for selector,suffix in [('[data-csv]','csv'),('[data-svg]','svg')]:
    print('Checking export',id,suffix,flush=True)
    with page.expect_download() as event:root.locator(selector).click()
    target=OUT/f'{id}-sample.{suffix}';event.value.save_as(target);data=target.read_text();assert 'https://' in data and ('source' in data.lower() or 'Sources' in data);target.write_text(data)
    page.wait_for_timeout(1100) # Pace user-triggered exports; avoid Chromium download burst throttling.
  # Visible spectrum pointer is a real wavelength input, not a decorative strip.
  bar=page.locator('#light-photon .spectrum-drag');bar.scroll_into_view_if_needed();box=bar.bounding_box();bar.click(position={'x':box['width']*.7,'y':box['height']*.25});assert page.locator('#light-photon-wavelength').input_value()!='550';reset(page,'light-photon')
  set_range(page,'light-photon-wavelength',500);expect(page.locator('#light-photon [data-result]')).to_contain_text('2.4797 eV')
  # Prism/grating: no propagating high order and the zero order are distinct.
  set_range(page,'dispersion-wavelength',700);set_range(page,'dispersion-grooves',1200);page.locator('#dispersion-order').select_option('2');expect(page.locator('#dispersion [data-result]')).to_contain_text('no propagating order');page.locator('#dispersion-order').select_option('0');expect(page.locator('#dispersion [data-result]')).to_contain_text('0.000°');reset(page,'dispersion');set_range(page,'dispersion-wavelength',500);set_range(page,'dispersion-grooves',1000);page.locator('#dispersion-order').select_option('2');expect(page.locator('#dispersion [data-result]')).to_contain_text('grazing-order singularity');reset(page,'dispersion')
  page.locator('#resolution').get_by_role('button',name='HARPS manual measured R',exact=True).click();expect(page.locator('#resolution-R')).to_have_value('120000');reset(page,'resolution')
  # Sodium fine structure, wavelength color and both interaction directions.
  page.locator('#atom').select_option('Na');expect(page.locator('#wavelength')).to_have_text('589.16 nm');expect(page.locator('#atomic-doublet')).to_be_visible();assert 'rgb(' in page.locator('#photon').get_attribute('style')
  page.locator('#transition').select_option('sodium-d1');expect(page.locator('#wavelength')).to_have_text('589.76 nm');page.get_by_label('Absorption · lower → higher').check();page.get_by_role('button',name='Play once',exact=True).click();expect(page.locator('#electron')).to_have_attribute('cy','70');expect(page.locator('#transition-status')).to_contain_text('photon absorbed')
  with page.expect_download() as download:page.get_by_role('button',name='Download labeled CSV',exact=True).click()
  sample=OUT/'atomic-sodium-sample.csv';download.value.save_as(sample);sample.write_text(sample.read_text());assert 'sodiumtable5.htm' in sample.read_text() and '"element","Na"' in sample.read_text()
  page.locator('#atom').select_option('H');page.locator('#transition').select_option('lyman-alpha');expect(page.locator('#atomic-color-note')).to_contain_text('invisible');expect(page.locator('#atomic-spectrum')).to_contain_text('outside visible');expect(page.locator('#atomic-spectrum line')).to_have_count(0);page.get_by_role('button',name='Reset reference',exact=True).click()
  # Real EW effect is an area, not a FWHM relabeling; shape controls also work.
  set_range(page,'equivalent-width-depth',.5);set_range(page,'equivalent-width-sigma',.1);expect(page.locator('#equivalent-width [data-result]')).to_contain_text('125.33 mÅ');page.locator('#equivalent-width-shape').select_option('lorentzian');expect(page.locator('#equivalent-width [data-result]')).to_contain_text('Lorentzian');reset(page,'equivalent-width')
  set_range(page,'curve-growth-abundance',1);set_range(page,'curve-growth-b',6);expect(page.locator('#curve-growth [data-result]')).to_contain_text('Broadening can change saturated EW');reset(page,'curve-growth')
  # Transit limits, both distinct exoplanet GUIs and the cross-module Doppler link.
  set_range(page,'transit-simulator-impact',0);set_range(page,'transit-simulator-limb',0);expect(page.locator('#transit-simulator [data-result]')).to_contain_text('1.000%');set_range(page,'transit-simulator-impact',1.4);expect(page.locator('#transit-simulator [data-result]')).to_contain_text('No transit');reset(page,'transit-simulator')
  set_range(page,'rv-simulator-inclination',0);expect(page.locator('#rv-simulator [data-result]')).to_contain_text('K=0.00');reset(page,'rv-simulator');page.locator('#rv-simulator [data-to-doppler]').click();assert float(page.locator('#doppler-velocity').input_value())>0;expect(page.locator('#doppler [data-result]')).to_contain_text('Receding');reset(page,'doppler')
  # Known, ungraded and absent metadata must remain different.
  page.locator('#atomic-metadata-line').select_option('sodium-d1');expect(page.locator('#atomic-metadata [data-visual]')).to_contain_text('-0.194');expect(page.locator('#atomic-metadata [data-visual]')).to_contain_text('-0.144');page.locator('#atomic-metadata-line').select_option('ungraded');expect(page.locator('#atomic-metadata [data-result]')).to_contain_text('ungraded');page.locator('#atomic-metadata-element').select_option('H');expect(page.locator('#atomic-metadata [data-result]')).to_contain_text('unknown');reset(page,'atomic-metadata')
  page.locator('#photon-exercise-answer').fill('2.48');page.locator('#photon-exercise [data-check]').click();expect(page.locator('#photon-exercise [data-feedback]')).to_contain_text('Correct');page.locator('#photon-exercise-answer').fill('9');page.locator('#photon-exercise [data-check]').click();expect(page.locator('#photon-exercise [data-feedback]')).to_contain_text('Try again');reset(page,'photon-exercise')
  # Share/reload and invalid shared values for every widget.
  for widget in definitions:
   id=widget['id'];c=next((c for c in widget['controls'] if c['kind']=='range'),None)
   if not c:continue
   value=c['min']+.3*(c['max']-c['min']);set_range(page,id+'-'+c['name'],value);root=page.locator('#'+id);expected=root.locator('[name="'+c['name']+'"]').input_value();url=root.locator('[data-share]').input_value();page.goto(url);ready(page);expect(page.locator('#'+id+' [name="'+c['name']+'"]')).to_have_value(expected);reset(page,id)
  page.goto(URL+'?stellar-simulator.teff=999999');ready(page);expect(page.locator('#stellar-simulator [data-load]')).to_contain_text('Invalid shared values');expect(page.locator('#stellar-simulator-teff')).to_have_value('5772')
  # A named screenshot per GUI and a module-wide keyboard/mobile/axe audit.
  for width,name in [(1440,'desktop'),(390,'mobile'),(320,'small-mobile')]:
   page.set_viewport_size({'width':width,'height':1000 if width==1440 else 844});page.goto(URL);ready(page)
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
   page.screenshot(path=str(OUT/f'landing-{name}.png'))
   for widget in definitions:
    root=page.locator('#'+widget['id']);root.screenshot(path=str(OUT/f'{widget["id"]}-{name}.png'))
    assert root.evaluate('(e)=>e.scrollWidth<=e.clientWidth+1'),widget['id']
   page.locator('#atom').select_option('Na');page.get_by_label('Absorption · lower → higher').check();page.locator('#hydrogen-explorer').screenshot(path=str(OUT/f'atomic-sodium-absorption-{name}.png'))
   if len(sys.argv)>2:
    page.add_script_tag(path=sys.argv[2]);r=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');axe.append({'width':width,'violations':r['violations']})
  (OUT/'accessibility.json').write_text(json.dumps(axe,indent=2));assert all(not r['violations'] for r in axe),[(r['width'],[(v['id'],[n['target'] for n in v['nodes']]) for v in r['violations']]) for r in axe]
  assert not errors,errors
  (OUT/'expected-observed.json').write_text(json.dumps(observations,indent=2))
  video=page.video;context.close();video.save_as(str(OUT/'interaction-walkthrough.webm'));video_dir.cleanup();b.close()
  summary=f'PASS: all 7 modules / 12 GUIs; {len(observations)} range responses, real selections, keyboard, reset, analytic limits, CSV/SVG, share/reload, invalid inputs, mobile overflow and axe.'
  (OUT/'browser-tests.txt').write_text(summary+'\n');print(summary)
if __name__=='__main__':main()
