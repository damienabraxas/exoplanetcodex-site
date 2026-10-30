# Scientific appendix tables (RYA-1327)

All nine published Solar appendices use the same grade, measurement and exclusion
table panels: C, N, O, Si, Al, Mg, Na, Fe I and Fe II. The shared presentation lives
in `scripts/appendix_tables.py` and `assets/css/fe-publication.css`. Both publication
generators call `standardize_tables` before emitting their common website/PDF report,
so subsequent elements inherit the component automatically.

The renderer preserves the existing CNO-family table cells, including full grade
definitions, product counts, treatment names, line counts, three-decimal abundance
ranges and uncertainty terms. It does not change a range into a plus/minus interval.
For Fe it exposes the existing grade glossary and complete product-value list as
tables. Every Fe product retains its species, ID, band, line pool, holding, treatment,
line count, abundance, published uncertainty, microturbulence state, caveats and
experimental status. IR telluric qualifications are visible alongside the holding.
Fe remains one row per product; CNO-family summaries retain their existing grouping.
No new admission, selection, aggregation, abundance calculation or science run occurs.

## Component and tokens

`scientific_table(kind, headers, rows)` accepts trusted semantic cell markup. The
three kinds are `grades`, `measurement` and `exclusions`. Each supplies a caption,
column-header scopes, a named region, a visible scrolling instruction, and a keyboard
tab stop with a visible focus outline. Row headers retain `scope="row"`. Grade text
and an inset accent distinguish Reference, Codex and Deep; meaning does not depend
on color. Numeric cells use right alignment and tabular figures.

The `--appendix-*` tokens own panel/header backgrounds, border, ink, secondary text,
cyan accent, three grade colors and cell padding. The translucent navy panel gives
text a stable background over the starfield; borders and alternating rows establish
column and row boundaries. Original corner accents use CSS only. The table adds no
motion or game assets. Forced-color focus/borders remain available.

Appendix pages use a wider shared content area so all seven columns fit at the tested
1440px desktop width. Tables have useful minimum widths (42rem grades, 72rem
measurements, 38rem exclusions), then scroll locally on narrower viewports without
shrinking the type. Provenance wraps within its own column. No sticky-header behavior
or concealed desktop data is required.

The PDF exporter prints seven-column measurement rows as labelled two-column records
to keep the same values/provenance readable on A4. Grade/exclusion tables retain their
tabular layout. Browser-only scroll instructions are omitted. Fe I's complete record
export is longer (61 pages); this is the cost of exposing every product and its IR
qualifications at readable width. No products were combined or removed to shorten it.

## Refreshing presentation without scientific regeneration

Use the existing appendix Python environment and dependencies in
`scripts/requirements-appendix.txt`:

```sh
PYTHONDONTWRITEBYTECODE=1 python scripts/refresh_appendix_tables.py
PYTHONDONTWRITEBYTECODE=1 python scripts/rerender_appendix_pdfs.py
```

The first command updates saved report bodies, pages, CSS cache versions, PDFs and
`table_renderer_sha256` metadata. The second records the current PDF renderer hash
and redraws the PDFs. Both are deterministic on unchanged inputs. They read saved
products, preserving each original science commit/feed hash rather than promoting
newer science or rerunning admission. Do not regenerate a scientific feed for a CSS
change. The full publication generators continue to own new publication snapshots.

If generator markup changes, update the semantic adapter and its preservation tests
together. Retain the shared report as the website/PDF input. Do not add per-element
CSS, hand-entered scientific values, hidden precision changes, or fixed product counts.

## Validation and evidence

See [the evidence index](qa/rya1327/README.md) for screenshot comparisons, exact
commands/results, source-integrity audit, browser checks and baseline test exceptions.
