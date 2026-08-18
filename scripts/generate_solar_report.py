#!/usr/bin/env python3
"""Generate the Solar/Fe website model from committed Codex science artifacts."""

from __future__ import annotations

import argparse
import csv
import json
import math
import shutil
import subprocess
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parents[1]
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
    product_paths = [
        science / "data/results/rya847/gated/FeI_3000_3780_kpno_solar_atlas_SYNTH_products.csv",
        science / "data/results/rya847/gated/FeI_10000_12935_kpno_solar_atlas_SYNTH_products.csv",
        science / "data/results/rya847/gated/ts-lte/FeI_3800_6910_kpno_solar_atlas_PROFILEFIT_products.csv",
        science / "data/results/rya847/gated/gerber-nlte/FeI_3800_6910_kpno_solar_atlas_PROFILEFIT_products.csv",
    ]
    required = [perline_path, gold_path, tracker_path, matrix_path, *product_paths]
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
            "band": row["band"], "instrument": "Kitt Peak solar atlas",
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
                "band": row["band"], "instrument": row["instrument"].replace("_", " "),
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

    secondary = next(p for p in products if p["band"] == "VIS" and p["engine"] == "ENGINE-B-NLTE")
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
    other_elements = []
    for row in rows(gold_path):
        if row["element"] == "Fe" or row["element"] not in atomic_numbers:
            continue
        item = {
            "atomicNumber": atomic_numbers[row["element"]], "symbol": row["element"],
            "ion": row["ion"], "name": names[row["element"]],
            "status": row["verdict"].lower(), "asplund": float(row["asplund2021"]),
        }
        other_elements.append(item)
    other_elements.sort(key=lambda item: item["atomicNumber"])

    iron_rows = [
        {"atomicNumber":26,"symbol":"Fe","ion":"I","name":"Iron","status":"gold · generated","appendixPath":"/systems/sol/elements/fe/","referenceKeys":["asplund2021","lodders2025","scott2015","bergemann2012"],
         "primary":{"value":float(gold["A_X"]),"sigmaStat":None,"sigmaSys":None,"sigmaTotal":float(tracker["sigma"]),"lineCount":int(gold["n_lines"])},
         "secondary":{"value":secondary["value"],"sigmaStat":None,"sigmaSys":None,"sigmaTotal":secondary["sigma"],"lineCount":secondary["lineCount"]},
         "asplund":float(gold["asplund2021"]),"products":products,"diagnostics":diagnostics,"provenance":provenance,
         "downloadPath":"/assets/data/solar/Fe_perline.csv"},
        {"atomicNumber":26,"symbol":"Fe","ion":"II","name":"Iron","childOf":"Fe I","status":"appendix pending · RYA-876","measurementRole":"ionization arbiter / diagnostic","diagnostic":{"value":7.500,"sigmaTotal":None,"lineCount":3}},
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
    download = SITE_ROOT / "assets/data/solar/Fe_perline.csv"
    download.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(perline_path, download)
    print(f"generated {args.output.relative_to(SITE_ROOT)}")
    print(f"copied {download.relative_to(SITE_ROOT)} ({len(perline)} rows)")
    print(provenance["sentence"])


if __name__ == "__main__":
    main()
