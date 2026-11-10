# RYA-1377 review and release evidence

Website base: `a4862c6ca5de18164b226df1251ec2a665427eda` (Roadmap #87 merged).
Science main: `10f0dc955803253570a944ca37012654e80ead9f` (atlas #618 merged).
Atlas source-evidence base remains the canonical recorded `d1728c92` snapshot.
Branches/worktrees: `rya1377-frontier` in `codex/rya1377-site`;
`rya1377-evidence` in `codex/rya1377-source` (read-only).

## Scope and claims review

The website implementation is distinct from the data-foundation ticket. Dedicated
route, responsive interactive matrix, source/detail/gap views, scientific method and
contribution sections, shared navigation/footer, Roadmap link, sitemap and generated
Sources attribution are implemented. Homepage keeps its compact release cards; no
atlas or Roadmap dashboard is embedded in it.

The scientific atlas and schema are copied byte-for-byte from merged science main.
Hash and schema checks prove identity. No source record, adopted abundance, grade,
model applicability or numerical scientific result is authored or changed here.
All current records remain independently unreviewed/unvalidated in the canonical data.
The public display says so even though the foundation issue is Done.

Quantitative filters are explicitly envelope filters, not physical-domain certification.
Unknown C/O/chemistry, geometry, input completeness, empirical/gf/theoretical grades,
release versions and reuse rights remain unknown/pending. O/Fe demonstrate actual
source records, including Fe II atom incompatibility and the distinct 3D LTE table4.
Molecular/cool-star discovery entries are not sold as validated M-dwarf models.
Gliese 581 identity/path is derived from the canonical target catalog. No source
membership is inferred from author identity or a recommendation; pending RYA-1376
membership audit remains visible. Many-to-many presentation is tested with a synthetic
fixture only, never published as real membership evidence.

## Preflight and limits

Read RYA-1377 and its comments (none), RYA-1370/1373 deliverables and discussion,
RYA-1376 scope/comments (none), canonical schema/data and relevant source/method docs.
Repository intake/brief/scientific-review/applicability procedures and canonical
ledgers govern the task. Named external register/list artifacts were not newly
identified; committed canonical owners are used explicitly, as in prior audit work.
Existing element refinement debt is not cleared by a website change.

The mandatory reference-library audit was attempted against the registered library.
It still exits 1 before enumeration for the existing invalid bibliography states:
`civis2013: vizier` and `mallinson2024: free text`. No complete library audit is
claimed. Existing bibliography entries are preserved; atlas citation/credit sections
are generated from canonical metadata. Unresolved source fields are visibly pending.

## Engineering review

Safe DOM text rendering; HTTPS/root-relative source URL allowlist; no private API,
credential or runtime science dependency. Snapshot is under 250 KB uncompressed.
Source text, missing/invalid data and unknown selections do not invent coverage.
Keyboard bug found during QA (search-blur redraw removing focused link) was fixed by
using the input event without a redundant change handler. Scrollable source transitions
have an explicit keyboard focus target. Shared navigation wraps whole labels and
remains visible on mobile; existing shared header markup is preserved with one link.

## Release gate

GitHub Pages is configured as `legacy`, `main`, `/` on the existing custom domain.
Deploying requires merging the website PR. Independent public/scientific claims
review and Ryan-authorized merge/publication remain explicit gates. No production
URL is claimed deployed until verified after release. See the maintenance document
for exact publication verification and refresh procedure.

## Verification results

Local environment: isolated Python 3.9.6, jsonschema 4.25.1, Playwright 1.60.0,
Chromium 148.0.7778.96, axe-core 4.10.3; Node syntax checks.

- `python -m unittest discover -s tests -p 'test_frontier*.py'`: 7 passing.
- `python -m unittest discover -s tests -p '*roadmap*.py'`: 9 passing.
- `sync_frontier_snapshot.py --science-root <merged-science-checkout> --check`: pass.
- Both attribution generators `--check` and navigation sync `--check`: pass.
- Browser regression covers all 30 detail records, desktop/390/320px, shared mobile
  navigation, query/deep links, numeric and isotope/molecular filters, unsupported
  C/O, missing membership evidence, synthetic many-to-many membership rendering,
  reset/keyboard, empty/invalid/503/network errors, text/URL injection and local links.
- axe WCAG A/AA checks at 1440/390/320px have no remaining violations after the
  scrollable transition list became focusable; see accessibility.json.
- `git diff --check` and JS syntax check pass.

The fixture demonstrating many-to-many memberships is used only in browser tests;
canonical bytes remain unchanged. Screenshots include full atlas and O-filtered
matrices/detail views at desktop/mobile widths. Shared mobile navigation needed a
CSS override because existing styles hid it without a toggle on these pages.
The header markup and existing page-specific content remain in place.

Run-bug-ledger disposition: none discovered in the scientific pipeline by this
website task. Engineering issues found during implementation are corrected and
covered by the browser regression. No new scientific result or adoption claim.

The dedicated treatment filter also exposes 1.5D and mean-3D choices when the current
registry has no matching treatment record, returning an explicit empty/audit state.
Ordinary ion searches (for example Fe II) include the composed species label.
All immutable source-path links were checked against the exact pinned science Git
objects (28 local source paths); remote bot/permission failures are not treated as
scientific absence. The existing Roadmap browser regression passes after the shared
navigation change; its generated historical screenshots were restored rather than
committed as unrelated evidence.
