#!/usr/bin/env python3
"""Generate the Solar/Fe website model from committed Codex science artifacts."""

from __future__ import annotations

import argparse
import csv
import json
import math
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import fe2_record  # noqa: E402


SITE_ROOT = Path(__file__).resolve().parents[1]
#: One atlas, one label. The graded (RYA-850) and ungraded (band product) rows carry
#: `Kitt Peak solar atlas` and `kpno_solar_atlas` for the same instrument; printing
#: both makes one instrument look like two.
ATLAS_LABEL = "NSO Kitt Peak solar flux atlas"
POOR_NIST_CLASSES = {"C", "C+", "D", "D+", "E"}


def rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(line for line in handle if not line.startswith("#")))


def metadata(path: Path) -> dict[str, str]:
    result = {}
    with path.open(encoding="utf-8") as handle:
        for line in handle:
            if not line.startswith("#"):
                break
            if ":" in line:
                key, value = line[1:].split(":", 1)
                result[key.strip()] = value.strip()
    return result


def write_species_csv(source: Path, destination: Path, ion: str) -> int:
    """Publish one appendix-sized CSV from the element-wide pipeline artifact."""
    source_rows = rows(source)
    species_rows = [row for row in source_rows if row["element"] == "Fe" and row["ion"] == ion]
    if not species_rows:
        raise SystemExit(f"No Fe {ion} rows found in {source}")

    comments = []
    with source.open(encoding="utf-8") as handle:
        for line in handle:
            if not line.startswith("#"):
                break
            comments.append(line)
    comments.extend([
        f"# appendix_species: Fe {ion}\n",
        "# website_export: species-specific subset; source rows are unchanged\n",
    ])

    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("w", newline="", encoding="utf-8") as handle:
        handle.writelines(comments)
        writer = csv.DictWriter(handle, fieldnames=species_rows[0].keys())
        writer.writeheader()
        writer.writerows(species_rows)
    return len(species_rows)


def total(stat: str, syst: str) -> float:
    return math.hypot(float(stat), float(syst))


def git_head(root: Path) -> str:
    return subprocess.check_output(
        ["git", "rev-parse", "HEAD"], cwd=root, text=True
    ).strip()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--science-root", required=True, type=Path)
    parser.add_argument("--output", type=Path, default=SITE_ROOT / "assets/data/solar-report.generated.js")
    args = parser.parse_args()
    science = args.science_root.resolve()

    perline_path = science / "data/products/solar/Fe_perline.csv"
    gold_path = science / "data/reference/solar/solar_abundances_v5.csv"
    tracker_path = science / "data/audit/element_status_tracker.csv"
    matrix_path = science / "data/results/rya850/rya850_element_table.csv"
    live_tracker_path = science / "data/results/rya935/live_tracker.html"
    live_status_path = science / "data/results/rya935/live_status.json"
    product_paths = [
        science / "data/results/rya847/gated/FeI_3000_3780_kpno_solar_atlas_SYNTH_products.csv",
        science / "data/results/rya847/gated/FeI_10000_12935_kpno_solar_atlas_SYNTH_products.csv",
        science / "data/results/rya847/gated/ts-lte/FeI_3800_6910_kpno_solar_atlas_PROFILEFIT_products.csv",
        science / "data/results/rya847/gated/gerber-nlte/FeI_3800_6910_kpno_solar_atlas_PROFILEFIT_products.csv",
    ]
    required = [perline_path, gold_path, tracker_path, matrix_path,
                live_tracker_path, live_status_path, *product_paths,
                *fe2_record.required_paths(science)]
    missing = [str(path) for path in required if not path.is_file()]
    if missing:
        raise SystemExit("Missing required science artifacts:\n" + "\n".join(missing))

    perline = rows(perline_path)
    meta = metadata(perline_path)
    gold = next(row for row in rows(gold_path) if row["element"] == "Fe" and row["ion"] == "I")
    tracker = next(row for row in rows(tracker_path) if row["element"] == "Fe")
    graded = [
        row for row in rows(matrix_path)
        if row["element"] == "Fe" and row["ion"] == "I" and row["primary_is_graded"] == "True"
    ]

    products = []
    for row in graded:
        products.append({
            "band": row["band"], "instrument": ATLAS_LABEL,
            "engine": row["engine"], "method": row["pool"],
            "value": float(row["A"]), "sigma": float(row["total_dex"]),
            "lineCount": int(row["n_lines"]), "role": "graded",
        })
    seen = set()
    for path in product_paths:
        for row in rows(path):
            key = (row["band"], row["instrument"], row["treatment"], row["handler"])
            if key in seen:
                continue
            seen.add(key)
            products.append({
                "band": row["band"], "instrument": ATLAS_LABEL,
                "engine": row["treatment"], "method": row["handler"],
                "value": float(row["A"]), "sigma": total(row["stat_dex"], row["syst_dex"]),
                "lineCount": int(row["n_lines"]), "role": "ungraded",
            })

    uv = [r for r in perline if r["element"] == "Fe" and r["ion"] == "I" and r["arm"] == "near-UV"]
    nist = [r for r in uv if r["gf_grade"].startswith("NIST:")]
    poor = [r for r in nist if r["gf_grade"].split(":", 1)[1] in POOR_NIST_CLASSES]
    provenance = {
        "poolCount": len(uv), "nistClassCount": len(nist), "poorNistClassCount": len(poor),
        "poorClasses": sorted(POOR_NIST_CLASSES),
        "sentence": (
            f"{len(nist)} of {len(uv)} near-UV Fe I lines carry a citable NIST accuracy class; "
            f"{len(poor)} of those are in the C/C+/D/D+/E classes."
        ),
    }

    problems = [r for r in perline if r["ion"] == "I" and r["status"] != "in_aggregate"]
    diagnostics = []
    diagnostic_keys = set()
    for row in problems:
        key = (row["wavelength_air_A"], row["reason_code"])
        if key in diagnostic_keys:
            continue
        diagnostic_keys.add(key)
        diagnostics.append({
            "line": f'{float(row["wavelength_air_A"]):.3f} Å',
            "category": row["reason_code"].replace("_", " ").lower(),
            "caption": row["reason_note"] or "Disposition emitted by the problem-line registry.",
            "status": row["status"],
        })
        if len(diagnostics) == 8:
            break

    # 🔴 RYA-906 — select the secondary product by its PHYSICS, not by the spelling of
    # its label. This was `p["engine"] == "ENGINE-B-NLTE"`, the same compare-against-a-
    # label shape RYA-869 was filed about; there it silently matched nothing, here a bare
    # `next()` would raise StopIteration and take the whole report down. Prefer the axis
    # columns the science repo now emits (route/scale/model), fall back to the legacy
    # label for artifacts that predate them, and say plainly what was being looked for.
    def _is_nlte_synth(p):
        route, scale = p.get("route"), p.get("scale")
        if route and scale:
            return route == "synth" and scale != "1D-LTE"
        return p.get("engine") == "ENGINE-B-NLTE"

    secondary = next(
        (p for p in products if p["band"] == "VIS" and _is_nlte_synth(p)), None)
    if secondary is None:
        raise SystemExit(
            "no VIS NLTE-synthesis product found (route=synth, scale!=1D-LTE, legacy "
            "label ENGINE-B-NLTE). The Solar report names one as its secondary; refusing "
            "to render a page that silently drops it.")
    atomic_numbers = {
        "Li": 3, "C": 6, "N": 7, "O": 8, "Na": 11, "Mg": 12, "Al": 13,
        "Si": 14, "P": 15, "S": 16, "K": 19, "Ca": 20, "Sc": 21, "Ti": 22,
        "V": 23, "Cr": 24, "Mn": 25, "Fe": 26, "Co": 27, "Ni": 28, "Cu": 29,
        "Zn": 30, "Sr": 38, "Y": 39, "Zr": 40, "Ba": 56, "Eu": 63,
    }
    names = {
        "Li":"Lithium", "C":"Carbon", "N":"Nitrogen", "O":"Oxygen", "Na":"Sodium",
        "Mg":"Magnesium", "Al":"Aluminium", "Si":"Silicon", "P":"Phosphorus", "S":"Sulfur",
        "K":"Potassium", "Ca":"Calcium", "Sc":"Scandium", "Ti":"Titanium", "V":"Vanadium",
        "Cr":"Chromium", "Mn":"Manganese", "Co":"Cobalt", "Ni":"Nickel", "Cu":"Copper",
        "Zn":"Zinc", "Sr":"Strontium", "Y":"Yttrium", "Zr":"Zirconium", "Ba":"Barium", "Eu":"Europium",
    }
    # 🔴 EVERY element row comes from the GENERATED tracker (RYA-654), not from the
    # gold reference. The gold file is a write-once ratification record: it carries a
    # blank A_X for every CURATION-OWED element and its `ion` column still reads I for
    # species measured as II (Ba, Sr, Y, Zr, Eu). Reading it for the front table threw
    # away every measured non-Fe value and mislabelled five species.
    asplund_of = {row["element"]: row["asplund2021"] for row in rows(gold_path)}
    tier_of = {row["element"]: row["confidence"] for row in rows(gold_path)}

    def optional(value):
        try:
            return float(value)
        except (TypeError, ValueError):
            return None

    other_elements = []
    for row in rows(tracker_path):
        symbol = row["element"]
        if symbol == "Fe" or symbol not in atomic_numbers:
            continue
        value = optional(row["verdict_value"])
        item = {
            "atomicNumber": atomic_numbers[symbol], "symbol": symbol,
            "ion": row["ion"], "name": names[symbol],
            # The tracker's own verdict + tier, not a re-derived label.
            "status": (row["verdict"] or "no verdict").lower(),
            "tier": tier_of.get(symbol, ""),
            "method": row["method"],
            "asplund": optional(asplund_of.get(symbol)),
            # RYA-844: an element with no ratified value keeps a row and states why,
            # rather than being dropped from the table.
            "measurementNote": "" if value is not None else (row["method"] or ""),
        }
        if value is not None:
            item["primaryValue"] = {
                "value": value,
                "sigmaTotal": optional(row["sigma"]),
                "lineCount": optional(row["n_lines"]),
            }
            # Publish the tracker's own delta rather than recomputing it here — a
            # number declared in two places is the RYA-845 defect.
            item["delta"] = optional(row["delta_vs_asplund"])
        other_elements.append(item)
    other_elements.sort(key=lambda item: item["atomicNumber"])

    fe2 = fe2_record.build(science, perline)

    iron_rows = [
        {"atomicNumber":26,"symbol":"Fe","ion":"I","name":"Iron","status":"gold · generated","appendixPath":"/systems/sol/elements/fe/","referenceKeys":["asplund2021","lodders2025","scott2015","bergemann2012"],
         # σ_total is the tracker's published Fe figure; no artifact splits the
         # ratified anchor into stat/sys, so those stay absent rather than invented.
         "primary":{"value":float(gold["A_X"]),"sigmaStat":None,"sigmaSys":None,"sigmaTotal":float(tracker["sigma"]),"lineCount":int(gold["n_lines"]),"sigmaBasis":"element status tracker (RYA-654) — total only"},
         "secondary":{"value":secondary["value"],"sigmaStat":None,"sigmaSys":None,"sigmaTotal":secondary["sigma"],"lineCount":secondary["lineCount"]},
         "asplund":float(gold["asplund2021"]),"products":products,"diagnostics":diagnostics,"provenance":provenance,
         "downloadPath":"/assets/data/solar/FeI_perline.csv"},
        # RYA-876: Fe II is its own species row and its own page. The value is READ
        # from the post-disposition band product (RYA-877 -> RYA-880); the 7.500 that
        # used to sit here was the element tracker's 2026-07-14 number.
        fe2,
    ]
    report = {
        "mode": "generated", "target": "Sun",
        "observingCoverage": [
            {"band":"Visible","range":"3780–6910 Å","instrument":"HARPS · ESO 3.6 m","role":"Primary direct-solar dataset","status":"analysis ready","detail":"10 S1D exposures · R ≈ 115,000 · SNR 306–309 · ESO 1102.D-0954(A)"},
            {"band":"Near-UV through near-IR","range":"3044–10426 Å","instrument":"UVES · Vesta / Ceres","role":"Reflected-Sun cross-band observations","status":"audited with caveats","detail":"Multiple UVES settings; exposure-level coverage and conditioning retained"},
            {"band":"Y / J / H / K","range":"0.95–2.49 µm","instrument":"CRIRES+ · Vesta","role":"Reflected-Sun infrared observations","status":"provisional","detail":"18 extracted IDPs; K-band remains telluric- and RV-conditioning gated"},
            {"band":"Y / J / H","range":"0.966–1.923 µm","instrument":"NIRPS · direct Sun","role":"Direct-solar near-IR holding","status":"reduction owed","detail":"10 raw 2D frames; no reduced Solar S1D product yet"},
            {"band":"Red optical / near-IR","range":"0.5–2.3 µm","instrument":"IAG solar flux atlases","role":"Telluric and wavelength-scale control","status":"reference atlas","detail":"Independent FTS reference coverage"},
            {"band":"Infrared","range":"1.1–5.4 µm","instrument":"NSO Kitt Peak FTS","role":"Ground-based solar photosphere atlas","status":"reference atlas","detail":"Per-band products retain atlas identity and telluric limitations"},
            {"band":"Infrared","range":"2.26–14.3 µm","instrument":"ACE-FTS","role":"Telluric-free space reference","status":"reference atlas","detail":"Validation source for ground-based infrared products"},
        ],
        "bibliography": {
            "asplund2021":{"label":"Asplund, Amarsi & Grevesse (2021), The chemical make-up of the Sun","url":"https://doi.org/10.1051/0004-6361/202140445","role":"Primary 3D non-LTE solar abundance scale"},
            "lodders2025":{"label":"Lodders, Bergemann & Palme (2025), Solar System Elemental Abundances","url":"https://doi.org/10.1007/s11214-025-01146-w","role":"Solar-system abundance comparison"},
            "scott2015":{"label":"Scott et al. (2015), The elemental composition of the Sun II","url":"https://doi.org/10.1051/0004-6361/201424110","role":"Iron-group abundance reference"},
            "bergemann2012":{"label":"Bergemann et al. (2012), Non-LTE line formation of Fe","url":"https://doi.org/10.1111/j.1365-2966.2012.21687.x","role":"Fe non-LTE comparison"},
            "denhartog2019":{"label":"Den Hartog et al. (2019), Atomic transition probabilities for UV and blue lines of Fe II","url":"https://doi.org/10.3847/1538-4365/ab322e","role":"Primary-laboratory Fe II gf referee (2250–3280 Å + 4173–4584 Å)"},
            "melendez2009":{"label":"Meléndez & Barbuy (2009), Both accurate and precise gf-values for Fe II lines","url":"https://doi.org/10.1051/0004-6361/200811302","role":"Fe II log gf source; Table 1 L/S flags separate laboratory-normalised from solar-fitted"},
            "reiners2016":{"label":"Reiners et al. (2016), The IAG solar flux atlas","url":"https://doi.org/10.1051/0004-6361/201527530","role":"Optical/near-IR atlas"},
            "hase2010":{"label":"Hase et al. (2010), The ACE-FTS atlas","url":"https://doi.org/10.1016/j.jqsrt.2009.10.020","role":"Telluric-free infrared atlas"},
        },
        "pageReferenceKeys":["asplund2021","lodders2025","reiners2016","hase2010"],
        "references":[{"name":"Asplund et al. 2021","value":7.46,"sigma":0.04},{"name":"Lodders et al. 2025","value":7.51,"sigma":0.05}],
        "elements": iron_rows + other_elements,
        "reproducibility":{"generator":"scripts/generate_solar_report.py","version":"1.0.0","sourceArtifact":"data/products/solar/Fe_perline.csv","instrument":"Kitt Peak solar atlas + Solar gold v5","gitCommit":git_head(science),"productCommit":meta.get("commit_sha"),"goldVersion":meta.get("gold_version"),"generatedAt":meta.get("generated_utc")},
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text("window.SOLAR_REPORT = " + json.dumps(report, indent=2, ensure_ascii=False) + ";\n", encoding="utf-8")
    download_fe1 = SITE_ROOT / "assets/data/solar/FeI_perline.csv"
    download_fe2 = SITE_ROOT / "assets/data/solar/FeII_perline.csv"
    count_fe1 = write_species_csv(perline_path, download_fe1, "I")
    count_fe2 = write_species_csv(perline_path, download_fe2, "II")
    live_destination = SITE_ROOT / "assets/data/rya935"
    live_destination.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(live_tracker_path, live_destination / "live_tracker.html")
    shutil.copyfile(live_status_path, live_destination / "live_status.json")
    print(f"generated {args.output.relative_to(SITE_ROOT)}")
    print(f"wrote {download_fe1.relative_to(SITE_ROOT)} ({count_fe1} rows)")
    print(f"wrote {download_fe2.relative_to(SITE_ROOT)} ({count_fe2} rows)")
    print(f"published RYA-935 tracker snapshot to {live_destination.relative_to(SITE_ROOT)}")
    print(provenance["sentence"])
    for finding in fe2["staleInputs"]:
        print(f"STALE INPUT: {finding['artifact']} · Fe II {finding['engine']}: "
              f"{finding['artifactLineCount']} lines vs {finding['publishedLineCount']} published")


if __name__ == "__main__":
    main()
