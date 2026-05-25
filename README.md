# The Exoplanet Codex
### exoplanetcodex.org

An open science archive measuring the elemental chemistry of exoplanetary systems — rigorously, openly, and without a PhD required.

## What this is

This is the public-facing website and science communication home for The Exoplanet Codex project. We apply precision stellar spectroscopy to publicly available telescope data, build metrology-grade uncertainty budgets, and publish per-system "codex entries" — dossiers combining our measurements with NASA/ESA imagery, JWST findings, and astrobiology assessments.

**Science pipeline code lives at:** [link TBD — same GitHub org]

## Site structure

```
/
├── index.html              ← Landing page
├── systems/
│   └── 55-cancri/
│       └── index.html      ← Copernicus/Janssen system page (coming soon)
├── css/
│   └── codex.css           ← Shared styles
├── js/
│   └── starfield.js        ← Star field animation
├── images/
│   └─ this file
```

## Running locally

No build step needed. Just open `index.html` in a browser, or:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Image credits & licensing

All imagery is NASA/ESA/JPL public domain or Creative Commons.
Full credits in `images/credits.md`.

Key images used:
- 55 Cancri e artist's concept (2024) — NASA/ESA/CSA, J. Olmsted (STScI)
- 55 Cancri e with atmosphere — NASA/JPL-Caltech
- 55 Cancri Travel Poster — NASA/JPL-Caltech
- Solar system comparison — NASA/JPL-Caltech

**NASA media usage policy:** NASA imagery is generally not copyrighted and may be used for educational and informational purposes. See: https://www.nasa.gov/nasa-brand-center/images-and-media/

## Science pipeline

The spectral analysis pipeline is written in Python and lives in a separate repository. Dependencies: NumPy, SciPy, Matplotlib, Astropy, Specutils.

Current status: Step 1/6 — spectrum acquisition and inspection.

## Contact & collaboration

This is an independent science project. Scientists with relevant expertise are warmly invited to engage, challenge our measurements, or collaborate.

**Key contacts we plan to reach:**
- Dr. Natalie Hinkel (LSU) — Hypatia Catalog
- Dr. Johanna Teske (Carnegie) — 55 Cnc C/O ratio
- Dr. Stephen Kane (UCR) — Habitable zone research

## Founded

Montana, USA · 2026  
Ryan Schmitt — astrophysics degree (2010), laser engineer, Salesforce AI consultant, and perpetually curious human.

*"The question never went away."*
