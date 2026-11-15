// Pure unit conversions, state and retrieval shared by browser and Node tests.
export function validateReference(data) {
  if (data?.schema_version !== 1 || data.scope !== 'educational_reference_not_survey_measurements') throw Error('Unknown educational reference format');
  for (const k of ['c_m_s', 'h_J_s', 'e_C']) if (!(data.constants?.[k] > 0) || !Number.isFinite(data.constants[k])) throw Error('Invalid SI constant');
  if (!Array.isArray(data.levels) || !data.levels.length || !Array.isArray(data.transitions) || !data.transitions.length) throw Error('Missing reference states');
  const ids = new Set();
  for (const l of data.levels) {
    if (typeof l.id !== 'string' || typeof l.label !== 'string' || ids.has(l.id) || !Number.isFinite(l.energy_cm1) || l.energy_cm1 < 0) throw Error('Invalid reference level');
    ids.add(l.id);
  }
  const transitions = new Set();
  for (const t of data.transitions) {
    if (typeof t.id !== 'string' || typeof t.label !== 'string' || transitions.has(t.id) || !ids.has(t.lower) || !ids.has(t.upper)) throw Error('Invalid transition identity');
    transitions.add(t.id);
    transitionValues(data, t.id);
  }
  return data;
}
export function transitionValues(data, id) {
  const transition = data.transitions.find(t => t.id === id);
  if (!transition) throw Error('Unknown transition');
  const lower = data.levels.find(l => l.id === transition.lower), upper = data.levels.find(l => l.id === transition.upper);
  const gap = upper.energy_cm1 - lower.energy_cm1;
  if (!(gap > 0)) throw Error('Nonpositive transition energy');
  const wavelength_nm = 1e7 / gap;
  const frequency_Hz = data.constants.c_m_s / (wavelength_nm * 1e-9);
  const energy_J = data.constants.h_J_s * frequency_Hz;
  return {transition, lower, upper, gap_cm1: gap, wavelength_nm, frequency_Hz, energy_J, energy_eV: energy_J / data.constants.e_C};
}
export function initialState(data, query = '') {
  const p = new URLSearchParams(query);
  return {transition: data.transitions.some(t => t.id === p.get('transition')) ? p.get('transition') : 'balmer-alpha', mode: p.get('mode') === 'absorption' ? 'absorption' : 'emission'};
}
export function statesFor(v, mode) {
  if (!['emission', 'absorption'].includes(mode)) throw Error('Unknown interaction mode');
  return mode === 'emission' ? {start: v.upper, end: v.lower, startY: 70, endY: 215} : {start: v.lower, end: v.upper, startY: 215, endY: 70};
}
export function normalized(s) { return s.normalize('NFKD').toLowerCase().replace(/ξ/g, ' xi ').replace(/[^a-z0-9]+/g, ' ').trim(); }
const aliases = {xi: 'microturbulence', teff: 'effective temperature', 'log g': 'surface gravity', ew: 'equivalent width', gf: 'oscillator strength', 'non lte': 'nlte', 'h alpha': 'balmer', 'h beta': 'balmer'};
export function queryTerms(query) {
  let q = normalized(query);
  // Whole-query aliases avoid expanding arbitrary substrings.
  q = aliases[q] || q;
  return q.split(/\s+/).filter(Boolean).slice(0, 12);
}
export function editDistance(a,b) {
  let row=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=0;i<a.length;i++){const next=[i+1];for(let j=0;j<b.length;j++)next.push(Math.min(next[j]+1,row[j+1]+1,row[j]+(a[i]!==b[j])));row=next;}
  return row[b.length];
}
export function searchEntries(entries, query) {
  const terms = queryTerms(query.slice(0, 160)); if (!terms.length) return [];
  return entries.map(entry => {
    const title = normalized(entry.title), hay = normalized([entry.title, entry.description, entry.concepts].join(' '));
    const words = hay.split(' ');
    const scores = terms.map(term => title.includes(term) ? 6 : hay.includes(term) ? 2 : term.length >= 5 && words.some(w => Math.abs(w.length-term.length)<=1 && editDistance(w,term)<=1) ? 1 : 0);
    return {entry, score:scores.every(Boolean)?scores.reduce((a,b)=>a+b,0):0};
  }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score || a.entry.title.localeCompare(b.entry.title)).slice(0,20).map(r=>r.entry);
}
export function safeLocalURL(s) { return typeof s === 'string' && /^\/(education|glossary|method)\/#[-a-z0-9]+$/.test(s); }
export function transitionCSV(v, mode, data) {
  const rows = [['dataset','atomic educational reference; not survey measurements'],['element',v.transition.element??'H'],['transition',v.transition.id],['mode',mode],['lower_state',v.lower.label],['upper_state',v.upper.label],['lower_energy_cm-1',v.lower.energy_cm1],['upper_energy_cm-1',v.upper.energy_cm1],['wavelength_vacuum_nm',v.wavelength_nm],['photon_energy_eV',v.energy_eV],['frequency_Hz',v.frequency_Hz],['wavelength_method',data.wavelength_convention],['uncertainty_note',data.uncertainty],['level_source',data.sources[v.transition.element==='Na'?'na-levels':'nist-levels'].url],['constants_source',data.sources.constants.url],['source_accessed',data.source_accessed]];
  return rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
}

/** Combine versioned atomic references without duplicating hydrogen values. */
export function combinedAtomicReference(hydrogen, sodium) {
  if(sodium?.schema_version !== 1 || sodium.scope !== hydrogen.scope) throw Error('Invalid sodium reference');
  return validateReference({...hydrogen,
    sources:{...hydrogen.sources,...sodium.sources},
    levels:[...hydrogen.levels,...sodium.levels],
    transitions:[...hydrogen.transitions.map(t=>({...t,element:'H'})),...sodium.transitions],
  });
}
