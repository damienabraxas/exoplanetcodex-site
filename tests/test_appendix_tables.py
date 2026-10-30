"""Shared appendix presentation, saved-report parity and scientific-content guards."""
import copy
import json
from pathlib import Path
import sys

from bs4 import BeautifulSoup
import pymupdf

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from appendix_tables import standardize_tables
from generate_cno_publication import grades_section, recipe
from rerender_appendix_pdfs import TARGETS


def cells(markup):
    soup = BeautifulSoup(markup, 'html.parser')
    return [[cell.get_text(' ', strip=True) for cell in row.find_all(['th', 'td'], recursive=False)]
            for row in soup.select('table tr')]


def test_shared_renderer_preserves_every_cell_and_product():
    for element in ('C', 'N', 'O', 'Si', 'Al', 'Mg', 'Na'):
        report = json.loads((ROOT / f'assets/data/cno-publication/{element}/report.json').read_text())
        products = report['products']
        original = copy.deepcopy(products)
        body = grades_section(element, products) + recipe(element, products)
        actual = standardize_tables(body)
        assert cells(actual) == cells(body)
        assert products == original
        assert standardize_tables(actual) == actual


def test_all_published_appendices_share_accessible_tables_and_report_content():
    for report_rel, _, _ in TARGETS:
        report = json.loads((ROOT / report_rel).read_text())
        slug = 'fe-ii' if report['element'] == 'Fe' and report['ion'] == 'II' else report['element'].lower()
        page = BeautifulSoup((ROOT / f'systems/sol/elements/{slug}/index.html').read_text(), 'html.parser')
        model = BeautifulSoup(report['body_html'], 'html.parser')
        assert cells(str(page)) == cells(str(model)), slug
        assert not page.select('.product-recipe'), slug
        assert page.select_one('.appendix-table--grades'), slug
        assert page.select_one('.appendix-table--measurement'), slug
        for table in page.select('.appendix-table'):
            region = table.parent
            assert region['role'] == 'region'
            assert region['tabindex'] == '0'
            assert region['aria-label'] == table.caption.get_text()
            assert page.find(id=region['aria-describedby'])
            assert all(h.get('scope') == 'col' for h in table.select('thead th'))
        assert standardize_tables(report['body_html'], report['products'], report['element'], report['ion']) == report['body_html']


def test_fe_rows_preserve_species_product_identity_values_and_caveats():
    for ion in ('i', 'ii'):
        report = json.loads((ROOT / f'assets/data/fe-publication/solar_fe_{ion}_appendix.report.json').read_text())
        soup = BeautifulSoup(report['body_html'], 'html.parser')
        rows = soup.select('.appendix-table--measurement tbody tr')
        by_id = {r['data-product-id']: r for r in rows}
        assert len(rows) == len(report['products'])
        for product in report['products']:
            row = by_id[product['publication_id']]
            text = row.get_text(' ', strip=True)
            assert product['ion'].lower() == ion
            assert f'Fe {product["ion"]}' in text
            assert product['holding'] in text
            assert product['treatment'] in text
            assert str(product['n_lines']) == row.select('td')[3].get_text()
            sigma = product.get('sigma_asplund', product['sigma_reported'])
            assert f'{product["A"]:.3f} ± {sigma:.3f}' in text
            for key in ('sigma_reported_caveat', 'telluric_state'):
                if product.get(key):
                    assert product[key] in text
            if product.get('adoption') == 'EXPERIMENTAL-NOT-ADOPTED':
                assert 'experimental, not adopted' in text


def test_unusual_long_text_and_range_keep_their_meaning():
    source = ('<div class="table-scroll"><table class="product-recipe"><thead><tr>'
              '<th>Band</th><th>Result A(X)</th></tr></thead><tbody><tr>'
              '<th scope="row">near-UV</th><td>8.301–8.509 <small>(3D-NLTE)</small> '
              + 'provenance_' * 200 + '</td></tr></tbody></table></div>')
    assert cells(standardize_tables(source)) == cells(source)
    assert '±' not in standardize_tables(source)


def test_all_pdfs_keep_measurement_values_and_printable_boundaries():
    for report_rel, _, pdf_rel in TARGETS:
        report = json.loads((ROOT / report_rel).read_text())
        doc = pymupdf.open(ROOT / pdf_rel)
        text = ' '.join(' '.join(page.get_text() for page in doc).split())
        for product in report['products']:
            assert f'{product["A"]:.3f}' in text, (pdf_rel, product['publication_id'])
        for page in doc:
            for x0, y0, x1, y1, *_ in page.get_text('words'):
                assert 30 <= x0 < x1 <= page.rect.width - 25, (pdf_rel, page.number, x0, x1)
                assert 20 <= y0 < y1 <= page.rect.height - 15, (pdf_rel, page.number, y0, y1)
