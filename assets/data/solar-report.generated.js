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
    "denhartog2019": {
      "label": "Den Hartog et al. (2019), Atomic transition probabilities for UV and blue lines of Fe II",
      "url": "https://doi.org/10.3847/1538-4365/ab322e",
      "role": "Primary-laboratory Fe II gf referee (2250–3280 Å + 4173–4584 Å)"
    },
    "melendez2009": {
      "label": "Meléndez & Barbuy (2009), Both accurate and precise gf-values for Fe II lines",
      "url": "https://doi.org/10.1051/0004-6361/200811302",
      "role": "Fe II log gf source; Table 1 L/S flags separate laboratory-normalised from solar-fitted"
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
        "lineCount": 62,
        "sigmaBasis": "element status tracker (RYA-654) — total only"
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
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "GRADED (primary lab gf)",
          "value": 7.445,
          "sigma": 0.07295423222815794,
          "lineCount": 9,
          "role": "graded"
        },
        {
          "band": "near-UV",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "GRADED (primary lab gf)",
          "value": 7.577,
          "sigma": 0.14118020399475276,
          "lineCount": 59,
          "role": "graded"
        },
        {
          "band": "red-optical",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "GRADED (primary lab gf)",
          "value": 7.516,
          "sigma": 0.0657684574853326,
          "lineCount": 20,
          "role": "graded"
        },
        {
          "band": "near-UV",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "SynthesisHandler",
          "value": 7.498,
          "sigma": 0.20823892527575147,
          "lineCount": 39,
          "role": "ungraded"
        },
        {
          "band": "NIR",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "SynthesisHandler",
          "value": 7.492,
          "sigma": 0.22167446853438041,
          "lineCount": 31,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "ProfileFitHandler",
          "value": 7.586,
          "sigma": 0.1724861153832389,
          "lineCount": 148,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-A",
          "method": "ProfileFitHandler",
          "value": 7.597,
          "sigma": 0.1727676474343504,
          "lineCount": 105,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-B",
          "method": "SynthesisHandler",
          "value": 7.515,
          "sigma": 0.1710920512472745,
          "lineCount": 129,
          "role": "ungraded"
        },
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
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
      "downloadPath": "/assets/data/solar/FeI_perline.csv"
    },
    {
      "atomicNumber": 26,
      "symbol": "Fe",
      "ion": "II",
      "name": "Iron",
      "childOf": "Fe I",
      "status": "arbiter · generated",
      "measurementRole": "ionization arbiter / diagnostic",
      "appendixPath": "/systems/sol/elements/fe-ii/",
      "referenceKeys": [
        "asplund2021",
        "denhartog2019",
        "melendez2009",
        "scott2015"
      ],
      "primary": {
        "value": 7.517,
        "sigmaStat": 0.0845,
        "sigmaSys": 0.1705,
        "sigmaTotal": 0.19029056729118235,
        "lineCount": 3,
        "engine": "ENGINE-A",
        "handler": "ProfileFitHandler"
      },
      "asplund": null,
      "arbiterTrioA": [
        6147.7341,
        6238.3859,
        6247.557
      ],
      "products": [
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "ProfileFitHandler",
          "value": 7.542,
          "sigma": 0.18155993500769932,
          "sigmaStat": 0.0624,
          "sigmaSys": 0.1705,
          "lineCount": 10,
          "excludedCount": 1,
          "dominant": "gf scale (UNGRADED)",
          "role": "diagnostic",
          "dispositionState": "re-derived",
          "dispositionNote": "Re-derived after the RYA-877 disposition (RYA-880); this is the post-disposition value.",
          "dispositionDelta": -0.0264,
          "dispositionBefore": 7.568
        },
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-A",
          "method": "ProfileFitHandler",
          "value": 7.517,
          "sigma": 0.19029056729118235,
          "sigmaStat": 0.0845,
          "sigmaSys": 0.1705,
          "lineCount": 3,
          "excludedCount": 7,
          "dominant": "gf scale (UNGRADED)",
          "role": "arbiter",
          "dispositionState": "re-derived",
          "dispositionNote": "Re-derived after the RYA-877 disposition (RYA-880); this is the post-disposition value.",
          "dispositionDelta": null,
          "dispositionBefore": null
        },
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-B",
          "method": "SynthesisHandler",
          "value": 7.486,
          "sigma": 0.170488738631031,
          "sigmaStat": 0.0129,
          "sigmaSys": 0.17,
          "lineCount": 9,
          "excludedCount": 2,
          "dominant": "gf scale (UNGRADED)",
          "role": "diagnostic",
          "dispositionState": "re-derived",
          "dispositionNote": "Re-derived after the RYA-877 disposition (RYA-880); this is the post-disposition value.",
          "dispositionDelta": 0.0085,
          "dispositionBefore": 7.478
        },
        {
          "band": "VIS",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-B-NLTE",
          "method": "SynthesisHandler",
          "value": 7.47,
          "sigma": 0.1713855594850395,
          "sigmaStat": 0.0174,
          "sigmaSys": 0.1705,
          "lineCount": 8,
          "excludedCount": 3,
          "dominant": "gf scale (UNGRADED)",
          "role": "diagnostic",
          "dispositionState": "not re-derived",
          "dispositionNote": "This cell was NOT re-derived after the RYA-877 disposition and no committed per-line artifact records whether it carried the dispositioned line, so whether its value moves is unknown.",
          "dispositionDelta": null,
          "dispositionBefore": null
        },
        {
          "band": "red-optical",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "1D-LTE",
          "method": "ProfileFitHandler",
          "value": 7.696,
          "sigma": 0.2056322202379773,
          "sigmaStat": 0.111,
          "sigmaSys": 0.1731,
          "lineCount": 4,
          "excludedCount": 0,
          "dominant": "gf scale (UNGRADED)",
          "role": "diagnostic",
          "dispositionState": "unaffected",
          "dispositionNote": "The dispositioned line is at 5991.371 Å, outside this band, so the disposition cannot have moved this cell.",
          "dispositionDelta": null,
          "dispositionBefore": null
        },
        {
          "band": "red-optical",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-A",
          "method": "ProfileFitHandler",
          "value": 7.763,
          "sigma": 0.1731,
          "sigmaStat": 0.0,
          "sigmaSys": 0.1731,
          "lineCount": 1,
          "excludedCount": 3,
          "dominant": "gf scale (UNGRADED)",
          "role": "diagnostic",
          "dispositionState": "unaffected",
          "dispositionNote": "The dispositioned line is at 5991.371 Å, outside this band, so the disposition cannot have moved this cell.",
          "dispositionDelta": null,
          "dispositionBefore": null
        },
        {
          "band": "red-optical",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-B",
          "method": "SynthesisHandler",
          "value": 7.523,
          "sigma": 0.19437880542898706,
          "sigmaStat": 0.0894,
          "sigmaSys": 0.1726,
          "lineCount": 3,
          "excludedCount": 1,
          "dominant": "gf scale (UNGRADED)",
          "role": "diagnostic",
          "dispositionState": "unaffected",
          "dispositionNote": "The dispositioned line is at 5991.371 Å, outside this band, so the disposition cannot have moved this cell.",
          "dispositionDelta": null,
          "dispositionBefore": null
        },
        {
          "band": "red-optical",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "engine": "ENGINE-B-NLTE",
          "method": "SynthesisHandler",
          "value": 7.461,
          "sigma": 0.1788535993487411,
          "sigmaStat": 0.045,
          "sigmaSys": 0.1731,
          "lineCount": 2,
          "excludedCount": 2,
          "dominant": "gf scale (UNGRADED)",
          "role": "diagnostic",
          "dispositionState": "unaffected",
          "dispositionNote": "The dispositioned line is at 5991.371 Å, outside this band, so the disposition cannot have moved this cell.",
          "dispositionDelta": null,
          "dispositionBefore": null
        }
      ],
      "coverage": [
        {
          "band": "near-UV",
          "range": "3000–3780 Å",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "established": false,
          "engines": [],
          "reason": "Not an absence of lines: 106 Fe II near-UV lines WERE attempted and every one was refused by band policy, which bans profile fitting below 3780 Å (median line gap 0.146 Å). Fe I reaches this band through the RYA-759 SYNTHESIS route instead; that route has never been run for Fe II. The measured equivalent widths exist (rya783 band_ew, Sirius) — the derivation to a product does not."
        },
        {
          "band": "VIS",
          "range": "3800–6910 Å",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "established": true,
          "engines": [
            "1D-LTE",
            "ENGINE-A",
            "ENGINE-B",
            "ENGINE-B-NLTE"
          ],
          "reason": null
        },
        {
          "band": "red-optical",
          "range": "6910–9199 Å",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "established": true,
          "engines": [
            "1D-LTE",
            "ENGINE-A",
            "ENGINE-B",
            "ENGINE-B-NLTE"
          ],
          "reason": null
        },
        {
          "band": "NIR",
          "range": "10000–12935 Å",
          "instrument": "NSO Kitt Peak solar flux atlas",
          "established": false,
          "engines": [],
          "reason": "No Fe II product and no Fe II equivalent-width measurement exists here. The Fe II line set stops at 9199 Å, which is where the GES line list ends (RYA-762 — a catalogue wall, not physics). The redward extension that gave Fe I its 10000–12935 Å cell (RYA-834, Ruffoni-2014 + Belmonte-2017) ingests Fe I laboratory gf only, so it does not carry Fe II across."
        }
      ],
      "coverageGrid": [
        {
          "instrument": "NSO Kitt Peak solar flux atlas",
          "instrumentRole": "reference atlas - widest solar arm",
          "band": "near-UV",
          "range": "3000-3800 Å",
          "state": "gap",
          "reason": "No Fe II product for this arm in this band, though it covers 100% of it.",
          "established": false
        },
        {
          "instrument": "NSO Kitt Peak solar flux atlas",
          "instrumentRole": "reference atlas - widest solar arm",
          "band": "VIS",
          "range": "3800-6910 Å",
          "state": "present",
          "reason": "",
          "established": true
        },
        {
          "instrument": "NSO Kitt Peak solar flux atlas",
          "instrumentRole": "reference atlas - widest solar arm",
          "band": "red-optical",
          "range": "6910-10000 Å",
          "state": "present",
          "reason": "",
          "established": true
        },
        {
          "instrument": "NSO Kitt Peak solar flux atlas",
          "instrumentRole": "reference atlas - widest solar arm",
          "band": "NIR",
          "range": "10000-24000 Å",
          "state": "gap",
          "reason": "No Fe II product for this arm in this band, though it covers 21% of it.",
          "established": false
        },
        {
          "instrument": "IAG FTS solar atlas",
          "instrumentRole": "reference atlas - second arm, Sirius only",
          "band": "near-UV",
          "range": "3000-3800 Å",
          "state": "nodata",
          "reason": "IAG FTS solar atlas spans 4047-10650 A - no usable overlap with this band.",
          "established": false
        },
        {
          "instrument": "IAG FTS solar atlas",
          "instrumentRole": "reference atlas - second arm, Sirius only",
          "band": "VIS",
          "range": "3800-6910 Å",
          "state": "gap",
          "reason": "IAG FTS solar atlas reaches 92% of this band but no Fe II product exists for it.",
          "established": false
        },
        {
          "instrument": "IAG FTS solar atlas",
          "instrumentRole": "reference atlas - second arm, Sirius only",
          "band": "red-optical",
          "range": "6910-10000 Å",
          "state": "gap",
          "reason": "IAG FTS solar atlas reaches 100% of this band but no Fe II product exists for it.",
          "established": false
        },
        {
          "instrument": "IAG FTS solar atlas",
          "instrumentRole": "reference atlas - second arm, Sirius only",
          "band": "NIR",
          "range": "10000-24000 Å",
          "state": "nodata",
          "reason": "IAG FTS solar atlas spans 4047-10650 A - no usable overlap with this band.",
          "established": false
        },
        {
          "instrument": "HARPS (direct solar)",
          "instrumentRole": "direct solar feed - ESO 1102.D-0954",
          "band": "near-UV",
          "range": "3000-3800 Å",
          "state": "nodata",
          "reason": "HARPS (direct solar) spans 3780-6910 A - no usable overlap with this band.",
          "established": false
        },
        {
          "instrument": "HARPS (direct solar)",
          "instrumentRole": "direct solar feed - ESO 1102.D-0954",
          "band": "VIS",
          "range": "3800-6910 Å",
          "state": "gap",
          "reason": "HARPS (direct solar) reaches 100% of this band but no Fe II product exists for it.",
          "established": false
        },
        {
          "instrument": "HARPS (direct solar)",
          "instrumentRole": "direct solar feed - ESO 1102.D-0954",
          "band": "red-optical",
          "range": "6910-10000 Å",
          "state": "nodata",
          "reason": "HARPS (direct solar) spans 3780-6910 A - no usable overlap with this band.",
          "established": false
        },
        {
          "instrument": "HARPS (direct solar)",
          "instrumentRole": "direct solar feed - ESO 1102.D-0954",
          "band": "NIR",
          "range": "10000-24000 Å",
          "state": "nodata",
          "reason": "HARPS (direct solar) spans 3780-6910 A - no usable overlap with this band.",
          "established": false
        },
        {
          "instrument": "CRIRES+ (Vesta)",
          "instrumentRole": "reflected solar - 18 IDPs",
          "band": "near-UV",
          "range": "3000-3800 Å",
          "state": "nodata",
          "reason": "CRIRES+ (Vesta) spans 9500-53000 A - no usable overlap with this band.",
          "established": false
        },
        {
          "instrument": "CRIRES+ (Vesta)",
          "instrumentRole": "reflected solar - 18 IDPs",
          "band": "VIS",
          "range": "3800-6910 Å",
          "state": "nodata",
          "reason": "CRIRES+ (Vesta) spans 9500-53000 A - no usable overlap with this band.",
          "established": false
        },
        {
          "instrument": "CRIRES+ (Vesta)",
          "instrumentRole": "reflected solar - 18 IDPs",
          "band": "red-optical",
          "range": "6910-10000 Å",
          "state": "gap",
          "reason": "CRIRES+ (Vesta) reaches 16% of this band but no Fe II product exists for it.",
          "established": false
        },
        {
          "instrument": "CRIRES+ (Vesta)",
          "instrumentRole": "reflected solar - 18 IDPs",
          "band": "NIR",
          "range": "10000-24000 Å",
          "state": "gap",
          "reason": "CRIRES+ (Vesta) reaches 100% of this band but no Fe II product exists for it.",
          "established": false
        }
      ],
      "ionizationBalance": {
        "source": "derived here from the Fe product matrix, like with like",
        "verdictArtifactCarriesIt": false,
        "note": "Each row differences the same band, atlas, and engine, so the only variable is the ionization stage. The published Fe I anchor of 7.466 is on the 3D-NLTE scale and is deliberately NOT used here — differencing it against these Fe II products would measure the scale, not the ionization.",
        "pairs": [
          {
            "band": "VIS",
            "engine": "1D-LTE",
            "handler": "ProfileFitHandler",
            "feI": 7.586,
            "feINLines": 148,
            "feII": 7.542,
            "feIINLines": 10,
            "balance": 0.044,
            "sameVintage": true,
            "vintage": "RYA-880 re-derivation (post-disposition)"
          },
          {
            "band": "VIS",
            "engine": "ENGINE-A",
            "handler": "ProfileFitHandler",
            "feI": 7.597,
            "feINLines": 105,
            "feII": 7.517,
            "feIINLines": 3,
            "balance": 0.08,
            "sameVintage": true,
            "vintage": "RYA-880 re-derivation (post-disposition)"
          },
          {
            "band": "VIS",
            "engine": "ENGINE-B",
            "handler": "SynthesisHandler",
            "feI": 7.515,
            "feINLines": 129,
            "feII": 7.486,
            "feIINLines": 9,
            "balance": 0.029,
            "sameVintage": true,
            "vintage": "RYA-880 re-derivation (post-disposition)"
          },
          {
            "band": "VIS",
            "engine": "ENGINE-B-NLTE",
            "handler": "SynthesisHandler",
            "feI": 7.572,
            "feINLines": 136,
            "feII": 7.47,
            "feIINLines": 8,
            "balance": 0.102,
            "sameVintage": true,
            "vintage": "RYA-783 matrix (pre-disposition, pre-847 gate)"
          },
          {
            "band": "red-optical",
            "engine": "1D-LTE",
            "handler": "ProfileFitHandler",
            "feI": 7.639,
            "feINLines": 101,
            "feII": 7.696,
            "feIINLines": 4,
            "balance": -0.057,
            "sameVintage": true,
            "vintage": "RYA-783 matrix (pre-disposition, pre-847 gate)"
          },
          {
            "band": "red-optical",
            "engine": "ENGINE-A",
            "handler": "ProfileFitHandler",
            "feI": 7.645,
            "feINLines": 44,
            "feII": 7.763,
            "feIINLines": 1,
            "balance": -0.118,
            "sameVintage": true,
            "vintage": "RYA-783 matrix (pre-disposition, pre-847 gate)"
          },
          {
            "band": "red-optical",
            "engine": "ENGINE-B",
            "handler": "SynthesisHandler",
            "feI": 7.509,
            "feINLines": 77,
            "feII": 7.523,
            "feIINLines": 3,
            "balance": -0.014,
            "sameVintage": true,
            "vintage": "RYA-783 matrix (pre-disposition, pre-847 gate)"
          },
          {
            "band": "red-optical",
            "engine": "ENGINE-B-NLTE",
            "handler": "SynthesisHandler",
            "feI": 7.549,
            "feINLines": 77,
            "feII": 7.461,
            "feIINLines": 2,
            "balance": 0.088,
            "sameVintage": true,
            "vintage": "RYA-783 matrix (pre-disposition, pre-847 gate)"
          }
        ]
      },
      "nistOffset": {
        "poolOffsetDex": 0.106,
        "verdict": "INCONCLUSIVE — the overlap cannot separate the two readings",
        "reasoning": "ours - DH is +0.020 with a 95% CI of [-0.070, +0.160], which covers BOTH the pure-lab prediction (~0) and the solar-fitted one (~+0.13). Ten lines spanning -0.360..+0.260 dex is not enough to choose. The full DH19 Table 6 (131 lines, VizieR J/ApJS/243/33) would settle it.",
        "referee": "Den Hartog et al. 2019, ApJS 243, 33 (BF x LIF lifetimes; pure lab)",
        "nOverlapLines": 10,
        "oursMinusDh": {
          "median": 0.02,
          "ci95": [
            -0.07,
            0.16
          ],
          "n": 10
        },
        "bandDependence": {
          "blue": -0.066,
          "red": 0.106,
          "swing": 0.172,
          "signFlips": true
        },
        "caveat": "the overlap does NOT contain the three Fe II arbiter lines, which are redward of DH19's 4584 A optical ceiling; this refs the pool SCALE, not those lines",
        "arbiterLines": [
          6147.734,
          6238.386,
          6247.557
        ],
        "arbiterNistAccuracyDex": {
          "6147.734": 0.301,
          "6238.386": 0.176,
          "6247.557": 0.176
        },
        "labGfVerdict": "NO arbiter line has a confirmed primary-lab gf. Their cited NIST accuracies are D/E (0.176-0.301 dex), worse than the ~0.1 dex floor the ticket anticipated and 4-7x the 0.041 the stored grade B would have published. They stay UNGRADED with the reason stated, and the stored grade B is a defect.",
        "denHartogCoverage": [
          [
            2250,
            3280
          ],
          [
            4173,
            4584
          ]
        ],
        "denHartogCoversArbiter": false,
        "poolScaleNote": "a coherent offset across the whole pool including its plain-VALD3 members is a SCALE difference, not independent errors; a gf too high gives an abundance too low, so it bears on RYA-407's ionization balance"
      },
      "lines": [
        {
          "wavelength": 5256.9319,
          "ep": 2.891,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.6299,
          "kept": true,
          "logGf": -4.182,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 5337.722,
          "ep": 3.2305,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 8.043,
          "kept": true,
          "logGf": -3.72,
          "gfSource": "2009A&A...",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 5991.3709,
          "ep": 3.1528,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.5859,
          "kept": false,
          "logGf": -3.54,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "ASTROPHYSICAL_GF",
          "problemAction": "exclude",
          "problemTickets": "877,852,161,844",
          "excludedReason": "REGISTRY-ASTROPHYSICAL_GF: exclude/active per data/registry/problem_children.csv [877,852,161,844] — carried, not dropped (RYA-711)",
          "exclusionLabel": "ASTROPHYSICAL_GF"
        },
        {
          "wavelength": 6084.1017,
          "ep": 3.1995,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.4805,
          "kept": true,
          "logGf": -3.78,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6147.7341,
          "ep": 3.8887,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.5156,
          "kept": true,
          "logGf": -2.827,
          "gfSource": "RU",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6149.2459,
          "ep": 3.8892,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.5684,
          "kept": true,
          "logGf": -2.724,
          "gfSource": "NIST ASD v5.11 grade B",
          "gfGrade": "NIST:B",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6238.3859,
          "ep": 3.8887,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.7266,
          "kept": true,
          "logGf": -2.6,
          "gfSource": "2009A&A...",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6247.557,
          "ep": 3.8916,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.4453,
          "kept": true,
          "logGf": -2.329,
          "gfSource": "NIST ASD v5.11 grade B",
          "gfGrade": "NIST:B",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6369.459,
          "ep": 2.891,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.3135,
          "kept": true,
          "logGf": -4.16,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6432.6757,
          "ep": 2.891,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.498,
          "kept": true,
          "logGf": -3.52,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6456.3796,
          "ep": 3.9034,
          "engine": "1D-LTE",
          "handler": "ProfileFitHandler",
          "abundance": 7.6211,
          "kept": true,
          "logGf": -2.1,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 5256.9319,
          "ep": 2.891,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": null,
          "kept": false,
          "logGf": -4.182,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": null,
          "nlteSource": "MPIA per-line delta_nlte (NOT SERVED)",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "ENGINE-A-NOT-SERVED: MPIA returns no usable delta_nlte for this line (absent, nan, or a placeholder zero). Reduced coverage, not a failed correction.",
          "exclusionLabel": "ENGINE-A-NOT-SERVED"
        },
        {
          "wavelength": 5337.722,
          "ep": 3.2305,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": null,
          "kept": false,
          "logGf": -3.72,
          "gfSource": "2009A&A...",
          "gfGrade": "ungraded",
          "nlteDeltaDex": null,
          "nlteSource": "MPIA per-line delta_nlte (NOT SERVED)",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "ENGINE-A-NOT-SERVED: MPIA returns no usable delta_nlte for this line (absent, nan, or a placeholder zero). Reduced coverage, not a failed correction.",
          "exclusionLabel": "ENGINE-A-NOT-SERVED"
        },
        {
          "wavelength": 6084.1017,
          "ep": 3.1995,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": null,
          "kept": false,
          "logGf": -3.78,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": null,
          "nlteSource": "MPIA per-line delta_nlte (NOT SERVED)",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "ENGINE-A-NOT-SERVED: MPIA returns no usable delta_nlte for this line (absent, nan, or a placeholder zero). Reduced coverage, not a failed correction.",
          "exclusionLabel": "ENGINE-A-NOT-SERVED"
        },
        {
          "wavelength": 6147.7341,
          "ep": 3.8887,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": 7.5166,
          "kept": true,
          "logGf": -2.827,
          "gfSource": "RU",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.001,
          "nlteSource": "Bergemann MPIA per-line delta_nlte (live query, solar node); PER-LINE additive correction",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6149.2459,
          "ep": 3.8892,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": null,
          "kept": false,
          "logGf": -2.724,
          "gfSource": "NIST ASD v5.11 grade B",
          "gfGrade": "NIST:B",
          "nlteDeltaDex": null,
          "nlteSource": "MPIA per-line delta_nlte (NOT SERVED)",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "ENGINE-A-NOT-SERVED: MPIA returns no usable delta_nlte for this line (absent, nan, or a placeholder zero). Reduced coverage, not a failed correction.",
          "exclusionLabel": "ENGINE-A-NOT-SERVED"
        },
        {
          "wavelength": 6238.3859,
          "ep": 3.8887,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": 7.7276,
          "kept": true,
          "logGf": -2.6,
          "gfSource": "2009A&A...",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.001,
          "nlteSource": "Bergemann MPIA per-line delta_nlte (live query, solar node); PER-LINE additive correction",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6247.557,
          "ep": 3.8916,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": 7.4463,
          "kept": true,
          "logGf": -2.329,
          "gfSource": "NIST ASD v5.11 grade B",
          "gfGrade": "NIST:B",
          "nlteDeltaDex": 0.001,
          "nlteSource": "Bergemann MPIA per-line delta_nlte (live query, solar node); PER-LINE additive correction",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6369.459,
          "ep": 2.891,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": null,
          "kept": false,
          "logGf": -4.16,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": null,
          "nlteSource": "MPIA per-line delta_nlte (NOT SERVED)",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "ENGINE-A-NOT-SERVED: MPIA returns no usable delta_nlte for this line (absent, nan, or a placeholder zero). Reduced coverage, not a failed correction.",
          "exclusionLabel": "ENGINE-A-NOT-SERVED"
        },
        {
          "wavelength": 6432.6757,
          "ep": 2.891,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": null,
          "kept": false,
          "logGf": -3.52,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": null,
          "nlteSource": "MPIA per-line delta_nlte (NOT SERVED)",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "ENGINE-A-NOT-SERVED: MPIA returns no usable delta_nlte for this line (absent, nan, or a placeholder zero). Reduced coverage, not a failed correction.",
          "exclusionLabel": "ENGINE-A-NOT-SERVED"
        },
        {
          "wavelength": 6456.3796,
          "ep": 3.9034,
          "engine": "ENGINE-A",
          "handler": "ProfileFitHandler",
          "abundance": null,
          "kept": false,
          "logGf": -2.1,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": null,
          "nlteSource": "MPIA per-line delta_nlte (NOT SERVED)",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "ENGINE-A-NOT-SERVED: MPIA returns no usable delta_nlte for this line (absent, nan, or a placeholder zero). Reduced coverage, not a failed correction.",
          "exclusionLabel": "ENGINE-A-NOT-SERVED"
        },
        {
          "wavelength": 5256.9319,
          "ep": 2.891,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.508,
          "kept": true,
          "logGf": -4.182,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 5337.722,
          "ep": 3.2305,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.553,
          "kept": true,
          "logGf": -3.72,
          "gfSource": "2009A&A...",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 5991.3709,
          "ep": 3.1528,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.457,
          "kept": false,
          "logGf": -3.54,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "ASTROPHYSICAL_GF",
          "problemAction": "exclude",
          "problemTickets": "877,852,161,844",
          "excludedReason": "REGISTRY-ASTROPHYSICAL_GF: exclude/active per data/registry/problem_children.csv [877,852,161,844] — carried, not dropped (RYA-711)",
          "exclusionLabel": "ASTROPHYSICAL_GF"
        },
        {
          "wavelength": 6084.1017,
          "ep": 3.1995,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.458,
          "kept": true,
          "logGf": -3.78,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6147.7341,
          "ep": 3.8887,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.469,
          "kept": true,
          "logGf": -2.827,
          "gfSource": "RU",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6149.2459,
          "ep": 3.8892,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.492,
          "kept": true,
          "logGf": -2.724,
          "gfSource": "NIST ASD v5.11 grade B",
          "gfGrade": "NIST:B",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6238.3859,
          "ep": 3.8887,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": null,
          "kept": false,
          "logGf": -2.6,
          "gfSource": "2009A&A...",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "CHI2-GATE: red_chi2 12.434 >= 10.0. The fit converged (A=7.361) but does not describe the observed flux well enough to carry an abundance. Measured and retained; excluded from the aggregate only.",
          "exclusionLabel": "CHI2-GATE"
        },
        {
          "wavelength": 6247.557,
          "ep": 3.8916,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.465,
          "kept": true,
          "logGf": -2.329,
          "gfSource": "NIST ASD v5.11 grade B",
          "gfGrade": "NIST:B",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6369.459,
          "ep": 2.891,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.486,
          "kept": true,
          "logGf": -4.16,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6432.6757,
          "ep": 2.891,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.419,
          "kept": true,
          "logGf": -3.52,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        },
        {
          "wavelength": 6456.3796,
          "ep": 3.9034,
          "engine": "ENGINE-B",
          "handler": "SynthesisHandler",
          "abundance": 7.517,
          "kept": true,
          "logGf": -2.1,
          "gfSource": "VALD3",
          "gfGrade": "ungraded",
          "nlteDeltaDex": 0.0,
          "nlteSource": "none — LTE, no departure applied",
          "problemClass": "",
          "problemAction": "",
          "problemTickets": "",
          "excludedReason": "",
          "exclusionLabel": ""
        }
      ],
      "dispositions": [
        {
          "scope": "5991.371 (VIS)",
          "problemClass": "ASTROPHYSICAL_GF",
          "treatment": "exclude",
          "severity": "high",
          "status": "active",
          "tickets": "877,852,161,844",
          "note": "RYA-877 disposition of the RYA-852 finding. The stored log gf -3.54 is Melendez & Barbuy 2009's, and MB09 Table 1 flags this multiplet S: \"When no laboratory measurement for any line of a multiplet was available ... the absolute gf-values of the multiplet were obtained from an INVERSE ANALYSIS based on the National Solar Observatory FTS solar flux spectrum\". Deriving a SOLAR Fe II abundance from a gf fitted to the solar spectrum is the RYA-161 circularity in its purest form, so the line cannot contribute to the value it was fitted to. || PROVENANCE: canonical_ref reads VALD3, not MB09 -- VALD3 carries MB09's number, so the stored LABEL does not name the origin; the values agree exactly (-3.54 = -3.54) and the EP matches (3.1528 vs MB09 3.1529), which is what identifies the source. || CLEAN REPLACEMENT SEARCHED FOR AND NOT FOUND, scoped to what was checked: Den Hartog 2019 is ruled out BY ITS STATED COVERAGE (2250-3280 A + 4173-4584 A; this line is at 5991 A). NIST ASD carries the line but grades it E -- 100%, 0.301 dex -- and NIST is a COMPILATION, not a primary lab measurement (RYA-760), so re-sourcing to it would swap a circular value for a 0.301 dex one, worse than the 0.170 generic ungraded term. || POSITIVE CONTROL on that absence (RYA-833): the same NIST query over 5000-6600 A returns 349 Fe II lines graded BETTER than D (B+ x120, C+ x201, ...), so the query can reveal a well-measured line -- the E grade is a property of THIS line, not of the search. || NOT the ionization arbiter: the three arbiters are 6147.734 / 6238.386 / 6247.557 and this is not one of them (RYA-852). Retire this row if a primary laboratory measurement for the a4G-z6F* transition is ever published."
        }
      ],
      "dispositionImpact": {
        "line": 5991.371,
        "products": {
          "1D-LTE": {
            "before": 7.5684,
            "after": 7.542,
            "delta": -0.0264,
            "statBefore": 0.0564,
            "statAfter": 0.0624,
            "nBefore": 11,
            "nAfter": 10,
            "lineOwnAbundance": 7.5859
          },
          "ENGINE-B": {
            "before": 7.4775,
            "after": 7.486,
            "delta": 0.0085,
            "statBefore": 0.0119,
            "statAfter": 0.0129,
            "nBefore": 10,
            "nAfter": 9,
            "lineOwnAbundance": 7.457
          }
        },
        "controlStatus": "RAN — the RYA-871 ep_eV refusal was cleared by a 6.5 s re-measure of the Fe II VIS EW table in this checkout; it was never a migration project",
        "controlMethod": "one tree, one commit; the ONLY difference between runs is the presence of the 5991.371 registry row. BEFORE saw 'registry: 0 of 11 registered', AFTER saw '1 of 11 registered (1 excluded)' — the discriminator, logged."
      },
      "lineAccounting": {
        "unionCount": 11,
        "byTreatment": {
          "1D-LTE": 11,
          "ENGINE-A": 10,
          "ENGINE-B": 11
        },
        "missing": [
          {
            "engine": "ENGINE-A",
            "wavelength": 5991.371
          }
        ],
        "detail": "Each treatment should carry a row for every measured line, kept or not. A line present in one treatment's table and absent from another's has been dropped rather than dispositioned, and the reason for its absence is not recorded anywhere in the artifact."
      },
      "staleInputs": [
        {
          "artifact": "data/products/solar/Fe_perline.csv (RYA-870)",
          "engine": "1D-LTE",
          "publishedLineCount": 10,
          "artifactLineCount": 11,
          "detail": "The per-line product counts 11 Fe II 1D-LTE lines into the pool; the published band product carries 10. Its band-product input defaults to data/results/rya877/, which predates the RYA-877 disposition; data/results/rya880/ supersedes it. This page reports the band product, so no published number is affected — but the downloadable per-line file is one generation behind."
        },
        {
          "artifact": "data/products/solar/Fe_perline.csv (RYA-870)",
          "engine": "ENGINE-B",
          "publishedLineCount": 9,
          "artifactLineCount": 10,
          "detail": "The per-line product counts 10 Fe II ENGINE-B lines into the pool; the published band product carries 9. Its band-product input defaults to data/results/rya877/, which predates the RYA-877 disposition; data/results/rya880/ supersedes it. This page reports the band product, so no published number is affected — but the downloadable per-line file is one generation behind."
        }
      ],
      "reproducibility": {
        "generator": "scripts/generate_solar_report.py + scripts/fe2_record.py",
        "version": "1.0.0",
        "sourceArtifact": "data/results/rya880/FeII_3800_6910_kpno_solar_atlas_PROFILEFIT_products.csv",
        "registry": "data/registry/problem_children.csv",
        "instrument": "NSO Kitt Peak solar flux atlas · 3800–6910 Å",
        "bandProductCommit": "acfa0fecebdcbf15633cee1eb727f372b9409153",
        "registryCommit": "8177e047dd4497344e01a280d925642e80e4cbf5",
        "scienceGit": "b6225a75a72b09a57b1b2dd4e521c86cf4a0e090",
        "generatedAt": "2026-08-23T05:49:07+00:00"
      },
      "downloadPath": "/assets/data/solar/FeII_perline.csv"
    },
    {
      "atomicNumber": 3,
      "symbol": "Li",
      "ion": "I",
      "name": "Lithium",
      "status": "curation-owed",
      "tier": "upper_limit",
      "method": "EW: Li I 6707 (single line, UPPER LIMIT)",
      "asplund": 1.05,
      "measurementNote": "",
      "primaryValue": {
        "value": 0.727,
        "sigmaTotal": null,
        "lineCount": 1.0
      },
      "delta": -0.323
    },
    {
      "atomicNumber": 6,
      "symbol": "C",
      "ion": "I",
      "name": "Carbon",
      "status": "pass",
      "tier": "gold",
      "method": "synthesis: CH G-band + C I 5052 + C2 Swan (C I 5380 BAD_FIT-excluded)",
      "asplund": 8.46,
      "measurementNote": "",
      "primaryValue": {
        "value": 8.491,
        "sigmaTotal": 0.054,
        "lineCount": 5.0
      },
      "delta": 0.031
    },
    {
      "atomicNumber": 7,
      "symbol": "N",
      "ion": "I",
      "name": "Nitrogen",
      "status": "curation-owed",
      "tier": "owed",
      "method": "kittpeak: N I red 7468/8216/8683 — NLTE-wired (N_Amarsi2020_PySME, RYA-369/526)",
      "asplund": 7.83,
      "measurementNote": "",
      "primaryValue": {
        "value": 8.188,
        "sigmaTotal": 0.033,
        "lineCount": 3.0
      },
      "delta": 0.358
    },
    {
      "atomicNumber": 8,
      "symbol": "O",
      "ion": "I",
      "name": "Oxygen",
      "status": "pass",
      "tier": "gold",
      "method": "synthesis: O I 777 (primary) + [O I] 6300 (cross-check)",
      "asplund": 8.69,
      "measurementNote": "",
      "primaryValue": {
        "value": 8.735,
        "sigmaTotal": 0.01,
        "lineCount": 3.0
      },
      "delta": 0.045
    },
    {
      "atomicNumber": 11,
      "symbol": "Na",
      "ion": "I",
      "name": "Sodium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 6.24,
      "measurementNote": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank"
    },
    {
      "atomicNumber": 12,
      "symbol": "Mg",
      "ion": "I",
      "name": "Magnesium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW present; no independent-gf line survives the graded cull",
      "asplund": 7.55,
      "measurementNote": "EW present; no independent-gf line survives the graded cull"
    },
    {
      "atomicNumber": 13,
      "symbol": "Al",
      "ion": "I",
      "name": "Aluminium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW: 1 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 6.43,
      "measurementNote": "EW: 1 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "appendixPath": "/systems/sol/elements/al/"
    },
    {
      "atomicNumber": 14,
      "symbol": "Si",
      "ion": "I",
      "name": "Silicon",
      "status": "curation-owed",
      "tier": "gf_floor",
      "method": "EW: 7 line(s)",
      "asplund": 7.51,
      "measurementNote": "",
      "primaryValue": {
        "value": 7.888,
        "sigmaTotal": null,
        "lineCount": 7.0
      },
      "delta": 0.378
    },
    {
      "atomicNumber": 15,
      "symbol": "P",
      "ion": "I",
      "name": "Phosphorus",
      "status": "curation-owed",
      "tier": "owed",
      "method": "kittpeak: P I 10581/10596 near-IR multiplet",
      "asplund": 5.41,
      "measurementNote": "",
      "primaryValue": {
        "value": 6.61,
        "sigmaTotal": null,
        "lineCount": 2.0
      },
      "delta": 1.2
    },
    {
      "atomicNumber": 16,
      "symbol": "S",
      "ion": "I",
      "name": "Sulfur",
      "status": "curation-owed",
      "tier": "owed",
      "method": "synthesis: S I 6743.53 + 6757.15 windows, gf=Costa Silva+2020 (A&A 634 A136) Table1, NLTE Amarsi 2025 (RYA-492)",
      "asplund": 7.12,
      "measurementNote": "",
      "primaryValue": {
        "value": 7.486,
        "sigmaTotal": 0.045,
        "lineCount": 2.0
      },
      "delta": 0.366
    },
    {
      "atomicNumber": 19,
      "symbol": "K",
      "ion": "I",
      "name": "Potassium",
      "status": "pass",
      "tier": "gold",
      "method": "kittpeak: K I 7699 (clean; 7665 in the telluric O2 A-band) — NLTE-wired",
      "asplund": 5.07,
      "measurementNote": "",
      "primaryValue": {
        "value": 5.099,
        "sigmaTotal": null,
        "lineCount": 1.0
      },
      "delta": 0.029
    },
    {
      "atomicNumber": 20,
      "symbol": "Ca",
      "ion": "I",
      "name": "Calcium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 6.3,
      "measurementNote": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank"
    },
    {
      "atomicNumber": 21,
      "symbol": "Sc",
      "ion": "II",
      "name": "Scandium",
      "status": "curation-owed",
      "tier": "gold",
      "method": "kittpeak: Sc II 4246 (blue-edge, HFS)",
      "asplund": 3.14,
      "measurementNote": "",
      "primaryValue": {
        "value": 3.203,
        "sigmaTotal": null,
        "lineCount": 1.0
      },
      "delta": 0.063
    },
    {
      "atomicNumber": 22,
      "symbol": "Ti",
      "ion": "I",
      "name": "Titanium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW: 10 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 4.97,
      "measurementNote": "EW: 10 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank"
    },
    {
      "atomicNumber": 23,
      "symbol": "V",
      "ion": "I",
      "name": "Vanadium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "HFS synthesis LTE: V I 6 lines — NLTE-VOID (no model atom)",
      "asplund": 3.9,
      "measurementNote": "",
      "primaryValue": {
        "value": 3.917,
        "sigmaTotal": 0.029,
        "lineCount": 6.0
      },
      "delta": 0.017
    },
    {
      "atomicNumber": 24,
      "symbol": "Cr",
      "ion": "I",
      "name": "Chromium",
      "status": "curation-owed",
      "tier": "gf_floor",
      "method": "EW: 7 line(s)",
      "asplund": 5.62,
      "measurementNote": "",
      "primaryValue": {
        "value": 6.022,
        "sigmaTotal": null,
        "lineCount": 7.0
      },
      "delta": 0.402
    },
    {
      "atomicNumber": 25,
      "symbol": "Mn",
      "ion": "I",
      "name": "Manganese",
      "status": "pass",
      "tier": "gold",
      "method": "HFS synthesis: Mn I 3 lines (6013/6016/6021, Den Hartog e6S→z6P), gf=Den Hartog+2011 (MED), NLTE live Amarsi HFS-resolved",
      "asplund": 5.42,
      "measurementNote": "",
      "primaryValue": {
        "value": 5.466,
        "sigmaTotal": 0.154,
        "lineCount": 3.0
      },
      "delta": 0.046
    },
    {
      "atomicNumber": 27,
      "symbol": "Co",
      "ion": "I",
      "name": "Cobalt",
      "status": "pass",
      "tier": "owed",
      "method": "synthesis: Co I red HFS-resolved flux fit (5 lines, HARPS; blends modelled) + per-line Gerber 1D-NLTE (RYA-534 deck)",
      "asplund": 4.94,
      "measurementNote": "",
      "primaryValue": {
        "value": 4.96,
        "sigmaTotal": 0.063,
        "lineCount": 5.0
      },
      "delta": 0.02
    },
    {
      "atomicNumber": 28,
      "symbol": "Ni",
      "ion": "I",
      "name": "Nickel",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 6.2,
      "measurementNote": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank"
    },
    {
      "atomicNumber": 29,
      "symbol": "Cu",
      "ion": "I",
      "name": "Copper",
      "status": "curation-owed",
      "tier": "owed",
      "method": "HFS synthesis: Cu I 5 lines (5105/5218/5220/5700/5782), gf=Kock&Richter, NLTE vendored RYA-402 b-factor (live .grd offline)",
      "asplund": 4.18,
      "measurementNote": "",
      "primaryValue": {
        "value": 4.345,
        "sigmaTotal": 0.139,
        "lineCount": 5.0
      },
      "delta": 0.165
    },
    {
      "atomicNumber": 38,
      "symbol": "Sr",
      "ion": "II",
      "name": "Strontium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW: 1 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 2.83,
      "measurementNote": "EW: 1 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank"
    },
    {
      "atomicNumber": 39,
      "symbol": "Y",
      "ion": "II",
      "name": "Yttrium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW present; no independent-gf line survives the graded cull",
      "asplund": 2.21,
      "measurementNote": "EW present; no independent-gf line survives the graded cull"
    },
    {
      "atomicNumber": 40,
      "symbol": "Zr",
      "ion": "II",
      "name": "Zirconium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW present; no independent-gf line survives the graded cull",
      "asplund": 2.59,
      "measurementNote": "EW present; no independent-gf line survives the graded cull"
    },
    {
      "atomicNumber": 56,
      "symbol": "Ba",
      "ion": "II",
      "name": "Barium",
      "status": "pass",
      "tier": "owed",
      "method": "synthesis: Ba II 5853.668 in-window blend fit (Turbospectrum, HFS + full VALD3 in-window block, chi2 profile fit) + Engine-A Korotin2015 1D-NLTE delta",
      "asplund": 2.27,
      "measurementNote": "",
      "primaryValue": {
        "value": 2.237,
        "sigmaTotal": 0.016,
        "lineCount": 1.0
      },
      "delta": -0.033
    },
    {
      "atomicNumber": 63,
      "symbol": "Eu",
      "ion": "II",
      "name": "Europium",
      "status": "curation-owed",
      "tier": "owed",
      "method": "EW present; no independent-gf line survives the graded cull",
      "asplund": 0.52,
      "measurementNote": "EW present; no independent-gf line survives the graded cull"
    }
  ],
  "alEvidence": {
    "products": [
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "SYNTH",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 4.198,
        "sigma": 0.1974533869043527,
        "sigmaStat": 0.01,
        "sigmaSys": 0.1972,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 6.47,
        "sigma": 0.18065574997768546,
        "sigmaStat": 0.0517,
        "sigmaSys": 0.1731,
        "lineCount": 6,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-A",
        "telluric": "not declared — holding absent",
        "value": 6.38,
        "sigma": 0.17709424044841213,
        "sigmaStat": 0.0374,
        "sigmaSys": 0.1731,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-B",
        "telluric": "not declared — holding absent",
        "value": 6.387,
        "sigma": 0.17493716014615077,
        "sigmaStat": 0.0285,
        "sigmaSys": 0.1726,
        "lineCount": 6,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 6.531,
        "sigma": 0.20803579019005358,
        "sigmaStat": 0.1192,
        "sigmaSys": 0.1705,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-A",
        "telluric": "not declared — holding absent",
        "value": 6.351,
        "sigma": 0.17095031441913175,
        "sigmaStat": 0.0124,
        "sigmaSys": 0.1705,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-B",
        "telluric": "not declared — holding absent",
        "value": 6.271,
        "sigma": 0.1711959111661257,
        "sigmaStat": 0.0202,
        "sigmaSys": 0.17,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      }
    ],
    "coverageGrid": [
      {
        "instrument": "kpno_solar_atlas",
        "band": "near-UV",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "kpno_solar_atlas",
        "band": "red-optical",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "kpno_solar_atlas",
        "band": "VIS",
        "state": "present",
        "range": ""
      }
    ],
    "bands": [
      "near-UV",
      "red-optical",
      "VIS"
    ],
    "reference": {
      "name": "Asplund et al. 2021",
      "value": 6.43,
      "sigma": 0.04
    }
  },
  "feEvidence": {
    "products": [
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "SYNTH",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 7.492,
        "sigma": 0.22167446853438041,
        "sigmaStat": 0.1391,
        "sigmaSys": 0.1726,
        "lineCount": 31,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "SYNTH",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 7.498,
        "sigma": 0.20823892527575147,
        "sigmaStat": 0.0669,
        "sigmaSys": 0.1972,
        "lineCount": 39,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 7.586,
        "sigma": 0.1724861153832389,
        "sigmaStat": 0.0261,
        "sigmaSys": 0.1705,
        "lineCount": 148,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-A",
        "telluric": "not declared — holding absent",
        "value": 7.597,
        "sigma": 0.1727676474343504,
        "sigmaStat": 0.0279,
        "sigmaSys": 0.1705,
        "lineCount": 105,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-B-NLTE",
        "telluric": "not declared — holding absent",
        "value": 7.57,
        "sigma": 0.17123156835116593,
        "sigmaStat": 0.0205,
        "sigmaSys": 0.17,
        "lineCount": 131,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 7.586,
        "sigma": 0.1724861153832389,
        "sigmaStat": 0.0261,
        "sigmaSys": 0.1705,
        "lineCount": 148,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-A",
        "telluric": "not declared — holding absent",
        "value": 7.597,
        "sigma": 0.1727676474343504,
        "sigmaStat": 0.0279,
        "sigmaSys": 0.1705,
        "lineCount": 105,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-B",
        "telluric": "not declared — holding absent",
        "value": 7.515,
        "sigma": 0.1710920512472745,
        "sigmaStat": 0.0193,
        "sigmaSys": 0.17,
        "lineCount": 129,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 7.586,
        "sigma": 0.1724861153832389,
        "sigmaStat": 0.0261,
        "sigmaSys": 0.1705,
        "lineCount": 148,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-A",
        "telluric": "not declared — holding absent",
        "value": 7.597,
        "sigma": 0.1727676474343504,
        "sigmaStat": 0.0279,
        "sigmaSys": 0.1705,
        "lineCount": 105,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": null,
        "engine": "PROFILEFIT",
        "method": "ENGINE-B",
        "telluric": "not declared — holding absent",
        "value": 7.515,
        "sigma": 0.1710920512472745,
        "sigmaStat": 0.0193,
        "sigmaSys": 0.17,
        "lineCount": 129,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": null,
        "engine": "SYNTH",
        "method": "1D-LTE",
        "telluric": "not declared — holding absent",
        "value": 7.352,
        "sigma": 0.17403462299209316,
        "sigmaStat": 0.0223,
        "sigmaSys": 0.1726,
        "lineCount": 8,
        "role": "RYA-935 evidence"
      }
    ],
    "coverageGrid": [
      {
        "instrument": "kpno_solar_atlas",
        "band": "NIR",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "kpno_solar_atlas",
        "band": "near-UV",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "kpno_solar_atlas",
        "band": "VIS",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "crires_plus",
        "band": "NIR",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "crires_plus",
        "band": "near-UV",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "crires_plus",
        "band": "VIS",
        "state": "gap",
        "range": ""
      }
    ]
  },
  "reproducibility": {
    "generator": "scripts/generate_solar_report.py",
    "version": "1.0.0",
    "sourceArtifact": "data/products/solar/Fe_perline.csv",
    "instrument": "Kitt Peak solar atlas + Solar gold v5",
    "gitCommit": "b6225a75a72b09a57b1b2dd4e521c86cf4a0e090",
    "productCommit": "4e3dabb5ba139c89ca0b5f5538afb64525ab8fae",
    "goldVersion": "Fe_I=v5",
    "generatedAt": "2026-08-18T21:08:52+00:00"
  }
};
