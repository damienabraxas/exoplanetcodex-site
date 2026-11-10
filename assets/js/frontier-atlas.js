(() => {
  'use strict';
  const root=document.getElementById('atlas-results');
  if(!root)return;
  const $=id=>document.getElementById(id);
  const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined&&text!==null)n.textContent=String(text);if(cls)n.className=cls;return n;};
  const name=value=>String(value||'Not yet audited').replaceAll('_',' ');
  const physics={NOT_APPLICABLE:'Not a treatment',NOT_ASSESSED:'Not yet audited',LTE:'LTE', '1D_LTE':'1D LTE','3D_LTE':'3D LTE','1D_NLTE':'1D NLTE',MEAN3D_NLTE:'Mean-3D NLTE',ONE_POINT_FIVE_D_NLTE:'1.5D NLTE',FULL3D_NLTE:'Full-3D NLTE',STRUCTURE_ONLY:'Atomic structure'};
  const safeURL=value=>{if(typeof value!=='string')return null;if(/^\/(?!\/)/.test(value)||/^#[a-zA-Z0-9_-]+$/.test(value))return value;try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}};
  const link=(text,url)=>{const href=safeURL(url);const n=el(href?'a':'span',text);if(href)n.href=href;return n;};
  const ul=items=>{const list=el('ul');items.forEach(item=>list.append(el('li',item)));return list;};
  const species=e=>e.species.molecule||[e.species.element,e.species.ion].filter(Boolean).join(' ')||'All species / resource';
  const membership=e=>Array.isArray(e.line_set_memberships)?e.line_set_memberships:[];
  let data,meta,byId,detailHost;
  const keys=['species','ion','isotope','band','component','treatment','availability','status','stellar','atmosphere','engine','membership','teff','logg','feh','co','unknown'];
  const inputId=k=>k==='q'?'atlas-search':`filter-${k}`;
  function badges(e,axis){
    const out=el('div',null,'atlas-badges');
    if(['held','published_not_acquired'].includes(e.availability))out.append(el('span',e.availability==='held'?'Available · held':'Available upstream · not acquired','atlas-badge available'));
    else out.append(el('span',e.availability==='unavailable'?'Resource unavailable':'Availability not yet audited','atlas-badge'));
    const status=e.coverage_status==='validated'?'Independently validated':e.coverage_status==='incompatible'?'Known gap · incompatible':e.coverage_status==='not_yet_searched'?'Not yet audited':'Unverified';
    out.append(el('span',status,`atlas-badge ${e.coverage_status==='incompatible'?'known_gap':''}`));
    if(axis?.outside)out.append(el('span','Outside requested envelope','atlas-badge outside_scope'));
    else if(axis?.unknown)out.append(el('span','Requested domain not yet audited','atlas-badge'));
    return out;
  }
  function axes(e,filters){
    let outside=false,unknown=false;
    for(const [key,axis] of [['teff','teff'],['logg','logg'],['feh','feh'],['co','c_over_o']]){
      if(filters[key]==='')continue;
      const value=Number(filters[key]);if(!Number.isFinite(value))continue;
      const bound=e.domain.axes.find(a=>a.name===axis);
      if(!bound)unknown=true;else if(value<bound.min||value>bound.max)outside=true;
    }
    return {outside,unknown};
  }
  const componentRefs=(e,key,kind)=>[...(e.components?.[key]||[]),...(e.component_type===kind?[e.id]:[])];
  function matches(e,f){
    const assessment=axes(e,f);
    if(f.status==='outside_scope'?!assessment.outside:assessment.outside)return false;
    if(f.unknown==='exclude'&&assessment.unknown)return false;
    if(f.species&&(e.species.molecule||e.species.element)!==f.species)return false;
    if(f.ion&&e.species.ion!==f.ion)return false;
    if(f.isotope&&!e.species.isotopologues.includes(f.isotope))return false;
    if(f.band==='unaudited'&&e.coverage.bands.length)return false;
    if(f.band&&f.band!=='unaudited'&&!e.coverage.bands.includes(f.band))return false;
    if(f.component&&e.component_type!==f.component)return false;
    if(f.treatment&&e.treatment!==f.treatment)return false;
    if(f.availability&&e.availability!==f.availability)return false;
    if(f.status==='validated'&&e.coverage_status!=='validated')return false;
    if(f.status==='known_gap'&&!['incompatible','unavailable'].includes(e.coverage_status))return false;
    if(f.status==='unaudited'&&e.coverage_status!=='not_yet_searched'&&!assessment.unknown)return false;
    if(f.status==='unverified'&&e.coverage_status!=='unvalidated')return false;
    if(f.stellar==='cool'&&e.species.kind!=='molecule')return false;
    if(f.stellar==='fg'&&!e.source_ids.some(id=>['cno-readme','fe-ml-audit'].includes(id)))return false;
    if(f.atmosphere&&!componentRefs(e,'atmosphere_ids','atmosphere_grid').includes(f.atmosphere))return false;
    if(f.engine&&!componentRefs(e,'solver_ids','solver').includes(f.engine))return false;
    if(f.membership==='not_audited'&&membership(e).length)return false;
    if(f.membership&&f.membership!=='not_audited'&&!membership(e).some(m=>m.id===f.membership))return false;
    if(f.q){const sources=e.source_ids.map(id=>data.sources[id]);const citations=e.upstream_citation_refs.map(id=>data.citations[id]);const hay=JSON.stringify([species(e),physics[e.treatment],name(e.component_type),e,sources,citations]).toLowerCase();if(!hay.includes(f.q.toLowerCase()))return false;}
    return true;
  }
  function readFilters(){const f={q:$('atlas-search').value.trim()};keys.forEach(k=>f[k]=$(inputId(k)).value);return f;}
  function writeURL(f){const url=new URL(location.href);url.search='';for(const [key,value] of Object.entries(f))if(value&&!(key==='unknown'&&value==='include'))url.searchParams.set(key,value);history.replaceState(null,'',url);}
  function render(){
    const f=readFilters();writeURL(f);const rows=data.entries.filter(e=>matches(e,f));
    $('result-count').textContent=`${rows.length} of ${data.entries.length} resource records`;
    const notes=[];
    if(['teff','logg','feh','co'].some(k=>f[k]!==''))notes.push('Quantitative matches describe axis envelopes only. Unknown domains remain explicitly unaudited.');
    if(f.membership)notes.push('Line-set memberships have not yet been supplied in this canonical snapshot. Source authorship does not imply membership or quality; RYA-1376 tracks the audit.');
    if(f.stellar==='cool')notes.push('M-dwarf research view: molecular resources and discovery pointers, not a validated model for an M dwarf.');
    $('filter-note').textContent=notes.join(' ');
    root.replaceChildren();root.setAttribute('aria-busy','false');
    if(!rows.length){const empty=el('div',null,'atlas-empty');empty.append(el('h3','No records match these filters'),el('p','A missing registry result is not proof of missing literature. Try resetting filters or inspect the research gaps.'));root.append(empty);return;}
    const wrap=el('div',null,'matrix-wrap'),table=el('table',null,'coverage-table');table.setAttribute('role','table');table.append(el('caption','Resource inventory · availability and scientific assessment remain independent'));
    const headers=['Species / resource','Component & treatment','Wavelength / scope','Availability & assessment','Evidence'];const thead=el('thead'),tr=el('tr');headers.forEach(title=>{const th=el('th',title);th.scope='col';tr.append(th);});thead.append(tr);table.append(thead);const tbody=el('tbody');
    for(const e of rows){const row=el('tr');const cells=headers.map(label=>{const td=el('td');td.dataset.label=label;return td;});
      cells[0].append(link(species(e),`#entry-${e.id}`),el('span',e.id,'entry-kind'));
      cells[1].append(el('span',name(e.component_type)),el('span',physics[e.treatment]||name(e.treatment),'entry-kind'));
      cells[2].append(el('span',e.coverage.bands.join(' / ')||'Band not yet audited'),el('span',e.domain.axes.filter(a=>['teff','logg','feh'].includes(a.name)).map(a=>`${a.name}: ${a.min}–${a.max} ${a.unit}`).join(' · ')||'Quantitative scope not yet audited','entry-kind'));
      cells[3].append(badges(e,axes(e,f)));cells[4].append(link('Details & sources',`#entry-${e.id}`),el('span',`Audited: ${e.literature_audit.date||'Not yet audited'}`,'entry-kind'));row.append(...cells);tbody.append(row);
    }table.append(tbody);wrap.append(table);root.append(wrap);
  }
  const field=(parent,title,text)=>{parent.append(el('h4',title),el('p',text));};
  function showDetail(focus=true){
    detailHost.replaceChildren();const hash=location.hash.slice(1);if(!hash.startsWith('entry-'))return;
    const e=byId.get(hash.slice(6));if(!e){detailHost.append(el('p','This entry link is not present in the current snapshot.','atlas-empty'));return;}
    const panel=el('article',null,'atlas-detail');panel.id=hash;panel.setAttribute('aria-labelledby','entry-title');const head=el('div',null,'detail-head');const heading=el('h3',species(e));heading.id='entry-title';heading.tabIndex=-1;head.append(heading,link('Close details','#coverage'));head.lastChild.className='detail-close';panel.append(head,el('p',e.id,'atlas-meta'),badges(e,axes(e,readFilters())),el('p',e.summary));
    const grid=el('div',null,'detail-grid'),left=el('section'),right=el('section');
    field(left,'Resource & physical treatment',`${name(e.component_type)} · ${physics[e.treatment]||name(e.treatment)}`);
    field(left,'Exact applicability & limitations',e.domain.scope);
    if(e.domain.axes.length){const table=el('table',null,'axis-table');table.append(el('caption','Stored axis envelopes · not an interpolation hull'));const header=el('tr');['Axis','Minimum','Maximum','Units'].forEach(t=>{const th=el('th',t);th.scope='col';header.append(th);});const thead=el('thead');thead.append(header);const body=el('tbody');e.domain.axes.forEach(a=>{const tr=el('tr');[a.name,a.min,a.max,a.unit].forEach(v=>tr.append(el('td',v)));body.append(tr);});table.append(thead,body);left.append(table);}else left.append(el('p','Quantitative domain: not yet audited.'));
    left.append(el('h4','Unassessed physical constraints'),ul(e.domain.unassessed_constraints));field(left,'Input completeness',e.input_completeness);
    field(left,'Observation geometry','Not established by this atlas record. Verify intensity versus flux, ray/view geometry and exact holding before scientific use.');
    field(left,'Versions and source identity',e.version);field(left,'Isotopologues',e.species.isotopologues.join(' · ')||'Not specified / not yet audited; no default isotope is inferred.');
    field(right,'Independent verification',`${name(e.verification)}. ${e.execution_approved?'See canonical authorization.':'This inventory does not authorize scientific execution or adoption.'}`);
    field(right,'License & attribution',`${name(e.license.status)}: ${e.license.note}`);field(right,'Last source audit',`${e.literature_audit.date||'Not yet audited'}. ${e.literature_audit.scope}`);
    right.append(el('h4','Solver / atmosphere / atom relationships'),el('p',e.components.note));for(const [key,title] of [['solver_ids','Solver'],['atmosphere_ids','Atmosphere'],['model_atom_ids','Model atom']]){const p=el('p',`${title}: `);const ids=e.components[key];if(!ids.length)p.append('Not yet audited / no default inferred');else ids.forEach(id=>p.append(link(id,`#entry-${id}`),' '));right.append(p);}
    right.append(el('h4','Line-set memberships · independent of grade'));const memberships=membership(e);if(!memberships.length)right.append(el('p','Not yet audited. Asplund, Amarsi, Bergemann/OpenMULTI3D, Codex and theoretical Codex memberships are not inferred from a source name.'));
    else{const list=el('ul');memberships.forEach(m=>{const li=el('li',`${name(m.id)} · ${m.reason||'Selection rationale not yet audited'} `);if(m.evidence_url)li.append(link('Membership evidence',m.evidence_url));list.append(li);});right.append(list);}
    field(right,'Quality and origin axes','Empirical line suitability, experimental gf quality and theoretical calculation validation are not supplied as grades by this atlas. No grade or recommendation is inferred.');right.append(link('Canonical grade policy',`https://github.com/damienabraxas/exoplanetcodex/blob/${data.science_base}/${e.grade_policy_ref}`));
    grid.append(left,right);panel.append(grid);
    panel.append(el('h4','Evidence, citations & source receipts'));
    for(const id of e.source_ids){const source=data.sources[id];const box=el('section',null,'evidence-source');box.append(el('h5',id),link('Versioned evidence',source.evidence_url));if(source.upstream)box.append(' · ',link('Upstream source',source.upstream));if(source.sha256)box.append(el('p',`SHA-256: ${source.sha256}`,'atlas-meta'));if(source.audit)box.append(el('p',source.audit));if(source.bibliography_key){const c=data.citations[source.bibliography_key];if(c)box.append(el('p',`${c.authors} (${c.year}). ${c.title}`),link(c.doi?`DOI ${c.doi}`:'Citation source',c.url),el('p'));}panel.append(box);}
    panel.append(el('p'));panel.lastChild.append(link('Full software, source and reuse credits','/sources/#frontier-attribution'));
    if(e.coverage.atom_reach){field(panel,'Measured model-atom reach',`${e.coverage.atom_reach.atom}: ${e.coverage.atom_reach.n_levels} levels, ${e.coverage.atom_reach.n_bound_bound} bound-bound transitions for ion stage ${e.coverage.atom_reach.ion_stage}. NLTE bound-bound support: ${e.coverage.atom_reach.nlte_capable?'present in this receipt; validation still separate':'not established by this atom'}.`);}
    if(e.coverage.molecular_manifest){const m=e.coverage.molecular_manifest;field(panel,'Molecular source manifest',[m.source,m.doi,m.version,m.origin].filter(Boolean).join(' · '));}
    if(e.coverage.transitions.length||e.coverage.source_labels.length){const disclosure=el('details');disclosure.append(el('summary','Inspect source transition labels and wavelength conventions'));const list=ul(e.coverage.transitions.map(t=>`${t.source_label}: air ${t.air_nm} nm; vacuum ${t.vacuum_nm===null?'not supplied':t.vacuum_nm+' nm'} · source ${t.source_id}`));list.className='transition-list';list.tabIndex=0;list.setAttribute('aria-label','Source transitions and wavelength conventions');disclosure.append(list);if(e.coverage.labels_without_component_wavelength.length)disclosure.append(el('p','Source labels without a single component wavelength: '+e.coverage.labels_without_component_wavelength.join(' · ')+'. No line centre is invented.'));panel.append(disclosure);}
    panel.append(el('h4','Research gaps & verification gates'));const gaps=data.gaps.filter(g=>e.gap_ids.includes(g.id));gaps.forEach(g=>panel.append(el('p',g.question),el('p',`Next gate: ${g.next_gate}`)));if(!gaps.length)panel.append(el('p','No separately indexed gap; record-level limitations and independent review still apply.'));
    const issues=el('p',null,'atlas-meta');e.issues.forEach(id=>issues.append(link(id,`https://linear.app/ryans-adventure-zone/issue/${id}`),' '));panel.append(issues);detailHost.append(panel);
    if(focus){heading.focus({preventScroll:true});panel.scrollIntoView({block:'start'});}
  }
  function renderGaps(){const table=el('table',null,'gap-table');table.append(el('caption','Canonical research questions, evidence and next gates'));const head=el('thead'),row=el('tr');['Research target','Question','Next verification gate'].forEach(t=>{const th=el('th',t);th.scope='col';row.append(th);});head.append(row);table.append(head);const body=el('tbody');for(const gap of data.gaps){const tr=el('tr'),target=el('td',`${name(gap.priority)} priority`),question=el('td',gap.question),gate=el('td',gap.next_gate);target.append(el('p',gap.id,'atlas-meta'));gap.entry_ids.slice(0,3).forEach(id=>{const p=el('p');p.append(link(id,`#entry-${id}`));question.append(p);});for(const id of gap.source_ids){const s=data.sources[id];const p=el('p');p.append(link(`${id} evidence`,s.evidence_url));gate.append(p);}tr.append(target,question,gate);body.append(tr);}table.append(body);$('atlas-gaps').replaceChildren(table);}
  function option(id,value,label){const opt=el('option',label??name(value));opt.value=value;$(id).append(opt);}
  function init(){
    if(data.schema!=='codex.spectroscopic_frontier/1'||!Array.isArray(data.entries)||!data.sources||!data.gaps)throw Error('Invalid atlas');
    byId=new Map(data.entries.map(e=>[e.id,e]));if(byId.size!==data.entries.length)throw Error('Duplicate IDs');
    const unique=(fn)=>[...new Set(data.entries.flatMap(fn).filter(Boolean))].sort();
    unique(e=>[e.species.molecule||e.species.element]).forEach(v=>option('filter-species',v,v));unique(e=>[e.species.ion]).forEach(v=>option('filter-ion',v,v));unique(e=>e.species.isotopologues).forEach(v=>option('filter-isotope',v,v));
    unique(e=>[e.component_type]).forEach(v=>option('filter-component',v));Object.keys(physics).forEach(v=>option('filter-treatment',v,physics[v]||name(v)));unique(e=>[e.availability]).forEach(v=>option('filter-availability',v));
    data.entries.filter(e=>e.component_type==='atmosphere_grid').forEach(e=>option('filter-atmosphere',e.id,e.id));data.entries.filter(e=>e.component_type==='solver').forEach(e=>option('filter-engine',e.id,e.id));
    const params=new URLSearchParams(location.search);for(const key of ['q',...keys]){const value=params.get(key);if(value!==null)$(inputId(key)).value=value;}
    detailHost=el('div');detailHost.id='atlas-detail-host';root.before(detailHost);$('atlas-filters').hidden=false;
    $('atlas-filters').addEventListener('submit',event=>event.preventDefault());$('atlas-filters').addEventListener('input',render);$('atlas-filters').addEventListener('reset',()=>setTimeout(()=>{render();$('atlas-search').focus();},0));
    window.addEventListener('hashchange',()=>showDetail());window.addEventListener('popstate',()=>{const params=new URLSearchParams(location.search);for(const key of ['q',...keys])$(inputId(key)).value=params.get(key)||(key==='unknown'?'include':'');render();showDetail(false);});
    const status=$('snapshot-status');status.className='snapshot-meta';status.replaceChildren(el('span',`Source audit snapshot ${data.updated} · independent scientific assessment remains owed. `),link('Canonical source',meta.source_url),' · ',link('Snapshot provenance','/assets/data/frontier-snapshot.v1.json'));
    $('atlas-method-link').href=safeURL(meta.methodology_url)||'#methodology';$('contribution-guide').href=safeURL(meta.contribution_url)||'#contribute';const t=meta.research_target;$('target-pathway').replaceChildren(link(t.name,t.url),' · ',el('span',t.applicability),' ',link('Canonical target catalog',t.catalog_url));
    render();renderGaps();showDetail(false);
  }
  Promise.all(['/assets/data/frontier-atlas.v1.json','/assets/data/frontier-snapshot.v1.json'].map(url=>fetch(url).then(r=>{if(!r.ok)throw Error(`HTTP ${r.status}`);return r.json();}))).then(([atlas,snapshot])=>{data=atlas;meta=snapshot;init();}).catch(()=>{$('atlas-filters').hidden=true;if(detailHost)detailHost.replaceChildren();root.setAttribute('aria-busy','false');root.replaceChildren(el('p','The atlas snapshot is unavailable. Try reloading, or use the linked source bibliography and downloadable registry.','atlas-error'));$('result-count').textContent='Atlas unavailable';$('snapshot-status').textContent='Source snapshot unavailable; no coverage or validation is inferred.';});
})();
