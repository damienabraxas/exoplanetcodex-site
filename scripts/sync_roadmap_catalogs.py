#!/usr/bin/env python3
"""Refresh only generated target/element membership from an explicitly pinned science checkout."""
import argparse,csv,hashlib,json,subprocess
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--science-root',type=Path,required=True);p.add_argument('--check',action='store_true');args=p.parse_args()
site=Path(__file__).resolve().parents[1];path=site/'assets/data/product-roadmap.v1.json';data=json.loads(path.read_text());root=args.science_root
sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
if sha!=data['science_base']:raise SystemExit('Science checkout differs from reviewed science_base; review evidence and update pin first.')
for source in data['sources']:
    raw=(root/source).read_bytes();data['sources'][source]['sha256']=hashlib.sha256(raw).hexdigest()
rows=list(csv.DictReader((root/'data/catalog/system_catalog.csv').open()))
data['targets']=[{k:r[k] for k in ['system_name','star_params_key','role','run_order','pipeline_status','website_slug']} for r in rows]
elements=json.loads((root/'data/config/elements_master.json').read_text());data['elements']=[r['symbol'] for r in elements['elements']]
if len(data['elements'])!=elements['n_targets']:raise SystemExit('Canonical element count mismatch')
rendered=json.dumps(data,indent=2,ensure_ascii=False)+'\n'
if args.check:
    if rendered!=path.read_text():raise SystemExit('Generated roadmap catalogs or hashes are stale')
else:path.write_text(rendered)
