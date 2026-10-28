"""Asplund, Amarsi & Grevesse 2021, A&A 653, A141, Table 2: present-day solar
photospheric abundances (value, uncertainty), transcribed from the published PDF
(page 5). This is the site's one reference scale. The science repo's gold record
(solar_abundances_v*.csv `asplund2021`) is NOT used: it carries Na 6.24 and Li 1.05,
which are not the Table 2 values (6.22, 0.96).
"""
TABLE2 = {
    'Li': (0.96, 0.06), 'C': (8.46, 0.04), 'N': (7.83, 0.07), 'O': (8.69, 0.04),
    'Na': (6.22, 0.03), 'Mg': (7.55, 0.03), 'Al': (6.43, 0.03), 'Si': (7.51, 0.03),
    'P': (5.41, 0.03), 'S': (7.12, 0.03), 'K': (5.07, 0.03), 'Ca': (6.30, 0.03),
    'Sc': (3.14, 0.04), 'Ti': (4.97, 0.05), 'V': (3.90, 0.08), 'Cr': (5.62, 0.04),
    'Mn': (5.42, 0.06), 'Fe': (7.46, 0.04), 'Co': (4.94, 0.05), 'Ni': (6.20, 0.04),
    'Cu': (4.18, 0.05), 'Zn': (4.56, 0.05), 'Sr': (2.83, 0.06), 'Y': (2.21, 0.05),
    'Zr': (2.59, 0.04), 'Ba': (2.27, 0.05), 'Eu': (0.52, 0.04),
}
