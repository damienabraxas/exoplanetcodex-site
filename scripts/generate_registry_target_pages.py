#!/usr/bin/env python3
"""Create minimal public profiles for registered targets that lack bespoke pages."""

from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "assets/data/local-stellar-neighborhood.v1.json"


def esc(value: object) -> str:
    return html.escape(str(value))


def page(target: dict) -> str:
    name = esc(target["name"])
    role = esc(target["role"].replace("_", " ").title())
    spectral = esc(target.get("spectral_type") or "Pending registry adoption")
    distance = f'{target["distance_pc"]:.2f}'
    coords = target["cartesian_pc"]
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="/assets/js/analytics.js"></script>
  <title>{name} · The Exoplanet Codex</title>
  <meta name="description" content="{name} registry profile in the Exoplanet Codex target catalog.">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/codex.css">
  <style>
    .registry-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1px;background:var(--rim);border:1px solid var(--rim);margin:2rem 0}}
    .registry-cell{{background:var(--deep);padding:1.2rem}}
    .registry-label{{font:0.58rem var(--mono);letter-spacing:.18em;text-transform:uppercase;color:var(--text-dim);margin-bottom:.4rem}}
    .registry-value{{font:0.9rem/1.5 var(--mono);color:var(--accent)}}
    .registry-note{{border-left:3px solid var(--accent);background:rgba(79,195,247,.04);padding:1.4rem 1.6rem;margin:2rem 0;color:var(--text);line-height:1.75}}
  </style>
</head>
<body>
<canvas id="starfield"></canvas>
<div class="page">
  <nav class="codex-nav">
    <a href="/" class="nav-logo"><span class="logo-text">EXOPLANET CODEX</span></a>
    <ul class="nav-links">
      <li><a href="/systems/" class="active">Systems</a></li><li><a href="/glossary/">Glossary</a></li><li><a href="/method/">Method</a></li><li><a href="/sources/">Sources</a></li><li><a href="/mission-log/">Mission Log</a></li><li><a href="/about/">About</a></li>
    </ul>
    <div class="breadcrumb"><a href="/">Home</a> / <a href="/systems/">Systems</a> / <span>{name}</span></div>
  </nav>
  <header class="page-hero">
    <div class="page-eyebrow">Registered target // Profile</div>
    <h1 class="page-title"><em>{name}</em></h1>
    <p class="page-subtitle">{role} · {distance} pc</p>
  </header>
  <main class="container">
    <section>
      <div class="section-label">Catalog record</div>
      <h2 class="section-title">Registry profile</h2>
      <div class="registry-grid">
        <div class="registry-cell"><div class="registry-label">Role</div><div class="registry-value">{role}</div></div>
        <div class="registry-cell"><div class="registry-label">Spectral type</div><div class="registry-value">{spectral}</div></div>
        <div class="registry-cell"><div class="registry-label">Distance</div><div class="registry-value">{distance} pc</div></div>
        <div class="registry-cell"><div class="registry-label">Astrometry</div><div class="registry-value">{esc(target["astrometric_source"])}</div></div>
      </div>
      <div class="registry-note">This target is part of the committed Codex star registry. Its profile is public now; validated stellar parameters, spectra, and analysis products will be added as they pass the pipeline.</div>
      <div class="registry-grid">
        <div class="registry-cell"><div class="registry-label">Toward Galactic center</div><div class="registry-value">{coords["x_gc"]:.3f} pc</div></div>
        <div class="registry-cell"><div class="registry-label">Direction of rotation</div><div class="registry-value">{coords["y_rotation"]:.3f} pc</div></div>
        <div class="registry-cell"><div class="registry-label">North Galactic pole</div><div class="registry-value">{coords["z_ngp"]:.3f} pc</div></div>
      </div>
      <p><a href="/#neighborhood-title" class="btn-ghost">← Back to neighborhood map</a></p>
    </section>
  </main>
  <footer><span>THE EXOPLANET CODEX</span><span>Open science · Reproducible results</span></footer>
</div>
<script src="/assets/js/starfield.js"></script>
</body>
</html>
'''


def main() -> None:
    product = json.loads(DATA.read_text(encoding="utf-8"))
    created = []
    for target in product["targets"]:
        slug = target.get("slug")
        if not slug:
            raise ValueError(f'registered target has no website slug: {target["id"]}')
        destination = ROOT / "systems" / slug / "index.html"
        if destination.exists():
            continue
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(page(target), encoding="utf-8")
        created.append(slug)
    print(f"created {len(created)} registry target pages: {', '.join(created) or 'none'}")


if __name__ == "__main__":
    main()
