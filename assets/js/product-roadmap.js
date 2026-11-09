(() => {
  'use strict';
  const host = document.getElementById('product-roadmap');
  if (!host) return;
  const labels = {planned:'Planned',discovery:'Discovery',in_development:'In development',in_review:'In review',independently_validated:'Independently validated',released:'Released',hold:'Scientific HOLD',not_assessed:'Not assessed'};
  const node = (tag, text, cls) => { const el=document.createElement(tag); if(text!==undefined)el.textContent=String(text); if(cls)el.className=cls; return el; };
  const safeURL = value => { if(typeof value!=='string')return null; if(/^\/(?!\/)/.test(value)||/^#[a-z0-9-]+$/.test(value))return value; try {const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;} catch {return null;} };
  const link = (title,url) => {const href=safeURL(url); const el=node(href?'a':'span',title); if(href)el.href=href;return el;};
  const states = record => {const box=node('div',undefined,'state-pair');box.append(node('span',`Implementation: ${labels[record.status]||'Unknown'}`,'state'),node('span',`Validation: ${labels[record.validation]||'Not assessed'}`,'state science'));return box;};
  const evidence = items => {const list=node('ul',undefined,'evidence');for(const e of items||[]){const li=node('li');li.append(link(e.label,e.url),node('small',`${e.kind==='review'?'Review branch':e.kind==='scope'?'Scope only':'Merged evidence'} · inspected ${e.date}`));list.append(li);}return list;};
  const issues = ids => {const p=node('p',undefined,'roadmap-meta');p.append('Scope: ');for(const id of ids||[])p.append(link(id,`https://linear.app/ryans-adventure-zone/issue/${encodeURIComponent(id)}`),' ');return p;};
  // Ordered implementation stages are ordinal markers, not weighted completion.
  const stageBar = record => {
    const stages=['planned','discovery','in_development','in_review','released'];
    const current=stages.indexOf(record.status);
    const box=node('div',undefined,'stage-progress');
    box.append(node('div',`Development stage · ${labels[record.status]||'Not assessed'}`,'roadmap-meta'));
    const bar=node('div',undefined,'stage-bar');
    bar.setAttribute('role','progressbar');bar.setAttribute('aria-label',`${record.title} development stage`);
    bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','4');
    if(current>=0)bar.setAttribute('aria-valuenow',String(current));
    bar.setAttribute('aria-valuetext',`${labels[record.status]||'Not assessed'}; stage marker, not percentage complete`);
    stages.forEach((stage,i)=>{const segment=node('span',undefined,i<=current?'stage-segment reached':'stage-segment');segment.setAttribute('aria-hidden','true');bar.append(segment);});
    box.append(bar);return box;
  };
  let panels=[],selectors=[];
  const select = () => {const id=location.hash.slice(1);const found=panels.some(p=>p.id===id);const selected=found?id:panels[0]?.id;panels.forEach(p=>p.hidden=p.id!==selected);selectors.forEach(a=>a.setAttribute('aria-current',String(a.hash.slice(1)===selected)));};
  function render(data) {
    if(data.schema!=='codex.product_roadmap/1'||!Array.isArray(data.products))throw Error('Invalid snapshot');
    host.replaceChildren(); panels=[];selectors=[];
    if(!data.products.length){host.append(node('p','No product milestones are available in this snapshot.'));return;}
    document.getElementById('roadmap-method').textContent=data.methodology;
    const cards=node('div',undefined,'product-cards'), nav=node('nav',undefined,'product-selector');nav.setAttribute('aria-label','Product selector');
    for(const p of [...data.products].sort((a,b)=>a.display_order-b.display_order)){
      if(!/^[a-z][a-z0-9-]*$/.test(p.id)||!Array.isArray(p.milestones))throw Error('Invalid product');
      const card=node('article',undefined,'product-card');card.append(node('div',`0${p.display_order} / ${p.stage}`,'product-number'),node('h3',p.title),stageBar(p),states(p),node('p',p.summary),link('Explore milestones →',`#${p.id}`));cards.append(card);
      const tab=link(p.title,`#${p.id}`);nav.append(tab);selectors.push(tab);
      const panel=node('article',undefined,'product-detail');panel.id=p.id;panel.setAttribute('aria-label',p.title);panel.append(node('h3',p.title),stageBar(p),states(p),node('p',p.summary),node('p',`Next verification gate: ${p.gate}`,'next-gate'),node('p',`Latest evidence inspection: ${p.updated}`,'roadmap-meta'),issues(p.issues));
      const list=node('ol',undefined,'milestones');
      for(const mi of p.milestones){const li=node('li'),details=node('details'),summary=node('summary',mi.title);details.append(summary,states(mi),node('p',mi.summary),node('p',`Verification gate: ${mi.gate}`),evidence(mi.evidence),issues(mi.issues));li.append(details);list.append(li);}panel.append(list);
      if(p.id==='stellar-survey'){
        panel.append(link('Existing element release progress ↓','#stellar-releases'));
        const wrap=node('div',undefined,'target-table-wrap'),table=node('table',undefined,'target-table');table.append(node('caption','Canonical target roster · catalog state, not scientific certification'));
        const header=node('tr');for(const t of ['Star','Role','Order','Catalog state'])header.append(node('th',t));const thead=node('thead');thead.append(header);table.append(thead);const tbody=node('tbody');
        for(const target of data.targets||[]){const tr=node('tr');for(const val of [target.system_name,target.role.replaceAll('_',' '),target.run_order||'Not ordered',target.pipeline_status.replaceAll('_',' ')])tr.append(node('td',val));tbody.append(tr);}table.append(tbody);wrap.append(table);panel.append(wrap,node('p','Canonical element targets (including ion-specific Fe II):','roadmap-meta'),node('p',(data.elements||[]).join(' · '),'canonical-elements'),evidence(Object.entries(data.sources||{}).map(([label,s])=>({label,url:s.url,kind:'merged',date:data.updated}))));
      }
      if(p.credits?.length){const credits=node('p',undefined,'credit-links');credits.append('External foundations: ');for(const id of p.credits)credits.append(link(id,`/sources/#software-${id}`),' ');panel.append(credits);}
      panels.push(panel);
    }
    host.append(cards,nav,...panels); select();
  }
  window.addEventListener('hashchange',select);
  fetch('/assets/data/product-roadmap.v1.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json();}).then(render).catch(()=>{host.replaceChildren(node('p','The roadmap snapshot is unavailable. Please use the system pages and source bibliography.','error'));});
  fetch('/assets/data/roadmap-credits.v1.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json();}).then(data=>{
    if(data.schema!=='codex.roadmap_credits/1'||!Array.isArray(data.credits))throw Error('Invalid credits');
    const credits=document.getElementById('roadmap-credits'),grid=node('div',undefined,'credits-grid');
    for(const c of data.credits.filter(c=>['grasp','atsp','atsp-book','nist','vald'].includes(c.id))){const article=node('article',undefined,'credit');article.append(node('h3',c.name),node('p',c.role),node('small',`${c.scope} · ${c.license}`),node('p'));article.lastChild.append(link('Full citation, version & reuse notes →',`/sources/#software-${c.id}`));grid.append(article);}credits.replaceChildren(grid);
  }).catch(()=>{}); // The initial bibliography link remains available on failure.
})();
