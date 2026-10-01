"""RYA-1230: the site's C/N/O selection rule -- per-band top product and the Sun-table pick."""
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from cno_selection import best_in_band, headline, rank_key  # noqa: E402
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

    def test_appendix_and_sun_table_share_one_pick(self):
        rows = [p(), p(band='VIS'), p(band='NIR', selector='MOL-CN_AX_IR', n_lines=244)]
        self.assertIs(landmark('N', rows), headline(rows))

    def test_rank_is_deterministic_on_ties(self):
        a, b = p(holding='a'), p(holding='b')
        self.assertLess(rank_key(a), rank_key(b))


if __name__ == '__main__':
    unittest.main()
