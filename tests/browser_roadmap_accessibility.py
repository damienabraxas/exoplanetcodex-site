import json,sys
from playwright.sync_api import sync_playwright
from pathlib import Path
def main():
    with sync_playwright() as p:
     b=p.chromium.launch();page=b.new_page(reduced_motion='reduce');out=[]
     for w in [1440,390]:
      page.set_viewport_size({'width':w,'height':1000});page.goto('http://127.0.0.1:8520/roadmap.html#atomic-laboratory');page.wait_for_selector('.product-card');page.add_script_tag(path=sys.argv[1]);r=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');out.append({'width':w,'violations':r['violations']})
     Path('docs/qa/rya1370/accessibility.json').write_text(json.dumps(out,indent=2));assert not any(x['violations'] for x in out),out;print([(x['width'],[(v['id'],len(v['nodes'])) for v in x['violations']]) for x in out]);b.close()

if __name__ == "__main__":
    main()
