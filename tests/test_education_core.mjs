import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateReference,transitionValues,initialState,statesFor,searchEntries,safeLocalURL,transitionCSV} from '../assets/js/education-core.mjs';
const data=JSON.parse(readFileSync(new URL('../assets/data/education-hydrogen.v1.json',import.meta.url)));
const entries=JSON.parse(readFileSync(new URL('../assets/data/education-search.v1.json',import.meta.url))).entries;
test('NIST components reproduce independent vacuum references to display precision',()=>{
  validateReference(data);
  // Lyman alpha vacuum wavelength from NIST persistent lines; Balmer values
  // independently calculated from the cited 2s and np J=3/2 energies, not air lines.
  for(const [id,nm,eV] of [['lyman-alpha',121.566824,10.19885],['balmer-alpha',656.4538,1.88870],['balmer-beta',486.2635,2.54973]]){
    const v=transitionValues(data,id);assert.ok(Math.abs(v.wavelength_nm-nm)<.001);assert.ok(Math.abs(v.energy_eV-eV)<.0001);
    assert.ok(Math.abs(v.frequency_Hz*v.wavelength_nm*1e-9/299792458-1)<1e-14);
    assert.ok(Math.abs(v.energy_J/data.constants.e_C-v.energy_eV)<1e-14);
  }
});
test('absorption reverses states with unchanged positive photon energy',()=>{
 const v=transitionValues(data,'balmer-alpha'),em=statesFor(v,'emission'),ab=statesFor(v,'absorption');assert.equal(em.start,ab.end);assert.equal(em.end,ab.start);assert.ok(em.startY<em.endY);assert.ok(ab.startY>ab.endY);assert.throws(()=>statesFor(v,'bad'));
});
test('larger Balmer gap requires higher energy and shorter wavelength',()=>{const a=transitionValues(data,'balmer-alpha'),b=transitionValues(data,'balmer-beta');assert.ok(b.energy_eV>a.energy_eV);assert.ok(b.wavelength_nm<a.wavelength_nm);});
test('malformed reference fails rather than manufacturing science',()=>{
 for(const mutate of [d=>d.constants.c_m_s=0,d=>d.levels[0].energy_cm1=NaN,d=>d.transitions[0].upper='missing',d=>d.levels.push(d.levels[0]),d=>d.transitions[0].upper='1s']){const bad=structuredClone(data);mutate(bad);assert.throws(()=>validateReference(bad));}
 assert.throws(()=>transitionValues(data,'fake'));
});
test('query initialization validates IDs and mode',()=>{assert.deepEqual(initialState(data,'?transition=balmer-beta&mode=absorption'),{transition:'balmer-beta',mode:'absorption'});assert.deepEqual(initialState(data,'?transition=<script>&mode=bad'),{transition:'balmer-alpha',mode:'emission'});});
test('local search covers aliases, typo tolerance and content types',()=>{
 for(const q of ['xi','ξ','microturbulenc','Teff','effective temperature','EW','photon energy'])assert.ok(searchEntries(entries,q).length,q);
 assert.ok(searchEntries(entries,'Teff').some(e=>e.type==='Glossary'));assert.ok(searchEntries(entries,'uncertainty').some(e=>e.type==='Methodology'));assert.ok(searchEntries(entries,'hydrogen').some(e=>e.type==='Interactive'));
 assert.equal(searchEntries(entries,'zzzzqwerty').length,0);assert.equal(searchEntries(entries,'').length,0);
});
test('URL allowlist rejects scripts, external and protocol relative URLs',()=>{for(const s of ['javascript:alert(1)','//evil.example','https://evil.example','/education/#ok" onclick="alert(1)','/education/#../x'])assert.equal(safeLocalURL(s),false);assert.equal(safeLocalURL('/glossary/#microturbulence'),true);});
test('CSV retains units, states, medium, educational scope and sources',()=>{const csv=transitionCSV(transitionValues(data,'balmer-alpha'),'absorption',data);for(const s of ['vacuum_nm','energy_eV','frequency_Hz','https://physics.nist.gov','not survey measurements','No uncertainty inferred','2s ²S₁/₂','absorption'])assert.ok(csv.includes(s),s);});
