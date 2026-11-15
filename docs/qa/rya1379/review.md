# RYA-1379 Phase 1 — implementation and review evidence

Website base: `da7a249bcacf1c953550ff9be4b472871b07f2c5` (main, PR #88 merged).
Science base: `45901e7678ab6c8624fe659e552fba3f2681457d` (main, PR #621 merged).
Branch/worktree: `rya1379-education`, `/Users/ryanschmitt/codex/rya1379-site`.
Read-only science worktree: `/Users/ryanschmitt/codex/rya1379-source`.
Implementation head is the PR head containing this record (not a self-referential SHA).

## Delivered and still owed

Phase 1 is ready for review: a dedicated Education route, seven responsive illustrated
module tiles, prominent local search, complete beginner journey, three reading levels,
objectives/examples/misconceptions/source checks per lesson, original diagrams, glossary
backlinks, methodology links, hydrogen explorer and classroom exercise/answer guide.
Existing shared navigation/footer gains Education across 44 pages. Glossary definitions,
Methodology practices, roadmap data and survey results are preserved.

Hydrogen supports three selected NIST fine-structure transitions, emission/absorption,
finite electron/photon animation, numerical readouts, linked illustrative line,
reduced motion, native keyboard controls, descriptive status, reference reset, share
configuration, labeled CSV and self-contained SVG downloads. Complete authored lessons
and a generated numerical reference remain available without JS or when JSON fails.

**Not the entire umbrella delivery:** the quantitative Stellar Spectroscopy Simulator,
EW/curve-of-growth/abundance and follow-on GUIs, advanced Atomic Lab integrations,
provenance/grade comparisons and advanced 3D NLTE teaching remain Phase 2/3 work.
They are visibly planned, never presented as functioning controls. See
[architecture, update procedure and full content roadmap](../../education.md).
No quantitative stellar response is invented in lieu of a validated grid.

## Preflight and authority

Fetched both GitHub mains, opened isolated worktrees, checked clean science state and
recorded bases above. Inspected RYA-1379 (no initial comments), RYA-1370 description and
handoff comments, and the related RYA-1365 oxygen curriculum (no comments; Backlog).
RYA-1370 is verified merged by Git ancestry, not only its Done state. No other worker's
checkout or outputs were changed.

Read applicable repository bootstrap/LEDGERS routing, state/catalog pointers,
DEV_CYCLE, science standards/product/conventions, data safety and task intake,
implementation brief and scientific-review procedures. Inspected existing Glossary,
Methodology, Architecture, Roadmap, Frontier, Sources, data/JS patterns, CI and tests.
Canonical owners used for project state and membership:
`CODEX_STATE_REGISTER.md`, `SEQUENCE.md`, `data/catalog/system_catalog.csv`,
`config/stars.yaml`, `data/config/elements_master.json`; Atomic Lab claims route
through current roadmap/Frontier evidence and `docs/SCIENCE_STANDARDS.md`.
No new star/element list or scientific completion count is duplicated here.

Named external artifacts “Project Register”, “Target Star List”, “Canonical Element
List” were not positively identified by local/Linear discovery. As in merged RYA-1370,
committed canonical pointers above are used explicitly; no claim of inspecting separate
unlocated artifacts is made. Relevant target/element membership was inspected in the
existing generated roadmap snapshot and its canonical pointers.

Refinement report: existing Solar Beta debt remains (10 owed with tickets not fired,
5 with no filed ticket, per `pipeline.refinement_debt_join --report`). This website
work does not resolve or promote any element. Register freshness in the read-only
science checkout passed: zero state surfaces changed; no register bump required.

Bibliography audit command:
`python3 scripts/generate_sources_page.py --audit-library '/Users/ryanschmitt/Documents/Exoplanet Codex/Reference documents'`
exited 1 before enumeration for pre-existing invalid verified states `civis2013: vizier`
and `mallinson2024: free text`. This is the same limit recorded by RYA-1370/1377;
no complete library audit is claimed and bibliography rows are untouched.
NIST level/line/SI sources and lesson references are recorded in `docs/education.md`.
The two DOI publisher pages blocked automated full-text access (robots/403).

## Verification commands and results

Local host: macOS arm64; Python 3.9.6 in isolated `/tmp/rya1379-browser`,
Playwright 1.60.0, Chromium 148.0.7778.96, axe-core 4.10.3; Node v22-compatible
standard test runner. Browser launch needed native sandbox escalation; dependencies
were installed in an isolated temporary environment. No science compute was run.

- `node --test tests/test_education_core.mjs`: 8 passed; independent wavelength
  reference checks, frequency/energy units, mode reversal, malformed input,
  state defaults, aliases/typos/content types, URL safety and CSV provenance.
- `python3 -m unittest discover -s tests -p test_education.py`: 5 passed; reproducible
  generated outputs, local links/search destinations, required lesson fields,
  reciprocal glossary links, navigation integration and progressive enhancement.
- `python3 scripts/generate_education.py --check`: pass.
- `python3 scripts/sync_education_navigation.py --check`: pass.
- `node --check assets/js/education.js`: pass.
- `python3 -m http.server 8523 --bind 127.0.0.1` then
  `/tmp/rya1379-browser/bin/python tests/browser_education.py http://127.0.0.1:8523 /tmp/rya1379-axe.js`:
  pass at 1440/768/390/320px; tile deep links, search aliases/one-edit typo,
  highlights/no-results/injection input, keyboard operation, correct physical final
  states, real animation/cancellation, reduced motion, share/reload/reset,
  real CSV/SVG downloads, roadmap deep link, reciprocal glossary link, no-JS and
  503/invalid/empty-data fallback. Zero page errors, zero horizontal overflow.
  Axe WCAG 2 A/AA + 2.1 AA: zero violations at all four widths. See JSON/screenshots.
- `/tmp/rya1379-browser/bin/python -m unittest discover -s tests -p '*roadmap*.py'`:
  9 passed. `-p 'test_frontier*.py'`: 7 passed.
- `/tmp/rya1379-browser/bin/python tests/browser_product_roadmap.py http://127.0.0.1:8523`:
  pass desktop/mobile/320px, keyboard/history/deep links, error data, injection,
  Sources search and links. Prior-ticket screenshots rewritten by this regression
  were restored; only RYA-1379 evidence is committed.
- `sync_frontier_navigation.py --check`, `render_frontier_attribution.py --check`,
  `render_roadmap_credits.py --check`: pass.
- `node scripts/generate-sitemap.mjs`: 46 canonical page URLs, includes Education.
- `git diff --check`: pass.

Initial browser QA identified inherited low-contrast footer links; fixed with a
page-local footer override and rechecked. An initial fixed-pixel tile-position
assertion was replaced by structural top-navigation placement; all responsive
widths are checked for overflow. Static link checking recognizes the existing
canonical roadmap's JS-rendered product IDs, verified by browser navigation.
These resolved implementation issues are not scientific pipeline defects.

Before screenshots serve the pinned main homepage HTML with current unchanged
shared assets; after screenshots show the Education navigation addition. Education
is a new route, so its landing and explorer screenshots are the after-state.

## Self-review and human gates

Checked scientific identity, energy direction, SI conversion, vacuum/air distinction,
individual component versus blended feature, rounded-level precision, source references,
no derived uncertainty claim, and schematic intensity/geometry limits. Original
diagrams/text are separate from survey measurements, research predictions and grades.
No IR abundance or telluric validation is claimed. Abundance examples are hypothetical.

Checked text-only search rendering, URL allowlist, finite/cancellable animation,
reduced-motion state, no-JS/error fallback, stable anchors, reciprocal links and
existing roadmap regression. Search index is local (~88 KB uncompressed); no
analytics script or account gate is added to Education.

Scientific reviewer: pending. Human accessibility/screen-reader reviewer: pending.
Passing automated checks are not scientific sign-off. Proposed CC BY 4.0 reuse license
is pending owner approval; no new licensing grant is asserted. Public release requires
Ryan's review/authorization and merge; existing GitHub Pages deploys from main.
No merge or deployment performed. The umbrella issue must remain open for Phase 2/3.

Run-bug-ledger disposition: **none discovered** in scientific pipeline/data provenance;
no fake ledger row added for routine new-page QA. Source science tree remains clean.

Resume: review the PR's scientific content and human accessibility journey; record
reviewer names/scope/sign-off, address findings, then decide Phase 1 merge/publication.
Continue Phase 2 with a scoped scientific simulator model/grid decision; do not claim
a validated stellar GUI from the isolated hydrogen educational example.
