#!/usr/bin/env python3
"""Add the atlas link to existing shared navigation/footer markup, idempotently."""
import argparse,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];ROUTE='/spectroscopic-frontier/'
def updated(html):
    def nav(match):
        block=match[0]
        if ROUTE not in block:
            link='<li><a href="'+ROUTE+'">Frontier</a></li>'
            block=re.sub(r'(<li><a href="(?:/roadmap.html|#roadmap)"[^>]*>Roadmap</a></li>)',r'\1\n      '+link,block,count=1)
            if ROUTE not in block:block=block.replace('</ul>',link+'\n    </ul>',1)
        return block
    html=re.sub(r'<nav\b[^>]*class="[^"]*codex-nav[^"]*"[^>]*>.*?</nav>',nav,html,flags=re.S)
    def footer(match):
        block=match[0]
        if ROUTE not in block:block=block.replace('<p class="footer-label">Science</p>','<p class="footer-label">Science</p><a href="'+ROUTE+'">Spectroscopic Frontier</a>',1)
        return block
    return re.sub(r'<footer\b[^>]*class="[^"]*codex-footer[^"]*"[^>]*>.*?</footer>',footer,html,flags=re.S)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args();changed=[]
    for path in ROOT.rglob('*.html'):
        if any(part in {'.git','assets','docs','node_modules'} for part in path.relative_to(ROOT).parts):continue
        old=path.read_text();new=updated(old)
        if old!=new:
            changed.append(str(path.relative_to(ROOT)))
            if not a.check:path.write_text(new)
    if changed and a.check:raise SystemExit('Missing Frontier navigation: '+', '.join(changed))
    print(f'Frontier navigation: {len(changed)} pages updated' if changed else 'Frontier navigation: PASS')
