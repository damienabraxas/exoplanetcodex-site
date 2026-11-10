# Spectroscopic Frontier website (RYA-1377)

The public route is `/spectroscopic-frontier/`. It consumes an exact byte copy of
the merged RYA-1373 canonical atlas, with no runtime Linear calls, credentials,
scientific calculations or writes. Scientific records remain owned by the science
repository. The website does not turn inventory completion into physical validation.

## Files and refresh

- `assets/data/frontier-atlas.v1.json`: exact canonical registry snapshot.
- `assets/data/schemas/frontier-atlas.v1.schema.json`: exact upstream schema.
- `assets/data/frontier-snapshot.v1.json`: source commit/hash receipt, methodology,
  contribution and canonical target links, including Gliese 581.
- `assets/js/frontier-atlas.js` and `assets/css/frontier-atlas.css`: safe DOM renderer,
  source/detail/gap views, filters and responsive presentation.
- `scripts/sync_frontier_snapshot.py`: requires a committed science checkout and
  validates the canonical schema before copying bytes. It never edits that checkout.

```sh
python scripts/sync_frontier_snapshot.py --science-root /path/to/science
python scripts/sync_frontier_snapshot.py --science-root /path/to/science --check
python scripts/render_frontier_attribution.py
python scripts/sync_frontier_navigation.py
node scripts/generate-sitemap.mjs
```

Review source and policy changes before refreshing the snapshot. A changed source
commit is not automatic authorization to promote entries or publish measurements.
The broader science bibliography generator and individual page generators do not
currently own these website additions: after regenerating them, run both existing
`render_roadmap_credits.py` and `render_frontier_attribution.py`, followed by the
navigation sync. CI rejects lost or stale sections/navigation. These are bounded,
idempotent post-steps, preserving existing bibliography records and page structure.

## Scientific display behavior

Availability, compatibility, independent verification, source membership and quality
are separate dimensions. No single green/red completeness signal is used. The
current snapshot contains no independently validated entries; that fact stays visible.
Held resources are available, not automatically scientifically validated or licensed
for redistribution. Only JSON metadata and links are copied; upstream line-list,
solver, atmosphere and grid bytes are not redistributed by this feature.

Numerical filters compare Teff/log g/[Fe/H]/C/O against explicit stored axes. Missing
axes are unknown, not unbounded; users may include them with an unaudited label or
exclude them. Values outside envelopes can be inspected separately. Values inside
an envelope still require line, hull, chemistry, atmosphere, observation and uncertainty
checks. Display bands and F/G-study or M-dwarf-research groupings are navigation
categories, not new physical validity bounds. M-dwarf research selects molecular
records/discovery pointers and explicitly does not certify applicability to Gliese 581.

The source registry has no line-set membership evidence yet. Those filters therefore
return an explicit unaudited/empty state rather than infer membership from an author
name. The renderer supports arrays of independently evidenced memberships, including
multiple memberships per resource, once the canonical science schema/product provides
them. RYA-1376 owns that audit; its unresolved Keeper recommendation, membership,
gf origin and grade fields must not be invented here. Future membership schema
changes require updating the copied canonical schema and tests in the same PR.

Detail pages use `#entry-<canonical-id>` anchors, with query-string filters. Shareable
keys include `q`, `species`, `ion`, `isotope`, `band`, `component`, `treatment`,
`availability`, `status`, `stellar`, `atmosphere`, `engine`, `membership`, `teff`,
`logg`, `feh`, `co` and `unknown`. Text and links are rendered with DOM text nodes
and allowed HTTPS/root-relative URLs; arbitrary source HTML is never interpreted.

## Checks and evidence

```sh
python -m unittest discover -s tests -p 'test_frontier*.py'
python -m unittest discover -s tests -p '*roadmap*.py'
python scripts/render_frontier_attribution.py --check
python scripts/sync_frontier_navigation.py --check
python -m http.server 8521 --bind 127.0.0.1
# second terminal, with Playwright/Chromium and downloaded axe-core 4.10.3:
python tests/browser_frontier_atlas.py http://127.0.0.1:8521 /path/to/axe.min.js
```

The dedicated Frontier workflow performs schema/hash, navigation/attribution,
browser/local-link and WCAG A/AA checks, and retains screenshots as a CI artifact.
Existing Roadmap regression workflow remains in place. Screenshots and exact local
results are under `docs/qa/rya1377/`. Configured workflows do not imply a passed run.

## Release

This existing site uses GitHub Pages, source `main` at repository root. A PR branch
is not a deployment. After required review and Ryan-authorized merge, inspect the
Pages build and verify the public route, navigation, Sources anchors and exact deployed
snapshot hash. Keep RYA-1377 In Review until its deployment and independent scientific
claims review are actually satisfied; do not mark it Done from local generation alone.
