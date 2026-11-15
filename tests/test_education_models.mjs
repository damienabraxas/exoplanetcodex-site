import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createModels, integrate, linspace, circleOverlap, transitFlux, spectralColor} from '../assets/js/education-models.mjs';
import {combinedAtomicReference, transitionValues, transitionCSV} from '../assets/js/education-core.mjs';
const read=n=>JSON.parse(readFileSync(new URL('../assets/data/'+n,import.meta.url)));
const hydrogen=read('education-hydrogen.v1.json'),config=read('education-models.v1.json'),sodium=read('education-sodium.v1.json'),m=createModels(hydrogen.constants,config);
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol,`${a} != ${b} ± ${tol}`);
test('photon frequency and energy have independent SI benchmarks',()=>{
 const p=m.photon(500);close(p.Hz,5.99584916e14,1);close(p.J,3.972891714297857e-19,1e-30);close(p.eV,2.479683968664005,1e-10);
 close(m.photon(1000).eV,p.eV/2);assert.throws(()=>m.photon(0));assert.equal(spectralColor(121).visible,false);assert.equal(spectralColor(589).visible,true);
});
test('Doppler signs, inverse velocities and small-velocity approximation',()=>{
 const pos=m.doppler(500,30),neg=m.doppler(500,-30);assert.ok(pos.observed_nm>500);assert.ok(neg.observed_nm<500);close(pos.observed_nm*neg.observed_nm,500**2,1e-7);close(pos.observed_nm-pos.approximate_nm,2.5037e-6,1e-9);assert.throws(()=>m.doppler(500,300000));
});
test('SCHOTT index and grating orders match independent references',()=>{
 close(m.prism(587.6,60).n,1.51680,2e-5);assert.ok(m.prism(400,60).deviation_deg>m.prism(700,60).deviation_deg);
 assert.equal(m.grating(500,1000,2).dispersion_deg_per_nm,Infinity);close(m.grating(500,1000,1).angle_deg,30,1e-12);close(m.grating(500,1000,0).angle_deg,0);close(m.grating(500,1000,-1).angle_deg,-30,1e-12);assert.equal(m.grating(700,1200,2).angle_deg,null);
});
test('resolving power changes width, while sampling and SNR are independent',()=>{
 const p=m.resolution(115000,.006,4.1,100);close(p.fwhm_nm,550/115000,1e-12);close(m.resolution(120000,.006,4.1,100).fwhm_nm,550/120000,1e-12);
 const other=m.resolution(115000,.006,2,20);assert.deepEqual(p.flux,other.flux);assert.notEqual(p.samples.length,other.samples.length);
 const noisy=m.resolution(115000,.006,4.1,20);assert.notDeepEqual(p.samples,noisy.samples);
});
test('sodium components retain NIST identities and distinct air/vacuum conventions',()=>{
 const atoms=combinedAtomicReference(hydrogen,sodium),d2=transitionValues(atoms,'sodium-d2'),d1=transitionValues(atoms,'sodium-d1');
 close(d2.wavelength_nm,589.158263,1e-6);close(d1.wavelength_nm,589.755754,2e-6);assert.ok(d1.wavelength_nm>d2.wavelength_nm);assert.ok(d2.wavelength_nm>d2.transition.source_air_nm);
 assert.ok(transitionCSV(d2,'absorption',atoms).includes('sodiumtable5.htm'));assert.equal(sodium.line_records[2].nist_grade,null);
});
test('Gaussian EW matches analytic area, not FWHM; window and continuum matter',()=>{
 const p={depth:.5,sigma:.1,shape:'gaussian',window:1.5,continuum:1},out=m.equivalentWidth(p);close(out.EW_mA,.5*.1*Math.sqrt(2*Math.PI)*1000,1e-8);close(out.FWHM_A,.2354820045,1e-10);
 assert.ok(m.equivalentWidth({...p,window:.03}).EW_mA<out.EW_mA/3);assert.ok(m.equivalentWidth({...p,continuum:1.03}).EW_mA>out.EW_mA);
 close(m.equivalentWidth({...p,depth:.25}).EW_mA,out.EW_mA/2,1e-8);
});
test('opacity normalization gives weak-line invariance and saturated broadening response',()=>{
 const weak1=m.slabProfile(.01,1),weak2=m.slabProfile(.01,4),sat1=m.slabProfile(30,1),sat2=m.slabProfile(30,4);
 close(weak1.EW_velocity/weak2.EW_velocity,1,.002);assert.ok(sat2.EW_velocity>sat1.EW_velocity*1.8);
 assert.ok(sat2.tau0<sat1.tau0);close(m.slabProfile(30,1,25000).observed_EW_velocity,sat1.EW_velocity,1e-7);
});
test('all stellar parameters have disclosed, meaningful effects; R preserves intrinsic EW',()=>{
 const p={teff:5750,logg:4.45,metallicity:0,xi:1,R:115000},base=m.stellar(p);
 for(const change of [{teff:6500},{logg:3.5},{metallicity:.5},{xi:4}])assert.notEqual(m.stellar({...p,...change}).strong_mA,base.strong_mA);
 const low=m.stellar({...p,R:20000});close(low.strong_mA,base.strong_mA,1e-10);assert.notDeepEqual(low.strong.flux,base.strong.flux);
 const xi=m.stellar({...p,xi:4});assert.ok(xi.strong_mA/base.strong_mA>xi.weak_mA/base.weak_mA);
});
test('curve of growth has thin linearity, saturation, invertibility and explicit domain failure',()=>{
 const thin1=m.growth(-2,2).EW_velocity,thin2=m.growth(-1.7,2).EW_velocity;close(thin2/thin1,10**.3,.02);
 assert.ok(m.growth(1.3,2).EW_velocity/m.growth(1,2).EW_velocity < 1.3);
 close(m.invertGrowth(m.growth(.4,3).EW_velocity,3),.4,1e-10);assert.equal(m.invertGrowth(1000,1),null);
});
test('uniform transit equals p² centrally, vanishes out of transit and behaves at grazing contact',()=>{
 close(transitFlux(0,.1,0),.99);close(transitFlux(1.2,.1,.6),1);close(circleOverlap(1.1,.1),0);assert.ok(transitFlux(1,.1,0)>.99);assert.ok(transitFlux(1,.1,0)<1);
});
test('limb-darkened transit quadrature agrees with analytic centered integral and converges',()=>{
 const p=.1,u=.6,blocked=(1-u)*p*p+2*u/3*(1-(1-p*p)**1.5),expected=1-blocked/(1-u/3);
 close(transitFlux(0,p,u),expected,1e-6);close(transitFlux(.7,.15,.6,900),transitFlux(.7,.15,.6,3600),1e-5);assert.ok(transitFlux(0,p,u)<transitFlux(0,p,0));
});
test('RV semi-amplitude matches Jupiter/solar benchmark, inclination and period scaling',()=>{
 const p={mass:1,inclination:90,period:365.25,starMass:1,phase:.25},base=m.rv(p);close(base.K_m_s,28.42,.03);close(base.v_m_s,base.K_m_s,1e-8);close(m.rv({...p,inclination:0}).K_m_s,0);
 close(m.rv({...p,inclination:30}).K_m_s/base.K_m_s,.5,1e-10);close(m.rv({...p,period:p.period*8}).K_m_s/base.K_m_s,.5,1e-10);close(m.rv({...p,phase:.75}).v_m_s,-base.K_m_s,1e-8);
});
