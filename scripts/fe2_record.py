"""RYA-876 — build the Fe II reporting record from committed Codex science artifacts.

Fe II is NOT the Fe headline abundance. It is the ionization arbiter (RYA-406
DECISION 2), so every number here is read from the band products and the
disposition registry; nothing on this page is hand-typed.

The Fe II source of truth is the POST-DISPOSITION band product. RYA-877 excluded
the circular Fe II 5991.371 (MB09 solar-fitted gf) and RYA-880 re-derived the
cell with that exclusion applied, so `data/results/rya880/` — not the
pre-disposition per-line set banked under `data/results/rya877/` — is what this
record publishes. `stale_inputs()` below checks the other committed artifacts
against it and reports, rather than hides, any that disagree.
"""

from __future__ import annotations

import csv
import datetime
import json
import math
import subprocess
from pathlib import Path

#: RYA-877 wrote this class into the RYA-463 registry: a log gf obtained by inverse
#: analysis of a stellar spectrum. Naming the provenance, not the circularity —
#: whether it IS circular depends on which star you point it at.
ASTROPHYSICAL_GF = "ASTROPHYSICAL_GF"

#: instrument_id -> the name a reader recognises. One label per instrument, so the same
#: arm cannot appear under two names in one table.
INSTR_LABEL = {
    "kpno_solar_atlas": "NSO Kitt Peak solar flux atlas",
    "iag_fts_solar_atlas": "IAG FTS solar atlas",
    "harps": "HARPS (direct solar)",
    "crires_plus": "CRIRES+ (Vesta)",
}

BAND_PRODUCT_DIR = "data/results/rya880"
#: The FULL Fe product matrix (RYA-783). The rya880 re-derivation covers the three
#: VIS cells RYA-877 touched; every other Fe II cell — the whole red-optical band,
#: and the VIS gerber-nlte deck — exists only here. Publishing rya880 alone would
#: under-report Fe II's coverage, which RYA-876 forbids as firmly as padding it.
FE_MATRIX = "data/results/rya783/fe_product_matrix.csv"
#: The dispositioned line sits at 5991 A. A band that does not contain it cannot
#: have been moved by the disposition — stated as a reason, not assumed.
DISPOSITIONED_LINE_A = 5991.371
FE2_STEM = "FeII_3800_6910_kpno_solar_atlas_PROFILEFIT"
FE1_STEM = "FeI_3800_6910_kpno_solar_atlas_PROFILEFIT"


def _rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(line for line in handle if not line.startswith("#")))


def _total(stat: str, syst: str) -> float:
    return math.hypot(float(stat), float(syst))


def _num(value, digits=4):
    try:
        return round(float(value), digits)
    except (TypeError, ValueError):
        return None


def required_paths(science: Path) -> list[Path]:
    return [
        science / BAND_PRODUCT_DIR / f"{FE2_STEM}_products.csv",
        science / BAND_PRODUCT_DIR / f"{FE2_STEM}_budgets.txt",
        science / FE_MATRIX,
        science / BAND_PRODUCT_DIR / f"{FE1_STEM}_products.csv",
        science / BAND_PRODUCT_DIR / f"{FE2_STEM}_1D-LTE_lines.csv",
        science / BAND_PRODUCT_DIR / f"{FE2_STEM}_ENGINE-A_lines.csv",
        science / BAND_PRODUCT_DIR / f"{FE2_STEM}_ENGINE-B_lines.csv",
        science / "data/results/rya877/rya877_disposition_impact.json",
        science / "data/results/rya853/rya853_dh19_referee.json",
        science / "data/results/rya852/rya852_summary.json",
        science / "data/registry/problem_children.csv",
    ]


# ---------------------------------------------------------------- the arbiter


def _arbiter_treatment(impact: dict) -> str:
    """Which treatment IS the arbiter — read from RYA-877's assertion, not assumed.

    RYA-852 established it as "the Fe II VIS ENGINE-A aggregate (n=3), read from
    the products", and RYA-877 re-asserted the trio line-by-line rather than
    trusting the label. We take the treatment RYA-877 checked.
    """
    return str(impact["ionization_arbiter"]["treatment"])


def _rederived(science: Path) -> dict:
    """The three VIS cells RYA-880 re-derived after the RYA-877 disposition."""
    return {(r["band"], r["treatment"]): r for r in
            _rows(science / BAND_PRODUCT_DIR / f"{FE2_STEM}_products.csv")}


def products(science: Path, impact: dict) -> list[dict]:
    """Every Fe II cell in the matrix, each labelled with its disposition state.

    🔴 Three states, and the third is the point: a cell was either re-derived after
    RYA-877, or provably could not be affected (its band does not contain the line),
    or it is neither — still carrying its pre-disposition membership with no
    committed artifact that says whether the line was in it. That last state is
    reported, not quietly rendered as if it were current.
    """
    arbiter = _arbiter_treatment(impact)
    rederived = _rederived(science)
    out = []
    for row in _rows(science / FE_MATRIX):
        if row["element"] != "Fe" or row["ion"] != "II":
            continue
        band, treatment = row["band"], row["treatment"]
        fresh = rederived.get((band, treatment))
        source = fresh or row
        lo, hi = _band_range(band)
        in_band = lo is not None and lo <= DISPOSITIONED_LINE_A <= hi

        if fresh is not None:
            state, state_note = "re-derived", (
                "Re-derived after the RYA-877 disposition (RYA-880); this is the "
                "post-disposition value.")
        elif not in_band:
            state, state_note = "unaffected", (
                f"The dispositioned line is at {DISPOSITIONED_LINE_A:.3f} Å, outside "
                f"this band, so the disposition cannot have moved this cell.")
        else:
            state, state_note = "not re-derived", (
                "This cell was NOT re-derived after the RYA-877 disposition and no "
                "committed per-line artifact records whether it carried the "
                "dispositioned line, so whether its value moves is unknown.")

        moved = impact["products"].get(treatment, {}) if band == "VIS" else {}
        delta = moved.get("delta") or {}
        out.append({
            "band": band,
            # 🔴 The instrument is READ from the product, never assumed. An earlier
            # pass hardcoded the Kitt Peak label here while unifying atlas naming, which
            # stamped Kitt Peak's name onto the IAG arm's measurements — the same
            # mislabelling defect this page exists to expose (RYA-896).
            "instrument": INSTR_LABEL.get(row["instrument"], row["instrument"]),
            "engine": treatment,
            "method": (fresh or {}).get("handler") or _handler_of(treatment),
            "value": float(source["A"]),
            "sigma": _total(source["stat_dex"], source["syst_dex"]),
            "sigmaStat": float(source["stat_dex"]),
            "sigmaSys": float(source["syst_dex"]),
            "lineCount": int(float(source["n_lines"])),
            "excludedCount": int(float(source["n_excluded"])),
            "dominant": source["dominant"],
            # RYA-712: engines are separate products. `role` is the product's job,
            # not a quality ranking.
            "role": "arbiter" if (treatment == arbiter and band == "VIS") else "diagnostic",
            "dispositionState": state,
            "dispositionNote": state_note,
            "dispositionDelta": _num(delta.get("value")) if (delta and fresh) else None,
            "dispositionBefore": _num((moved.get("before") or {}).get("median"), 3)
                                 if (delta and fresh) else None,
        })
    out.sort(key=lambda p: (["VIS", "red-optical"].index(p["band"])
                            if p["band"] in ("VIS", "red-optical") else 9,
                            p["engine"]))
    return out


#: RYA-489 hard wavelength-arm boundaries, as the band products' own stems name them.
_BAND_RANGES = {"near-UV": (3000, 3780), "VIS": (3800, 6910),
                "red-optical": (6910, 9199), "NIR": (10000, 12935)}


def _band_range(band: str):
    return _BAND_RANGES.get(band, (None, None))


def _handler_of(treatment: str, science: Path | None = None) -> str:
    """The handler that produced this treatment — READ from the product, not inferred.

    🔴 RYA-906. What stood here was
        `"SynthesisHandler" if treatment.startswith("ENGINE-B") else "ProfileFitHandler"`
    which derives a property of the measurement from the spelling of its label. That is
    the RYA-869 defect inverted: RYA-869 inferred the treatment's systematic from the
    label and charged four published bars the wrong handler's residual. The same
    reasoning here gets the near-UV Fe I cell backwards — its label is `1D-LTE` and it is
    a RYA-759 synthesis flux fit, so a prefix test calls it the profile fitter.

    The science repo's products CSV carries `handler` (RYA-869) and now `route` (RYA-906).
    Read it. Fall back to the old inference only when no product row exists, and say so.
    """
    if science is not None:
        for row in _rows(science / BAND_PRODUCT_DIR / f"{FE2_STEM}_products.csv"):
            if (row.get("treatment") or "").strip() == treatment:
                h = (row.get("handler") or "").strip()
                if h:
                    return h
    return "SynthesisHandler" if treatment.startswith("ENGINE-B") else "ProfileFitHandler"


# ------------------------------------------------------- coverage, honestly stated


def coverage(science: Path) -> list[dict]:
    """Fe II's ACTUAL band coverage. RYA-876: do not pad it — and do not shrink it.

    Established bands are read from the Fe product matrix, so a band Fe II reaches
    cannot be dropped by looking at too narrow a set of files. Bands it does not
    reach carry a reason instead of a blank.
    """
    established = {}
    for row in _rows(science / FE_MATRIX):
        if row["element"] == "Fe" and row["ion"] == "II":
            established.setdefault(row["band"], set()).add(row["treatment"])

    # 🔴 SCOPE EVERY ABSENCE TO THE ARTIFACT INSPECTED (RYA-833). Neither of these is
    # "Fe II has no lines here" — both are checked statements about what was run.
    reasons = {
        "near-UV": (
            "Not an absence of lines: 106 Fe II near-UV lines WERE attempted and every "
            "one was refused by band policy, which bans profile fitting below 3780 Å "
            "(median line gap 0.146 Å). Fe I reaches this band through the RYA-759 "
            "SYNTHESIS route instead; that route has never been run for Fe II. The "
            "measured equivalent widths exist (rya783 band_ew, Sirius) — the "
            "derivation to a product does not."),
        "NIR": (
            "No Fe II product and no Fe II equivalent-width measurement exists here. "
            "The Fe II line set stops at 9199 Å, which is where the GES line list ends "
            "(RYA-762 — a catalogue wall, not physics). The redward extension that "
            "gave Fe I its 10000–12935 Å cell (RYA-834, Ruffoni-2014 + Belmonte-2017) "
            "ingests Fe I laboratory gf only, so it does not carry Fe II across."),
    }
    out = []
    for band, (lo, hi) in _BAND_RANGES.items():
        engines = sorted(established.get(band, ()))
        out.append({
            "band": band, "range": f"{lo}–{hi} Å",
            "instrument": "NSO Kitt Peak solar flux atlas",
            "established": bool(engines),
            "engines": engines,
            "reason": None if engines else reasons.get(band),
        })
    return out


# ── coverage GRID: one entry per (instrument x band), for the product matrix ──
#
# The per-band `coverage()` above answers "does this element reach this band". The
# matrix needs the second axis too, because a band can be reached by one arm and not
# another — and that difference is the thing worth seeing.
#
# Spans are the catalogued instrument ranges and pipeline/band_policy.POLICIES band
# edges. NOT filename stems: a stem names the range that was RUN, which is not the
# band, and taking edges off stems silently changes every coverage verdict.
INSTR_SPAN_A = {
    "NSO Kitt Peak solar flux atlas": (2960.0, 13000.0),
    "IAG FTS solar atlas": (4047.4, 10649.9),
    "HARPS (direct solar)": (3780.0, 6910.0),
    "CRIRES+ (Vesta)": (9500.0, 53000.0),
}
INSTR_ROLE = {
    "NSO Kitt Peak solar flux atlas": "reference atlas - widest solar arm",
    "IAG FTS solar atlas": "reference atlas - second arm, Sirius only",
    "HARPS (direct solar)": "direct solar feed - ESO 1102.D-0954",
    "CRIRES+ (Vesta)": "reflected solar - 18 IDPs",
}
#: RYA-489 arms, from pipeline/band_policy.POLICIES.
BAND_EDGES = {"near-UV": (3000.0, 3800.0), "VIS": (3800.0, 6910.0),
              "red-optical": (6910.0, 10000.0), "NIR": (10000.0, 24000.0)}
#: Below this fraction of a band an arm cannot host a product there; calling that a
#: gap invents an obligation the instrument cannot meet.
USABLE_OVERLAP = 0.05


def coverage_grid(science: Path, products: list[dict]) -> list[dict]:
    have = {(p["instrument"], p["band"]) for p in products}
    seen = {p["instrument"] for p in products}
    out = []
    for inst, (ilo, ihi) in INSTR_SPAN_A.items():
        for band, (blo, bhi) in BAND_EDGES.items():
            frac = max(0.0, min(ihi, bhi) - max(ilo, blo)) / (bhi - blo)
            if (inst, band) in have:
                state, reason = "present", ""
            elif frac < USABLE_OVERLAP:
                state = "nodata"
                reason = ("%s spans %.0f-%.0f A - no usable overlap with this band."
                          % (inst, ilo, ihi))
            elif inst not in seen:
                state = "gap"
                reason = ("%s reaches %.0f%% of this band but no Fe II product exists "
                          "for it." % (inst, 100 * frac))
            else:
                state = "gap"
                reason = ("No Fe II product for this arm in this band, though it covers "
                          "%.0f%% of it." % (100 * frac))
            out.append({"instrument": inst, "instrumentRole": INSTR_ROLE.get(inst, ""),
                        "band": band, "range": "%.0f-%.0f \u00c5" % (blo, bhi),
                        "state": state, "reason": reason,
                        "established": state == "present"})
    return out


# --------------------------------------------------------- ionization balance


def _cells(science: Path, ion: str) -> dict:
    """(band, treatment) -> product row, freshest artifact winning, vintage recorded.

    The RYA-880 re-derivation covers only the three VIS cells RYA-877 touched. Every
    other cell exists solely in the RYA-783 matrix, which predates both the RYA-847
    constraint gate and the disposition. Taking the freshest available for each cell
    is right; NOT saying which is which would let a reader difference two cells of
    different vintage and believe the gap means something physical.
    """
    out = {}
    for row in _rows(science / FE_MATRIX):
        if row["element"] == "Fe" and row["ion"] == ion:
            out[(row["band"], row["treatment"])] = dict(
                row, _vintage="RYA-783 matrix (pre-disposition, pre-847 gate)")
    stem = FE2_STEM if ion == "II" else FE1_STEM
    for row in _rows(science / BAND_PRODUCT_DIR / f"{stem}_products.csv"):
        out[(row["band"], row["treatment"])] = dict(
            row, _vintage="RYA-880 re-derivation (post-disposition)")
    return out


def ionization_balance(science: Path) -> dict:
    """Fe I − Fe II, computed LIKE WITH LIKE and labelled as such.

    ⚠️ The published Fe I anchor (7.466) is on the 3D-NLTE scale; these Fe II products
    are 1D profile fits and syntheses. Differencing those two would compare scales,
    not ionization stages. So the balance is taken PER (band × engine) from the same
    band, the same atlas, and the same handler — the only difference is the ion.

    ⚠️ No verdict artifact carries an Fe II row (the phase_c verdict has 26 element
    rows and Fe appears once, as Fe I). RYA-876 asked for the balance "pulled from the
    verdict artifact"; that artifact does not carry it, so this is derived here and
    says so.
    """
    fe1, fe2 = _cells(science, "I"), _cells(science, "II")
    pairs = []
    for key in sorted(set(fe1) & set(fe2),
                      key=lambda k: (["VIS", "red-optical"].index(k[0])
                                     if k[0] in ("VIS", "red-optical") else 9, k[1])):
        band, treatment = key
        one, two = fe1[key], fe2[key]
        pairs.append({
            "band": band, "engine": treatment,
            "handler": two.get("handler") or _handler_of(treatment),
            "feI": float(one["A"]), "feINLines": int(float(one["n_lines"])),
            "feII": float(two["A"]), "feIINLines": int(float(two["n_lines"])),
            "balance": _num(float(one["A"]) - float(two["A"]), 3),
            "sameVintage": one["_vintage"] == two["_vintage"],
            "vintage": (one["_vintage"] if one["_vintage"] == two["_vintage"]
                        else f"Fe I: {one['_vintage']} · Fe II: {two['_vintage']}"),
        })
    return {
        "source": "derived here from the Fe product matrix, like with like",
        "verdictArtifactCarriesIt": False,
        "note": ("Each row differences the same band, atlas, and engine, so the only "
                 "variable is the ionization stage. The published Fe I anchor of 7.466 "
                 "is on the 3D-NLTE scale and is deliberately NOT used here — "
                 "differencing it against these Fe II products would measure the scale, "
                 "not the ionization."),
        "pairs": pairs,
    }


# ------------------------------------------------------------- the RYA-853 story


def nist_offset_story(science: Path) -> dict:
    referee = json.loads(
        (science / "data/results/rya853/rya853_dh19_referee.json").read_text())
    audit = json.loads(
        (science / "data/results/rya852/rya852_summary.json").read_text())
    band = referee.get("band_dependence", {})
    return {
        "poolOffsetDex": _num(referee["ours_minus_nist_pool"], 3),
        "verdict": referee["verdict"],
        "reasoning": referee["reasoning"],
        "referee": referee["referee"],
        "nOverlapLines": referee["n_overlap_lines"],
        "oursMinusDh": {
            "median": _num(referee["ours_minus_dh"]["median"], 3),
            "ci95": [_num(v, 3) for v in referee["ours_minus_dh"]["ci95"]],
            "n": referee["ours_minus_dh"]["n"],
        },
        "bandDependence": {
            "blue": _num(band.get("blue_overlap_4173_4584"), 3),
            "red": _num(band.get("red_pool_5256_6456"), 3),
            "swing": _num(band.get("swing_dex"), 3),
            "signFlips": bool(band.get("sign_flips")),
        },
        "caveat": referee["caveat"],
        # RYA-852: the honest floor, and why it is not the 0.041 a grade B implies.
        "arbiterLines": audit["arbiter_lines_air_A"],
        "arbiterNistAccuracyDex": {k: _num(v, 3) for k, v in
                                   audit["arbiter_nist_accuracy_dex"].items()},
        "labGfVerdict": audit["verdict"],
        "denHartogCoverage": audit["den_hartog_2019_coverage"]["ranges_A"],
        "denHartogCoversArbiter": audit["den_hartog_2019_coverage"]["covers_the_arbiter_trio"],
        "poolScaleNote": audit["pool_scale_offset"]["note"],
    }


# ------------------------------------------------------------ per-line evidence


def lines(science: Path, perline: list[dict]) -> list[dict]:
    """One row per (line × engine), read from the band products RYA-880 emitted.

    The atomic data is joined from the RYA-870 per-line product on wavelength AND
    excitation potential — RYA-780/852 both found a wavelength-only window returns
    a high-excitation neighbour as if it were the line.
    """
    atomic = {}
    for row in perline:
        if row["ion"] != "II":
            continue
        key = (round(float(row["wavelength_air_A"]), 2), row["engine"])
        atomic[key] = row

    out = []
    for treatment in ("1D-LTE", "ENGINE-A", "ENGINE-B"):
        path = science / BAND_PRODUCT_DIR / f"{FE2_STEM}_{treatment}_lines.csv"
        for row in _rows(path):
            wl = float(row["wavelength_air_A"])
            atom = atomic.get((round(wl, 2), treatment), {})
            kept = row["in_aggregate"] == "True"
            out.append({
                "wavelength": round(wl, 4),
                "ep": _num(row.get("ep_eV"), 4),
                "engine": treatment,
                # 🔴 RYA-906 — this was `treatment == "ENGINE-B"`, the EXACT compare
                # RYA-869 was filed about: it does not match `ENGINE-B-NLTE`, so the
                # NLTE synthesis leg was being labelled ProfileFitHandler on the
                # published page. Read the handler off the product instead.
                "handler": _handler_of(treatment, science),
                "abundance": _num(row.get("abundance"), 4),
                "kept": kept,
                "logGf": _num(atom.get("log_gf"), 4),
                "gfSource": atom.get("gf_source") or "",
                "gfGrade": atom.get("gf_grade") or "",
                "nlteDeltaDex": _num(row.get("nlte_delta_dex"), 4),
                "nlteSource": row.get("nlte_source") or "",
                "problemClass": row.get("problem_class") or "",
                "problemAction": row.get("problem_action") or "",
                "problemTickets": row.get("problem_tickets") or "",
                "excludedReason": row.get("excluded_reason") or "",
                # RYA-844: an excluded line owes a STATED reason. Where the registry
                # has no row the deriver's own reason is the reason — never a bare
                # "excluded" with nothing behind it.
                "exclusionLabel": (
                    "" if row["in_aggregate"] == "True"
                    else (row.get("problem_class")
                          or (row.get("excluded_reason") or "").split(":")[0].strip()
                          or "excluded")),
            })
    return out


def line_accounting(science: Path) -> dict:
    """🔴 RYA-844: an excluded line is a ROW, never a drop — checked, not assumed.

    Every treatment measured the same candidate set, so every treatment owes a row
    for every line in the union. Where one is missing, the page says which line and
    which treatment rather than showing a shorter table with no explanation.
    """
    per_treatment, union = {}, set()
    for treatment in ("1D-LTE", "ENGINE-A", "ENGINE-B"):
        path = science / BAND_PRODUCT_DIR / f"{FE2_STEM}_{treatment}_lines.csv"
        seen = {round(float(r["wavelength_air_A"]), 3) for r in _rows(path)}
        per_treatment[treatment] = seen
        union |= seen

    missing = []
    for treatment, seen in per_treatment.items():
        for wl in sorted(union - seen):
            missing.append({"engine": treatment, "wavelength": wl})
    return {
        "unionCount": len(union),
        "byTreatment": {k: len(v) for k, v in per_treatment.items()},
        "missing": missing,
        "detail": (
            "Each treatment should carry a row for every measured line, kept or not. "
            "A line present in one treatment's table and absent from another's has "
            "been dropped rather than dispositioned, and the reason for its absence "
            "is not recorded anywhere in the artifact." if missing else
            "Every measured line is accounted for in every treatment."),
    }


def dispositions(science: Path) -> list[dict]:
    """The RYA-844 visible rows: an excluded line is a ROW, never a drop."""
    out = []
    for row in _rows(science / "data/registry/problem_children.csv"):
        if row["species"].strip() != "Fe II":
            continue
        out.append({
            "scope": row["lambda_or_scope"],
            "problemClass": row["problem_class"],
            "treatment": row["required_treatment"],
            "severity": row["severity"],
            "status": row["status"],
            "tickets": row["governing_tickets"],
            "note": row["notes"],
        })
    return out


# ------------------------------------------------------------- the stale check


def stale_inputs(science: Path, perline: list[dict], impact: dict) -> list[dict]:
    """🔴 Report, never hide, any committed artifact that disagrees on membership.

    RYA-877 excluded 5991.371 and measured the move. RYA-870's per-line product
    was generated from the PRE-disposition line set banked under
    `data/results/rya877/`, so its Fe II slice still counts the line into the pool
    (it reads `flagged_kept`, which is what `_disposition` returns whenever the
    deriver kept a registered line — a benign-looking status for a stale input).

    This function makes that visible instead of letting the page inherit it. It
    compares the per-line product's kept-count per engine against the band product
    this page actually publishes.
    """
    published = {}
    for row in _rows(science / BAND_PRODUCT_DIR / f"{FE2_STEM}_products.csv"):
        published[row["treatment"]] = int(row["n_lines"])

    counts: dict[str, int] = {}
    for row in perline:
        if row["ion"] != "II":
            continue
        if row["status"] == "excluded":
            continue
        counts[row["engine"]] = counts.get(row["engine"], 0) + 1

    findings = []
    for engine, n_published in published.items():
        n_perline = counts.get(engine)
        if n_perline is None or n_perline == n_published:
            continue
        findings.append({
            "artifact": "data/products/solar/Fe_perline.csv (RYA-870)",
            "engine": engine,
            "publishedLineCount": n_published,
            "artifactLineCount": n_perline,
            "detail": (
                f"The per-line product counts {n_perline} Fe II {engine} lines into "
                f"the pool; the published band product carries {n_published}. Its "
                f"band-product input defaults to data/results/rya877/, which predates "
                f"the RYA-877 disposition; data/results/rya880/ supersedes it. This "
                f"page reports the band product, so no published number is affected — "
                f"but the downloadable per-line file is one generation behind."),
        })
    return findings


def _last_commit(science: Path, relative: str) -> str:
    """The commit that last touched this artifact — not `git rev-parse HEAD`.

    RYA-776: stamping HEAD into an artifact records when the generator ran, not
    which version of the input it read. Pin the INPUT.
    """
    try:
        return subprocess.check_output(
            ["git", "log", "-1", "--format=%H", "--", relative],
            cwd=science, text=True).strip() or "uncommitted"
    except subprocess.CalledProcessError:            # pragma: no cover
        return "unknown"


def reproducibility(science: Path) -> dict:
    """This page's OWN provenance.

    ⚠️ Not the per-line product's. That file is Fe-wide and, for Fe II, one
    generation behind (see `stale_inputs`); quoting its commit here would name the
    wrong artifact as this page's source.
    """
    band_product = f"{BAND_PRODUCT_DIR}/{FE2_STEM}_products.csv"
    return {
        "generator": "scripts/generate_solar_report.py + scripts/fe2_record.py",
        "version": "1.0.0",
        "sourceArtifact": band_product,
        "registry": "data/registry/problem_children.csv",
        "instrument": "NSO Kitt Peak solar flux atlas · 3800–6910 Å",
        "bandProductCommit": _last_commit(science, band_product),
        "registryCommit": _last_commit(science, "data/registry/problem_children.csv"),
        "scienceGit": _last_commit(science, "."),
        "generatedAt": datetime.datetime.now(datetime.timezone.utc)
                               .replace(microsecond=0).isoformat(),
    }


def build(science: Path, perline: list[dict]) -> dict:
    impact = json.loads(
        (science / "data/results/rya877/rya877_disposition_impact.json").read_text())
    prods = products(science, impact)
    arbiter_treatment = _arbiter_treatment(impact)
    arbiter = next(p for p in prods if p["engine"] == arbiter_treatment)

    # 🔴 ASSERT the arbiter trio rather than trusting the label (RYA-877 item 5).
    trio = impact["ionization_arbiter"]
    if not trio["value_unchanged"] or trio["carries_the_dispositioned_line"]:
        raise SystemExit(
            "RYA-877 recorded the ionization arbiter as moved or as carrying the "
            "dispositioned line; this page may not publish it as the arbiter.")

    return {
        "atomicNumber": 26, "symbol": "Fe", "ion": "II", "name": "Iron",
        "childOf": "Fe I",
        "status": "arbiter · generated",
        "measurementRole": "ionization arbiter / diagnostic",
        "appendixPath": "/systems/sol/elements/fe-ii/",
        "referenceKeys": ["asplund2021", "denhartog2019", "melendez2009", "scott2015"],
        # The row's reported value IS the arbiter — n=3, the RYA-852 trio.
        "primary": {
            "value": arbiter["value"],
            "sigmaStat": arbiter["sigmaStat"],
            "sigmaSys": arbiter["sigmaSys"],
            "sigmaTotal": arbiter["sigma"],
            "lineCount": arbiter["lineCount"],
            "engine": arbiter["engine"],
            "handler": arbiter["method"],
        },
        # RYA-876: do NOT present this as a co-equal headline abundance, and do not
        # show a Δ against Asplund — Asplund publishes A(Fe), not A(Fe II).
        "asplund": None,
        "arbiterTrioA": trio["lines_air_A"],
        "products": prods,
        "coverage": coverage(science),
        "coverageGrid": coverage_grid(science, prods),
        "ionizationBalance": ionization_balance(science),
        "nistOffset": nist_offset_story(science),
        "lines": lines(science, perline),
        "dispositions": dispositions(science),
        "dispositionImpact": {
            "line": impact["line_air_A"],
            "products": {
                treatment: {
                    "before": _num((v.get("before") or {}).get("median"), 4),
                    "after": _num((v.get("after") or {}).get("median"), 4),
                    "delta": _num((v.get("delta") or {}).get("value"), 4),
                    "statBefore": _num((v.get("before") or {}).get("stat_dex"), 4),
                    "statAfter": _num((v.get("after") or {}).get("stat_dex"), 4),
                    "nBefore": (v.get("before") or {}).get("n"),
                    "nAfter": (v.get("after") or {}).get("n"),
                    "lineOwnAbundance": _num(v.get("line_own_abundance"), 4),
                } for treatment, v in impact["products"].items()
                if v.get("carries_the_line")
            },
            "controlStatus": impact["same_inputs_control"]["status"],
            "controlMethod": impact["same_inputs_control"]["method"],
        },
        "lineAccounting": line_accounting(science),
        "staleInputs": stale_inputs(science, perline, impact),
        "reproducibility": reproducibility(science),
        "downloadPath": "/assets/data/solar/FeII_perline.csv",
    }
