# Education & Learning Center (RYA-1379)

`/education/` is the third pillar alongside definitions (`/glossary/`) and project
practices (`/method/`). It is freely accessible without an account, payment or
subscription. No analytics script or runtime external service is required. Shared
fonts may load from Google Fonts; system fallbacks remain usable offline.

## Content and component ownership

- `assets/data/education-lessons.v1.json`: original educational text, objectives,
  three reading levels, diagrams, examples, misconceptions, reciprocal glossary
  destinations, methodology destinations, references and source-check dates.
- `assets/data/education-hydrogen.v1.json`: canonical **educational** reference
  input, separate from survey products and reference abundance datasets. Five
  selected NIST H I levels, three allowed fine-structure transitions and exact SI
  constants. It supplies all displayed/reference-download numbers.
- `scripts/generate_education.py`: static lesson/figure/explorer renderer and local
  retrieval-index generator. Content remains available without JS. The generated
  HTML and `education-search.v1.json` are committed; never edit them by hand.
  The index derives definitions and methodology concepts from their current pages.
- `assets/js/education-core.mjs`: pure conversions, validated transition state,
  aliases, bounded one-edit retrieval and labeled CSV serialization. Search returns
  destinations, never generated answers. At most 20 results, AND semantics for
  multiple words; one-edit tolerance applies to words of at least five characters.
- `assets/js/education.js`: progressive enhancement, safe text-node highlights,
  native forms, finite animations, reduced-motion behavior, URL state and downloads.
- `assets/css/education.css`: original code-drawn diagrams and responsive Codex
  panels; no protected game assets. Native controls retain keyboard semantics.
- `education/classroom-activity.txt`: printable exercise and answer guide.
- `scripts/sync_education_navigation.py`: idempotent navigation/footer integration.
  Existing Glossary definitions and Methodology practices are preserved.

Each new lesson uses the same structured contract and renderer. Add a named diagram
with a caption that states its assumptions; do not use a decorative graph to imply
numerical predictions. Index new GUIs with a distinct `Interactive` content type.

## Reference calculation and interpretation

Sources inspected 2026-11-14:

- [NIST H I levels](https://physics.nist.gov/PhysRefData/Handbook/Tables/hydrogentable5.htm)
  (MK00a / Martin & Wiese compilation): 1s J=1/2, 2p J=3/2, 2s J=1/2,
  3p J=3/2 and 4p J=3/2, in cm⁻¹ relative to the ground state.
- [NIST persistent H I lines](https://physics.nist.gov/PhysRefData/Handbook/Tables/hydrogentable3.htm)
  confirms component identities and the Lyman α vacuum reference. Balmer entries
  in that table are **air** wavelengths; they are not copied as vacuum values.
- [NIST CODATA/SI constants](https://physics.nist.gov/cuu/Constants/Table/allascii.txt):
  c, h and elementary charge are exact SI defining constants.
- OpenStax *Astronomy 2e* §§5.1, 5.5, 17.3; NASA Science exoplanet discovery
  methods; VALD3 (Ryabchikova et al. 2015), solar composition (Asplund, Amarsi &
  Grevesse 2021), and NIST ASD contents, linked per lesson. DOI publisher pages
  denied automated retrieval (robots/403); citation identities also exist in the
  canonical project bibliography. No new claim of full-paper inspection is made.

For each selected component, Δσ = Eupper − Elower (cm⁻¹),
λvac(nm) = 10⁷/Δσ, ν = c/(λvac × 10⁻⁹), Eγ(J) = hν and Eγ(eV) = hν/e.
No independent line uncertainty is inferred from rounded levels. The display uses
0.01 nm and 0.001 eV; downloadable computed digits are not a precision assertion.
The line is an individual fine-structure component, not a blended Balmer centroid.
Selections obey the electric-dipole rules stated on the page.

Emission starts high and finishes low, with an outgoing photon. Absorption reverses
states and photon direction. Switching selection cancels an in-flight animation;
Play once replays from the initial state. Reduced motion skips interpolation and
announces the final state. Share links preserve transition and mode. The atom selector
intentionally offers only H I; other species need their own cited reference records.

Level spacing, photon path, electron marker, timing, profile amplitude and width are
schematic. The spectrum has no physical intensity or EW scale. It does not model
stellar populations or radiative transfer. Stellar absorption needs atmosphere,
opacity, source function and populations; neither a single-atom cartoon nor an NLTE
label establishes a validated abundance. No IR abundance/telluric validation is claimed.

## Review and release

Source checking and engineering QA: Codex, 2026-11-14, evidence in
`docs/qa/rya1379/`. Independent scientific reviewer: **pending**. Human accessibility
reviewer (including screen-reader usability): **pending**. Automated axe results
are engineering evidence, not a substitute for either review. Lesson source-check
dates are explicitly distinct from an independent review date.

Before publication, reviewers must check transition identity/units/medium,
absorption/emission direction, physical caveats, accessible descriptions, keyboard
and screen-reader journey and classroom answer key. Record names, date, scope,
findings and sign-off in the PR, then update the review metadata. Ryan controls merge
and publication. Do not mark the umbrella issue Done on delivery of Phase 1.

## Phases and remaining work

Phase 1 implemented for review: information architecture, seven introductory modules,
search, bidirectional glossary links, beginner journey, hydrogen explorer and teacher
activity. Introductory host-star and Atomic Lab explanations do not constitute the
advanced integrations promised in later phases.

Phase 2 remains owed: Stellar Spectroscopy Simulator with Teff, log g, [M/H],
microturbulence and instrumental resolution (optional rotation/macroturbulence);
physical line profiles, EW and interactive abundance workflow. Follow-on GUIs:
Planck continuum, curve of growth, blending, thermal/turbulent broadening,
abundance versus EW, Doppler shift, transit and RV. Every GUI needs reference
presets/reset, URL state, labeled exports, exercises and an assumptions panel.
Quantitative outputs require independently validated grids/models, boundaries,
interpolation and out-of-domain handling. A schematic alternative must explicitly
state its equations and limits; arbitrary parameter-to-line mappings are unsuitable.
Explain weak/saturated microturbulence response, distinguish atmospheric/abundance/
instrumental controls, and include fixed-variable/degeneracy comparisons.

Phase 3 remains owed: canonical Atomic Lab provenance/grade explorer, literature
line-list comparisons and advanced 3D NLTE lessons. Coordinate the RYA-1370 roadmap,
RYA-1365 oxygen curriculum and actual scientific validation states. Keep evaluated,
experimental and theoretical sources distinct; educational sign-off cannot promote
scientific grades or research predictions.

## Updating and reproduction

1. Fetch both repositories; record SHAs and source identities. Read relevant current
   science authorities and source documents. Do not copy survey values into lessons.
2. Edit canonical lesson/reference JSON. Update per-lesson source-check dates only
   after checking sources. Source changes need renewed scientific review.
3. Preserve glossary anchors/backlinks. If the science glossary generator is rerun,
   reapply reviewed Education backlinks and regenerate this site's local index;
   integrity tests detect missing reciprocal links. Search entries are not a second
   authoritative glossary or methodology.
4. Run:

   ```sh
   python3 scripts/generate_education.py
   python3 scripts/sync_education_navigation.py
   node scripts/generate-sitemap.mjs
   node --test tests/test_education_core.mjs
   python3 -m unittest discover -s tests -p test_education.py
   python3 scripts/generate_education.py --check
   python3 scripts/sync_education_navigation.py --check
   python3 -m http.server 8523 --bind 127.0.0.1
   # separate terminal, with Playwright and Chromium available:
   python tests/browser_education.py http://127.0.0.1:8523 /path/to/axe.min.js
   ```

5. Attach regenerated browser evidence, record source/human review and open a PR.
   The Education workflow repeats numerical, generation and real-browser checks.
   No build system, private API, external search or survey engine is required.

## Attribution and proposed reuse license

Educational prose, activity and SVG line drawings are original project contributions.
NIST reference values are attributed above and in downloads; no source artwork,
textbook figure or raw third-party atomic database is redistributed. Linked sources
retain their own licenses. Proposed CC BY 4.0 for the original educational text and
figures requires owner approval; this proposal grants no new rights. Open access
(free viewing/downloads) is implemented regardless of that future licensing decision.
