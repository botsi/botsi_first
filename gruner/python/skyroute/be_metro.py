# -*- coding: utf-8 -*-
be_metro = {
    'Weissenbühl': set(['Beaumont']),
    'Beaumont': set(['Eigerplatz', 'Weissenbühl']),
    'Eigerplatz': set(['Monbijou', 'Weissensteinstrasse', 'Hasler', 'Beaumont']),
    'Hasler': set(['Kocherpark', 'Eigerplatz']),
    'Kocherpark': set(['Hirschengraben', 'Kaufmannischer Verband', 'Hasler']),
    'Hirschengraben': set(['Bern Bahnhof ', 'Monbijou', 'Kocherpark']),
    'Bern Bahnhof': set(['Hirschengraben', 'Monbijou', 'Barenplatz']),
    'Barenplatz': set(['Bern Bahnhof']),
    'Weissensteinstrasse': set(['Eigerplatz']),
    'Kaufmannischer Verband': set(['Kocherpark']),
    'Monbijou': set(['Hirschengraben', 'Eigerplatz', 'Bern Bahnhof'])
}
