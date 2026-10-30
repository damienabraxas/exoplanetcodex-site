"""Shared presentation for appendix tables; never selects or changes products.

Accept existing semantic report markup so saved snapshots can receive presentation
updates without rerunning scientific admission, selection, or abundance calculations.
"""
from html import escape
import hashlib
from pathlib import Path
import re

from bs4 import BeautifulSoup

TABLE_RENDERER_SHA256 = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()


def scientific_table(kind, headers, rows):
    """Render trusted cell markup in a named, keyboard-scrollable table panel."""
    titles = {'grades': 'Line grades', 'measurement': 'Measurement summary',
              'exclusions': 'Excluded lines'}
    title = titles[kind]
    return (f'<div class="appendix-table-panel appendix-table-panel--{kind}">'
            '<p class="appendix-table-hint">Scroll horizontally to read all columns '
            '&middot; focus the table and use the arrow keys</p>'
            f'<div class="appendix-table-scroll" role="region" tabindex="0" '
            f'aria-label="{title}" aria-describedby="{kind}-table-hint">'
            f'<table class="appendix-table appendix-table--{kind}">'
            f'<caption>{title}</caption><thead><tr>'
            + ''.join(f'<th scope="col">{h}</th>' for h in headers)
            + f'</tr></thead><tbody>{rows}</tbody></table></div></div>').replace(
                'class="appendix-table-hint"', f'class="appendix-table-hint" id="{kind}-table-hint"')


def _upgrade_table(match):
    table = BeautifulSoup(match.group(0), 'html.parser').table
    headers = [c.decode_contents() for c in table.thead.find_all('th')]
    kind = 'grades' if headers[0] == 'Grade' else 'measurement' if headers[0] == 'Band' else 'exclusions'
    if kind == 'grades':
        for row in table.tbody.find_all('tr', recursive=False):
            row['data-grade'] = row.th.get_text().split()[0].lower()
    return scientific_table(kind, headers, table.tbody.decode_contents())


def _fe_tables(body, products, ion):
    """Reformat Fe's existing glossary and complete product-value list as tables.

    Keep the species split, experimental labels, original precision, caveats and IDs.
    The report already contains the admitted products and published uncertainties.
    """
    glossary = re.search(r'<details><summary>Grades and model labels</summary><ul>(.*?)</ul>', body, re.S)
    if glossary:
        definitions = BeautifulSoup(glossary[1], 'html.parser')
        rows = ''
        for li in definitions.find_all('li'):
            grade = li.strong.get_text().rstrip('.')
            li.strong.extract()
            own = [p for p in products if p['grade'] == grade]
            pools = sorted({str(p.get('line_set_resolved') or p['selector']) for p in own})
            rows += (f'<tr data-grade="{grade.split()[0].lower()}"><th scope="row">{escape(grade)}</th>'
                     f'<td>{escape(li.get_text().strip())}</td><td>{len(own)} products &mdash; '
                     + escape('; '.join(pools)) + '</td></tr>')
        grades = scientific_table('grades', ['Grade', 'What it means', 'This element'], rows)
        body = body.replace(glossary[0], '<details><summary>Model labels</summary>')
        marker = '<section class="product-section"><h2>Error-bar forest</h2>'
        body = body.replace(marker, '<section class="fe-section"><h2>Line grades</h2>' + grades + '</section>' + marker)
    values = re.search(r'<details><summary>Read all product values, including alternate line sets and experiments</summary><ul>.*?</ul></details>', body, re.S)
    if values:
        # Reuse each list row's identity; all scientific fields come from its product.
        items = BeautifulSoup(values[0], 'html.parser').find_all('li', recursive=True)
        by_id = {p['publication_id']: p for p in products}
        rows = ''
        for item in items:
            pid = item['data-product-id']
            p = by_id[pid]
            sigma = p.get('sigma_asplund')
            if sigma is None:
                sigma = p['sigma_reported']
            instrument = item.get_text().split(' · ', 1)[0]
            provenance = escape(instrument) + '<small>' + escape(str(p['holding'])) + '</small>'
            if p.get('telluric_state'):
                provenance += '<small>' + escape(str(p['telluric_state'])) + '</small>'
            notes = escape(str(p.get('dominant_term') or 'budget not attached'))
            notes += '<small>ξ ' + escape(str(p['xi_state'])) + '</small>'
            if p.get('sigma_reported_caveat'):
                notes += '<small>' + escape(p['sigma_reported_caveat']) + '</small>'
            if p.get('adoption') == 'EXPERIMENTAL-NOT-ADOPTED':
                notes += '<small>experimental, not adopted</small>'
            rows += (f'<tr data-product-id="{escape(pid)}" data-grade="{p["grade"].split()[0].lower()}">'
                     f'<th scope="row">{escape(p["band"])}</th><td>Fe {escape(ion)} · '
                     f'{escape(str(p.get("line_set_resolved") or p["selector"]))}</td>'
                     f'<td>{provenance}</td><td>{escape(p["display"])} · '
                     f'{escape(p["route"])} · {escape(p["treatment"])} · {escape(p["grade"])}</td>'
                     f'<td class="num">{p["n_lines"]}</td><td class="num">{p["A"]:.3f} ± {sigma:.3f}</td>'
                     f'<td>{notes}</td></tr>')
        measurement = scientific_table('measurement', ['Band', 'What was measured', 'Solar spectra',
            'Treatments', 'Lines', 'Result A(Fe)', 'Uncertainty and product notes'], rows)
        body = body.replace(values[0], '<section class="fe-section"><h2>How this was measured</h2>'
                            '<p class="product-section-intro">Each row is one independent product. '
                            'The result includes its published uncertainty (dex, Asplund 2021 convention).</p>'
                            + measurement + '</section>')
    return body


def standardize_tables(body, products=(), element='', ion=''):
    """Idempotently style every report table, preserving existing cell contents."""
    if element == 'Fe':
        body = _fe_tables(body, products, ion)
    return re.sub(r'<div class="table-scroll"><table class="product-recipe">.*?</table></div>',
                  _upgrade_table, body, flags=re.S)
