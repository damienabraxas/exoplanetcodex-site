#!/usr/bin/env python3
"""Build the Fe appendices and share graphic from a pinned science checkout.

Fe.json owns product membership and every product value. Committed proof,
line-list and reference artifacts supply information that the feed does not carry.
Missing line evidence is exported explicitly, never replaced with an older pool.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import html
import json
import shutil
import subprocess
import sys
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/data/fe-publication'
BANDS = ['near-UV', 'VIS', 'red-optical', 'NIR', 'H']
LABELS = {'harps': 'HARPS', 'crires_plus': 'CRIRES+',
          'kpno_solar_atlas': 'Kitt Peak', 'iag_fts_solar_atlas': 'IAG'}
CYAN, GOLD, BG = '#63dce6', '#ebc77c', '#081219'
VERSION = '1.0.0'


def esc(value):
    return html.escape(str(value))


def read_csv(path):
    return pd.read_csv(path, comment='#', low_memory=False)


def write_csv(name, records):
    keys = list(dict.fromkeys(k for r in records for k in r))
    with (OUT / name).open('w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=keys, lineterminator='\n')
        w.writeheader()
        w.writerows({k: json.dumps(v, ensure_ascii=False, sort_keys=True)
                     if isinstance(v, (dict, list)) else v for k, v in r.items()} for r in records)


def label(p):
    return f"{LABELS.get(p['instrument'], p['instrument'])} · {p['display']} · {p['grade']}"


def held(p):
    return p.get('adoption') == 'EXPERIMENTAL-NOT-ADOPTED'


def forest(products, reference, name, social=False):
    """Use the feed's completed uncertainty, including xi exactly once."""
    height = 4.7 if social else max(3.5, len(products) * .78 + 1.2)
    fig, ax = plt.subplots(figsize=(12 if social else 14, height), facecolor=BG)
    ax.set_facecolor(BG)
    ref, sigma = reference['asplund2021'], reference['sigma_external']
    ax.axvspan(ref-sigma, ref+sigma, color=GOLD, alpha=.12)
    ax.axvline(ref, color=GOLD, lw=1.2)
    labels = []
    for y, p in enumerate(products):
        color = GOLD if p['tier'] != 'ALL' else CYAN
        if held(p):
            color = '#f07848'
        ax.errorbar(p['A'], y, xerr=p['sigma_reported'], fmt='o',
                    color=color, mfc=color if p['tier'] != 'ALL' else BG,
                    capsize=3, lw=1.2, markersize=5)
        ax.plot([p['A']-p['sigma_stat'], p['A']+p['sigma_stat']], [y, y], color=color, lw=3)
        text = label(p)
        if social:
            text = f"{LABELS[p['instrument']]} {p['band']} · {p['display']}\n{p['grade']} · n={p['n_lines']}"
        else:
            text += f"\n{p['holding']} · {p['selector']}\n{p['route']} · {p['treatment']}"
        labels.append(text)
        ax.text(1.025, y, f"{p['A']:.3f} ± {p['sigma_reported']:.3f}" + ('*' if p.get('sigma_reported_caveat') else '') +
                ('' if social else f"  n={p['n_lines']}"),
                transform=ax.get_yaxis_transform(), va='center', color=color, fontsize=9)
    ax.set_yticks(range(len(products)), labels, color='#dae4eb', fontsize=9 if social else 8)
    ax.invert_yaxis()
    ax.tick_params(axis='x', colors='#b8c8d3')
    ax.tick_params(axis='y', length=0, pad=12)
    ax.set_xlabel('A(Fe) · thick: statistical · thin: reported uncertainty', color='#b8c8d3', fontsize=9)
    caveats = [p['sigma_reported_caveat'] for p in products if p.get('sigma_reported_caveat')]
    if caveats:
        footnote = '* Lower-bound uncertainty; microturbulence term unavailable.' if all('LOWER BOUND' in c for c in caveats) else '* Reported uncertainty is qualified; see source product CSV.'
        fig.text(.02, .01, footnote, color='#b8c8d3', fontsize=8)
    ax.set_title(f"{'Solar iron · HARPS + CRIRES+' if social else 'Solar iron · ' + name}\n"
                 f"Asplund et al. 2021: {ref:.2f} ± {sigma:.2f}", color=CYAN, loc='left', pad=20, fontsize=13)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.grid(axis='x', alpha=.12)
    fig.subplots_adjust(left=.44 if social else .48, right=.81, top=.81 if social else .89, bottom=.17 if social else .13)
    stem = 'fe-social-forest' if social else name
    fig.savefig(OUT / (stem+'.svg'), facecolor=BG, transparent=False, metadata={'Date': None}, bbox_inches='tight', pad_inches=.25)
    if social or name == 'harps-arm-offset-dark':
        fig.savefig(OUT / (stem+'.png'), dpi=180, facecolor=BG, bbox_inches='tight', pad_inches=.25)
    plt.close(fig)


def line_exports(science, products):
    sys.path.insert(0, str(science / 'scripts'))
    import rya515_fe_perline_provenance as proof
    canonical = read_csv(science / 'data/linelists/canonical_gf.csv')
    canonical = canonical[canonical.species.isin(['Fe I', 'Fe II'])]
    records, coverage = [], []
    for p in products:
        path, reason = proof.perline_path(p)
        # The MLP route has a different, explicit sidecar schema.
        mlp = p['treatment'] == 'ENGINE-A-3DNLTE'
        if mlp:
            candidate = science / p['provenance']['copied_to'].replace('_products.csv', '_per_line.csv')
            if candidate.is_file():
                path, reason = str(candidate), 'resolved from product provenance'
        entry = {k: p.get(k) for k in ['publication_id', 'ion', 'band', 'instrument', 'holding', 'tier', 'selector', 'route', 'treatment', 'A', 'n_lines']}
        if path:
            df = read_csv(path)
            if mlp:
                df = df[df.a_3dnlte.notna() & df.in_domain.eq(True)]
                df = df.rename(columns={'a_3dnlte': 'abundance', 'elo_eV': 'ep_eV'})
            else:
                df = df[df.in_aggregate.eq(True)]
            if len(df) != p['n_lines'] or abs(df.abundance.median()-p['A']) > .0006:
                path, reason = None, 'per-line count or median does not reproduce the live product'
        if path:
            for _, r in df.iterrows():
                if p['tier'] == 'ALL':
                    continue  # requested download is the graded pool
                gf = canonical[(canonical.species == 'Fe '+p['ion']) &
                               ((canonical.wavelength_air_A-r.wavelength_air_A).abs() <= .005)]
                if pd.notna(r.get('ep_eV')):
                    gf = gf[(gf.excitation_potential_eV-r.ep_eV).abs() <= .02]
                values = gf.log_gf.dropna().unique()
                source_gf = r.get('loggf', r.get('loggf_asplund', np.nan))
                loggf = source_gf if pd.notna(source_gf) else values[0] if len(values) == 1 else None
                records.append({**entry, 'wavelength_air_A': r.wavelength_air_A,
                                'abundance': r.abundance, 'ep_eV': r.get('ep_eV'),
                                'log_gf': loggf, 'gf_basis': 'per-line artifact' if pd.notna(source_gf) else
                                'unique canonical_gf match' if len(values) == 1 else 'unresolved canonical_gf match',
                                'perline_artifact': str(Path(path).relative_to(science))})
        coverage.append({**entry, 'resolved': bool(path), 'reason': reason,
                         'perline_artifact': str(Path(path).relative_to(science)) if path else ''})
    write_csv('Fe_graded_perline.csv', records)
    write_csv('Fe_perline_coverage.csv', coverage)
    return records, coverage


def diagnostics(science, products):
    result = []
    rules = read_csv(science / 'data/catalog/line_curation_exclusions.csv').fillna('')
    rule = rules[rules.astype(str).apply(lambda c: c.str.contains('CH G-band')).any(axis=1)].iloc[0]
    import rya515_fe_perline_provenance as proof
    source = 'data/catalog/line_curation_exclusions.csv'
    wl = float(rule.wavelength_air_A)
    linelist = read_csv(science / 'data/linelists/linelist_solar.csv')
    transitions = linelist[(linelist.wavelength_air_A-wl).abs() <= proof.FIT_HALF_WIDTH_A]
    write_csv('FeII_CH_window.csv', transitions.fillna('').to_dict('records'))
    fig, ax = plt.subplots(figsize=(11, 4), facecolor=BG)
    ax.set_facecolor(BG)
    for title, group, color in [('CH', transitions[transitions.element=='CH'], CYAN),
                                ('Other transitions', transitions[transitions.element!='CH'], '#89939c')]:
        ax.vlines(group.wavelength_air_A, 0, group.central_depth, color=color, label=f'{title} (n={len(group)})')
    ax.axvline(wl, color=GOLD, linestyle='--', label=f'Curated Fe II {wl:.3f}')
    ax.set_xlabel('Air wavelength [Å]', color='white')
    ax.set_ylabel('Catalogued central depth', color='white')
    ax.tick_params(colors='white'); ax.legend(fontsize=8, labelcolor='white', frameon=False)
    fig.tight_layout(); fig.savefig(OUT / 'fe2-ch-artifact.svg', metadata={'Date': None}, transparent=True); plt.close(fig)
    result.append(('CH G-band artifact', 'fe2-ch-artifact.svg',
                   str(rule.reason)+' · '+str(rule.evidence)+' The plot shows the committed transition census in the proof generator’s fit window; it is not a synthetic spectrum.', source))
    lever_path = 'data/results/rya1207/nearuv_molecular_lever.json'
    lever = json.loads((science / lever_path).read_text())['the_lever_measured_PAIRED']
    fig, ax = plt.subplots(figsize=(9, 4), facecolor=BG)
    ax.set_facecolor(BG)
    measurements = {ion+' '+k: v for ion in ['Fe_I_dex', 'Fe_II_dex'] for k, v in lever[ion].items()}
    ax.barh(list(measurements), list(measurements.values()), color=CYAN)
    ax.tick_params(colors='white', labelsize=8)
    ax.set_xlabel('A(Fe) change, molecules ON - OFF [dex]', color='white')
    fig.tight_layout(); fig.savefig(OUT / 'nearuv-opacity.svg', metadata={'Date': None}, transparent=True); plt.close(fig)
    result.append(('Near-UV molecular opacity', 'nearuv-opacity.svg', lever['method'], lever_path))
    # Compare like-for-like live Fe II products by engine, without averaging arms.
    vis = [p for p in products if p['ion']=='II' and p['band']=='VIS']
    forest(vis, REFERENCE, 'harps-arm-offset-dark')
    result.append(('HARPS arm offset', 'harps-arm-offset-dark.png',
                   'Current Fe II VIS products, separated by holding and engine. The arm offset persists after the curated CH artifact was removed.',
                   'data/products/solar/Fe.json'))
    h = [p for p in products if p['band']=='H' and p['instrument']=='crires_plus']
    fig, ax = plt.subplots(figsize=(10, 3.5), facecolor=BG)
    ax.set_facecolor(BG)
    ys = range(len(h))
    ax.barh(ys, [p['n_lines'] for p in h], color=CYAN, label='Measured / included')
    ax.barh(ys, [p['n_excluded'] for p in h], left=[p['n_lines'] for p in h], color='#596773', label='Excluded / not served')
    ax.set_yticks(list(ys), [p['display'] for p in h], color='white', fontsize=8)
    ax.tick_params(axis='x', colors='white'); ax.set_xlabel('Line count', color='white'); ax.legend(fontsize=8, labelcolor='white', frameon=False, loc='lower left', bbox_to_anchor=(0, 1.02), ncol=2)
    fig.tight_layout(); fig.savefig(OUT / 'crires-h-coverage.svg', metadata={'Date': None}, transparent=True); plt.close(fig)
    result.append(('CRIRES+ H model coverage', 'crires-h-coverage.svg',
                   'Included and excluded line counts from each current product. Excluded rows are not automatically failed fits; the per-line reason distinguishes unavailable NLTE coverage.',
                   'data/products/solar/Fe.json'))
    census_path = 'data/audit/rya515_fe_perline/fe2_blend_census.csv'
    census = read_csv(science / census_path)
    depth = census.obs_depth.dropna()
    saturation = f"Committed proof census: {len(depth)} line/holding records; {100*(depth > .70).mean():.0f}% have observed depth > 0.70. Median observed log10(EW[mÅ]/λ[Å]) = {census.obs_rew.median():.3f}. In consistent Å units this is {census.obs_rew.median()-3:.3f}. These diagnostics characterize the audited saturated pool, not every newly added product."
    return result, saturation


def section(title, body):
    return f'<section class="fe-section"><h2>{esc(title)}</h2>{body}</section>'


def render_page(ion, products, feed, meta, reference, records, coverage, plots, saturation):
    own = [p for p in products if p['ion'] == ion]
    body = f'<p class="fe-stamp">Fe.json v{esc(feed["version"])} · {len(own)} Fe {ion} products · {len(products)} total</p>'
    body += f'<p class="fe-anchor">Solar reference anchor A(Fe)☉ = {reference["codex_A_X"]:.3f}</p><p>The retained reference anchor is not a median of the current products. Each measurement below remains a separate instrument, holding, line set and engine result.</p>'
    if ion == 'II':
        vis = [p for p in own if p['band']=='VIS']
        body += f'<p>Ionization-balance diagnostic: current VIS Fe II products span {min(p["A"] for p in vis):.3f}–{max(p["A"] for p in vis):.3f}. A single historical ionization value is not a result of this feed.</p>'
    highlights = []
    for band in BANDS:
        candidates = [p for p in own if p['band']==band and not held(p)]
        if candidates:
            p = min(candidates, key=lambda p: (p['sigma_reported'], p['publication_id']))
            highlights.append(f'<article><h3>{esc(band)}</h3><strong>{p["A"]:.3f} ± {p["sigma_reported"]:.3f}</strong><p>{esc(label(p))} · n={p["n_lines"]}</p><small>{esc(p["holding"])} · ξ {esc(p["xi_state"])}<br>{esc(p.get("sigma_reported_caveat") or "")}</small></article>')
    body += section('Highlighted band products', '<p>Smallest reported uncertainty in each band, excluding held experiments. This selection does not establish physical superiority or a combined abundance.</p><div class="fe-highlights">'+''.join(highlights)+'</div>')
    # Render the established component with its original band/holding/model hierarchy.
    forest_html = subprocess.check_output([
        'node', '-e',
        "const fs=require('fs'); const {forest}=require('./assets/js/element-products.js'); "
        "const x=JSON.parse(fs.readFileSync(0,'utf8')); process.stdout.write(forest(x.feed,x.ion,x.reference));"
    ], input=json.dumps({'feed': feed, 'ion': ion, 'reference': reference}), text=True, cwd=ROOT)
    body += '<section class="product-section"><h2>Error-bar forest</h2><p class="product-section-intro">Each band is divided into instrument and holding subsections with the same fixed model axis; models without a product remain N/A. Solid bars show statistical uncertainty and wireframe bars show systematic uncertainty. Blue denotes the regular model results. Reddish-orange text, points and bars identify the experimental Frankenstein / Gerber mean-3D engines, which are not adopted results. Green and gold regions show the Asplund and Lodders literature comparisons. Feed caveats and reported total uncertainties are listed in the expandable product values below.</p>'+forest_html+'</section>'
    accessible = '<details><summary>Read all product values, including alternate line sets and experiments</summary><ul>'+''.join(
        f'<li data-product-id="{p["publication_id"]}">{esc(label(p))} · {esc(p["holding"])} · {esc(p["selector"])} · {esc(p["route"])} · {esc(p["treatment"])}: '
        f'{p["A"]:.3f} ± {p["sigma_reported"]:.3f} reported total; n={p["n_lines"]}; ξ {esc(p["xi_state"])}'
        + (' · '+esc(p['sigma_reported_caveat']) if p.get('sigma_reported_caveat') else '')
        + (' · experimental, not adopted' if held(p) else '')+'</li>' for p in own)+'</ul></details>'
    body += accessible
    for title, key in [('Near-UV opacity — report and noted', 'opacity_note'), ('Frankenstein — experimental, pending the Bride', 'adoption_note')]:
        source_products = products if key == 'adoption_note' else own
        notes = list(dict.fromkeys(p[key] for p in source_products if p.get(key)))
        if notes:
            count = f'<p>{sum(held(p) for p in products)} experimental products remain available in the Fe I product values and downloads.</p>' if key == 'adoption_note' else ''
            body += section(title, count+''.join('<p>'+esc(n)+'</p>' for n in notes))
    if ion == 'II':
        body += section('Saturation characterization', '<p>'+esc(saturation)+'</p>')
    body += section('Problem-line and model diagnostics', ''.join(
        f'<figure><h3>{esc(title)}</h3><img class="fe-diagnostic" src="/assets/data/fe-publication/{path}?v={meta["generator_sha256"][:12]}" alt="{esc(title)}"><figcaption>{esc(caption)} <a href="{meta["source_url"]}/{source}">Source evidence</a></figcaption></figure>'
        for title, path, caption, source in plots))
    missing = [r for r in coverage if not r['resolved'] and r['tier'] != 'ALL']
    gf_missing = sum(r['log_gf'] is None for r in records)
    body += section('Download the evidence', f'<p>{len(records)} graded per-line measurements exported. Evidence for {len(missing)} graded products is missing or does not reproduce the feed; {gf_missing} exported lines lack an unambiguous gf match. The download is explicitly incomplete until those upstream records are supplied.</p><ul>'+''.join(
        f'<li><a download href="/assets/data/fe-publication/{path}">{label_}</a></li>' for path, label_ in [
            ('Fe_graded_perline.csv','Graded per-line abundances (CSV)'), ('Fe_products.csv','All product fields (CSV; nested fields preserved as JSON)'),
            ('Fe_perline_coverage.csv','Per-product line-evidence coverage (CSV)'), ('Fe.json','Source Fe.json'),
            ('fe-social-forest.png','Social forest (PNG)'), ('fe-social-forest.svg','Social forest (SVG)')])+'</ul>')
    body += section('Reproducibility', f'<p>Generator {esc(meta["generator"])} v{VERSION}<br>Science source commit <code>{meta["source_commit"]}</code><br>Fe.json v{esc(feed["version"])} · feed timestamp {esc(feed["updated_at"])}<br>Generated {esc(meta["generated_at"])}<br>Feed SHA-256 <code>{meta["feed_sha256"]}</code></p><p><a href="/assets/data/rya935/live_tracker.html">Refreshed product tracker</a> · <a href="/assets/data/fe-publication/manifest.json">Build manifest</a> · <a href="/systems/sol/elements/{"fe-ii" if ion=="I" else "fe"}/">Fe {"II" if ion=="I" else "I"} appendix</a></p>')
    body += section('References', '<ul>'
        '<li>Asplund, M., Amarsi, A. M. &amp; Grevesse, N. (2021). '
        '<a href="https://doi.org/10.1051/0004-6361/202140445">The chemical make-up of the Sun: A 2020 vision</a>. '
        'Astronomy &amp; Astrophysics, 653, A141. Green forest comparison: A(Fe) = 7.46 ± 0.04.</li>'
        '<li>Lodders, K., Bergemann, M. &amp; Palme, H. (2025). '
        '<a href="https://doi.org/10.1007/s11214-025-01146-w">Solar System Elemental Abundances from the Solar Photosphere and CI-Chondrites</a>. '
        'Space Science Reviews, 221, 23, Table 6. Gold forest comparison: present-day solar A(Fe) = 7.49 ± 0.01; this is not the proto-solar value.</li>'
        '</ul>')
    page = ROOT / f'systems/sol/elements/{"fe" if ion=="I" else "fe-ii"}/index.html'
    template = page.read_text()
    start, end = template.index('  <main'), template.index('</main>')+len('</main>')
    template = template[:start]+'  <main class="container fe-publication">\n'+body+'\n  </main>'+template[end:]
    import re
    template = re.sub(r'<script src="/assets/(?:js/(?:element-products|solar-report)|data/solar-report.generated)[^"]*"></script>\n?', '', template)
    template = re.sub(r'<link rel="stylesheet" href="/assets/css/(?:product-matrix)[^"]*">', '', template)
    template = re.sub(r'<p class="page-subtitle">.*?</p>', f'<p class="page-subtitle">Fe {ion} · measured products, uncertainty and reproducible evidence</p>', template)
    template = re.sub(r'<meta name="description" content="[^"]*">',
                      f'<meta name="description" content="Generated Solar Fe {ion} appendix: band-sectioned uncertainty forests, current products, problem-line evidence and reproducible downloads.">', template)
    if '/assets/css/element-products.css' not in template:
        template = template.replace('</head>', '  <link rel="stylesheet" href="/assets/css/element-products.css">\n</head>')
    if '/assets/css/fe-publication.css' not in template:
        template = template.replace('</head>', '  <link rel="stylesheet" href="/assets/css/fe-publication.css">\n</head>')
    page.write_text('\n'.join(line.rstrip() for line in template.splitlines())+'\n')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--science-root', type=Path, required=True)
    args = parser.parse_args()
    science = args.science_root.resolve()
    OUT.mkdir(parents=True, exist_ok=True)
    raw = (science / 'data/products/solar/Fe.json').read_bytes()
    feed = json.loads(raw)
    source_commit = subprocess.check_output(['git', '-C', str(science), 'rev-parse', 'HEAD'], text=True).strip()
    # Refuse unstamped local edits to science inputs; the tracker itself is regenerated.
    if subprocess.check_output(['git', '-C', str(science), 'diff', 'HEAD', '--', 'data/products/solar/Fe.json'], text=True):
        raise SystemExit('Fe.json differs from the source commit')
    products = [dict(p, publication_id=f'Fe-{i:03d}') for i, p in enumerate(feed['products'])]
    tracker = json.loads((science / 'data/results/rya935/live_status.json').read_text())
    actual = [p for p in tracker['products'] if p['element']=='Fe']
    for p, t in zip(products, actual):
        for key in ['ion','band','holding','selector','route','treatment','A','sigma_reported','n_lines']:
            if p.get(key) != t.get(key):
                raise SystemExit(f'Tracker differs from feed: {key}')
    if len(actual) != len(products):
        raise SystemExit('Tracker product count differs from feed')
    global REFERENCE
    REFERENCE = tracker['reference']['FeI']
    plt.rcParams.update({'font.family': 'monospace', 'svg.fonttype': 'path', 'svg.hashsalt': 'fe-publication-v1'})
    font = ROOT / 'assets/fonts/SpaceMono-Regular.ttf'
    if font.exists():
        from matplotlib import font_manager
        font_manager.fontManager.addfont(str(font))
        plt.rcParams['font.family'] = 'Space Mono'
    records, coverage = line_exports(science, products)
    plots, saturation = diagnostics(science, products)
    write_csv('Fe_products.csv', products)
    (OUT / 'Fe.json').write_bytes(raw)
    social = []
    for inst, band, route, treatment, tier in [
            ('harps','VIS','SYNTH','ENGINE-A-3DNLTE','ALL'),
            ('harps','VIS','SYNTH','ENGINE-A','GRADED'),
            ('harps','VIS','SYNTH','1D-LTE','GRADED'),
            ('crires_plus','H','SYNTH','1D-LTE','GRADED'),
            ('crires_plus','H','SYNTH','ENGINE-B-NLTE','GRADED')]:
        choices = [p for p in products if (p['instrument'],p['band'],p['route'],p['treatment'],p['tier']) == (inst,band,route,treatment,tier)]
        if len(choices) != 1:
            raise SystemExit(f'Social product identity is absent or ambiguous: {choices}')
        social.extend(choices)
    forest(social, REFERENCE, 'social', social=True)
    write_csv('Fe_social_products.csv', social)
    meta = {'generator':'scripts/generate_fe_publication.py', 'version':VERSION,
            'source_commit':source_commit, 'source_url':f'https://github.com/damienabraxas/exoplanetcodex/blob/{source_commit}',
            'generated_at':tracker['generated'], 'feed_version':feed['version'],
            'feed_sha256':hashlib.sha256(raw).hexdigest(), 'products':len(products),
            'perline_rows':len(records), 'resolved_products':sum(r['resolved'] for r in coverage),
            'held_products':sum(held(p) for p in products),
            'generator_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            'supplemental_sources':list(dict.fromkeys(['data/linelists/canonical_gf.csv',
                                    'data/linelists/linelist_solar.csv', 'data/reference/solar/CURRENT',
                                    'data/audit/rya515_fe_perline/fe2_blend_census.csv',
                                    'data/results/rya935/live_status.json']+[p[3] for p in plots]))}
    (OUT / 'manifest.json').write_text(json.dumps(meta, indent=2)+'\n')
    for ion in ['I','II']:
        render_page(ion, products, feed, meta, REFERENCE, records, coverage, plots, saturation)
    # Matplotlib leaves spaces at the ends of SVG path lines. Keep the generated
    # XML equivalent while avoiding whitespace-only failures in review diffs.
    for svg in OUT.glob('*.svg'):
        svg.write_text('\n'.join(line.rstrip() for line in svg.read_text().splitlines())+'\n')
    dest = ROOT / 'assets/data/rya935'
    for name in ['live_status.json','live_tracker.html']:
        shutil.copyfile(science / 'data/results/rya935' / name, dest / name)
    print(json.dumps(meta, indent=2))


if __name__ == '__main__':
    main()
