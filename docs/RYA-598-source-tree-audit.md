# RYA-598 — Website source-tree and system-entry audit

Audit date: 2026-07-27  
Repository: `damienabraxas/exoplanetcodex-site`  
Production domain: `https://exoplanetcodex.org`

## Executive summary

The production website is a build-free static site: hand-authored HTML, one shared
CSS file, and two shared JavaScript files. The repository root contains `CNAME`
for `exoplanetcodex.org`; there is no build manifest, framework configuration, or
deployment workflow in the tree. The evidence therefore indicates GitHub Pages
serves the repository contents directly from the default branch.

The visual system established by RYA-77 is genuinely shared, but the layout is
not templated. Navigation, footer, font imports, page chrome, and most
system-entry markup are copied into every HTML file. Scientific and editorial
content is almost entirely hard-coded in those files. The only structured
science artifact consumed by the public tree is a downloadable Solar EW CSV;
the page does not load it.

The eleven non-Solar system detail pages form a recognizable implicit template.
Sol is a substantially larger bespoke entry (815 lines versus roughly 256–263)
with its own orbital visualization, charts, data objects, and extensive local
CSS/JavaScript. 55 Cancri is part of the repeated template family and adds only
target-specific values, imagery, Aladin configuration, and embed behavior.

## Deployment and repository source

| Concern | Current implementation | Evidence |
| --- | --- | --- |
| Website repository | `https://github.com/damienabraxas/exoplanetcodex-site` | Git `origin` and README |
| Science pipeline repository | `https://github.com/damienabraxas/exoplanetcodex` | README and page links |
| Production host | GitHub Pages, direct static publishing (inferred) | `CNAME`, no build or workflow files |
| Production domain | `exoplanetcodex.org` | `CNAME`, canonical URLs, sitemap |
| Build step | None | README; no package/build configuration |
| Route generation | Directory `index.html` files | Repository layout |
| Search indexing | Hand-maintained/generated `sitemap.xml`, `robots.txt` | Root files |

The exact Pages branch/source setting is repository configuration outside this
tree. Confirm it in GitHub before changing deployment behavior.

## Source-tree architecture map

```text
/
├── index.html                         landing page
├── about/, confirmed/, glossary/      general content pages
├── method/, origin/                   long-form methodology/origin pages
├── mission-log/
│   ├── index.html                     post index with client-side tag filter
│   └── posts/*/index.html             two hand-authored posts
├── systems/
│   ├── index.html                     hard-coded system card catalog
│   ├── sol/index.html                 bespoke calibration entry
│   └── */index.html                   11 copied system-entry implementations
├── roadmap/index.html                 canonical-looking roadmap copy
├── roadmap.html                       byte-for-byte duplicate route candidate
├── assets/
│   ├── css/codex.css                  207-line shared design system
│   ├── js/codex.js                    shared nav/search/newsletter/admin logic
│   ├── js/starfield.js                shared canvas background
│   ├── data/sol_ew_results_v1.csv     downloadable result artifact
│   ├── docs/                          public PDFs and source documents
│   └── images/                        target, method, founder, roadmap assets
├── images/credits.md                  partial image attribution inventory
├── CNAME, robots.txt, sitemap.xml      deployment and discovery metadata
└── README.md                          repository/operator notes
```

There are no components, templates, layouts, data loaders, tests, package
manifest, or static-site generator in the current repository.

## Route and page inventory

| Route | Page type | Distinct behavior/data |
| --- | --- | --- |
| `/` | Landing | Search, newsletter subscription, schema.org graph |
| `/about/` | Content | Founder profile and profile structured data |
| `/confirmed/` | Content | Static confirmed-results copy |
| `/glossary/` | Reference | Large hard-coded glossary |
| `/method/` | Long-form | Extensive page-local styles and methodology |
| `/origin/` | Long-form | Static origin narrative |
| `/mission-log/` | Index | Inline client-side tag filtering |
| `/mission-log/posts/solar-calibration/` | Post | Shared newsletter draft tooling |
| `/mission-log/posts/why-55-cancri/` | Post | Shared newsletter draft tooling |
| `/systems/` | Catalog | Hard-coded cards/status/progress |
| `/systems/sol/` | System detail | Bespoke SVG orbital map, Chart.js charts, inline data/JS |
| `/systems/55-cancri/` | System detail | Repeated template, Aladin Lite, NASA embed |
| `/systems/51-peg/` | System detail | Repeated template, Aladin Lite |
| `/systems/61-vir/` | System detail | Repeated template, Aladin Lite |
| `/systems/alpha-centauri-a/` | System detail | Repeated template, Aladin Lite |
| `/systems/eps-eri/` | System detail | Repeated template, Aladin Lite |
| `/systems/gliese581/` | System detail | Repeated template, Aladin Lite |
| `/systems/hd189733/` | System detail | Repeated template, Aladin Lite |
| `/systems/hd209458/` | System detail | Repeated template, Aladin Lite |
| `/systems/hd89307/` | System detail | Repeated template, Aladin Lite |
| `/systems/proxima/` | System detail | Repeated template, Aladin Lite |
| `/systems/tau-ceti/` | System detail | Repeated template, Aladin Lite |
| `/roadmap/` | Standalone app-like page | Inline CSS/JS; does not use shared chrome |
| `/roadmap.html` | Duplicate | Duplicate of `/roadmap/` |

The current sitemap lists only `/`, `/about/`, `/method/`, `/origin/`, and
`/systems/`; most public routes are omitted.

## Component and data-flow inventory

### Reusable modules

- `assets/css/codex.css`: tokens, reset, nav, buttons, hero, panels, system
  cards, progress, footer, and responsive behavior.
- `assets/js/starfield.js`: canvas initialization, star generation, animation,
  pointer parallax, and resize handling.
- `assets/js/codex.js`: mobile navigation, a hard-coded system alias map,
  Buttondown subscription, and mission-post-to-newsletter conversion/admin UI.
- Shared HTML conventions: `#starfield`, `.site-nav`, `.container`,
  `.page-hero`, `.sys-section`, and `.site-footer`.
- Repeated system-entry conventions: summary strip, stellar table, planet
  table, image/HUD, NASA Eyes iframe fallback, Aladin Lite sky view, findings,
  references, and footer.

### Hard-coded versus structured

| Data/content | Location | State |
| --- | --- | --- |
| System aliases and routes | `assets/js/codex.js` object | Hard-coded |
| System catalog cards/status | `systems/index.html` | Hard-coded |
| Stellar and planet facts | Each system HTML file | Hard-coded |
| Citations, imagery, credits | Each system HTML file | Hard-coded |
| Aladin coordinates/config | Inline per system page | Hard-coded |
| Sol planet facts | Inline JavaScript object | Structured only within the page |
| Sol abundance chart values | Inline JavaScript arrays/objects | Structured only within the page |
| Sol EW results | `assets/data/sol_ew_results_v1.csv` | Structured download; not page input |
| Glossary terms | `glossary/index.html` | Hard-coded |
| Mission posts/index | Individual HTML files and index markup | Hard-coded |
| Roadmap state | Two standalone HTML copies | Hard-coded |

Current data flow is therefore:

```text
author edits HTML/inline JS
        ├──> browser renders embedded facts directly
        ├──> external CDN loads Aladin Lite or Chart.js
        └──> downloadable CSV is linked, not parsed
```

There is no link from pipeline output or the completed RYA-631 system catalog to
the website repository. RYA-599 is the correct boundary for defining that
publication contract.

## Sol and 55 Cancri comparison

| Area | Sol | 55 Cancri |
| --- | --- | --- |
| File size | 815 lines | 263 lines |
| Base layout | Shared CSS/chrome | Shared CSS/chrome |
| Local CSS | Large bespoke block | Small repeated system block |
| Primary visualization | Hand-authored interactive SVG orbital map | Aladin Lite sky view |
| Additional embed | NASA Eyes Solar System | NASA Eyes exoplanet page |
| Scientific plots | Chart.js, four presentation areas | None published yet |
| Page data | Inline tables plus inline JS arrays/objects | Inline HTML facts/tables |
| Download | Solar EW CSV | Planned result downloads only |
| Status | Rich calibration page, but explicitly includes warnings/incomplete results | Pipeline-active placeholder findings |
| Reusability | Planet modal and chart patterns are possible extraction targets | Belongs to the repeated system template family |

Neither entry consumes a canonical system record. Sol should not be used as the
first template source wholesale: its calibration-specific content and
visualizations would make the generic schema unnecessarily complex.

## Linear implementation matrix

Status reflects Linear on 2026-07-27.

| Ticket | Linear status | Code evidence / implementation state |
| --- | --- | --- |
| RYA-77 shared layout | Done | Shared CSS, nav, starfield, and footer exist; HTML chrome remains duplicated |
| RYA-53 Solar entry | Backlog | A substantial implementation exists at `/systems/sol/`; ticket status and acceptance state are out of sync |
| RYA-54 statistics explorer | Backlog | No dedicated explorer route; Sol contains isolated charts only |
| RYA-61 founder headshot | Backlog | `/about/` references `assets/images/ryan-schmitt.jpg`; ticket status appears stale |
| RYA-253 roadmap live-sync audit | Backlog | Roadmap is hard-coded and duplicated; no Linear sync is present |
| RYA-257 Procyon entry | Backlog | No Procyon route or asset directory |
| RYA-326 derived-vs-literature layer | Backlog | No reusable provenance/comparison model; prose/tables are embedded |
| RYA-590 analytics/search | Done | Main branch has hard-coded search; GA4 files were completed on the RYA-590 branch but are not present on audited `main` |
| RYA-94 Solar validation publication | Backlog | Solar results and warnings are already public; acceptance and scientific currency require review |
| RYA-181 update Solar abundance plot | Backlog | Current plot labels itself active/investigatory and is inline, indicating this update remains outstanding |
| RYA-599 publication schema | Backlog | No website system-record schema exists |
| RYA-631 system catalog | Done | Catalog exists in the science repository, but the website has no integration |

## Gaps, regressions, duplication, and debt

1. **System-page duplication:** eleven files repeat roughly the same page-local
   CSS, HTML sections, NASA fallback, Aladin setup, nav, and footer.
2. **No publication data boundary:** page facts can drift independently from the
   pipeline, catalog, Linear parents, and cited literature.
3. **Route regressions in search:** the alias map sends HD 89307 to
   `/systems/hd-89307/` instead of `/systems/hd89307/`, and Gliese 581 to
   `/systems/gliese-581/` instead of `/systems/gliese581/`.
4. **Incomplete sitemap:** most routes, all system details, posts, glossary,
   confirmed, and roadmap are absent.
5. **Roadmap fork:** `/roadmap.html` and `/roadmap/index.html` duplicate 552 lines
   and bypass shared CSS/navigation.
6. **README drift:** the documented tree uses obsolete `css/`, `js/`, and image
   paths and describes 55 Cancri as “coming soon.”
7. **Ticket/code drift:** several Backlog tickets have partial or substantial
   public implementations, obscuring scientific and delivery status.
8. **Inline behavior:** mission filtering, all system embeds, Solar interactions,
   and charts are page-local and untested.
9. **External runtime coupling:** Google Fonts, Aladin Lite, Chart.js, NASA Eyes,
   and Buttondown are runtime dependencies with no automated smoke coverage.
10. **Credential exposure:** `assets/js/codex.js` contains a Buttondown API token
    in public client code. Treat it as exposed, revoke/rotate it, and move signup
    behind a safe public integration or server-side boundary.
11. **Unsafe search rendering:** the raw query is interpolated into
    `innerHTML`; use `textContent`/DOM construction.
12. **Asset hygiene:** spaces and inconsistent naming in target directories,
    duplicate/source documents in public assets, `.DS_Store` files, and incomplete
    centralized credits complicate automation.
13. **No validation harness:** no link, HTML, accessibility, schema, or
    data-contract checks run before publication.

## Recommended low-risk refactor sequence

1. **Contain operational risks without changing visuals.** Rotate the exposed
   Buttondown credential, correct the two search routes, replace query
   `innerHTML`, regenerate the sitemap, and choose one canonical roadmap route.
2. **Freeze the current implicit template.** Document the repeated sections and
   create visual/smoke snapshots for 55 Cancri plus one queued system and Sol.
3. **Define data before templating (RYA-599).** Use a single curated publication
   record per system with stable IDs, aliases, route, provenance, status,
   citations, assets, stellar facts, planet facts, and pipeline product links.
   Do not expose raw pipeline configuration directly to presentation code.
4. **Adopt RYA-631 as an upstream registry.** Join it to website publication
   records through stable system IDs; keep editorial copy and asset choices in
   the website layer.
5. **Generate one repeated system page first.** Reproduce 55 Cancri exactly from
   structured data while retaining `codex.css` and the current DOM/classes.
   Compare output visually before converting the other ten repeated pages.
6. **Extract optional feature modules.** Make Aladin, NASA embeds, downloads,
   provenance panels, and status displays conditional components.
7. **Isolate Sol extensions.** Move its planet facts and chart series into
   validated data and extract its orbital map/charts as optional modules; retain
   calibration-specific sections.
8. **Templatize global chrome last within the same visual contract.** Centralize
   nav/footer/metadata only after generated pages match existing output.
9. **Add publication gates.** Validate schema, internal links, sitemap coverage,
   asset existence, duplicate canonical routes, scientific status labels, and
   placeholder/final distinctions in CI.

This sequence preserves the established aesthetic and shared CSS while removing
the highest-risk inconsistencies before any broad framework decision.
