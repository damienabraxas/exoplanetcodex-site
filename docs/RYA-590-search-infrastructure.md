# RYA-590 — analytics and search infrastructure

## Google Analytics 4

All HTML entry points load `/assets/js/analytics.js` once. The shared loader initializes Google tag ID `G-J582P46BP9`, guards against duplicate initialization, and sends the standard GA4 page-view configuration event.

The measurement ID is intentionally public client-side configuration, not a secret. This repository is a static GitHub Pages site with no build-time environment-variable layer, so storing the ID in an environment variable would not hide it and would add a deployment dependency. The shared module keeps it single-sourced and replaceable.

Production verification requires opening the deployed site and confirming the visit in **Google Analytics → Reports → Realtime**. Browser privacy controls, content blockers, and consent settings can prevent an individual test visit from appearing.

## Search infrastructure

- Search Console Domain property `exoplanetcodex.org` is verified through a DNS TXT record.
- `robots.txt` allows crawling and advertises the canonical sitemap URL.
- `scripts/generate-sitemap.mjs` discovers public HTML entry points and writes `sitemap.xml`.
- The duplicate legacy `/roadmap.html` path is excluded in favor of `/roadmap/`.
- The signup confirmation page is marked `noindex, follow` and excluded from the sitemap.

Regenerate after adding or removing pages:

```sh
node scripts/generate-sitemap.mjs
```

## Structured-data review

| Entity | Current use | Next use |
| --- | --- | --- |
| `Person` | Ryan Schmitt founder identity | Keep the stable `#ryan-schmitt` ID across author references. |
| `Organization` | The Exoplanet Codex publisher/founder relationship | Reuse the stable `#organization` ID on published research. |
| `WebSite` | Homepage site identity | Retain as the top-level site entity. |
| `ProfilePage` | About page | Continue using Ryan Schmitt as `mainEntity`. |
| `WebPage` | Implicit through `ProfilePage`; not yet added to all pages | Add page-specific entities when canonical metadata is normalized site-wide. |
| `Dataset` | Not yet published | Add only when a stable downloadable dataset, license, creator, temporal coverage, and variable descriptions are available. |
| `ScholarlyArticle` | Not yet published | Add to future research articles only when headline, author, date, citation, and publication identifiers are final. |

Do not add empty `Dataset` or `ScholarlyArticle` placeholders. Structured data should describe visible, published content and use canonical entity IDs rather than inventing incomplete records.
