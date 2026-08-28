(function () {
  'use strict';
  var root = document.getElementById('element-products');
  if (!root) return;

  var element = root.getAttribute('data-element');
  // `feedBase` is a read-only smoke-test hook: point it at a local copy, add a
  // product, reload, and the page changes without a source edit. Production
  // always defaults to the merged main-repository feed.
  var requestedBase = new URLSearchParams(window.location.search).get('feedBase');
  var base = requestedBase || 'https://raw.githubusercontent.com/damienabraxas/exoplanetcodex/main/';
  if (base.charAt(base.length - 1) !== '/') base += '/';
  var urls = {
    product: base + 'data/products/solar/' + encodeURIComponent(element) + '.json',
    holdings: base + 'data/catalog/holdings_manifest_registry.csv',
    instruments: base + 'data/catalog/instrument_catalog.csv',
    tracker: base + 'data/results/rya935/live_status.json'
  };
  var BANDS = ['near-UV', 'VIS', 'red-optical', 'NIR'];
  var INSTRUMENTS = ['kpno_solar_atlas', 'harps', 'iag_fts_solar_atlas', 'crires_plus'];
  var LABELS = {kpno_solar_atlas:'Kitt Peak',harps:'HARPS',iag_fts_solar_atlas:'IAG',crires_plus:'CRIRES+'};
  var HOLDING_LABELS = {
    solar_kpno_kurucz2005_corrected: 'Kitt Peak — Kurucz 2005 corrected',
    solar_kpno_molecfit_corrected: 'Kitt Peak — 1984 Molecfit corrected'
  };

  function holdingLabel(holding, instrument) {
    return HOLDING_LABELS[holding] || LABELS[instrument] || instrument;
  }

  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function(c) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  }); }
  function num(v, n) { return v !== null && v !== '' && Number.isFinite(Number(v)) ? Number(v).toFixed(n == null ? 3 : n) : '—'; }
  function csv(text) {
    var rows=[], row=[], field='', quoted=false;
    for (var i=0;i<text.length;i++) { var c=text[i], next=text[i+1];
      if (c==='"' && quoted && next==='"') { field+='"'; i++; }
      else if (c==='"') quoted=!quoted;
      else if (c===',' && !quoted) { row.push(field); field=''; }
      else if ((c==='\n' || c==='\r') && !quoted) { if(c==='\r'&&next==='\n') i++; row.push(field); if(row.some(Boolean)) rows.push(row); row=[]; field=''; }
      else field+=c;
    }
    if(field || row.length){row.push(field);rows.push(row);}
    var head=rows.shift()||[];
    return rows.map(function(r){var o={};head.forEach(function(h,j){o[h]=r[j]||'';});return o;});
  }
  function fetchText(url) { return fetch(url + '?t=' + Date.now(), {cache:'no-store'}).then(function(r){
    if(!r.ok) throw new Error(r.status + ' ' + r.statusText + ' for ' + url); return r.text();
  }); }
  function uniqueProducts(rows) {
    var seen={}; return rows.filter(function(p){
      var key=[p.ion,p.band,p.instrument,p.holding,p.tier,p.display,p.A,p.sigma_stat,p.sigma_syst,p.n_lines].join('|');
      if(seen[key]) return false; seen[key]=true; return true;
    });
  }
  function preferred(rows) {
    return rows.slice().sort(function(a,b){
      var ar=/3D-NLTE/.test(a.display)?0:/1D-NLTE/.test(a.display)?1:2;
      var br=/3D-NLTE/.test(b.display)?0:/1D-NLTE/.test(b.display)?1:2;
      return ar-br || Number(b.n_lines||0)-Number(a.n_lines||0);
    })[0];
  }
  function card(p, telluric) {
    var bandClass=p.band==='near-UV'?'band-near-uv':p.band==='NIR'?'band-ir':'band-vis';
    return '<article class="product-card '+bandClass+'"><span class="eyebrow">'+esc(LABELS[p.instrument]||p.instrument)+' · '+esc(p.band)+' · '+esc(p.tier)+'</span>'+
      '<strong>'+num(p.A)+' <small>± '+num(p.sigma_stat)+' stat</small></strong><p>'+esc(p.display)+' · n='+esc(p.n_lines)+'</p>'+
      '<small>± '+num(p.sigma_syst)+' systematic · '+esc(p.dominant_term||'systematic basis not declared')+'</small>'+
      '<small class="corrected">telluric '+esc(telluric[p.holding]||'UNKNOWN')+' · '+esc(p.holding)+'</small></article>';
  }
  // RYA-1102 — THE ERROR-BAR FOREST DRAWS A PUBLISHED GRID, NOT WHATEVER ROWS EXIST.
  //
  // It used to do `group.forEach(product)` inside band x instrument, so a section's row
  // count was however many products happened to exist -- Kitt Peak rendered 19 -- and an
  // instrument with no product was skipped entirely (`if(!group.length) return`), which
  // is indistinguishable from a model that does not exist. Ryan: "each instrument section
  // should have 8 lines total, no more no less. If the data product is not available for
  // that instrument at that band we simply put N/A."
  //
  // The row axis and the section membership now come from `feed.plot_grid`, derived in
  // pipeline/plot_grid.py from the physics registry. NO DISPLAY POLICY LIVES HERE: which
  // tier is showcased, which product wins a slot, and what the rows are called are all
  // science decisions, and a copy of them in JS is a copy that drifts.
  function productIndex(feed) {
    var fields = (feed.plot_grid && feed.plot_grid.key_fields) || [];
    var byKey = {};
    (feed.products || []).forEach(function (p) {
      byKey[fields.map(function (f) { return p[f] == null ? '' : String(p[f]); }).join('|')] = p;
    });
    return byKey;
  }

  // Compatibility renderer for a short feed-version skew. The website can deploy
  // before raw.githubusercontent.com exposes the science commit that adds plot_grid;
  // an absent grid must degrade to the existing grouped forest, never an empty page.
  function compatibilityForest(feed, ion, reference) {
    var rows = uniqueProducts((feed.products || []).filter(function (p) {
      return p.ion === ion && (p.tier === 'GRADED' || (p.band === 'near-UV' && p.tier === 'DEEPGRADED'));
    }));
    if (!rows.length) return '<p class="product-pending">No finished products in this tier yet.</p>';
    var out = '<p class="product-feed-meta">Compatibility view while this feed version publishes no plot_grid.</p>' +
      '<div class="forest-legend"><span>blue solid = statistical σ</span><span>blue wireframe = systematic σ</span></div>' +
      '<div class="product-forest"><div class="product-forest-inner">';
    BANDS.forEach(function (band) {
      var here = rows.filter(function (p) { return p.band === band; });
      if (!here.length) return;
      var vals = [];
      here.forEach(function (p) { vals.push(Number(p.A)-Number(p.sigma_stat||0),Number(p.A)+Number(p.sigma_stat||0),Number(p.A)-Number(p.sigma_syst||0),Number(p.A)+Number(p.sigma_syst||0)); });
      if (reference) { vals.push(reference.band[0],reference.band[1]); (reference.comparators||[]).forEach(function(c){vals.push(Number(c.value)-Number(c.sigma||0),Number(c.value)+Number(c.sigma||0));}); }
      var lo=Math.min.apply(null,vals)-0.03, hi=Math.max.apply(null,vals)+0.03, span=hi-lo||1;
      function x(v){return Math.max(0,Math.min(100,(v-lo)/span*100));}
      out += '<div class="forest-band">'+esc(band)+'</div>';
      INSTRUMENTS.forEach(function(inst){
        var group=here.filter(function(p){return p.instrument===inst;}); if(!group.length)return;
        var holdings=[];
        group.forEach(function(p){if(holdings.indexOf(p.holding)<0)holdings.push(p.holding);});
        holdings.forEach(function(holding){
          out += '<div class="forest-instrument">'+esc(holdingLabel(holding,inst))+'<small>'+esc(holding)+'</small></div>';
          group.filter(function(p){return p.holding===holding;}).forEach(function(p){
            var st=Number(p.sigma_stat||0),sy=Number(p.sigma_syst||0),sl=x(Number(p.A)-st),sw=x(Number(p.A)+st)-sl,yl=x(Number(p.A)-sy),yw=x(Number(p.A)+sy)-yl;
            var refs=reference?'<i class="ref" title="'+esc(reference.best_external)+'" style="left:'+x(reference.band[0])+'%;width:'+Math.max(0.4,x(reference.band[1])-x(reference.band[0]))+'%"></i><i class="refline" style="left:'+x(reference.asplund2021)+'%"></i>'+(reference.comparators||[]).map(function(c){return '<i class="cmpband" title="'+esc(c.name)+'" style="left:'+x(Number(c.value)-Number(c.sigma||0))+'%;width:'+Math.max(0.4,x(Number(c.value)+Number(c.sigma||0))-x(Number(c.value)-Number(c.sigma||0)))+'%"></i><i class="cmp" style="left:'+x(c.value)+'%"></i>';}).join(''):'';
            out += '<div class="forest '+(p.tier==='GRADED'?'gradedrow':'')+'"><span class="forest-label">'+esc(p.display)+'<small>n='+esc(p.n_lines)+'</small></span><span class="track">'+refs+'<i class="sysbar" style="left:'+yl+'%;width:'+Math.max(0.4,yw)+'%"></i><i class="bar" style="left:'+sl+'%;width:'+Math.max(0.4,sw)+'%"></i><i class="dot" style="left:'+x(Number(p.A))+'%"></i></span><span class="forest-value">'+num(p.A)+' <small>±'+num(st)+' stat ±'+num(sy)+' syst</small></span></div>';
          });
        });
      });
      var ticks=''; for(var j=0;j<5;j++){var v=lo+(hi-lo)*j/4;ticks+='<span class="tick" style="left:'+(j*25)+'%">'+num(v,2)+'</span>';}
      out += '<div class="axis"><span></span><span class="ticks">'+ticks+'</span><span class="forest-value">A('+esc(element)+') dex</span></div>';
    });
    return (reference?'<div class="literature-regions"><span class="asplund-region">'+esc(reference.best_external)+' '+num(reference.asplund2021,2)+' ± '+num(reference.sigma_external,2)+'</span>'+(reference.comparators||[]).map(function(c){return '<span class="lodders-region">'+esc(c.name)+' '+num(c.value,2)+' ± '+num(c.sigma,2)+'</span>';}).join('')+'</div>':'')+out+'</div></div>';
  }

  function forest(feed, ion, reference) {
    var grid = feed.plot_grid;
    if (!grid || !grid.sections) return compatibilityForest(feed, ion, reference);
    var byKey = productIndex(feed);
    var sections = grid.sections.filter(function (s) { return s.ion === ion; });
    if (!sections.length) return '<p class="product-pending">No finished products in this tier yet.</p>';

    var out = '<div class="forest-legend"><span>blue solid = statistical \u03c3</span>' +
      '<span>blue wireframe = systematic \u03c3</span><span>N/A = no product for this model</span></div>' +
      '<div class="product-forest"><div class="product-forest-inner">';

    BANDS.forEach(function (band) {
      var here = sections.filter(function (s) { return s.band === band; });
      if (!here.length) return;

      // Scale from the products actually plotted in this band, plus the literature marks.
      var vals = [];
      here.forEach(function (s) {
        s.cells.forEach(function (c) {
          var p = c.product_key && byKey[c.product_key];
          if (!p) return;
          vals.push(Number(p.A) - Number(p.sigma_stat || 0), Number(p.A) + Number(p.sigma_stat || 0),
                    Number(p.A) - Number(p.sigma_syst || 0), Number(p.A) + Number(p.sigma_syst || 0));
        });
      });
      if (reference) {
        vals.push(reference.band[0], reference.band[1]);
        (reference.comparators || []).forEach(function (c) {
          vals.push(Number(c.value) - Number(c.sigma || 0), Number(c.value) + Number(c.sigma || 0));
        });
      }
      if (!vals.length) return;
      var lo = Math.min.apply(null, vals) - 0.03, hi = Math.max.apply(null, vals) + 0.03;
      var span = hi - lo || 1;
      function x(v) { return Math.max(0, Math.min(100, (v - lo) / span * 100)); }

      out += '<div class="forest-band">' + esc(band) + '</div>';

      INSTRUMENTS.forEach(function (inst) {
        here.filter(function (s) { return s.instrument === inst; }).forEach(function (s) {
          out += '<div class="forest-instrument">' + esc(holdingLabel(s.holding, inst)) +
            '<small>' + esc(s.holding) + (s.only_deepgraded ? ' \u00b7 DEEPGRADED (no graded product in this band)' : '') + '</small></div>';

          s.cells.forEach(function (c) {
            var p = c.product_key && byKey[c.product_key];
            if (!p) {
              // 🔴 THE N/A ROW. Present, labelled, and empty -- "we did not measure this"
              // is a fact, and a row that is simply absent cannot state it.
              out += '<div class="forest forest-na"><span class="forest-label">' + esc(c.row) +
                '<small>no product</small></span><span class="track"></span>' +
                '<span class="forest-value">N/A</span></div>';
              return;
            }
            var st = Number(p.sigma_stat || 0), sy = Number(p.sigma_syst || 0);
            var sl = x(Number(p.A) - st), sw = x(Number(p.A) + st) - sl;
            var yl = x(Number(p.A) - sy), yw = x(Number(p.A) + sy) - yl;
            var refs = reference ? '<i class="ref" title="' + esc(reference.best_external) + '" style="left:' + x(reference.band[0]) + '%;width:' + Math.max(0.4, x(reference.band[1]) - x(reference.band[0])) + '%"></i><i class="refline" style="left:' + x(reference.asplund2021) + '%"></i>' + (reference.comparators || []).map(function (c2) { return '<i class="cmpband" title="' + esc(c2.name) + '" style="left:' + x(Number(c2.value) - Number(c2.sigma || 0)) + '%;width:' + Math.max(0.4, x(Number(c2.value) + Number(c2.sigma || 0)) - x(Number(c2.value) - Number(c2.sigma || 0))) + '%"></i><i class="cmp" style="left:' + x(c2.value) + '%"></i>'; }).join('') : '';
            out += '<div class="forest ' + (p.tier === 'GRADED' ? 'gradedrow' : '') + '">' +
              '<span class="forest-label">' + esc(c.row) + '<small>n=' + esc(p.n_lines) +
              (c.alternates ? ' \u00b7 ' + c.alternates + ' alternate' + (c.alternates > 1 ? 's' : '') : '') +
              '</small></span><span class="track">' + refs +
              '<i class="sysbar" style="left:' + yl + '%;width:' + Math.max(0.4, yw) + '%"></i>' +
              '<i class="bar" style="left:' + sl + '%;width:' + Math.max(0.4, sw) + '%"></i>' +
              '<i class="dot" style="left:' + x(Number(p.A)) + '%"></i></span>' +
              '<span class="forest-value">' + num(p.A) + ' <small>\u00b1' + num(st) + ' stat \u00b1' + num(sy) + ' syst</small></span></div>';
          });
        });
      });

      var ticks = '';
      for (var j = 0; j < 5; j++) { var v = lo + (hi - lo) * j / 4; ticks += '<span class="tick" style="left:' + (j * 25) + '%">' + num(v, 2) + '</span>'; }
      out += '<div class="axis"><span></span><span class="ticks">' + ticks + '</span><span class="forest-value">A(' + esc(element) + ') dex</span></div>';
    });

    return (reference ? '<div class="literature-regions"><span class="asplund-region">' + esc(reference.best_external) + ' ' + num(reference.asplund2021, 2) + ' \u00b1 ' + num(reference.sigma_external, 2) + '</span>' + (reference.comparators || []).map(function (c) { return '<span class="lodders-region">' + esc(c.name) + ' ' + num(c.value, 2) + ' \u00b1 ' + num(c.sigma, 2) + '</span>'; }).join('') + '</div>' : '') + out + '</div></div>';
  }

  function matrix(products, quarantine, gaps, catalog, expectedTiers) {
    function covered(inst,band){var r=catalog[inst];if(!r)return false;var declared=(String(r.bands_supported||'')+'|'+String(r.observing_domain||'')).toLowerCase().replace(/_/g,'-').split('|');return declared.some(function(b){return b===band.toLowerCase() || (b==='nuv'&&band==='near-UV') || (b==='uv-vis-nir'&&band!=='near-UV') || (b==='vis-nir'&&band!=='near-UV') || (b==='nir'&&band==='NIR');});}
    var h='<div class="live-matrix-wrap"><table class="live-matrix"><thead><tr><th>Instrument</th>'+BANDS.map(function(b){return '<th>'+esc(b)+'</th>';}).join('')+'</tr></thead><tbody>';
    INSTRUMENTS.forEach(function(inst){h+='<tr><th>'+esc(LABELS[inst])+'</th>';BANDS.forEach(function(band){
      var rows=products.filter(function(p){return p.instrument===inst&&p.band===band;});
      var bad=quarantine.filter(function(p){return p.instrument===inst&&p.band===band;});
      var gap=gaps.filter(function(g){return g.band===band;})[0];
      if(bad.length) h+='<td class="matrix-problem"><span class="matrix-state">Problem</span>'+(rows.length?'<span class="matrix-row">Finished products also exist in this cell; quarantined rows are never hidden.</span>':'')+'<span class="matrix-reason">'+esc(bad[0].quarantine_reason||'Quarantined product')+'</span></td>';
      else if(rows.length) h+='<td class="matrix-product"><span class="matrix-state">Finished</span>'+rows.map(function(p){return '<span class="matrix-row">'+esc(p.tier)+' · '+esc(p.display)+' · '+num(p.A)+' <span class="matrix-uncertainty">±'+num(p.sigma_stat)+' stat ±'+num(p.sigma_syst)+' syst</span></span>';}).join('')+(expectedTiers||[]).filter(function(t){return !rows.some(function(p){return p.tier===t;});}).map(function(t){return '<span class="matrix-row matrix-tier-pending">'+esc(t)+' · Pending</span>';}).join('')+'</td>';
      else if(!covered(inst,band)) h+='<td class="matrix-na" aria-label="Out of band"></td>';
      else if(gap) h+='<td class="matrix-na"><span class="matrix-state">N/A</span><span class="matrix-reason">N/A for '+esc(element)+': '+esc(gap.reason)+'</span></td>';
      else h+='<td class="matrix-pending"><span class="matrix-state">Pending</span></td>';
    });h+='</tr>';}); return h+'</tbody></table></div>';
  }
  Promise.all([fetchText(urls.product),fetchText(urls.holdings),fetchText(urls.instruments),fetchText(urls.tracker)]).then(function(parts){
    var feed=JSON.parse(parts[0]), holdings=csv(parts[1]), instruments=csv(parts[2]), tracker=JSON.parse(parts[3]), telluric={}, catalog={};
    holdings.forEach(function(r){telluric[r.holding_id]=r.telluric_applied;}); instruments.forEach(function(r){catalog[r.instrument_id]=r;});
    var live=uniqueProducts((feed.products||[]).filter(function(p){return telluric[p.holding]==='applied';}));
    var excluded=(feed.products||[]).filter(function(p){return telluric[p.holding]!=='applied';});
    var graded=live.filter(function(p){return p.ion==='I'&&p.tier==='GRADED';});
    var top=INSTRUMENTS.map(function(i){var candidates=graded.filter(function(p){return p.instrument===i;});if(i==='kpno_solar_atlas'){var kp2005=candidates.filter(function(p){return p.holding==='solar_kpno_kurucz2005_corrected';});if(kp2005.length)candidates=kp2005;}return preferred(candidates);}).filter(Boolean);
    var nearUv=preferred(live.filter(function(p){return p.ion==='I'&&p.band==='near-UV'&&p.instrument==='kpno_solar_atlas'&&p.holding==='solar_kpno_kurucz2005_corrected';}));
    if(nearUv)top.unshift(nearUv);
    var secondary=live.filter(function(p){return p.ion==='I'&&(p.tier==='DEEPGRADED'||p.tier==='CONSISTENT');});
    var pending=INSTRUMENTS.filter(function(i){return !top.some(function(p){return p.instrument===i;});}).map(function(i){return LABELS[i];});
    root.innerHTML='<p class="product-feed-meta">Live source: <strong>codex.element_product/1 · '+esc(element)+'.json v'+esc(feed.version)+'</strong> · updated '+esc(feed.updated_at)+' · cache-busted on every load · '+excluded.length+' telluric-ineligible live rows refused</p>'+
      '<section class="product-section"><h2>Highlighted band products</h2><p class="product-section-intro">The only near-UV product we were able to derive is the Kitt Peak DEEPGRADED line product; the highlighted VIS and NIR products are GRADED. Every value is read directly from the merged science feed.</p><div class="product-headlines">'+top.map(function(p){return card(p,telluric);}).join('')+'</div>'+(pending.length?'<p class="product-pending">Pending graded instruments: '+esc(pending.join(', '))+'</p>':'')+'</section>'+
      '<section class="product-section"><h2>Error-bar forest</h2><p class="product-section-intro">Every instrument section shows the same fixed model axis in the same order, so a model with no product for that instrument and band reads N/A rather than vanishing. Rows, ordering and tier policy come from the science feed (plot_grid), not from this page.</p>'+forest(feed,'I',tracker.reference&&tracker.reference.FeI)+'</section>'+
      '<section class="product-section"><h2>Band × instrument matrix</h2><p class="product-section-intro">Finished, Pending, out-of-band blank, closed N/A with reason, and quarantined Problem are distinct states.</p>'+matrix(live,feed.quarantine||[],feed.gaps||[],catalog)+'</section>'+
      '<section class="product-section"><h2>Deepgraded and consistent matrix</h2><p class="product-section-intro">Secondary tiers use the same band × instrument structure. Missing CONSISTENT products remain explicitly Pending.</p>'+matrix(secondary,(feed.quarantine||[]).filter(function(p){return p.ion==='I'&&(p.tier==='DEEPGRADED'||p.tier==='CONSISTENT');}),feed.gaps||[],catalog,['DEEPGRADED','CONSISTENT'])+'</section>';
  }).catch(function(err){root.innerHTML='<p class="product-feed-error"><strong>PROBLEM:</strong> '+esc(element)+' feed could not be loaded. This element failed in isolation; other element pages remain available.<br><small>'+esc(err.message)+'</small></p>';});
}());
