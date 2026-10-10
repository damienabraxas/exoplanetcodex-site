"""Which C/N/O product the site shows first. ONE rule, imported by both generators.

Ryan, 2026-09-26 (RYA-1230): each band shows its top product at the top of the element
appendix, and the Sun page's elemental table shows the best VIS number, defaulting to the
next best band when VIS has none. The showcase is the Asplund-grade product: a Reference
Grade line set carried through the most complete treatment.

Before this module the appendix and the Sun table each held their own copy of "tightest
total sigma, Reference Grade preferred". Tightest-sigma ranks a 1D-NLTE product on two
lines above a 3D-NLTE product on four, which is how the N headline came to read 8.189
from a 2-line Kitt Peak ENGINE-A row.

Rank, most important first:
  1. grade        Reference Grade before anything else
  2. treatment    3D-NLTE > 3D-LTE > 1D-NLTE > 1D-LTE, read off the published `display`
  3. n_lines      more lines before fewer
  4. total sigma  tighter first
  5. holding      deterministic tie-break
"""
from __future__ import annotations

import json
import math

#: Rejected abundance routes (RYA-1220 cno_method_policy): they stay in the forest as
#: diagnostics but never headline a band, the page or the Sun table.
REJECTED_SELECTORS = ('MOL-CN_red', 'MOL-NH_AX')

#: PRIMARY INDICATOR per element (Ryan, 2026-10-03, RYA-1232). When an element has an
#: entry, the HEADLINE is the best product of that indicator; the others stay on the
#: appendix. Nitrogen, checked against the LOCAL literature: Asplund+2021 (Table 3) and
#: Amarsi+2021 COMBINE atomic N I (7.77, 3D-NLTE) and molecular CN/NH (7.88/7.91) into 7.83;
#: Lodders+2025 use the two least-blended N I lines 8629/8683 (7.94); Mashonkina+2024 7.88.
#: Our CN A-X (7.84-7.98) agrees with the literature's molecular value; our atomic N I
#: (8.08-8.15 on the IAG-anchored continuum) sits 0.15-0.38 dex ABOVE every published N I
#: value -- an unresolved defect of ours (line choice in the CN forest is the first suspect),
#: not literature practice. Until it is resolved, only the validated indicator headlines.
PRIMARY_SELECTORS = {'N': ('MOL-CN_AX_IR',)}

BAND_ORDER = ['near-UV', 'VIS', 'red-optical', 'NIR', 'H', 'J', 'K']


def _budget(p):
    u = p.get('uncertainty')
    if isinstance(u, str):
        try:
            u = json.loads(u)
        except ValueError:
            return None
    return u if isinstance(u, dict) and u.get('components') else None


def statistical(p):
    """The statistical part shown beside the total. RYA-1233: a row carrying a RYA-587
    budget takes it FROM THE BUDGET (its `measurement` term), not from the band route's own
    `stat_dex` -- Si's VIS card read '+/-0.021 stat, +/-0.170 syst' under a total of 0.074,
    because `sigma_syst` is the route's pre-budget systematic estimate, not the budget's."""
    b = _budget(p)
    if b is not None and p.get('sigma_reported') is not None:
        m = next((c.get('sigma_dex') for c in b['components']
                  if c.get('name') == 'measurement' and c.get('sigma_dex') is not None), None)
        if m is not None:
            return float(m)
    return p.get('sigma_stat')


def systematic(p):
    """Everything in the total that is not the statistical term: for a budgeted row,
    sqrt(sigma_reported^2 - stat^2), so stat (+) syst IS the total shown."""
    b = _budget(p)
    if b is not None and p.get('sigma_reported') is not None:
        st = statistical(p) or 0.0
        return math.sqrt(max(float(p['sigma_reported']) ** 2 - st ** 2, 0.0))
    return p.get('sigma_syst_complete') if p.get('sigma_syst_complete') is not None else p.get('sigma_syst')


def total_sigma(p):
    """The product's total uncertainty. A row carrying a RYA-587 budget states it as
    `sigma_reported` (the canonical total over all 16 components) -- that is the number,
    exactly as Fe shows it. Only a legacy row without one falls back to stat (+) syst."""
    if p.get('sigma_reported') is not None:
        return float(p['sigma_reported'])
    return math.sqrt((p.get('sigma_stat') or 0.0) ** 2 + (systematic(p) or 0.0) ** 2)


def fill_grades(products, science):
    """Legacy C/N/O rows predate the publisher's `grade` stamp (RYA-1230) and RYA-587
    refuses any edit to a legacy row, so the grade is DERIVED here by the science repo's
    own rule (`pipeline.cno_grade.grade_for`, imported from the pinned checkout, never
    copied) and marked as derived. A row that carries a grade keeps it."""
    import sys
    sys.path.insert(0, str(science))
    from pipeline.cno_grade import grade_for
    out = []
    for p in products:
        if not p.get('grade'):
            g = grade_for(p)
            if g is not None:
                p = {**p, 'grade': g,
                     'grade_basis': 'derived at render by pipeline.cno_grade (legacy row)'}
        out.append(p)
    return out


def treatment_rank(p):
    """0 = 3D-NLTE ... 3 = 1D-LTE, from the display name the publisher DERIVES
    (treatment_axes.display_for), never from the treatment token's spelling."""
    d = str(p.get('display') or '')
    if '3D-NLTE' in d:
        return 0
    if '3D' in d:
        return 1
    if 'NLTE' in d:
        return 2
    return 3


#: RYA-1232 (Ryan, option 1): rank by RESOLVED lines, not fine-structure components. O I
#: 926 nm is 3 lines (926.1/926.3/926.6 nm, as AGSS21 prints them) carried as 9 components;
#: counting components let it outrank the 6-line red-optical O I set on a counting artefact.
#: Components closer than RESOLVE_A merge. Needs the science repo's canonical_gf
#: (set_line_table); a row whose ids do not resolve falls back to n_lines.
RESOLVE_A = 0.5
_LINE_WAVE: dict = {}


def set_line_table(science_root) -> None:
    import csv
    from pathlib import Path as _P
    with open(_P(science_root) / 'data/linelists/canonical_gf.csv', newline='') as fh:
        for r in csv.DictReader(fh):
            if r.get('physical_id') and r.get('wavelength_air_A'):
                _LINE_WAVE[r['physical_id']] = float(r['wavelength_air_A'])


def resolved_lines(p) -> int:
    ids = p.get('uncertainty_indicator_ids') or []
    waves = sorted(_LINE_WAVE[i] for i in ids if i in _LINE_WAVE)
    if not waves or len(waves) != len(ids):
        return int(p.get('n_lines') or 0)
    n = 1
    for a, b in zip(waves, waves[1:]):
        n += (b - a) > RESOLVE_A
    return n


def rank_key(p):
    return (0 if p.get('grade') == 'Reference Grade' else 1,
            treatment_rank(p),
            -resolved_lines(p),
            round(total_sigma(p), 4),
            p.get('holding', ''))


def eligible_for_headline(p):
    return str(p.get('selector') or '') not in REJECTED_SELECTORS


def best_in_band(products, band):
    rows = [p for p in products if p.get('band') == band and eligible_for_headline(p)]
    return min(rows, key=rank_key) if rows else None


def headline(products, element=None):
    """The Sun-table / appendix-top number: VIS's best Reference Grade product; when VIS has
    none, the best product of any other band by the same rank. For an element with a
    PRIMARY_SELECTORS entry, only that indicator's products compete.

    A VIS product that is not Reference Grade does not take the headline over a Reference
    Grade product in another band -- "best VIS number if possible" is read as: if VIS
    carries a product of headline standard.
    """
    rows = [p for p in products if eligible_for_headline(p)]
    prim = PRIMARY_SELECTORS.get(element or (rows[0].get('element') if rows else None))
    if prim:
        rows = [p for p in rows if str(p.get('selector') or '') in prim] or rows
    if not rows:
        return None
    vis = best_in_band(rows, 'VIS')
    if vis is not None and vis.get('grade') == 'Reference Grade':
        return vis
    return min(rows, key=rank_key)


# ── RYA-1232: the headline IS Asplund, Amarsi & Grevesse 2021's method (Sect. 2.3) ────────
#
# Not a single "best" product. Each element's solar value combines its INDICATOR FAMILIES:
#   C  weighted mean and error of [C I], C I, C2, CH, CO (CH and CO groups first combined)
#   N  UNWEIGHTED mean of atomic N I and the weighted mean of the molecular results (NH, CN);
#      uncertainty = standard error of that mean = half the range of the two
#   O  weighted mean and error of [O I], O I, OH (OH groups first combined)
# Each family is represented by OUR best analysis of that indicator (rank_key: Reference
# Grade, most complete treatment, resolved lines, sigma); independent spectra of the SAME
# lines are not averaged as if independent. Weights are 1/sigma_total^2.
FAMILY_BY_SELECTOR = {'MOL-C2_Swan': 'C2', 'MOL-CH_Gband': 'CH', 'MOL-CO_K': 'CO',
                      'MOL-CN_AX_IR': 'CN', 'MOL-NH': 'NH', 'MOL-OH': 'OH'}
ASPLUND_FAMILIES = {'C': ('[C I]', 'C I', 'C2', 'CH', 'CO'),
                    'N': ('N I', 'NH', 'CN'),
                    'O': ('[O I]', 'O I', 'OH')}


def indicator_family(p):
    sel = str(p.get('selector') or '')
    el = str(p.get('element') or '')
    if sel.startswith('MOL-'):
        return FAMILY_BY_SELECTOR.get(sel)          # CN_red etc. are not Asplund families
    if sel.startswith('FORB-'):
        return f'[{el} I]'
    if str(p.get('ion') or 'I').strip() not in ('I', '1'):
        return None
    return f'{el} I'


def _wmean(rows):
    w = [1.0 / s ** 2 for _, s in rows]
    return sum(a * wi for (a, _), wi in zip(rows, w)) / sum(w), (1.0 / sum(w)) ** 0.5


def asplund_headline(products, element):
    """Asplund+2021's combination of this element's indicator families, from OUR products.
    Returns {A, sigma, rule, families: [{family, A, sigma, product}], missing: [...]}."""
    fams = {}
    for p in products:
        if not eligible_for_headline(p) or not p.get('sigma_reported') and not total_sigma(p):
            continue
        f = indicator_family(p)
        if f in ASPLUND_FAMILIES.get(element, ()):
            fams.setdefault(f, []).append(p)
    rep = {f: min(ps, key=rank_key) for f, ps in fams.items()}
    rows = {f: (float(p['A']), float(total_sigma(p))) for f, p in rep.items()}
    if not rows:
        return None
    if element == 'N':
        mol = [rows[f] for f in ('NH', 'CN') if f in rows]
        parts = ([rows['N I']] if 'N I' in rows else []) + ([_wmean(mol)] if mol else [])
        if len(parts) == 2:
            a = (parts[0][0] + parts[1][0]) / 2.0
            s = abs(parts[0][0] - parts[1][0]) / 2.0
            rule = ('unweighted mean of atomic N I and the weighted molecular mean (NH, CN); '
                    'uncertainty half the range (Asplund+2021 Sect. 2.3)')
        else:
            a, s = parts[0]
            rule = 'only one of atomic / molecular N available'
    else:
        a, s = _wmean(list(rows.values()))
        rule = ('weighted mean and error of the indicator families '
                + ', '.join(ASPLUND_FAMILIES[element]) + ' (Asplund+2021 Sect. 2.3)')
    return {'element': element, 'A': a, 'sigma': s, 'rule': rule,
            'families': [{'family': f, 'A': rows[f][0], 'sigma': rows[f][1], 'product': rep[f]}
                         for f in ASPLUND_FAMILIES[element] if f in rep],
            'missing': [f for f in ASPLUND_FAMILIES[element] if f not in rep]}
