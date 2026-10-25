#!/usr/bin/env python3
"""Give every static PDF the site offers an Exoplanet Codex cover page (RYA-1271).

The glossaries, earlier methodology and architecture documents and the 2010 thesis
were typeset elsewhere, so their pages cannot carry the generated page header the
element appendices get. Each instead gains one branded first page: the Codex icon,
"An Exoplanet Codex download", and the document details, date and author.

Idempotent: a document that already has a Codex cover (marked in its PDF metadata)
has that cover replaced, never a second one stacked on top.

    python3 scripts/brand_static_docs.py          # (re)brand every listed document
    python3 scripts/brand_static_docs.py --check  # exit 1 if any lacks a current cover
"""
from __future__ import annotations

import argparse
import io
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter

sys.path.insert(0, str(Path(__file__).resolve().parent))
import codex_doc_brand as brand  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "assets/docs"
MARK = "/CodexCover"

ARCHIVED = ("Kept for the record. The current description of the method lives at "
            "exoplanetcodex.org/method and of the architecture at exoplanetcodex.org/architecture.")

#: file -> (document title, subject, date, version, note). Dates are when the document
#: was published on the site (the commit that added it), or the original date for the thesis.
DOCUMENTS = {
    "exoplanet-codex-glossary-v1.0.pdf": ("Glossary of Terms", "Exoplanet Codex glossary", "2026-05-30", "v1.0", ARCHIVED),
    "exoplanet-codex-glossary-v2.0.pdf": ("Glossary of Terms", "Exoplanet Codex glossary", "2026-05-31", "v2.0", ARCHIVED),
    "exoplanet-codex-glossary-v3.0.pdf": ("Glossary of Terms", "Exoplanet Codex glossary", "2026-08-08", "v3.0", ARCHIVED),
    "exoplanet-codex-glossary-v3.1.pdf": ("Glossary of Terms", "Exoplanet Codex glossary", "2026-08-08", "v3.1", ARCHIVED),
    "exoplanet-codex-glossary-v3.2.pdf": ("Glossary of Terms", "Exoplanet Codex glossary", "2026-08-08", "v3.2", None),
    "exoplanet-codex-methodology-v1.2.pdf": ("Spectral Analysis Methodology", "Exoplanet Codex methodology (earlier version)", "2026-05-30", "v1.2", ARCHIVED),
    "exoplanet-codex-method-v2.0.pdf": ("Spectral Analysis Methodology", "Exoplanet Codex methodology (earlier version)", "2026-05-31", "v2.0", ARCHIVED),
    "exoplanet-codex-method-v3.0.pdf": ("Spectral Analysis Methodology", "How we measure what a star is made of, starting with the Sun", "2026-10-24", "v3.0", None),
    "exoplanet-codex-science-architecture-v4.0.pdf": ("Science Architecture", "How the orchestrator takes an element from line list to published abundance", "2026-10-24", "v4.0", None),
    "exoplanet-codex-science-architecture-v3.0.pdf": ("Science Architecture", "How the Codex checks and publishes results (earlier version)", "2026-08-08", "v3.0", ARCHIVED),
    "schmitt-2010-thesis.pdf": ("The Birth of Exoplanets", "Alpha enhancement and the formation of planetary systems · thesis (2010)", "2010", None,
                                "The original thesis, reproduced as written. Its methods and numbers predate the Codex pipeline."),
}


def _strip_cover(reader: PdfReader) -> list:
    pages = list(reader.pages)
    meta = reader.metadata or {}
    return pages[1:] if meta.get(MARK) else pages


def brand_one(path: Path, spec) -> bytes:
    title, subject, date, version, note = spec
    reader = PdfReader(path)
    body = _strip_cover(reader)
    box = body[0].mediabox
    cover = PdfReader(io.BytesIO(brand.cover_page(
        float(box.width), float(box.height), title, subject, date, version=version,
        url=f"https://{brand.SITE}/assets/docs/{path.name}", note=note))).pages[0]
    writer = PdfWriter()
    writer.add_page(cover)
    for page in body:
        writer.add_page(page)
    old = {k: v for k, v in (reader.metadata or {}).items() if k != MARK}
    writer.add_metadata({**old, "/Title": f"{title}{' ' + version if version else ''} · {brand.PUBLISHER}",
                         "/Author": brand.AUTHOR, "/Subject": subject,
                         "/Creator": brand.PUBLISHER, MARK: brand.cover_signature()})
    out = io.BytesIO()
    writer.write(out)
    return out.getvalue()


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()
    missing = sorted(p.name for p in DOCS.glob("*.pdf") if p.name not in DOCUMENTS)
    if missing:
        print("no cover spec for:", ", ".join(missing))
        return 1
    stale = []
    for name, spec in DOCUMENTS.items():
        path = DOCS / name
        meta = PdfReader(path).metadata or {}
        if args.check:
            if meta.get(MARK) != brand.cover_signature():
                stale.append(name)
            continue
        path.write_bytes(brand_one(path, spec))
        print("covered", name)
    if stale:
        print("missing or outdated cover:", ", ".join(stale))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
