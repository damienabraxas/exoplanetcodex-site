# RYA-1327 review evidence

Base: website `64fe15e` (latest fetched main at intake). Branch:
`rya1327-appendix-tables`. Isolated worktree: `codex/rya1327-site`.
Science-context checkout: `f8c723a8`, read only (`codex/rya1327-source`). Other active
worktrees were inspected and left untouched. Scope is presentation only; no merge or
deployment has been performed. The PR contains the final commit and changed-file list.

## Visual comparisons

Each pair includes desktop 1440px, tablet 768px and mobile 390px captures. Measurement
captures show the beginning of each long table/list at full resolution; scroll checks
cover the remaining columns.

| Page | Grades, desktop | Measurements, desktop |
| --- | --- | --- |
| Carbon | [Before](before-c-1440-grades.png) / [After](after-c-1440-grades.png) | [Before](before-c-1440-measurement.png) / [After](after-c-1440-measurement.png) |
| Fe I | [Before](before-fe-1440-grades.png) / [After](after-fe-1440-grades.png) | [Before](before-fe-1440-measurement.png) / [After](after-fe-1440-measurement.png) |
| Silicon, long entries | [Before](before-si-1440-grades.png) / [After](after-si-1440-grades.png) | [Before](before-si-1440-measurement.png) / [After](after-si-1440-measurement.png) |

Tablet/mobile variants use `768`/`390` in the same filenames. For example,
[Carbon mobile grades](after-c-390-grades.png) and
[Silicon tablet measurements](after-si-768-measurement.png).

Causes verified on the baseline: `.product-recipe` / `.table-scroll` had no dedicated
table-cell/scroll styling. Cells compressed, rows ran together, and text competed
with the starfield. Carbon's 390px page measured 568px wide; Silicon measured 523px.
Both now measure 390px. Fe had an expandable grade list and product-value list rather
than these tables; the before screenshots open those lists.

All nine pages pass at all three widths: no page overflow, visible table/header,
minimum cell font >=14px, keyboard focus outline, arrow-key scrolling, long unbroken
provenance wrapping, and 200% desktop zoom-equivalent reflow at a 720px CSS viewport.
Contrast is measured from computed text/background colors with a conservative white
star behind the translucent panel: minimum 8.52:1. Reduced motion is enabled in the
browser test context; the new component contains no animation. No sticky headers.
This is Chrome automation, not a claim of manual screen-reader or cross-browser QA.

## Reproduction and results

Host: macOS, Python 3.12.13 in the existing `codex/venv` appendix environment,
ReportLab 5.0.1. Browser: installed Google Chrome via Playwright 1.60.0 in a disposable
Python 3.9 environment. `python3` initially selected 3.9 and the newly installed
ReportLab required 3.10+; rendering/tests were moved to the existing 3.12 environment.
Network access, local HTTP serving and Chrome launch required sandbox escalation;
retries succeeded. No changes were made to source spectra or frozen reference data.

Commands below run from the site root, with `python` pointing to the stated environment:

```sh
PYTHONDONTWRITEBYTECODE=1 python scripts/refresh_appendix_tables.py
PYTHONDONTWRITEBYTECODE=1 python scripts/rerender_appendix_pdfs.py
PYTHONDONTWRITEBYTECODE=1 python docs/qa/rya1327/audit_sources.py
PYTHONDONTWRITEBYTECODE=1 python -m pytest -q tests/test_appendix_tables.py tests/test_element_appendix_pdf.py --tb=short
PYTHONDONTWRITEBYTECODE=1 python -m pytest -q --tb=no
python -m http.server 8530
python scripts/check_appendix_tables_browser.py --output docs/qa/rya1327/browser-checks.json
python docs/qa/rya1327/capture_screenshots.py after http://127.0.0.1:8530
git diff --check
```

- Refresh, PDF export and source audit: exit 0. [Source integrity](source-integrity.json)
  proves all nine reports retain every scientific field and all eight feeds are
  byte-identical to baseline; CNO-family table cells are unchanged.
- Focused shared-rendering/PDF tests: **9 passed**, exit 0, no skips. Covers exact
  cell preservation, report/page parity, idempotence, Fe species/product identity,
  treatment/IR/caveat preservation, long text/range semantics, all nine PDFs' abundance
  strings and text bounds, and existing deterministic Fe PDF export.
- Browser checks: **27 passed**, exit 0. [Machine evidence](browser-checks.json).
- Full suite: **57 passed, 6 failed**, exit 1; **16 subtests passed**. Clean baseline:
  **52 passed, the identical 6 failures**, exit 1. [Final](final-tests.txt) and
  [baseline](baseline-tests.txt) output are saved. New tests account for the five added
  passes. No tests were weakened or skipped.
- `git diff --check`: exit 0. PDF measurement pages and Carbon/Fe/Silicon screenshots
  were visually inspected. Determinism was checked by rerunning the two refresh commands
  and comparing all tracked output hashes.

The six baseline failures are four obsolete CNO assertions/reference/PDF expectations,
Fe CSV parsing exceeding Python's default field limit, and a roadmap Alpha Centauri
progress assertion. Their names appear in both saved logs. They are not resolved by
this presentation ticket.

## Context, limits and handoff

Read RYA-1327 and comments (none), RYA-851/1215/1216/775 and their chronological
comments; reconciled implementation with current Git. Current README routes the
historical Target Star List / Canonical Element List terminology to
`data/catalog/system_catalog.csv`, `data/audit/element_status_tracker.csv` and
`data/config/elements_master.json`; project/state routing follows `LEDGERS.md`,
`CODEX_STATE_REGISTER.md`, `SEQUENCE.md` and `config/path_register.yaml` in the science
checkout. No scientific state/register changes are warranted by this styling work.

The required refinement-debt read found N: RYA-697 and an unassigned Engine-B atom
gap; Al: RYA-523; Mg: an unassigned 5528/5711 discordance. Other touched element rows
have no known refinement path recorded. These historical tracker entries are context,
not new verdicts, and are outside this issue's presentation scope.

Science-context register freshness: exit 0, with its existing stale-generated-tracker
notice. The standing bibliography library audit: exit 1, **64 unindexed documents**,
12 absent local-file paths; unrelated library reconciliation remains owed. No citations
were added or rewritten. Linear's advertised shared-agent-context tool returned
`Tool get_agent_context not found`; the issue/repository context remained accessible.

Scientific self-review checked products, raw feeds, species split, grades, precision,
ranges versus uncertainty intervals, treatments, telluric qualifications, experiments,
references, forest/highlights and source commits/hashes. No scientific changes or new
data/provenance defects discovered; run-bug-ledger disposition: **none discovered**.
The PDF width regression encountered during development was fixed before handoff.

Review the screenshots and PR. Resume with the focused tests and browser command above
if changes are requested. Ryan retains merge/publication sign-off; the issue remains
In Review until that sign-off.
