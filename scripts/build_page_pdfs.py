#!/usr/bin/env python3
"""Build the downloadable PDF of the current Method, Architecture and Glossary pages (RYA-1271).

Ryan, 2026-10-24: the new methodology must be downloadable, not only the archived one.
Each page is printed from the site itself with headless Chrome (the pages carry their own
print styles), then every page gets the Exoplanet Codex document header and the document
gets the branded cover, both from scripts/codex_doc_brand.py -- the same look as every
other download. The date is the date of the last commit to the page's source.

    python3 scripts/build_page_pdfs.py            # rebuild every PDF
    python3 scripts/build_page_pdfs.py glossary   # rebuild only the pages named
    CHROME=/path/to/chrome python3 scripts/build_page_pdfs.py

Re-run it whenever one of the pages in PAGES changes.
"""
from __future__ import annotations

import io
import os
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas as rl_canvas

sys.path.insert(0, str(Path(__file__).resolve().parent))
import codex_doc_brand as brand  # noqa: E402
import brand_static_docs as covers  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")

#: page source -> published PDF (its cover spec lives in brand_static_docs.DOCUMENTS)
PAGES = {
    "method/index.html": "exoplanet-codex-method-v3.0.pdf",
    "architecture/index.html": "exoplanet-codex-science-architecture-v4.0.pdf",
    "glossary/index.html": "exoplanet-codex-glossary-v4.0.pdf",
}


def _free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def _print(url: str, out: Path) -> None:
    with tempfile.TemporaryDirectory() as profile:
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", f"--user-data-dir={profile}",
                        "--no-pdf-header-footer", "--virtual-time-budget=4000",
                        f"--print-to-pdf={out}", url],
                       check=True, capture_output=True, timeout=120)


def _with_headers(raw: Path, title: str, date: str) -> PdfReader:
    reader = PdfReader(raw)
    writer = PdfWriter()
    for n, page in enumerate(reader.pages, start=1):
        w, h = float(page.mediabox.width), float(page.mediabox.height)
        buf = io.BytesIO()
        c = rl_canvas.Canvas(buf, pagesize=(w, h), invariant=1)
        brand.draw_page_header(c, w, h, title, date, n + 1)  # the cover is page 1
        c.showPage()
        c.save()
        page.merge_page(PdfReader(io.BytesIO(buf.getvalue())).pages[0])
        writer.add_page(page)
    out = io.BytesIO()
    writer.write(out)
    return out


def main(argv: list[str]) -> int:
    pages = {s: n for s, n in PAGES.items() if not argv or Path(s).parent.name in argv}
    if not pages:
        print("no such page; choose from:", ", ".join(Path(s).parent.name for s in PAGES))
        return 1
    port = _free_port()
    server = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
                              cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(1)
        for src, name in pages.items():
            spec = covers.DOCUMENTS[name]
            title, date = spec[0], spec[2]
            with tempfile.TemporaryDirectory() as tmp:
                raw = Path(tmp) / "raw.pdf"
                _print(f"http://127.0.0.1:{port}/{Path(src).parent}/", raw)
                dest = covers.DOCS / name
                dest.write_bytes(_with_headers(raw, title, date).getvalue())
                dest.write_bytes(covers.brand_one(dest, spec))
            print(f"built assets/docs/{name} ({len(PdfReader(dest).pages)} pages)")
    finally:
        server.terminate()
        server.wait()
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
