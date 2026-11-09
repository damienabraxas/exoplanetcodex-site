"""Run against a local server: python tests/browser_product_roadmap.py [origin]."""
import json,subprocess,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs/qa/rya1370';ORIGIN=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8520'
def ready(page):page.wait_for_selector('.product-card')
def main():
    with sync_playwright() as p:
        browser=p.chromium.launch();page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        old=subprocess.run(['git','show','09526e8:roadmap.html'],cwd=ROOT,text=True,capture_output=True).stdout or (ROOT/'roadmap.html').read_text()
        page.route('**/roadmap.html',lambda route:route.fulfill(body=old,content_type='text/html'))
        page.goto(ORIGIN+'/roadmap.html');page.wait_for_selector('.release');page.screenshot(path=str(OUT/'before-desktop.png'),full_page=True)
        page.set_viewport_size({'width':390,'height':844});page.screenshot(path=str(OUT/'before-mobile.png'),full_page=True);page.unroute('**/roadmap.html')
        for width,name in [(1440,'desktop'),(390,'mobile'),(320,'small-mobile')]:
            page.set_viewport_size({'width':width,'height':1000 if width==1440 else 844});page.goto(ORIGIN+'/roadmap.html');ready(page)
            assert page.locator('.product-card').count()==5
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            page.screenshot(path=str(OUT/f'after-{name}.png'),full_page=True)
            page.goto(ORIGIN+'/roadmap.html#atomic-laboratory');ready(page);assert page.locator('#atomic-laboratory').is_visible();assert not page.locator('#stellar-survey').is_visible()
            page.locator('#atomic-laboratory summary').first.focus();page.keyboard.press('Enter');assert page.locator('#atomic-laboratory details').first.get_attribute('open') is not None
            page.screenshot(path=str(OUT/f'atomic-{name}.png'),full_page=True)
        # Browser back restores the selected product, including legacy survey anchors.
        page.goto(ORIGIN+'/roadmap.html#bride');ready(page);page.locator('.product-selector a[href="#cross-engine"]').click();page.locator('#cross-engine').wait_for(state='visible');page.go_back();page.locator('#bride').wait_for(state='visible')
        page.goto(ORIGIN+'/roadmap/');ready(page);assert page.url.endswith('/roadmap.html')
        # Missing/empty snapshots and unsafe external text are exercised through real rendering.
        data=json.loads((ROOT/'assets/data/product-roadmap.v1.json').read_text())
        for fixture,expected in [({**data,'products':[]},'No product milestones'),({'schema':'invalid','products':[]},'snapshot is unavailable')]:
            page.route('**/product-roadmap.v1.json',lambda route,request,fixture=fixture:route.fulfill(json=fixture));page.goto(ORIGIN+'/roadmap.html');page.get_by_text(expected,exact=False).wait_for();page.unroute('**/product-roadmap.v1.json')
        data['products'][0]['title']='<img src=x onerror="window.injected=1">';data['products'][0]['milestones'][0]['evidence'][0]['url']='javascript:alert(1)'
        page.route('**/product-roadmap.v1.json',lambda route:route.fulfill(json=data));page.goto(ORIGIN+'/roadmap.html');ready(page);assert not page.evaluate('Boolean(window.injected)');assert page.locator('#product-roadmap img').count()==0;assert page.locator('#product-roadmap a[href^="javascript:"]').count()==0;page.unroute('**/product-roadmap.v1.json')
        page.route('**/product-roadmap.v1.json',lambda route:route.fulfill(status=503));page.goto(ORIGIN+'/roadmap.html');page.locator('#product-roadmap .error').wait_for();page.unroute('**/product-roadmap.v1.json')
        # Check every local page/asset linked by the roadmap (fragments separately).
        page.goto(ORIGIN+'/roadmap.html');ready(page);links=page.locator('a[href^="/"],link[href^="/"],script[src^="/"]').evaluate_all('(els)=>els.map(e=>e.getAttribute("href")||e.getAttribute("src"))')
        for href in set(links):assert page.request.get(ORIGIN+href.split('#')[0]).ok,href
        page.goto(ORIGIN+'/sources/#software-grasp');assert page.locator('#software-grasp').is_visible()
        page.locator('#src-q').fill('GRASP');assert page.locator('#software-grasp').is_visible()
        assert not errors,errors
        browser.close()
    print('PASS: desktop/mobile/320px, deep links/back, keyboard details, reduced motion, empty/invalid/503 data, injection safety, local links, Sources attribution/search; no JS errors.')

if __name__ == "__main__":
    main()
