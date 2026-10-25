#!/usr/bin/env python3
"""Re-render the published element-appendix PDFs from their saved report models.

RYA-1271: the PDF layer changed (the Exoplanet Codex document header), the science did
not. Each appendix's report.json is the exact model its PDF was built from, so the PDF
is re-rendered from it alone -- no science checkout, no regenerated page or feed. The
recorded generator hashes in that report and its manifest are updated so the record
names the code that drew the bytes.

    python3 scripts/rerender_appendix_pdfs.py
"""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from element_appendix_pdf import render_pdf  # noqa: E402

PDF_GEN = ROOT / "scripts/element_appendix_pdf.py"
BRAND = ROOT / "scripts/codex_doc_brand.py"

#: (report model, manifest that records the hash, published PDF)
TARGETS = [
    (f"assets/data/fe-publication/solar_fe_{ion}_appendix.report.json",
     "assets/data/fe-publication/manifest.json",
     f"assets/docs/appendices/solar_fe_{ion}_appendix.pdf") for ion in ("i", "ii")
] + [
    (f"assets/data/cno-publication/{el}/report.json",
     f"assets/data/cno-publication/{el}/manifest.json",
     f"assets/docs/appendices/solar_{el.lower()}_appendix.pdf")
    for el in ("Al", "C", "Mg", "N", "O", "Si")
]


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def stamp(path: Path, gen: str, brand: str) -> dict:
    text = path.read_text()
    data = json.loads(text)
    meta = data.get("metadata", data)
    meta["pdf_generator_sha256"] = gen
    meta["pdf_brand_sha256"] = brand
    # Keep each file's own escaping (the Fe generator writes ASCII-escaped JSON) so the
    # diff is the two hash fields and nothing else.
    path.write_text(json.dumps(data, indent=2, ensure_ascii=text.isascii(), allow_nan=False) + "\n")
    return data


def main() -> None:
    gen, brand = sha(PDF_GEN), sha(BRAND)
    seen_manifests = set()
    for report_rel, manifest_rel, pdf_rel in TARGETS:
        report = stamp(ROOT / report_rel, gen, brand)
        if manifest_rel not in seen_manifests:
            stamp(ROOT / manifest_rel, gen, brand)
            seen_manifests.add(manifest_rel)
        render_pdf(report, ROOT / pdf_rel, ROOT)
        print(f"rendered {pdf_rel}")


if __name__ == "__main__":
    main()
