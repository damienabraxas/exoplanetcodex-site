#!/usr/bin/env python3
"""Copy an exact reviewed canonical atlas; never reconstruct scientific records."""
import argparse,csv,hashlib,json,subprocess,sys
from pathlib import Path
import jsonschema
ROOT=Path(__file__).resolve().parents[1]
def outputs(science):
    atlas=science/'data/products/frontier/coverage.v1.json';schema=science/'data/schemas/spectroscopic_frontier.schema.json'
    data=json.loads(atlas.read_text());jsonschema.Draft202012Validator(json.loads(schema.read_text()),format_checker=jsonschema.FormatChecker()).validate(data)
    revision=subprocess.check_output(['git','rev-parse','HEAD'],cwd=science,text=True).strip()
    for path in [atlas,schema]:
        pinned=subprocess.check_output(['git','show',f'{revision}:{path.relative_to(science)}'],cwd=science)
        if pinned!=path.read_bytes():raise ValueError('Scientific snapshot must match its committed source')
    targets=list(csv.DictReader((science/'data/catalog/system_catalog.csv').open()))
    gliese=next(r for r in targets if r['system_name']=='Gliese 581')
    meta={'schema':'codex.frontier_web_snapshot/1','science_commit':revision,'atlas_sha256':hashlib.sha256(atlas.read_bytes()).hexdigest(),'schema_sha256':hashlib.sha256(schema.read_bytes()).hexdigest(),'source_url':f'https://github.com/damienabraxas/exoplanetcodex/blob/{revision}/data/products/frontier/coverage.v1.json','methodology_url':f'https://github.com/damienabraxas/exoplanetcodex/blob/{revision}/docs/science/spectroscopic_frontier.md','contribution_url':f'https://github.com/damienabraxas/exoplanetcodex/blob/{revision}/docs/science/spectroscopic_frontier_contributing.md','research_target':{'name':gliese['system_name'],'url':'/systems/'+gliese['website_slug']+'/','catalog_url':f'https://github.com/damienabraxas/exoplanetcodex/blob/{revision}/data/catalog/system_catalog.csv','applicability':'Research pathway only; no species/model validation for this star is inferred.'}}
    return {ROOT/'assets/data/frontier-atlas.v1.json':atlas.read_bytes(),ROOT/'assets/data/schemas/frontier-atlas.v1.schema.json':schema.read_bytes(),ROOT/'assets/data/frontier-snapshot.v1.json':(json.dumps(meta,indent=2)+'\n').encode()}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--science-root',required=True,type=Path);p.add_argument('--check',action='store_true');a=p.parse_args()
    for path,raw in outputs(a.science_root).items():
        if a.check:
            if not path.exists() or path.read_bytes()!=raw:raise SystemExit(f'Stale atlas snapshot: {path.relative_to(ROOT)}')
        else:path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw)
    print('Canonical atlas/schema snapshot: PASS')
