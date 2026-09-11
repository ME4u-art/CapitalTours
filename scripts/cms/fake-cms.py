# -*- coding: utf-8 -*-
"""A two-endpoint stand-in for capital-cms, so the WordPress path can be
exercised while LocalWP is stopped. Serves the same JSON shape wp/v2 does."""
import json, http.server, socketserver

PROGRAMMES = [
    {   # same slug as a bundled tour: exercises the per-field local fallback
        "slug": "maldives-sri-lanka",
        "title": {"rendered": "Maldives &#038; Sri Lanka REVISED"},
        "acf": {
            "title_en": "Maldives & Sri Lanka (edited)",
            "title_ar": "المالديف وسريلانكا",
            "subtitle_fr": "Sous-titre depuis le CMS",
            "subtitle_en": "Subtitle from the CMS",
            "subtitle_ar": "عنوان فرعي من النظام",
            "duration_fr": "15 jours",
            "price": "31 000 dh",
            "region_fr": "Asie", "region_en": "Asia", "region_ar": "آسيا",
            "included": [{"text_fr": "Vol A/R", "text_en": "Return flight", "text_ar": "رحلة ذهاب وإياب"}],
            "itinerary": [{"day": "J1", "title_fr": "Casablanca", "title_en": "Casablanca", "title_ar": "الدار البيضاء"}],
        },
    },
    {   # CMS-only programme, no bundled twin, and a region word not a key
        "slug": "istanbul-cms",
        "title": {"rendered": "Istanbul depuis le CMS"},
        "acf": {
            "title_en": "Istanbul from the CMS",
            "title_ar": "إسطنبول",
            "subtitle_fr": "Bosphore & bazars",
            "duration_fr": "7 jours",
            "dates_label_fr": "Du 3 au 10 mai",
            "price": "9 900 dh",
            "region_fr": "Moyen-Orient", "region_en": "Middle East", "region_ar": "الشرق الأوسط",
        },
    },
]

OMRA = [
    {
        "slug": "omra-2026",
        "title": {"rendered": "برنامج العمرة من النظام"},
        "acf": {
            "category": "omra",
            "title_fr": "Omra depuis le CMS",
            "title_en": "Umrah from the CMS",
            "short_title_fr": "Omra 2026",
            "price_from_fr": "21 500 dh",
            "duration_fr": "15 jours",
            "description_ar": "السطر الأول\nالسطر الثاني",
            "dates": [{"label_fr": "12 mars", "label_en": "12 March", "label_ar": "12 مارس"}],
            "includes": [{"text_fr": "Visa", "text_en": "Visa", "text_ar": "التأشيرة"}],
            "tables": [{
                "name_fr": "Prix par personne", "name_ar": "السعر للفرد",
                "rows": [{"label_fr": "Hôtel 4★", "label_ar": "فندق 4 نجوم",
                          "quad": "21 500", "triple": "23 000", "double": "25 500"}],
            }],
        },
    },
]

ROUTES = {"/wp-json/wp/v2/programmes": PROGRAMMES, "/wp-json/wp/v2/omra-programmes": OMRA}


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        body = ROUTES.get(self.path.split("?")[0])
        payload = json.dumps(body if body is not None else {"code": "not_found"}).encode()
        self.send_response(200 if body is not None else 404)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *a):
        pass


with socketserver.TCPServer(("127.0.0.1", 9788), Handler) as srv:
    print("fake cms on http://127.0.0.1:9788", flush=True)
    srv.serve_forever()
