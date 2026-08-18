/* DEVELOPMENT FIXTURE — NOT FOR PUBLICATION.
 * This file exercises the RYA-851 reporting contract. Replace it with generated
 * pipeline output after RYA-847, RYA-850, and RYA-855 are reconciled.
 */
window.SOLAR_REPORT = {
  mode: 'development',
  target: 'Sun',
  observingCoverage: [
    { band: 'Visible', range: '3780–6910 Å', instrument: 'HARPS · ESO 3.6 m', role: 'Primary direct-solar dataset', status: 'analysis ready', detail: '10 S1D exposures · R ≈ 115,000 · SNR 306–309 · ESO 1102.D-0954(A)' },
    { band: 'Near-UV through near-IR', range: '3044–10426 Å', instrument: 'UVES · Vesta / Ceres', role: 'Reflected-Sun cross-band observations', status: 'audited with caveats', detail: 'Multiple UVES settings; each exposure retains its own coverage, SNR, and frame conditioning' },
    { band: 'Y / J / H / K', range: '0.95–2.49 µm', instrument: 'CRIRES+ · Vesta', role: 'Reflected-Sun infrared observations', status: 'provisional', detail: '18 extracted IDPs · Y/J/H contain Solar Fe lines · K-band CO/OH path remains telluric- and RV-conditioning gated' },
    { band: 'Y / J / H', range: '0.966–1.923 µm', instrument: 'NIRPS · direct Sun', role: 'Direct-solar near-IR holding', status: 'reduction owed', detail: '10 raw 2D frames; no reduced Solar S1D product yet, so these do not feed published values' },
    { band: 'Red optical / near-IR', range: '0.5–2.3 µm', instrument: 'IAG solar flux atlases', role: 'Telluric and wavelength-scale control', status: 'reference atlas', detail: 'Independent FTS reference coverage; not merged with instrument products' },
    { band: 'Infrared', range: '1.1–5.4 µm', instrument: 'NSO Kitt Peak FTS', role: 'Ground-based solar photosphere atlas', status: 'reference atlas', detail: 'Per-band reference products retain their own atlas identity and telluric limitations' },
    { band: 'Infrared', range: '2.26–14.3 µm', instrument: 'ACE-FTS', role: 'Telluric-free space reference', status: 'reference atlas', detail: 'Validation source for ground-based infrared Solar products' }
  ],
  bibliography: {
    asplund2021: { label: 'Asplund, Amarsi & Grevesse (2021), The chemical make-up of the Sun: A 2020 vision', url: 'https://doi.org/10.1051/0004-6361/202140445', role: 'Primary 3D non-LTE solar abundance scale' },
    lodders2025: { label: 'Lodders, Bergemann & Palme (2025), Solar System Elemental Abundances', url: 'https://doi.org/10.1007/s11214-025-01146-w', role: 'Solar-system abundance comparison and 28-element quality framework' },
    hase2010: { label: 'Hase et al. (2010), The ACE-FTS atlas of the infrared solar spectrum', url: 'https://doi.org/10.1016/j.jqsrt.2009.10.020', role: 'Telluric-free infrared solar atlas' },
    reiners2016: { label: 'Reiners et al. (2016), The IAG solar flux atlas', url: 'https://doi.org/10.1051/0004-6361/201527530', role: 'Optical/near-IR wavelength-scale reference' },
    baker2020: { label: 'Baker, Blake & Reiners (2020), Telluric correction for the IAG Solar Flux Atlas', url: 'https://doi.org/10.3847/1538-4365/ab6a1c', role: 'Telluric control for optical/near-IR atlas products' },
    scott2015: { label: 'Scott et al. (2015), The elemental composition of the Sun II: iron-group elements', url: 'https://doi.org/10.1051/0004-6361/201424110', role: 'Iron-group abundance and 3D-correction reference' },
    bergemann2012: { label: 'Bergemann et al. (2012), Non-LTE line formation of Fe in late-type stars', url: 'https://doi.org/10.1111/j.1365-2966.2012.21687.x', role: 'Fe non-LTE comparison grid' },
    elgueta2026: { label: 'Elgueta et al. (2026), Gaia FGK benchmark stars: selecting infrared lines', url: 'https://doi.org/10.1051/0004-6361/202659148', role: 'CRIRES+ Y/J/H Solar-via-Vesta infrared line-selection reference' }
  },
  pageReferenceKeys: ['asplund2021', 'lodders2025', 'reiners2016', 'baker2020', 'hase2010', 'elgueta2026'],
  references: [
    { name: 'Asplund et al. 2021', value: 7.46, sigma: 0.04 },
    { name: 'Lodders et al. 2025', value: 7.51, sigma: 0.05 }
  ],
  elements: [
    {
      atomicNumber: 26,
      symbol: 'Fe',
      ion: 'I',
      name: 'Iron',
      status: 'development snapshot',
      appendixPath: '/systems/sol/elements/fe/',
      referenceKeys: ['asplund2021', 'lodders2025', 'scott2015', 'bergemann2012'],
      primary: { value: 7.466, sigmaStat: 0.03, sigmaSys: 0.14, sigmaTotal: 0.14, lineCount: 62 },
      secondary: { value: 7.572, sigmaStat: 0.03, sigmaSys: 0.19, sigmaTotal: 0.19, lineCount: 136 },
      asplund: 7.46,
      products: [
        { band: 'UV', instrument: 'Kitt Peak atlas', engine: 'Synthesis A', method: '1D LTE (constraint audit pending)', value: 7.488, sigma: 0.41, lineCount: 8, role: 'ungraded' },
        { band: 'VIS', instrument: 'HARPS solar', engine: 'EW engine', method: 'graded laboratory gf', value: 7.466, sigma: 0.14, lineCount: 62, role: 'graded' },
        { band: 'VIS', instrument: 'HARPS solar', engine: 'Synthesis B', method: 'all accepted lines', value: 7.572, sigma: 0.19, lineCount: 136, role: 'ungraded' },
        { band: 'IR', instrument: 'Kitt Peak / HARPS', engine: 'EW engine', method: 'graded laboratory gf', value: 7.516, sigma: 0.17, lineCount: 21, role: 'graded' },
        { band: 'IR', instrument: 'Kitt Peak / HARPS', engine: 'Synthesis B', method: 'all accepted lines', value: 7.549, sigma: 0.24, lineCount: 77, role: 'ungraded' }
      ],
      diagnostics: [
        { line: '11973.046 Å', category: 'unconstrained synthesis fit', caption: 'Fixture caption: the objective remained flat in abundance across the tested interval.' },
        { line: '11689.972 Å', category: 'blend-dominated', caption: 'Fixture caption: a neighbouring feature falls inside the fit window.' }
      ]
    },
    {
      atomicNumber: 26,
      symbol: 'Fe',
      ion: 'II',
      name: 'Iron',
      childOf: 'Fe I',
      status: 'appendix pending · RYA-876',
      measurementRole: 'ionization arbiter / diagnostic',
      diagnostic: { value: 7.500, sigmaTotal: null, lineCount: 3 }
    },
    { atomicNumber: 6, symbol: 'C', name: 'Carbon', status: 'in calibration', asplund: 8.46 },
    { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', status: 'queued', asplund: 7.83 },
    { atomicNumber: 8, symbol: 'O', name: 'Oxygen', status: 'in calibration', asplund: 8.69 },
    { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', status: 'queued', asplund: 7.55 },
    { atomicNumber: 13, symbol: 'Al', name: 'Aluminium', status: 'queued', asplund: 6.43 },
    { atomicNumber: 14, symbol: 'Si', name: 'Silicon', status: 'queued', asplund: 7.51 },
    { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', status: 'queued', asplund: 6.30 },
    { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', status: 'queued', asplund: 4.97 },
    { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', status: 'queued', asplund: 5.62 },
    { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', status: 'queued', asplund: 5.42 },
    { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', status: 'queued', asplund: 6.20 }
  ],
  reproducibility: {
    generator: 'solar-report prototype',
    version: '0.1.0-dev',
    sourceArtifact: 'RYA-851 development fixture',
    instrument: 'HARPS solar / atlas fixtures',
    gitCommit: 'uncommitted prototype',
    generatedAt: '2026-08-17T00:00:00-06:00'
  }
};
