# -*- coding: utf-8 -*-
# Copyright 2026 Tigrine - Tigrine Abdel Nasser

{
    'name': 'Direct Print Preview',
    'version': '20.0.0.1.0',
    'category': 'Tools',
    'summary': 'Open browser print dialog directly for reports, avoiding automatic PDF download',
    'description': """
     This module changes the default Odoo report printing behavior.
     Instead of downloading a PDF file that clutters your Downloads folder,
     the browser's native print dialog opens automatically.
      No configuration needed – just install and enjoy a cleaner workflow.
    """,

    'author': 'tigrine',
    'company': 'tigrine',
    'maintainer': 'tigrine',
    'website': 'https://github.com/nacer2015',
    'countries': ['dz'],

    'depends': ['web'],
    'assets': {
        'web.assets_backend': [
            'tigrine_direct_print_preview/static/src/js/pdf_preview.js',
        ],
    },

    'installable': True,
    'application': False,
    'auto_install': True,

    'license': 'LGPL-3',
    'images': ['static/description/banner.png'],
}
