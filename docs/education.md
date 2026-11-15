# Education — working interactive lessons (RYA-1379 rework)

`/education/` complements `/glossary/` definitions and `/method/` scientific practices.
All lessons, GUIs, exercises and downloads are freely accessible without an account,
subscription, analytics script or remote inference API. Google Fonts is optional;
local system fallbacks work. Independent scientific and human accessibility review
remain separate from source checking and passing automated tests.

## Audit of the review correction

The original PR #89 was merged in website main `2a4577b`. The deployed page was
retrieved and hashed in `docs/qa/rya1379-rework/live-before-audit.json`. It had the
hydrogen explorer, but no parameter-driven GUIs for the other modules and explicitly
called the stellar simulator planned. Static explanatory cards did not satisfy the
revised acceptance gate. This rework supplies the controls below; it does not rename
static pictures as experiments.

| Module | Before this rework | Working implementation |
|---|---|---|
| Light | Text and schematic diagram | `#light-photon`, `#dispersion`, `#resolution`, `#doppler` |
| Atomic Physics | Hydrogen only; fixed cyan photon/local line | `#hydrogen-explorer` retained anchor: H + Na, colored photons, positioned visible lines and Na doublet zoom |
| Stellar Spectroscopy | Planned notice | `#stellar-simulator`: Teff, log g, [M/H], ξ and R, weak/saturated profiles and EW |
| Elemental Abundances | Definitions and worked text | `#equivalent-width` integrated-area GUI and `#curve-growth` conditional abundance inversion |
| Exoplanets | Introductory text | `#transit-simulator` and `#rv-simulator`, linked stellar Doppler line and cross-module velocity transfer |
| Atomic Laboratory | Prose and external links | `#atomic-metadata`: H/Na selection, pinned adopted/source-candidate log(gf), known/ungraded/unknown states |
| Learning Resources | Static activity download | `#photon-exercise`: wavelength control, observed frequency/color, answer entry, scoring, worked result and teacher notes |

There are 12 working GUIs: the atomic explorer plus 11 common simulator components.
Each has native keyboard controls, reset, captions, cited assumptions and downloadable
labeled CSV/SVG. Share URLs restore parameter selections. Invalid shared values are
rejected with a visible reset notice. Plots scroll within keyboard-focusable regions
on phones rather than shrinking axis text to unreadable sizes. No-JS and missing-data
views preserve lessons and disclose that simulation is unavailable; no mock output
is substituted.

## Source and component ownership

- `education-lessons.v1.json` owns the structured authored lesson content and links.
- `education-hydrogen.v1.json` owns selected H I levels and exact SI c, h, e.
- `education-sodium.v1.json` owns the separately source-checked Na I level selection
  and a generated snapshot of three canonical Na records. It pins science main
  `45901e7678ab6c8624fe659e552fba3f2681457d`, source paths, hashes and immutable URLs.
  It does not duplicate survey abundances or change source grades.
- `education-models.v1.json` owns physical constants, glass coefficients, instrument
  references, explicit teaching-model parameters and citations. Synthetic opacity
  scales and the pressure proxy are modeling choices, not measured stellar data.
- `scripts/education_widgets.py` owns reusable control/assumption/teacher-note
  definitions. `generate_education.py` generates static shells, the local search
  index and `education-widgets.v1.json`; generated outputs are not hand-edited.
- `education-models.mjs` owns pure, independently tested numerical functions.
  `education-simulators.js` connects them to native forms and safely drawn SVGs.
  `education.js` owns search and the extended atomic transition explorer.
- `education/classroom-activity.txt` is a printable exercise and answer guide.

No lesson imports a production atmosphere or invokes a Codex engine. The pinned canonical
model registry is recorded as project-methodology context; a method (EW or profile
synthesis), population treatment (LTE/NLTE), geometry and engine are separate axes.
The science register and literature govern applicability; an educational GUI cannot
certify a research model or promote ungraded/theoretical data.

## Model contracts and validation

### Light, color and dispersion

Vacuum ν=c/λ and E=hν use exact SI defining constants from NIST. At 500 nm the
independent benchmark is 5.99584916×10¹⁴ Hz and about 2.479684 eV. Screen RGB colors
are original illustrative interpolation, not a CIE colorimetric or human-perception
model; visible limits are approximate and UV/IR markers are explicitly invisible.

The prism uses the SCHOTT N-BK7 datasheet (2023-12-01) Sellmeier B/C coefficients,
with λ in micrometers and C in μm². Minimum deviation is
δ=2 asin[n sin(A/2)]−A. Each wavelength is evaluated at its own minimum-deviation
incidence; the exaggerated fan is not a common-incidence ray trace. The grating uses
normal incidence in vacuum: d sin θ=mλ. Positive/negative/zero orders and forbidden
orders are explicit. Angular dispersion diverges at grazing emergence; it is not
approximated by subtracting an absent order. Tests cover n(587.6 nm)≈1.51680,
θ(500 nm,1000 grooves/mm,m=1)=30°, zero order, sign and absent/grazing orders.

### Instrumental resolution and Doppler shifts

At 550 nm the illustrative Gaussian instrumental FWHM is λ/R. It broadens two
hypothetical narrow Gaussian absorption lines analytically. Detector sampling and
seeded Gaussian noise/SNR are separate controls; neither changes the noise-free
instrument profile. There is no universal distinguishability cutoff.

The [ESO HARPS overview](https://www.eso.org/sci/facilities/lasilla/instruments/harps/overview.html)
gives nominal R=115,000. The [pipeline manual 3.3.12, §4.3 table](https://ftp.eso.org/pub/dfs/pipelines/instruments/harps/harps-pipeline-manual-3.3.12.pdf)
lists measured R=120,000 and 4.1 pixels/FWHM. These differently scoped reference
values are separate named presets, not silently reconciled. The Gaussian lesson
profile is **not** the actual measured HARPS LSF; see
[Zhao et al. 2020](https://arxiv.org/abs/2011.03391). Sampling is not RV precision.

Longitudinal Doppler uses λobs/λrest=√[(1+β)/(1−β)], positive for recession.
The first-order approximation is displayed with its numerical error and its |β|≪1
condition. Three hypothetical reference lines shift together; they are not element
identifications. Tests check independent shifts, inverse signs and approximation error.

### Atomic explorer and source metadata

H reference: NIST Handbook H I levels and persistent lines. Na reference:
[NIST Na I levels](https://physics.nist.gov/PhysRefData/Handbook/Tables/sodiumtable5.htm)
and [persistent lines](https://physics.nist.gov/PhysRefData/Handbook/Tables/sodiumtable3.htm).
The two sodium transitions share 3s J=1/2 and connect to 3p J=3/2 and J=1/2;
they form a fine-structure doublet. Vacuum Ritz estimates are computed as
λ(nm)=10⁷/(Eupper−Elower in cm⁻¹). Approximate vacuum positions are 589.158263 and
589.755754 nm. The Handbook's sodium line wavelengths are **air** values and are
shown separately in the reference JSON, never relabeled as vacuum. No uncertainty
is inferred from rounded level decimals; computed export digits do not imply accuracy.

Emission starts high and ends low with an outgoing photon; absorption reverses this.
Photon color follows wavelength in both modes. The visible-axis line is positioned
at its wavelength; Na also has a labeled doublet zoom. A UV transition draws no
fictional visible spectral line. Marker trajectories, level spacing, timing, intensity
and profile width remain schematic. Stellar absorption still requires transfer,
opacity, source function and populations, not an isolated-atom cartoon.

The metadata viewer compares exact selected canonical_gf strings with retained
GES/VALD candidate columns, with a pinned source URL. Those candidates are historical
pipeline inputs, not fresh independent external queries. Adopted Na D₂/D₁ accuracy
is AA in the canonical source. The additional 4213.001 Å record is ungraded; H gf
values are not supplied in this snapshot. Missing values stay unknown rather than
zero. NIST is evaluated data; experimental/theoretical lineage is explicitly not
classified where this snapshot cannot establish it. Accuracy grade, empirical
suitability and independent validation are different. No Theoretical Lab prediction
is substituted for an accepted measurement.

### Stellar slab, equivalent width and curve of growth

The stellar controls are a **schematic absorbing screen**, not a validated atmosphere
grid. A generic Fe-like atom (56 u, 7.9 eV ionization, 2.5 eV excitation, fixed
partition-function ratio) supplies a teaching opacity. T=Teff and
ne=10¹⁹×10^(log g−4.44)×5772/T m⁻³ is an explicit pressure proxy, not a calibrated
hydrostatic atmosphere. Saha–Boltzmann populations and 10^[M/H] scale lower-state
opacity relative to the documented reference. See Tatum's
[chapter 8](https://www.astro.uvic.ca/~tatum/stellatm/atm8.pdf) and
[chapter 11](https://www.astro.uvic.ca/~tatum/stellatm/atm11.pdf).

For a unit-area Gaussian opacity φ(v), τ=Aφ and transmitted F=exp(−τ).
Doppler b²=2kT/m+ξ² and σ=b/√2. Microturbulence changes opacity before transfer;
instrumental broadening convolves the resulting flux afterwards. Weak lines retain
nearly fixed EW under opacity broadening, whereas saturated lines can grow. Instrument
convolution conserves full-line EW. The plotted reference demonstrates fixed-variable
comparisons; gravity, abundance and temperature remain degenerate. No line emission,
damping, blends, real atmospheric stratification, NLTE or 3D prediction is included.
Slider bounds are the teaching domain, not an interpolation hull or survey validity claim.

The EW GUI independently varies depth, Gaussian σ/Lorentz HWHM, integration window
and assumed continuum. W=∫(1−F/Fc)dλ; 1 Å=1000 mÅ. A hypothetical 5000 Å line has
no adopted abundance. A depth 0.5, σ=0.1 Å full Gaussian has W≈125.3314 mÅ and
FWHM≈0.235482 Å; these are different quantities. Finite windows lose wings and
continuum errors can create a signed area bias.

The curve of growth uses A=5×10^ΔA km/s in the same unit-area Gaussian-opacity
screen, fixed transition/atmosphere proxy. It shows weak linearity and saturation,
not the damping-wing branch. Inversion returns a **synthetic differential abundance**
conditional on b and the fixed model; it is not calibrated A(X). A comparison
inversion with b=2 exposes a different assumed width. Values outside the inversion
domain [-3,+3] dex are reported outside-domain, not clamped into a claimed result.
Numerical tests verify analytic EW, saturation slopes, area conservation, width
sensitivity, model response and inverse consistency.

### Transit, radial velocity and classroom exercise

Transit uses a spherical opaque planet, circular geometry, fixed a/R★=10 and P=3 d,
with b=(a/R★)cos i. A linear limb law I(μ)=1−u(1−μ) is normalized by π(1−u/3).
Uniform disks use exact circle overlap; limb darkening uses 900 radial annuli.
Tests check p² central depth, non-overlap, grazing geometry, an analytic centered
limb-darkened integral and quadrature convergence. This is an original teaching
implementation, not batman; [Kreidberg 2015](https://arxiv.org/abs/1507.08285) supplies
context. No activity, dilution, exposure integration, eccentricity or TTV model.

The circular two-body RV model uses
K=(2πG/P)^(1/3) Mp sin i/(M★+Mp)^(2/3), v★=K sin(2π phase).
The spectral shift belongs to the star's reflex motion, not the planet. The
[NASA Exoplanet Archive equations](https://exoplanetarchive.ipac.caltech.edu/docs/poet_calculations.html)
provide the independent reference; tests recover ~28.4 m/s for 1 Jupiter mass around
1 solar mass at 1 year edge-on, along with inclination and period scaling. Unresolved
inclination gives a mass function; Mp sin i is the familiar small-mass minimum-mass
approximation, not a true-mass determination. Mass conversions use
[IAU 2015 nominal GM values](https://arxiv.org/abs/1605.09788) divided by CODATA G;
these conversion masses are not exact physical masses. Orbit radii and spectral
line widths in the visual are exaggerated/illustrative. No eccentricity or activity
controls are advertised as supported. The current velocity transfers to the Light GUI
at millimeter-per-second slider precision.

The resource exercise changes wavelength, shows frequency/color, accepts an eV answer
and explains the SI conversion after checking. Its 1% answer tolerance is a classroom
scoring choice, not a physical uncertainty. Teacher prompts and printable answers
link back to the other simulations, Glossary and Methodology.

## Review, evidence and updates

Source/engineering checks: Codex, 2026-11-14. Independent scientific reviewer:
**pending**. Human accessibility/screen-reader reviewer: **pending**. Do not infer
sign-off from test success or source-check dates. No IR abundance/telluric validation
is asserted. The issue stays open pending review; Ryan controls merge/publication.

Evidence and audit: `docs/qa/rya1379-rework/`, including expected-versus-observed
parameter responses, per-GUI desktop/mobile screenshots, walkthrough video,
accessibility results, numerical tests and source/input hashes. Original Phase 1
review records remain historical under `docs/qa/rya1379/`.

To update:

1. Fetch both mains, read current scientific authorities and the actual sources.
   Change canonical JSON/control definitions, never generated HTML/index files.
2. Refresh selected canonical Na metadata without altering science data:

   ```sh
   python3 scripts/sync_education_atomic_metadata.py --science-root /path/to/science
   python3 scripts/sync_education_atomic_metadata.py --science-root /path/to/science --check
   ```

   Changed identities or grades require renewed scientific review. NIST energy-level
   values are a separately reviewed reference and are not overwritten by this helper.
3. Regenerate and check:

   ```sh
   python3 scripts/generate_education.py
   python3 scripts/generate_education.py --check
   python3 scripts/sync_education_navigation.py --check
   node --test tests/test_education_core.mjs tests/test_education_models.mjs
   python3 -m unittest discover -s tests -p test_education.py
   python3 -m http.server 8523 --bind 127.0.0.1
   # Separate terminal with Playwright/Chromium and axe-core:
   python tests/browser_education.py http://127.0.0.1:8523 /path/to/axe.js
   python tests/browser_education_interactives.py http://127.0.0.1:8523 /path/to/axe.js
   ```

4. Preserve reciprocal glossary anchors if the glossary generator is rerun. Review
   numerical/physical applicability and human accessibility; attach renewed evidence.
   The Education CI runs both numerical suites and both browser journeys.

Future additions remain distinct: validated stellar-atmosphere grids, Planck continuum,
explicit multi-line blends, rotation/macroturbulence, observed-spectrum fitting and
advanced 3D NLTE/validated theoretical-prediction lessons. Current GUIs are functional
without claiming those capabilities.

All diagrams, prose and UI code are original project work. Linked literature and
reference data retain their source terms. Proposed CC BY 4.0 for original educational
material still needs owner approval; no new rights grant is made. Free access and
downloads are implemented regardless of that separate licensing decision.
