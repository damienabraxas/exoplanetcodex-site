import {spectralColor} from './education-models.mjs';
import {validateReference, transitionValues, initialState, statesFor, searchEntries, queryTerms, safeLocalURL, transitionCSV, combinedAtomicReference} from './education-core.mjs';
const $ = id => document.getElementById(id);
async function localJSON(path) { const r=await fetch(path);if(!r.ok)throw Error('Local resource unavailable');return r.json(); }
function download(name, text, type) {
  const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function highlighted(node, value, terms) {
  // Text nodes only: source data and query are never interpolated as HTML.
  const s=String(value),ranges=[];
  for(const term of terms){let from=0,i;while((i=s.toLowerCase().indexOf(term,from))>=0){ranges.push([i,i+term.length]);from=i+term.length;}}
  ranges.sort((a,b)=>a[0]-b[0]);let cursor=0;
  for(const [a,b] of ranges){if(a<cursor)continue;node.append(document.createTextNode(s.slice(cursor,a)));const m=document.createElement('mark');m.textContent=s.slice(a,b);node.append(m);cursor=b;}
  node.append(document.createTextNode(s.slice(cursor)));
}
async function setupSearch() {
  try {
    const data=await localJSON('/assets/data/education-search.v1.json');
    if(data.schema_version!==1||!Array.isArray(data.entries)||!data.entries.every(e=>typeof e.title==='string'&&typeof e.description==='string'&&typeof e.concepts==='string'&&safeLocalURL(e.url)&&['Lesson','Interactive','Glossary','Methodology'].includes(e.type)))throw Error('Invalid local content index');
    $('education-search-form').hidden=false;$('search-load').hidden=true;
    const render=()=>{
      const q=$('education-query').value, results=searchEntries(data.entries,q),list=$('search-results');list.replaceChildren();
      $('search-status').textContent=!q.trim()?'Try photon energy, equivalent width, Teff or ξ.':results.length?`${results.length} matching destinations (up to 20 shown).`:'No matches. Try wavelength, hydrogen, abundance, Teff or microturbulence; or browse the module tiles.';
      for(const e of results){const li=document.createElement('li'),a=document.createElement('a'),type=document.createElement('small'),p=document.createElement('p');a.href=e.url;highlighted(a,e.title,queryTerms(q));type.textContent=e.type;highlighted(p,e.description,queryTerms(q));li.append(type,a,p);list.append(li);}
    };
    $('education-search-form').addEventListener('submit',e=>{e.preventDefault();$('search-results').querySelector('a')?.focus();});
    $('education-query').addEventListener('input',render);render();
  }catch(e){$('search-load').textContent='Search is unavailable. Browse the module tiles or follow the Glossary and Methodology links in each lesson.';}
}
async function setupExplorer() {
  try {
    const [hydrogen,sodium]=await Promise.all([localJSON('/assets/data/education-hydrogen.v1.json'),localJSON('/assets/data/education-sodium.v1.json')]);
    const data=combinedAtomicReference(hydrogen,sodium);
    let state=initialState(data,location.search),animations=[],playing=false;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    function cancel(){for(const a of animations)a.cancel();animations=[];playing=false;$('play-transition').disabled=false;}
    function updateURL(){const u=new URL(location.href);u.searchParams.set('transition',state.transition);u.searchParams.set('mode',state.mode);history.replaceState(null,'',u);u.hash='hydrogen-explorer';$('share-configuration').value=u.href;}
    function render(syncURL=true){
      cancel();const v=transitionValues(data,state.transition),s=statesFor(v,state.mode),em=state.mode==='emission';
      const element=v.transition.element; $('atom').value=element;
      $('transition').replaceChildren(...data.transitions.filter(t=>t.element===element).map(t=>{const o=document.createElement('option');o.value=t.id;o.textContent=t.label;return o;}));
      $('transition').value=state.transition;document.querySelector(`input[name="mode"][value="${state.mode}"]`).checked=true;
      $('upper-label').textContent=`${v.upper.label} · ${v.upper.energy_cm1.toFixed(4)} cm⁻¹`;$('lower-label').textContent=`${v.lower.label} · ${v.lower.energy_cm1.toFixed(4)} cm⁻¹`;
      $('transition-arrow').setAttribute('d',em?'M190 85 V200':'M190 200 V85');$('electron').setAttribute('cy',s.startY);$('photon').setAttribute('cx',em?'280':'480');
      const label=`${em?'Emission':'Absorption'}: ${s.start.label} → ${s.end.label}. ${em?'Emits':'Absorbs'} a ${v.energy_eV.toFixed(3)} eV photon (${v.wavelength_nm.toFixed(2)} nm, vacuum).`;
      $('transition-title').textContent=`${element==='H'?'Hydrogen':'Sodium'} ${state.mode}`;$('transition-desc').textContent=label+' Vertical level spacing and photon path are schematic, not to scale.';$('transition-caption').textContent=label+' Electron markers show states, not orbits.';
      $('wavelength').textContent=`${v.wavelength_nm.toFixed(2)} nm`;$('photon-energy').textContent=`${v.energy_eV.toFixed(3)} eV`;$('photon-label').textContent=`${v.energy_eV.toFixed(3)} eV`;$('transition-band').textContent=v.transition.band;
      const color=spectralColor(v.wavelength_nm);
      $('photon').style.fill=color.css; $('arrowhead').firstElementChild.style.fill=color.css; $('transition-arrow').style.stroke=color.css; $('line-profile').style.stroke=color.css;
      drawAtomicSpectrum(data,v,state.mode);
      $('atomic-color-note').textContent=color.visible?'Photon color is an approximate visible-wavelength rendering, not exact human color perception.':'UV photon is invisible: the pale marker is symbolic, not a visible UV color.';
      const points=Array.from({length:121},(_,i)=>{const x=40+i*4,y=(em?120:40)+(em?-85:85)*Math.exp(-.5*((x-280)/16)**2);return `${i?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`;});$('line-profile').setAttribute('d',points.join(' '));
      $('line-label').textContent=`${v.wavelength_nm.toFixed(2)} nm · vacuum`;$('line-desc').textContent=`Illustrative ${em?'peak':'dip'} at ${v.wavelength_nm.toFixed(2)} nm vacuum. Width and height are arbitrary, not an equivalent-width prediction.`;
      $('transition-status').textContent=`Ready: ${state.mode} starts in ${s.start.label}. ${motion.matches?'Reduced motion: Play once shows the final state immediately.':''}`;
      if(syncURL)updateURL();else{const u=new URL(location.href);u.hash='hydrogen-explorer';$('share-configuration').value=u.href;}
    }
    $('atom').addEventListener('change',()=>{state.transition=data.transitions.find(t=>t.element===$('atom').value).id;render();});
    $('transition-controls').hidden=false;$('share-controls').hidden=false;$('explorer-load').textContent='Reference: hydrogen H I and neutral sodium Na I · individual fine-structure components · vacuum Ritz estimates from cited NIST levels.';
    $('transition').addEventListener('change',()=>{state.transition=$('transition').value;render();});
    document.querySelectorAll('input[name="mode"]').forEach(el=>el.addEventListener('change',()=>{state.mode=el.value;render();}));
    $('transition-controls').addEventListener('reset',e=>{e.preventDefault();state={transition:'balmer-alpha',mode:'emission'};render();});
    $('play-transition').addEventListener('click',async()=>{
      if(playing)return;render();playing=true;$('play-transition').disabled=true;
      const v=transitionValues(data,state.transition),s=statesFor(v,state.mode),em=state.mode==='emission';
      if(!motion.matches){
        animations=[$('electron').animate([{transform:'translateY(0)'},{transform:`translateY(${s.endY-s.startY}px)`}],{duration:1000,fill:'forwards'}),$('photon').animate([{transform:'translateX(0)'},{transform:`translateX(${em?200:-200}px)`}],{duration:1000,fill:'forwards'})];
        try{await Promise.all(animations.map(a=>a.finished));}catch{return;}
      }
      cancel();$('electron').setAttribute('cy',s.endY);$('photon').setAttribute('cx',em?'480':'280');
      $('transition-status').textContent=`Complete: electron ${em?'fell':'rose'} from ${s.start.label} to ${s.end.label}; photon ${em?'emitted':'absorbed'}. Photon energy remains ${v.energy_eV.toFixed(3)} eV.`;
    });
    motion.addEventListener('change',()=>render());
    $('download-transition').addEventListener('click',()=>download(`atom-${state.transition}-${state.mode}.csv`,transitionCSV(transitionValues(data,state.transition),state.mode,data),'text/csv;charset=utf-8'));
    $('download-diagram').addEventListener('click',()=>{
      const v=transitionValues(data,state.transition),svg=$('transition-diagram').cloneNode(true);
      const style=document.createElementNS('http://www.w3.org/2000/svg','style');style.textContent='svg{background:#050c17}text{fill:#b8cfe8;font:13px monospace}.level{stroke:#627e9c;stroke-width:2}#transition-arrow{stroke:#4fc3f7;stroke-width:2.5;fill:none}#electron{fill:#e8a24a}#photon{fill:#4fc3f7}';svg.prepend(style);
      const desc=svg.querySelector('desc');desc.textContent+=` ${v.wavelength_nm.toFixed(2)} nm vacuum. Source: ${data.sources[v.transition.element==='Na'?'na-levels':'nist-levels'].url}. Educational illustration; not survey data. Source checked ${data.source_accessed}.`;
      download(`atom-${state.transition}-${state.mode}.svg`,new XMLSerializer().serializeToString(svg),'image/svg+xml');
    });
    $('share-configuration').addEventListener('focus',e=>e.target.select());
    addEventListener('popstate',()=>{state=initialState(data,location.search);render(false);});render(false);
  }catch(e){$('explorer-load').textContent='Interactive reference could not load. The source-generated static Balmer α example remains available below.';}
}
function drawAtomicSpectrum(data,selected,mode) {
  const NS='http://www.w3.org/2000/svg';
  const item=(tag,attrs,text)=>{const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);if(text)n.textContent=text;return n;};
  function draw(id,min,max,zoom=false) {
    const svg=$(id);svg.replaceChildren();
    svg.append(item('title',{},zoom?'Sodium D fine-structure doublet, vacuum scale':'Visible spectrum with synchronized atomic line'));
    svg.append(item('desc',{},'Line positions follow vacuum wavelength. Emission adds a colored line to darkness; absorption shows a dark line in a continuum. Screen colors and line widths are approximate.'));
    svg.append(item('rect',{width:720,height:160,fill:'#050c17'}));
    const X=nm=>50+(nm-min)/(max-min)*620;
    for(let i=0;i<400;i++){
      const nm=min+(max-min)*i/400,color=spectralColor(nm).css;
      svg.append(item('rect',{x:50+i*620/400,y:24,width:2,height:16,fill:color}));
      if(mode==='absorption')svg.append(item('rect',{x:50+i*620/400,y:62,width:2,height:32,fill:color}));
    }
    const relevant=data.transitions.filter(t=>t.element===selected.transition.element);
    for(const transition of relevant){if(!zoom&&transition.id!==selected.transition.id)continue;const v=transitionValues(data,transition.id);if(v.wavelength_nm<min||v.wavelength_nm>max)continue;const active=transition.id===selected.transition.id;svg.append(item('line',{x1:X(v.wavelength_nm),x2:X(v.wavelength_nm),y1:58,y2:98,stroke:active?(mode==='emission'?spectralColor(v.wavelength_nm).css:'#04060d'):'#9ab2cc','stroke-width':active?4:1,'stroke-dasharray':active?'':'3 3'}));}
    const lineInside=selected.wavelength_nm>=min&&selected.wavelength_nm<=max;
    const info=zoom?'Na D₂ and D₁ split by upper-state fine structure':lineInside?selected.wavelength_nm.toFixed(2)+' nm vacuum':selected.wavelength_nm.toFixed(2)+' nm is outside visible; no visible line drawn';
    svg.append(item('text',{x:50,y:18,fill:'#b8cfe8','font-size':12},zoom?'Doublet zoom · vacuum scale':'Visible reference colors (approximate)'));
    svg.append(item('text',{x:50,y:120,fill:'#b8cfe8','font-size':12},min+' nm'));
    svg.append(item('text',{x:590,y:120,fill:'#b8cfe8','font-size':12},max+' nm'));
    svg.append(item('text',{x:50,y:146,fill:'#b8cfe8','font-size':12},info));
  }
  draw('atomic-spectrum',380,780);
  $('atomic-doublet').toggleAttribute('hidden',selected.transition.element!=='Na');
  if(selected.transition.element==='Na')draw('atomic-doublet',588.8,590.1,true);
}
setupSearch();setupExplorer();
