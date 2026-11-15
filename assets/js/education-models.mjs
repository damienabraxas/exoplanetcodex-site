/* Analytic teaching models. Numerical inputs/citations live in education-models.v1.json.
 * These functions do not ingest observations or run the Codex abundance engines. */
export const linspace = (a, b, n = 401) => Array.from({length: n}, (_, i) => a + (b - a) * i / (n - 1));
export function integrate(x, y) {
  if (x.length !== y.length || x.length < 2) throw Error('Integration requires paired samples');
  let sum = 0;
  for (let i = 1; i < x.length; i++) sum += (x[i] - x[i - 1]) * (y[i] + y[i - 1]) / 2;
  return sum;
}
export function spectralColor(nm) {
  if (nm < 380 || nm > 780) return {css: '#ddeeff', visible: false, label: nm < 380 ? 'Ultraviolet · invisible' : 'Infrared · invisible'};
  // Original illustrative RGB interpolation; not colorimetry or exact perception.
  const anchors = [[380,130,70,200],[440,75,100,255],[490,30,220,225],[530,80,225,95],[580,255,221,65],[620,255,127,60],[700,239,65,65],[780,145,45,70]];
  const i = Math.min(anchors.length - 2, anchors.findIndex((p, i) => i < anchors.length - 1 && nm <= anchors[i + 1][0]));
  const a = anchors[i], b = anchors[i + 1], t = (nm - a[0]) / (b[0] - a[0]);
  return {css: `rgb(${[1,2,3].map(k => Math.round(a[k] + t * (b[k] - a[k]))).join(',')})`, visible: true, label: 'Approximate displayed spectral color'};
}
export function gaussianConvolveDeficit(flux, sigmaPixels) {
  if (sigmaPixels < .05) return flux.slice();
  const radius = Math.ceil(5 * sigmaPixels), kernel = linspace(-radius, radius, 2 * radius + 1).map(i => Math.exp(-.5 * (i / sigmaPixels) ** 2));
  const norm = kernel.reduce((a,b) => a+b, 0);
  return flux.map((_, i) => 1 - kernel.reduce((sum, weight, j) => sum + weight * (1 - (flux[i + j - radius] ?? 1)), 0) / norm);
}
export function circleOverlap(z, p) {
  if (z >= 1 + p) return 0;
  if (z <= Math.abs(1 - p)) return Math.PI * Math.min(1, p) ** 2;
  const clip = x => Math.max(-1, Math.min(1, x));
  return p*p * Math.acos(clip((z*z+p*p-1)/(2*z*p))) + Math.acos(clip((z*z+1-p*p)/(2*z))) - .5 * Math.sqrt(Math.max(0,(-z+p+1)*(z+p-1)*(z-p+1)*(z+p+1)));
}
export function transitFlux(z, p, u = 0, rings = 900) {
  if (p <= 0 || z >= 1 + p) return 1;
  if (u === 0) return 1 - circleOverlap(z, p) / Math.PI;
  // Radial-annulus quadrature for a linear limb-darkening law. No external engine.
  let blocked = 0;
  for (let i = 0; i < rings; i++) {
    const r = (i + .5) / rings;
    let fraction;
    if (z === 0) fraction = r <= p ? 1 : 0;
    else if (r + z <= p) fraction = 1;
    else if (Math.abs(r - z) >= p) fraction = 0;
    else fraction = Math.acos(Math.max(-1, Math.min(1,(r*r+z*z-p*p)/(2*r*z)))) / Math.PI;
    blocked += 2 * r * (1 - u + u * Math.sqrt(1-r*r)) * fraction / rings;
  }
  return 1 - blocked / (1 - u / 3);
}
export function createModels(constants, config) {
  const c = constants.c_m_s, h = constants.h_J_s, e = constants.e_C;
  const k = config.constants.k_J_K;
  for (const n of [c,h,e,k]) if (!(n > 0) || !Number.isFinite(n)) throw Error('Invalid physics constants');
  const velocity = linspace(-70, 70, 701);
  function photon(nm) {
    if (!(nm > 0)) throw Error('Wavelength must be positive');
    const Hz = c / (nm * 1e-9), J = h * Hz;
    return {nm, Hz, THz: Hz / 1e12, J, eV: J / e, ...spectralColor(nm)};
  }
  function doppler(nm, km_s) {
    const beta = km_s * 1000 / c;
    if (Math.abs(beta) >= 1) throw Error('Radial speed must be below c');
    const exact = nm * Math.sqrt((1 + beta) / (1 - beta));
    return {rest_nm: nm, observed_nm: exact, approximate_nm: nm * (1 + beta), delta_nm: exact - nm, beta};
  }
  function prism(nm, apex_deg) {
    const lambda2 = (nm / 1000) ** 2;
    const n = Math.sqrt(1 + config.glass.B.reduce((s, B, i) => s + B * lambda2 / (lambda2 - config.glass.C_um2[i]), 0));
    const A = apex_deg * Math.PI / 180, argument = n * Math.sin(A / 2);
    return {n, deviation_deg: argument <= 1 ? (2*Math.asin(argument)-A)*180/Math.PI : null};
  }
  function grating(nm, grooves_mm, order) {
    const sin = order * nm * 1e-6 * grooves_mm;
    return {angle_deg: Math.abs(sin) <= 1 ? Math.asin(sin)*180/Math.PI : null, spacing_nm: 1e6 / grooves_mm, dispersion_deg_per_nm:Math.abs(sin)<1 ? order*grooves_mm*1e-6/Math.sqrt(1-sin*sin)*180/Math.PI : Math.abs(sin)===1 ? Math.sign(order)*Infinity : null};
  }
  function resolution(R, separation_nm, sampling, snr) {
    const center = 550, fwhm = center / R, intrinsicSigma = .0005;
    const sigma = Math.sqrt(intrinsicSigma**2 + (fwhm / 2.354820045)**2);
    const x = linspace(-.09, .09, 601);
    const profile = offset => 1 - .0007 / sigma * (Math.exp(-.5*((offset-separation_nm/2)/sigma)**2)+Math.exp(-.5*((offset+separation_nm/2)/sigma)**2));
    const step = fwhm / sampling, count = Math.min(601, Math.ceil(.18 / step));
    let seed=123456789;
    const uniform=()=>{seed=(1664525*seed+1013904223)>>>0;return (seed+.5)/4294967296;};
    const noise=()=>Math.sqrt(-2*Math.log(uniform()))*Math.cos(2*Math.PI*uniform());
    const samples = linspace(-.09, .09, count).map((offset,i) => [offset, profile(offset) + noise() / snr]);
    return {x, flux: x.map(profile), samples, fwhm_nm: fwhm, separation_over_resolution: separation_nm/fwhm};
  }
  function slabProfile(opacityArea, sigma_km_s, R = Infinity) {
    // Opacity is normalized BEFORE exp(-tau); microturbulence enters sigma, not
    // an output convolution. Instrument convolution is applied only afterwards.
    const tau0 = opacityArea / (Math.sqrt(2*Math.PI) * sigma_km_s);
    const intrinsic = velocity.map(v => Math.exp(-tau0 * Math.exp(-.5*(v/sigma_km_s)**2)));
    const flux = R === Infinity ? intrinsic : gaussianConvolveDeficit(intrinsic, c / 1000 / R / 2.354820045 / (velocity[1]-velocity[0]));
    return {velocity, intrinsic, flux, tau0, EW_velocity: integrate(velocity, intrinsic.map(f=>1-f)), observed_EW_velocity: integrate(velocity, flux.map(f=>1-f))};
  }
  function stellar({teff, logg, metallicity, xi, R}) {
    const s = config.slab;
    const population = (T,g) => {
      const ne = s.reference_ne_m3 * 10**(g-s.reference_logg) * s.reference_T_K/T;
      const ratio = 2 * s.partition_ratio * (2*Math.PI*config.constants.m_e_kg*k*T/(h*h))**1.5 * Math.exp(-s.ionization_eV*e/(k*T)) / ne;
      return {fraction: Math.exp(-s.excitation_eV*e/(k*T)) / (1+ratio), ne};
    };
    const current = population(teff,logg), reference = population(s.reference_T_K,s.reference_logg);
    const opacityScale = 10**metallicity * current.fraction/reference.fraction;
    const thermal = Math.sqrt(k*teff/(s.mass_u*config.constants.u_kg))/1000;
    const sigma = Math.sqrt(thermal**2 + xi**2/2);
    const weak = slabProfile(s.weak_opacity_area_km_s*opacityScale,sigma,R);
    const strong = slabProfile(s.strong_opacity_area_km_s*opacityScale,sigma,R);
    const toMA = w => w/c*1000*s.center_nm*10000;
    return {weak,strong,sigma,thermal,opacityScale,ne:current.ne,weak_mA:toMA(weak.EW_velocity),strong_mA:toMA(strong.EW_velocity),x:velocity.map(v=>s.center_nm*(1+v*1000/c))};
  }
  function equivalentWidth({depth, sigma, shape, window, continuum}) {
    const x = linspace(-1.5,1.5,801);
    const fluxAt = offset => 1 - depth*(shape === 'lorentzian' ? 1/(1+(offset/sigma)**2) : Math.exp(-.5*(offset/sigma)**2));
    const wx = linspace(-window,window,601), residual = wx.map(v=>1-fluxAt(v)/continuum);
    return {x,flux:x.map(fluxAt),wx,residual,EW_mA:integrate(wx,residual)*1000,true_window_mA:integrate(wx,wx.map(v=>1-fluxAt(v)))*1000,gaussian_full_mA:depth*sigma*Math.sqrt(2*Math.PI)*1000,FWHM_A:(shape==='lorentzian'?2:2.354820045)*sigma};
  }
  function growth(logAbundance, b) {
    // Fixed transition/atmosphere proxy: integrated opacity scales with abundance.
    return slabProfile(5 * 10**logAbundance, b/Math.SQRT2);
  }
  function invertGrowth(EW_velocity,b) {
    let lo=-3,hi=3;
    if(EW_velocity<growth(lo,b).EW_velocity || EW_velocity>growth(hi,b).EW_velocity)return null;
    for(let i=0;i<48;i++){const mid=(lo+hi)/2;if(growth(mid,b).EW_velocity<EW_velocity)lo=mid;else hi=mid;}
    return (lo+hi)/2;
  }
  function rv({mass,inclination,period,starMass,phase}) {
    const P=period*config.constants.day_s, M=starMass*config.constants.solar_mass_kg, m=mass*config.constants.jupiter_mass_kg;
    const K=(2*Math.PI*config.constants.G_m3_kg_s2/P)**(1/3)*m*Math.sin(inclination*Math.PI/180)/(M+m)**(2/3);
    const v=K*Math.sin(2*Math.PI*phase);
    const a=(config.constants.G_m3_kg_s2*(M+m)*P*P/(4*Math.PI*Math.PI))**(1/3);
    return {K_m_s:K,v_m_s:v,minimum_mass_Mj:mass*Math.sin(inclination*Math.PI/180),stellar_a_AU:a*m/(M+m)/config.constants.AU_m};
  }
  return {photon,doppler,prism,grating,resolution,slabProfile,stellar,equivalentWidth,growth,invertGrowth,rv};
}
