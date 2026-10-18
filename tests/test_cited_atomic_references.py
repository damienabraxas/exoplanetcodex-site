"""A cited correction must cite the applied table, not an unused departure grid."""
import csv
from pathlib import Path
import sys
import yaml
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from element_references import reconcile_atomic


def test_cited_3d_product_uses_its_declared_source(tmp_path):
    def write(path,fields,rows):
        p=tmp_path/path;p.parent.mkdir(parents=True,exist_ok=True)
        with p.open('w',newline='') as f:
            w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)
    write('data/refs/bibliography.csv',['key','authors','year','title','venue','doi','url'],[
        dict(key=k,authors='Authors',year='2021',title=k,doi='10.example/'+k)
        for k in ['asplund2021','lodders2025']])
    write('data/reference/line_sets/REGISTRY.csv',['element','set_name','bibliography_key'],[
        dict(element='Mg',set_name='MG_AGSS21',bibliography_key='asplund2021')])
    table=dict(element='Mg',ions=['I','II'],citation='Verified source table',
               bibliography_key='asplund2021',source='data/reference/table.csv',baseline='MARCS LTE')
    (tmp_path/'data/reference/solar_nlte_tables.yaml').write_text(yaml.safe_dump({'tables':[table]}))
    write('stage/product.csv',['treatment','provenance'],[
        dict(treatment='ENGINE-A-3DNLTE',provenance='Verified source table; cited solar correction')])
    p=dict(element='Mg',ion='II',selector='SET-MG_AGSS21',treatment='ENGINE-A-3DNLTE',
           provenance={'copied_to':'stage/product.csv'})
    audit=[dict(source_bucket='products',source_index=0,publication_id='test',identity={},visible=True)]
    r=reconcile_atomic(tmp_path,'Mg',{'products':[p]},audit)
    assert 'amarsi2020_galah' not in {x['id'] for x in r['references']}
    assert 'not a new in-transfer 3D' in r['product_sources'][0]['model_note']
    assert table['source'] in r['source_paths']
