# RYA-1379 — review correction and complete GUI coverage

Website base: `2a4577b` (PR #89 merged); full SHA in `input-manifest.json`.
Science main: `45901e7678ab6c8624fe659e552fba3f2681457d`.
Branch: `rya1379-interactive-rework` in `/Users/ryanschmitt/codex/rya1379-site`.
Science worktree `/Users/ryanschmitt/codex/rya1379-source` is read-only and clean.
This evidence's implementation SHA is the PR head containing it.

## Review request and audit

Read the current RYA-1379 description, including the full implementation correction
and revised acceptance gate, plus all chronological issue comments. The correction
was added to the issue description; no new separate comment was omitted. Fetched
both repositories. The first implementation is merged in current website main.
The user requested every major module have a real parameter-driven GUI, not just
static cards or a promise of future work. The site previously did not meet that gate.

The live `/education/` response was retrieved successfully and hashed in
`live-before-audit.json`: hydrogen explorer present, zero new general parameter-driven
widgets and a planned-stellar notice. A web-reader attempt could not load the URL;
HTTPS curl supplied the actual response. Before screenshots reproduce pinned merged
main HTML, JS/core and CSS, not the revised page disguised as a baseline.

The [module audit in the architecture document](../../education.md) maps every missing
requirement to its now-working GUI. All seven modules have controls and immediate
model/visualization updates; there are 12 GUIs (11 common widget shells plus the
atomic explorer). Current model limits and independently unreviewed status remain
visible. Validated atmosphere grids, advanced 3D NLTE, explicit blends and independent
Atomic Laboratory predictions are not advertised as implemented.

## What changed

- Light: draggable wavelength/color selector with Hz/THz and eV/J; side-by-side
  minimum-deviation prism versus grating orders and angular dispersion; HARPS
  reference resolution, sampling and SNR controls; signed relativistic/linear Doppler.
- Atoms: H/Na selection, NIST sodium fine-structure doublet, wavelength-colored
  emission/absorption photons, positioned visible line and doublet zoom. Selected UV
  does not acquire a fictional visible spectral line. Medium and precision are explicit.
- Stars: five requested controls (Teff, log g, [M/H], ξ, R) change a documented
  single-temperature LTE absorbing-screen model. Microturbulence broadens normalized
  opacity before transfer; instrumental convolution is separate. Weak/saturated
  EW response and reference/parameter degeneracies are explained and tested.
- Abundances: adjustable Gaussian/Lorentz profile, depth, width, continuum and
  integration window with shaded signed EW in mÅ; conditional synthetic
  curve-of-growth/inversion with saturation, width effects and an explicit domain.
- Planets: transit size/geometry/limb darkening and circular RV mass/inclination/
  period/stellar mass controls, phase scrubbing, stellar reflex/Doppler linkage.
- Atomic Lab: selected canonical Na source metadata, log(gf), grades and retained
  candidate comparison; ungraded and unavailable H gf stay distinct from zero.
- Resources: an interactive prediction/check exercise with worked conversion,
  explanation, scoring tolerance and teacher notes; updated printable guide.

All common experiments support reset, reference configuration, share/reload,
labeled source/assumption-bearing CSV and self-contained SVG exports. Native controls
and keyboard-focusable scrollable plots work on phones. Preserved Glossary,
Methodology and shared site navigation; only Education implementation/content changes.

## Scientific provenance and applicability review

The numerical contracts and citations are recorded in `docs/education.md` and
`education-models.v1.json`. The primary NIST H/Na level/line tables, NIST CODATA,
SCHOTT N-BK7 datasheet, ESO overview/manual, HARPS profile paper, Tatum chapters 8/11,
IAU nominal constants and NASA exoplanet observable equations were inspected.
No wavelength, adopted gf, grade, line uncertainty or experimental/theoretical
classification was fabricated. Atomic metadata is copied from exact selected
canonical rows with pinned hashes/URLs, and the refresh helper verifies identity.

ESO's overview R=115000 is nominal; its pipeline manual 3.3.12 table gives measured
R=120000 and 4.1 px/FWHM. Both scopes appear as separate presets. The lesson's Gaussian
LSF is explicitly not a measured HARPS profile. Sampling, SNR, resolution and radial
velocity precision are separate concepts.

The stellar demo is a schematic Saha–Boltzmann absorbing slab with an explicit ne/
gravity proxy and generic Fe-like transition, not a production atmosphere grid.
No line emission, damping, blends, NLTE or 3D model is silently substituted. Its EW
and differential abundance outputs belong only to the stated teaching model. The
transit and RV demos are circular, idealized teaching calculations; unsupported
physics is stated rather than represented by nonfunctional controls.

NIST is an evaluated source, not automatically experimental. Atomic source accuracy,
line suitability and independent validation are not conflated. Current theoretical
research candidates are not promoted. No IR abundance/telluric validation or survey
measurement is asserted. No scientific data/source file or frozen reference changed.

## Local validation

Commands (exit 0 unless explicitly noted):

- `node --test tests/test_education_core.mjs tests/test_education_models.mjs`: 20 pass.
  Independent SI photon benchmarks; Doppler sign/reciprocity/error; SCHOTT index,
  grating orders/grazing boundary; R/sampling/noise independence; NIST Na components
  and air/vacuum separation; analytic Gaussian EW/FWHM/continuum/window behavior;
  weak/saturated opacity response and instrument area conservation; all five stellar
  parameters; saturation/inversion/domain handling; exact and limb-darkened transit
  limits/quadrature convergence; RV Jupiter/solar benchmark and inclination/period.
- `python3 -m unittest discover -s tests -p test_education.py`: 6 pass. Generated
  output consistency, links, reciprocal glossary, all-seven-module control coverage,
  control bounds, exact known/ungraded snapshot semantics and pinned source identity.
- `python3 scripts/generate_education.py --check`: pass.
- `python3 scripts/sync_education_atomic_metadata.py --science-root /Users/ryanschmitt/codex/rya1379-source --check`: pass.
- `python3 scripts/sync_education_navigation.py --check`: pass.
- `python3 -m http.server 8523 --bind 127.0.0.1`; browser environment:
  `/tmp/rya1379-browser/bin/python`, Playwright 1.60.0, Chromium, axe-core 4.10.3.
  Native Chromium and the preview server required sandbox escalation.
- `python tests/browser_education.py http://127.0.0.1:8523 /tmp/rya1379-axe.js`:
  existing journey/search/keyboard/animation/reduced-motion/share/reset/download/
  no-JS and invalid/empty/failed-data checks pass, including 768px tablet regression.
- `python tests/browser_education_interactives.py http://127.0.0.1:8523 /tmp/rya1379-axe.js`:
  all seven modules/12 GUIs; 30 changed-range responses recorded expected/observed;
  real select/check/preset interactions, grating edge cases, Na colors/states/exports,
  UV absence, EW analytic result, transit/no-transit, face-on RV and cross-module
  Doppler, known/ungraded/unknown metadata, answer scoring, every-widget CSV/SVG,
  share/reload and invalid shared parameter handling. Desktop/390px/320px screenshots,
  keyboard controls, contained plot scrolling and zero body overflow. Axe WCAG 2 A/AA
  and 2.1 AA: zero violations at each width. Walkthrough WebM included.
- Roadmap integrity 9 pass; Frontier integrity 7 pass. Shared Frontier navigation
  and Roadmap/Frontier attribution generation checks pass.
- `git diff --check`: pass. Science `check_register_freshness.py --since-main` passes:
  zero state surfaces changed, no register bump required.

The before-page screenshot fixture uses a separate browser context; download checks
are paced by 1.1 s to avoid Chromium burst throttling. Neither issue changes or
skips an export assertion. Every CSV/SVG export passed in the final paced run.

The Education CI is extended to run both numeric suites and both real-browser suites
and upload both evidence directories. Hosted results are recorded separately in the
PR/Linear handoff; a workflow definition or local pass is not a hosted-run claim.

## Remaining gates and preflight limits

Scientific reviewer: pending. Human screen-reader/accessibility reviewer: pending.
Automated checks and the schematic model labels do not supply human scientific
sign-off. Ryan controls merge/publication. The ticket is reopened for the revised
acceptance gate; no Done/completion or deployed-rework claim is made before review.
CC BY 4.0 for original educational material remains a proposed owner decision.

Existing external “Project Register / Target Star List / Canonical Element List”
artifacts remain unlocated; current committed state/catalog/star/element owners are
used, as documented by the original implementation. Bibliography audit again exits 1
before library enumeration for pre-existing invalid `civis2013`/`mallinson2024` verified
states. No successful complete library audit is claimed. Solar Beta refinement debt
is unchanged, and this website task does not resolve or grade elements.

Run-bug-ledger disposition: none discovered in the scientific pipeline/data provenance.
New UI implementation defects (initial color/plot labels, sub-km/s slider snapping,
grazing-order derivative, export dataset label and missing-source plot index) were
caught/fixed during local development; no measurement/production results existed.

Resume: review this PR's equations, source/medium/grade semantics, teaching-domain
limits, accessible keyboard/screen-reader journey and classroom exercises. Record
reviewer names, scope and sign-off, address findings, then decide merge/publication.
The new public content is not deployed by this branch alone.
