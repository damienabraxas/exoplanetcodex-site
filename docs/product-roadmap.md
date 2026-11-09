# Product roadmap maintenance (RYA-1370)

`/roadmap.html` owns the five-track public development snapshot. `/roadmap/`
continues to redirect there. Product fragments are `#stellar-survey`, `#bride`,
`#atomic-laboratory`, `#abundance-gui` and `#cross-engine`. The retained element
release view is `#stellar-releases`; its `release-roadmap` DOM ID is unchanged.

## Sources and authority

- `assets/data/product-roadmap.v1.json`: reviewed editorial milestones and generated
  catalog membership. `science_base` pins the inspected science main commit; each
  canonical source carries its file SHA256 and immutable GitHub URL.
- `assets/data/release-roadmap.v1.json`: existing product-store release snapshot,
  retained byte-for-byte. Its foundation completion describes an established software
  platform, not independent engine/science certification. Do not interpret it as an
  overall completion percentage. Its generator belongs to the science repository.
- `assets/data/roadmap-credits.v1.json`: software and source credits with evidence,
  exact pin where known, authors, citation, license/reuse notes and access date.
- `assets/data/schemas/`: JSON Schema 2020-12 contracts. No runtime Linear calls,
  credentials, external text interpolation or private API dependency.

Named external GitHub artifacts “Project Register”, “Target Star List” and
“Canonical Element List” could not be positively identified by the earlier merged
RYA-1353 audit or this session's Linear searches. The available committed authorities
are `CODEX_STATE_REGISTER.md`, `data/catalog/system_catalog.csv`, `config/stars.yaml`
and `data/config/elements_master.json`. This website records those exact pointers;
it does not claim that differently named external artifacts were inspected.

## Updating

1. Fetch science and website main. Read current ledgers, science standards, applicable
   decision records and related Linear discussion. Record both base SHAs.
2. Inspect the actual artifact and Git merge ancestry. Label unmerged PR evidence
   `review`; Linear scope is `scope`, never scientific validation. Update only claims
   justified by the evidence. Scientific sign-off is separate from engineering review.
3. Review and change `science_base` and source URLs together when refreshing the pin.
   Refresh generated membership, never hand-copy stars or elements into JS/HTML:

   ```sh
   python3 scripts/sync_roadmap_catalogs.py --science-root /path/to/science-checkout
   python3 scripts/sync_roadmap_catalogs.py --science-root /path/to/science-checkout --check
   ```

4. Edit milestone summaries, statuses, dates, evidence, next gate and relevant issue
   references in the canonical snapshot. Dependencies are empty unless reviewed;
   planned ordering in prose is not a new dependency assertion. Keep IDs stable.
5. Audit software invocation and manifests before naming a dependency as used.
   Check upstream pinned README/license and citation records. Preserve unresolved
   values as pending; never infer a license from a related package or laboratory
   origin from a reference-grade label. Keep exposed comparisons nonblind.
6. Regenerate the Sources extension after the science repository's bibliography
   generator. The bibliography entries remain untouched. The extension is bounded
   by `ROADMAP SOFTWARE START/END`, and is reproducible from the credits JSON:

   ```sh
   python3 scripts/render_roadmap_credits.py
   python3 scripts/render_roadmap_credits.py --check
   ```

   The science generator does not yet call this extension: rerunning it requires
   this post-step. CI rejects a missing/stale extension rather than silently losing
   attribution. No upstream code or raw atomic databases are redistributed here.

## Progress methodology

There is no weighted completion calculation and no project-wide percentage. No
GUI “5%” estimate is claimed. Implementation stage and validation disposition are
separate fields. Scientific HOLD means owed validation, not failed software.
`independently_validated` and `released` are reserved for explicit linked sign-off
or release evidence; no new track has either designation in this snapshot.

The retained survey release metric counts canonical element/ion targets with current
publishable product-store entries. Archive, quarantine, missing and superseded
products do not advance it. The release snapshot is independently versioned and may
lag the science store; its count is not a live whole-star certification. New weights
would require a documented, versioned, reviewed scheme and verified criteria first.

## Verification

```sh
python -m pip install jsonschema playwright
playwright install chromium
python -m unittest discover -s tests -p '*roadmap*.py'
python scripts/render_roadmap_credits.py --check
python -m http.server 8520 --bind 127.0.0.1
# in a second terminal:
python tests/browser_product_roadmap.py
curl -fsSL https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js -o /tmp/axe.js
python tests/browser_roadmap_accessibility.py /tmp/axe.js
```

Browser checks exercise real rendering, keyboard disclosure, history/deep links,
320/390/1440 px layouts, reduced motion, empty/invalid/503 data, injection safety,
local links and Sources search/anchors. Accessibility checks use axe WCAG A/AA.
The GitHub workflow runs these checks; configured CI is not evidence it ran.
External link reachability is checked at evidence review, not treated as a stable
scientific assertion from an HTTP status alone. Inspect immutable GitHub path/commit
existence, source titles and licenses; record rate limits separately from dead links.
