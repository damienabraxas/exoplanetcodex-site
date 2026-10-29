"""RYA-1230: the site's C/N/O selection rule -- per-band top product and the Sun-table pick."""
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from cno_selection import best_in_band, headline, literature_headline, rank_key  # noqa: E402
from generate_cno_publication import band_highlights, landmark  # noqa: E402


def p(**kw):
    base = dict(element='N', ion='I', band='red-optical', holding='solar_iag',
                selector='SET-AGSS21', grade='Reference Grade', display='Synth · 1D-LTE',
                A=7.9, sigma_stat=0.02, sigma_syst=0.05, n_lines=4)
    base.update(kw)
    return base


class SelectionTests(unittest.TestCase):
    def test_3d_nlte_beats_a_tighter_1d_nlte(self):
        # The 8.189 defect: a 2-line 1D-NLTE row with the tightest bar headlined N.
        tight = p(display='Synth · 1D-NLTE · Bergemann', n_lines=2, sigma_syst=0.01, A=8.189)
        full = p(display='Synth · 3D-NLTE · Amarsi', n_lines=4, sigma_syst=0.10, A=7.886)
        self.assertIs(best_in_band([tight, full], 'red-optical'), full)

    def test_reference_grade_outranks_treatment(self):
        codex = p(grade='Codex Grade', selector=None, display='Synth · 3D-NLTE · Amarsi')
        ref = p(display='Synth · 1D-LTE')
        self.assertIs(best_in_band([codex, ref], 'red-optical'), ref)

    def test_more_lines_before_tighter_sigma(self):
        agss = p(display='Synth · 3D-NLTE · Amarsi', n_lines=4, sigma_syst=0.08)
        two = p(display='Synth · 3D-NLTE · Amarsi', n_lines=2, sigma_syst=0.02, selector='SET-LBP25')
        self.assertIs(best_in_band([two, agss], 'red-optical'), agss)

    def test_sun_table_prefers_vis_reference_grade(self):
        red = p(display='Synth · 3D-NLTE · Amarsi')
        vis = p(band='VIS', display='Synth · 1D-LTE', holding='solar_harps_molecfit_corrected')
        self.assertIs(headline([red, vis]), vis)

    def test_sun_table_falls_back_when_vis_has_no_reference_grade(self):
        red = p(display='Synth · 3D-NLTE · Amarsi')
        vis_codex = p(band='VIS', grade='Codex Grade', selector='FORB-OI_6300', n_lines=1)
        self.assertIs(headline([red, vis_codex]), red)

    def test_rejected_routes_never_headline(self):
        cn_red = p(band='VIS', selector='MOL-CN_red', n_lines=194)
        red = p()
        self.assertIs(headline([cn_red, red]), red)
        self.assertEqual([x['band'] for x in band_highlights([cn_red, red])], ['red-optical'])

    def test_appendix_uses_shared_nitrogen_family_combination(self):
        rows = [p(A=7.904), p(band='NIR', selector='MOL-CN_AX_IR', A=7.866, n_lines=244)]
        mark = landmark('N', rows)
        self.assertEqual(mark, literature_headline(rows, 'N'))
        self.assertAlmostEqual(mark['A'], 7.885)
        self.assertEqual(mark['missing'], ['NH'])
        # RYA-1317: half the separation (0.019) is only a floor; the propagated product
        # errors (hypot of two 0.054 bars / 2 = 0.038) are larger here and are quoted.
        self.assertAlmostEqual(mark['sigma'], (2 * (0.02 ** 2 + 0.05 ** 2)) ** 0.5 / 2, places=6)
        for row in rows:
            row['sigma_syst'] *= 2
        self.assertGreater(landmark('N', rows)['sigma'], mark['sigma'])

    def test_1d_families_combine_on_the_3d_scale_and_n_takes_the_larger_error(self):
        # RYA-1317: CN 1D 7.866 is 7.806 on Asplund's 3D scale; half the range (0.049) and
        # the propagated error (hypot(0.03, 0.09)/2 = 0.047) -- the larger is quoted.
        atom = p(display='Synth · 3D-NLTE · Amarsi', A=7.904, sigma_stat=0.03, sigma_syst=0.0)
        cn = p(selector='MOL-CN_AX_IR', band='NIR', A=7.866, sigma_stat=0.09, sigma_syst=0.0,
               asplund_3d_shift=-0.060)
        mark = literature_headline([atom, cn], 'N')
        self.assertAlmostEqual(mark['A'], (7.904 + 7.806) / 2, places=6)
        self.assertAlmostEqual(mark['sigma'], 0.049, places=6)
        self.assertEqual(cn['A'], 7.866)                     # the product itself never moves
        tight = dict(cn, A=7.904 + 0.060)                     # families agree exactly
        self.assertAlmostEqual(literature_headline([atom, tight], 'N')['sigma'],
                               (0.03 ** 2 + 0.09 ** 2) ** 0.5 / 2, places=6)

    def test_rank_is_deterministic_on_ties(self):
        a, b = p(holding='a'), p(holding='b')
        self.assertLess(rank_key(a), rank_key(b))


class LineSetTests(unittest.TestCase):
    """RYA-1233: Si/Al follow Asplund+2021's line-set recipe -- the whole set, on ONE spectrum."""

    def si(self, **kw):
        base = dict(element='Si', selector='SET-SI_AGSS21', display='Synth · 1D-NLTE · Amarsi',
                    holding='kp', band='VIS', ion='I', A=7.50, sigma_reported=0.08, n_lines=7)
        base.update(kw)
        return p(**base)

    def test_whole_set_on_one_spectrum_weighted(self):
        rows = [self.si(), self.si(band='red-optical', A=7.60, sigma_reported=0.16, n_lines=2),
                self.si(ion='II', display='Synth · 1D-LTE', A=7.52, sigma_reported=0.16, n_lines=1),
                self.si(holding='harps', A=7.0, sigma_reported=0.01)]   # covers 7 lines only
        m = literature_headline(rows, 'Si')
        self.assertEqual(m['kind'], 'line_set')
        self.assertEqual(m['n_lines'], 10)
        self.assertEqual({f['product']['holding'] for f in m['families']}, {'kp'})
        self.assertAlmostEqual(m['A'], (7.50 * 4 + 7.60 + 7.52) / 6, places=9)

    def test_best_treatment_per_band_and_ion(self):
        rows = [self.si(), self.si(display='Synth · 1D-LTE', A=7.53)]
        m = literature_headline(rows, 'Si')
        self.assertEqual(len(m['families']), 1)
        self.assertEqual(m['A'], 7.50)

    def test_no_recipe_falls_back_to_best_product(self):
        rows = [p(element='Na', selector='SET-OTHER')]
        self.assertIsNone(literature_headline(rows, 'Na'))
        self.assertEqual(landmark('Na', rows)['kind'], 'best_product')


if __name__ == '__main__':
    unittest.main()


class IonCombinationTests(unittest.TestCase):
    def mg(self, ion='I', **kw):
        return p(element='Mg', selector='SET-MG_AGSS21', ion=ion,
                 display='Synth · 3D-NLTE · Amarsi', **kw)

    def test_total_error_weighted_ion_means(self):
        rows = [self.mg(A=7.56, sigma_stat=.01, sigma_syst=.02),
                self.mg('II', A=7.52, sigma_stat=.03, sigma_syst=.03)]
        mark = literature_headline(rows, 'Mg')
        self.assertAlmostEqual(mark['A'], 7.551304347826087)
        self.assertEqual([x['family'] for x in mark['families']], ['Mg I', 'Mg II'])
        self.assertIn('Amarsi+2021 Eq. 3', mark['rule'])

    def test_missing_ion_never_becomes_a_combined_headline(self):
        rows = [self.mg('II')]
        self.assertIsNone(literature_headline(rows, 'Mg'))
        self.assertIsNone(landmark('Mg', rows))
        self.assertIsNone(headline(rows, 'Mg'))
        self.assertIsNotNone(best_in_band(rows, 'red-optical'))

    def test_lte_or_other_lines_do_not_fill_the_missing_ion(self):
        rows = [self.mg('II'), p(element='Mg', ion='I', selector='GRADED')]
        self.assertIsNone(landmark('Mg', rows))
        rows[1] = p(element='Mg', ion='I', selector='SET-MG_AGSS21')
        self.assertIsNone(landmark('Mg', rows))
