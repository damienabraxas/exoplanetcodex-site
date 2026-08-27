(() => {
  "use strict";
  const host=document.getElementById("release-roadmap");
  if(!host)return;
  const esc=(value)=>String(value).replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const targetMarkup=(target)=>{
    const percent=Math.round(target.progress_fraction*1000)/10;
    return `<div class="target"><div class="target-head"><span>${esc(target.target_name)}</span><span class="target-count">${esc(target.complete_products)} / ${esc(target.total_products)} products</span></div><div class="track" role="progressbar" aria-label="${esc(target.target_name)} release progress" aria-valuemin="0" aria-valuemax="${esc(target.total_products)}" aria-valuenow="${esc(target.complete_products)}"><div class="fill" style="width:${percent}%"></div></div></div>`;
  };
  const render=(data)=>{
    if(data.schema!=="codex.release_roadmap/1"||!Array.isArray(data.releases))throw new Error("unsupported roadmap schema");
    host.innerHTML=`<div class="release-grid">${data.releases.map((release)=>{
      const targets=release.targets||[];
      const progress=release.progress_fraction===undefined?"":targetMarkup({target_name:"Established platform",complete_products:1,total_products:1,progress_fraction:release.progress_fraction});
      const notes=(release.notes||[]).length?`<ul class="notes">${release.notes.map(note=>`<li>${esc(note)}</li>`).join("")}</ul>`:"";
      return `<article class="release" data-status="${esc(release.status)}"><div class="release-status">${esc(release.status.replaceAll("_"," "))}</div><h2>${esc(release.name)}</h2><p class="release-summary">${esc(release.summary)}</p>${progress}${targets.map(targetMarkup).join("")}${notes}</article>`;
    }).join("")}</div><p class="source">Source: canonical 27-product registry + current publishable abundance-product store · ${esc(data.sources.publication_gate)}</p>`;
  };
  fetch("/assets/data/release-roadmap.v1.json",{headers:{Accept:"application/json"}}).then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();}).then(render).catch(()=>{host.innerHTML='<p class="error">Release progress is temporarily unavailable. Scientific products remain available through the system pages.</p>';});
})();
