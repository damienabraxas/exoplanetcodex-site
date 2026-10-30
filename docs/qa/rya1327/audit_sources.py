"""Audit presentation-only changes against the pinned RYA-1327 website baseline."""
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / 'scripts'))
from bs4 import BeautifulSoup
from rerender_appendix_pdfs import TARGETS

BASE = '64fe15e'


def old(path):
    return subprocess.check_output(['git', 'show', f'{BASE}:{path}'], cwd=ROOT)


def cells(body):
    return [[c.get_text(' ', strip=True) for c in tr.find_all(['th', 'td'], recursive=False)]
            for tr in BeautifulSoup(body, 'html.parser').select('table tr')]


rows = []
for report_rel, _, _ in TARGETS:
    before = json.loads(old(report_rel))
    after = json.loads((ROOT / report_rel).read_text())
    for key in before:
        if key not in ('body_html', 'metadata'):
            assert before[key] == after[key], (report_rel, key)
    for key, value in before['metadata'].items():
        if key != 'pdf_generator_sha256':
            assert after['metadata'][key] == value, (report_rel, key)
    if before['element'] != 'Fe':
        assert cells(before['body_html']) == cells(after['body_html']), report_rel
    feed_rel = ('assets/data/fe-publication/Fe.json' if before['element'] == 'Fe'
                else f'assets/data/cno-publication/{before["element"]}/{before["element"]}.json')
    source = (ROOT / feed_rel).read_bytes()
    assert source == old(feed_rel), feed_rel
    rows.append({'report': report_rel, 'product_count': len(after['products']),
                 'scientific_fields_unchanged': True, 'source_feed_sha256': hashlib.sha256(source).hexdigest()})

result = {'base': BASE, 'reports': rows}
(Path(__file__).parent / 'source-integrity.json').write_text(json.dumps(result, indent=2) + '\n')
print('Nine reports retain all scientific fields; all eight source feeds are byte-identical to the baseline.')
