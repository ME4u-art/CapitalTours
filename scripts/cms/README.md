# Seeding the Capital Tours CMS

One-time scripts that put the agency's real programmes into a fresh
WordPress, so the CMS starts with actual content instead of nothing.

Run them once per new WordPress (local, staging, or the client's cPanel).
After that **WordPress is the source of truth** — re-running only overwrites
what these scripts manage, matched on slug, so it will undo edits made in
wp-admin. Don't run it again unless that's what you want.

## What the CMS needs first

- The `Secure Custom Fields` plugin, activated
- `travel-cms.php` (v1.1.0 or later) in `wp-content/mu-plugins/`
- Permalinks set to "Post name", otherwise `/wp-json/...` 404s

## 1. Pull the content out of the TS files

```bash
node scripts/cms/extract-content.mjs
```

Reads `src/lib/tours.ts` and `src/lib/pilgrimage.ts` and writes
`content.json` next to itself. It strips the image and type imports, which
cannot resolve outside Vite, and substitutes each image's filename.

Regenerate this whenever the TS files are still the source of truth. Once
the client is editing in wp-admin, don't — it would overwrite their work.

## 2. Push it into WordPress

```bash
wp --path="<site>/app/public" eval-file scripts/cms/seed.php
```

Creates or updates a `programme` per tour and an `omra` per pilgrimage
programme, filling `_fr` / `_en` / `_ar` on every translatable field and a
single value for prices, so a price change stays one edit.

### On Windows with LocalWP

LocalWP ships both PHP and wp-cli, but its CLI PHP has no MySQL extension
and does not know which port the site's MySQL listens on. Point it at an
ini that supplies both:

```ini
extension_dir = "%APPDATA%\Local\lightning-services\php-8.2.29+0\bin\win64\ext"
extension = php_mysqli.dll
extension = php_mbstring.dll
mysqli.default_host = 127.0.0.1
mysqli.default_port = 10012      ; the site's MySQL port, from sites.json
```

```bash
php -c wpcli.ini wp-cli.phar --path="<site>/app/public" eval-file seed.php
```

Do **not** fix this by editing the site's `wp-config.php` — LocalWP owns
that file and serves the site through a socket that `localhost` resolves to.

## Checking it worked

```bash
curl -s "http://capital-cms.local/wp-json/wp/v2/programmes?per_page=10"
curl -s "http://capital-cms.local/wp-json/wp/v2/omra-programmes?per_page=10"
```

Each programme should carry `subtitle_fr`, `subtitle_en`, `subtitle_ar` and
a single `price`. The pilgrimage route is `omra-programmes`, not `omra`.

## Pointing the site at the CMS

The site reads its programmes from WordPress when `VITE_CMS_URL` is set, and
from the bundled TypeScript files when it isn't. Unset is the default, so a
fresh clone and every build without a CMS keep working.

```bash
echo "VITE_CMS_URL=http://capital-cms.local" > .env.local   # gitignored
npm run dev
```

On Vercel, set the same variable in the project's environment settings.

If the CMS is unreachable the site logs a warning and serves the bundled
programmes instead — a WordPress that is down does not take the site down.

Fields the CMS has no home for yet — a programme's photo, the pilgrimage
badges and intro — fall back to the bundled record with the same slug, so the
client edits text and prices while the design assets stay in the repo.

## Checking the wiring without WordPress

`fake-cms.py` serves the same two endpoints from a fixture, so the WordPress
path can be exercised while LocalWP is stopped:

```bash
python scripts/cms/fake-cms.py                    # serves on 127.0.0.1:9788
echo "VITE_CMS_URL=http://127.0.0.1:9788" > .env.local
npm run dev
```

`/fr/voyages` should then show "Maldives & Sri Lanka REVISED" and a programme
called "Istanbul depuis le CMS" that filters under Moyen-Orient. Stop the
script and reload: the bundled programmes come back and `/fr/voyages/istanbul-cms`
404s. Delete `.env.local` when you're done.
