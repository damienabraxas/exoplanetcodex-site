import sys, json
from pathlib import Path
from playwright.sync_api import sync_playwright

dest=Path(__file__).resolve().parent
dest.mkdir(parents=True,exist_ok=True)
phase=sys.argv[1]
base_url=sys.argv[2] if len(sys.argv)>2 else 'http://127.0.0.1:8530'
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    page=browser.new_page()
    results=[]
    for slug in ['c','fe','si']:
        for width in [1440,768,390]:
            page.set_viewport_size({'width':width,'height':1000})
            page.goto(f'{base_url}/systems/sol/elements/{slug}/')
            page.evaluate('document.fonts.ready')
            if slug=='fe' and phase=='before':
                page.get_by_text('Grades and model labels',exact=True).click()
                target=page.locator('details').filter(has=page.get_by_text('Grades and model labels',exact=True))
                target.screenshot(path=str(dest/f'{phase}-{slug}-{width}-grades.png'))
                title='Read all product values, including alternate line sets and experiments'
                page.get_by_text(title,exact=True).click()
                target=page.locator('details').filter(has=page.get_by_text(title,exact=True))
                target.scroll_into_view_if_needed()
                page.evaluate('(el)=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-24)',target.element_handle())
                page.screenshot(path=str(dest/f'{phase}-{slug}-{width}-measurement.png'))
            else:
                for title,short in [('Line grades','grades'),('How this was measured','measurement')]:
                    target=page.locator('section').filter(has=page.get_by_role('heading',name=title,exact=True))
                    if target.count():
                        # A viewport crop keeps long tables readable at full resolution.
                        target.scroll_into_view_if_needed()
                        page.evaluate('(el)=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-24)',target.element_handle())
                        page.screenshot(path=str(dest/f'{phase}-{slug}-{width}-{short}.png'))
            results.append({'slug':slug,'width':width,'page_width':page.evaluate('document.documentElement.scrollWidth')})
    (dest/f'{phase}-layout.json').write_text(json.dumps(results,indent=2)+'\n')
    browser.close()
