#!/usr/bin/env python3
"""Apply shared table presentation to saved snapshots, without science regeneration."""
from pathlib import Path
import hashlib
import json
import re

from appendix_tables import standardize_tables, TABLE_RENDERER_SHA256
from element_appendix_pdf import render_pdf
from rerender_appendix_pdfs import TARGETS

ROOT = Path(__file__).resolve().parents[1]


def version_stylesheet(page):
    version = hashlib.sha256((ROOT / 'assets/css/fe-publication.css').read_bytes()).hexdigest()[:12]
    return re.sub(r'/assets/css/fe-publication\.css(?:\?[^" ]*)?',
                  '/assets/css/fe-publication.css?v=' + version, page)


def main():
    for report_rel, manifest_rel, pdf_rel in TARGETS:
        path = ROOT / report_rel
        original = path.read_text()
        report = json.loads(original)
        args = (report['products'], report['element'], report['ion'])
        body = standardize_tables(report['body_html'], *args)
        if body != report['body_html'] or report['metadata'].get('table_renderer_sha256') != TABLE_RENDERER_SHA256:
            report['body_html'] = body
            report['metadata']['table_renderer_sha256'] = TABLE_RENDERER_SHA256
            path.write_text(json.dumps(report, indent=2, ensure_ascii=original.isascii(), allow_nan=False) + '\n')
            render_pdf(report, ROOT / pdf_rel, ROOT)
        manifest_path = ROOT / manifest_rel
        original_manifest = manifest_path.read_text()
        manifest = json.loads(original_manifest)
        manifest['table_renderer_sha256'] = TABLE_RENDERER_SHA256
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=original_manifest.isascii(), allow_nan=False) + '\n')
        slug = 'fe-ii' if report['element'] == 'Fe' and report['ion'] == 'II' else report['element'].lower()
        page = ROOT / f'systems/sol/elements/{slug}/index.html'
        markup = version_stylesheet(standardize_tables(page.read_text(), *args))
        page.write_text(markup)


if __name__ == '__main__':
    main()
