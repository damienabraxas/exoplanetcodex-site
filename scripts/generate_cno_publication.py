#!/usr/bin/env python3
"""Generate independently gated CNO appendices from a clean, pinned science checkout.

Feed products/quarantine/archive membership owns admission. No abundance analysis,
engine ranking, indicator averaging, or promotion from campaign prose happens here.
"""
from __future__ import annotations
import argparse
from collections import Counter
import csv
import hashlib
import html
import json
import math
from pathlib import Path
import re
import subprocess

from element_appendix_pdf import make_report, render_pdf
from cno_references import reconcile, render_references, SUPPLEMENT

ROOT = Path(__file__).resolve().parents[1]
OUT = Path('assets/data/cno-publication')
AUDIT = 'data/audit/rya1214_cno_products/'
IDENTITY = ('element', 'ion', 'band', 'instrument', 'holding', 'tier', 'selector', 'route', 'treatment', 'line_set', 'indicator')
NAMES = dict(C='Carbon', N='Nitrogen', O='Oxygen')
#: Reader-facing instrument names. Unknown ids fall through unchanged rather than raising.
LABELS = {'harps': 'HARPS', 'kpno_solar_atlas': 'Kitt Peak',
          'iag_fts_solar_atlas': 'IAG FTS', 'crires_plus': 'CRIRES+'}
CONTEXT = {
    'C': 'Carbon is traced by atomic C I, including forbidden [C I], and molecular CH, C₂ and CO indicators. Each probes different line formation and molecular-equilibrium sensitivities. Indicator families and atmospheric treatments remain separate products.',
    'N': 'The nitrogen strategy uses red-optical N I as the primary atomic route, with NH providing an independent molecular check and CN a carbon-dependent cross-check. An unresolved or unconstrained fit supplies no adopted Solar nitrogen abundance.',
    'O': 'Oxygen is traced by forbidden [O I], permitted O I and molecular OH indicators where available. Blends, departures from LTE and atmospheric structure affect these families differently, so their results retain separate identities.'}
GUIDE = ('Each row is one independent product, preserving its band, holding, engine, indicator and line set. '
         'Engines and indicator families are never averaged. Solid bars show the supplied statistical uncertainty; '
         'wireframes show the supplied systematic uncertainty. The statistical basis and any incomplete error budget remain attached to the row. '
         'Grades describe the supplied line-pool provenance, not engine quality; evaluated theoretical CNO oscillator strengths are not relabelled as laboratory evidence. '
         'Quarantined, failed and unconstrained fits have no abundance mark. Experimental products remain explicitly not adopted. '
         'Literature references provide context, never tuning targets.')


def esc(v):
    return html.escape(str(v if v is not None else 'not supplied'))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def total_sigma(p):
    return math.sqrt((p.get('sigma_stat') or 0.0) ** 2 + (systematic(p) or 0.0) ** 2)


def eligible_for_headline(p):
    """A rejected diagnostic stays in the forest but never headlines the page."""
    return str(p.get('selector') or '') not in REJECTED_SELECTORS


def band_highlights(products):
    """One card per band: the tightest total uncertainty, Reference Grade preferred.

    Fe's rule, with the rejected diagnostics removed first. Without that removal N's VIS
    card would read 7.384 +/- 1.134 from CN_red -- the route the ratified policy rejects,
    whose chi2 surface is flat enough that its xi leg did not converge.
    """
    out = []
    for band in in_band_order(list(dict.fromkeys(p['band'] for p in products))):
        rows = [p for p in products if p['band'] == band and eligible_for_headline(p)]
        if not rows:
            continue
        ref = [p for p in rows if p.get('grade') == 'Reference Grade']
        out.append(min(ref or rows, key=lambda q: (total_sigma(q), q.get('holding', ''))))
    return out


def landmark(element, products):
    """The one number at the top: tightest Reference Grade, VIS preferred on a tie."""
    rows = [p for p in products if eligible_for_headline(p)]
    if not rows:
        return None
    ref = [p for p in rows if p.get('grade') == 'Reference Grade']
    return min(ref or rows, key=lambda q: (round(total_sigma(q), 4),
                                           0 if q['band'] == 'VIS' else 1,
                                           q.get('holding', '')))


def recipe(element, products):
    """How the number was made -- read off the products, not written as prose.

    The Fe appendix carries per-band detail a reader can follow; CNO had a context
    paragraph, a forest, and then a JSON dump. This is the missing middle: for each band,
    which indicators were measured, on which spectrum, with which engine and treatment,
    how many lines survived, and what dominates the error bar.
    """
    if not products:
        return ''
    rows = ''
    for band in in_band_order(list(dict.fromkeys(p['band'] for p in products))):
        group = [p for p in products if p['band'] == band]
        sel = sorted({str(p.get('selector') or 'full pool') for p in group})
        holdings = sorted({p['holding'] for p in group})
        treat = sorted({f"{p['route']} · {p['treatment']}" for p in group})
        dom = sorted({str(p.get('dominant_term') or 'not attributed') for p in group})
        lines = sorted({p['n_lines'] for p in group})
        excl = sum(p.get('n_excluded') or 0 for p in group)
        rung = sorted({str(p.get('gf_rung_summary') or 'not recorded') for p in group})
        rows += (f'<tr><th scope="row">{esc(band)}</th>'
                 f'<td>{esc(", ".join(sel))}</td>'
                 f'<td>{esc(", ".join(holdings))}</td>'
                 f'<td>{esc(", ".join(treat))}</td>'
                 f'<td>{esc(", ".join(str(n) for n in lines))}'
                 + (f' <small>({excl} excluded)</small>' if excl else '') + '</td>'
                 f'<td>{esc(", ".join(dom))}</td>'
                 f'<td>{esc(", ".join(rung))}</td></tr>')
    return ('<p class="product-section-intro"><strong>How this was measured.</strong> One row '
            'per band. The indicator set is what was fitted; the holding is the solar spectrum '
            'it was fitted against; the engine and treatment say how. <em>Dominant term</em> is '
            'the largest single contributor to the reported uncertainty, and <em>gf rung</em> is '
            'the pedigree of the oscillator strengths that pool could reach.</p>'
            '<div class="table-scroll"><table class="product-recipe">'
            '<thead><tr><th>Band</th><th>Indicator set</th><th>Holding</th><th>Engine · treatment</th>'
            '<th>Lines</th><th>Dominant term</th><th>gf rung</th></tr></thead>'
            f'<tbody>{rows}</tbody></table></div>')


def section(title, body):
    return f'<section class="fe-section"><h2>{esc(title)}</h2>{body}</section>'


def identity(p):
    return {k: p.get(k) for k in IDENTITY}


def finite(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool) and math.isfinite(v)


def systematic(p):
    return p.get('sigma_syst_complete') if p.get('sigma_syst_complete') is not None else p.get('sigma_syst')


def audit_feed(feed, telluric):
    """Fail closed; preserve every input row, even when it cannot carry a mark."""
    if feed.get('schema') != 'codex.element_product/1':
        raise ValueError('Unsupported product schema')
    audit, visible, seen = [], [], set()
    for bucket in ('products', 'quarantine', 'archive', 'superseded'):
        for index, original in enumerate(feed.get(bucket, [])):
            p = dict(original)
            key = json.dumps(identity(p), sort_keys=True)
            pid = feed['element'] + '-' + bucket + '-' + digest((key + str(index)).encode())[:12]
            reasons = []
            if bucket != 'products':
                reasons.append(p.get('quarantine_reason') or f'{bucket}: not a current admitted product')
            else:
                if key in seen:
                    raise ValueError('Ambiguous current product identity: '+key)
                seen.add(key)
                if p.get('quarantine_codes') or p.get('quarantine_reason'):
                    reasons.append(p.get('quarantine_reason') or ', '.join(p['quarantine_codes']))
                # An unrecognized future disposition requires an explicit adapter.
                if p.get('adoption') not in (None, '', 'ADOPTED', 'EXPERIMENTAL-NOT-ADOPTED'):
                    reasons.append('adoption: '+str(p['adoption']))
                for field in ('disposition', 'publication_disposition', 'fit_status'):
                    if p.get(field) not in (None, '', 'MEASURED', 'PUBLISHED', 'ADOPTED', 'VALID', 'SUCCESS'):
                        reasons.append(field+': '+str(p[field]))
                if p.get('reliable') is False or p.get('valid') is False or p.get('constrained') is False or p.get('railed') is True:
                    reasons.append('failed/unreliable/unconstrained fit')
                if not finite(p.get('A')) or not finite(p.get('n_lines')) or p['n_lines'] <= 0:
                    reasons.append('no finite measured abundance / positive line count')
                if p.get('element') != feed['element']:
                    reasons.append('product element differs from feed')
                sy = systematic(p)
                if not finite(p.get('sigma_stat')) or p['sigma_stat'] <= 0 or not finite(sy) or sy < 0:
                    reasons.append('missing, nonfinite or invalid uncertainty; no zero substitution')
                if telluric.get(p.get('holding')) != 'applied':
                    reasons.append('telluric correction not verified by holding registry')
                if any(not p.get(k) for k in ('element', 'ion', 'band', 'instrument', 'holding', 'route', 'treatment', 'display', 'grade')):
                    reasons.append('required product identity / grade not supplied')
            disposition = bucket if bucket != 'products' else p.get('adoption') or 'products'
            row = dict(publication_id=pid, source_bucket=bucket, source_index=index,
                       identity=identity(p), disposition=disposition,
                       quarantine_codes=p.get('quarantine_codes', []),
                       visible=not reasons, omission_reason='; '.join(reasons))
            audit.append(row)
            if not reasons:
                visible.append(dict(p, publication_id=pid))
    return visible, audit


def select_highlights(products, selectors):
    result = []
    for selector in selectors:
        if not selector or set(selector) - set(IDENTITY):
            raise ValueError('Highlight selectors must use scientific identity fields')
        matches = [p for p in products if all(p.get(k) == v for k, v in selector.items())
                   and p.get('adoption') != 'EXPERIMENTAL-NOT-ADOPTED']
        if len(matches) != 1:
            raise ValueError('Required highlighted product missing or ambiguous: '+json.dumps(selector))
        if matches[0] in result:
            raise ValueError('Duplicate highlight selector')
        result.extend(matches)
    return result


def product_label(p):
    indicator = p.get('indicator') or p.get('selector') or 'indicator not supplied'
    line_set = p.get('line_set') or 'line set not supplied'
    return f'{indicator} · {p["element"]} {p["ion"]} · {p["display"]} · {p["route"]} · {p["treatment"]} · {line_set}'


#: AGSS21 photospheric abundances -- config/constants.SOLAR_ASPLUND2021 in the science
#: repo, read there and mirrored here so the plot cannot drift from the reference the
#: rest of the Codex compares against. The Fe forest draws the same line for iron; CNO
#: was drawing none at all, so a reader had no fixed point to judge a row against.
#:
#: ⚠️ VALUE ONLY, NO BAND. Fe shades +/- sigma_external because its tracker supplies one.
#: AGSS21's published uncertainties are not in the science repo, and inventing a width
#: would put an unsourced error band on a public plot.
ASPLUND2021 = {'C': 8.46, 'N': 7.83, 'O': 8.69}

#: AGSS21's OWN published uncertainties (Asplund, Amarsi & Grevesse 2021, Table 2). The Fe
#: forest shades +/- sigma_external around its reference; CNO now does the same, so the
#: reference reads as a measurement with a bar rather than an infinitely sharp line.
#: These are the paper's stated values, not a width invented to make a band appear.
ASPLUND2021_SIGMA = {'C': 0.04, 'N': 0.07, 'O': 0.04}

#: Diagnostics the ratified RYA-1220 policy REJECTS as abundance routes. They stay in the
#: feed and in the forest -- withdrawing evidence is not the same as hiding it -- but they
#: may never be the headline or a band highlight. CN_red carries a 1.134 dex bar and a
#: chi2 surface so flat its xi leg would not converge; putting it at the top of the page
#: as "the nitrogen result" would be the worst thing on here.
REJECTED_SELECTORS = ('MOL-CN_red', 'MOL-NH_AX')

#: Per-element standing caveats, shown directly under the headline. Nitrogen's is not a
#: hedge: the offset has a named cause. The solar phase_c verdict records that the NLTE
#: debt is CLEARED -- the Amarsi 2020 grid gives -0.0115/-0.0145/-0.0154 per line, because
#: N I red is near-LTE at the Sun -- and that the surviving ~+0.36 is a gf/data-channel
#: floor (RYA-161), curation owed, explicitly NOT to be tuned away.
PRELIMINARY = {
    'N': ('PRELIMINARY. This value sits +0.36 dex above the Asplund 2021 reference and is '
          'not yet a settled result. The cause is identified and is not the NLTE treatment: '
          'the N I NLTE correction is measured and small (-0.0115 / -0.0145 / -0.0154 dex '
          'per line, because N I red is near-LTE at the Sun), and the surviving offset is a '
          'gf / data-channel floor on the Kitt Peak red multiplets (RYA-161) that is owed '
          'curation. It is published because withholding a measured number is not the same '
          'as correcting it \u2014 but expect it to move.'),
}

#: Spectral order, matching generate_fe_publication.BANDS. The cards are colour-coded by
#: spectral region, so emitting them in feed order put red-optical before VIS on oxygen --
#: the colours then read backwards against the wavelength they encode. K is appended for
#: the CO band, which Fe has no products in. Anything unrecognised sorts last, in the
#: order it appeared, rather than being dropped.
BAND_ORDER = ['near-UV', 'VIS', 'red-optical', 'NIR', 'H', 'J', 'K']

LODDERS_TABLE = 'data/reference/solar/lodders2025_table6.csv'


def lodders_comparator(science, element):
    """Lodders, Bergemann & Palme 2025 Table 6, PRESENT-DAY Sun.

    The Fe forest draws this as a second, yellow band beside the Asplund reference; CNO
    drew no comparator at all, and .cmp / .cmpband were sitting unused in the stylesheet
    exactly as .ref was.

    ⚠️ PRESENT-DAY, NOT PROTO-SOLAR. Table 6 publishes both, and the proto-solar column
    is ~0.09 dex higher across every element -- picking the wrong one would silently shift
    the comparator by more than our carbon offset from Asplund.
    """
    path = science / LODDERS_TABLE
    if not path.exists():
        return None
    with path.open() as fh:
        for row in csv.DictReader(r for r in fh if not r.startswith('#')):
            if row.get('element') == element:
                try:
                    return {'name': 'Lodders, Bergemann & Palme 2025',
                            'value': float(row['A_present']),
                            'sigma': float(row['sigma_present'])}
                except (TypeError, ValueError, KeyError):
                    return None
    return None


def in_band_order(bands):
    known = [b for b in BAND_ORDER if b in bands]
    return known + [b for b in bands if b not in BAND_ORDER]


def forest(element, products, cmp=None):
    if not products:
        return '<p class="product-pending">No publication-eligible abundance products. Quarantined entries are documented below without plotted values.</p>'
    out = '<div class="product-forest"><div class="product-forest-inner">'
    # Use all actual bands/holdings, including future molecular taxonomy, with no
    # Fe plot_grid tier preference, alternate collapse, or fixed instrument list.
    for band in in_band_order(list(dict.fromkeys(p['band'] for p in products))):
        rows = [p for p in products if p['band'] == band]
        extent = [(p['A']-max(p['sigma_stat'], systematic(p)),
                   p['A']+max(p['sigma_stat'], systematic(p))) for p in rows]
        # The axis ALWAYS spans the Asplund reference. Auto-ranging on the products alone
        # drops the line whenever a band sits clear of it -- which is precisely the band a
        # reader most needs it for. C red-optical (8.56-8.98 against a reference of 8.46)
        # rendered with no reference at all.
        ref = ASPLUND2021.get(element)
        rsig = ASPLUND2021_SIGMA.get(element, 0.0)
        values = [v for pair in extent for v in pair] + (
            [ref - rsig, ref + rsig] if ref is not None else [])
        if cmp is not None:
            values += [cmp['value'] - cmp['sigma'], cmp['value'] + cmp['sigma']]
        lo, hi = min(values) - .03, max(values) + .03
        def x(v): return (v-lo)/(hi-lo)*100
        out += f'<div class="forest-band">{esc(band)}</div>'
        for holding in dict.fromkeys(p['holding'] for p in rows):
            group = [p for p in rows if p['holding'] == holding]
            out += f'<div class="forest-instrument">{esc(group[0]["instrument"])}<small>{esc(holding)}</small></div>'
            for p in group:
                experimental = p.get('adoption') == 'EXPERIMENTAL-NOT-ADOPTED'
                attr = ' data-experimental="true" style="--accent:#f07848;--text:#f07848;--text-dim:#f07848"' if experimental else ''
                st, sy = p['sigma_stat'], systematic(p)
                rsig = ASPLUND2021_SIGMA.get(element, 0.0)
                marks = ''
                if ref is not None:
                    # Fe uses axvspan + axvline across the whole plot; the HTML equivalent
                    # is the same band drawn in every row's track, FIRST so the product
                    # marks sit on top of it.
                    marks += (f'<i class="ref" style="left:{x(ref-rsig):.6f}%;'
                              f'width:{2*rsig/(hi-lo)*100:.6f}%"></i>'
                              f'<i class="refline" style="left:{x(ref):.6f}%"></i>')
                if cmp is not None:
                    marks += (f'<i class="cmpband" title="{esc(cmp["name"])}" '
                              f'style="left:{x(cmp["value"]-cmp["sigma"]):.6f}%;'
                              f'width:{2*cmp["sigma"]/(hi-lo)*100:.6f}%"></i>'
                              f'<i class="cmp" style="left:{x(cmp["value"]):.6f}%"></i>')
                marks += ''.join(f'<i class="{kind}" style="left:{x(p["A"]-sigma):.6f}%;width:{2*sigma/(hi-lo)*100:.6f}%"></i>' for kind,sigma in [('sysbar',sy),('bar',st)])
                marks += f'<i class="dot" style="left:{x(p["A"]):.6f}%"></i>'
                out += (f'<div class="forest" data-product-id="{p["publication_id"]}"{attr}><span class="forest-label">{esc(product_label(p))}'
                        f'<small>{esc(p["grade"])} · {esc(p.get("tier"))} · n={p["n_lines"]}'
                        + (' · EXPERIMENTAL-NOT-ADOPTED' if experimental else '')
                        + f'</small></span><span class="track">{marks}</span><span class="forest-value">{p["A"]:.3f}'
                        f'<small>±{st:.3f} stat ±{sy:.3f} syst</small></span></div>')
        if ref is not None:
            rs = ASPLUND2021_SIGMA.get(element, 0.0)
            out += (f'<p class="forest-reference-note">Green band: Asplund, Amarsi &amp; '
                    f'Grevesse 2021 photospheric reference, A({element}) = {ref:.2f} '
                    f'&plusmn; {rs:.2f}, drawn behind every row.'
                    + (f' Yellow band: {esc(cmp["name"])}, {cmp["value"]:.2f} '
                       f'&plusmn; {cmp["sigma"]:.2f} (present-day Sun).' if cmp else '')
                    + '</p>')
        ticks = ''.join(f'<span class="tick" style="left:{j*25}%">{lo+(hi-lo)*j/4:.2f}</span>' for j in range(5))
        out += f'<div class="axis"><span></span><span class="ticks">{ticks}</span><span class="forest-value">A({element}) dex</span></div>'
    return out+'</div></div>'


def source_evidence(science, element):
    paths = ['data/refs/bibliography.csv', 'data/catalog/holdings_manifest_registry.csv', 'docs/co_indicator_strategy.md',
             AUDIT+'cno_gf_adjudication.prov.json', AUDIT+'agss21_indicator_gf_check.csv']
    pedigree = json.loads((science/paths[3]).read_text())
    notes = []
    if element == 'O':
        with (science/paths[4]).open() as f:
            checks = [r for r in csv.DictReader(f) if r['element']=='O' and 'DISAGREES' in r['verdict']]
        notes.extend(f'{r["species"]} {r["line_label"]}: {r["verdict"]}. {r["grade_verdict"]}. '
                     f'Store log gf {r["store_log_gf"]} ({r["store_nist_grade"]}); summed pull {r["pull_log_gf_summed"]} ({r["pull_grade_worst"]}).' for r in checks)
        notes.append(pedigree['oi_777_decision'])
    if element == 'N': notes.append(pedigree['n_i_caveat'])
    notes = list(dict.fromkeys(notes))
    return paths, notes



def build(science, element, selectors, site=ROOT):
    feed_path = f'data/products/solar/{element}.json'
    paths, notes = source_evidence(science, element)
    paths = [feed_path] + paths
    dirty = subprocess.check_output(['git','-C',str(science),'status','--porcelain','--',*paths],text=True)
    if dirty: raise ValueError('Science inputs differ from committed provenance: '+dirty)
    commit = subprocess.check_output(['git','-C',str(science),'rev-parse','HEAD'],text=True).strip()
    stamp = subprocess.check_output(['git','-C',str(science),'show','-s','--format=%cI','HEAD'],text=True).strip()
    feed = json.loads((science/feed_path).read_text())
    if feed.get('element') != element: raise ValueError('Element identity mismatch')
    with (science/'data/catalog/holdings_manifest_registry.csv').open() as f:
        telluric = {r['holding_id']:r['telluric_applied'] for r in csv.DictReader(f)}
    products, audit = audit_feed(feed, telluric)
    highlights = select_highlights(products, selectors)
    reference_bundle = reconcile(science, element, feed, audit)
    refs = reference_bundle["references"]
    paths = list(dict.fromkeys(paths + reference_bundle["source_paths"]))
    dirty = subprocess.check_output(["git", "-C", str(science), "status", "--porcelain", "--", *paths], text=True)
    if dirty: raise ValueError("Reference inputs differ from committed provenance: " + dirty)
    status = 'products' if any(p.get('adoption') != 'EXPERIMENTAL-NOT-ADOPTED' for p in products) else 'NOT_YET_DEFENSIBLE'
    base = f'https://github.com/damienabraxas/exoplanetcodex/blob/{commit}'
    meta = dict(generator='scripts/generate_cno_publication.py', version='1.0.0', source_commit=commit,
                source_url=base, generated_at=stamp, timestamp_basis='source commit timestamp (deterministic build)',
                feed_version=feed['version'], feed_updated_at=feed['updated_at'],
                feed_sha256=digest((science/feed_path).read_bytes()),
                source_sha256={p:digest((science/p).read_bytes()) for p in paths},
                generator_sha256=digest(Path(__file__).read_bytes()),
                reference_resolver_sha256=digest((ROOT/'scripts/cno_references.py').read_bytes()),
                reference_supplement_sha256=digest(SUPPLEMENT.read_bytes()),
                reference_count=len(refs),
                template_sha256=digest((ROOT/'systems/sol/elements/fe/index.html').read_bytes()),
                highlight_selectors_sha256=digest(json.dumps(selectors,sort_keys=True).encode()),
                pdf_generator_sha256=digest((ROOT/'scripts/element_appendix_pdf.py').read_bytes()),
                counts={b:len(feed.get(b,[])) for b in ('products','quarantine','archive','superseded')},
                visible_products=len(products), dispositions=dict(Counter(r['disposition'] for r in audit)),
                highlight_selectors=selectors, status=status)
    no_adopted = 'No adopted Solar '+NAMES[element].lower()+' abundance is available from this feed.'
    # No version stamp at the top. Fe leads with its anchor; CNO led with
    # "C.json v1.19 · 17 visible products · 0 quarantined entries", which tells a reader
    # nothing about the Sun. The feed version and hashes live under Reproducibility.
    mark = landmark(element, products)
    if mark is not None:
        aref, asig = ASPLUND2021.get(element), ASPLUND2021_SIGMA.get(element, 0.0)
        # ⚠️ The reference paragraph is built SEPARATELY and concatenated. Inlining it as
        # `... + (X if cond else '') f'<p>...'` silently swallowed the rest of the header:
        # `else ''` and the next f-string are adjacent LITERALS, so Python folded them
        # into the else branch and the true branch returned only the reference line.
        ref_html = ''
        if aref is not None:
            ref_html = (f'<p class="fe-anchor-reference">Asplund, Amarsi &amp; Grevesse '
                        f'2021: {aref:.2f} &plusmn; {asig:.2f} &nbsp;&middot;&nbsp; '
                        f'this measurement {mark["A"] - aref:+.3f} dex</p>')
        caveat = PRELIMINARY.get(element)
        caveat_html = (f'<p class="fe-anchor-caveat">{esc(caveat)}</p>') if caveat else ''
        body = (f'<p class="fe-anchor">Solar {NAMES[element].lower()}: '
                f'{mark["A"]:.3f} &plusmn; {total_sigma(mark):.3f}</p>'
                + ref_html + caveat_html
                + f'<p>{esc(LABELS.get(mark["instrument"], mark["instrument"]))} &middot; '
                f'{esc(mark["band"])} &middot; {esc(mark["grade"])} &middot; '
                f'{esc(str(mark.get("selector") or "full pool"))} &middot; '
                f'{esc(mark["treatment"])} &middot; n = {mark["n_lines"]}. '
                f'The tightest admitted product; independent products and engines are '
                f'not averaged together.</p>')
    else:
        body = f'<p class="fe-anchor">{esc(status)}</p><p>{esc(no_adopted)}</p>'
    cards = []
    for p in band_highlights(products):
        spectrum = 'uv' if p['band']=='near-UV' else 'visible' if p['band'] in ('VIS','red-optical') else 'ir'
        cards.append(f'<article class="fe-highlight-{spectrum}" data-highlight-product="{p["publication_id"]}"><h3>{esc(p["band"])}</h3>'
                     f'<strong>{p["A"]:.3f}</strong><p>±{p["sigma_stat"]:.3f} stat · ±{systematic(p):.3f} syst</p>'
                     f'<p>{esc(product_label(p))} · {esc(p["holding"])} · {esc(p["grade"])}</p></article>')
    body += section('Highlighted Products','<div class="fe-highlights">'+''.join(cards)+'</div>'+('' if cards else '<p>No adopted highlighted product has been selected. '+esc(no_adopted if status != 'products' else 'See the independent products below.')+'</p>'))
    body += '<section class="product-section"><h2>Error-bar Forest Plot</h2>'+forest(element, products, lodders_comparator(science, element))+f'<p class="product-section-intro"><strong>How to read this forest.</strong> {GUIDE}</p></section>'
    body += section('How this was measured', recipe(element, products))
    body += section('Solar '+NAMES[element].lower()+' context',f'<p>{CONTEXT[element]}</p><p><a href="{base}/docs/co_indicator_strategy.md">C/O indicator strategy</a> · <a href="/method/">Methodology</a>' + (' · <a href="https://linear.app/ryans-adventure-zone/issue/RYA-369">Nitrogen strategy</a>' if element=='N' else '')+'</p>')
    if products:
        # The 'Product provenance and caveats' section used to esc(json.dumps(...)) the
        # whole product record onto the page -- a debug dump, not a caveat. Provenance
        # belongs in manifest.json and the downloadable feed, both linked below.
        pass
    if notes:
        body += section('Open provenance decisions', ''.join('<p>'+esc(n)+'</p>' for n in notes)+f'<p><a href="{base}/{AUDIT}cno_gf_adjudication.prov.json">Adjudication record</a> · <a href="{base}/{AUDIT}agss21_indicator_gf_check.csv">Indicator gf checks</a></p>')
    omitted = [r for r in audit if not r['visible']]
    # Product visibility audit: machine bookkeeping, not reader-facing. It ships as
    # visibility.json and is linked under 'Download the evidence'. With every product
    # visible it rendered an empty <details> anyway.
    pdf = f'solar_{element.lower()}_appendix.pdf'
    body += section('Download the evidence',f'<p><a download href="/assets/docs/appendices/{pdf}">Download PDF — Solar {element} appendix</a></p><ul>'
                    +''.join(f'<li><a download href="/{OUT}/{element}/{name}">{esc(label)}</a></li>' for name,label in [(element+'.json','Source feed — includes quarantined fit outputs, not adopted abundances'),('visibility.json','Complete product visibility audit'),('report.json','Shared website/PDF report'),('manifest.json','Reproducibility manifest'),('references.json','Complete references and product-to-source bindings')])+'</ul>')
    body += section('Reproducibility',f'<p>Generated from the pinned CNO campaign snapshot. Source commit <code>{commit}</code><br>Feed {element}.json v{esc(feed["version"])} · updated {esc(feed["updated_at"])}<br>Generated {esc(stamp)} (source commit timestamp)<br>Feed SHA-256 <code>{meta["feed_sha256"]}</code><br>Generator {meta["generator"]} v{meta["version"]}</p><p><a href="{base}/{feed_path}">Pinned scientific source</a></p>')
    body += section('References / Data & Model Sources', render_references(reference_bundle, base))
    report = make_report('Solar '+element+' appendix','Sun',element,'',body,meta,products)
    report['site_url'] = f'https://exoplanetcodex.org/systems/sol/elements/{element.lower()}/'
    report.update(references=refs, reference_bindings=reference_bundle["bindings"], product_sources=reference_bundle["product_sources"], visibility_audit=audit, highlighted_products=highlights)
    dest = site/OUT/element
    dest.mkdir(parents=True,exist_ok=True)
    (dest/(element+'.json')).write_bytes((science/feed_path).read_bytes())
    for name,obj in [('manifest.json',meta),('visibility.json',audit),('report.json',report),('references.json',reference_bundle)]:
        (dest/name).write_text(json.dumps(obj,indent=2,ensure_ascii=False,allow_nan=False)+'\n')
    render_pdf(report,site/'assets/docs/appendices'/pdf,site)
    template = (ROOT/'systems/sol/elements/fe/index.html').read_text()
    start,end = template.index('  <main'),template.index('</main>')+len('</main>')
    template = template[:start]+'  <main class="container fe-publication">\n'+body+'\n  </main>'+template[end:]
    template = template.replace('Solar Iron Appendix','Solar '+NAMES[element]+' Appendix').replace('Iron <em>',''+NAMES[element]+' <em>').replace('<span>Fe Appendix</span>',f'<span>{element} Appendix</span>')
    template = re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="Solar {element} products, publication dispositions, independent indicators and downloadable appendix.">',template)
    template = re.sub(r'<p class="page-subtitle">.*?</p>',f'<p class="page-subtitle">{element} · products, publication readiness and reproducible evidence</p>',template)
    page=site/f'systems/sol/elements/{element.lower()}/index.html'
    page.parent.mkdir(parents=True,exist_ok=True)
    page.write_text(template)
    return meta


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--science-root',required=True,type=Path)
    parser.add_argument('--elements',nargs='+',choices=list(NAMES),default=list(NAMES))
    parser.add_argument('--highlight-selectors',type=Path,default=ROOT/'scripts/cno-highlight-selectors.json')
    args=parser.parse_args()
    selectors=json.loads(args.highlight_selectors.read_text())
    failures=[]
    for element in args.elements:
        try:
            meta=build(args.science_root.resolve(),element,selectors[element])
            print(element,json.dumps({k:meta[k] for k in ('status','counts','visible_products')}))
        except (ValueError,KeyError,OSError) as exc:
            failures.append(element+': '+str(exc))
    if failures: raise SystemExit('\n'.join(failures))

if __name__=='__main__': main()
