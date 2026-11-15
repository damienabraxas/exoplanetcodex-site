#!/usr/bin/env python3
"""Refresh only the canonical metadata portion of the Education Na reference.

NIST level energies remain a separately reviewed reference; this does not scrape,
change, or grade science data. All selected line IDs must still identify Na I.
"""
import argparse,csv,hashlib,json,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def snapshot(science_root):
 p=ROOT/'assets/data/education-sodium.v1.json';d=json.loads(p.read_text());source=science_root/'data/linelists/canonical_gf.csv'
 with source.open() as f:rows={r['line_id']:r for r in csv.DictReader(f)}
 fields=list(d['line_records'][0]);selected=[]
 for previous in d['line_records']:
  row=rows[previous['line_id']]
  if row['species']!='Na I' or abs(float(row['wavelength_air_A'])-float(previous['wavelength_air_A']))>.01:raise ValueError('Canonical transition identity changed; scientific review required')
  selected.append({k:row[k] or None for k in fields})
 d['line_records']=selected
 sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=science_root,text=True).strip();d['science_base']=sha
 for name in d['canonical_source']:
  raw=(science_root/name).read_bytes();d['canonical_source'][name]={'sha256':hashlib.sha256(raw).hexdigest(),'url':f'https://github.com/damienabraxas/exoplanetcodex/blob/{sha}/{name}'}
 return json.dumps(d,ensure_ascii=False,indent=2)+'\n'
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--science-root',type=Path,required=True);p.add_argument('--check',action='store_true');a=p.parse_args();text=snapshot(a.science_root);target=ROOT/'assets/data/education-sodium.v1.json'
 if a.check and target.read_text()!=text:raise SystemExit('Education canonical metadata snapshot is stale')
 if not a.check:target.write_text(text)
 print('Education canonical metadata snapshot: PASS')
