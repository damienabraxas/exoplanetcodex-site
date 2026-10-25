"""The Exoplanet Codex header for every downloadable document (RYA-1271).

Ryan, 2026-10-24: every appendix download, and every other document the site offers,
carries a proper header -- it says this is an Exoplanet Codex download, shows the
Codex icon, and gives the document details, the date and the author.

Two entry points share one look:

  draw_page_header(canvas, ...)   a band at the top of every page of a generated PDF
                                  (the element appendices call it from their page hook)
  cover_page(...)                 a branded first page, prepended to a static PDF whose
                                  own pages we cannot re-typeset (scripts/brand_static_docs.py)

Dates are passed in, never read from the clock, so a regenerated document is
byte-identical to the last one when nothing else changed.
"""
from __future__ import annotations

import io
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas as rl_canvas

ROOT = Path(__file__).resolve().parents[1]
ICON = ROOT / "apple-touch-icon.png"
AUTHOR = "Ryan Schmitt"
SITE = "exoplanetcodex.org"
PUBLISHER = "The Exoplanet Codex"

INK = colors.HexColor("#0d2238")
MUTED = colors.HexColor("#526575")
ACCENT = colors.HexColor("#1673a2")
WARM = colors.HexColor("#be6a20")
RULE = colors.HexColor("#d5dce1")

#: Height the page header occupies; a document's top margin must clear it.
HEADER_HEIGHT = 46


def _font(c, bold=False):
    # The appendix registers DejaVu as 'Appendix'; fall back to Helvetica elsewhere.
    from reportlab.pdfbase import pdfmetrics
    reg = pdfmetrics.getRegisteredFontNames()
    if bold and "AppendixBold" in reg:
        return "AppendixBold"
    if not bold and "Appendix" in reg:
        return "Appendix"
    return "Helvetica-Bold" if bold else "Helvetica"


def draw_page_header(c, page_width, page_height, title, date, page_number=None):
    """Icon, publisher, document title and date across the top of one page."""
    top = page_height - 24
    size = 22
    c.saveState()
    c.drawImage(ImageReader(str(ICON)), 40, top - size, size, size, mask="auto")
    c.setFillColor(INK)
    c.setFont(_font(c, bold=True), 8.5)
    c.drawString(40 + size + 8, top - 9, PUBLISHER.upper())
    c.setFillColor(MUTED)
    c.setFont(_font(c), 7)
    c.drawString(40 + size + 8, top - 19, f"Downloaded document · {SITE}")
    right = page_width - 40
    c.setFillColor(INK)
    c.setFont(_font(c), 7.5)
    c.drawRightString(right, top - 9, title)
    c.setFillColor(MUTED)
    c.setFont(_font(c), 7)
    tail = f"{AUTHOR} · {date}" + (f" · page {page_number}" if page_number else "")
    c.drawRightString(right, top - 19, tail)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(40, top - size - 6, page_width - 40, top - size - 6)
    c.restoreState()


def details_rows(document, subject, date, version=None, source=None, url=None):
    """The 'document details' table rows, shared by the appendix first page and covers."""
    rows = [("Document", document), ("Subject", subject), ("Author", AUTHOR),
            ("Date", date), ("Publisher", f"{PUBLISHER} · {SITE}")]
    if version:
        rows.append(("Version", version))
    if source:
        rows.append(("Source", source))
    if url:
        rows.append(("Web", url))
    return rows


def cover_page(width, height, document, subject, date, version=None, source=None,
               url=None, note=None) -> bytes:
    """A single branded first page (PDF bytes) for a static document."""
    buf = io.BytesIO()
    c = rl_canvas.Canvas(buf, pagesize=(width, height), invariant=1)
    c.setTitle(document)
    c.setAuthor(AUTHOR)
    # page header, same as every generated page
    draw_page_header(c, width, height, document, date)
    # body
    y = height - 190
    c.drawImage(ImageReader(str(ICON)), 60, y, 84, 84, mask="auto")
    c.setFillColor(WARM)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(160, y + 66, "AN EXOPLANET CODEX DOWNLOAD")
    c.setFillColor(INK)
    size = 24 if len(document) < 40 else 19
    c.setFont("Helvetica", size)
    c.drawString(160, y + 36, document)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    c.drawString(160, y + 14, subject)
    y -= 50
    c.setStrokeColor(RULE)
    c.line(60, y, width - 60, y)
    y -= 26
    for label, value in details_rows(document, subject, date, version, source, url):
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(60, y, label.upper())
        c.setFillColor(INK)
        c.setFont("Helvetica", 10)
        c.drawString(160, y, value)
        y -= 20
    if note:
        y -= 10
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Oblique", 9)
        for line in _wrap(note, 92):
            c.drawString(60, y, line)
            y -= 13
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(60, 40, f"© {date[:4]} {AUTHOR} · {PUBLISHER} · Open science · {SITE}")
    c.showPage()
    c.save()
    return buf.getvalue()


def _wrap(text, width):
    words, line, out = text.split(), "", []
    for w in words:
        if len(line) + len(w) + 1 > width:
            out.append(line)
            line = w
        else:
            line = (line + " " + w).strip()
    if line:
        out.append(line)
    return out


def cover_signature() -> str:
    """Identifies the cover design, so a stale cover is detected after this file changes."""
    import hashlib
    return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()[:16]
