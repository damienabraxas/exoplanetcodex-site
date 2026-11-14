#!/usr/bin/env python3
"""Idempotently add Education to existing navigation; preserve page markup."""
import argparse,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def updated(html):
 def nav(m):
  block=m[0]
  if 'href="/education/"' not in block:
   block=re.sub(r'(<li><a href="/glossary/"[^>]*>Glossary</a></li>)',r'\1\n      <li><a href="/education/">Education</a></li>',block,count=1)
   if 'href="/education/"' not in block:block=block.replace('</ul>','<li><a href="/education/">Education</a></li></ul>',1)
  return block
 html=re.sub(r'<nav\b[^>]*class="[^"]*codex-nav[^"]*"[^>]*>.*?</nav>',nav,html,flags=re.S)
 def footer(m):
  block=m[0]
  if 'href="/education/"' not in block:block=block.replace('<p class="footer-label">Navigate</p>','<p class="footer-label">Navigate</p><a href="/education/">Education</a>',1)
  return block
 return re.sub(r'<footer\b[^>]*class="[^"]*codex-footer[^"]*"[^>]*>.*?</footer>',footer,html,flags=re.S)
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args();stale=[]
 for path in ROOT.rglob('*.html'):
  if any(x in {'.git','docs','assets','node_modules'} for x in path.relative_to(ROOT).parts):continue
  old=path.read_text();new=updated(old)
  if old!=new:
   stale.append(str(path.relative_to(ROOT)))
   if not a.check:path.write_text(new)
 if stale and a.check:raise SystemExit('Missing Education navigation: '+', '.join(stale))
 print(f'Education navigation: {len(stale)} pages updated' if stale else 'Education navigation: PASS')
