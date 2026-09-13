# Generate the Fe publication

Use a clean checkout of science main and a Python environment with pandas,
NumPy and Matplotlib (the science environment already supplies them), plus Node.js
for server rendering of the existing forest component.

```sh
CODEX_KP_ATLAS='/path/to/Kitt Peak Flux Atlas' python /path/to/science/scripts/rya935_live_status.py
python -m pip install -r scripts/requirements-appendix.txt
python scripts/generate_fe_publication.py --science-root /path/to/science
python -m unittest discover -s tests
python -m http.server 8520
```

Review `/systems/sol/elements/fe/` and `/systems/sol/elements/fe-ii/`.
The build intentionally pins the feed and tracker for review. Re-run to take a
new science release; no browser request silently replaces reviewed values.

The full product CSV preserves every feed field, including nested objects as
JSON. The graded-line CSV joins the strict RYA-515 resolver to committed
per-line artifacts; the Amarsi sidecars are resolved through product provenance.
Both count and median must reproduce the published product. No unresolved
product borrows another selector's lines. The coverage CSV lists every product,
including missing and contradictory evidence. EP comes from the line artifact;
gf comes from that artifact where supplied, otherwise an unambiguous canonical
line-list match within wavelength and EP tolerances. This is not an independent
gf adjudication.

The page forest preserves the original band/holding/model hierarchy and CSS,
with solid statistical bars and wireframe systematic bars. Experimental
Frankenstein/Gerber mean-3D rows use reddish orange. Diagnostic
plots use `sigma_reported` for total bars and `sigma_stat` for thick inner bars.
Feed uncertainty caveats are shown with the corresponding products; starred
bars identify incomplete reported uncertainties rather than implying that a
missing microturbulence term was measured to be zero.
Fe I VIS highlights explicitly select the Reference Grade Amarsi 3D-NLTE
Kitt Peak Molecfit and HARPS products. Other band callouts minimize reported
uncertainty among non-held products. Forest rows display the source grade verbatim. They do not average engines or claim a physically preferred model.
Social outreach graphics are no longer generated or published by this path; their
previous versions remain in Git history.

The selected Solar anchor is the HARPS Reference Grade Amarsi 3D-NLTE product,
selected by its full identity from the feed (Ryan, RYA-1215). It is also explicitly
identified as Fe I on the Fe II diagnostic page. Literature comparisons still
come from the tracker reference record; no science tracker reference is rewritten. Diagnostic captions use the curation registry
and molecular-opacity proof; the CH figure plots the actual transition census,
not an invented fit. The saturation census preserves its original EW-unit
convention and also displays the dimensionless conversion.

The manifest identifies the science SHA, feed hash/version, timestamp and
supplemental sources. The timestamp is the tracker build time; rerunning against
the same tracker produces byte-stable output. Space Mono is bundled under its
SIL Open Font License; SVG glyphs are paths for portable sharing.

## Element PDF export (RYA-1215)

The Fe builder emits `solar_fe_i_appendix.report.json` and
`solar_fe_ii_appendix.report.json` under `assets/data/fe-publication/`, then renders
`assets/docs/appendices/solar_fe_i_appendix.pdf` and `solar_fe_ii_appendix.pdf`.
The website and PDF consume the same generated semantic body; the report also
contains the exact species products, selected anchor, citations and source metadata.

`element_appendix_pdf.py` is element- and target-independent. A future appendix
producer calls `make_report(title, target, element, ion, body, metadata, products)`
with its generated semantic body and invokes the same renderer. Its schema is
`codex.element_appendix/1`. The body supports headings, paragraphs, details, lists,
links, diagnostic images and the existing forest component. Unsupported science
models must be adapted by their producer, not guessed by the PDF renderer.

```sh
python scripts/element_appendix_pdf.py \
  --report assets/data/fe-publication/solar_fe_i_appendix.report.json \
  --output /tmp/solar_fe_i_appendix.pdf
```

PDFs use A4 pages, selectable embedded-font text, vector forest marks, repeated
band/holding headers with axis range, visible grade/experimental labels, expanded
caveats and linked references. Figures preserve their dark background. Invariant
PDF metadata and the pinned reporting timestamp make same-input regeneration
byte-stable with the pinned dependencies.

Copy provenance: RYA-1185 and `docs/catalog/model_registry_notes.md` define the
Reference/Codex/Deep names; `rya1178_emit_fe_schema.py` and the current line-pool
selection define their meanings. PROFILEFIT rows are the displayed EW route.
The Reference Grade label does not imply an individually graded lab uncertainty
for every line (RYA-1211/1212). Sources are drawn from `bibliography.csv`, with
additional laboratory citations admitted only when wavelength, ion, excitation
and gf match resolved exported line evidence. Historical dossier values are not
used as current abundance measurements.
