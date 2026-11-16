"""RYA-1351: a Theoretical Codex product (theoretical gf, no published uncertainty) ranks after
every laboratory-based grade and never enters an element's headline."""
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from cno_selection import anchor_product, best_in_band, headline  # noqa: E402
from generate_cno_publication import grades_section  # noqa: E402


def p(**kw):
    base = dict(element='Cr', ion='I', band='NIR', holding='solar_kpno_molecfit_corrected',
                instrument='kpno_solar_atlas', selector='GRADED', grade='Codex Grade',
                display='Synth · 3D-NLTE', A=5.7, sigma_stat=0.02, sigma_syst=0.05, n_lines=4)
    base.update(kw)
    return base


THEORY = dict(grade='Theoretical Codex', selector='SET-CR_ELGUETA2026')


class TheoreticalCodexTests(unittest.TestCase):
    def test_ranks_after_a_lab_grade_even_with_a_better_treatment_and_more_lines(self):
        lab = p(display='Synth · 1D-LTE', n_lines=2, sigma_syst=0.2)
        theory = p(**THEORY, n_lines=7, sigma_syst=0.01)
        self.assertIs(best_in_band([theory, lab], 'NIR'), lab)

    def test_still_shown_where_a_band_has_nothing_else(self):
        theory = p(**THEORY)
        self.assertIs(best_in_band([theory], 'NIR'), theory)

    def test_never_the_headline(self):
        theory = p(**THEORY, band='VIS', holding='solar_harps_molecfit_corrected',
                   instrument='harps')
        self.assertIsNone(headline([theory], 'Cr'))
        self.assertIsNone(anchor_product([theory], 'Cr'))
        lab = p(band='red-optical', grade='Reference Grade', selector='REFERENCE')
        self.assertIs(headline([theory, lab], 'Cr'), lab)

    def test_grade_table_lists_it_only_where_present(self):
        self.assertNotIn('Theoretical Codex', grades_section('Cr', [p()]))
        html = grades_section('Cr', [p(), p(**THEORY)])
        self.assertIn('Theoretical Codex', html)
        self.assertIn('one of four grades', html)


if __name__ == '__main__':
    unittest.main()
