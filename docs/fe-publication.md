# Generate the Fe publication

Use a clean checkout of science main and a Python environment with pandas,
NumPy and Matplotlib (the science environment already supplies them).

```sh
CODEX_KP_ATLAS='/path/to/Kitt Peak Flux Atlas' python /path/to/science/scripts/rya935_live_status.py
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

Plots use `sigma_reported` for total bars and `sigma_stat` for thick inner bars.
Feed uncertainty caveats are shown with the corresponding products; starred
bars identify incomplete reported uncertainties rather than implying that a
missing microturbulence term was measured to be zero.
Best-constrained band callouts minimize reported uncertainty among non-held
products. They do not average engines or claim a physically preferred model.
The five social identities are explicit selectors; their numbers are never
constants. Ambiguous or absent social identities stop the build.

The retained anchor and Asplund comparison come from the tracker's reference
record. These are supplemental reference inputs because Fe.json has no headline
or literature-reference object. Diagnostic captions use the curation registry
and molecular-opacity proof; the CH figure plots the actual transition census,
not an invented fit. The saturation census preserves its original EW-unit
convention and also displays the dimensionless conversion.

The manifest identifies the science SHA, feed hash/version, timestamp and
supplemental sources. The timestamp is the tracker build time; rerunning against
the same tracker produces byte-stable output. Space Mono is bundled under its
SIL Open Font License; SVG glyphs are paths for portable sharing.
