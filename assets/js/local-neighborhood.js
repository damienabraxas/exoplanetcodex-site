(() => {
  "use strict";
  const DATA_URL = "/assets/data/local-stellar-neighborhood.v1.json";
  const host = document.getElementById("neighborhood-map");
  const status = document.getElementById("neighborhood-status");
  if (!host || !status) return;
  const ns = "http://www.w3.org/2000/svg";
  const make = (name, attrs = {}) => { const el = document.createElementNS(ns, name); Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, String(v))); return el; };
  const label = (parent, value, attrs) => { const el = make("text", attrs); el.textContent = value; parent.appendChild(el); };

  function validate(data) {
    if (data.schema_version !== "1.0.0" || !Array.isArray(data.targets)) throw new Error("unsupported map schema");
    const ids = new Set(), slugs = new Set();
    data.targets.forEach((target) => {
      if (!target.id || ids.has(target.id)) throw new Error("duplicate target ID"); ids.add(target.id);
      if (target.slug && slugs.has(target.slug)) throw new Error("duplicate target slug"); if (target.slug) slugs.add(target.slug);
      if (!Number.isFinite(target.distance_pc) || target.distance_pc < 0) throw new Error("invalid distance");
      ["x_gc", "y_rotation", "z_ngp"].forEach((axis) => { if (!Number.isFinite(target.cartesian_pc[axis])) throw new Error("invalid coordinate"); });
      if (target.publication_status === "published" && !target.url) throw new Error("published target missing URL");
      if (target.publication_status !== "published" && target.url) throw new Error("unpublished target has URL");
    });
  }

  function render(data) {
    validate(data);
    const width=720, height=520, cx=width/2, cy=height/2, pad=52, extent=data.coordinate_system.extent_pc;
    const scale=Math.min(cx-pad,cy-pad)/extent;
    const svg=make("svg", {viewBox:`0 0 ${width} ${height}`, role:"img", "aria-labelledby":"map-title map-desc"});
    const title=make("title", {id:"map-title"}); title.textContent="Codex targets in the local stellar neighborhood"; svg.appendChild(title);
    const desc=make("desc", {id:"map-desc"}); desc.textContent=`Sun-centered Galactic Cartesian projection spanning plus or minus ${extent} parsecs. Interactive published targets open their canonical pages.`; svg.appendChild(desc);
    [10,25,50,extent].filter((v,i,a)=>v<=extent&&a.indexOf(v)===i).forEach((radius)=>{ svg.appendChild(make("circle",{cx,cy,r:radius*scale,class:"map-ring"})); label(svg,`${radius} pc`,{x:cx+4,y:cy-radius*scale-5,class:"map-ring-label"}); });
    svg.appendChild(make("line",{x1:cx-extent*scale,y1:cy,x2:cx+extent*scale,y2:cy,class:"map-axis"}));
    svg.appendChild(make("line",{x1:cx,y1:cy-extent*scale,x2:cx,y2:cy+extent*scale,class:"map-axis"}));
    label(svg,"← anticenter",{x:cx-extent*scale,y:cy-8,class:"map-axis-label"}); label(svg,"Galactic center →",{x:cx+extent*scale-98,y:cy-8,class:"map-axis-label"});
    label(svg,"rotation →",{x:cx+8,y:cy-extent*scale+10,class:"map-axis-label",transform:`rotate(-90 ${cx+8} ${cy-extent*scale+10})`});

    const tooltip=document.createElement("div"); tooltip.className="map-tooltip"; tooltip.hidden=true; host.appendChild(tooltip);
    const describe=(target)=>`${target.name} — ${target.distance_pc.toFixed(target.distance_pc<2?2:1)} pc${target.spectral_type?` · ${target.spectral_type}`:""} · ${target.role.replaceAll("_"," ")}`;
    const show=(event,target)=>{ tooltip.textContent=describe(target); tooltip.hidden=false; const box=host.getBoundingClientRect(), point=event.touches?event.touches[0]:event; tooltip.style.left=`${Math.max(0,point.clientX-box.left)}px`; tooltip.style.top=`${Math.max(28,point.clientY-box.top)}px`; };
    const hide=()=>{tooltip.hidden=true;};
    data.targets.forEach((target)=>{
      const x=cx+target.cartesian_pc.x_gc*scale, y=cy-target.cartesian_pc.y_rotation*scale, published=target.publication_status==="published";
      const group=published?make("a",{href:target.url,class:"target-link",tabindex:"0","aria-label":`${describe(target)}. Open target page.`}):make("g",{class:"target-link",tabindex:"0",role:"img","aria-label":`${describe(target)}. Public page not yet published.`});
      group.appendChild(make("circle",{cx:x,cy:y,r:14,class:"target-hit"}));
      group.appendChild(make("circle",{cx:x,cy:y,r:target.id==="solar"?7:5,class:`target-node${published?"":" unpublished"}${target.id==="solar"?" sun-node":""}`}));
      label(group,target.name,{x:x+8,y:y-8,class:"map-label"});
      group.addEventListener("pointerenter",(event)=>show(event,target)); group.addEventListener("pointermove",(event)=>show(event,target)); group.addEventListener("pointerleave",hide);
      group.addEventListener("focus",()=>{const rect=group.getBoundingClientRect();show({clientX:rect.left+rect.width/2,clientY:rect.top},target);}); group.addEventListener("blur",hide);
      svg.appendChild(group);
    });
    status.remove(); host.insertBefore(svg,tooltip);
  }
  fetch(DATA_URL,{headers:{Accept:"application/json"}}).then((response)=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();}).then(render).catch(()=>{status.innerHTML='The neighborhood map is temporarily unavailable. <a href="/systems/">Browse the systems index instead.</a>';});
})();
