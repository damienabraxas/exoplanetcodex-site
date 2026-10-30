#!/usr/bin/env python3
"""Browser regressions: serve the site, then pass its base URL (requires Playwright)."""
import argparse
import json
from pathlib import Path

from playwright.sync_api import sync_playwright


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://127.0.0.1:8530')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    evidence = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page(reduced_motion='reduce')
        for slug in ('c', 'n', 'o', 'si', 'al', 'mg', 'na', 'fe', 'fe-ii'):
            for width in (1440, 768, 390):
                page.set_viewport_size({'width': width, 'height': 1000})
                page.goto(f'{args.url}/systems/sol/elements/{slug}/')
                page.evaluate('document.fonts.ready')
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (slug, width)
                regions = page.locator('.appendix-table-scroll')
                assert regions.count() >= 2
                contrast = page.evaluate('''() => {
                    const rgb = s => s.match(/[\\d.]+/g).map(Number);
                    const lum = c => c.slice(0,3).map(v => v/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4)
                        .reduce((v,n,i) => v+n*[.2126,.7152,.0722][i],0);
                    return Math.min(...[...document.querySelectorAll('.appendix-table th,.appendix-table td,.appendix-table small,.appendix-table caption,.appendix-table-hint')].map(el => {
                        const fg = rgb(getComputedStyle(el).color);
                        let bg = rgb(getComputedStyle(el.closest('th,td') || el).backgroundColor);
                        if (bg[3] === 0) {
                            bg = rgb(getComputedStyle(el.closest('.appendix-table-panel')).backgroundColor);
                            // Conservative bound: even a white star behind the translucent panel.
                            bg = bg.slice(0,3).map(v => v*(bg[3] ?? 1)+255*(1-(bg[3] ?? 1)));
                            bg = bg.map(v => .965*v+.035*230);
                        }
                        const a=lum(fg), b=lum(bg);
                        return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
                    }));
                }''')
                assert contrast >= 4.5, (slug, width, 'contrast', contrast)
                for region in regions.all():
                    assert region.locator('table').is_visible()
                    assert region.locator('thead').is_visible()
                    assert region.locator('td').first.evaluate('(el)=>parseFloat(getComputedStyle(el).fontSize) >= 14')
                    region.focus()
                    assert region.evaluate('(el)=>el === document.activeElement')
                    assert region.evaluate('(el)=>getComputedStyle(el).outlineStyle') != 'none'
                    if region.evaluate('(el)=>el.scrollWidth > el.clientWidth'):
                        page.keyboard.press('ArrowRight')
                        page.wait_for_timeout(180)
                        assert region.evaluate('(el)=>el.scrollLeft > 0'), (slug, width, 'keyboard scroll')
                        region.evaluate('(el)=>el.scrollLeft=el.scrollWidth')
                        assert region.locator('tr').first.locator('th').last.is_visible()
                # Browser zoom halves the CSS viewport and triggers responsive
                # breakpoints. CSS `zoom:2` does not, and gives a false failure.
                if width == 1440:
                    page.set_viewport_size({'width': 720, 'height': 500})
                    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (slug, '200% reflow')
                    page.set_viewport_size({'width': width, 'height': 1000})
                # Unbroken provenance must wrap within its column, even at mobile width.
                cell = page.locator('.appendix-table--measurement td').first
                cell.evaluate('(el)=>el.appendChild(document.createTextNode("provenance_".repeat(250)))')
                assert cell.evaluate('(el)=>el.scrollWidth <= el.clientWidth + 1'), (slug, width, 'long cell')
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
                evidence.append({'slug': slug, 'width': width, 'page_overflow': False,
                                 'minimum_text_contrast': round(contrast, 2),
                                 'keyboard_scroll': 'passed', 'zoom_200_percent_reflow': 'passed' if width == 1440 else 'tested at desktop',
                                 'long_provenance': 'passed'})
        browser.close()
    result = json.dumps(evidence, indent=2) + '\n'
    if args.output:
        args.output.write_text(result)
    print(f'{len(evidence)} appendix/viewport checks passed (including keyboard, 200% zoom and long provenance).')


if __name__ == '__main__':
    main()
