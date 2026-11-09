# RYA-1370 evidence and review

Website base: `09526e8` (`exoplanetcodex-site` main).
Science base: `078cf7dedfa961452c8bd9af43c4bf83c5463fdf` (`exoplanetcodex` main).
Worktrees: `codex/rya1370-site` (branch `rya1370`) and
`codex/rya1370-source` (branch `rya1370-evidence`, read-only science inspection).

## Engineering and public claims are separate

Engineering implementation is prepared for review. Scientific/public-claims sign-off
is **pending Ryan's review**; no merge, deployment, scientific result adoption or
validation gate is advanced. All new research tracks are HOLD or not assessed.

Read the issue and related 1278/1280/1281/1282/1351/1354/1355/1356/1367/1368/621
issues and discussion. Merged 1352/1353 reports support governance/census only.
BRIDE PR #598 is open/draft, head `319819b30b85795ea1e1e08cd9b99037e22530f9`;
atomic PR #616 is open/draft, observed head `143b6d63f0ddf1a37512e2199cfe91ba63241759`.
The atomic attribution receipt is intentionally pinned to inspected ancestor
`b04ed3d71fb8220d9858cea008adefd7332136cd`; later research does not silently alter
that snapshot. Their review-branch artifacts do not establish merged scientific
validation. Numerical sensitivity/convergence does not close physical validation.

Theoretical predictions, exposed nonblind comparisons and prospective withheld
validation are separately described. No scientific numbers, solar abundances,
new grades, production runs, milestone weights, ETA or overall percentage are added.
The existing stellar release JSON is retained byte-for-byte; canonical generated
membership includes all 19 system-catalog rows and all canonical element targets.

## Preflight limitations

- The bibliography audit command was attempted with the registered local library:
  `python3 scripts/generate_sources_page.py --audit-library <refs.library>`.
  It fails before library enumeration on existing bibliography verified-state errors:
  `civis2013: 'vizier'` and `mallinson2024: free-text verified state`.
  No passing library audit or complete regenerated bibliography is claimed. The
  Sources extension adds software credits without rewriting bibliography entries.
- No positively identified external artifacts with the exact titles Project Register,
  Target Star List or Canonical Element List. Available committed authority paths and
  this gap are recorded in the maintenance document and merged RYA-1353 dossier.
- Tracker refinement debt exists (including 548/470/475/683/697); this website task
  does not clear it or use old tracker rows as current scientific certification.
- Shared Sources generator requires the documented attribution post-step; CI guards
  missing/stale credits. Run-specific survey/BRIDE upstream citation fields and ATSP
  book reuse terms remain explicitly pending.

## Self-review

Reviewed source identity, immutable evidence links, merged/review/scope distinctions,
separate implementation/validation states, unchanged science values and legacy
release payload, generated star/element membership, safe DOM text and URL rendering,
missing-data behavior, responsive layouts, keyboard behavior and reduced motion.
No scientific run-bug-ledger row is warranted: no pipeline bug or data/provenance
mutation discovered by this website change. Existing stale website test assertion
(expected 2 solar products, JSON has 10) is replaced with count/ID consistency.

Before/after screenshots in this directory come from the exact website base HTML
and current HTML via a local static server. The browser test uses intercepted base
HTML for reproducibility; no production site is changed. Browser execution requires
escaping the macOS sandbox's Chromium Mach-port restriction.

## Final validation

Host: macOS arm64; isolated Python 3.9.6, Playwright 1.60.0 / Chromium
148.0.7778.96, jsonschema 4.25.1; Node syntax checks.

- `python -m unittest discover -s tests -p '*roadmap*.py'`: exit 0, 8 tests.
- `python scripts/render_roadmap_credits.py --check`: exit 0.
- `python scripts/sync_roadmap_catalogs.py --science-root <pinned-science-checkout> --check`: exit 0.
- `node --check assets/js/product-roadmap.js`: exit 0.
- `python tests/browser_product_roadmap.py`: exit 0; see browser-tests.txt.
- `python tests/browser_roadmap_accessibility.py <axe-core-4.10.3.js>`: exit 0;
  zero WCAG A/AA violations at 1440 and 390 px, see accessibility.json.
- All immutable science GitHub blob URLs verified with `git cat-file -e <sha>:<path>`.
- `git diff --check`: exit 0.

During QA, reduced-motion animation removal initially kept the shared nav/hero
transparent; scoped visibility rules fix it. Shared footer link contrast is raised
on the roadmap without changing its markup or other pages. Browser harness history
assertions now wait for actual visibility, route fixtures accept both callback
arguments, and entry points are guarded against unittest import side effects.
No unresolved new engineering test failures.
