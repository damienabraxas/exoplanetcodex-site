window.SOLAR_REPORT = {
  "mode": "generated",
  "target": "Sun",
  "observingCoverage": [
    {
      "band": "Visible",
      "range": "3780–6910 Å",
      "instrument": "HARPS · ESO 3.6 m",
      "role": "Direct sunlight",
      "status": "in use",
      "detail": "10 S1D exposures · R ≈ 115,000 · ESO 1102.D-0954(A) · telluric-corrected with molecfit"
    },
    {
      "band": "Near-UV to near-IR",
      "range": "3000–13000 Å",
      "instrument": "Kitt Peak solar atlas (NSO FTS)",
      "role": "Ground-based solar flux atlas",
      "status": "in use",
      "detail": "Two independent telluric corrections, each its own product: our molecfit fit and Kurucz (2005)"
    },
    {
      "band": "Visible to near-IR",
      "range": "from 4047 Å",
      "instrument": "IAG solar flux atlas",
      "role": "Second, independent solar atlas",
      "status": "in use",
      "detail": "Published already telluric-corrected (Reiners et al. 2016; Baker et al. 2020); also sets the continuum uncertainty"
    },
    {
      "band": "Y / J / H / K",
      "range": "0.98–2.48 µm",
      "instrument": "CRIRES+ · Vesta",
      "role": "Sunlight reflected off the asteroid Vesta",
      "status": "in use",
      "detail": "Telluric-corrected with molecfit per night (J, H, K); Y from the Elgueta et al. (2026) reduction"
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
    "amarsi_grevesse2026": {
      "label": "Amarsi & Grevesse (2026), Solar chemical composition",
      "url": "https://arxiv.org/abs/2608.23155",
      "role": "Updated solar abundance reference"
    },
    "baker2020": {
      "label": "Baker, Blake & Reiners (2020), The IAG Solar Flux Atlas: Telluric Correction",
      "url": "https://doi.org/10.3847/1538-4365/ab6a1c",
      "role": "Telluric-corrected IAG atlas"
    },
    "kurucz2005_irradiance": {
      "label": "Kurucz (2005), Solar flux atlas with telluric lines removed",
      "url": "http://kurucz.harvard.edu/sun/irradiance2005/",
      "role": "Second telluric correction of the Kitt Peak atlas"
    },
    "smette2015": {
      "label": "Smette et al. (2015), Molecfit: a general tool for telluric absorption correction",
      "url": "https://doi.org/10.1051/0004-6361/201423932",
      "role": "Telluric correction for HARPS, Kitt Peak and CRIRES+"
    },
    "elgueta2026": {
      "label": "Elgueta et al. (2026), Gaia FGK Benchmark Stars: Selecting Infrared Lines",
      "url": "https://doi.org/10.1051/0004-6361/202659148",
      "role": "CRIRES+ Vesta solar spectrum (Y band) and infrared line selection"
    }
  },
  "pageReferenceKeys": [
    "asplund2021",
    "amarsi_grevesse2026",
    "lodders2025",
    "reiners2016",
    "baker2020",
    "kurucz2005_irradiance",
    "smette2015",
    "elgueta2026"
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
      "status": "Published",
      "appendixPath": "/systems/sol/elements/fe/",
      "referenceKeys": [
        "asplund2021",
        "lodders2025",
        "scott2015",
        "bergemann2012"
      ],
      "primary": {
        "value": 7.4771,
        "sigmaStat": 0.0202,
        "sigmaSys": 0.0475,
        "sigmaTotal": 0.051617,
        "lineCount": 21,
        "sigmaBasis": "Fe.json v1.530 — solar_harps_molecfit_corrected, Reference Grade, Amarsi 3D-NLTE (RYA-850 primary)"
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
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "harps",
          "holding": "solar_harps_molecfit_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "1D-LTE",
          "display": "Synth · 1D-LTE",
          "A": 7.553,
          "sigma_stat": 0.1244,
          "sigma_syst": 0.0175,
          "n_lines": 5,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.12438 dex at n_lines=5",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|harps|solar_harps_molecfit_corrected|DEEPGRADED|DEEPGRADED|SYNTH|1D-LTE|our-deep-graded",
              "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.12437748992482511,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 5,
                  "n_components": 5,
                  "raw_sigma": 0.2781165223427042,
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03214661093912657,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.2,
                    0.2,
                    0.2,
                    0.2,
                    0.2
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.008735999999999997,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 5 lines; difference of aggregates -0.0300/km/s",
                  "signed_response_dex": -0.008735999999999997,
                  "delta_plus_dex": -0.008735999999999997,
                  "delta_minus_dex": 0.008735999999999997,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.029999999999999992,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.0015,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_q97_minus_q80": 0.003,
                  "paired_median_iag_minus_synthesis": 0.0,
                  "n_paired": 5
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.054,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.054,
                  "n_paired": 5,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.019,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.019,
                  "n_paired": 5,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -14.000000000000234,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -4.000000000000448,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -2.9999999999992255,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -11.999999999999567,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.93494,
                    1.00293,
                    1.00899,
                    1.01838,
                    1.03488
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.015469759999999973,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0010334045948715718,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                7.631769599999995e-05,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                2.25e-06,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0029159999999999998,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000361,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.14092101436929674,
            "sigma_measured_partial": 0.14092101436929674
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1409210143692967,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6908_harps_solar_harps_molecfit_corrected_SYNTH_DEEPGRADED_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6908_harps_solar_harps_molecfit_corrected_SYNTH_DEEPGRADED_products.csv",
            "sha256": "57d3cc4d295d069fc9e9042a6137ab9448369eb6efc3abe2fd36029dae112fa2",
            "artifact_mtime": "2026-10-18T21:52:53Z",
            "ingested_at": "2026-10-18T21:53:56Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "harps",
          "holding": "solar_harps_molecfit_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "ENGINE-A",
          "display": "Synth · 1D-NLTE · Amarsi",
          "A": 7.613,
          "sigma_stat": 0.0936,
          "sigma_syst": 0.0175,
          "n_lines": 4,
          "n_excluded": 1,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.09364 dex at n_lines=4",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|harps|solar_harps_molecfit_corrected|DEEPGRADED|DEEPGRADED|SYNTH|ENGINE-A|our-deep-graded",
              "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.09363826557302268,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 4,
                  "n_components": 4,
                  "raw_sigma": 0.18727653114604537,
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03594100365306268,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.25,
                    0.25,
                    0.25,
                    0.25
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.012375999999999998,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 4 lines; difference of aggregates -0.0250/km/s",
                  "signed_response_dex": -0.012375999999999998,
                  "delta_plus_dex": -0.012375999999999998,
                  "delta_minus_dex": 0.012375999999999998,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.04249999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.00806225774829855,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_q97_minus_q80": 0.016,
                  "paired_median_iag_minus_synthesis": -0.001,
                  "n_paired": 4
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.037,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_dex": 0.037,
                  "n_paired": 4,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.023,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_dex": 0.023,
                  "n_paired": 4,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -14.000000000000234,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -4.000000000000448,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -11.999999999999567,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "MEASURED",
                "sigma_dex": 0.03,
                "source": "Asplund+2021 Sect. 2.1: half the non-LTE abundance correction, minimum 0.03 dex -- the correction measured on this pool (median 1D-NLTE delta of the accepted lines)",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "median_nlte_correction_dex": -0.00709886363636365,
                  "n_lines": 4,
                  "floor_dex": 0.03
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.93494,
                    1.00293,
                    1.00899,
                    1.01838
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.008768124779523925,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0012917557435894649,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00015316537599999996,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                6.5e-05,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0013689999999999998,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000529,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0009,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "nlte",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.11435053956634132,
            "sigma_measured_partial": 0.11435053956634132
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1143505395663413,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6908_harps_solar_harps_molecfit_corrected_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6908_harps_solar_harps_molecfit_corrected_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "sha256": "65e63d5ea270d7d6f2e706e69ac361ff22d6529970871e9cb4a24fc91e9ecdf0",
            "artifact_mtime": "2026-10-18T21:52:56Z",
            "ingested_at": "2026-10-18T21:53:56Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "harps",
          "holding": "solar_harps_molecfit_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "synth-1D-LTE-gerber",
          "display": "Synth · 1D-LTE · Gerber",
          "A": 7.581,
          "sigma_stat": 0.1283,
          "sigma_syst": 0.0175,
          "n_lines": 5,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.12830 dex at n_lines=5",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|harps|solar_harps_molecfit_corrected|DEEPGRADED|DEEPGRADED|SYNTH|synth-1D-LTE-gerber|our-deep-graded",
              "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.1282994154312482,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 5,
                  "n_components": 5,
                  "raw_sigma": 0.2868862143777565,
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03214661093912657,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.2,
                    0.2,
                    0.2,
                    0.2,
                    0.2
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.014559999999999995,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 5 lines; difference of aggregates -0.0550/km/s",
                  "signed_response_dex": -0.014559999999999995,
                  "delta_plus_dex": -0.014559999999999995,
                  "delta_minus_dex": 0.014559999999999995,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.04999999999999998,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.0045,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_q97_minus_q80": 0.009,
                  "paired_median_iag_minus_synthesis": 0.0,
                  "n_paired": 5
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.083,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.083,
                  "n_paired": 5,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.0,
                  "n_paired": 5,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": 1.000000000000334,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -10.999999999999233,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": 2.000000000000668,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -1.9999999999997797,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -6.000000000000227,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.93494,
                    1.00293,
                    1.00899,
                    1.01838,
                    1.03488
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.01646074000000001,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0010334045948715718,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00021199359999999985,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                2.0249999999999998e-05,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.006889000000000001,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.156892919517968,
            "sigma_measured_partial": 0.156892919517968
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.156892919517968,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6908_harps_solar_harps_molecfit_corrected_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6908_harps_solar_harps_molecfit_corrected_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "sha256": "bcf7a85af75908ac82aaba5a287f68486d6c03c5dfc45fbeec49fc68de90c7d8",
            "artifact_mtime": "2026-10-19T11:53:40Z",
            "ingested_at": "2026-10-19T11:55:14Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "iag_fts_solar_atlas",
          "holding": "solar_iag_reiners2016",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "1D-LTE",
          "display": "Synth · 1D-LTE",
          "A": 7.567,
          "sigma_stat": 0.01,
          "sigma_syst": 0.0128,
          "n_lines": 1,
          "n_excluded": 0,
          "dominant_term": "gf scale (cited NIST class)",
          "stat_basis": "quantiser-floor 0.01 dex (RYA-771) — UNMEASURED: line-to-line scatter at n_lines=1; the floor STANDS IN for a scatter that was never determined, it is not a measurement of one",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|iag_fts_solar_atlas|solar_iag_reiners2016|DEEPGRADED|DEEPGRADED|SYNTH|1D-LTE|our-deep-graded",
              "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.0262211212733362,
                "source": "Asplund+2021 Sect. 2.1: one line -> statistical error from the goodness of the profile fit; chi2-curvature sigma of this line, rescaled to red_chi2 = 1",
                "evidence": {
                  "method": "profile_likelihood",
                  "likelihood": "synthesis chi2 over the fit window, curvature at the best abundance",
                  "correlation_treatment": "red_chi2 rescaling absorbs pixel correlation and model inadequacy; the worse-constrained side is taken",
                  "n_pixels": 1575
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.07188200730612536,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073"
                  ],
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "line_sigma_dex": [
                    0.07188200730612536
                  ],
                  "weights": [
                    1.0
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.13686399999999996,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 1 lines; difference of aggregates -0.4700/km/s",
                  "signed_response_dex": -0.13686399999999996,
                  "delta_plus_dex": -0.13686399999999996,
                  "delta_minus_dex": 0.13686399999999996,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.46999999999999986,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.011,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_q97_minus_q80": -0.022,
                  "paired_median_iag_minus_synthesis": 0.0,
                  "n_paired": 1
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.004,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_dex": 0.004,
                  "n_paired": 1,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.022,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_dex": 0.022,
                  "n_paired": 1,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -12.9999999999999,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    1.00137
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.0006875472008310042,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0051670229743578594,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.018731754495999987,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00012099999999999999,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.6e-05,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00048399999999999995,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.15876814753340435,
            "sigma_measured_partial": 0.15876814753340435
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1587681475334043,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_5000_iag_fts_solar_atlas_solar_iag_reiners2016_SYNTH_DEEPGRADED_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_5000_iag_fts_solar_atlas_solar_iag_reiners2016_SYNTH_DEEPGRADED_products.csv",
            "sha256": "0b607535754b67be9b07a13a27c47fa8d553e1eb12f293a529ec714b39dffa68",
            "artifact_mtime": "2026-10-18T21:53:25Z",
            "ingested_at": "2026-10-18T21:53:57Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "iag_fts_solar_atlas",
          "holding": "solar_iag_reiners2016",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "ENGINE-A",
          "display": "Synth · 1D-NLTE · Amarsi",
          "A": 7.55,
          "sigma_stat": 0.01,
          "sigma_syst": 0.0128,
          "n_lines": 1,
          "n_excluded": 0,
          "dominant_term": "gf scale (cited NIST class)",
          "stat_basis": "quantiser-floor 0.01 dex (RYA-771) — UNMEASURED: line-to-line scatter at n_lines=1; the floor STANDS IN for a scatter that was never determined, it is not a measurement of one",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|iag_fts_solar_atlas|solar_iag_reiners2016|DEEPGRADED|DEEPGRADED|SYNTH|ENGINE-A|our-deep-graded",
              "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.0262211212733362,
                "source": "Asplund+2021 Sect. 2.1: one line -> statistical error from the goodness of the profile fit; chi2-curvature sigma of this line, rescaled to red_chi2 = 1",
                "evidence": {
                  "method": "profile_likelihood",
                  "likelihood": "synthesis chi2 over the fit window, curvature at the best abundance",
                  "correlation_treatment": "red_chi2 rescaling absorbs pixel correlation and model inadequacy; the worse-constrained side is taken",
                  "n_pixels": 1575
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.07188200730612536,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073"
                  ],
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "line_sigma_dex": [
                    0.07188200730612536
                  ],
                  "weights": [
                    1.0
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.13686399999999996,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 1 lines; difference of aggregates -0.4700/km/s",
                  "signed_response_dex": -0.13686399999999996,
                  "delta_plus_dex": -0.13686399999999996,
                  "delta_minus_dex": 0.13686399999999996,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.46999999999999986,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.011,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_q97_minus_q80": -0.022,
                  "paired_median_iag_minus_synthesis": 0.0,
                  "n_paired": 1
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.004,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_dex": 0.004,
                  "n_paired": 1,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.022,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_dex": 0.022,
                  "n_paired": 1,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -12.9999999999999,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "MEASURED",
                "sigma_dex": 0.03,
                "source": "Asplund+2021 Sect. 2.1: half the non-LTE abundance correction, minimum 0.03 dex -- the correction measured on this pool (median 1D-NLTE delta of the accepted lines)",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "median_nlte_correction_dex": -0.0166145454545454,
                  "n_lines": 1,
                  "floor_dex": 0.03
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    1.00137
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.0006875472008310042,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0051670229743578594,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.018731754495999987,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00012099999999999999,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.6e-05,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00048399999999999995,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0009,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "nlte",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.16157761191201228,
            "sigma_measured_partial": 0.16157761191201228
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1615776119120122,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_5000_iag_fts_solar_atlas_solar_iag_reiners2016_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_5000_iag_fts_solar_atlas_solar_iag_reiners2016_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "sha256": "dbc2077ad3f78f9d079dccf33a7cf6301b49a0b2e81761a1268f425282cc745d",
            "artifact_mtime": "2026-10-18T21:53:25Z",
            "ingested_at": "2026-10-18T21:53:57Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "iag_fts_solar_atlas",
          "holding": "solar_iag_reiners2016",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "synth-1D-LTE-gerber",
          "display": "Synth · 1D-LTE · Gerber",
          "A": 7.587,
          "sigma_stat": 0.01,
          "sigma_syst": 0.0128,
          "n_lines": 1,
          "n_excluded": 0,
          "dominant_term": "gf scale (cited NIST class)",
          "stat_basis": "quantiser-floor 0.01 dex (RYA-771) — UNMEASURED: line-to-line scatter at n_lines=1; the floor STANDS IN for a scatter that was never determined, it is not a measurement of one",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|iag_fts_solar_atlas|solar_iag_reiners2016|DEEPGRADED|DEEPGRADED|SYNTH|synth-1D-LTE-gerber|our-deep-graded",
              "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.0259992252583023,
                "source": "Asplund+2021 Sect. 2.1: one line -> statistical error from the goodness of the profile fit; chi2-curvature sigma of this line, rescaled to red_chi2 = 1",
                "evidence": {
                  "method": "profile_likelihood",
                  "likelihood": "synthesis chi2 over the fit window, curvature at the best abundance",
                  "correlation_treatment": "red_chi2 rescaling absorbs pixel correlation and model inadequacy; the worse-constrained side is taken",
                  "n_pixels": 1575
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.07188200730612536,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073"
                  ],
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "line_sigma_dex": [
                    0.07188200730612536
                  ],
                  "weights": [
                    1.0
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.14268799999999998,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 1 lines; difference of aggregates -0.4900/km/s",
                  "signed_response_dex": -0.14268799999999998,
                  "delta_plus_dex": -0.14268799999999998,
                  "delta_minus_dex": 0.14268799999999998,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.4899999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.0055,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_q97_minus_q80": -0.011,
                  "paired_median_iag_minus_synthesis": 0.0,
                  "n_paired": 1
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.001,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_dex": -0.001,
                  "n_paired": 1,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.002,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "paired_median_dex": 0.002,
                  "n_paired": 1,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "2098bc6e4f6f88ec394bf6bd4c59c0a36a9a1e9915b3af7479364dfce721a93b",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -12.000000000000455,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    1.00137
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.0006759597140319443,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0051670229743578594,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.020359865343999996,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                3.0249999999999997e-05,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1e-06,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                4e-06,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.16198178302633232,
            "sigma_measured_partial": 0.16198178302633232
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1619817830263323,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_5000_iag_fts_solar_atlas_solar_iag_reiners2016_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_5000_iag_fts_solar_atlas_solar_iag_reiners2016_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "sha256": "d1637b42102f14e801991f7b3de9c31d12461457a9692860c827fbb65401a980",
            "artifact_mtime": "2026-10-19T11:54:25Z",
            "ingested_at": "2026-10-19T11:55:16Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "iag_fts_solar_atlas",
          "holding": "solar_iag",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "1D-LTE",
          "display": "Synth · 1D-LTE",
          "A": 7.48,
          "sigma_stat": 0.1197,
          "sigma_syst": 0.0184,
          "n_lines": 4,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.11973 dex at n_lines=4",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|iag_fts_solar_atlas|solar_iag|DEEPGRADED|DEEPGRADED|SYNTH|1D-LTE|our-deep-graded",
              "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.11973060037712441,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 4,
                  "n_components": 4,
                  "raw_sigma": 0.23946120075424882,
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03594100365306268,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.25,
                    0.25,
                    0.25,
                    0.25
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.011647999999999997,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 4 lines; difference of aggregates -0.0600/km/s",
                  "signed_response_dex": -0.011647999999999997,
                  "delta_plus_dex": -0.011647999999999997,
                  "delta_minus_dex": 0.011647999999999997,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.03999999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.02787584079449443,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "paired_median_q97_minus_q80": 0.0315,
                  "paired_median_iag_minus_synthesis": -0.023,
                  "n_paired": 4
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.3705,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "paired_median_dex": 0.3705,
                  "n_paired": 4,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.013,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "paired_median_dex": 0.013,
                  "n_paired": 4,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "per_line": [
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -3.9999999999995595,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -4.000000000000448,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": 4.000000000000448,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.99116,
                    1.00984,
                    1.0115,
                    1.02966
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.014335416666666663,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0012917557435894649,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00013567590399999992,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0007770624999999999,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.13727025,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000169,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.3924017849274594,
            "sigma_measured_partial": 0.3924017849274594
          },
          "uncertainty_indicator_ids": [
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.3924017849274594,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_5002_6910_iag_fts_solar_atlas_solar_iag_SYNTH_DEEPGRADED_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_5002_6910_iag_fts_solar_atlas_solar_iag_SYNTH_DEEPGRADED_products.csv",
            "sha256": "e9a1904b5c711b140028b58d36f255cad5a0d948a310299f7a25107c790bf456",
            "artifact_mtime": "2026-10-18T21:53:48Z",
            "ingested_at": "2026-10-18T21:53:58Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "iag_fts_solar_atlas",
          "holding": "solar_iag",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "ENGINE-A",
          "display": "Synth · 1D-NLTE · Amarsi",
          "A": 7.593,
          "sigma_stat": 0.1093,
          "sigma_syst": 0.0184,
          "n_lines": 3,
          "n_excluded": 1,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.10935 dex at n_lines=3",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|iag_fts_solar_atlas|solar_iag|DEEPGRADED|DEEPGRADED|SYNTH|ENGINE-A|our-deep-graded",
              "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.10934972155625576,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 3,
                  "n_components": 3,
                  "raw_sigma": 0.18939927352894464,
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.04150109626808212,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.3333333333333333,
                    0.3333333333333333,
                    0.3333333333333333
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.011647999999999997,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 3 lines; difference of aggregates -0.0800/km/s",
                  "signed_response_dex": -0.011647999999999997,
                  "delta_plus_dex": -0.011647999999999997,
                  "delta_minus_dex": 0.011647999999999997,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.03999999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.025612496949731396,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447",
                  "paired_median_q97_minus_q80": 0.032,
                  "paired_median_iag_minus_synthesis": -0.02,
                  "n_paired": 3
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.165,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447",
                  "paired_median_dex": 0.165,
                  "n_paired": 3,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.013,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447",
                  "paired_median_dex": 0.013,
                  "n_paired": 3,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447",
                  "per_line": [
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -3.9999999999995595,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -4.000000000000448,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": 4.000000000000448,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "MEASURED",
                "sigma_dex": 0.03,
                "source": "Asplund+2021 Sect. 2.1: half the non-LTE abundance correction, minimum 0.03 dex -- the correction measured on this pool (median 1D-NLTE delta of the accepted lines)",
                "evidence": {
                  "pool_sha256": "d068371534c4cb5bebbeb913199e030d825550017a9e23952805ce3ed6026447",
                  "median_nlte_correction_dex": 0.0024168181818181,
                  "n_lines": 3,
                  "floor_dex": 0.03
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.99116,
                    1.00984,
                    1.0115
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.011957361604430665,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0017223409914526196,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00013567590399999992,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0006560000000000001,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.027225000000000003,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000169,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0009,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "nlte",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.20679791705886036,
            "sigma_measured_partial": 0.20679791705886036
          },
          "uncertainty_indicator_ids": [
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.2067979170588603,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_5002_6910_iag_fts_solar_atlas_solar_iag_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_5002_6910_iag_fts_solar_atlas_solar_iag_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "sha256": "e5967df56cbcfa3dbf713a2ac01acb6ce5c9c5f576a815db3a966f5e70c86284",
            "artifact_mtime": "2026-10-18T21:53:50Z",
            "ingested_at": "2026-10-18T21:53:59Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "iag_fts_solar_atlas",
          "holding": "solar_iag",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "synth-1D-LTE-gerber",
          "display": "Synth · 1D-LTE · Gerber",
          "A": 7.497,
          "sigma_stat": 0.1254,
          "sigma_syst": 0.0184,
          "n_lines": 4,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.12543 dex at n_lines=4",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|iag_fts_solar_atlas|solar_iag|DEEPGRADED|DEEPGRADED|SYNTH|synth-1D-LTE-gerber|our-deep-graded",
              "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.12543150521300467,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 4,
                  "n_components": 4,
                  "raw_sigma": 0.25086301042600934,
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03594100365306268,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.25,
                    0.25,
                    0.25,
                    0.25
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.007279999999999997,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 4 lines; difference of aggregates -0.0200/km/s",
                  "signed_response_dex": -0.007279999999999997,
                  "delta_plus_dex": -0.007279999999999997,
                  "delta_minus_dex": 0.007279999999999997,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.02499999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.035227829907617074,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "paired_median_q97_minus_q80": 0.04,
                  "paired_median_iag_minus_synthesis": -0.029,
                  "n_paired": 4
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.4555,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "paired_median_dex": 0.4555,
                  "n_paired": 4,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.008,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "paired_median_dex": -0.008,
                  "n_paired": 4,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "22ca69fb56f1d03fa91209fb4fadb0d984ae109656e46559bbc30c9f5b90c24b",
                  "per_line": [
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -6.000000000000227,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": 6.000000000000227,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -0.0,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": 3.9999999999995595,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.99116,
                    1.00984,
                    1.0115,
                    1.02966
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.015733062500000016,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0012917557435894649,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                5.2998399999999963e-05,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.001241,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.20748025,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                6.4e-05,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.47525053039800963,
            "sigma_measured_partial": 0.47525053039800963
          },
          "uncertainty_indicator_ids": [
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.4752505303980096,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_5002_6910_iag_fts_solar_atlas_solar_iag_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_5002_6910_iag_fts_solar_atlas_solar_iag_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "sha256": "ade94f0003e2b79a2c63819568327a2bbe66eadb3f802c6e5a1c20a22dfbeae0",
            "artifact_mtime": "2026-10-19T11:54:56Z",
            "ingested_at": "2026-10-19T11:55:17Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "kpno_solar_atlas",
          "holding": "solar_kpno_kurucz2005_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "1D-LTE",
          "display": "Synth · 1D-LTE",
          "A": 7.544,
          "sigma_stat": 0.0959,
          "sigma_syst": 0.0175,
          "n_lines": 5,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.09592 dex at n_lines=5",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|kpno_solar_atlas|solar_kpno_kurucz2005_corrected|DEEPGRADED|DEEPGRADED|SYNTH|1D-LTE|our-deep-graded",
              "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.09592205168781574,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 5,
                  "n_components": 5,
                  "raw_sigma": 0.21448822811520443,
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03214661093912657,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.2,
                    0.2,
                    0.2,
                    0.2,
                    0.2
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.010191999999999998,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 5 lines; difference of aggregates -0.4550/km/s",
                  "signed_response_dex": -0.010191999999999998,
                  "delta_plus_dex": -0.010191999999999998,
                  "delta_minus_dex": 0.010191999999999998,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.03499999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.021005951537600005,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_q97_minus_q80": -0.001,
                  "paired_median_iag_minus_synthesis": -0.021,
                  "n_paired": 5
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.154,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.154,
                  "n_paired": 5,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.015,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.015,
                  "n_paired": 5,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": 4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -0.9999999999994458,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -0.9999999999994458,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -17.000000000000348,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.99233,
                    0.99903,
                    1.01371,
                    1.01462,
                    1.02895
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.009201039999999995,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0010334045948715718,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00010387686399999996,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00044125,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.023716,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000225,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.1863345686094547,
            "sigma_measured_partial": 0.1863345686094547
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1863345686094547,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_kurucz2005_corrected_SYNTH_DEEPGRADED_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_kurucz2005_corrected_SYNTH_DEEPGRADED_products.csv",
            "sha256": "d05d4efd8a885df211e108cbdce6926c415df9a92c87f76813f1c9997b7b8c4e",
            "artifact_mtime": "2026-10-18T21:52:13Z",
            "ingested_at": "2026-10-18T21:53:54Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "kpno_solar_atlas",
          "holding": "solar_kpno_kurucz2005_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "ENGINE-A",
          "display": "Synth · 1D-NLTE · Amarsi",
          "A": 7.558,
          "sigma_stat": 0.0812,
          "sigma_syst": 0.0175,
          "n_lines": 4,
          "n_excluded": 1,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.08123 dex at n_lines=4",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|kpno_solar_atlas|solar_kpno_kurucz2005_corrected|DEEPGRADED|DEEPGRADED|SYNTH|ENGINE-A|our-deep-graded",
              "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.0812282598372673,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 4,
                  "n_components": 4,
                  "raw_sigma": 0.1624565196745346,
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03594100365306268,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.25,
                    0.25,
                    0.25,
                    0.25
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.011647999999999997,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 4 lines; difference of aggregates -0.2450/km/s",
                  "signed_response_dex": -0.011647999999999997,
                  "delta_plus_dex": -0.011647999999999997,
                  "delta_minus_dex": 0.011647999999999997,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.03999999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.010793516572461453,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_q97_minus_q80": 0.005,
                  "paired_median_iag_minus_synthesis": -0.0105,
                  "n_paired": 4
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.1005,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_dex": 0.1005,
                  "n_paired": 4,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.016,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_dex": 0.016,
                  "n_paired": 4,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": 4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -0.9999999999994458,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -17.000000000000348,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "MEASURED",
                "sigma_dex": 0.03,
                "source": "Asplund+2021 Sect. 2.1: half the non-LTE abundance correction, minimum 0.03 dex -- the correction measured on this pool (median 1D-NLTE delta of the accepted lines)",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "median_nlte_correction_dex": -0.00709886363636365,
                  "n_lines": 4,
                  "floor_dex": 0.03
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.99233,
                    0.99903,
                    1.01371,
                    1.01462
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.006598030196190611,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0012917557435894649,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00013567590399999992,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00011650000000000003,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.010100250000000002,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000256,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0009,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "nlte",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.13927746351718243,
            "sigma_measured_partial": 0.13927746351718243
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1392774635171824,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_kurucz2005_corrected_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_kurucz2005_corrected_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "sha256": "1bc2e2e3f07459fde7a373edc32e1c8f725a64b9b2365b0595b9758de97a16b2",
            "artifact_mtime": "2026-10-18T21:52:16Z",
            "ingested_at": "2026-10-18T21:53:54Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "kpno_solar_atlas",
          "holding": "solar_kpno_kurucz2005_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "synth-1D-LTE-gerber",
          "display": "Synth · 1D-LTE · Gerber",
          "A": 7.562,
          "sigma_stat": 0.1007,
          "sigma_syst": 0.0175,
          "n_lines": 5,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.10070 dex at n_lines=5",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|kpno_solar_atlas|solar_kpno_kurucz2005_corrected|DEEPGRADED|DEEPGRADED|SYNTH|synth-1D-LTE-gerber|our-deep-graded",
              "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.10070431966901922,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 5,
                  "n_components": 5,
                  "raw_sigma": 0.22518170440779608,
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03214661093912657,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.2,
                    0.2,
                    0.2,
                    0.2,
                    0.2
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.013103999999999996,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 5 lines; difference of aggregates -0.4500/km/s",
                  "signed_response_dex": -0.013103999999999996,
                  "delta_plus_dex": -0.013103999999999996,
                  "delta_minus_dex": 0.013103999999999996,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.044999999999999984,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.02009975124224178,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_q97_minus_q80": -0.004,
                  "paired_median_iag_minus_synthesis": -0.02,
                  "n_paired": 5
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.187,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.187,
                  "n_paired": 5,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.003,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": -0.003,
                  "n_paired": 5,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -1.9999999999997797,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -13.999999999999346,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": 1.9999999999997797,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -6.000000000000227,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -0.0,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.99233,
                    0.99903,
                    1.01371,
                    1.01462,
                    1.02895
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.01014136000000001,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0010334045948715718,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0001717148159999999,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000404,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.034969,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                9e-06,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.21616771130506884,
            "sigma_measured_partial": 0.21616771130506884
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.2161677113050688,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_kurucz2005_corrected_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_kurucz2005_corrected_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "sha256": "fbc7f27324c3b11d0b589c56c7ff1968f37db6c8267742157af210053c8e0169",
            "artifact_mtime": "2026-10-19T11:52:23Z",
            "ingested_at": "2026-10-19T11:55:11Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "kpno_solar_atlas",
          "holding": "solar_kpno_molecfit_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "1D-LTE",
          "display": "Synth · 1D-LTE",
          "A": 7.558,
          "sigma_stat": 0.1076,
          "sigma_syst": 0.0175,
          "n_lines": 5,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.10760 dex at n_lines=5",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|kpno_solar_atlas|solar_kpno_molecfit_corrected|DEEPGRADED|DEEPGRADED|SYNTH|1D-LTE|our-deep-graded",
              "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.10759990706315688,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 5,
                  "n_components": 5,
                  "raw_sigma": 0.24060070656587854,
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03214661093912657,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.2,
                    0.2,
                    0.2,
                    0.2,
                    0.2
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.010191999999999998,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 5 lines; difference of aggregates -0.2950/km/s",
                  "signed_response_dex": -0.010191999999999998,
                  "delta_plus_dex": -0.010191999999999998,
                  "delta_minus_dex": 0.010191999999999998,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.03499999999999999,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.006103277807866851,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_q97_minus_q80": 0.007,
                  "paired_median_iag_minus_synthesis": -0.005,
                  "n_paired": 5
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.179,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.179,
                  "n_paired": 5,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.019,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.019,
                  "n_paired": 5,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -9.000000000000341,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -5.000000000000782,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -12.9999999999999,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -4.000000000000448,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -9.000000000000341,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.9935,
                    1.00009,
                    1.01359,
                    1.01627,
                    1.03
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.011577739999999998,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0010334045948715718,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00010387686399999996,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                3.725e-05,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.032041,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.000361,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.21249534455811395,
            "sigma_measured_partial": 0.21249534455811395
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.2124953445581139,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_molecfit_corrected_SYNTH_DEEPGRADED_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_molecfit_corrected_SYNTH_DEEPGRADED_products.csv",
            "sha256": "709a1b21c45bafd8d652446817a1acd136f49362f2d808c3b578368f38d2eefc",
            "artifact_mtime": "2026-10-18T21:52:24Z",
            "ingested_at": "2026-10-18T21:53:55Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "kpno_solar_atlas",
          "holding": "solar_kpno_molecfit_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "ENGINE-A",
          "display": "Synth · 1D-NLTE · Amarsi",
          "A": 7.555,
          "sigma_stat": 0.0801,
          "sigma_syst": 0.0175,
          "n_lines": 4,
          "n_excluded": 1,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.08007 dex at n_lines=4",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|kpno_solar_atlas|solar_kpno_molecfit_corrected|DEEPGRADED|DEEPGRADED|SYNTH|ENGINE-A|our-deep-graded",
              "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.08007320423899429,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 4,
                  "n_components": 4,
                  "raw_sigma": 0.16014640847798858,
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03594100365306268,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.25,
                    0.25,
                    0.25,
                    0.25
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.014559999999999995,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 4 lines; difference of aggregates -0.2375/km/s",
                  "signed_response_dex": -0.014559999999999995,
                  "delta_plus_dex": -0.014559999999999995,
                  "delta_minus_dex": 0.014559999999999995,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.04999999999999998,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.0055,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_q97_minus_q80": 0.0,
                  "paired_median_iag_minus_synthesis": -0.0055,
                  "n_paired": 4
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.109,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_dex": 0.109,
                  "n_paired": 4,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.017,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "paired_median_dex": 0.017,
                  "n_paired": 4,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -9.000000000000341,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -5.000000000000782,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -12.9999999999999,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -8.999999999999453,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "MEASURED",
                "sigma_dex": 0.03,
                "source": "Asplund+2021 Sect. 2.1: half the non-LTE abundance correction, minimum 0.03 dex -- the correction measured on this pool (median 1D-NLTE delta of the accepted lines)",
                "evidence": {
                  "pool_sha256": "7e764b087f45c02e9b50450c235a7236b25850d0bc7fe290d3bdf03e43a5e46f",
                  "median_nlte_correction_dex": -0.00709886363636365,
                  "n_lines": 4,
                  "floor_dex": 0.03
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.9935,
                    1.00009,
                    1.01359,
                    1.01627
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.006411718037099693,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0012917557435894649,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00021199359999999985,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                3.0249999999999997e-05,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.011881,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00028900000000000003,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0009,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "nlte",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.14496798743408545,
            "sigma_measured_partial": 0.14496798743408545
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.1449679874340854,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_molecfit_corrected_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_molecfit_corrected_SYNTH_DEEPGRADED_ENGINE-A_products.csv",
            "sha256": "8b895c3c8ab9e24dc14a2f2785f79a08c14320ae7ee3a5ccd4c6726e8740c9be",
            "artifact_mtime": "2026-10-18T21:52:27Z",
            "ingested_at": "2026-10-18T21:53:55Z"
          },
          "star": "solar"
        },
        {
          "element": "Mg",
          "ion": "I",
          "band": "VIS",
          "instrument": "kpno_solar_atlas",
          "holding": "solar_kpno_molecfit_corrected",
          "tier": "DEEPGRADED",
          "selector": "DEEPGRADED",
          "treatment": "synth-1D-LTE-gerber",
          "display": "Synth · 1D-LTE · Gerber",
          "A": 7.579,
          "sigma_stat": 0.1118,
          "sigma_syst": 0.0175,
          "n_lines": 5,
          "n_excluded": 0,
          "dominant_term": "line-to-line scatter",
          "stat_basis": "measured — RMS of the random terms, 0.11182 dex at n_lines=5",
          "route": "SYNTH",
          "uncertainty": {
            "schema": "rya587.uncertainty.v1",
            "scope": {
              "star": "solar",
              "product_key": "Mg|I|VIS|kpno_solar_atlas|solar_kpno_molecfit_corrected|DEEPGRADED|DEEPGRADED|SYNTH|synth-1D-LTE-gerber|our-deep-graded",
              "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
            },
            "components": [
              {
                "name": "measurement",
                "state": "MEASURED",
                "sigma_dex": 0.1118237005290024,
                "source": "per-feature scatter of the accepted pool (components within 0.5 A merged, RYA-1232)",
                "evidence": {
                  "method": "line_scatter",
                  "independent": true,
                  "n_lines": 5,
                  "n_components": 5,
                  "raw_sigma": 0.25004539587842856,
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67"
                }
              },
              {
                "name": "transition_data",
                "state": "MEASURED",
                "sigma_dex": 0.03214661093912657,
                "source": "gf covariance per data/reference/gf_error_model.csv -- NIST_ASD: scale_only (scale 0.0000 dex; NIST ASD accuracy classes; Kelleher & Podobedova 2008 JPCRD 37)",
                "evidence": {
                  "indicator_ids": [
                    "pk_319f6a7b4073",
                    "pk_a4cea3ace5e5",
                    "pk_86e88ac86338",
                    "pk_a73f561520e9",
                    "pk_3aa0cc5973ad"
                  ],
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "line_sigma_dex": [
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536,
                    0.07188200730612536
                  ],
                  "weights": [
                    0.2,
                    0.2,
                    0.2,
                    0.2,
                    0.2
                  ],
                  "line_sources": [
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.11 grade A; sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['A', 'C+']; the worse is charged)",
                    "NIST ASD v5.12 grade B+ (RYA-592 re-verified 2026-07-26; fik 1.06e-01 x g_i 3; cf. Pehlivan Rhodin+2017 A&A 598 A102 exp -0.547+/-0.02 / theo -0.513); sigma from NIST class C+ via gf_grades.nist_sigma_dex (row names classes ['B+', 'C+']; the worse is charged)"
                  ],
                  "covariance": [
                    [
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594,
                      0.0
                    ],
                    [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0051670229743578594
                    ]
                  ]
                }
              },
              {
                "name": "stellar.logg",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar log g is pinned; delta_logg is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.metallicity",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "solar [Fe/H] is pinned; delta_feh is definitionally zero (RYA-1089)",
                "evidence": {
                  "delta": 0.0,
                  "parameter_exists": true
                }
              },
              {
                "name": "stellar.teff",
                "state": "DEFINED",
                "sigma_dex": 0.0,
                "source": "sourced DEFINED zero (RYA-1226 convention): the solar Teff allowance is 1 K",
                "evidence": {
                  "parameter_exists": true,
                  "delta_K": 1.0,
                  "owed_measurement": "a Teff perturbation on this pool"
                }
              },
              {
                "name": "stellar.xi",
                "state": "MEASURED",
                "sigma_dex": 0.017471999999999994,
                "source": "per-line paired differential at xi 0.90/1.10 on this product's OWN pool, stamped legs (RYA-1178 A)",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "parameter_source": "RYA-1089 sourced solar delta_xi = 0.2912 km/s",
                  "response_assessment": "central paired median over 5 lines; difference of aggregates -0.3200/km/s",
                  "signed_response_dex": -0.017471999999999994,
                  "delta_plus_dex": -0.017471999999999994,
                  "delta_minus_dex": 0.017471999999999994,
                  "delta_parameter": 0.2912,
                  "dA_dxi": -0.059999999999999984,
                  "parameter_exists": true
                }
              },
              {
                "name": "continuum",
                "state": "MEASURED",
                "sigma_dex": 0.010735455276791945,
                "source": "standing continuum rule (synthesis reference, 3-MAD clipped): placement = q97 vs q80 central half-difference, REFERENCE = IAG-atlas leg minus nominal, in quadrature, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_q97_minus_q80": 0.019,
                  "paired_median_iag_minus_synthesis": -0.005,
                  "n_paired": 5
                }
              },
              {
                "name": "profile_ew",
                "state": "MEASURED",
                "sigma_dex": 0.218,
                "source": "fit window +/-0.25 A core vs the band's fixed window, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": 0.218,
                  "n_paired": 5,
                  "varied": "fit half-width",
                  "nominal_A": 0.62,
                  "alternate_A": 0.25
                }
              },
              {
                "name": "model_atmosphere",
                "state": "MEASURED",
                "sigma_dex": 0.002,
                "source": "MARCS.GES vs ATLAS9.Castelli, one axis varied, paired on this pool",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "paired_median_dex": -0.002,
                  "n_paired": 5,
                  "varied": "atmosphere grid"
                }
              },
              {
                "name": "telluric",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "per-line measured sky depth -> measured residual of this holding vs an independent correction on the telluric pixels -> dex via the line's own dA/df (+0.1% leg); lines independent, weight 1/n",
                "evidence": {
                  "pool_sha256": "16575ebd8c6e9c7ac52968d8e96c370b2498fc4e018ef9e357f3d684d5d2bb67",
                  "per_line": [
                    {
                      "wavelength_air_A": 4571.096,
                      "dA_df": -9.000000000000341,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 1.0010425909122582,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.12500041602556322,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5167.322,
                      "dA_df": -3.9999999999995595,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995633633304298,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.03329610304686559,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5172.684,
                      "dA_df": -3.0000000000001137,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9993677231754572,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04030069908833078,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5183.604,
                      "dA_df": -4.999999999999893,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9990258108691104,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.04059994820642421,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    },
                    {
                      "wavelength_air_A": 5528.405,
                      "dA_df": -3.0000000000001137,
                      "sigma_line_dex": 0.0,
                      "sky_pair": "solar_kpno/solar_kpno_kurucz2005_corrected",
                      "clean_edge": 0.16768564509441747,
                      "clean_window_null": 0.16768564509441747,
                      "sky_baseline": 0.9995824466086907,
                      "n_px": 400,
                      "n_telluric_px": 0,
                      "max_depth": 0.029726040850567514,
                      "residual_flux": 0.0,
                      "sky_absorption": 0.0
                    }
                  ]
                }
              },
              {
                "name": "blends",
                "state": "N/A",
                "sigma_dex": null,
                "source": "full atomic + molecular synthesis in-window (RYA-1230 turned molecular opacity on in every band); no catalogued-blend deficit",
                "evidence": {
                  "use_molecules": true,
                  "owed_measurement": "a paired molecule-strength leg on this C/O pool"
                }
              },
              {
                "name": "nlte",
                "state": "N/A",
                "sigma_dex": null,
                "source": "this leg applies no departures (nlte_delta_dex = 0 on every line)",
                "evidence": {
                  "nlte_delta_dex": 0.0
                }
              },
              {
                "name": "pseudo_continuum",
                "state": "N/A",
                "sigma_dex": null,
                "source": "outside the near-UV the continuum is observed; it is placed per line by the standing rule and priced on `continuum`",
                "evidence": {
                  "band": "VIS",
                  "continuum_levels": [
                    0.9935,
                    1.00009,
                    1.01359,
                    1.01627,
                    1.03
                  ]
                }
              },
              {
                "name": "hfs_isotopes",
                "state": "N/A",
                "sigma_dex": null,
                "source": "every pool line has hfs_n_components == 1 (canonical_gf)",
                "evidence": {
                  "hfs_n_components": [
                    1
                  ]
                }
              },
              {
                "name": "molecular_coupling",
                "state": "N/A",
                "sigma_dex": null,
                "source": "atomic product; the selector is not a MOL- indicator set",
                "evidence": {
                  "selector": "DEEPGRADED"
                }
              },
              {
                "name": "holding_instrument",
                "state": "MEASURED",
                "sigma_dex": 0.0,
                "source": "SynthesisHandler harness residual MEASURED against the known optical answer (RYA-869)",
                "evidence": {
                  "harness_residual_dex": 0.0
                }
              }
            ],
            "required_extra": [],
            "covariance": [
              [
                0.01250454000000001,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0010334045948715718,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0003052707839999998,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.00011525000000000001,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.047524,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                4e-06,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ],
              [
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
              ]
            ],
            "covariance_order": [
              "measurement",
              "transition_data",
              "stellar.logg",
              "stellar.metallicity",
              "stellar.teff",
              "stellar.xi",
              "continuum",
              "profile_ew",
              "model_atmosphere",
              "telluric",
              "holding_instrument"
            ],
            "covariance_source": "components independent of one another; the shared-source gf correlation lives inside transition_data",
            "assumptions": "solar log g and [Fe/H] pinned; Teff allowance 1 K",
            "state": "COMPLETE",
            "holds": [],
            "sigma_reported": 0.24796464542122043,
            "sigma_measured_partial": 0.24796464542122043
          },
          "uncertainty_indicator_ids": [
            "pk_319f6a7b4073",
            "pk_a4cea3ace5e5",
            "pk_86e88ac86338",
            "pk_a73f561520e9",
            "pk_3aa0cc5973ad"
          ],
          "grade": "Deep Grade",
          "sigma_reported": 0.2479646454212204,
          "provenance": {
            "host": "Sirius",
            "path": "/home/damienabraxas/scratch/rya1250/data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_molecfit_corrected_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "copied_to": "data/results/orchestrator/budget/solar_Mg/stage/MgI_4200_6910_kpno_solar_atlas_solar_kpno_molecfit_corrected_SYNTH_DEEPGRADED_synth-1D-LTE-gerber_products.csv",
            "sha256": "512905651a8f5f923a9465d29b68bb5665414ef83d74e5141e54eaea6ee2ce17",
            "artifact_mtime": "2026-10-19T11:52:52Z",
            "ingested_at": "2026-10-19T11:55:13Z"
          },
          "star": "solar"
        }
      ],
      "diagnostics": [
        {
          "line": "3026.056 Å",
          "category": "deriver excluded",
          "caption": "REGISTRY-ATOMIC_BLEND: exclude/active per data/registry/problem_children.csv [1031,851,841] -- carried, not dropped",
          "status": "excluded"
        },
        {
          "line": "3427.119 Å",
          "category": "deriver excluded",
          "caption": "SYNTHESIS: edge_pinned",
          "status": "excluded"
        },
        {
          "line": "3475.863 Å",
          "category": "deriver excluded",
          "caption": "LEG-UNSTABLE (RYA-1232 budget assembly): core: SYNTHESIS: edge_pinned",
          "status": "excluded"
        },
        {
          "line": "3526.238 Å",
          "category": "deriver excluded",
          "caption": "LEG-UNSTABLE (RYA-1232 budget assembly): core: FIT-NOT-PHYSICAL: A(Fe) = 8.996 is 1.54 dex from solar 7.46, outside the +/-1.5 dex validi",
          "status": "excluded"
        },
        {
          "line": "3540.121 Å",
          "category": "deriver excluded",
          "caption": "LEG-UNSTABLE (RYA-1232 budget assembly): core: FIT-NOT-PHYSICAL: A(Fe) = 9.370 is 1.91 dex from solar 7.46, outside the +/-1.5 dex validi",
          "status": "excluded"
        },
        {
          "line": "3603.681 Å",
          "category": "deriver excluded",
          "caption": "LEG-UNSTABLE (RYA-1232 budget assembly): xi_plus: FIT-NOT-PHYSICAL: A(Fe) = 8.966 is 1.51 dex from solar 7.46, outside the +/-1.5 dex validi; marcs: FIT-NOT-PHYSICAL: A(Fe) = 9.004 is 1.54 dex from solar 7.46, outside the +/-1.5 dex validi",
          "status": "excluded"
        },
        {
          "line": "3618.299 Å",
          "category": "deriver excluded",
          "caption": "FIT-NOT-PHYSICAL: A(Fe) = 10.856 is 3.40 dex from solar 7.46, outside the +/-1.5 dex validity bound. This is a NON-CONVERGENT FIT, not an outlier: the bound spans a factor of ~1000 in abundance and cannot shape a result (RYA-1191).",
          "status": "excluded"
        },
        {
          "line": "3623.773 Å",
          "category": "deriver excluded",
          "caption": "LEG-UNSTABLE (RYA-1232 budget assembly): core: FIT-NOT-PHYSICAL: A(Fe) = 9.079 is 1.62 dex from solar 7.46, outside the +/-1.5 dex validi",
          "status": "excluded"
        }
      ],
      "diagnosticsShown": 8,
      "problemCount": 243,
      "provenance": {
        "poolCount": 58,
        "nistClassCount": 44,
        "poorNistClassCount": 20,
        "poorClasses": [
          "C",
          "C+",
          "D",
          "D+",
          "E"
        ],
        "sentence": "44 of 58 near-UV Fe I lines carry a citable NIST accuracy class; 20 of those are in the C/C+/D/D+/E classes."
      },
      "downloadPath": "/assets/data/solar/FeI_perline.csv",
      "statusDetail": "gold · generated"
    },
    {
      "atomicNumber": 26,
      "symbol": "Fe",
      "ion": "II",
      "name": "Iron",
      "childOf": "Fe I",
      "status": "Published",
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
      "asplund": 7.47,
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
        "note": "Each row differences the same band, atlas, and engine, so the only variable is the ionization stage. The published Fe I anchor is on the 3D-NLTE scale and is deliberately NOT used here — differencing it against these Fe II products would measure the scale, not the ionization.",
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
        "overlapOffsetDex": -0.036,
        "overlapOffsetN": 22,
        "redPoolOffsetDex": 0.107,
        "redPoolN": 8,
        "verdict": "LEGITIMATE — our scale IS the pure-lab scale",
        "reasoning": "ours sits -0.035 from Den Hartog's pure-lab values with a CI of [-0.050, +0.030] that EXCLUDES the solar-fitted prediction (~+0.13). Sitting above NIST is then NIST being low, as Den Hartog 2019 reports; the solar Fe I - Fe II balance is an INDEPENDENT check and RYA-852's hypothesis is REFUTED.",
        "referee": "Den Hartog et al. 2019, ApJS 243, 33 (BF x LIF lifetimes; pure lab)",
        "nOverlapLines": 22,
        "oursMinusDh": {
          "median": -0.035,
          "ci95": [
            -0.05,
            0.03
          ],
          "n": 22
        },
        "bandDependence": {
          "blue": -0.066,
          "red": 0.107,
          "swing": 0.173,
          "signFlips": true
        },
        "caveat": "the overlap does NOT contain the three Fe II arbiter lines, which are redward of DH19's 4584 A ceiling; this refs the pool SCALE, not those lines",
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
          "gfSource": "VALD3-scale value via nist_reference.csv; NOT NIST (ASD gives -2.854 acc E) -- RYA-853",
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
          "gfSource": "VALD3-scale value via nist_reference.csv; NOT NIST (ASD gives -2.444 acc D) -- RYA-853",
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
          "logGf": -3.4976,
          "gfSource": "NIST-C+ T7589",
          "gfGrade": "NIST:C+",
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
          "gfSource": "VALD3-scale value via nist_reference.csv; NOT NIST (ASD gives -2.854 acc E) -- RYA-853",
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
          "gfSource": "VALD3-scale value via nist_reference.csv; NOT NIST (ASD gives -2.444 acc D) -- RYA-853",
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
          "logGf": -3.4976,
          "gfSource": "NIST-C+ T7589",
          "gfGrade": "NIST:C+",
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
          "gfSource": "VALD3-scale value via nist_reference.csv; NOT NIST (ASD gives -2.854 acc E) -- RYA-853",
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
          "gfSource": "VALD3-scale value via nist_reference.csv; NOT NIST (ASD gives -2.444 acc D) -- RYA-853",
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
          "logGf": -3.4976,
          "gfSource": "NIST-C+ T7589",
          "gfGrade": "NIST:C+",
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
        },
        {
          "scope": "4303.170 (VIS)",
          "problemClass": "BAD_FIT",
          "treatment": "exclude",
          "severity": "high",
          "status": "active",
          "tickets": "1081,1080,911,1043",
          "note": "RYA-1081. Reads A=10.011 on HARPS and 10.075 on KP — +2.0 dex above its own pool median (7.966) on BOTH arms, with red_chi2 1212 (HARPS) / 1133 (KP) against a pool median of ~99. Present on both arms with an identical PRIMARY LAB DenHartog2019 gf (-2.52 +/- 0.10), so it is neither a gf defect nor arm-specific: the fit itself fails. MECHANISM UNDIAGNOSED — blend, damping and continuum are all untested here, and the RYA-1043 per-line COG covers Fe I only so saturation is UNANSWERED, not excluded (RYA-833). Excluded on the measured fit failure, NOT as a saturation claim and NOT to move the arm value: removing it shifts the published median by only -0.035 dex (7.966 -> 7.931), so this exclusion is not what closes the HARPS-KP gap and must not be read as if it were."
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
          "category": "download coverage",
          "artifact": "data/products/solar/Fe_perline.csv (RYA-870)",
          "engine": "this page's products",
          "publishedLineCount": 3,
          "artifactLineCount": 0,
          "detail": "The per-line download is a projection of Fe.json (RYA-1229) and is CURRENT: it covers 40 of the 56 Fe II products the feed publishes, all of them on the SYNTH route. It carries no rows for the 3 treatments THIS page reports, because those are the RYA-880 re-derivation (FeII_3800_6910_kpno_solar_atlas_PROFILEFIT) and the feed publishes no Fe II PROFILEFIT product at all. Every number on this page comes from that band product directly, so nothing here is affected — but the download is not where to look for this page's per-line evidence."
        }
      ],
      "reproducibility": {
        "generator": "scripts/generate_solar_report.py + scripts/fe2_record.py",
        "version": "1.0.0",
        "sourceArtifact": "data/results/rya880/FeII_3800_6910_kpno_solar_atlas_PROFILEFIT_products.csv",
        "registry": "data/registry/problem_children.csv",
        "instrument": "NSO Kitt Peak solar flux atlas · 3800–6910 Å",
        "bandProductCommit": "74c1750a5856a19152b5e004f3eb7fc1614bcba1",
        "registryCommit": "59fed9694523e0de5abc00be21569547167fcb12",
        "scienceGit": "f12a1b3d7cb347b8e8cf65eaeec96b4a5089a534",
        "generatedAt": "2026-10-25T02:21:10+00:00"
      },
      "downloadPath": "/assets/data/solar/FeII_perline.csv",
      "statusDetail": "arbiter · generated"
    },
    {
      "atomicNumber": 3,
      "symbol": "Li",
      "ion": "I",
      "name": "Lithium",
      "status": "Curation owed",
      "tier": "upper_limit",
      "method": "EW: Li I 6707 (single line, UPPER LIMIT)",
      "asplund": 1.05,
      "measurementNote": "",
      "primaryValue": {
        "value": 0.727,
        "sigmaTotal": null,
        "lineCount": 1.0
      },
      "delta": -0.323,
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 6,
      "symbol": "C",
      "ion": "I",
      "name": "Carbon",
      "status": "Published",
      "tier": "gold",
      "method": "Asplund+2021 combination of C I 8.488, C2 8.419, CH 8.509, CO 8.701 (C.json v1.202)",
      "asplund": 8.46,
      "measurementNote": "",
      "appendixPath": "/systems/sol/elements/c/",
      "primaryValue": {
        "value": 8.5069,
        "sigmaTotal": 0.0559,
        "lineCount": 425
      },
      "delta": 0.0469,
      "statusDetail": "published · reference grade · rya-587 budget"
    },
    {
      "atomicNumber": 7,
      "symbol": "N",
      "ion": "I",
      "name": "Nitrogen",
      "status": "Published",
      "tier": "owed",
      "method": "Asplund+2021 combination of N I 7.904, CN 7.866 (N.json v1.80)",
      "asplund": 7.83,
      "measurementNote": "",
      "appendixPath": "/systems/sol/elements/n/",
      "primaryValue": {
        "value": 7.885,
        "sigmaTotal": 0.019,
        "lineCount": 217
      },
      "delta": 0.055,
      "statusDetail": "published · reference grade · rya-587 budget"
    },
    {
      "atomicNumber": 8,
      "symbol": "O",
      "ion": "I",
      "name": "Oxygen",
      "status": "Published",
      "tier": "gold",
      "method": "Asplund+2021 combination of [O I] 8.934, O I 8.751 (O.json v1.102)",
      "asplund": 8.69,
      "measurementNote": "",
      "appendixPath": "/systems/sol/elements/o/",
      "primaryValue": {
        "value": 8.7576,
        "sigmaTotal": 0.0752,
        "lineCount": 5
      },
      "delta": 0.0676,
      "statusDetail": "published · reference grade · rya-587 budget"
    },
    {
      "atomicNumber": 11,
      "symbol": "Na",
      "ion": "I",
      "name": "Sodium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 6.24,
      "measurementNote": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 12,
      "symbol": "Mg",
      "ion": "I",
      "name": "Magnesium",
      "status": "Published",
      "tier": "owed",
      "method": "harps VIS · DEEPGRADED · ENGINE-A (Deep Grade, Mg.json v1.15)",
      "asplund": 7.55,
      "measurementNote": "",
      "appendixPath": "/systems/sol/elements/mg/",
      "primaryValue": {
        "value": 7.613,
        "sigmaTotal": 0.1144,
        "lineCount": 4
      },
      "delta": 0.063,
      "statusDetail": "published · deep grade · rya-587 budget"
    },
    {
      "atomicNumber": 13,
      "symbol": "Al",
      "ion": "I",
      "name": "Aluminium",
      "status": "Published",
      "tier": "owed",
      "method": "Asplund+2021 line set, 6 lines on kpno_solar_atlas: Al I VIS 6.428, Al I red-optical 6.450, Al I NIR 6.552 (Al.json v1.67)",
      "asplund": 6.43,
      "measurementNote": "",
      "appendixPath": "/systems/sol/elements/al/",
      "primaryValue": {
        "value": 6.4547,
        "sigmaTotal": 0.054,
        "lineCount": 6
      },
      "delta": 0.0247,
      "statusDetail": "published · reference grade · rya-587 budget"
    },
    {
      "atomicNumber": 14,
      "symbol": "Si",
      "ion": "I",
      "name": "Silicon",
      "status": "Published",
      "tier": "gf_floor",
      "method": "Asplund+2021 line set, 10 lines on kpno_solar_atlas: Si I VIS 7.489, Si II VIS 7.518, Si I red-optical 7.577 (Si.json v1.278)",
      "asplund": 7.51,
      "measurementNote": "",
      "appendixPath": "/systems/sol/elements/si/",
      "primaryValue": {
        "value": 7.5122,
        "sigmaTotal": 0.0588,
        "lineCount": 10
      },
      "delta": 0.0022,
      "statusDetail": "published · reference grade · rya-587 budget"
    },
    {
      "atomicNumber": 15,
      "symbol": "P",
      "ion": "I",
      "name": "Phosphorus",
      "status": "Curation owed",
      "tier": "owed",
      "method": "kittpeak: P I 10581/10596 near-IR multiplet",
      "asplund": 5.41,
      "measurementNote": "",
      "primaryValue": {
        "value": 6.61,
        "sigmaTotal": null,
        "lineCount": 2.0
      },
      "delta": 1.2,
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 16,
      "symbol": "S",
      "ion": "I",
      "name": "Sulfur",
      "status": "Curation owed",
      "tier": "owed",
      "method": "synthesis: S I 6743.53 + 6757.15 windows, gf=Costa Silva+2020 (A&A 634 A136) Table1, NLTE Amarsi 2025 (RYA-492)",
      "asplund": 7.12,
      "measurementNote": "",
      "primaryValue": {
        "value": 7.486,
        "sigmaTotal": 0.045,
        "lineCount": 2.0
      },
      "delta": 0.366,
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 19,
      "symbol": "K",
      "ion": "I",
      "name": "Potassium",
      "status": "Pending",
      "tier": "gold",
      "method": "kittpeak: K I 7699 (clean; 7665 in the telluric O2 A-band) — NLTE-wired",
      "asplund": 5.07,
      "measurementNote": "",
      "primaryValue": {
        "value": 5.099,
        "sigmaTotal": null,
        "lineCount": 1.0
      },
      "delta": 0.029,
      "statusDetail": "pass"
    },
    {
      "atomicNumber": 20,
      "symbol": "Ca",
      "ion": "I",
      "name": "Calcium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 6.3,
      "measurementNote": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 21,
      "symbol": "Sc",
      "ion": "II",
      "name": "Scandium",
      "status": "Curation owed",
      "tier": "gold",
      "method": "kittpeak: Sc II 4246 (blue-edge, HFS)",
      "asplund": 3.14,
      "measurementNote": "",
      "primaryValue": {
        "value": 3.203,
        "sigmaTotal": null,
        "lineCount": 1.0
      },
      "delta": 0.063,
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 22,
      "symbol": "Ti",
      "ion": "I",
      "name": "Titanium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW: 10 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 4.97,
      "measurementNote": "EW: 10 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 23,
      "symbol": "V",
      "ion": "I",
      "name": "Vanadium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "HFS synthesis LTE: V I 6 lines — NLTE-VOID (no model atom)",
      "asplund": 3.9,
      "measurementNote": "",
      "primaryValue": {
        "value": 3.917,
        "sigmaTotal": 0.029,
        "lineCount": 6.0
      },
      "delta": 0.017,
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 24,
      "symbol": "Cr",
      "ion": "I",
      "name": "Chromium",
      "status": "Curation owed",
      "tier": "gf_floor",
      "method": "EW: 7 line(s)",
      "asplund": 5.62,
      "measurementNote": "",
      "primaryValue": {
        "value": 6.022,
        "sigmaTotal": null,
        "lineCount": 7.0
      },
      "delta": 0.402,
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 25,
      "symbol": "Mn",
      "ion": "I",
      "name": "Manganese",
      "status": "Pending",
      "tier": "gold",
      "method": "HFS synthesis: Mn I 3 lines (6013/6016/6021, Den Hartog e6S→z6P), gf=Den Hartog+2011 (MED), NLTE live Amarsi HFS-resolved",
      "asplund": 5.42,
      "measurementNote": "",
      "primaryValue": {
        "value": 5.466,
        "sigmaTotal": 0.154,
        "lineCount": 3.0
      },
      "delta": 0.046,
      "statusDetail": "pass"
    },
    {
      "atomicNumber": 27,
      "symbol": "Co",
      "ion": "I",
      "name": "Cobalt",
      "status": "Pending",
      "tier": "owed",
      "method": "synthesis: Co I red HFS-resolved flux fit (5 lines, HARPS; blends modelled) + per-line Gerber 1D-NLTE (RYA-534 deck)",
      "asplund": 4.94,
      "measurementNote": "",
      "primaryValue": {
        "value": 4.96,
        "sigmaTotal": 0.063,
        "lineCount": 5.0
      },
      "delta": 0.02,
      "statusDetail": "pass"
    },
    {
      "atomicNumber": 28,
      "symbol": "Ni",
      "ion": "I",
      "name": "Nickel",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 6.2,
      "measurementNote": "EW: 2 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 29,
      "symbol": "Cu",
      "ion": "I",
      "name": "Copper",
      "status": "Curation owed",
      "tier": "owed",
      "method": "HFS synthesis: Cu I 5 lines (5105/5218/5220/5700/5782), gf=Kock&Richter, NLTE vendored RYA-402 b-factor (live .grd offline)",
      "asplund": 4.18,
      "measurementNote": "",
      "primaryValue": {
        "value": 4.345,
        "sigmaTotal": 0.139,
        "lineCount": 5.0
      },
      "delta": 0.165,
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 38,
      "symbol": "Sr",
      "ion": "II",
      "name": "Strontium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW: 1 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "asplund": 2.83,
      "measurementNote": "EW: 1 curated line(s); value HELD at gold tier 'owed' (RYA-522) — not a graded-cull blank",
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 39,
      "symbol": "Y",
      "ion": "II",
      "name": "Yttrium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW present; no independent-gf line survives the graded cull",
      "asplund": 2.21,
      "measurementNote": "EW present; no independent-gf line survives the graded cull",
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 40,
      "symbol": "Zr",
      "ion": "II",
      "name": "Zirconium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW present; no independent-gf line survives the graded cull",
      "asplund": 2.59,
      "measurementNote": "EW present; no independent-gf line survives the graded cull",
      "statusDetail": "curation-owed"
    },
    {
      "atomicNumber": 56,
      "symbol": "Ba",
      "ion": "II",
      "name": "Barium",
      "status": "Pending",
      "tier": "owed",
      "method": "synthesis: Ba II 5853.668 in-window blend fit (Turbospectrum, HFS + full VALD3 in-window block, chi2 profile fit) + Engine-A Korotin2015 1D-NLTE delta",
      "asplund": 2.27,
      "measurementNote": "",
      "primaryValue": {
        "value": 2.237,
        "sigmaTotal": 0.016,
        "lineCount": 1.0
      },
      "delta": -0.033,
      "statusDetail": "pass"
    },
    {
      "atomicNumber": 63,
      "symbol": "Eu",
      "ion": "II",
      "name": "Europium",
      "status": "Curation owed",
      "tier": "owed",
      "method": "EW present; no independent-gf line survives the graded cull",
      "asplund": 0.52,
      "measurementNote": "EW present; no independent-gf line survives the graded cull",
      "statusDetail": "curation-owed"
    }
  ],
  "alEvidence": {
    "products": [
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.747,
        "sigma": 0.17288944444355187,
        "sigmaStat": 0.01,
        "sigmaSys": 0.1726,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.732,
        "sigma": 0.17288944444355187,
        "sigmaStat": 0.01,
        "sigmaSys": 0.1726,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.569,
        "sigma": 0.1758209600701805,
        "sigmaStat": 0.0335,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.552,
        "sigma": 0.1754150791693804,
        "sigmaStat": 0.0313,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.569,
        "sigma": 0.1758209600701805,
        "sigmaStat": 0.0335,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.552,
        "sigma": 0.1754150791693804,
        "sigmaStat": 0.0313,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.409,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.387,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.403,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.381,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.447,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.425,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.443,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.42,
        "sigma": 0.17033640245114962,
        "sigmaStat": 0.0107,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.451,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.429,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.446,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.423,
        "sigma": 0.17055113602670607,
        "sigmaStat": 0.0137,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.45,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.428,
        "sigma": 0.17030572509460742,
        "sigmaStat": 0.0102,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.45,
        "sigma": 0.17029386365926402,
        "sigmaStat": 0.01,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.427,
        "sigma": 0.17033640245114962,
        "sigmaStat": 0.0107,
        "sigmaSys": 0.17,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.423,
        "sigma": 0.17288944444355187,
        "sigmaStat": 0.01,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.406,
        "sigma": 0.17288944444355187,
        "sigmaStat": 0.01,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.423,
        "sigma": 0.17288944444355187,
        "sigmaStat": 0.01,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.406,
        "sigma": 0.17288944444355187,
        "sigmaStat": 0.01,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.467,
        "sigma": 0.17969629934976403,
        "sigmaStat": 0.05,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.45,
        "sigma": 0.18115120755876843,
        "sigmaStat": 0.055,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 6.467,
        "sigma": 0.17969629934976403,
        "sigmaStat": 0.05,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Amarsi",
        "telluric": "not declared",
        "value": 6.45,
        "sigma": 0.18115120755876843,
        "sigmaStat": 0.055,
        "sigmaSys": 0.1726,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      }
    ],
    "coverageGrid": [
      {
        "instrument": "crires_plus",
        "band": "NIR",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "crires_plus",
        "band": "VIS",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "crires_plus",
        "band": "red-optical",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "kpno_solar_atlas",
        "band": "NIR",
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
        "instrument": "kpno_solar_atlas",
        "band": "red-optical",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "harps",
        "band": "NIR",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "harps",
        "band": "VIS",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "harps",
        "band": "red-optical",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "NIR",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "VIS",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "red-optical",
        "state": "present",
        "range": ""
      }
    ],
    "bands": [
      "NIR",
      "VIS",
      "red-optical"
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
        "band": "H",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_h_rya1232",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.497,
        "sigma": 0.14927604151035087,
        "sigmaStat": 0.0348,
        "sigmaSys": 0.145163,
        "lineCount": 19,
        "role": "RYA-935 evidence"
      },
      {
        "band": "H",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_h_rya1232",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.649,
        "sigma": 0.22776177129623837,
        "sigmaStat": 0.029,
        "sigmaSys": 0.225908,
        "lineCount": 8,
        "role": "RYA-935 evidence"
      },
      {
        "band": "H",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_h_rya1232",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.502,
        "sigma": 0.17923855964607616,
        "sigmaStat": 0.0354,
        "sigmaSys": 0.175708,
        "lineCount": 19,
        "role": "RYA-935 evidence"
      },
      {
        "band": "H",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_h_rya1232",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.497,
        "sigma": 0.14927604151035087,
        "sigmaStat": 0.0348,
        "sigmaSys": 0.145163,
        "lineCount": 19,
        "role": "RYA-935 evidence"
      },
      {
        "band": "H",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_h_rya1232",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.649,
        "sigma": 0.22776177129623837,
        "sigmaStat": 0.029,
        "sigmaSys": 0.225908,
        "lineCount": 8,
        "role": "RYA-935 evidence"
      },
      {
        "band": "H",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_h_rya1232",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.502,
        "sigma": 0.17923855964607616,
        "sigmaStat": 0.0354,
        "sigmaSys": 0.175708,
        "lineCount": 19,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.551,
        "sigma": 0.10693953712729451,
        "sigmaStat": 0.0878,
        "sigmaSys": 0.061051,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.637,
        "sigma": 0.25201040137264175,
        "sigmaStat": 0.1915,
        "sigmaSys": 0.16382,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.552,
        "sigma": 0.10660736342298315,
        "sigmaStat": 0.0874,
        "sigmaSys": 0.061044,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.551,
        "sigma": 0.10693953712729451,
        "sigmaStat": 0.0878,
        "sigmaSys": 0.061051,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.637,
        "sigma": 0.25201040137264175,
        "sigmaStat": 0.1915,
        "sigmaSys": 0.16382,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.594,
        "sigma": 0.09510567663919961,
        "sigmaStat": 0.0917,
        "sigmaSys": 0.025223,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.557,
        "sigma": 0.08304331277110759,
        "sigmaStat": 0.0791,
        "sigmaSys": 0.025286,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.607,
        "sigma": 0.07850007289168591,
        "sigmaStat": 0.0744,
        "sigmaSys": 0.025038,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "crires_plus",
        "holding": "solar_crires_plus_y_wide_rya1054",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.635,
        "sigma": 0.09245684617160592,
        "sigmaStat": 0.0889,
        "sigmaSys": 0.025398,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.467,
        "sigma": 0.06142743413166465,
        "sigmaStat": 0.01,
        "sigmaSys": 0.060608,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.514,
        "sigma": 0.061270560638858204,
        "sigmaStat": 0.01,
        "sigmaSys": 0.060449,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.471,
        "sigma": 0.060921334727663354,
        "sigmaStat": 0.01,
        "sigmaSys": 0.060095,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.523,
        "sigma": 0.06211425292153162,
        "sigmaStat": 0.01,
        "sigmaSys": 0.061304,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.558,
        "sigma": 0.06272920634760176,
        "sigmaStat": 0.01,
        "sigmaSys": 0.061927,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.46,
        "sigma": 0.088726924977709,
        "sigmaStat": 0.0689,
        "sigmaSys": 0.055904,
        "lineCount": 24,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.369,
        "sigma": 0.08627514358724649,
        "sigmaStat": 0.0618,
        "sigmaSys": 0.060201,
        "lineCount": 7,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.468,
        "sigma": 0.0918014601408932,
        "sigmaStat": 0.0719,
        "sigmaSys": 0.057078,
        "lineCount": 23,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.52,
        "sigma": 0.11677418379076772,
        "sigmaStat": 0.0945,
        "sigmaSys": 0.0686,
        "lineCount": 17,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.515,
        "sigma": 0.1321700831845089,
        "sigmaStat": 0.1059,
        "sigmaSys": 0.079083,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.555,
        "sigma": 0.10508459228640514,
        "sigmaStat": 0.0946,
        "sigmaSys": 0.045756,
        "lineCount": 17,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.493,
        "sigma": 0.10436960630854175,
        "sigmaStat": 0.0939,
        "sigmaSys": 0.045561,
        "lineCount": 17,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.548,
        "sigma": 0.10410835916966515,
        "sigmaStat": 0.0932,
        "sigmaSys": 0.046393,
        "lineCount": 17,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.598,
        "sigma": 0.10421163973376486,
        "sigmaStat": 0.0936,
        "sigmaSys": 0.045816,
        "lineCount": 17,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.478,
        "sigma": 0.0461514141170127,
        "sigmaStat": 0.01,
        "sigmaSys": 0.045055,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.525,
        "sigma": 0.04571513604923429,
        "sigmaStat": 0.01,
        "sigmaSys": 0.044608,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.481,
        "sigma": 0.045862491002997205,
        "sigmaStat": 0.01,
        "sigmaSys": 0.044759,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.533,
        "sigma": 0.04648339515353843,
        "sigmaStat": 0.01,
        "sigmaSys": 0.045395,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.569,
        "sigma": 0.04653515557081549,
        "sigmaStat": 0.01,
        "sigmaSys": 0.045448,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.517,
        "sigma": 0.08047374339497325,
        "sigmaStat": 0.0455,
        "sigmaSys": 0.066376,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.538,
        "sigma": 0.15764784923683545,
        "sigmaStat": 0.0885,
        "sigmaSys": 0.130463,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.508,
        "sigma": 0.08611467369153761,
        "sigmaStat": 0.0464,
        "sigmaSys": 0.072545,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.517,
        "sigma": 0.08047374339497325,
        "sigmaStat": 0.0455,
        "sigmaSys": 0.066376,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.538,
        "sigma": 0.15764784923683545,
        "sigmaStat": 0.0885,
        "sigmaSys": 0.130463,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.552,
        "sigma": 0.05251181414691364,
        "sigmaStat": 0.0463,
        "sigmaSys": 0.024775,
        "lineCount": 19,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.5,
        "sigma": 0.05876844923085856,
        "sigmaStat": 0.046,
        "sigmaSys": 0.036575,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.586,
        "sigma": 0.05936895324157231,
        "sigmaStat": 0.0457,
        "sigmaSys": 0.037897,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.622,
        "sigma": 0.05366469662636695,
        "sigmaStat": 0.0449,
        "sigmaSys": 0.029392,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.451,
        "sigma": 0.06047156621917445,
        "sigmaStat": 0.01,
        "sigmaSys": 0.059639,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.498,
        "sigma": 0.05920858184418877,
        "sigmaStat": 0.01,
        "sigmaSys": 0.058358,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.454,
        "sigma": 0.05939684672606787,
        "sigmaStat": 0.01,
        "sigmaSys": 0.058549,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.506,
        "sigma": 0.05913071825202193,
        "sigmaStat": 0.01,
        "sigmaSys": 0.058279,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.541,
        "sigma": 0.060131343208014235,
        "sigmaStat": 0.01,
        "sigmaSys": 0.059294,
        "lineCount": 1,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.495,
        "sigma": 0.06779594625787003,
        "sigmaStat": 0.0358,
        "sigmaSys": 0.057573,
        "lineCount": 18,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.368,
        "sigma": 0.1268441982275894,
        "sigmaStat": 0.0606,
        "sigmaSys": 0.111432,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.482,
        "sigma": 0.06015396259599196,
        "sigmaStat": 0.0333,
        "sigmaSys": 0.050096,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.495,
        "sigma": 0.06779594625787003,
        "sigmaStat": 0.0358,
        "sigmaSys": 0.057573,
        "lineCount": 18,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.368,
        "sigma": 0.1268441982275894,
        "sigmaStat": 0.0606,
        "sigmaSys": 0.111432,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.514,
        "sigma": 0.0721655658884485,
        "sigmaStat": 0.0522,
        "sigmaSys": 0.04983,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.478,
        "sigma": 0.07361405274130749,
        "sigmaStat": 0.0509,
        "sigmaSys": 0.053181,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.559,
        "sigma": 0.07384627763807732,
        "sigmaStat": 0.0511,
        "sigmaSys": 0.053311,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "NIR",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.577,
        "sigma": 0.06868223933448879,
        "sigmaStat": 0.0518,
        "sigmaSys": 0.0451,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.4771,
        "sigma": 0.05161676084374144,
        "sigmaStat": 0.0202,
        "sigmaSys": 0.0475,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.486,
        "sigma": 0.03390302293306601,
        "sigmaStat": 0.0255,
        "sigmaSys": 0.022342,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.523,
        "sigma": 0.04743480394183157,
        "sigmaStat": 0.0294,
        "sigmaSys": 0.037225,
        "lineCount": 18,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.532,
        "sigma": 0.03345024298865406,
        "sigmaStat": 0.0254,
        "sigmaSys": 0.021766,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.491,
        "sigma": 0.03353857816008306,
        "sigmaStat": 0.0255,
        "sigmaSys": 0.021785,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.577,
        "sigma": 0.03525653087018063,
        "sigmaStat": 0.0274,
        "sigmaSys": 0.022187,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.617,
        "sigma": 0.03461813911809819,
        "sigmaStat": 0.027,
        "sigmaSys": 0.021666,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.339,
        "sigma": 0.05250561874694936,
        "sigmaStat": 0.0328,
        "sigmaSys": 0.041,
        "lineCount": 109,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.35,
        "sigma": 0.05319971804436561,
        "sigmaStat": 0.0339,
        "sigmaSys": 0.041,
        "lineCount": 105,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.419,
        "sigma": 0.03329241596820513,
        "sigmaStat": 0.0241,
        "sigmaSys": 0.022969,
        "lineCount": 106,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.429,
        "sigma": 0.04598898617060393,
        "sigmaStat": 0.0247,
        "sigmaSys": 0.038793,
        "lineCount": 102,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "EW · 1D-LTE",
        "telluric": "not declared",
        "value": 7.498,
        "sigma": 0.11674013876983357,
        "sigmaStat": 0.0699,
        "sigmaSys": 0.0935,
        "lineCount": 6,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "EW · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.433,
        "sigma": 0.1200227061851215,
        "sigmaStat": 0.0772,
        "sigmaSys": 0.0919,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-B",
        "method": "",
        "displayName": "EW · 1D-LTE",
        "telluric": "not declared",
        "value": 7.431,
        "sigma": 0.12162442188968466,
        "sigmaStat": 0.0685,
        "sigmaSys": 0.1005,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.428,
        "sigma": 0.05294742646248257,
        "sigmaStat": 0.014,
        "sigmaSys": 0.051063,
        "lineCount": 171,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.5124,
        "sigma": 0.062339794674028254,
        "sigmaStat": 0.0236,
        "sigmaSys": 0.0577,
        "lineCount": 50,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.429,
        "sigma": 0.05973060864414492,
        "sigmaStat": 0.0158,
        "sigmaSys": 0.057603,
        "lineCount": 144,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.492,
        "sigma": 0.05130746752666711,
        "sigmaStat": 0.0141,
        "sigmaSys": 0.049332,
        "lineCount": 171,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.436,
        "sigma": 0.051703670894821384,
        "sigmaStat": 0.0138,
        "sigmaSys": 0.049828,
        "lineCount": 171,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.428,
        "sigma": 0.0322811712303008,
        "sigmaStat": 0.0177,
        "sigmaSys": 0.026996,
        "lineCount": 167,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.4996,
        "sigma": 0.048340148944743644,
        "sigmaStat": 0.0174,
        "sigmaSys": 0.0451,
        "lineCount": 100,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.439,
        "sigma": 0.04407379068108392,
        "sigmaStat": 0.0183,
        "sigmaSys": 0.040095,
        "lineCount": 157,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.491,
        "sigma": 0.03114975466998095,
        "sigmaStat": 0.0173,
        "sigmaSys": 0.025904,
        "lineCount": 167,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "harps",
        "holding": "solar_harps_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.441,
        "sigma": 0.0314835730024405,
        "sigmaStat": 0.0177,
        "sigmaSys": 0.026037,
        "lineCount": 167,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag_reiners2016",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.519,
        "sigma": 0.07844896736732741,
        "sigmaStat": 0.01,
        "sigmaSys": 0.077809,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag_reiners2016",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.529,
        "sigma": 0.08516495406562491,
        "sigmaStat": 0.017,
        "sigmaSys": 0.083451,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag_reiners2016",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.558,
        "sigma": 0.08000031230564039,
        "sigmaStat": 0.013,
        "sigmaSys": 0.078937,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag_reiners2016",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.53,
        "sigma": 0.07747623300729069,
        "sigmaStat": 0.0135,
        "sigmaSys": 0.076291,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag_reiners2016",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.615,
        "sigma": 0.08325706582026537,
        "sigmaStat": 0.017,
        "sigmaSys": 0.081503,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag_reiners2016",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.638,
        "sigma": 0.0844571060894227,
        "sigmaStat": 0.01,
        "sigmaSys": 0.083863,
        "lineCount": 2,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.5039,
        "sigma": 0.049722630662506186,
        "sigmaStat": 0.0147,
        "sigmaSys": 0.0475,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.452,
        "sigma": 0.048802628166933794,
        "sigmaStat": 0.017,
        "sigmaSys": 0.045746,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.46,
        "sigma": 0.05845068858448119,
        "sigmaStat": 0.0201,
        "sigmaSys": 0.054886,
        "lineCount": 16,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.49,
        "sigma": 0.04971317732754566,
        "sigmaStat": 0.0198,
        "sigmaSys": 0.0456,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.453,
        "sigma": 0.049747221279183025,
        "sigmaStat": 0.0174,
        "sigmaSys": 0.046605,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.533,
        "sigma": 0.05245900727234552,
        "sigmaStat": 0.0199,
        "sigmaSys": 0.048538,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.557,
        "sigma": 0.052413646400531984,
        "sigmaStat": 0.022,
        "sigmaSys": 0.047573,
        "lineCount": 20,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.384,
        "sigma": 0.06159831336164977,
        "sigmaStat": 0.025,
        "sigmaSys": 0.056297,
        "lineCount": 41,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.391,
        "sigma": 0.06263867482634032,
        "sigmaStat": 0.0274,
        "sigmaSys": 0.056328,
        "lineCount": 37,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "EW · 1D-LTE",
        "telluric": "not declared",
        "value": 7.498,
        "sigma": 0.09901600880665712,
        "sigmaStat": 0.0436,
        "sigmaSys": 0.0889,
        "lineCount": 5,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "EW · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.481,
        "sigma": 0.0877809204781996,
        "sigmaStat": 0.019,
        "sigmaSys": 0.0857,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.428,
        "sigma": 0.06469984458250266,
        "sigmaStat": 0.014,
        "sigmaSys": 0.063167,
        "lineCount": 131,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.5429,
        "sigma": 0.060870764739733636,
        "sigmaStat": 0.025,
        "sigmaSys": 0.0555,
        "lineCount": 39,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.426,
        "sigma": 0.07388241204102637,
        "sigmaStat": 0.0168,
        "sigmaSys": 0.071947,
        "lineCount": 103,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.489,
        "sigma": 0.06514736329276881,
        "sigmaStat": 0.0136,
        "sigmaSys": 0.063712,
        "lineCount": 131,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.433,
        "sigma": 0.06442300983344383,
        "sigmaStat": 0.0134,
        "sigmaSys": 0.063014,
        "lineCount": 131,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.391,
        "sigma": 0.05900228240500532,
        "sigmaStat": 0.0188,
        "sigmaSys": 0.055927,
        "lineCount": 81,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.5156,
        "sigma": 0.0474936837905842,
        "sigmaStat": 0.0186,
        "sigmaSys": 0.0437,
        "lineCount": 78,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.401,
        "sigma": 0.06450648823955618,
        "sigmaStat": 0.0201,
        "sigmaSys": 0.061295,
        "lineCount": 71,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.458,
        "sigma": 0.05696070119828231,
        "sigmaStat": 0.0183,
        "sigmaSys": 0.053941,
        "lineCount": 81,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.401,
        "sigma": 0.0598751208767047,
        "sigmaStat": 0.0183,
        "sigmaSys": 0.05701,
        "lineCount": 81,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.4713,
        "sigma": 0.04906668931158898,
        "sigmaStat": 0.0123,
        "sigmaSys": 0.0475,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.443,
        "sigma": 0.03878171797380822,
        "sigmaStat": 0.0154,
        "sigmaSys": 0.035593,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.462,
        "sigma": 0.05108501190173102,
        "sigmaStat": 0.0181,
        "sigmaSys": 0.047771,
        "lineCount": 18,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.484,
        "sigma": 0.039987263584796595,
        "sigmaStat": 0.0178,
        "sigmaSys": 0.035807,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.45,
        "sigma": 0.0391482959526976,
        "sigmaStat": 0.0159,
        "sigmaSys": 0.035774,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.531,
        "sigma": 0.04133844027052787,
        "sigmaStat": 0.0179,
        "sigmaSys": 0.037262,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.546,
        "sigma": 0.04174008894336475,
        "sigmaStat": 0.0198,
        "sigmaSys": 0.036745,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.329,
        "sigma": 0.03189382763169074,
        "sigmaStat": 0.018,
        "sigmaSys": 0.026329,
        "lineCount": 106,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.34,
        "sigma": 0.044619638546272426,
        "sigmaStat": 0.0187,
        "sigmaSys": 0.040512,
        "lineCount": 101,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "EW · 1D-LTE",
        "telluric": "not declared",
        "value": 7.445,
        "sigma": 0.09903216649149911,
        "sigmaStat": 0.0624,
        "sigmaSys": 0.0769,
        "lineCount": 13,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "EW · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.455,
        "sigma": 0.09993703017400507,
        "sigmaStat": 0.0665,
        "sigmaSys": 0.0746,
        "lineCount": 12,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B",
        "method": "",
        "displayName": "EW · 1D-LTE",
        "telluric": "not declared",
        "value": 7.479,
        "sigma": 0.09024837948683621,
        "sigmaStat": 0.0429,
        "sigmaSys": 0.0794,
        "lineCount": 9,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.41,
        "sigma": 0.05166138179530238,
        "sigmaStat": 0.0266,
        "sigmaSys": 0.044287,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.5046,
        "sigma": 0.06193173661379115,
        "sigmaStat": 0.0225,
        "sigmaSys": 0.0577,
        "lineCount": 50,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.411,
        "sigma": 0.058338611990687614,
        "sigmaStat": 0.0277,
        "sigmaSys": 0.051343,
        "lineCount": 59,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.488,
        "sigma": 0.06636053043790413,
        "sigmaStat": 0.0196,
        "sigmaSys": 0.0634,
        "lineCount": 67,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.439,
        "sigma": 0.06666273321729314,
        "sigmaStat": 0.0206,
        "sigmaSys": 0.0634,
        "lineCount": 67,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.541,
        "sigma": 0.06657063917373784,
        "sigmaStat": 0.0203,
        "sigmaSys": 0.0634,
        "lineCount": 67,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.562,
        "sigma": 0.06647977135941428,
        "sigmaStat": 0.02,
        "sigmaSys": 0.0634,
        "lineCount": 67,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.367,
        "sigma": 0.031082492885867438,
        "sigmaStat": 0.0155,
        "sigmaSys": 0.026942,
        "lineCount": 166,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.485,
        "sigma": 0.04773311219688069,
        "sigmaStat": 0.0162,
        "sigmaSys": 0.0449,
        "lineCount": 101,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.371,
        "sigma": 0.04315488571413439,
        "sigmaStat": 0.0159,
        "sigmaSys": 0.040119,
        "lineCount": 156,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.43,
        "sigma": 0.030398118774029422,
        "sigmaStat": 0.0152,
        "sigmaSys": 0.026325,
        "lineCount": 167,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.373,
        "sigma": 0.030543512060665193,
        "sigmaStat": 0.0154,
        "sigmaSys": 0.026377,
        "lineCount": 167,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.5037,
        "sigma": 0.049381170500505556,
        "sigmaStat": 0.0135,
        "sigmaSys": 0.0475,
        "lineCount": 21,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.455,
        "sigma": 0.03851682916596329,
        "sigmaStat": 0.0158,
        "sigmaSys": 0.035127,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.469,
        "sigma": 0.05060672509657189,
        "sigmaStat": 0.0187,
        "sigmaSys": 0.047025,
        "lineCount": 18,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.495,
        "sigma": 0.03963950666948316,
        "sigmaStat": 0.018,
        "sigmaSys": 0.035317,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.462,
        "sigma": 0.03888978633266066,
        "sigmaStat": 0.0163,
        "sigmaSys": 0.035309,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.542,
        "sigma": 0.041144695903603416,
        "sigmaStat": 0.0185,
        "sigmaSys": 0.036751,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.562,
        "sigma": 0.041908675426455565,
        "sigmaStat": 0.0201,
        "sigmaSys": 0.036774,
        "lineCount": 22,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.347,
        "sigma": 0.034156684616631044,
        "sigmaStat": 0.0178,
        "sigmaSys": 0.029152,
        "lineCount": 106,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.357,
        "sigma": 0.045822539824850385,
        "sigmaStat": 0.0184,
        "sigmaSys": 0.041966,
        "lineCount": 102,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "EW · 1D-LTE",
        "telluric": "not declared",
        "value": 7.463,
        "sigma": 0.09871788085245753,
        "sigmaStat": 0.0619,
        "sigmaSys": 0.0769,
        "lineCount": 13,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "EW · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.464,
        "sigma": 0.09973765587780775,
        "sigmaStat": 0.0662,
        "sigmaSys": 0.0746,
        "lineCount": 12,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.414,
        "sigma": 0.05078334230828058,
        "sigmaStat": 0.0248,
        "sigmaSys": 0.044316,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.5116,
        "sigma": 0.06182337745545774,
        "sigmaStat": 0.0222,
        "sigmaSys": 0.0577,
        "lineCount": 50,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.42,
        "sigma": 0.05867558777720084,
        "sigmaStat": 0.0258,
        "sigmaSys": 0.052699,
        "lineCount": 59,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.467,
        "sigma": 0.04897850876660089,
        "sigmaStat": 0.0241,
        "sigmaSys": 0.042639,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.415,
        "sigma": 0.05014764729276938,
        "sigmaStat": 0.0241,
        "sigmaSys": 0.043977,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.511,
        "sigma": 0.050508454896185453,
        "sigmaStat": 0.0239,
        "sigmaSys": 0.044496,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.548,
        "sigma": 0.048292326522958076,
        "sigmaStat": 0.0241,
        "sigmaSys": 0.041849,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.368,
        "sigma": 0.03145755554711777,
        "sigmaStat": 0.015,
        "sigmaSys": 0.027651,
        "lineCount": 167,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A-3DNLTE",
        "method": "",
        "displayName": "Synth · 3D-NLTE · Amarsi · lab-gf",
        "telluric": "not declared",
        "value": 7.4924,
        "sigma": 0.04763213201190978,
        "sigmaStat": 0.0159,
        "sigmaSys": 0.0449,
        "lineCount": 101,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.377,
        "sigma": 0.04381242336369903,
        "sigmaStat": 0.0155,
        "sigmaSys": 0.040979,
        "lineCount": 157,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.432,
        "sigma": 0.03027185493160272,
        "sigmaStat": 0.0149,
        "sigmaSys": 0.026351,
        "lineCount": 167,
        "role": "RYA-935 evidence"
      },
      {
        "band": "VIS",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.378,
        "sigma": 0.03028230125007015,
        "sigmaStat": 0.0149,
        "sigmaSys": 0.026363,
        "lineCount": 166,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.554,
        "sigma": 0.2395008956663837,
        "sigmaStat": 0.0608,
        "sigmaSys": 0.231655,
        "lineCount": 55,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.515,
        "sigma": 0.060640106233416174,
        "sigmaStat": 0.0561,
        "sigmaSys": 0.023022,
        "lineCount": 48,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.523,
        "sigma": 0.06763030711892412,
        "sigmaStat": 0.0561,
        "sigmaSys": 0.037771,
        "lineCount": 48,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.559,
        "sigma": 0.05057513144817322,
        "sigmaStat": 0.0494,
        "sigmaSys": 0.010839,
        "lineCount": 51,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.494,
        "sigma": 0.051623058762533626,
        "sigmaStat": 0.0494,
        "sigmaSys": 0.014986,
        "lineCount": 51,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.588,
        "sigma": 0.05463981626067204,
        "sigmaStat": 0.0539,
        "sigmaSys": 0.008961,
        "lineCount": 52,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.678,
        "sigma": 0.052923354022586286,
        "sigmaStat": 0.0521,
        "sigmaSys": 0.009299,
        "lineCount": 53,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.38,
        "sigma": 0.06575538499621152,
        "sigmaStat": 0.0607,
        "sigmaSys": 0.025284,
        "lineCount": 46,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.389,
        "sigma": 0.07226606849690938,
        "sigmaStat": 0.0607,
        "sigmaSys": 0.039216,
        "lineCount": 46,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.452,
        "sigma": 0.05093736169060978,
        "sigmaStat": 0.0471,
        "sigmaSys": 0.019396,
        "lineCount": 51,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.398,
        "sigma": 0.05071290787363706,
        "sigmaStat": 0.0479,
        "sigmaSys": 0.016655,
        "lineCount": 50,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.5,
        "sigma": 0.0515938525892378,
        "sigmaStat": 0.05,
        "sigmaSys": 0.012725,
        "lineCount": 51,
        "role": "RYA-935 evidence"
      },
      {
        "band": "near-UV",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.543,
        "sigma": 0.04474017259689551,
        "sigmaStat": 0.0432,
        "sigmaSys": 0.011638,
        "lineCount": 51,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.477,
        "sigma": 0.03798389179639179,
        "sigmaStat": 0.0326,
        "sigmaSys": 0.019494,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.505,
        "sigma": 0.056418531140042985,
        "sigmaStat": 0.0395,
        "sigmaSys": 0.040284,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.522,
        "sigma": 0.03354035218956414,
        "sigmaStat": 0.0273,
        "sigmaSys": 0.019485,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.48,
        "sigma": 0.038151594933894965,
        "sigmaStat": 0.0328,
        "sigmaSys": 0.019486,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.545,
        "sigma": 0.03965609002410601,
        "sigmaStat": 0.0342,
        "sigmaSys": 0.020074,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.576,
        "sigma": 0.035177465642083995,
        "sigmaStat": 0.0293,
        "sigmaSys": 0.019467,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.437,
        "sigma": 0.04108024597053918,
        "sigmaStat": 0.0196,
        "sigmaSys": 0.036103,
        "lineCount": 96,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.446,
        "sigma": 0.05951084744817537,
        "sigmaStat": 0.034,
        "sigmaSys": 0.048842,
        "lineCount": 46,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.479,
        "sigma": 0.042577756645929575,
        "sigmaStat": 0.0202,
        "sigmaSys": 0.037481,
        "lineCount": 95,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.437,
        "sigma": 0.044484460489029196,
        "sigmaStat": 0.0198,
        "sigmaSys": 0.039835,
        "lineCount": 96,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.424,
        "sigma": 0.04160028606872794,
        "sigmaStat": 0.0252,
        "sigmaSys": 0.033099,
        "lineCount": 67,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.422,
        "sigma": 0.06283713389390067,
        "sigmaStat": 0.0429,
        "sigmaSys": 0.045914,
        "lineCount": 33,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.454,
        "sigma": 0.042701689381100603,
        "sigmaStat": 0.0254,
        "sigmaSys": 0.034326,
        "lineCount": 66,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "iag_fts_solar_atlas",
        "holding": "solar_iag",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.423,
        "sigma": 0.048260094581341215,
        "sigmaStat": 0.0255,
        "sigmaSys": 0.040973,
        "lineCount": 66,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.46,
        "sigma": 0.03600889091599462,
        "sigmaStat": 0.0316,
        "sigmaSys": 0.017265,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.472,
        "sigma": 0.05286885847074817,
        "sigmaStat": 0.034,
        "sigmaSys": 0.040486,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.507,
        "sigma": 0.03148854663206925,
        "sigmaStat": 0.0264,
        "sigmaSys": 0.017163,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.464,
        "sigma": 0.03611630706481492,
        "sigmaStat": 0.0317,
        "sigmaSys": 0.017306,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.519,
        "sigma": 0.037458640071417436,
        "sigmaStat": 0.0333,
        "sigmaSys": 0.017154,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.562,
        "sigma": 0.033331466454388115,
        "sigmaStat": 0.0285,
        "sigmaSys": 0.017284,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.437,
        "sigma": 0.0333910824023421,
        "sigmaStat": 0.0133,
        "sigmaSys": 0.030628,
        "lineCount": 97,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.449,
        "sigma": 0.048230530787044014,
        "sigmaStat": 0.0168,
        "sigmaSys": 0.04521,
        "lineCount": 46,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.487,
        "sigma": 0.03592226852524768,
        "sigmaStat": 0.0139,
        "sigmaSys": 0.033124,
        "lineCount": 97,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.44,
        "sigma": 0.03283109477309582,
        "sigmaStat": 0.0134,
        "sigmaSys": 0.029972,
        "lineCount": 97,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.423,
        "sigma": 0.03384366116424167,
        "sigmaStat": 0.0165,
        "sigmaSys": 0.029549,
        "lineCount": 68,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.418,
        "sigma": 0.04751018943342575,
        "sigmaStat": 0.0177,
        "sigmaSys": 0.04409,
        "lineCount": 34,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.455,
        "sigma": 0.03651356575301843,
        "sigmaStat": 0.0166,
        "sigmaSys": 0.032522,
        "lineCount": 68,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_kurucz2005_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.421,
        "sigma": 0.03289858775084426,
        "sigmaStat": 0.0169,
        "sigmaSys": 0.028226,
        "lineCount": 66,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.449,
        "sigma": 0.038660291268949334,
        "sigmaStat": 0.0303,
        "sigmaSys": 0.024011,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.488,
        "sigma": 0.07188920820262246,
        "sigmaStat": 0.0372,
        "sigmaSys": 0.061516,
        "lineCount": 4,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.503,
        "sigma": 0.03445939699124173,
        "sigmaStat": 0.0249,
        "sigmaSys": 0.023821,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.451,
        "sigma": 0.03837455731340754,
        "sigmaStat": 0.0306,
        "sigmaSys": 0.023157,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-LTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-LTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.525,
        "sigma": 0.039710200200955934,
        "sigmaStat": 0.0323,
        "sigmaSys": 0.0231,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-mean3D-NLTE-gerber-stagger",
        "method": "",
        "displayName": "Synth · <3D>-NLTE · Gerber · stagger",
        "telluric": "not declared",
        "value": 7.554,
        "sigma": 0.03570939328804117,
        "sigmaStat": 0.0272,
        "sigmaSys": 0.023137,
        "lineCount": 11,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.413,
        "sigma": 0.03652765014341875,
        "sigmaStat": 0.0168,
        "sigmaSys": 0.032435,
        "lineCount": 66,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.403,
        "sigma": 0.05451573740673421,
        "sigmaStat": 0.0201,
        "sigmaSys": 0.050675,
        "lineCount": 33,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.454,
        "sigma": 0.1616132062549345,
        "sigmaStat": 0.0171,
        "sigmaSys": 0.160706,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.419,
        "sigma": 0.035375687470351726,
        "sigmaStat": 0.0165,
        "sigmaSys": 0.031292,
        "lineCount": 67,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "1D-LTE",
        "method": "",
        "displayName": "Synth · 1D-LTE",
        "telluric": "not declared",
        "value": 7.413,
        "sigma": 0.03652765014341875,
        "sigmaStat": 0.0168,
        "sigmaSys": 0.032435,
        "lineCount": 66,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-A",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Bergemann",
        "telluric": "not declared",
        "value": 7.403,
        "sigma": 0.05451573740673421,
        "sigmaStat": 0.0201,
        "sigmaSys": 0.050675,
        "lineCount": 33,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "ENGINE-B-NLTE",
        "method": "",
        "displayName": "Synth · 1D-NLTE · Gerber",
        "telluric": "not declared",
        "value": 7.454,
        "sigma": 0.1616132062549345,
        "sigmaStat": 0.0171,
        "sigmaSys": 0.160706,
        "lineCount": 65,
        "role": "RYA-935 evidence"
      },
      {
        "band": "red-optical",
        "instrument": "kpno_solar_atlas",
        "holding": "solar_kpno_molecfit_corrected",
        "engine": "synth-1D-LTE-gerber",
        "method": "",
        "displayName": "Synth · 1D-LTE · Gerber",
        "telluric": "not declared",
        "value": 7.419,
        "sigma": 0.035375687470351726,
        "sigmaStat": 0.0165,
        "sigmaSys": 0.031292,
        "lineCount": 67,
        "role": "RYA-935 evidence"
      }
    ],
    "coverageGrid": [
      {
        "instrument": "crires_plus",
        "band": "H",
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
        "band": "VIS",
        "state": "gap",
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
        "band": "red-optical",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "H",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "NIR",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "VIS",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "near-UV",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "iag_fts_solar_atlas",
        "band": "red-optical",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "kpno_solar_atlas",
        "band": "H",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "kpno_solar_atlas",
        "band": "NIR",
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
        "instrument": "harps",
        "band": "H",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "harps",
        "band": "NIR",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "harps",
        "band": "VIS",
        "state": "present",
        "range": ""
      },
      {
        "instrument": "harps",
        "band": "near-UV",
        "state": "gap",
        "range": ""
      },
      {
        "instrument": "harps",
        "band": "red-optical",
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
    "gitCommit": "f12a1b3d7cb347b8e8cf65eaeec96b4a5089a534",
    "productCommit": "37d4158a0359d7587d297c7be5f9084b6ed114c7",
    "goldVersion": "Fe_I=v5",
    "generatedAt": "2026-10-23T09:38:53+00:00"
  }
};
