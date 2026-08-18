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

  function elementRows(elements) {
    return elements.map(function (element) {
      var hasAppendix = Boolean(element.appendixPath && element.primary);
      var species = element.symbol + (element.ion ? ' ' + element.ion : '');
      var label = hasAppendix
        ? '<a class="solar-element-link" href="' + esc(element.appendixPath) + '">' + esc(species) + '<span class="sr-only"> — open appendix page</span></a>'
        : '<span class="solar-element-symbol">' + esc(species) + '</span>';
      var measurement = element.primary || element.diagnostic;
      var primary = measurement
        ? number(measurement.value, 3) + (measurement.sigmaTotal == null ? '' : ' <span class="solar-sigma">± ' + number(measurement.sigmaTotal, 2) + '</span>')
        : '—';
      var delta = measurement && typeof element.asplund === 'number' ? signed(measurement.value - element.asplund) : '—';
      var lineCount = measurement && measurement.lineCount ? ' · n = ' + esc(measurement.lineCount) : '';
      var role = element.measurementRole ? '<span class="solar-row-role">' + esc(element.measurementRole) + lineCount + '</span>' : '';
      return '<tr class="' + (hasAppendix ? 'has-appendix' : 'no-appendix') + (element.childOf ? ' solar-species-child' : '') + '">' +
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
        '<td>' + esc(product.engine) + '<span class="solar-method">' + esc(product.method) + '</span></td>' +
        '<td class="solar-number">' + number(product.value, 3) + ' ± ' + number(product.sigma, 2) + '</td>' +
        '<td class="solar-number">' + esc(product.lineCount) + '</td>' +
        '<td><span class="solar-role ' + esc(product.role) + '">' + esc(product.role) + '</span></td></tr>';
    }).join('');
  }

  function plotRows(products, references) {
    var all = products.map(function (p) { return [p.value - p.sigma, p.value + p.sigma]; });
    references.forEach(function (r) { all.push([r.value - r.sigma, r.value + r.sigma]); });
    var min = Math.min.apply(null, all.map(function (v) { return v[0]; })) - 0.03;
    var max = Math.max.apply(null, all.map(function (v) { return v[1]; })) + 0.03;
    var span = max - min;
    function pct(value) { return ((value - min) / span * 100).toFixed(2); }

    var bands = [];
    products.forEach(function (p) { if (bands.indexOf(p.band) === -1) bands.push(p.band); });
    return '<div class="solar-plot-axis"><span>' + min.toFixed(2) + '</span><span>A(Fe)</span><span>' + max.toFixed(2) + '</span></div>' +
      bands.map(function (band) {
        var rows = products.filter(function (p) { return p.band === band; }).map(function (p) {
          var left = pct(p.value - p.sigma);
          var width = (p.sigma * 2 / span * 100).toFixed(2);
          return '<div class="solar-plot-row"><div class="solar-plot-label">' + esc(p.engine) + '<span>' + esc(p.role) + '</span></div>' +
            '<div class="solar-plot-track"><i class="solar-error ' + esc(p.role) + '" style="left:' + left + '%;width:' + width + '%"></i>' +
            '<b class="solar-point ' + esc(p.role) + '" style="left:' + pct(p.value) + '%"></b>' +
            references.map(function (r) { return '<i class="solar-reference" title="' + esc(r.name) + '" style="left:' + pct(r.value) + '%"></i>'; }).join('') +
            '</div><div class="solar-plot-value">' + number(p.value, 3) + ' ± ' + number(p.sigma, 2) + '</div></div>';
        }).join('');
        return '<section class="solar-band"><h4>' + esc(band) + '</h4>' + rows + '</section>';
      }).join('');
  }

  function diagnostics(records) {
    if (!records || !records.length) return '<p class="solar-empty">No generated diagnostic records.</p>';
    return '<div class="solar-diagnostics">' + records.map(function (record) {
      var plot = record.imagePath ? '<a class="solar-diagnostic-plot" href="' + esc(record.imagePath) + '" target="_blank" rel="noopener"><img src="' + esc(record.imagePath) + '" alt="Diagnostic spectrum and residual plot for ' + esc(record.line) + '" loading="lazy"></a>' : '';
      return '<article><p class="solar-diagnostic-category">' + esc(record.category) + '</p><h4>' + esc(record.line) + '</h4>' + plot + '<p>' + esc(record.caption) + '</p><small>Disposition: ' + esc(record.status) + '</small></article>';
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

  var fe = report.elements.filter(function (element) { return element.symbol === 'Fe' && element.ion === 'I'; })[0];
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
      '<div class="solar-table-wrap"><table class="solar-element-table"><thead><tr><th>Z</th><th>Species</th><th>Element / role</th><th>Reported A(X) ± σ</th><th>Asplund 2021</th><th>Δ</th><th>Status</th></tr></thead><tbody>' + elementRows(report.elements) + '</tbody></table></div>' +
      '<p class="solar-table-note">Only species with a generated appendix are clickable. Blank measurements remain visible with their pipeline disposition rather than being silently omitted.</p>';
  }

  if (appendixRoot) {
    appendixRoot.innerHTML =
    '<article class="solar-appendix">' +
      '<a class="solar-back" href="/systems/sol/#our-findings">← Back to Solar element table</a><p class="solar-kicker">Element appendix</p><h2>Iron <span>Fe</span></h2>' +
      '<div class="solar-hero solar-hero-single"><div><span>' + esc(fe.primary.label) + '</span><strong>' + number(fe.primary.value, 3) + ' <small>± ' + number(fe.primary.sigmaTotal, 3) + '</small></strong><p>' + esc(fe.primary.lineCount) + ' lines · stat ' + number(fe.primary.sigmaStat, 3) + ' · sys ' + number(fe.primary.sigmaSys, 3) + '</p></div></div>' +
      '<div class="solar-headline-explanation solar-headline-explanation-single"><p><strong>What the headline means.</strong> ' + esc(fe.primary.explanation) + ' Ungraded and alternate-engine results appear only as comparison rows below.</p></div>' +
      '<h4 class="solar-subhead">Graded 1D-LTE and comparison error bars</h4><p class="solar-copy">Gold rows are the graded 1D-LTE primary products. Blue rows are separate post-gate band × engine comparisons. No rows are averaged together.</p><div class="solar-error-plot">' + plotRows(fe.products, report.references) + '</div>' +
      '<p class="solar-reference-key">Gold vertical markers: ' + report.references.map(function (r) { return esc(r.name) + ' ' + number(r.value, 2) + ' ± ' + number(r.sigma, 2); }).join(' · ') + '</p>' +
      '<h4 class="solar-subhead">Band × instrument × engine products</h4><div class="solar-table-wrap"><table class="solar-product-table"><thead><tr><th>Band</th><th>Instrument</th><th>Engine / method</th><th>A(Fe) ± σ</th><th>N</th><th>State</th></tr></thead><tbody>' + productRows(fe.products) + '</tbody></table></div>' +
      '<h4 class="solar-subhead">Error budget</h4><p class="solar-copy">Every product bar is σ<sub>total</sub> = √(σ<sub>stat</sub>² + σ<sub>sys</sub>²). The highlighted graded 1D-LTE result uses its cited laboratory-gf pool term; ungraded comparisons retain their wider gf floor.</p>' +
      '<h4 class="solar-subhead">Near-UV atomic-data provenance</h4><p class="solar-copy">' + esc(fe.provenance.sentence) + ' Counts are computed from the downloadable line records, not maintained as page prose.</p>' +
      '<h4 class="solar-subhead">Problem-line diagnostics</h4>' + diagnostics(fe.diagnostics) +
      '<p class="solar-download"><a href="' + esc(fe.downloadPath) + '" download>Download the replication-grade Fe per-line product (.csv)</a></p>' +
      '<h4 class="solar-subhead">References for Fe</h4><p class="solar-copy">Every citation used by this element is linked from its generated reporting record.</p>' + referenceList(fe.referenceKeys) +
      '<div class="solar-repro"><strong>Reproducibility</strong><dl><dt>Generator</dt><dd>' + esc(meta.generator) + ' ' + esc(meta.version) + '</dd><dt>Source</dt><dd>' + esc(meta.sourceArtifact) + '</dd><dt>Instrument</dt><dd>' + esc(meta.instrument) + '</dd><dt>Science Git</dt><dd>' + esc(meta.gitCommit) + '</dd><dt>Product Git</dt><dd>' + esc(meta.productCommit) + '</dd><dt>Gold</dt><dd>' + esc(meta.goldVersion) + '</dd><dt>Generated</dt><dd>' + esc(meta.generatedAt) + '</dd></dl></div>' +
    '</article>';
  }
})();
