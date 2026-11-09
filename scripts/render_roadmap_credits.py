#!/usr/bin/env python3
"""Insert canonical software attribution after bibliography generation; --check for CI."""
import argparse,json,re
from html import escape
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1]
START='<!-- ROADMAP SOFTWARE START -->';END='<!-- ROADMAP SOFTWARE END -->'
def anchor(text,url):
    if not (url.startswith('/') and not url.startswith('//')) and urlsplit(url).scheme!='https':
        raise ValueError('unsafe credit URL')
    return f'<a href="{escape(url,quote=True)}">{escape(text)}</a>'
def render():
    data=json.loads((ROOT/'assets/data/roadmap-credits.v1.json').read_text())
    rows=[]
    for c in data['credits']:
        rows.append(f'<article class="src-entry" id="software-{escape(c["id"])}"><h3>{anchor(c["name"],c["url"])}</h3><p>{escape(c["authors"])}</p><p>{escape(c["role"])}</p><p><strong>Version:</strong> {escape(c["version"])}</p><p><strong>Citation:</strong> {escape(c["citation"])}</p><p><strong>Reuse:</strong> {escape(c["license"])} {anchor("Upstream terms",c["license_url"])}</p><p>'+ ' · '.join(anchor(p['title'],p['url']) for p in c['papers'])+f'</p><p>{anchor("Code / manifest evidence",c["evidence"])} · {escape(c["scope"])} · accessed {escape(c["accessed"])}</p></article>')
    return START+'\n<section class="src-section" id="roadmap-software"><h2>Roadmap software &amp; atomic-source attribution</h2><p class="src-blurb">Verified use is tied to the named merged artifact or review branch. Theoretical predictions are not laboratory measurements; exploratory calculations remain on scientific HOLD. Pending fields are unresolved, not assumed. This section is generated from assets/data/roadmap-credits.v1.json.</p>\n'+'\n'.join(rows)+'\n</section>\n'+END

def updated(html):
    block=render()
    if START in html:return re.sub(re.escape(START)+'.*?'+re.escape(END),lambda _:block,html,flags=re.S)
    return html.replace('  <div class="src-stats">',block+'\n  <div class="src-stats">',1)
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
    path=ROOT/'sources/index.html';old=path.read_text();new=updated(old)
    if args.check:
        if old!=new:raise SystemExit('Roadmap software attribution is stale; run scripts/render_roadmap_credits.py')
    else:path.write_text(new)
