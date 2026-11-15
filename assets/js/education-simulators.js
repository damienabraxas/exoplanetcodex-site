import {createModels, linspace, spectralColor, transitFlux} from './education-models.mjs';
import {combinedAtomicReference, transitionValues} from './education-core.mjs';
const NS = 'http://www.w3.org/2000/svg';
const colors = {cyan:'#4fc3f7',orange:'#f1b45f',green:'#75d8a1',muted:'#9ab2cc',bright:'#ddeeff'};
function node(tag, text, attrs = {}) {
  const n = document.createElement(tag);
  if (text != null) n.textContent = text;
  for (const [k,v] of Object.entries(attrs)) n.setAttribute(k,v);
  return n;
}
function vector(tag, attrs = {}, text) {
  const n = document.createElementNS(NS,tag);
  for(const [k,v] of Object.entries(attrs)) n.setAttribute(k,v);
  if(text != null) n.textContent = text;
  return n;
}
function svg(title,description,width=720,height=300) {
  const s=vector('svg',{viewBox:`0 0 ${width} ${height}`,role:'img',xmlns:NS,'aria-label':title});
  s.append(vector('title',{},title),vector('desc',{},description),vector('rect',{width,height,fill:'#050c17'}));
  return s;
}
function label(s,x,y,text,fill=colors.muted,size=13,anchor='start') {const n=vector('text',{x,y,'text-anchor':anchor},text);n.style.fill=fill;n.style.fontSize=size+'px';n.style.fontFamily='monospace';s.append(n);}
function path(s,d,stroke=colors.cyan,extra={}) {s.append(vector('path',{d,stroke,fill:'none','stroke-width':2,...extra}));}
function plot(host,title,xlabel,ylabel,series,options={}) {
  const s=svg(title,options.description || title,720,350), all=series.flatMap(v=>v.points);
  const xmin=options.xmin ?? Math.min(...all.map(p=>p[0])), xmax=options.xmax ?? Math.max(...all.map(p=>p[0]));
  const ymin=options.ymin ?? Math.min(...all.map(p=>p[1])), ymax=options.ymax ?? Math.max(...all.map(p=>p[1]));
  const X=x=>62+(x-xmin)/(xmax-xmin||1)*634, Y=y=>280-(y-ymin)/(ymax-ymin||1)*180;
  path(s,'M62 94 V280 H696','#627e9c');
  for(let i=0;i<=4;i++){
    const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;
    label(s,X(x),305,x.toFixed(2),colors.muted,12,'middle');
    label(s,5,Y(y)+4,y.toFixed(2));
  }
  label(s,62,24,title,colors.bright,15);label(s,62,335,xlabel);label(s,62,49,ylabel);
  if(options.area){const a=options.area;path(s,`M${X(a[0][0])} ${Y(options.baseline??1)} `+a.map(p=>`L${X(p[0])} ${Y(p[1])}`).join(' ')+` L${X(a.at(-1)[0])} ${Y(options.baseline??1)} Z`,colors.orange,{fill:'#75502c','fill-opacity':.6,'stroke-width':0});}
  let legendX=62;
  for(const line of series){
    const color=line.color||colors.cyan;
    if(line.dots){for(const [x,y] of line.points)s.append(vector('circle',{cx:X(x),cy:Y(y),r:2,fill:color}));}
    else path(s,line.points.map(([x,y],i)=>`${i?'L':'M'}${X(x).toFixed(2)} ${Y(y).toFixed(2)}`).join(' '),color,line.dashed?{'stroke-dasharray':'5 5'}:{});
    if(line.label){label(s,legendX,75,line.label,color,11);legendX+=line.label.length*6.7+18;}
  }
  if(options.marker){const [x,y]=options.marker;s.append(vector('circle',{cx:X(x),cy:Y(y),r:5,fill:colors.bright,stroke:colors.orange,'stroke-width':2}));}
  host.append(s);
  return {s,X,Y};
}
function pairs(x,y){return x.map((v,i)=>[v,y[i]]);}
function colorStrip(host,nm,onSelect) {
  const s=svg('Visible spectrum and selected wavelength','Approximate screen colors from 380 to 780 nm; selected wavelength is positioned on a linear wavelength axis.',720,130);
  for(let i=0;i<400;i++)s.append(vector('rect',{x:60+i*1.6,y:20,width:1.7,height:40,fill:spectralColor(380+i).css}));
  const x=60+(nm-380)*1.6;
  path(s,`M${x} 15 V70`,colors.bright,{'stroke-width':3});label(s,60,95,'380 nm');label(s,594,95,'780 nm');label(s,250,118,`${nm.toFixed(0)} nm · drag to tune`);
  if(onSelect){
    s.classList.add('spectrum-drag');
    const tune=event=>{const box=s.getBoundingClientRect(),px=(event.clientX-box.left)/box.width*720;onSelect(Math.max(380,Math.min(780,Math.round(380+(px-60)/1.6))));};
    let dragging=false;
    s.addEventListener('pointerdown',e=>{dragging=true;s.setPointerCapture(e.pointerId);tune(e);});
    s.addEventListener('pointermove',e=>{if(dragging)tune(e);});s.addEventListener('pointerup',()=>dragging=false);s.addEventListener('pointercancel',()=>dragging=false);
  }
  host.append(s);
}
function dispersionDiagram(host,models,state) {
  const s=svg('Prism refraction versus grating diffraction','Schematic ray fan; numeric angles use minimum-deviation prism geometry and normal-incidence grating orders.',720,280);
  label(s,30,28,'PRISM · refraction',colors.bright);label(s,385,28,'GRATING · interference',colors.bright);
  s.append(vector('polygon',{points:'120,75 60,205 185,205',fill:'#183c59',stroke:colors.cyan}));path(s,'M15 150 H85',colors.bright);
  path(s,'M370 150 H450',colors.bright);
  for(let i=0;i<10;i++)path(s,`M${445+i*3} 70 V220`,'#607e99');
  const waves=[400,450,500,550,600,650,700];if(!waves.includes(state.wavelength))waves.push(state.wavelength);
  for(const nm of waves){const p=models.prism(nm,state.apex),g=models.grating(nm,state.grooves,Number(state.order)),color=spectralColor(nm).css;
    const yp=155+(p.deviation_deg-models.prism(550,state.apex).deviation_deg)*25;
    path(s,`M160 155 L330 ${yp}`,color,{'stroke-width':nm===state.wavelength?4:1.5});
    if(g.angle_deg!==null){const angle=g.angle_deg*Math.PI/180;path(s,`M470 150 L${470+210*Math.cos(angle)} ${150-125*Math.sin(angle)}`,color,{'stroke-width':nm===state.wavelength?4:1.5});}
  }
  label(s,25,256,'Ray fan exaggerated; compare numeric angles.');label(s,385,256,'mλ/d outside [−1,1]: no order.');host.append(s);
}
function transitDisk(host,p,u,b,time) {
  const s=svg('Planet crossing the stellar disk','Projected geometry; planet radius and impact parameter share the stellar-radius scale.',720,270);
  const phase=2*Math.PI*time/72,x=10*Math.sin(phase),y=b*Math.cos(phase);
  const gradient=vector('radialGradient',{id:'transit-star-gradient'});gradient.append(vector('stop',{offset:0,'stop-color':'#ffe1a1'}),vector('stop',{offset:1,'stop-color':`rgb(${Math.round(255*(1-u*.6))},${Math.round(200*(1-u*.6))},100)`}));const defs=vector('defs');defs.append(gradient);s.append(defs);
  s.append(vector('circle',{cx:360,cy:135,r:105,fill:'url(#transit-star-gradient)'}));path(s,`M70 ${135-105*b} H650`,'#6b8aad',{'stroke-dasharray':'4 5'});
  s.append(vector('circle',{cx:360+x*105,cy:135-y*105,r:p*105,fill:'#080e1a',stroke:colors.cyan}));label(s,30,28,'Projected orbit near transit · R★ = disk radius',colors.bright);label(s,30,256,'Disk intensity illustration; light curve uses the stated limb law.');host.append(s);
}
function download(name,text,type) {const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function csv(rows){return rows.map(r=>r.map(x=>'"'+String(x??'unknown').replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';}
async function readJSON(url){const r=await fetch(url);if(!r.ok)throw Error(`Missing local model: ${url}`);return r.json();}

async function setup() {
  let definitions,config,hydrogen,sodium,models,atoms;
  try {
    [definitions,config,hydrogen,sodium]=await Promise.all(['education-widgets.v1.json','education-models.v1.json','education-hydrogen.v1.json','education-sodium.v1.json'].map(p=>readJSON('/assets/data/'+p)));
    if(definitions.schema_version!==1||config.schema_version!==1||!Array.isArray(definitions.widgets)||!config.sources||!config.glass||!config.slab)throw Error('Invalid teaching configuration');
    models=createModels(hydrogen.constants,config);atoms=combinedAtomicReference(hydrogen,sodium);
  } catch(error){
    for(const root of document.querySelectorAll('[data-widget]')) root.querySelector('[data-load]').textContent='The local teaching-model data could not load. No simulated result is available. The authored lesson and assumptions remain readable.';
    return;
  }
  for(const def of definitions.widgets) {
    const root=document.getElementById(def.id),form=root.querySelector('form'),host=root.querySelector('[data-visual]'),result=root.querySelector('[data-result]');
    const share=root.querySelector('[data-share]'), params=new URLSearchParams(location.search);
    let state={},dataRows=[],checked=false,metadata={};
    const input=name=>form.elements.namedItem(name);
    const initialWarnings=[];
    for(const c of def.controls){
      const key=def.id+'.'+c.name,raw=params.get(key);let value=c.value;
      if(raw!==null){
        if(c.kind==='select'){if(c.options.some(([v])=>v===raw))value=raw;else initialWarnings.push(c.label);}
        else if(raw.trim()!==''&&Number.isFinite(Number(raw))&&Number(raw)>=c.min&&Number(raw)<=c.max)value=Number(raw);
        else initialWarnings.push(c.label);
      }
      state[c.name]=value;input(c.name).value=value;
    }
    function selectState(changes){for(const [name,value] of Object.entries(changes)){state[name]=value;input(name).value=value;}render();}
    function updateURL(){const u=new URL(location.href);for(const c of def.controls){const key=def.id+'.'+c.name;if(String(state[c.name])===String(c.value))u.searchParams.delete(key);else u.searchParams.set(key,state[c.name]);}history.replaceState(null,'',u);u.hash=def.id;share.value=u.href;}
    function render() {
      host.replaceChildren();metadata={};dataRows=[];
      for(const c of def.controls)root.querySelector(`[data-value="${c.name}"]`).textContent=String(state[c.name]);
      if(def.id==='light-photon') {
        const p=models.photon(state.wavelength);colorStrip(host,p.nm,nm=>{input('wavelength').value=nm;input('wavelength').dispatchEvent(new Event('input',{bubbles:true}));});
        result.textContent=`${p.nm} nm → ${p.THz.toFixed(2)} THz (${p.Hz.toExponential(4)} Hz), ${p.eV.toFixed(4)} eV (${p.J.toExponential(4)} J). Displayed color is approximate.`;
        dataRows=[['wavelength_vacuum_nm','frequency_Hz','photon_energy_eV','photon_energy_J'],[p.nm,p.Hz,p.eV,p.J]];
      } else if(def.id==='dispersion') {
        dispersionDiagram(host,models,state);const p=models.prism(state.wavelength,state.apex),g=models.grating(state.wavelength,state.grooves,Number(state.order));
        const dp=(models.prism(state.wavelength+.1,state.apex).deviation_deg-models.prism(state.wavelength-.1,state.apex).deviation_deg)/.2;
        const gp=g.dispersion_deg_per_nm;
        result.textContent=`Prism n=${p.n.toFixed(5)}, minimum deviation ${p.deviation_deg.toFixed(3)}°, dispersion ${dp.toFixed(4)}°/nm. Grating order ${state.order}: ${g.angle_deg===null?'no propagating order':g.angle_deg.toFixed(3)+'°, dispersion '+(Number.isFinite(gp)?gp.toFixed(4)+'°/nm':'grazing-order singularity')}.`;
        dataRows=[['wavelength_nm','prism_min_deviation_deg','grating_angle_deg','prism_dispersion_deg_per_nm','grating_dispersion_deg_per_nm'],[state.wavelength,p.deviation_deg,g.angle_deg,dp,gp]];
      } else if(def.id==='resolution') {
        const p=models.resolution(state.R,state.separation,state.sampling,state.snr);
        plot(host,'Two nearby absorption lines','Offset from 550 nm (nm)','Normalized flux',[{points:pairs(p.x,p.flux),label:'Noise-free'},{points:p.samples,dots:true,color:colors.orange,label:'Samples + noise'}],{ymin:.3,ymax:1.13});
        result.textContent=`Instrument FWHM = ${p.fwhm_nm.toFixed(5)} nm; separation / instrumental FWHM = ${p.separation_over_resolution.toFixed(2)}. ${state.sampling} samples/FWHM; SNR ${state.snr}. Judge the curve and sampled data; no universal resolved/unresolved cutoff is applied.`;
        dataRows=[['offset_nm','noise_free_normalized_flux'],...pairs(p.x,p.flux),[],['sample_offset_nm','sampled_noisy_flux'],...p.samples];metadata.harps=config.harps;
      } else if(def.id==='doppler') {
        const x=linspace(498.8,501.2,601),centers=[499.7,500,500.3],factor=models.doppler(500,state.velocity).observed_nm/500;
        const flux=(w,f)=>1-centers.reduce((s,l)=>s+.35*Math.exp(-.5*((w-l*f)/(.018*f))**2),0),reference=x.map(v=>flux(v,1)),shifted=x.map(v=>flux(v,factor));
        plot(host,'One spectrum, shifted together','Vacuum wavelength (nm)','Normalized flux',[{points:pairs(x,reference),label:'Rest reference'},{points:pairs(x,shifted),color:colors.orange,label:'Observed'}],{ymin:.5,ymax:1.05});
        const d=models.doppler(500,state.velocity);result.textContent=`${state.velocity>0?'Receding / redshift':state.velocity<0?'Approaching / blueshift':'Stationary'}: 500.00000 nm → ${d.observed_nm.toFixed(5)} nm. β=${d.beta.toExponential(3)}. Linear approximation differs by ${Math.abs(d.observed_nm-d.approximate_nm).toExponential(2)} nm; valid to first order in |v|/c.`;
        dataRows=[['rest_nm','observed_nm','velocity_km_s','linear_approximation_nm'],...centers.map(n=>{const q=models.doppler(n,state.velocity);return[n,q.observed_nm,state.velocity,q.approximate_nm];})];
      } else if(def.id==='stellar-simulator') {
        const p=models.stellar(state),reference=models.stellar({teff:5772,logg:4.44,metallicity:0,xi:1,R:115000});
        plot(host,'Weak and saturated teaching lines','Vacuum wavelength near hypothetical 500 nm','Normalized transmitted flux',[{points:pairs(p.x,p.weak.flux),label:'Weak',color:colors.green},{points:pairs(p.x,p.strong.flux),label:'Saturated'},{points:pairs(reference.x,reference.strong.flux),label:'Reference',dashed:true,color:colors.orange}],{ymin:0,ymax:1.05});
        result.textContent=`Weak EW ${p.weak_mA.toFixed(2)} mÅ; saturated EW ${p.strong_mA.toFixed(2)} mÅ (intrinsic full-line areas). Doppler sigma ${p.sigma.toFixed(2)} km/s; relative lower-state opacity ${p.opacityScale.toFixed(3)}; pressure-proxy ne=${p.ne.toExponential(2)} m⁻³. Similar EWs can arise from different parameters. Schematic slab, not a validated stellar prediction.`;
        dataRows=[['wavelength_nm','weak_intrinsic_flux','weak_observed_flux','saturated_intrinsic_flux','saturated_observed_flux'],...p.x.map((x,i)=>[x,p.weak.intrinsic[i],p.weak.flux[i],p.strong.intrinsic[i],p.strong.flux[i]])];
      } else if(def.id==='equivalent-width') {
        const p=models.equivalentWidth(state);
        plot(host,'Integrate the line window','Offset from hypothetical 5000 Å (Å)','Flux / adopted continuum',[{points:pairs(p.x,p.flux.map(v=>v/state.continuum)),label:'Normalized flux'},{points:[[-1.5,1],[1.5,1]],label:'Adopted Fc',color:colors.green,dashed:true}],{ymin:0,ymax:1.1,area:p.wx.map((x,i)=>[x,1-p.residual[i]]),baseline:1});
        result.textContent=`Measured window EW = ${p.EW_mA.toFixed(2)} mÅ; same window with true continuum = ${p.true_window_mA.toFixed(2)} mÅ. FWHM = ${p.FWHM_A.toFixed(4)} Å, a width, not EW.${state.shape==='gaussian'?' Full Gaussian analytic EW = '+p.gaussian_full_mA.toFixed(2)+' mÅ.':' Lorentzian wings extend outside finite windows.'}`;
        dataRows=[['offset_A','normalized_flux','in_selected_window'],...p.x.map((x,i)=>[x,p.flux[i]/state.continuum,Math.abs(x)<=state.window])];
      } else if(def.id==='curve-growth') {
        const x=linspace(-2,2,65),convert=w=>w/299792.458*500*10000;
        const current=models.growth(state.abundance,state.b),a=x.map(v=>convert(models.growth(v,state.b).EW_velocity)),ref=x.map(v=>convert(models.growth(v,2).EW_velocity));
        plot(host,'Synthetic curve of growth','Synthetic differential abundance ΔA (dex)','Equivalent width (mÅ)',[{points:pairs(x,a),label:`b=${state.b} km/s`},{points:pairs(x,ref),color:colors.orange,dashed:true,label:'Fixed b=2 km/s'}],{ymin:0,ymax:Math.max(...a,...ref)*1.08,marker:[state.abundance,convert(current.EW_velocity)]});
        plot(host,'Profile at the selected abundance','Velocity offset (km/s)','Normalized transmitted flux',[{points:pairs(current.velocity,current.flux),label:'Current line'}],{ymin:0,ymax:1.05});
        const inferred=models.invertGrowth(current.EW_velocity,2);
        result.textContent=`EW ${convert(current.EW_velocity).toFixed(2)} mÅ. With your fixed b=${state.b}, inversion returns ΔA=${models.invertGrowth(current.EW_velocity,state.b).toFixed(2)} dex. Assuming b=2 instead gives ${inferred===null?'an EW outside the inversion domain':inferred.toFixed(2)+' dex'}. Broadening can change saturated EW without an abundance change; this is a conditional synthetic inference.`;
        dataRows=[['synthetic_differential_abundance_dex','EW_current_b_mA','EW_b2_mA'],...x.map((v,i)=>[v,a[i],ref[i]])];
      } else if(def.id==='transit-simulator') {
        const times=linspace(-4,4,181),separation=t=>{const angle=2*Math.PI*t/72;return Math.hypot(10*Math.sin(angle),state.impact*Math.cos(angle));};
        const flux=times.map(t=>transitFlux(separation(t),state.radius,state.limb)),now=transitFlux(separation(state.phase),state.radius,state.limb);
        transitDisk(host,state.radius,state.limb,state.impact,state.phase);
        plot(host,'Transit light curve','Time from mid-transit (hours)','Relative stellar flux',[{points:pairs(times,flux),label:'Predicted teaching curve'}],{ymin:1-Math.max(.015,1-Math.min(...flux))*1.2,ymax:1.003,marker:[state.phase,now]});
        result.textContent=`Mid-transit depth ${(100*(1-transitFlux(state.impact,state.radius,state.limb))).toFixed(3)}%; selected flux ${now.toFixed(6)}. Uniform central-disk estimate (Rp/R★)² = ${(100*state.radius**2).toFixed(3)}%. ${state.impact>=1+state.radius?'No transit: projected disks do not overlap.':'Geometry and limb darkening affect the observed depth.'}`;
        dataRows=[['time_from_midtransit_h','relative_stellar_flux'],...pairs(times,flux)];
      } else if(def.id==='rv-simulator') {
        const p=models.rv(state),phase=linspace(0,1,201),vel=phase.map(q=>models.rv({...state,phase:q}).v_m_s);
        const s=svg('Stellar reflex orbit','Schematic projected star and planet motion around the barycenter; radii are exaggerated, not to scale.',720,230),angle=2*Math.PI*state.phase;
        s.append(vector('ellipse',{cx:180,cy:120,rx:65,ry:Math.max(1,65*Math.cos(state.inclination*Math.PI/180)),stroke:'#627e9c',fill:'none'}));
        s.append(vector('circle',{cx:180+65*Math.sin(angle),cy:120+65*Math.cos(angle)*Math.cos(state.inclination*Math.PI/180),r:13,fill:colors.orange}),vector('circle',{cx:180-110*Math.sin(angle),cy:120-110*Math.cos(angle)*Math.cos(state.inclination*Math.PI/180),r:7,fill:colors.cyan}));
        path(s,'M174 120 H186 M180 114 V126',colors.bright);label(s,350,65,'Star: orange · planet: cyan',colors.bright);label(s,350,105,'Orbit sketch not to scale');label(s,350,145,`Phase ${state.phase.toFixed(2)} · i=${state.inclination}°`);host.append(s);
        plot(host,'Stellar radial velocity over one orbit','Orbital phase (cycles)','Stellar velocity (m/s; + receding)',[{points:pairs(phase,vel),label:'Reflex RV'}],{ymin:-Math.max(1,p.K_m_s)*1.1,ymax:Math.max(1,p.K_m_s)*1.1,marker:[state.phase,p.v_m_s]});
        const lambda=transitionValues(atoms,'sodium-d2').wavelength_nm,d=models.doppler(lambda,p.v_m_s/1000),span=Math.max(300,2*p.K_m_s),vx=linspace(-span,span,401),line=v=>1-.5*Math.exp(-.5*(v/Math.max(20,span/15))**2);
        plot(host,'Linked stellar Doppler line','Velocity coordinate about Na D₂ rest wavelength (m/s)','Illustrative normalized flux',[{points:vx.map(v=>[v,line(v)]),label:'Rest'},{points:vx.map(v=>[v,line(v-p.v_m_s)]),label:'Shifted',color:colors.orange}],{ymin:.4,ymax:1.05});
        result.textContent=`K=${p.K_m_s.toFixed(2)} m/s; current stellar v=${p.v_m_s.toFixed(2)} m/s (${p.v_m_s>=0?'receding':'approaching'}). Mp sin i=${p.minimum_mass_Mj.toFixed(3)} M_J (usual small-mass minimum-mass proxy). Na D₂ vacuum ${lambda.toFixed(6)} → ${d.observed_nm.toFixed(6)} nm. Inclination is needed for true mass; K alone does not give it.`;
        dataRows=[['phase_cycles','stellar_radial_velocity_m_s'],...pairs(phase,vel),[],['rest_vacuum_nm','shifted_vacuum_nm','current_velocity_m_s','K_m_s'],[lambda,d.observed_nm,p.v_m_s,p.K_m_s]];
      } else if(def.id==='atomic-metadata') {
        // Keep element and line selections consistent in both keyboard and URL state.
        const allowed=state.element==='H'?['balmer-alpha','balmer-beta','lyman-alpha']:['sodium-d2','sodium-d1','ungraded'];
        if(!allowed.includes(state.line)){state.line=allowed[0];input('line').value=state.line;}
        for(const option of input('line').options)option.hidden=!allowed.includes(option.value);
        const rec=state.line==='ungraded'?sodium.line_records[2]:sodium.line_records.find(r=>r.line_id===atoms.transitions.find(t=>t.id===state.line)?.canonical_line_id);
        const t=state.line==='ungraded'?null:transitionValues(atoms,state.line);
        const title=state.line==='ungraded'?`${rec.species} · ${rec.wavelength_air_A} Å air`:t.transition.label;
        host.append(node('h4',title));
        const dl=node('dl',null,{'class':'metadata-grid'});
        const fields=[['Wavelength',t?`${t.wavelength_nm.toFixed(4)} nm vacuum (rounded-level Ritz estimate)`:`${rec.wavelength_air_A} Å air; no vacuum value asserted`],['States',t?`${t.lower.label} ↔ ${t.upper.label}`:'Not supplied in this selected snapshot'],['Adopted log(gf)',rec?.log_gf??'Unknown / not supplied'],['NIST accuracy grade',rec?.nist_grade??'Unknown / ungraded'],['Origin / interpretation','Evaluated source where known; experimental/theoretical classification not established here'],['Canonical disposition',rec?.adjudication_status??'Educational level reference; no adopted gf record'],['Primary reference codes',rec?.loggf_reference??'NIST Handbook energy-level reference']];
        for(const [term,value]of fields){dl.append(node('dt',term),node('dd',value));}host.append(dl);
        const rows=rec?[['Adopted canonical gf',rec.log_gf,rec.nist_grade??'Unknown'],['Retained GES candidate',rec.gf_synth_ges,'Not independently graded here'],['Retained VALD3 regions',rec.gf_regions_vald,'Not independently graded here'],['Retained VALD3 line list',rec.gf_linelist_vald,'Not independently graded here']]:[['Adopted log(gf)',null,'Unknown']];
        const table=node('table'),caption=node('caption','Source-value comparison; retained candidates are historical, not new external queries.'),thead=node('thead'),tr=node('tr');['Record/source','log(gf)','Grade scope'].forEach(v=>tr.append(node('th',v,{scope:'col'})));thead.append(tr);const tbody=node('tbody');for(const row of rows){const tr=node('tr');for(const value of row)tr.append(node('td',value??'Unknown'));tbody.append(tr);}table.append(caption,thead,tbody);host.append(table);
        const finite=rows.map((r,i)=>r[1]===null?null:{points:[[i,Number(r[1])]],dots:true,color:i?colors.orange:colors.cyan,label:''}).filter(Boolean);
        if(finite.length)plot(host,'Source log(gf) comparison','Source index: 0 adopted; 1 GES; 2/3 VALD','log(gf)',finite,{xmin:-.25,xmax:3.25,ymin:Math.min(...finite.map(r=>r.points[0][1]))-.08,ymax:Math.max(...finite.map(r=>r.points[0][1]))+.08});
        else {const empty=svg('Unknown oscillator strength','No oscillator strength was supplied for this reference. No zero or invented value is plotted.',720,120);label(empty,30,65,'log(gf) unknown · no numerical comparison asserted',colors.bright);host.append(empty);}
        const citation=node('a','Inspect pinned canonical_gf source',{href:sodium.canonical_source['data/linelists/canonical_gf.csv'].url});host.append(citation,node('p',sodium.method_disclosure));
        result.textContent=`${title}. log(gf): ${rec?.log_gf??'unknown'}; grade: ${rec?.nist_grade??'unknown / ungraded'}. A source value or grade does not approve a stellar analysis or validate a theoretical prediction.`;
        dataRows=[['source_record','log_gf','grade_scope'],...rows];metadata={science_base:sodium.science_base,canonical_source:sodium.canonical_source,selected_record:rec??'No adopted gf supplied'};
      } else if(def.id==='photon-exercise') {
        const p=models.photon(state.wavelength);colorStrip(host,p.nm);
        result.textContent=`Observed teaching input: ${p.nm} nm vacuum, frequency ${p.Hz.toExponential(4)} Hz. Predict the energy in eV before checking.`;
        const feedback=root.querySelector('[data-feedback]');
        feedback.textContent=checked?`${Math.abs(state.answer-p.eV)/p.eV<=.01?'Correct within the 1% classroom tolerance.':'Try again: this answer is outside the 1% classroom tolerance.'} E = hc/(${p.nm}×10⁻⁹ m) = ${p.J.toExponential(4)} J = ${p.eV.toFixed(4)} eV. Your answer: ${state.answer} eV.`:'Make a prediction, then check it.';
        dataRows=[['wavelength_vacuum_nm','frequency_Hz','expected_energy_eV','student_prediction_eV'],[p.nm,p.Hz,p.eV,state.answer]];
      }
      for(const c of def.controls)root.querySelector(`[data-value="${c.name}"]`).textContent=String(state[c.name]);
      updateURL();
    }
    form.addEventListener('input',event=>{const c=def.controls.find(c=>c.name===event.target.name);if(!c)return;const value=c.kind==='select'?event.target.value:Number(event.target.value);if(c.kind!=='select'&&(!Number.isFinite(value)||value<c.min||value>c.max)){result.textContent='Outside the documented teaching domain. Choose a value within the labeled bounds.';return;}state[c.name]=value;checked=false;render();});
    form.addEventListener('submit',e=>e.preventDefault());
    form.addEventListener('reset',e=>{e.preventDefault();checked=false;selectState(Object.fromEntries(def.controls.map(c=>[c.name,c.value])));});
    root.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>selectState(def.presets[Number(button.dataset.preset)])));
    root.querySelector('[data-csv]').addEventListener('click',()=>download(def.id+'.csv',csv([['educational_model',def.id],['assumptions',def.model],['parameters',JSON.stringify(state)],['sources',JSON.stringify(def.sources.map(k=>config.sources[k]))],['provenance',JSON.stringify(metadata)],[],...dataRows]),'text/csv;charset=utf-8'));
    root.querySelector('[data-svg]').addEventListener('click',()=>{
      const originals=[...host.querySelectorAll('svg')],height=originals.reduce((n,s)=>n+Number(s.viewBox.baseVal.height),0),out=svg(def.id,def.model+' Sources: '+def.sources.map(k=>config.sources[k].url).join(' '),720,height);let y=0;
      for(const s of originals){const copy=s.cloneNode(true);copy.setAttribute('y',y);copy.setAttribute('width','720');copy.setAttribute('height',s.viewBox.baseVal.height);out.append(copy);y+=s.viewBox.baseVal.height;}
      download(def.id+'.svg',new XMLSerializer().serializeToString(out),'image/svg+xml');
    });
    root.querySelector('[data-check]')?.addEventListener('click',()=>{checked=true;render();});
    root.querySelector('[data-to-doppler]')?.addEventListener('click',()=>{const target=document.querySelector('#doppler-velocity');target.value=models.rv(state).v_m_s/1000;target.dispatchEvent(new Event('input',{bubbles:true}));location.hash='doppler';});
    share.addEventListener('focus',()=>share.select());
    try {render();form.hidden=false;root.querySelector('[data-load]').textContent=initialWarnings.length?'Invalid shared values reset to reference: '+initialWarnings.join(', '):'Live model loaded. Change one parameter and compare the result.';root.dataset.ready='true';}
    catch(error){root.querySelector('[data-load]').textContent='This teaching model failed to initialize. No simulated result is available.';console.error(def.id,error);}
  }
}
setup();
