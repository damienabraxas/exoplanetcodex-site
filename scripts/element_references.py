"""References for an ATOMIC-only element's appendix (RYA-1233), resolved from records.

`cno_references.reconcile` is C/N/O-specific (CNO grids, adjudication files, molecular
deliveries). For an element measured on atomic lines alone, every source is already
recorded in the science repo, so nothing here is typed per element:
  line set   -> data/reference/line_sets/REGISTRY.csv `bibliography_key` (SET-<NAME>)
  gf         -> the DOIs in each product's own transition_data `line_sources`, joined to
                data/refs/bibliography.csv by DOI; plus that source's recorded lineage
  engine     -> 1D-LTE: Turbospectrum (gerber2023); ENGINE-A: the Amarsi 2020 GALAH grid
  context    -> asplund2021 + lodders2025, and the litscan comparison sources by DOI
A product whose gf DOI or line set is not in the bibliography RAISES -- an appendix never
cites a source it cannot resolve.
"""
import csv
import json
import re

from cno_references import LAYER_ORDER

BIB = 'data/refs/bibliography.csv'
SETS = 'data/reference/line_sets/REGISTRY.csv'
#: A gf source's recorded LINEAGE: Amarsi & Asplund 2017 adopt Garz 1973 renormalised to
#: O'Brian & Lawler 1991 lifetimes (bibliography row amarsi2017_si; RYA-1233 Garz Table 1).
GF_LINEAGE = {'amarsi2017_si': ['garz1973', 'obrian1991']}
ENGINE_A_GRID = 'amarsi2020_galah'


def reconcile_atomic(science, element, feed, audit):
    paths = {BIB, SETS}
    with (science / BIB).open(newline='') as fh:
        bib = {r['key']: r for r in csv.DictReader(fh)}
    by_doi = {r['doi'].strip().lower(): k for k, r in bib.items() if r.get('doi', '').strip()}
    with (science / SETS).open(newline='') as fh:
        set_key = {r['set_name']: r['bibliography_key'] for r in csv.DictReader(fh)
                   if r['element'] == element}
    sources, bindings, product_sources = {}, [], []

    def ref(key):
        if key not in bib:
            raise ValueError(f'{element} appendix: bibliography has no row {key!r}')
        if key not in sources:
            r = bib[key]
            citation = f'{r["authors"]} ({r["year"]}). {r["title"]}. {r.get("venue", "")}'.strip()
            doi = r.get('doi', '').strip()
            url = r.get('url', '').strip() or ('https://doi.org/' + doi if doi else '')
            if not url:
                raise ValueError(f'{element} appendix: {key} has no URL or DOI')
            sources[key] = dict(id=key, citation=citation, doi=doi, url=url,
                                evidence=[dict(path=BIB, record=key)], layers=[], roles=[])
        return key

    def bind(subject, layer, keys, claim, evidence):
        for k in keys:
            if layer not in sources[k]['layers']:
                sources[k]['layers'].append(layer)
            if claim not in sources[k]['roles']:
                sources[k]['roles'].append(claim)
        bindings.append(dict(subject=subject, layer=layer, reference_ids=list(dict.fromkeys(keys)),
                             claim=claim, evidence=evidence))

    context = [ref('asplund2021'), ref('lodders2025')]
    bind('element-context', LAYER_ORDER[0], context,
         f'Solar {element} comparison literature; not an adopted Codex abundance.', [BIB])
    for record in audit:
        bucket, index = record['source_bucket'], record['source_index']
        if bucket not in ('products', 'quarantine'):
            continue
        p = feed[bucket][index]
        subject = record['publication_id']
        keys = list(context)
        sel = str(p.get('selector') or '')
        m = re.match(r'SET-(.+)$', sel)
        if m:
            k = set_key.get(m.group(1))
            if not k:
                raise ValueError(f'{subject}: line set {m.group(1)} has no registry bibliography_key')
            keys.append(ref(k))
            bind(subject, LAYER_ORDER[0], [k], f'Published line set {m.group(1)} (the line selection).', [SETS])
        u = p.get('uncertainty')
        u = json.loads(u) if isinstance(u, str) else (u or {})
        td = next((c for c in u.get('components', []) if c.get('name') == 'transition_data'), {})
        gf = []
        for s in (td.get('evidence') or {}).get('line_sources', []):
            key = by_doi.get(str(s).strip().lower())
            if key is None:
                hit = [k for d, k in by_doi.items() if d and d in str(s).lower()]
                key = hit[0] if hit else None
            if key is None:
                raise ValueError(f'{subject}: gf source {s!r} is not in the bibliography')
            gf += [ref(key)] + [ref(x) for x in GF_LINEAGE.get(key, [])]
        gf = list(dict.fromkeys(gf))
        if gf:
            keys += gf
            bind(subject, LAYER_ORDER[1], gf,
                 f'{element} {p.get("ion")} oscillator strengths of this pool, as the product\'s '
                 f'own uncertainty budget records them (with their lineage).',
                 [f'data/products/solar/{element}.json'])
        t = p.get('treatment', '')
        if t == '1D-LTE':
            keys.append(ref('gerber2023'))
            note = 'Feed treatment: 1D-LTE synthesis (Turbospectrum); no NLTE/3D correction claimed.'
            bind(subject, LAYER_ORDER[2], ['gerber2023'], note, ['pipeline/band_products.py'])
        elif t == 'ENGINE-A':
            keys.append(ref(ENGINE_A_GRID))
            note = ('Feed treatment: 1D NLTE, per-line correction from the Amarsi 2020 GALAH '
                    'departure grid via PySME (data/nlte_grids/' + element + '_Amarsi2020_PySME.csv).')
            paths.add(f'data/nlte_grids/{element}_Amarsi2020_PySME.prov.json')
            bind(subject, LAYER_ORDER[2], [ENGINE_A_GRID], note,
                 [f'data/nlte_grids/{element}_Amarsi2020_PySME.prov.json'])
        else:
            note = 'Model reference unresolved for treatment ' + t
            if record['visible']:
                raise ValueError(note)
        product_sources.append(dict(publication_id=subject, source_bucket=bucket, source_index=index,
                                    identity=record['identity'],
                                    reference_ids=list(dict.fromkeys(keys)), model_note=note))
    refs = [r for r in sources.values() if r['layers']]
    return dict(references=refs, bindings=bindings, product_sources=product_sources,
                source_paths=sorted(paths),
                policy='Sources resolved from the science repo records: line-set registry, the '
                       'products\' own gf sources, and the engine of each treatment.')
