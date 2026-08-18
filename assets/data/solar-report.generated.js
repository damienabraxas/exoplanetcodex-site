window.SOLAR_REPORT = {
  "mode": "generated",
  "target": "Sun",
  "observingCoverage": [
    {
      "band": "Visible",
      "range": "3780–6910 Å",
      "instrument": "HARPS · ESO 3.6 m",
      "role": "Primary direct-solar dataset",
      "status": "analysis ready",
      "detail": "10 S1D exposures · R ≈ 115,000 · SNR 306–309 · ESO 1102.D-0954(A)"
    },
    {
      "band": "Near-UV through near-IR",
      "range": "3044–10426 Å",
      "instrument": "UVES · Vesta / Ceres",
      "role": "Reflected-Sun cross-band observations",
      "status": "audited with caveats",
      "detail": "Multiple UVES settings; exposure-level coverage and conditioning retained"
    },
    {
      "band": "Y / J / H / K",
      "range": "0.95–2.49 µm",
      "instrument": "CRIRES+ · Vesta",
      "role": "Reflected-Sun infrared observations",
      "status": "provisional",
      "detail": "18 extracted IDPs; K-band remains telluric- and RV-conditioning gated"
    },
    {
      "band": "Y / J / H",
      "range": "0.966–1.923 µm",
      "instrument": "NIRPS · direct Sun",
      "role": "Direct-solar near-IR holding",
      "status": "reduction owed",
      "detail": "10 raw 2D frames; no reduced Solar S1D product yet"
    },
    {
      "band": "Red optical / near-IR",
      "range": "0.5–2.3 µm",
      "instrument": "IAG solar flux atlases",
      "role": "Telluric and wavelength-scale control",
      "status": "reference atlas",
      "detail": "Independent FTS reference coverage"
    },
    {
      "band": "Infrared",
      "range": "1.1–5.4 µm",
      "instrument": "NSO Kitt Peak FTS",
      "role": "Ground-based solar photosphere atlas",
      "status": "reference atlas",
      "detail": "Per-band products retain atlas identity and telluric limitations"
    },
    {
      "band": "Infrared",
      "range": "2.26–14.3 µm",
      "instrument": "ACE-FTS",
      "role": "Telluric-free space reference",
      "status": "reference atlas",
      "detail": "Validation source for ground-based infrared products"
    }
  ],
  "bibliography": {
    "asplund2021": {
      "label": "Asplund, Amarsi & Grevesse (2021), The chemical make-up of the Sun",
      "url": "https://doi.org/10.1051/0004-6361/202140445",
      "role": "Primary 3D non-LTE solar abundance scale"
    },
    "lodders2025": {
      "label": "Lodders, Bergemann & Palme (2025), Solar System Elemental Abundances",
      "url": "https://doi.org/10.1007/s11214-025-01146-w",
      "role": "Solar-system abundance comparison"
    },
    "scott2015": {
      "label": "Scott et al. (2015), The elemental composition of the Sun II",
      "url": "https://doi.org/10.1051/0004-6361/201424110",
      "role": "Iron-group abundance reference"
    },
    "bergemann2012": {
      "label": "Bergemann et al. (2012), Non-LTE line formation of Fe",
      "url": "https://doi.org/10.1111/j.1365-2966.2012.21687.x",
      "role": "Fe non-LTE comparison"
    },
    "reiners2016": {
      "label": "Reiners et al. (2016), The IAG solar flux atlas",
      "url": "https://doi.org/10.1051/0004-6361/201527530",
      "role": "Optical/near-IR atlas"
    },
    "hase2010": {
      "label": "Hase et al. (2010), The ACE-FTS atlas",
      "url": "https://doi.org/10.1016/j.jqsrt.2009.10.020",
      "role": "Telluric-free infrared atlas"
    }
  },
  "pageReferenceKeys": [
    "asplund2021",
    "lodders2025",
    "reiners2016",
    "hase2010"
  ],
  "references": [
    {
      "name": "Asplund et al. 2021",
      "value": 7.46,
      "sigma": 0.04
    },
    {
      "name": "Lodders et al. 2025",
      "value": 7.51,
      "sigma": 0.05
    }
  ],
  "elements": [
    {
      "atomicNumber": 26,
      "symbol": "Fe",
      "ion": "I",
      "name": "Iron",
      "status": "graded 1D-LTE · generated",
      "appendixPath": "/systems/sol/elements/fe/",
      "referenceKeys": [
        "asplund2021",
        "lodders2025",
        "scott2015",
        "bergemann2012"
      ],
      "primary": {
        "label": "Primary reported product · VIS graded 1D-LTE",
        "value": 7.445,
        "sigmaStat": 0.0394,
        "sigmaSys": 0.0614,
        "sigmaTotal": 0.07295423222815794,
        "lineCount": 9,
        "explanation": "The highlighted result is the VIS 1D-LTE product restricted to the primary laboratory-gf pool. Its uncertainty uses that pool’s cited gf term. No cross-band or cross-engine average is made."
      },
      "secondary": {
        "label": "Same cell · VIS ungraded 1D-LTE",
        "value": 7.586,
        "sigmaStat": 0.0261,
        "sigmaSys": 0.1705,
        "sigmaTotal": 0.1724861153832389,
        "lineCount": 148,
        "explanation": "The broader comparison uses all accepted VIS 1D-LTE lines from the post-gate cell. More lines do not make it the headline because their gf provenance carries the wider ungraded floor."
      },
      "asplund": 7.46,
      "goldAnchor": {
        "value": 7.466,
        "sigma": 0.139,
        "lineCount": 62
      },
      "products": [
        {
          "band": "VIS",
          "instrument": "Kitt Peak solar atlas",
          "engine": "1D-LTE",
          "method": "GRADED (primary lab gf)",
          "value": 7.445,
          "sigma": 0.07295423222815794,
          "sigmaStat": 0.0394,
          "sigmaSys": 0.0614,
          "lineCount": 9,
          "role": "graded"
        },
        {
          "band": "near-UV",
          "instrument": "Kitt Peak solar atlas",
          "engine": "1D-LTE",
          "method": "GRADED (primary lab gf)",
          "value": 7.577,
          "sigma": 0.14118020399475276,
          "sigmaStat": 0.0849,
          "sigmaSys": 0.1128,
          "lineCount": 59,
          "role": "graded"
        },
        {
          "band": "red-optical",
          "instrument": "Kitt Peak solar atlas",
          "engine": "1D-LTE",
          "method": "GRADED (primary lab gf)",
          "value": 7.516,
          "sigma": 0.0657684574853326,
          "sigmaStat": 0.0225,
          "sigmaSys": 0.0618,
          "lineCount": 20,
          "role": "graded"
        },
        {
          "band": "near-UV",
          "instrument": "kpno solar atlas",
          "engine": "1D-LTE",
          "method": "SynthesisHandler",
          "value": 7.498,
          "sigma": 0.20823892527575147,
          "sigmaStat": 0.0669,
          "sigmaSys": 0.1972,
          "lineCount": 39,
          "role": "ungraded"
        },
        {
          "band": "NIR",
          "instrument": "kpno solar atlas",
          "engine": "1D-LTE",
          "method": "SynthesisHandler",
          "value": 7.492,
          "sigma": 0.22167446853438041,
          "sigmaStat": 0.1391,
          "sigmaSys": 0.1726,
          "lineCount": 31,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "kpno solar atlas",
          "engine": "1D-LTE",
          "method": "ProfileFitHandler",
          "value": 7.586,
          "sigma": 0.1724861153832389,
          "sigmaStat": 0.0261,
          "sigmaSys": 0.1705,
          "lineCount": 148,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "kpno solar atlas",
          "engine": "ENGINE-A",
          "method": "ProfileFitHandler",
          "value": 7.597,
          "sigma": 0.1727676474343504,
          "sigmaStat": 0.0279,
          "sigmaSys": 0.1705,
          "lineCount": 105,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "kpno solar atlas",
          "engine": "ENGINE-B",
          "method": "SynthesisHandler",
          "value": 7.515,
          "sigma": 0.1710920512472745,
          "sigmaStat": 0.0193,
          "sigmaSys": 0.17,
          "lineCount": 129,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "kpno solar atlas",
          "engine": "ENGINE-B-NLTE",
          "method": "SynthesisHandler",
          "value": 7.57,
          "sigma": 0.17123156835116593,
          "sigmaStat": 0.0205,
          "sigmaSys": 0.17,
          "lineCount": 131,
          "role": "ungraded"
        }
      ],
      "diagnostics": [
        {
          "line": "Fe I 4919 Å",
          "category": "archived problem-line diagnostic",
          "caption": "Observed spectrum, fitted profile, blend markers, and fit residuals from the committed RYA-224 diagnostic record.",
          "status": "excluded · confirmed blend",
          "imagePath": "/assets/images/sol/problem-lines/Fe_I_4919A_2026-06-11.png"
        },
        {
          "line": "Fe I 4970 Å",
          "category": "archived problem-line diagnostic",
          "caption": "Observed spectrum, fitted profile, blend markers, and fit residuals from the committed RYA-224 diagnostic record.",
          "status": "excluded · confirmed blend",
          "imagePath": "/assets/images/sol/problem-lines/Fe_I_4970A_2026-06-11.png"
        }
      ],
      "provenance": {
        "poolCount": 40,
        "nistClassCount": 17,
        "poorNistClassCount": 9,
        "poorClasses": [
          "C",
          "C+",
          "D",
          "D+",
          "E"
        ],
        "sentence": "17 of 40 near-UV Fe I lines carry a citable NIST accuracy class; 9 of those are in the C/C+/D/D+/E classes."
      },
      "downloadPath": "/assets/data/solar/Fe_perline.csv"
    },
    {
      "atomicNumber": 26,
      "symbol": "Fe",
      "ion": "II",
      "name": "Iron",
      "childOf": "Fe I",
      "status": "appendix pending · RYA-876",
      "measurementRole": "ionization arbiter / diagnostic",
      "diagnostic": {
        "value": 7.5,
        "sigmaTotal": null,
        "lineCount": 3
      }
    },
    {
      "atomicNumber": 3,
      "symbol": "Li",
      "ion": "I",
      "name": "Lithium",
      "status": "curation-owed",
      "asplund": 1.05
    },
    {
      "atomicNumber": 6,
      "symbol": "C",
      "ion": "I",
      "name": "Carbon",
      "status": "pass",
      "asplund": 8.46
    },
    {
      "atomicNumber": 7,
      "symbol": "N",
      "ion": "I",
      "name": "Nitrogen",
      "status": "curation-owed",
      "asplund": 7.83
    },
    {
      "atomicNumber": 8,
      "symbol": "O",
      "ion": "I",
      "name": "Oxygen",
      "status": "pass",
      "asplund": 8.69
    },
    {
      "atomicNumber": 11,
      "symbol": "Na",
      "ion": "I",
      "name": "Sodium",
      "status": "curation-owed",
      "asplund": 6.24
    },
    {
      "atomicNumber": 12,
      "symbol": "Mg",
      "ion": "I",
      "name": "Magnesium",
      "status": "curation-owed",
      "asplund": 7.55
    },
    {
      "atomicNumber": 13,
      "symbol": "Al",
      "ion": "I",
      "name": "Aluminium",
      "status": "curation-owed",
      "asplund": 6.43
    },
    {
      "atomicNumber": 14,
      "symbol": "Si",
      "ion": "I",
      "name": "Silicon",
      "status": "curation-owed",
      "asplund": 7.51
    },
    {
      "atomicNumber": 15,
      "symbol": "P",
      "ion": "I",
      "name": "Phosphorus",
      "status": "curation-owed",
      "asplund": 5.41
    },
    {
      "atomicNumber": 16,
      "symbol": "S",
      "ion": "I",
      "name": "Sulfur",
      "status": "curation-owed",
      "asplund": 7.12
    },
    {
      "atomicNumber": 19,
      "symbol": "K",
      "ion": "I",
      "name": "Potassium",
      "status": "pass",
      "asplund": 5.07
    },
    {
      "atomicNumber": 20,
      "symbol": "Ca",
      "ion": "I",
      "name": "Calcium",
      "status": "curation-owed",
      "asplund": 6.3
    },
    {
      "atomicNumber": 21,
      "symbol": "Sc",
      "ion": "II",
      "name": "Scandium",
      "status": "curation-owed",
      "asplund": 3.14
    },
    {
      "atomicNumber": 22,
      "symbol": "Ti",
      "ion": "I",
      "name": "Titanium",
      "status": "curation-owed",
      "asplund": 4.97
    },
    {
      "atomicNumber": 23,
      "symbol": "V",
      "ion": "I",
      "name": "Vanadium",
      "status": "curation-owed",
      "asplund": 3.9
    },
    {
      "atomicNumber": 24,
      "symbol": "Cr",
      "ion": "I",
      "name": "Chromium",
      "status": "curation-owed",
      "asplund": 5.62
    },
    {
      "atomicNumber": 25,
      "symbol": "Mn",
      "ion": "I",
      "name": "Manganese",
      "status": "pass",
      "asplund": 5.42
    },
    {
      "atomicNumber": 27,
      "symbol": "Co",
      "ion": "I",
      "name": "Cobalt",
      "status": "pass",
      "asplund": 4.94
    },
    {
      "atomicNumber": 28,
      "symbol": "Ni",
      "ion": "I",
      "name": "Nickel",
      "status": "curation-owed",
      "asplund": 6.2
    },
    {
      "atomicNumber": 29,
      "symbol": "Cu",
      "ion": "I",
      "name": "Copper",
      "status": "curation-owed",
      "asplund": 4.18
    },
    {
      "atomicNumber": 38,
      "symbol": "Sr",
      "ion": "I",
      "name": "Strontium",
      "status": "curation-owed",
      "asplund": 2.83
    },
    {
      "atomicNumber": 39,
      "symbol": "Y",
      "ion": "I",
      "name": "Yttrium",
      "status": "curation-owed",
      "asplund": 2.21
    },
    {
      "atomicNumber": 40,
      "symbol": "Zr",
      "ion": "I",
      "name": "Zirconium",
      "status": "curation-owed",
      "asplund": 2.59
    },
    {
      "atomicNumber": 56,
      "symbol": "Ba",
      "ion": "I",
      "name": "Barium",
      "status": "curation-owed",
      "asplund": 2.27
    },
    {
      "atomicNumber": 63,
      "symbol": "Eu",
      "ion": "I",
      "name": "Europium",
      "status": "curation-owed",
      "asplund": 0.52
    }
  ],
  "reproducibility": {
    "generator": "scripts/generate_solar_report.py",
    "version": "1.0.0",
    "sourceArtifact": "data/products/solar/Fe_perline.csv",
    "instrument": "Kitt Peak solar atlas + Solar gold v5",
    "gitCommit": "c05eecf7de1f23d4c38e098c0658beab8891e541",
    "productCommit": "4e3dabb5ba139c89ca0b5f5538afb64525ab8fae",
    "goldVersion": "Fe_I=v5",
    "generatedAt": "2026-08-18T21:08:52+00:00"
  }
};
