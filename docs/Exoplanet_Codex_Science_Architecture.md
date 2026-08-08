# The Exoplanet Codex Science Architecture

Version 2.1 draft · August 2026

## What this document is

This document explains how the Exoplanet Codex decides which scientific results it can trust. It covers the checks between measurement engines, the rules for promoting a result, and the ledgers that preserve the record.

The audience is a smart reader who is new to the topic. Pipeline details appear only when they explain a scientific safeguard. Star-specific abundance values belong in that star’s Science Product Package, not here.

## 1. The two-engine floor

A result from one measurement engine can be internally consistent and still be wrong. The Codex therefore runs two independent engines for every element that has a validated model atom. Their agreement is an honesty check that neither engine can provide alone.

Engine A is the 1D-NLTE production path. It measures an equivalent width or uses synthesis-v2, then applies a per-line NLTE correction from a one-dimensional correction table.

Engine B performs NLTE synthesis inside Turbospectrum with the Gerber 2023 deck. It uses native departure coefficients for each line where a validated atom exists.

`pipeline/engine_selection.py:select_element` compares the engines line by line. When both engines provide acceptable measurements, the element-level result uses inverse-variance weighting. The weighting gives more influence to the more precise measurement. It does not erase disagreement.

Cross-engine spread remains a separate diagnostic. `CROSS_ENGINE_MIX_GATE` raises when the per-line winners produce a material conflict at the element level. The pipeline also stops if a required NLTE grid is missing. It never falls back silently to LTE.

## 2. The three-gate promotion

An element does not become `gold` because one comparison looks good. Promotion requires three independent checks.

Gate 1 tests whether Engine B recovers the external INSPECT or Amarsi anchor within 0.05 dex. Gate 2 applies the validate-don’t-tune firewall to the model atom. Gate 3 checks whether the absolute cross-engine difference, |dCE|, lies within the ratified band for the two-engine artifact.

The rule is strict. All three gates must pass. A missing gate is a failure, not an abstention.

## 3. Ratified freeze tiers

Every element has one of three freeze tiers.

- `gold` means the value is approved and frozen in the active reference.
- `owed` means work or approval remains before the value can be frozen.
- `data-gap` means no value has been measured.

The `owed` tier carries an important distinction. `owed-HELD` means the verdict contains a measured value that has not been promoted. `owed-BLANK` means no measured value exists. Treating these states as the same would hide real work and misstate the evidence.

Ryan ratifies each element’s tier. The pipeline enforces that decision; it does not make it. This discipline keeps a disputed or incomplete value out of an immutable reference.

## 4. The blank-cause honesty tripwire

A historical failure mode allowed a verdict row to say that no independent-gf line survived even when the tracker recorded surviving lines and a measured value. The text made a real measurement look blank.

`pipeline/provenance_honesty.py:_assert_blank_cause_is_honest` rejects that contradiction. The phase_c verdict emitter and the gold-reference builder both call the same guard.

This design makes the bad state unrepresentable. Detecting drift after publication would be weaker because the false claim could already have entered a frozen artifact.

## 5. The disposition report

The disposition report is the final straggler sweep before a freeze. It reads the phase_c verdict, gold reference, two-engine artifact, and element status tracker. It then assigns each element one disposition: PASS held, PASS candidate, provisional flip, owed with cause, or data-gap.

The report is machine-generated at `data/audit/element_disposition_report.json`. Analysts do not edit it. The generator runs before every freeze so unresolved elements are visible before the reference becomes immutable.

## 6. The generated element status tracker

The element status tracker was once edited by hand. That design allowed the table to drift away from the evidence it summarized.

The tracker is now generated from the phase_c verdict, `config/physics_regime_rya400.yaml`, and `data/audit/element_status_tracker_editorial.yaml`. The physics-regime file tells the generator whether an element should be measured through equivalent widths or synthesis. The editorial sidecar holds approved human context without turning the generated CSV into a hand-maintained ledger.

The tracker has an explicit `verdict` column. This keeps the scientific verdict separate from the freeze tier. A `--check` run compares the committed file with a fresh generation. Any hand edit becomes a build failure.

## 7. The four-noun naming convention

A state artifact’s filename should reveal how it may change.

- A Catalog is a master enumeration, such as `system_catalog.csv` or `instrument_catalog.csv`.
- A Register holds mutable state facts, such as `CODEX_STATE_REGISTER.md`.
- A Tracker records work or progress, such as `element_status_tracker.csv`.
- A Reference holds frozen, validated truth, such as `solar_abundances_vN.csv`.

`SEQUENCE.md` is a narrative overlay. It is a peer to these artifacts but not a fifth state noun. “Gold” is reserved for a Reference modifier. This vocabulary lets a reader infer mutability before opening a file.

## 8. The read-set discipline

Every working session begins with `LEDGERS.md`. That startup index points to the register, tracker, catalogs, holdings manifest, and `SEQUENCE.md`.

`SEQUENCE.md` records merged tickets in reverse chronological order. It explains what each change unblocked. `CODEX_STATE_REGISTER.md` records the current engineering state and changes with every state-changing pull request.

The register-freshness guard blocks a pull request that changes a state surface without updating the register. The ledger-consistency guard compares the tracker, verdict, and gold reference. It reports undocumented disagreements in continuous integration and becomes blocking at merge.

## 9. Sirius-only compute and continuous integration

Sirius, an HP ProBook 450 running the project’s reference software stack, is the authoritative production runner. Abundance computations run there. The Mac is for research, development, and pull-request review.

Continuous integration also runs on the Sirius self-hosted runner. Twenty-four test files require iSpec. Ephemeral runners therefore fail 22 percent of the suite. `CI/test` is a required check before a pull request can merge to `main`.

All changes reach `main` through a gated pull request. The repository uses merge commits. Squash and rebase merges are disabled so the landing record remains explicit.

## 10. The validate-don’t-tune firewall

A model atom or correction grid must never be tuned to reproduce a trusted anchor. The physics must produce the anchor. The anchor is the test, not the target.

Ionization balance can sometimes stop on precision even when the value is corroborated. The corroboration-accept standing rule provides a bounded alternative with five required criteria. It does not weaken the firewall.

Model vintage matters because older “dedicated” atoms may use a scaled-Drawin hydrogen-collision recipe. Newer ab-initio recipes calculate that physics directly. Titanium and manganese moved to ab-initio atoms after the vintage audit. Iron, calcium, chromium, barium, and strontium remain on scaled-Drawin atoms with explicit annotations because the current effect is benign or not material. A vintage label is evidence, not a reason to reject an atom by itself.

Corrections also carry idempotency guards. A correction that has already been applied must be recognized as complete. Re-running the pipeline cannot apply it twice.

## Document boundaries

The Science Architecture describes framework-level decisions. The Method page describes the general measurement pipeline. The Glossary defines terms. A star’s Science Product Package carries its values, diagnostics, and caveats.

This draft changes the framework documentation only. It does not change the Method page, publish a release, or alter a frozen scientific value.
