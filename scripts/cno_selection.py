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
    """The product's published uncertainty, as Asplund, Amarsi & Grevesse 2021 quote it:
    statistical (+) half the 3D effect (+) NLTE (floor 0.03), stamped by the science
    orchestrator as `sigma_asplund`. A legacy row without a budget falls back to its
    `sigma_reported`, then to stat (+) syst."""
    if p.get('sigma_asplund') is not None:
        return float(p['sigma_asplund'])
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


#: RYA-1251 (Ryan 2026-10-28): the top number is measured the way Asplund et al. 2021
#: measure it -- all of the element's lines / indicator families combined, weighted by their
#: uncertainties (literature_headline). Only an element with no Asplund recipe falls back to
#: one product: the best HARPS VIS Reference Grade product (HARPS is the instrument for the
#: stars that follow), else the best from CRIRES+ or Kitt Peak.
ANCHOR_HOLDING, ANCHOR_BAND = 'solar_harps_molecfit_corrected', 'VIS'
FALLBACK_INSTRUMENTS = ('crires_plus', 'kpno_solar_atlas')


def anchor_product(products, element=None):
    if headline_hold(products, element):
        return None
    ref = [p for p in products if eligible_for_headline(p) and p.get('grade') == 'Reference Grade']
    hits = [p for p in ref if p.get('holding') == ANCHOR_HOLDING and p.get('band') == ANCHOR_BAND]
    if not hits:
        hits = [p for p in ref if p.get('instrument') in FALLBACK_INSTRUMENTS]
    return min(hits, key=rank_key) if hits else None


def headline(products, element=None):
    """The Sun-table / appendix-top number: VIS's best Reference Grade product; when VIS has
    none, the best product of any other band by the same rank. For an element with a
    PRIMARY_SELECTORS entry, only that indicator's products compete.

    A VIS product that is not Reference Grade does not take the headline over a Reference
    Grade product in another band -- "best VIS number if possible" is read as: if VIS
    carries a product of headline standard.
    """
    if headline_hold(products, element):
        return None
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
                    'O': ('[O I]', 'O I', 'OH'),
                    'Mg': ('Mg I', 'Mg II')}


# An ion combination requires both published-set NLTE analyses. Other pools stay
# visible as independent products and cannot silently replace a missing ion.
REQUIRED_FAMILY_SELECTORS = {'Mg': 'SET-MG_AGSS21'}


def headline_hold(products, element):
    selector = REQUIRED_FAMILY_SELECTORS.get(element)
    if selector is None:
        return ''
    available = {indicator_family(p) for p in products
                 if p.get('selector') == selector and treatment_rank(p) in (0, 2)
                 and p.get('A') is not None and total_sigma(p) > 0}
    missing = [f for f in ASPLUND_FAMILIES[element] if f not in available]
    return ('Combined abundance pending: published-set NLTE result required for '
            + ', '.join(missing)) if missing else ''


def indicator_family(p):
    sel = str(p.get('selector') or '')
    el = str(p.get('element') or '')
    if sel.startswith('MOL-'):
        return FAMILY_BY_SELECTOR.get(sel)          # CN_red etc. are not Asplund families
    if sel.startswith('FORB-'):
        return f'[{el} I]'
    ion = str(p.get('ion') or 'I').strip()
    ion = {'1': 'I', '2': 'II'}.get(ion, ion)
    return f'{el} {ion}'


def _row(p):
    """(A, sigma, statistical, systematic) for the combiner; a legacy row without the
    Asplund split is treated as all-statistical."""
    s = float(total_sigma(p))
    st, sy = p.get('sigma_asplund_stat'), p.get('sigma_asplund_syst')
    if st is None or sy is None:
        st, sy = s, 0.0
    return float(p['A']), s, float(st), float(sy)


def _wmean(rows):
    """Weighted mean (weights 1/sigma^2) and its error as Amarsi et al. 2021 Eq. 3 propagate
    it: the statistical parts are uncorrelated between groups and shrink; the systematic
    parts (3D, NLTE, compositional) are perfectly correlated and are averaged, not shrunk."""
    rows = [r if len(r) == 4 else (r[0], r[1], r[1], 0.0) for r in rows]
    w = [1.0 / r[1] ** 2 for r in rows]
    W = sum(w)
    a = sum(r[0] * wi for r, wi in zip(rows, w)) / W
    stat = sum((wi * r[2]) ** 2 for r, wi in zip(rows, w)) ** 0.5 / W
    syst = sum(wi * r[3] for r, wi in zip(rows, w)) / W
    return a, math.hypot(stat, syst), stat, syst


def _row_3d(p):
    """`_row` on Asplund's 3D scale. A 1D-LTE CNO product carries `asplund_3d_shift`
    (Asplund+2021 Table 3: 3D minus 1D MARCS for its indicator group, stamped by the science
    feed); Asplund's family values are all 3D, so the shift is added before combining.
    The product's own A is never changed (RYA-1317)."""
    a, s, st, sy = _row(p)
    return a + float(p.get('asplund_3d_shift') or 0.0), s, st, sy


def asplund_headline(products, element):
    """Asplund+2021's combination of this element's indicator families, from OUR products.
    Returns {A, sigma, rule, families: [{family, A, sigma, shift, product}], missing: [...]};
    a family's A is on the 3D scale (see `_row_3d`)."""
    if headline_hold(products, element):
        return None
    fams = {}
    for p in products:
        required = REQUIRED_FAMILY_SELECTORS.get(element)
        if required and (p.get('selector') != required or treatment_rank(p) not in (0, 2)):
            continue
        if not eligible_for_headline(p) or not p.get('sigma_reported') and not total_sigma(p):
            continue
        f = indicator_family(p)
        if f in ASPLUND_FAMILIES.get(element, ()):
            fams.setdefault(f, []).append(p)
    rep = {f: min(ps, key=rank_key) for f, ps in fams.items()}
    rows = {f: _row_3d(p) for f, p in rep.items()}
    if not rows:
        return None
    if element == 'N':
        mol = [rows[f] for f in ('NH', 'CN') if f in rows]
        parts = ([rows['N I']] if 'N I' in rows else []) + ([_wmean(mol)] if mol else [])
        if len(parts) == 2:
            a = (parts[0][0] + parts[1][0]) / 2.0
            # RYA-1317: half the range alone can fall below the two parts' own errors (ours
            # 0.019 against 0.049); Asplund's 0.07 for N sits above both, so take the larger.
            s = max(abs(parts[0][0] - parts[1][0]) / 2.0, math.hypot(parts[0][1], parts[1][1]) / 2.0)
            rule = ('unweighted mean of atomic N I and the weighted molecular mean (NH, CN), both on '
                    'the 3D scale; uncertainty half their range or their propagated error, whichever '
                    'is larger (Asplund+2021 Sect. 2.3)')
        else:
            a, s = parts[0][:2]
            rule = 'only one of atomic / molecular N available'
    else:
        a, s = _wmean(list(rows.values()))[:2]
        rule = ('weighted mean and error of the indicator families '
                + ', '.join(ASPLUND_FAMILIES[element])
                + (' (Asplund+2021 Sect. 2.4); inverse total-variance weights; '
                   'statistical parts combined as independent, systematic parts as shared (Amarsi+2021 Eq. 3)' if element in REQUIRED_FAMILY_SELECTORS
                   else ' (Asplund+2021 Sect. 2.3)'))
    if any(rep[f].get('asplund_3d_shift') for f in rep):
        rule += ('; 1D results moved to the 3D scale by Asplund+2021 Table 3 (3D minus 1D MARCS '
                 'for the same indicator)')
    return {'element': element, 'A': a, 'sigma': s, 'rule': rule,
            'families': [{'family': f, 'A': rows[f][0], 'sigma': rows[f][1],
                          'shift': float(rep[f].get('asplund_3d_shift') or 0.0), 'product': rep[f]}
                         for f in ASPLUND_FAMILIES[element] if f in rep],
            'missing': [f for f in ASPLUND_FAMILIES[element] if f not in rep]}


# ── RYA-1233: Asplund's LINE-SET recipe (Si, Al) ─────────────────────────────────────────
#
# Asplund+2021 Sect. 3 does not combine indicator families for Si or Al. Each value is ONE
# analysis of a published line set, weighted line by line:
#   Si 7.51 +/- 0.03  nine Si I + one Si II line (Amarsi & Asplund 2017, Scott+2015b data)
#   Al 6.43 +/- 0.03  Nordlander & Lind 2017 Table A.1 (1089.1 nm dropped for tellurics)
# Our set is carried as one product per band x ion, so the recipe is: on ONE spectrum, take
# each band x ion's best analysis (rank_key -- most complete treatment first), and combine
# them by 1/sigma^2. The spectrum is the one that covers the most of the set, then the
# tightest. Splitting the set across spectra would average holdings as if independent.
LINE_SET_SELECTORS = {'Si': 'SET-SI_AGSS21', 'Al': 'SET-AL_AGSS21', 'Na': 'SET-NA_AGSS21'}
LINE_SET_SOURCE = {'Si': 'Amarsi & Asplund 2017: nine Si I and one Si II line',
                   'Al': 'Nordlander & Lind 2017: the Al I lines of their Table A.1',
                   'Na': 'the five Na I lines of their Table A.1'}


def asplund_line_set(products, element):
    sel = LINE_SET_SELECTORS.get(element)
    if sel is None:
        return None
    by_holding = {}
    for p in products:
        if eligible_for_headline(p) and str(p.get('selector') or '') == sel and total_sigma(p):
            by_holding.setdefault(p.get('holding'), []).append(p)
    best = None
    for holding, ps in by_holding.items():
        parts = {}
        for p in ps:
            parts.setdefault((p.get('band'), str(p.get('ion') or 'I').strip()), []).append(p)
        rep = sorted((min(v, key=rank_key) for v in parts.values()),
                     key=lambda p: (BAND_ORDER.index(p['band']) if p.get('band') in BAND_ORDER
                                    else len(BAND_ORDER), str(p.get('ion') or 'I')))
        a, s = _wmean([_row(p) for p in rep])[:2]
        n = sum(resolved_lines(p) for p in rep)
        key = (-n, round(s, 6), str(holding))
        if best is None or key < best[0]:
            best = (key, a, s, n, rep)
    if best is None:
        return None
    _, a, s, n, rep = best
    return {'element': element, 'A': a, 'sigma': s, 'n_lines': n, 'kind': 'line_set',
            'rule': (f'the Asplund et al. 2021 line set ({LINE_SET_SOURCE[element]}), '
                     f'{n} lines measured on one spectrum, each part weighted by its uncertainty'),
            'families': [{'family': f'{element} {str(p.get("ion") or "I").strip()}',
                          'A': float(p['A']), 'sigma': float(total_sigma(p)), 'product': p}
                         for p in rep],
            'missing': []}


def literature_headline(products, element):
    """Asplund+2021's own method where we have its recipe: the family combination (C, N, O)
    or the line-set analysis (Si, Al). None when the element has no Asplund recipe, or none
    of its products qualify -- the caller then shows the best single product (`headline`)."""
    if element in ASPLUND_FAMILIES:
        return asplund_headline(products, element)
    return asplund_line_set(products, element)
