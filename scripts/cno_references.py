"""Resolve CNO reference layers from bibliography, intake, grids and source manifests.

Bindings distinguish a feed treatment from a registered grid or comparison
lineage. Citing a source is never permission to promote a quarantined result.
"""
import csv
import html
import json
from pathlib import Path
import re

BIB = 'data/refs/bibliography.csv'
INTAKE = 'data/audit/rya1136_cno_intake/source_bibliography.csv'
ATOMIC = 'data/reference/cno_atomic_primary/derived/agss21_cno_atomic_gf.prov.json'
MOLECULAR = 'data/linelists/molecular/turbospectrum/MOLECULAR_MANIFEST.json'
GRIDS = 'data/curation/threednlte_availability.csv'
NGRID = 'data/nlte_grids/amarsi_galah/N_amarsi2020_v3.prov.json'
COGRID = 'data/nlte_grids/amarsi2019_cno/provenance.json'
CAMPAIGN = 'data/audit/cno_synthesis/solar_vis_cno_provenance.json'
ADJUDICATION = 'data/audit/rya1214_cno_products/cno_gf_adjudication.prov.json'
SUPPLEMENT = Path(__file__).with_name('cno-reference-supplement.json')
LAYER_ORDER = ['Solar abundance and indicator analyses', 'Atomic data and gf authorities',
               'Model and grid sources', 'Molecular line data and delivery', 'Special diagnostics']


def read_rows(science, path):
    with (science/path).open() as stream:
        return list(csv.DictReader(stream))


def reconcile(science, element, feed, audit):
    paths = set()
    def rows(path):
        paths.add(path)
        return read_rows(science,path)
    def data(path):
        paths.add(path)
        return json.loads((science/path).read_text())
    bib = {r['key']:r for r in rows(BIB)}
    intake = {r['source_id']:r for r in rows(INTAKE)}
    atomic = {r['id']:r for r in data(ATOMIC)['sources']}
    molecules = data(MOLECULAR)['molecules']
    grid = {r['element']:r for r in rows(GRIDS)}[element]
    pedigree = data(ADJUDICATION)
    sources, bindings = {}, []
    supplement = json.loads(SUPPLEMENT.read_text())['references']

    def register(key, record, evidence):
        if key in sources:
            return key
        citation = record.get('citation')
        if not citation:
            citation = f'{record["authors"]} ({record["year"]}). {record["title"]}. {record.get("venue", "")}'.strip()
        doi = record.get('doi','')
        url = record.get('url') or ('https://doi.org/'+doi if doi else '')
        if not citation or not url:
            raise ValueError('Incomplete reference metadata: '+key)
        sources[key] = dict(id=key,citation=citation,doi=doi,url=url,evidence=evidence,
                            metadata_source=record.get('metadata_source'),layers=[],roles=[])
        return key

    def main(key):
        return register(key,bib[key],[dict(path=BIB,record=key)])
    def entry(key):
        r=intake[key]
        # Prefer the main bibliography if the intake explicitly joins to it.
        if r.get('ssot_key'):
            return main(r['ssot_key'])
        return register(key,r,[dict(path=INTAKE,record=key)])
    def extra(key):
        r=supplement[key]
        paths.add(r['evidence_path'])
        if r['evidence_marker'] not in (science/r['evidence_path']).read_text():
            raise ValueError('Reference supplement no longer matches source evidence: '+key)
        return register(key,r,[dict(path=r['evidence_path'],record=r['evidence_marker'])])
    def atom(key):
        return register(key,atomic[key],[dict(path=ATOMIC,record=key)])

    def bind(subject,layer,keys,claim,evidence):
        if not keys or any(k not in sources for k in keys):
            raise ValueError('Unresolved citation binding: '+subject)
        for k in keys:
            if layer not in sources[k]['layers']: sources[k]['layers'].append(layer)
            if claim not in sources[k]['roles']: sources[k]['roles'].append(claim)
        bindings.append(dict(subject=subject,layer=layer,reference_ids=list(dict.fromkeys(keys)),claim=claim,evidence=evidence))

    bind('element-context',LAYER_ORDER[0],[main('asplund2021'),entry('Amarsi2021_Table2')],
         'Solar '+element+' atomic/molecular indicator lineage and atmospheric sensitivity; comparison literature, not an adopted Codex abundance.',
         [INTAKE,'docs/co_indicator_strategy.md'])
    paths.add('docs/co_indicator_strategy.md')
    gf_refs=[main('nist_asd'),main('wiese_fuhr2006')]
    if element=='O':
        gf_refs.append(extra('wfd1996'))
        claim='The recorded O I/O II base pedigree is Wiese–Fuhr–Deters / Opacity Project theory. Per-transition exceptions and the open O I source decisions remain explicit.'
    else:
        claim='The recorded '+element+' I/II pedigree is the partial NIST MCHF update described by Wiese & Fuhr; evaluated theory is not primary laboratory evidence.'
    bind('atomic-pedigree',LAYER_ORDER[1],gf_refs,claim,[ADJUDICATION])
    if element=='N':
        gf_refs.append(atom('TachievFroeseFischer2002'))
        bind('nitrogen-gf',LAYER_ORDER[1],[main('nist_asd'),atom('TachievFroeseFischer2002')],
             pedigree['n_i_caveat'],[ADJUDICATION,ATOMIC])
    if element=='C':
        bind('reference-carbon-gf',LAYER_ORDER[1],[atom('Li2021')],
             'AGSS21 names Li et al. for its C I gf lineage. This reference calculation is distinct from the campaign’s NIST/MCHF adjudication; no gf source is substituted here.',[ATOMIC,ADJUDICATION])
    if element=='O':
        path='data/audit/rya1214_cno_products/oi_tachiev_vs_nist.csv'
        decision=rows(path)
        if not decision: raise ValueError('Missing O I source decision rows')
        bind('oxygen-777-source-decision',LAYER_ORDER[1],[main('nist_asd'),atom('TachievFroeseFischer2002')],
             'O I triplet source record: '+ '; '.join(dict.fromkeys(r['adopted_here']+'; '+r['decision'] for r in decision)),[path,ADJUDICATION])

    # Registered model lineage is explicitly labelled as such; a grid citation
    # never silently turns a 1D-LTE feed entry into a corrected product.
    if element in ('C','O'):
        data(COGRID)
        model_refs=[main('amarsi2019')]
        if element=='O':
            model_refs.append(register('solar_3d_O',dict(citation=grid['solar_reference'],doi=grid['solar_doi']),[dict(path=GRIDS,record='O')]))
        bind('registered-model-lineage',LAYER_ORDER[2],model_refs,
             'Registered '+element+' I line/grid lineage: '+grid['offsolar_reference']+'. The current feed treatment remains authoritative; a grid reference does not imply a correction was applied.',[GRIDS,COGRID])
    else:
        ngrid=data(NGRID)
        model_refs=[entry('Amarsi2020_N')]
        solar=register('solar_3d_N',dict(citation=grid['solar_reference'],doi=grid['solar_doi']),[dict(path=GRIDS,record='N')])
        deposit=register('N_grid_deposit',dict(citation=ngrid['source']['deposit'],doi=ngrid['source']['zenodo_doi'],url=ngrid['source']['zenodo_record']),[dict(path=NGRID,record='source')])
        model_refs.extend([solar,deposit])
        bind('registered-model-lineage',LAYER_ORDER[2],model_refs,
             'The N I registry uses the Amarsi GALAH/PySME 1D-NLTE departure grid. The solar 3D-NLTE atomic analysis is a separate source, not a full-3D correction applied by this feed.',[GRIDS,NGRID])

    def molecular_refs(p,subject):
        selector=p.get('selector') or ''
        match=re.match(r'MOL-(CH|C2|CN|NH|OH|CO)(?:_|$)',selector)
        if not match:
            raise ValueError('Molecular indicator needs an explicit source adapter: '+selector)
        molecule=match[1]
        m=molecules[molecule]
        keys=[entry('Amarsi2021_Table2'), main('gerber2023')]
        primary={'CH':'Masseron2014_CH','C2':'Brooke2013_C2','CN':'Brooke2014_CN','CO':'Li2015_CO'}.get(molecule)
        if primary: keys.append(entry(primary))
        if molecule=='CN': keys.append(extra('sneden2014_cn'))
        # NH/OH electronic deliveries do NOT inherit the acquired Brooke IR data.
        # Keep the actual distribution citation and its stated primary-source gap.
        claim=molecule+' line-data delivery: '+m['source']+'. '+m['distribution']
        if molecule=='CH':
            claim+=' The primary intake identifies Masseron 2014 as A&A 571 A47; the older delivery manifest’s MNRAS locator conflicts with that record.'
        if molecule in ('NH','OH'):
            claim+=' Primary electronic transition-data paper is not resolved by this manifest; Brooke IR intake data are not assigned to it.'
        if molecule=='CO':
            claim+=' ExoMol/Turbospectrum is a redistribution/conversion, not the primary publication.'
        bind(subject,LAYER_ORDER[3],keys,claim,[MOLECULAR,INTAKE])
        return keys

    # Binding keys are source bucket + source index, the same full audit identity
    # used by the generator. No numeric-value matching or author-name guessing.
    product_sources=[]
    for record in audit:
        bucket,index=record['source_bucket'],record['source_index']
        if bucket not in ('products','quarantine'): continue
        p=feed[bucket][index]
        subject=record['publication_id']
        selector=p.get('selector') or ''
        molecular=selector.startswith('MOL-')
        keys=[main('asplund2021')]
        if molecular:
            keys+=molecular_refs(p,subject)
        else:
            keys+=gf_refs
            bind(subject,LAYER_ORDER[1],gf_refs,
                 'Atomic '+element+' '+str(p.get('ion'))+' entry; source-family pedigree only, not a substitute for a per-transition gf join.',[ADJUDICATION])
        treatment=p.get('treatment','')
        if treatment=='1D-LTE':
            model_note='Feed treatment: 1D-LTE; no NLTE/3D correction is claimed for this entry.'
            # Both synthesis routes invoke Turbospectrum; its paper identifies
            # the implementation, not proof this particular run used NLTE.
            keys.append(main('gerber2023'))
            bind(subject,LAYER_ORDER[2],[main('gerber2023')],model_note+' Turbospectrum is the synthesis implementation.',
                 [CAMPAIGN] if molecular or selector.startswith(('ATOM-','FORB-')) else ['pipeline/band_products.py'])
            paths.add(CAMPAIGN if molecular or selector.startswith(('ATOM-','FORB-')) else 'pipeline/band_products.py')
        elif treatment=='ENGINE-A' and element=='N':
            keys+=model_refs
            model_note='Feed label: '+str(p.get('display'))+'. Registered source: Amarsi/PySME N I 1D-NLTE. The generic Bergemann label is retained as supplied and is not used as a bibliographic attribution.'
            paths.update(['config/constants.py','data/catalog/model_registry.csv'])
            bind(subject,LAYER_ORDER[2],model_refs,model_note,[NGRID,'config/constants.py','data/catalog/model_registry.csv'])
        elif treatment in ('ENGINE-A','ENGINE-A-3DNLTE') and element in ('C','O'):
            keys+=model_refs
            model_note='Registered C/O model lineage; per-product grid provenance must confirm the applied treatment.'
            if record['visible'] and 'amarsi' not in json.dumps(p.get('provenance',{})).lower():
                raise ValueError('Visible NLTE/3D product lacks an explicit model provenance join: '+subject)
            bind(subject,LAYER_ORDER[2],model_refs,model_note,[COGRID,GRIDS])
        else:
            model_note='Model reference unresolved for treatment '+treatment
            if record['visible']: raise ValueError(model_note)
        if element=='O' and selector.startswith('FORB-OI_6300'):
            campaign=data(CAMPAIGN)['provenance']
            if not any(r.get('key')=='OI_6300' for r in campaign['phase_a_corrections']):
                raise ValueError('Missing forbidden oxygen provenance')
            special=[main('johansson2003'),main('storey_zeippen2000'),extra('caffau2015_6300')]
            keys+=special
            bind(subject,LAYER_ORDER[4],special,
                 'The synthesis sidecar names Johansson’s Ni I blend data, Storey & Zeippen’s forbidden-line gf lineage and Caffau’s CO5BOLD comparison anchor. The feed entry remains 1D-LTE and quarantined; the sidecar’s cited anchor is not promoted to a measured abundance.',[CAMPAIGN])
        # Explicit bibliography keys in successor products must resolve exactly.
        for key in p.get('reference_keys',[]):
            keys.append(main(key))
            bind(subject,'Model and grid sources',[key],'Reference explicitly supplied by the product.',[f'data/products/solar/{element}.json'])
        product_sources.append(dict(publication_id=subject,source_bucket=bucket,source_index=index,
                                    identity=record['identity'],
                                    reference_ids=list(dict.fromkeys(keys)),model_note=model_note))
    refs=[r for r in sources.values() if r['layers']]
    used={r['id'] for r in refs}
    if any(set(p['reference_ids'])-used for p in product_sources):
        raise ValueError('Unbound product reference')
    return dict(references=refs,bindings=bindings,product_sources=product_sources,source_paths=sorted(paths),
                policy='Current product identity and committed provenance select sources. Registered models, comparison anchors and quarantined diagnostics are not adopted results.')


def render_references(bundle, source_url):
    esc=lambda v:html.escape(str(v))
    refs={r['id']:r for r in bundle['references']}
    numbers={key:index+1 for index,key in enumerate(refs)}
    def links(keys):
        return ', '.join(f'<a href="#ref-{esc(k)}">[{numbers[k]}]</a>' for k in keys)
    body='<p>Sources are separated by their role. Registered grid lineage and quarantined diagnostics do not imply an adopted abundance or an applied correction.</p>'
    # Summarize shared claims once; per-product joins remain in a readable
    # disclosure and the downloadable structured map, both also in the PDF.
    body += '<p>See the source notes for the distinction between reference lineage and the treatment actually recorded in each feed entry.</p>'
    body += '<details><summary>Science and provenance source notes</summary>'
    seen=set()
    for b in bundle['bindings']:
        key=(b['layer'],b['claim'])
        if key in seen: continue
        seen.add(key)
        body+=f'<p><strong>{esc(b["layer"])}.</strong> {esc(b["claim"])} Sources: {links(b["reference_ids"])}.</p>'
    body+='</details><details><summary>Product-to-source index</summary><ul>'
    for p in bundle['product_sources']:
        label=' · '.join(str(p['identity'].get(k) or 'not supplied') for k in ('band','holding','selector','treatment','line_set'))
        body+=f'<li><code>{esc(p["publication_id"])}</code> · {esc(p["source_bucket"])} · {esc(label)} · {links(p["reference_ids"])}</li>'
    body+='</ul></details><details open><summary>Complete applicable bibliography</summary>'
    for layer in LAYER_ORDER:
        # One bibliographic record per source, grouped by its first role.
        selected=[r for r in refs.values() if r['layers'][0]==layer]
        if not selected: continue
        body+=f'<h3>{esc(layer)}</h3><ul>'
        for r in selected:
            number=numbers[r['id']]
            evidence=' · '.join(f'<a href="{source_url}/{esc(e["path"])}">source record</a>' for e in r['evidence'])
            body+=f'<li id="ref-{esc(r["id"])}"><strong>[{number}]</strong> — <a href="{esc(r["url"])}">{esc(r["citation"])}</a>'
            if r['doi']: body+=f' DOI: {esc(r["doi"])}.'
            body+=' '+evidence+'</li>'
        body+='</ul>'
    return body+'</details>'
