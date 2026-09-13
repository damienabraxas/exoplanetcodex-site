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

## Reference reconciliation (September 13 expansion)

Each report now has a `References / Data & Model Sources` block and a
`references.json` download. `scripts/cno_references.py` resolves the main
bibliography by key, then the CNO intake bibliography, atomic source manifest,
molecular delivery manifest, grid manifests and diagnostic sidecars. Each
reference records its applicability, evidence artifact and record identifier;
every current/quarantined feed entry has a product-to-source binding. The
manifest hashes every consulted science artifact and the resolver/supplement.

Current applicable sets contain **9 C, 11 N and 12 O references**. They distinguish
AGSS21/molecular comparison analyses, actual atomic-data authority families,
registered model lineage, molecular line data/delivery and special diagnostics.
The complete bibliography, role notes and product index are in both the semantic
report and PDF. Longer notes/index remain expandable on the website. PDFs are
now five pages for C, four for N and four for O.

The dossier audit (RYA-719/720/721, with 359/369/393, 741, 1136/1142/1160/1172)
identified older skeleton references and measurements. Those values are not used.
The resolver follows committed evidence instead:

- C: CH/Masseron and C2/Brooke line-data sources are separated from the
  Amarsi molecular analysis and the Turbospectrum redistribution. AGSS21's Li
  atomic-gf lineage is distinct from the current NIST/MCHF campaign pedigree.
- N: CN/Brooke/Sneden line data, Amarsi's atomic solar analysis, the GALAH/PySME
  1D departure grid and its versioned deposit have separate references. The
  generic `Bergemann` display label conflicts with the registered N Amarsi grid
  lineage; the label is preserved, and the source note explains the difference.
  NIST's Tachiev N I source is not independent confirmation.
- O: Wiese–Fuhr–Deters/Opacity Project pedigree and NIST/Tachiev decision records
  accompany the registered Amarsi grid/model sources. The [O I] diagnostic
  sidecar names Johansson's Ni blend data, Storey–Zeippen's gf lineage and
  Caffau 2015's comparison anchor. That sidecar anchor is explicitly **not** a
  corrected abundance in the current 1D-LTE feed.

`cno-reference-supplement.json` resolves three names missing from the main
bibliography: WFD1996, Sneden2014 CN and Caffau2015 [O I]. Each is tied to a
required marker in a committed provenance artifact and a checked primary-source
metadata URL (NIST, an author's institutional repository, or the authors'
arXiv paper). No DOI is invented for records whose metadata was not confirmed.
Other references are read directly from existing science bibliography/provenance.

Scope exclusions are deliberate: the older dossiers merely queue Melendez,
Caffau and Bergemann author families, so unrelated papers with those surnames
are not added. No Caffau2011 comparison is shown, no Bergemann oxygen model is
used by these entries, and Fe-only Melendez/Bergemann papers are excluded.
Amarsi2021 supports the concise NH/OH/CO context; no nonexistent NH/OH/CO feed
product is manufactured to justify an extra line-list reference. When such a
product appears, the resolver follows its actual delivery manifest and refuses
unknown molecular selector/model mappings for visible products.

Two source inconsistencies remain explicit: the older CH delivery manifest uses
a conflicting MNRAS locator for Masseron2014, while the primary intake identifies
A&A 571 A47; and a registered/sidecar model source is not proof that a particular
feed value has received that treatment. Broader reference completeness must be
reconciled again when new product/treatment families are admitted.
