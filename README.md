# The Exoplanet Codex
### exoplanetcodex.org

An open science archive measuring the elemental chemistry of exoplanetary systems — rigorously, openly, and without a PhD required.

The Exoplanet Codex was founded by **Ryan Schmitt**. The GitHub username `damienabraxas` is Ryan Schmitt's account handle; it is not the founder's name or a separate project contributor.

## What this is

This is the public-facing website and science communication home for The Exoplanet Codex project. We apply precision stellar spectroscopy to publicly available telescope data, build metrology-grade uncertainty budgets, and publish per-system "codex entries" — dossiers combining our measurements with NASA/ESA imagery, JWST findings, and astrobiology assessments.

**Science pipeline code lives at:** [github.com/damienabraxas/exoplanetcodex](https://github.com/damienabraxas/exoplanetcodex), maintained by Ryan Schmitt.

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

To regenerate the Solar/Fe reporting model from a clean checkout of the science
repository, run:

```bash
python3 scripts/generate_solar_report.py --science-root /path/to/exoplanetcodex
python3 -m http.server 8000
# then visit http://localhost:8000/systems/sol/
```

The generator loud-fails when a required versioned artifact is missing. It also
copies the replication-grade Fe per-line CSV into the site's downloadable data
directory; no scientific values are stored in the HTML or rendering code.

To regenerate the homepage's versioned stellar-neighborhood map from the same
canonical catalog, STAR_PARAMS pointers, and cached SIMBAD astrometry:

```bash
python3 scripts/generate_local_stellar_neighborhood.py \
  --site-root /path/to/exoplanetcodex-site
```

See [the coordinate and provenance notes](docs/local-stellar-neighborhood.md).

## Analytics and sitemap

All pages load the shared GA4 integration from `assets/js/analytics.js`. The public measurement ID is single-sourced there because this is a static site without a server-side environment layer.

After adding or removing an HTML page, regenerate the sitemap:

```bash
node scripts/generate-sitemap.mjs
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
