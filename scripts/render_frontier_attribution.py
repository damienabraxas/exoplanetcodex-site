#!/usr/bin/env python3
"""Render public attribution from the exact canonical atlas snapshot."""
import argparse,json,re
from html import escape
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1];START='<!-- FRONTIER ATTRIBUTION START -->';END='<!-- FRONTIER ATTRIBUTION END -->'
def a(text,url):
    if urlsplit(url).scheme!='https':raise ValueError('unsafe attribution URL')
    return f'<a href="{escape(url,quote=True)}">{escape(text)}</a>'
def render():
    d=json.loads((ROOT/'assets/data/frontier-atlas.v1.json').read_text());rows=[]
    for key,c in d['citations'].items():
        rows.append(f'<article class="src-entry" id="frontier-citation-{escape(key)}"><h3>{escape(c["title"])}</h3><p>{escape(c["authors"])} ({escape(c["year"])}).</p><p>{a("DOI "+c["doi"] if c["doi"] else "Source",c["url"])}</p><p>Method/source citation. Scientific applicability and reuse terms remain specific to the linked resource record.</p></article>')
    for e in d['entries']:
        evidence=' · '.join(a(key,d['sources'][key]['evidence_url']) for key in e['source_ids'])
        authors='; '.join(d['citations'][key]['authors'] for key in e['upstream_citation_refs']) or 'Exact upstream authors/citation not established in this atlas record; inspect the linked source before reuse.'
        molecular=e['coverage'].get('molecular_manifest') or {}
        declaration=('<p><strong>Legacy molecular source declaration (release audit pending):</strong> '+escape(' · '.join(str(molecular.get(k,'')) for k in ['source','doi','version'] if molecular.get(k)))+'</p>') if molecular else ''
        rows.append(f'<article class="src-entry" id="frontier-resource-{escape(e["id"])}"><h3>{escape(e["id"])}</h3><p>{escape(e["summary"])}</p>{declaration}<p><strong>Associated citation authors:</strong> {escape(authors)}</p><p><strong>Version:</strong> {escape(e["version"])}</p><p><strong>Reuse / attribution:</strong> {escape(e["license"]["status"])} — {escape(e["license"]["note"])}</p><p><strong>Source audit:</strong> {escape(e["literature_audit"]["date"] or "Not yet audited")} · {escape(e["literature_audit"]["scope"])}</p><p>{evidence}</p><p><a href="/spectroscopic-frontier/#entry-{escape(e["id"],quote=True)}">Applicability, exact source hashes, citation and research gaps</a></p></article>')
    return START+'\n<section class="src-section" id="frontier-attribution"><h2>Spectroscopic Frontier — software, line lists &amp; grids</h2><p class="src-blurb">Generated from the canonical atlas snapshot. Source availability, physical compatibility and independent validation are separate; pending reuse, author and release fields are not inferred. This page links evidence without redistributing the upstream software or restricted datasets.</p>\n'+'\n'.join(rows)+'\n</section>\n'+END

def updated(html):
    block=render()
    if START in html:return re.sub(re.escape(START)+'.*?'+re.escape(END),lambda _:block,html,flags=re.S)
    anchor='  <div class="src-stats">'
    if anchor not in html:raise ValueError('Sources insertion anchor missing')
    return html.replace(anchor,block+'\n'+anchor,1)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');args=p.parse_args();path=ROOT/'sources/index.html';old=path.read_text();new=updated(old)
    if args.check:
        if old!=new:raise SystemExit('Frontier attribution is stale')
    else:path.write_text(new)
