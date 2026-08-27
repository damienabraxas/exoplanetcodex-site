(() => {
  "use strict";
  const DATA_URL = "/assets/data/local-stellar-neighborhood.v1.json";
  const host = document.getElementById("neighborhood-map");
  const status = document.getElementById("neighborhood-status");
  if (!host || !status) return;
  const ns = "http://www.w3.org/2000/svg";
  const make = (name, attrs = {}) => { const el = document.createElementNS(ns, name); Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, String(v))); return el; };
  const label = (parent, value, attrs) => { const el = make("text", attrs); el.textContent = value; parent.appendChild(el); };
  const spectralColors = {O:"#9bb0ff",B:"#aabfff",A:"#cad7ff",F:"#f8f7ff",G:"#fff4d6",K:"#ffd2a1",M:"#ffad76"};
  const starColor = (target) => spectralColors[(target.spectral_type || "").trim().charAt(0).toUpperCase()] || "#b9c6d3";

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
    const width=720, height=520, cx=width/2, cy=height/2, pad=70, maxExtent=data.coordinate_system.extent_pc;
    const state={extent:Math.min(50,maxExtent),centerX:0,centerY:0};
    const svg=make("svg", {viewBox:`0 0 ${width} ${height}`, role:"img", "aria-labelledby":"map-title map-desc"});
    const title=make("title", {id:"map-title"}); title.textContent="Codex targets in the local stellar neighborhood"; svg.appendChild(title);
    const desc=make("desc", {id:"map-desc"}); desc.textContent=`Sun-centered Galactic Cartesian projection initially spanning plus or minus 50 parsecs. Use the mouse wheel to zoom. Interactive published targets open their canonical pages.`; svg.appendChild(desc);
    const plot=make("g"); svg.appendChild(plot);

    const tooltip=document.createElement("div"); tooltip.className="map-tooltip"; tooltip.hidden=true; host.appendChild(tooltip);
    const describe=(target)=>`${target.name} — ${target.distance_pc.toFixed(target.distance_pc<2?2:1)} pc${target.spectral_type?` · ${target.spectral_type}`:""} · ${target.role.replaceAll("_"," ")}`;
    const show=(event,target)=>{ tooltip.textContent=describe(target); tooltip.hidden=false; const box=host.getBoundingClientRect(), point=event.touches?event.touches[0]:event; tooltip.style.left=`${Math.max(0,point.clientX-box.left)}px`; tooltip.style.top=`${Math.max(28,point.clientY-box.top)}px`; };
    const hide=()=>{tooltip.hidden=true;};
    const renderPlot=()=>{
      plot.replaceChildren();
      const radius=Math.min(cx-pad,cy-pad), scale=radius/state.extent;
      const screen=(target)=>({x:cx+(target.cartesian_pc.x_gc-state.centerX)*scale,y:cy-(target.cartesian_pc.y_rotation-state.centerY)*scale});
      [10,25,50].filter(v=>v<=state.extent).forEach((r)=>{plot.appendChild(make("circle",{cx:cx-state.centerX*scale,cy:cy+state.centerY*scale,r:r*scale,class:"map-ring"})); label(plot,`${r} pc`,{x:cx-state.centerX*scale+4,y:cy+state.centerY*scale-r*scale-5,class:"map-ring-label"});});
      plot.appendChild(make("line",{x1:pad,y1:cy+state.centerY*scale,x2:width-pad,y2:cy+state.centerY*scale,class:"map-axis"}));
      plot.appendChild(make("line",{x1:cx-state.centerX*scale,y1:pad,x2:cx-state.centerX*scale,y2:height-pad,class:"map-axis"}));
      label(plot,"← anticenter",{x:8,y:cy+4,class:"map-axis-label"});
      label(plot,"Galactic center →",{x:width-8,y:cy+4,class:"map-axis-label","text-anchor":"end"});
      label(plot,"Galactic rotation ↑",{x:cx,y:18,class:"map-axis-label","text-anchor":"middle"});
      label(plot,"counter-rotation ↓",{x:cx,y:height-12,class:"map-axis-label","text-anchor":"middle"});
      const occupied=[];
      [...data.targets].sort((a,b)=>(b.id==="solar")-(a.id==="solar") || (b.publication_status==="published")-(a.publication_status==="published") || a.distance_pc-b.distance_pc).forEach((target)=>{
        const {x,y}=screen(target), published=target.publication_status==="published";
        if(x<pad-10||x>width-pad+10||y<pad-10||y>height-pad+10)return;
        const group=published?make("a",{href:target.url,class:"target-link",tabindex:"0","aria-label":`${describe(target)}. Open target page.`}):make("g",{class:"target-link",tabindex:"0",role:"img","aria-label":`${describe(target)}. Public page not yet published.`});
        group.style.setProperty("--star-color",starColor(target));
        group.appendChild(make("circle",{cx:x,cy:y,r:14,class:"target-hit"}));
        group.appendChild(make("circle",{cx:x,cy:y,r:target.id==="solar"?7:5,class:`target-node${target.id==="solar"?" sun-node":""}`}));
        const box={x:x+8,y:y-20,w:Math.max(45,target.name.length*6.6),h:16};
        if(!occupied.some(o=>box.x<o.x+o.w&&box.x+box.w>o.x&&box.y<o.y+o.h&&box.y+box.h>o.y)){label(group,target.name,{x:x+8,y:y-8,class:"map-label"});occupied.push(box);}
        group.addEventListener("pointerenter",(event)=>show(event,target)); group.addEventListener("pointermove",(event)=>show(event,target)); group.addEventListener("pointerleave",hide);
        group.addEventListener("focus",()=>{const rect=group.getBoundingClientRect();show({clientX:rect.left+rect.width/2,clientY:rect.top},target);}); group.addEventListener("blur",hide);
        plot.appendChild(group);
      });
    };
    svg.addEventListener("wheel",(event)=>{
      event.preventDefault();
      const rect=svg.getBoundingClientRect(), px=(event.clientX-rect.left)*width/rect.width, py=(event.clientY-rect.top)*height/rect.height;
      const oldScale=Math.min(cx-pad,cy-pad)/state.extent;
      const worldX=state.centerX+(px-cx)/oldScale, worldY=state.centerY-(py-cy)/oldScale;
      state.extent=Math.max(8,Math.min(maxExtent,state.extent*Math.exp(event.deltaY*.0015)));
      const newScale=Math.min(cx-pad,cy-pad)/state.extent;
      state.centerX=worldX-(px-cx)/newScale; state.centerY=worldY+(py-cy)/newScale;
      renderPlot();
    },{passive:false});
    renderPlot();
    const hint=document.createElement("div");hint.className="map-zoom-hint";hint.textContent="SCROLL TO ZOOM · 8–65 PC";host.appendChild(hint);
    status.remove(); host.insertBefore(svg,tooltip);
  }
  fetch(DATA_URL,{headers:{Accept:"application/json"}}).then((response)=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();}).then(render).catch(()=>{status.innerHTML='The neighborhood map is temporarily unavailable. <a href="/systems/">Browse the systems index instead.</a>';});
})();
