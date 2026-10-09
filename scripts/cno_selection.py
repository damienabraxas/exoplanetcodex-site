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


def rank_key(p):
    return (0 if p.get('grade') == 'Reference Grade' else 1,
            treatment_rank(p),
            -(p.get('n_lines') or 0),
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
