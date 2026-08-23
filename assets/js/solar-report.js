(function () {
  'use strict';

  var report = window.SOLAR_REPORT;
  var introRoot = document.getElementById('solar-observing-intro');
  var overviewRoot = document.getElementById('solar-report');
  var appendixRoot = document.getElementById('solar-element-appendix');
  var sourcesRoot = document.getElementById('solar-sources');
  if ((!introRoot && !overviewRoot && !appendixRoot && !sourcesRoot) || !report) return;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"]/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char];
    });
  }

  function number(value, digits) {
    return typeof value === 'number' ? value.toFixed(digits == null ? 2 : digits) : '—';
  }

  function signed(value) {
    if (typeof value !== 'number') return '—';
    return (value >= 0 ? '+' : '') + value.toFixed(3);
  }

  function readableEngine(value) {
    return { '1D-LTE': '1D LTE', 'ENGINE-A': 'Engine A', 'ENGINE-B': 'Engine B',
      'ENGINE-B-NLTE': 'Engine B NLTE', 'PROFILEFIT': 'Profile fit', 'SYNTH': 'Synthesis' }[value] || value || 'unspecified';
  }

  function readableProduct(product) {
    return (product.displayName || readableEngine(product.engine))
      .replace(/^ew\b/, 'EW').replace(/^synth\b/, 'Synth');
  }

  function elementRows(elements) {
    return elements.map(function (element) {
      var hasAppendix = Boolean(element.appendixPath);
      var species = element.symbol + (element.ion ? ' ' + element.ion : '');
      var label = hasAppendix
        ? '<a class="solar-element-link" href="' + esc(element.appendixPath) + '">' + esc(species) + '<span class="sr-only"> — open appendix page</span></a>'
        : '<span class="solar-element-symbol">' + esc(species) + '</span>';
      var measurement = element.primary || element.primaryValue;
      var primary = measurement
        ? number(measurement.value, 3) + (measurement.sigmaTotal == null ? '' : ' <span class="solar-sigma">± ' + number(measurement.sigmaTotal, 2) + '</span>')
        : '<span class="solar-novalue" title="' + esc(element.measurementNote) + '">no ratified value</span>';
      // Publish the tracker's own Δ where it has one; only fall back to arithmetic
      // when no artifact declares it (RYA-845: declare a number once).
      var delta = typeof element.delta === 'number' ? signed(element.delta)
        : (measurement && typeof element.asplund === 'number' ? signed(measurement.value - element.asplund) : '—');
      var lineCount = measurement && measurement.lineCount ? ' · n = ' + esc(measurement.lineCount) : '';
      var role = element.measurementRole
        ? '<span class="solar-row-role">' + esc(element.measurementRole) + lineCount + '</span>'
        : (element.tier ? '<span class="solar-row-tier">' + esc(element.tier) + lineCount + '</span>' : '');
      var searchText = [element.symbol, element.ion, element.name, element.status, element.tier, element.measurementNote].join(' ').toLowerCase();
      return '<tr data-element-search="' + esc(searchText) + '" class="' + (hasAppendix ? 'has-appendix' : 'no-appendix') + (element.childOf ? ' solar-species-child' : '') + '">' +
        '<td class="solar-z">' + esc(element.atomicNumber) + '</td>' +
        '<td>' + label + '</td><td>' + esc(element.name) + role + '</td>' +
        '<td class="solar-number solar-primary">' + primary + '</td>' +
        '<td class="solar-number">' + number(element.asplund, 2) + '</td>' +
        '<td class="solar-number">' + delta + '</td>' +
        '<td><span class="solar-status">' + esc(element.status) + '</span></td></tr>';
    }).join('');
  }

  function productRows(products) {
    return products.map(function (product) {
      return '<tr><td>' + esc(product.band) + '</td><td>' + esc(product.instrument) + '</td>' +
        '<td>' + esc(readableProduct(product)) + '<span class="solar-method">' + esc(readableEngine(product.method)) + '</span><span class="solar-method">' + esc(product.telluric || 'telluric: not declared') + '</span></td>' +
        '<td class="solar-number">' + number(product.value, 3) + ' ± ' + number(product.sigma, 2) + '</td>' +
        '<td class="solar-number">' + esc(product.lineCount) + '</td>' +
        '<td><span class="solar-role ' + esc(product.role) + '">' + esc(product.role) + '</span></td></tr>';
    }).join('');
  }

  function plotRows(products, references, options) {
    options = options || {};
    var all = products.map(function (p) { return [p.value - p.sigma, p.value + p.sigma]; });
    references.forEach(function (r) { all.push([r.value - r.sigma, r.value + r.sigma]); });
    var min = Math.min.apply(null, all.map(function (v) { return v[0]; })) - 0.03;
    var max = Math.max.apply(null, all.map(function (v) { return v[1]; })) + 0.03;
    var span = max - min;
    function pct(value) { return ((value - min) / span * 100).toFixed(2); }
    var ticks = [0, .25, .5, .75, 1].map(function (fraction) {
      return '<span>' + (min + span * fraction).toFixed(2) + '</span>';
    }).join('');

    var bandNames = { 'near-UV': 'UV Data', 'VIS': 'VIS Data', 'red-optical': 'VIS Data', 'NIR': 'IR Data' };
    var bands = [];
    products.forEach(function (p) {
      var group = bandNames[p.band] || p.band;
      if (bands.indexOf(group) === -1) bands.push(group);
    });
    var literatureText = references.map(function (r) {
      return r.name + ' ' + number(r.value, 2) + ' ± ' + number(r.sigma, 2);
    }).join(' · ');
    var referenceMarkup = references.map(function (r, index) {
      return '<i class="solar-935-ref reference-' + index + '" title="' + esc(r.name) + ' ' + number(r.value, 2) + ' ± ' + number(r.sigma, 2) + '" style="left:' + pct(r.value - r.sigma) + '%;width:' + ((r.sigma * 2 / span) * 100).toFixed(2) + '%"></i>';
    }).join('');
    var axisLabel = options.axisLabel || 'A(Fe)';
    var axisMarkup = '<div></div><div class="solar-935-axis-track">' + ticks + '</div><div></div>' +
      '<div></div><div class="solar-935-axis-title">' + esc(axisLabel) + ' · dex</div><div></div>';
    return '<div class="solar-935-literature">Literature: ' + esc(literatureText) + ' dex · <span>' + esc(axisLabel) + '</span></div>' +
      '<div class="solar-935-plot">' +
      axisMarkup +
      bands.map(function (band) {
        var bandLabel = band;
        var bandRefs = references.map(function (r, index) {
          var shortName = String(r.name || '').replace(/\s+et al\..*$/i, '').replace(/\s+et al.*$/i, '');
          return '<span class="solar-935-band-ref reference-' + index + '">' + esc(shortName) + ' ' + number(r.value, 2) + '</span>';
        }).join('');
        var rows = products.filter(function (p) { return (bandNames[p.band] || p.band) === band; }).map(function (p) {
          var left = pct(p.value - p.sigma);
          var width = (p.sigma * 2 / span * 100).toFixed(2);
          var stat = typeof p.sigmaStat === 'number' ? p.sigmaStat : null;
          var statBar = stat == null ? '' : '<i class="solar-935-stat" style="left:' + pct(p.value - stat) + '%;width:' + ((stat * 2 / span) * 100).toFixed(2) + '%"></i>';
          var syst = typeof p.sigmaSys === 'number' ? p.sigmaSys : null;
          var systBar = syst == null ? '' : '<i class="solar-935-syst" style="left:' + pct(p.value - syst) + '%;width:' + ((syst * 2 / span) * 100).toFixed(2) + '%"></i>';
          var metadata = (p.lineCount != null ? 'n=' + p.lineCount + ' · ' : '') + (p.telluric || 'telluric: not declared');
          return '<div class="solar-935-row"><span>' + esc(p.band + ' · ' + readableProduct(p)) + '<small>' + esc(metadata) + '</small></span>' +
            '<span class="solar-935-track">' + referenceMarkup + systBar + statBar +
            '<i class="solar-935-dot" style="left:' + pct(p.value) + '%"></i>' +
            '</span><span>' + number(p.value, 3) + ' ± ' + number(p.sigma, 3) +
            (stat == null ? '' : '<small>stat ±' + number(stat, 3) + '</small>') +
            (syst == null ? '' : '<small>syst ±' + number(syst, 3) + '</small>') + '</span></div>';
        }).join('');
        return '<div class="solar-935-band-heading"><strong>' + esc(bandLabel) + '</strong><span>' + bandRefs + '</span></div>' + rows;
      }).join('') + '</div>' +
      '<div class="solar-935-legend"><span><i class="solar-935-key-ref"></i>literature interval</span><span><i class="solar-935-key-stat"></i>statistical σ</span><span><i class="solar-935-key-syst"></i>systematic σ</span></div>';
  }

  function diagnostics(records) {
    if (!records || !records.length) return '<p class="solar-empty">No generated diagnostic records.</p>';
    return '<div class="solar-diagnostics">' + records.map(function (record) {
      return '<article><p class="solar-diagnostic-category">' + esc(record.category) + '</p><h4>' + esc(record.line) + '</h4><p>' + esc(record.caption) + '</p><small>Disposition: ' + esc(record.status) + '</small></article>';
    }).join('') + '</div>';
  }

  function referenceList(keys) {
    var bibliography = report.bibliography || {};
    return '<ol class="solar-reference-list">' + (keys || []).map(function (key) {
      var reference = bibliography[key];
      if (!reference) return '';
      return '<li id="ref-' + esc(key) + '"><a href="' + esc(reference.url) + '" target="_blank" rel="noopener">' + esc(reference.label) + ' ↗</a><span>' + esc(reference.role) + '</span></li>';
    }).join('') + '</ol>';
  }

  function species(key) {
    var parts = String(key).split(' ');
    return report.elements.filter(function (element) {
      return element.symbol === parts[0] && (element.ion || '') === (parts[1] || '');
    })[0];
  }
  var appendixSpecies = (appendixRoot && appendixRoot.getAttribute('data-species')) || 'Fe I';
  var fe = species('Fe I');
  var alEvidence = report.alEvidence || { products: [], coverageGrid: [] };
  var feEvidence = report.feEvidence || { products: [], coverageGrid: [] };
  var meta = report.reproducibility;
  if (introRoot) {
    introRoot.innerHTML =
      '<div class="solar-introduction"><div><p class="solar-kicker">How the Sun is measured</p>' +
      '<p>The Solar record combines direct, high-resolution visible spectroscopy with independent solar atlases spanning the red optical and infrared. Each band and instrument remains a separate data product so differences in resolution, telluric contamination, and analysis method stay visible.</p></div>' +
      '<div class="solar-coverage-grid">' + report.observingCoverage.map(function (item) {
        return '<article><span>' + esc(item.band) + ' · ' + esc(item.range) + '</span><strong>' + esc(item.instrument) + '</strong><em>' + esc(item.status) + '</em><p>' + esc(item.role) + '</p><small>' + esc(item.detail) + '</small></article>';
      }).join('') + '</div></div>';
  }

  if (sourcesRoot) {
    sourcesRoot.innerHTML = '<p class="solar-copy">These records are drawn from the project bibliography. Element-specific analysis references appear on each generated appendix rather than being maintained by hand on this page.</p>' + referenceList(report.pageReferenceKeys) +
      '<div class="solar-credit-grid"><p><strong>Solar imagery</strong><br>NASA / Solar Dynamics Observatory</p><p><strong>Orbital geometry</strong><br>JPL semimajor axes · Kopparapu et al. (2013) conservative HZ</p><p><strong>Observations</strong><br>ESO 1102.D-0954(A) · PI Xavier Dumusque</p></div>';
  }
  if (overviewRoot) {
    overviewRoot.innerHTML =
      (report.mode === 'development' ? '<div class="solar-dev-banner">Development snapshot · not for publication</div>' : '<div class="solar-generated-banner">Generated from versioned science artifacts</div>') +
      '<p class="solar-report-lede">The Sun is the Codex calibration anchor. Select an element with an available measurement to open its generated appendix, products, uncertainties, and diagnostic evidence.</p>' +
      '<div class="solar-table-tools"><label for="solar-element-filter">Find an element</label><input id="solar-element-filter" type="search" placeholder="Symbol, name, or status…" autocomplete="off"><span id="solar-element-count" aria-live="polite"></span></div>' +
      '<div class="solar-table-wrap"><table class="solar-element-table"><thead><tr><th>Z</th><th>Species</th><th>Element / role</th><th>Reported A(X) ± σ</th><th>Asplund 2021</th><th>Δ</th><th>Status</th></tr></thead><tbody>' + elementRows(report.elements) + '</tbody></table></div>' +
      '<p class="solar-table-note">Every row is read from the generated element status tracker. Elements reading <em>no ratified value</em> have been measured but are curation-owed — the value is withheld rather than published provisionally; hover the cell for the method that is owed. Only species with a generated appendix are clickable.</p>';
    var elementFilter = document.getElementById('solar-element-filter');
    var elementCount = document.getElementById('solar-element-count');
    var elementTableRows = Array.prototype.slice.call(overviewRoot.querySelectorAll('tbody tr[data-element-search]'));
    function filterElements() {
      var query = (elementFilter.value || '').trim().toLowerCase();
      var shown = 0;
      elementTableRows.forEach(function (row) {
        var visible = !query || row.getAttribute('data-element-search').indexOf(query) !== -1;
        row.hidden = !visible;
        if (visible) shown += 1;
      });
      elementCount.textContent = query ? shown + ' of ' + elementTableRows.length + ' elements' : elementTableRows.length + ' elements';
    }
    elementFilter.addEventListener('input', filterElements);
    filterElements();
  }

  if (appendixRoot && appendixSpecies === 'Fe I') {
    var feDisplayProducts = feEvidence.products.length ? feEvidence.products : fe.products;
    appendixRoot.innerHTML =
    '<article class="solar-appendix">' +
      '<a class="solar-back" href="/systems/sol/#our-findings">← Back to Solar element table</a><p class="solar-kicker">Element appendix</p><h2>Iron <span>Fe</span></h2>' +
      '<div class="solar-hero"><div><span>Primary · graded</span><strong>' + number(fe.primary.value, 3) + ' <small>± ' + number(fe.primary.sigmaTotal, 2) + '</small></strong><p>' + esc(fe.primary.lineCount) + ' lines · ' + (typeof fe.primary.sigmaStat === 'number' ? 'stat ' + number(fe.primary.sigmaStat, 2) + ' · sys ' + number(fe.primary.sigmaSys, 2) : esc(fe.primary.sigmaBasis || 'total uncertainty only')) + '</p></div>' +
      '<div class="secondary"><span>Secondary · all accepted lines</span><strong>' + number(fe.secondary.value, 3) + ' <small>± ' + number(fe.secondary.sigmaTotal, 2) + '</small></strong><p>' + esc(fe.secondary.lineCount) + ' lines · broader gf floor; broader does not mean bad</p></div></div>' +
      '<h4 class="solar-subhead">RYA-935 product matrix · instrument × band</h4>' + productMatrix(feDisplayProducts, feEvidence.coverageGrid) +
      '<p class="solar-table-note">The matrix preserves every RYA-935 product identity. Telluric state is shown as not declared when the source product has no holding attribution.</p>' +
      '<h4 class="solar-subhead">RYA-935 band × instrument × engine products</h4><div class="solar-table-wrap"><table class="solar-product-table"><thead><tr><th>Band</th><th>Instrument / holding</th><th>Engine / treatment / telluric</th><th>A(Fe) ± σ</th><th>N</th><th>Role</th></tr></thead><tbody>' + productRows(feDisplayProducts) + '</tbody></table></div>' +
      '<h4 class="solar-subhead">RYA-935 uncertainty by product</h4><div class="solar-error-plot">' + plotRows(feDisplayProducts, report.references) + '</div>' +
      '<p class="solar-reference-key">Gold vertical markers: ' + report.references.map(function (r) { return esc(r.name) + ' ' + number(r.value, 2) + ' ± ' + number(r.sigma, 2); }).join(' · ') + '</p>' +
      '<h4 class="solar-subhead">Error budget</h4><p class="solar-copy">The display reports statistical, systematic, and total uncertainty from the reporting model. Graded products use their cited-pool gf uncertainty when available; ungraded products retain the wider all-lines gf term.</p>' +
      '<h4 class="solar-subhead">Near-UV atomic-data provenance</h4><p class="solar-copy">' + esc(fe.provenance.sentence) + ' Counts are computed from the downloadable line records, not maintained as page prose.</p>' +
      '<h4 class="solar-subhead">Problem-line diagnostics</h4>' + diagnostics(fe.diagnostics) +
      '<p class="solar-download"><a href="' + esc(fe.downloadPath) + '" download>Download the replication-grade Fe per-line product (.csv)</a></p>' +
      '<h4 class="solar-subhead">References for Fe</h4><p class="solar-copy">Every citation used by this element is linked from its generated reporting record.</p>' + referenceList(fe.referenceKeys) +
      '<div class="solar-repro"><strong>Reproducibility</strong><dl><dt>Generator</dt><dd>' + esc(meta.generator) + ' ' + esc(meta.version) + '</dd><dt>Source</dt><dd>' + esc(meta.sourceArtifact) + '</dd><dt>Instrument</dt><dd>' + esc(meta.instrument) + '</dd><dt>Science Git</dt><dd>' + esc(meta.gitCommit) + '</dd><dt>Product Git</dt><dd>' + esc(meta.productCommit) + '</dd><dt>Gold</dt><dd>' + esc(meta.goldVersion) + '</dd><dt>Generated</dt><dd>' + esc(meta.generatedAt) + '</dd></dl></div>' +
    '</article>';
  }

  // ---------------------------------------------------------------- RYA-876: Fe II
  // Fe II is the ionization ARBITER, not the Fe headline. Everything below reads
  // from the generated record; no value is written into this file.
  // ── PRODUCT MATRIX (instrument x band) ──────────────────────────────────────
  // Reusable across every element appendix (RYA-775/851/876). Extracted from the
  // RYA-896/897 coverage tracker, where this shape found gaps a flat table had hidden.
  //
  // A table can only list rows that EXIST. The grid draws the empty cells too, and an
  // absence is only visible if you draw the space it would occupy.
  //
  // 🔴 It ranks nothing and differences nothing. Each cell is its own data product
  // (RYA-712) and different instrument = different product, so there is no "best"
  // column and no delta between arms here. Cross-arm differences are a diagnostic.
  function productMatrix(products, grid) {
    if (!products || !products.length) return '';
    var bands = [], instruments = [];
    (grid || []).forEach(function (c) {
      if (bands.indexOf(c.band) === -1) bands.push(c.band);
      if (instruments.indexOf(c.instrument) === -1) instruments.push(c.instrument);
    });
    products.forEach(function (p) {
      if (bands.indexOf(p.band) === -1) bands.push(p.band);
      if (instruments.indexOf(p.instrument) === -1) instruments.push(p.instrument);
    });
    var cov = {};
    (grid || []).forEach(function (c) { cov[c.instrument + '|' + c.band] = c; });
    var STATE = { present: ['is-present', 'product'], gap: ['is-gap', 'no product'],
                  blocked: ['is-blocked', 'unreachable'], nodata: ['is-void', 'out of range'] };

    function cell(inst, band) {
      var here = products.filter(function (p) { return p.instrument === inst && p.band === band; });
      var c = cov[inst + '|' + band] || {};
      if (here.length) {
        return '<div class="pmatrix-cell is-present"><span class="pmatrix-state">product</span>' +
          here.map(function (p) {
            return '<span class="pmatrix-engine"><span class="pm-eng">' + esc(readableProduct(p)) + '</span>' +
              '<span class="pm-method">' + esc(readableEngine(p.method || '')) + '</span>' +
              '<span class="pm-val">' + number(p.value, 3) + '</span>' +
              '<span class="pm-sig">&plusmn; ' + number(p.sigma, 2) + ' total</span>' +
              (typeof p.sigmaStat === 'number' ? '<span class="pm-sig">stat ' + number(p.sigmaStat, 3) + '</span>' : '') +
              (typeof p.sigmaSys === 'number' ? '<span class="pm-sig">syst ' + number(p.sigmaSys, 3) + '</span>' : '') +
              '<span class="pm-n">n=' + esc(p.lineCount) + '</span>' +
              '<span class="pm-tell">' + esc(p.telluric || 'telluric: not declared') + '</span></span>';
          }).join('') + '</div>';
      }
      var st = STATE[c.state] || STATE.gap;
      return '<div class="pmatrix-cell ' + st[0] + '"><span class="pmatrix-state">' + st[1] + '</span>' +
        (c.reason ? '<span class="pmatrix-reason">' + esc(c.reason) + '</span>' : '') + '</div>';
    }

    var head = '<div class="pmatrix-head"><div></div>' + bands.map(function (b) {
      var c = (grid || []).filter(function (x) { return x.band === b; })[0] || {};
      return '<div class="pmatrix-bh"><b>' + esc(b) + '</b><span>' + esc(c.range || '') + '</span></div>';
    }).join('') + '</div>';

    var rows = instruments.map(function (inst) {
      var c = (grid || []).filter(function (x) { return x.instrument === inst; })[0] || {};
      return '<div class="pmatrix-row"><div class="pmatrix-ih"><b>' + esc(inst) + '</b>' +
        (c.instrumentRole ? '<span>' + esc(c.instrumentRole) + '</span>' : '') + '</div>' +
        bands.map(function (b) { return cell(inst, b); }).join('') + '</div>';
    }).join('');

    return '<div class="pmatrix"><div class="pmatrix-inner" style="--pm-bands:' + bands.length + '">' +
      head + rows + '</div></div>' +
      '<div class="pmatrix-legend"><span class="lg-ok"><i></i>product exists</span>' +
      '<span class="lg-gap"><i></i>data held, no product</span>' +
      '<span class="lg-bad"><i></i>unreachable by the loader</span>' +
      '<span class="lg-void"><i></i>outside the instrument\'s range</span></div>';
  }

  function fe2Repro(r) {
    return '<div class="solar-repro"><strong>Reproducibility</strong><dl>' +
      '<dt>Generator</dt><dd>' + esc(r.generator) + ' ' + esc(r.version) + '</dd>' +
      '<dt>Source</dt><dd>' + esc(r.sourceArtifact) + '</dd>' +
      '<dt>Band product</dt><dd>' + esc(r.bandProductCommit) + '</dd>' +
      '<dt>Registry</dt><dd>' + esc(r.registry) + '</dd>' +
      '<dt>Registry commit</dt><dd>' + esc(r.registryCommit) + '</dd>' +
      '<dt>Instrument</dt><dd>' + esc(r.instrument) + '</dd>' +
      '<dt>Science Git</dt><dd>' + esc(r.scienceGit) + '</dd>' +
      '<dt>Generated</dt><dd>' + esc(r.generatedAt) + '</dd></dl></div>';
  }

  function fe2Products(products) {
    return products.map(function (p) {
      var moved = typeof p.dispositionDelta === 'number'
        ? '<span class="solar-moved">' + number(p.dispositionBefore, 3) + ' → ' + number(p.value, 3) +
          ' · ' + signed(p.dispositionDelta) + '</span>'
        : '<span class="solar-unmoved">no change</span>';
      var state = '<span class="solar-state ' + esc(p.dispositionState.replace(/ /g, '-')) + '" title="' +
        esc(p.dispositionNote) + '">' + esc(p.dispositionState) + '</span>';
      return '<tr><td>' + esc(p.band) + '</td><td>' + esc(p.instrument) + '</td>' +
            '<td>' + esc(readableProduct(p)) + '<span class="solar-method">' + esc(readableEngine(p.method)) + '</span><span class="solar-method">' + esc(p.telluric || 'telluric: not declared') + '</span></td>' +
        '<td class="solar-number">' + number(p.value, 3) + ' ± ' + number(p.sigma, 2) +
        '<span class="solar-method">stat ' + number(p.sigmaStat, 4) + ' · sys ' + number(p.sigmaSys, 4) + '</span></td>' +
        '<td class="solar-number">' + esc(p.lineCount) + '<span class="solar-method">' + esc(p.excludedCount) + ' excluded</span></td>' +
        '<td><span class="solar-role ' + esc(p.role) + '">' + esc(p.role) + '</span></td>' +
        '<td>' + state + '<span class="solar-method">' + moved + '</span></td></tr>';
    }).join('');
  }

  function fe2Coverage(records) {
    return '<div class="solar-coverage-grid">' + records.map(function (c) {
      return '<article><span>' + esc(c.band) + ' · ' + esc(c.range) + '</span>' +
        '<strong>' + esc(c.instrument) + '</strong>' +
        '<em>' + (c.established ? 'established' : 'not established') + '</em>' +
        (c.reason ? '<small>' + esc(c.reason) + '</small>'
                  : '<small>' + esc(c.engines.length) + ' engine products: ' + esc(c.engines.join(' · ')) + '</small>') +
        '</article>';
    }).join('') + '</div>';
  }

  function fe2Balance(balance) {
    var mixed = balance.pairs.filter(function (p) { return !p.sameVintage; }).length;
    return '<div class="solar-table-wrap"><table class="solar-product-table"><thead><tr>' +
      '<th>Band</th><th>Engine / handler</th><th>A(Fe I)</th><th>A(Fe II)</th><th>Fe I − Fe II</th><th>Artifact vintage</th></tr></thead><tbody>' +
      balance.pairs.map(function (p) {
        return '<tr><td>' + esc(p.band) + '</td>' +
          '<td>' + esc(p.engine) + '<span class="solar-method">' + esc(p.handler) + '</span></td>' +
          '<td class="solar-number">' + number(p.feI, 3) + '<span class="solar-method">n = ' + esc(p.feINLines) + '</span></td>' +
          '<td class="solar-number">' + number(p.feII, 3) + '<span class="solar-method">n = ' + esc(p.feIINLines) + '</span></td>' +
          '<td class="solar-number solar-primary">' + signed(p.balance) + '</td>' +
          '<td><span class="solar-state ' + (p.sameVintage ? 'unaffected' : 'not-re-derived') + '" title="' +
          esc(p.vintage) + '">' + (p.sameVintage ? 'matched' : 'mixed') + '</span></td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="solar-copy">' + esc(balance.note) + '</p>' +
      (mixed ? '<p class="solar-caveat">' + esc(mixed) + ' row(s) difference two artifacts of different vintage — hover the badge for which. Those balances mix a re-derived cell against a pre-disposition one, so the difference is not purely the ionization stage.</p>' : '') +
      (balance.verdictArtifactCarriesIt ? '' :
        '<p class="solar-caveat">No verdict artifact carries an Fe II ionization-balance row, so the figures above are derived here from the band products and labelled as such rather than quoted as a ratified result.</p>');
  }

  function fe2Nist(story) {
    var b = story.bandDependence;
    return '<p class="solar-copy">Across the visible pool the Codex Fe II log gf values sit <strong>' +
      signed(story.poolOffsetDex) + ' dex</strong> above NIST ASD. A coherent offset across the whole pool — including its plain-VALD3 members — is a <em>scale</em> difference rather than independent per-line errors, and a log gf that is too high yields an abundance that is too low, so this bears directly on the ionization balance above.</p>' +
      '<div class="solar-callout"><span>Referee</span><p>' + esc(story.referee) + '</p>' +
      '<p>Overlap with our pool: <strong>' + esc(story.nOverlapLines) + ' lines</strong>. Ours − Den&nbsp;Hartog = ' +
      signed(story.oursMinusDh.median) + ' dex, 95% CI [' + number(story.oursMinusDh.ci95[0], 3) + ', ' + number(story.oursMinusDh.ci95[1], 3) + '].</p>' +
      '<p class="solar-verdict">' + esc(story.verdict) + '</p><p>' + esc(story.reasoning) + '</p></div>' +
      '<p class="solar-copy">The offset is also <strong>band dependent and changes sign</strong>: ' +
      signed(b.blue) + ' dex over the blue overlap (4173–4584 Å) against ' + signed(b.red) +
      ' dex over the red pool (5256–6456 Å), a swing of ' + number(b.swing, 3) + ' dex. ' +
      esc(story.caveat) + '</p>' +
      '<p class="solar-copy">The three arbiter lines carry NIST accuracy classes of ' +
      Object.keys(story.arbiterNistAccuracyDex).map(function (k) {
        return esc(k) + ' Å ' + number(story.arbiterNistAccuracyDex[k], 3) + ' dex';
      }).join(' · ') + '. ' + esc(story.labGfVerdict) + '</p>';
  }

  function fe2Disposition(record) {
    var impact = record.dispositionImpact;
    var moved = Object.keys(impact.products).map(function (key) {
      var p = impact.products[key];
      return '<tr><td>' + esc(key) + '</td>' +
        '<td class="solar-number">' + esc(p.nBefore) + ' → ' + esc(p.nAfter) + '</td>' +
        '<td class="solar-number">' + number(p.before, 3) + ' → ' + number(p.after, 3) + '</td>' +
        '<td class="solar-number solar-primary">' + signed(p.delta) + '</td>' +
        '<td class="solar-number">' + number(p.statBefore, 4) + ' → ' + number(p.statAfter, 4) + '</td></tr>';
    }).join('');
    return '<p class="solar-copy">Fe II ' + number(impact.line, 3) +
      ' Å was removed from the pool because its log gf was obtained by inverse analysis of the solar spectrum itself — deriving a solar abundance from it is circular. It stays a visible row with its reason rather than disappearing.</p>' +
      '<div class="solar-table-wrap"><table class="solar-product-table"><thead><tr>' +
      '<th>Product</th><th>N</th><th>A(Fe II)</th><th>Δ</th><th>Statistical σ</th></tr></thead><tbody>' +
      moved + '</tbody></table></div>' +
      '<p class="solar-table-note">' + esc(impact.controlMethod) + '</p>' +
      '<div class="solar-problem-lines">' + record.dispositions.map(function (d) {
        var plot = d.plotPath ? '<figure><img src="' + esc(d.plotPath) + '" alt="Diagnostic plot for ' +
          esc(d.scope) + '"><figcaption>' + esc(d.plotCaption || 'Generated line diagnostic') + '</figcaption></figure>' : '';
        return '<article><div><p class="solar-diagnostic-category">' + esc(d.problemClass.replace(/_/g, ' ').toLowerCase()) +
          ' · ' + esc(d.treatment) + '</p><h4>' + esc(d.scope) + '</h4>' +
          '<p>' + esc(d.note) + '</p><small>RYA-' + esc(d.tickets.split(',').join(' · RYA-')) +
          ' · severity ' + esc(d.severity) + ' · ' + esc(d.status) + '</small></div>' + plot + '</article>';
      }).join('') + '</div>';
  }

  function fe2Integrity(record) {
    var items = [];
    if (record.lineAccounting.missing.length) {
      items.push('<article><p class="solar-diagnostic-category">line accounting</p><h4>' +
        record.lineAccounting.missing.map(function (m) {
          return esc(m.engine) + ' · ' + number(m.wavelength, 3) + ' Å';
        }).join('<br>') + '</h4><p>' + esc(record.lineAccounting.detail) + '</p>' +
        '<small>union ' + esc(record.lineAccounting.unionCount) + ' lines · ' +
        Object.keys(record.lineAccounting.byTreatment).map(function (k) {
          return esc(k) + ' ' + esc(record.lineAccounting.byTreatment[k]);
        }).join(' · ') + '</small></article>');
    }
    record.staleInputs.forEach(function (f) {
      items.push('<article><p class="solar-diagnostic-category">stale input</p><h4>' +
        esc(f.artifact) + '</h4><p>' + esc(f.detail) + '</p><small>' + esc(f.engine) + ' · ' +
        esc(f.artifactLineCount) + ' vs ' + esc(f.publishedLineCount) + ' published</small></article>');
    });
    if (!items.length) {
      return '<p class="solar-empty">Every committed artifact agrees with the published band product, and every measured line is accounted for in every treatment.</p>';
    }
    return '<p class="solar-copy">These checks compare the artifact this page publishes against the other committed artifacts that describe the same measurement. They are reported rather than resolved silently; none of them changes a number above.</p>' +
      '<div class="solar-diagnostics">' + items.join('') + '</div>';
  }

  function fe2LineRecord(records, downloadPath) {
    var wavelengths = {};
    var engines = {};
    var flagged = {};
    records.forEach(function (r) {
      wavelengths[number(r.wavelength, 4)] = true;
      engines[r.engine] = true;
      if (r.problemClass || !r.kept) flagged[number(r.wavelength, 4)] = true;
    });
    return '<div class="solar-line-record"><div><span>Downloadable data product</span>' +
      '<strong>' + Object.keys(wavelengths).length + ' unique lines</strong>' +
      '<p>' + records.length + ' engine-level records · ' + Object.keys(engines).length +
      ' treatments · ' + Object.keys(flagged).length + ' flagged ' +
      (Object.keys(flagged).length === 1 ? 'line' : 'lines') +
      '. The complete measurement record belongs in the CSV, not in a thousand-row web table.</p></div>' +
      '<a class="solar-csv-download" href="' + esc(downloadPath) + '" download>' +
      '<strong>Download Fe per-line CSV</strong><span>Repository-kept · replication-grade</span></a></div>';
  }

  if (appendixRoot && appendixSpecies === 'Fe II') {
    var fe2 = species('Fe II');
    if (fe2) {
      appendixRoot.innerHTML =
      '<article class="solar-appendix">' +
        '<a class="solar-back" href="/systems/sol/#our-findings">← Back to Solar element table</a>' +
        '<p class="solar-kicker">Species appendix · ionization arbiter</p><h2>Iron <span>Fe II</span></h2>' +
        '<div class="solar-arbiter-note">This is <strong>not</strong> the solar iron abundance. Fe II is the <strong>ionization arbiter</strong>: the diagnostic that tests whether the model atmosphere reproduces both ionization stages of the same element at one abundance, which is what validates log g. The published solar iron value is <a href="/systems/sol/elements/fe/">A(Fe I)</a>.</div>' +
        '<div class="solar-hero"><div><span>Arbiter · ' + esc(fe2.primary.engine) + '</span><strong>' +
          number(fe2.primary.value, 3) + ' <small>± ' + number(fe2.primary.sigmaTotal, 2) + '</small></strong>' +
          '<p>' + esc(fe2.primary.lineCount) + ' lines · stat ' + number(fe2.primary.sigmaStat, 4) +
          ' · sys ' + number(fe2.primary.sigmaSys, 4) + ' · ' + esc(fe2.primary.handler) + '</p></div>' +
        '<div class="secondary"><span>The arbiter trio</span><strong class="solar-trio">' +
          fe2.arbiterTrioA.map(function (w) { return number(w, 3); }).join(' · ') + '</strong>' +
          '<p>Å, air · the only Fe II lines the arbiter aggregate is built from</p></div></div>' +

        '<h4 class="solar-subhead">Fe I − Fe II ionization balance</h4>' + fe2Balance(fe2.ionizationBalance) +

        '<h4 class="solar-subhead">Coverage — instrument × band</h4>' +
        productMatrix(fe2.products, fe2.coverageGrid) +
        '<p class="solar-table-note">Each cell is its own data product (RYA-712); the grid ranks nothing and differences nothing between instruments. Empty cells carry their reason — an absence you cannot see is one nobody fixes.</p>' +
        '<h4 class="solar-subhead">Band × instrument × engine products</h4>' +
        '<div class="solar-table-wrap"><table class="solar-product-table"><thead><tr><th>Band</th><th>Instrument</th>' +
        '<th>Engine / handler</th><th>A(Fe II) ± σ</th><th>N</th><th>Role</th><th>RYA-877 state</th></tr></thead><tbody>' +
        fe2Products(fe2.products) + '</tbody></table></div>' +
        '<p class="solar-table-note">Engines are separate data products and are never combined (RYA-712). The arbiter is one of them, not an average of them. <strong>RYA-877 state</strong>: <em>re-derived</em> = recomputed after the disposition; <em>unaffected</em> = the dispositioned line is outside the band; <em>not re-derived</em> = still carrying its pre-disposition membership, with no committed artifact recording whether the line was in it.</p>' +

        '<h4 class="solar-subhead">Per-engine uncertainty</h4><div class="solar-error-plot">' +
        plotRows(fe2.products, report.references, { axisLabel: 'A(Fe II)' }) + '</div>' +
        '<p class="solar-reference-key">Gold vertical markers show the elemental A(Fe) scale (' +
        report.references.map(function (r) { return esc(r.name) + ' ' + number(r.value, 2); }).join(' · ') +
        ') for orientation only — those are A(Fe), not a published A(Fe II), and the arbiter is not scored against them.</p>' +

        '<h4 class="solar-subhead">Band coverage</h4>' + fe2Coverage(fe2.coverage) +
        '<p class="solar-table-note">Fe II’s coverage is genuinely thinner than Fe I’s. Ranges with no Fe II product say so rather than being padded to mirror the Fe I matrix.</p>' +

        '<h4 class="solar-subhead">The +0.106 dex Fe II scale offset</h4>' + fe2Nist(fe2.nistOffset) +

        '<h4 class="solar-subhead">Error budget</h4><p class="solar-copy">Every Fe II product above is dominated by <strong>' +
        esc(fe2.products[0].dominant) + '</strong>. There is no primary-laboratory gf table for Fe II in this wavelength range — the graded ladder built in RYA-799/824/836 is Fe I only — so no Fe II product can be promoted to a graded value, and more lines will not shrink the dominant term. The honest floor is the ungraded gf systematic, not the statistical scatter.</p>' +

        '<h4 class="solar-subhead">Problem-line diagnostics</h4>' + fe2Disposition(fe2) +
        '<p class="solar-table-note">Only lines requiring scientific attention are expanded here. Generated plots are attached when the disposition needs spectral evidence—for example blends, ghosts, or fit failures. Atomic-data provenance cases can be established from the cited record without inventing an unnecessary plot.</p>' +

        '<h4 class="solar-subhead">Artifact integrity checks</h4>' + fe2Integrity(fe2) +

        '<h4 class="solar-subhead">Per-line record</h4>' + fe2LineRecord(fe2.lines, fe2.downloadPath) +

        '<h4 class="solar-subhead">References for Fe II</h4>' + referenceList(fe2.referenceKeys) +
        fe2Repro(fe2.reproducibility) +
      '</article>';
    }
  }

  // RYA-935 Al I evidence appendix. This deliberately mirrors the Fe product
  // views while refusing to collapse curation-owed products into a headline.
  if (appendixRoot && appendixSpecies === 'Al I') {
    var alProducts = alEvidence.products || [];
    appendixRoot.innerHTML =
      '<article class="solar-appendix">' +
        '<a class="solar-back" href="/systems/sol/#our-findings">← Back to Solar element table</a>' +
        '<p class="solar-kicker">Element appendix · RYA-935 evidence record</p><h2>Aluminium <span>Al I</span></h2>' +
        '<div class="solar-arbiter-note">The current Solar element record is <strong>curation-owed</strong>. These are the committed Al I products, shown individually with their uncertainty budgets. No product is promoted to a ratified solar abundance here.</div>' +
        '<h4 class="solar-subhead">Product values · band × instrument × engine</h4>' +
        '<div class="solar-table-wrap"><table class="solar-product-table"><thead><tr><th>Band</th><th>Instrument / holding</th><th>Engine / method</th><th>A(Al) ± σ</th><th>σ stat</th><th>σ syst</th><th>N</th></tr></thead><tbody>' +
        alProducts.map(function (p) {
          return '<tr><td>' + esc(p.band) + '</td><td>' + esc(p.instrument) + (p.holding ? '<span class="solar-method">' + esc(p.holding) + '</span>' : '') + '</td>' +
            '<td>' + esc(p.engine) + '<span class="solar-method">' + esc(p.method) + '</span><span class="solar-method">' + esc(p.telluric || 'telluric: not declared') + '</span></td>' +
            '<td class="solar-number">' + number(p.value, 3) + ' ± ' + number(p.sigma, 3) + '</td>' +
            '<td class="solar-number">' + number(p.sigmaStat, 3) + '</td><td class="solar-number">' + number(p.sigmaSys, 3) + '</td>' +
            '<td class="solar-number">' + esc(p.lineCount) + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<h4 class="solar-subhead">Value matrix · instrument × band</h4>' +
        productMatrix(alProducts, alEvidence.coverageGrid) +
        '<p class="solar-table-note">Each matrix cell retains its band and instrument identity. Empty cells are gaps in the committed Al product set, not inferred non-detections.</p>' +
        '<h4 class="solar-subhead">Uncertainty by product</h4>' +
        '<div class="solar-error-plot">' + plotRows(alProducts, [alEvidence.reference], { axisLabel: 'A(Al)' }) + '</div>' +
        '<p class="solar-table-note">Bars show total σ; the inner bars show statistical σ where available. The systematic term remains visible in the product table because it dominates several Al products.</p>' +
        '<h4 class="solar-subhead">RYA-935 provenance</h4>' +
        '<p class="solar-copy">Values, line counts, instrument labels, and error components are read from the committed RYA-935 live status artifact. The shared <a href="/assets/data/rya935/live_tracker.html">full tracker</a> remains available for holding and telluric detail.</p>' +
      '</article>';
  }
})();
