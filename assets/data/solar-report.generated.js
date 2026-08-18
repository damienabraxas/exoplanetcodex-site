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
      "status": "gold · generated",
      "appendixPath": "/systems/sol/elements/fe/",
      "referenceKeys": [
        "asplund2021",
        "lodders2025",
        "scott2015",
        "bergemann2012"
      ],
      "primary": {
        "value": 7.466,
        "sigmaStat": null,
        "sigmaSys": null,
        "sigmaTotal": 0.139,
        "lineCount": 62
      },
      "secondary": {
        "value": 7.57,
        "sigmaStat": null,
        "sigmaSys": null,
        "sigmaTotal": 0.17123156835116593,
        "lineCount": 131
      },
      "asplund": 7.46,
      "products": [
        {
          "band": "VIS",
          "instrument": "Kitt Peak solar atlas",
          "engine": "1D-LTE",
          "method": "GRADED (primary lab gf)",
          "value": 7.445,
          "sigma": 0.07295423222815794,
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
          "lineCount": 131,
          "role": "ungraded"
        }
      ],
      "diagnostics": [
        {
          "line": "11119.795 Å",
          "category": "telluric adjacent",
          "caption": "0.205 A below the H2O 11120-11560 A edge in telluric_policy.TELLURIC_BANDS, so the band list does not catch it while the absorption plainly reaches it: Kitt Peak window median flux 0.872 against a synthesis normalised to unity (RYA-843 measured 0.966-0.996 for clean lines in the same band). NO ATLAS CAN REFEREE IT -- the telluric_policy KP-vs-IAG discriminator needs IAG, and the staged atlas stops at 11083.4 A, below this line. Excluded CONSERVATIVELY on that unresolvable ambiguity, not on its fitted value: it fits at 7.833, a perfectly plausible number, and its chi2 moves only 2.2% across 8 dex of iron, so it measured nothing and landed there by luck. Retire when an atlas that reaches 11120 A can adjudicate the band edge.",
          "status": "flagged_kept"
        },
        {
          "line": "11689.972 Å",
          "category": "deriver excluded",
          "caption": "SYNTHESIS: edge_pinned",
          "status": "excluded"
        },
        {
          "line": "12638.703 Å",
          "category": "deriver excluded",
          "caption": "NON-MINIMUM: chi2 at a bracket end is not above the reported minimum (frac_rise = -1.95e-05 <= 0), so the optimizer returned a point that is not a minimum and the fit did not determine A(X). A correctness failure, not a quality threshold. Measured and retained; excluded from the aggregate only (RYA-711).",
          "status": "excluded"
        },
        {
          "line": "12648.741 Å",
          "category": "deriver excluded",
          "caption": "SYNTHESIS: edge_pinned",
          "status": "excluded"
        },
        {
          "line": "3617.318 Å",
          "category": "non minimum",
          "caption": "The optimizer returned a point that is NOT a minimum: chi2 at a bracket end is BELOW chi2 at the reported best fit (frac_rise = -0.117), so the fit did not determine A(Fe) at all. A correctness failure, not a quality judgement -- there is no threshold involved, only the sign. 🔴 ITS VALUE LOOKS PERFECTLY NORMAL: A = 7.477, indistinguishable from solar, which is exactly why no plausibility check could ever have found it and why the RYA-847 sweep was needed. Removing it moves the near-UV 1D-LTE cell 7.4875 -> 7.4980 and makes the scatter slightly WORSE (0.4126 -> 0.4178): this exclusion costs dispersion rather than buying it, which is the evidence that it is a validity cut and not tuning (RYA-161/844). Caught automatically by the constraint gate; recorded here so the cut is reproducible from its stated reason without running the pipeline.",
          "status": "excluded"
        },
        {
          "line": "4769.812 Å",
          "category": "atomic blend",
          "caption": "RYA-764/783: the 1D-LTE EW inversion returns A(Fe I) = 8.342 on this line at EW 44.1 mA -- physically impossible for the Sun (~7.5) and it ENTERS the band-product aggregate, because derive_band_products.py does not consult this registry. It is one of 17 (VIS) / 11 (IR) used lines above A=8.0 in the EW route; the ENGINE-B flux fit produces ZERO such lines in the IR (max 7.953) on the same pool, so the pathology is the EW->abundance inversion, not the spectrum. The median protects the reported product value, but these lines are the heavy tail of the Engine-A minus Engine-B per-line diagnostic (robust sd 0.10 dex, naive sd 0.50). CAUSE NOT ESTABLISHED -- misidentification, a wrong gf and unmodelled blending all produce this signature; do NOT re-source the gf on this evidence. || RYA-808: required_treatment exclude -> investigate. The cause is not established (status=owed), and a treatment cannot be prescribed from an undiagnosed cause (RYA-161). Behaviour is UNCHANGED -- aggregate_action already kept owed rows in the aggregate, flagged. When a cause IS established: status -> active AND required_treatment -> the diagnosed treatment. || RYA-809 RCA: GHOST: absorbs 4.7x the EW its catalogued central_depth (0.059) can support, with no co-located absorber to account for it — the feature is not this transition. mismatch 0.4 mA; Ce II present at +3.91 dex per-atom, but its solar abundance is not tabulated here -> INCONCLUSIVE; gf K07 (+/-0.2 dex); REW -5.034; A 8.342 (+0.738 vs pool median); EW-vs-strength residual +0.590 dex; absorbs 4.7x the EW its catalogued central_depth supports",
          "status": "excluded"
        },
        {
          "line": "4880.524 Å",
          "category": "deriver excluded",
          "caption": "COG-INVERSION: bisection did not converge, so this EW does not map to an abundance here",
          "status": "excluded"
        },
        {
          "line": "4932.084 Å",
          "category": "abundance outlier",
          "caption": "RYA-764/783: the 1D-LTE EW inversion returns A(Fe I) = 8.500 on this line at EW 52.2 mA -- physically impossible for the Sun (~7.5) and it ENTERS the band-product aggregate, because derive_band_products.py does not consult this registry. It is one of 17 (VIS) / 11 (IR) used lines above A=8.0 in the EW route; the ENGINE-B flux fit produces ZERO such lines in the IR (max 7.953) on the same pool, so the pathology is the EW->abundance inversion, not the spectrum. The median protects the reported product value, but these lines are the heavy tail of the Engine-A minus Engine-B per-line diagnostic (robust sd 0.10 dex, naive sd 0.50). CAUSE NOT ESTABLISHED -- misidentification, a wrong gf and unmodelled blending all produce this signature; do NOT re-source the gf on this evidence. || RYA-808: required_treatment exclude -> investigate. The cause is not established (status=owed), and a treatment cannot be prescribed from an undiagnosed cause (RYA-161). Behaviour is UNCHANGED -- aggregate_action already kept owed rows in the aggregate, flagged. When a cause IS established: status -> active AND required_treatment -> the diagnosed treatment. || RYA-809 RCA: AMBIGUOUS after all four tests — +0.896 dex above the pool on a non-laboratory K07 gf (+/-0.2 dex), which makes the gf a CANDIDATE but not an established cause — RYA-760 refuted loosening the tier, and RYA-780 found no primary measurement to adjudicate against. Stays investigate/owed and is NOT excluded (RYA-161: no exclusion without an established cause). mismatch 0.4 mA; C2 present at +5.40 dex per-atom, but its solar abundance is not tabulated here -> INCONCLUSIVE; gf K07 (+/-0.2 dex); REW -4.976; A 8.500 (+0.896 vs pool median); EW-vs-strength residual +0.299 dex; absorbs 1.3x the EW its catalogued central_depth supports",
          "status": "flagged_kept"
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
