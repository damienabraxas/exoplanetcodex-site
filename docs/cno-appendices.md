# Solar CNO appendices (RYA-1216)

Generate the pages and PDFs together, using the environment described by
`scripts/requirements-appendix.txt`:

```sh
python scripts/generate_cno_publication.py --science-root /path/to/science-checkout
node scripts/generate-sitemap.mjs
python -m unittest discover -s tests -p 'test_cno_publication.py' -v
```

`--elements N` rebuilds nitrogen independently. An input failure is reported for
that element; other requested elements still build. The command exits nonzero
if any element fails. All scientific inputs must be committed and clean.

The initial snapshot is science PR #544, commit
`a1ec12a9cc09472037e2af3b1242db2ce5b37c6b`. It is an **unmerged campaign snapshot**,
not a claim that these products are live/adopted. Its feeds contain:

| Element | Version | products | quarantine | archive |
| --- | --- | --- | --- | --- |
| C | 1.17 | 0 | 17 | 0 |
| N | 1.10 | 0 | 10 | 0 |
| O | 1.7 | 0 | 7 | 0 |

All three appendices therefore display the existing `NOT_YET_DEFENSIBLE` code,
no adopted abundance, and an empty forest with an explicit explanation. The
promising C/O results described in the campaign PR do not override feed
membership. Numeric quarantined outputs are retained only in labelled source
JSON downloads; the rendered audit documents their identities and source reasons.

## Admission and completeness

The adapter consumes `products`, `quarantine`, `archive`, and `superseded`.
Only current admitted products can receive a forest mark. Failed, unconstrained,
nonfinite, unknown-disposition, or incompletely identified products have explicit
omission reasons. Telluric correction must be `applied` in the holdings registry,
including for every IR product. Holding names are never used as proof.

Each source entry has exactly one visibility record. Every accepted product has
one forest row; there is no tier filtering, engine ranking, indicator averaging,
or alternate-line-set collapse. Actual bands and holdings define the groups,
so new molecular labels and instruments cannot disappear through a Fe-only list.
The Fe CSS classes and generic PDF vector-forest renderer are reused.

The upstream Fe `plot_grid` has no CNO sections in this snapshot. Quarantined
CNO rows also lack the admitted products' grade/completed-error-budget fields.
The adapter does not invent these fields or promote `NIST-C+` to a website grade.
The upstream `STAT_BASIS_MISMATCH` and `NOT_YET_DEFENSIBLE` codes remain visible.
Oxygen's gf disagreement and open Tachiev decision are read from the committed
adjudication JSON and indicator-check CSV, not copied from ticket values.

## Highlight selection

`scripts/cno-highlight-selectors.json` contains explicit scientific identity
selectors. It is intentionally empty for all three elements because none has
an admitted product. A selector may use element, ion, band, instrument, holding,
tier, selector, route, treatment, line_set and indicator fields. It may not use
abundance or uncertainty. Each configured selector must resolve to exactly one
visible, non-experimental product or the build fails loudly. No smallest-error
or literature-agreement fallback exists. When the upstream campaign admits
products, the forest automatically includes them on regeneration; highlights
require a reviewed identity selection.

## Shared outputs

- Pages: `/systems/sol/elements/{c,n,o}/`
- PDFs: `/assets/docs/appendices/solar_{c,n,o}_appendix.pdf`
- Per-element reporting artifacts: `/assets/data/cno-publication/{C,N,O}/`
  (`report.json`, `visibility.json`, `manifest.json`, and the source feed).

The same semantic HTML body drives the page and PDF. Manifests record input
checksums, feed versions/timestamps, science SHA and generator hashes. The
source commit timestamp supplies a deterministic generation timestamp. PDF
regeneration from the identical report is byte-stable. Rebuild against a newly
reviewed science commit when its feed dispositions change; these are static
snapshots, so the website and downloadable report change together.

No merge or deployment is part of this ticket; Ryan reviews the pages first.
