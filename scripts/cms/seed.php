<?php
/**
 * One-time seed: put the real Capital Tours programmes into WordPress so the
 * CMS has the agency's actual content, not lorem ipsum.
 *
 * Idempotent — matches on slug, so running it twice updates rather than
 * duplicates. After this, WordPress is the source of truth and the TS files
 * are the fallback.
 *
 * Run: wp eval-file seed.php
 */

$json = __DIR__ . '/content.json';
if (!file_exists($json)) { WP_CLI::error("content.json not found next to seed.php"); }
$data = json_decode(file_get_contents($json), true);

/** Write a Localized {fr,en,ar} object into base_fr / base_en / base_ar. */
function seed_loc($post_id, $base, $value) {
    if (!is_array($value)) { return; }
    foreach (['fr', 'en', 'ar'] as $lang) {
        if (isset($value[$lang])) {
            update_field($base . '_' . $lang, $value[$lang], $post_id);
        }
    }
}

/** Write a LocalizedList into a repeater whose sub-field is text_fr/en/ar. */
function seed_loc_list($post_id, $field, $value) {
    if (!is_array($value) || empty($value['fr'])) { return; }
    $rows = [];
    foreach ($value['fr'] as $i => $_) {
        $rows[] = [
            'text_fr' => $value['fr'][$i] ?? '',
            'text_en' => $value['en'][$i] ?? '',
            'text_ar' => $value['ar'][$i] ?? '',
        ];
    }
    update_field($field, $rows, $post_id);
}

function seed_upsert($type, $slug, $title) {
    $existing = get_posts([
        'post_type'   => $type,
        'name'        => $slug,
        'post_status' => ['publish', 'draft'],
        'numberposts' => 1,
    ]);
    if ($existing) {
        $id = $existing[0]->ID;
        wp_update_post(['ID' => $id, 'post_title' => $title]);
        return [$id, 'updated'];
    }
    return [wp_insert_post([
        'post_type'   => $type,
        'post_name'   => $slug,
        'post_title'  => $title,
        'post_status' => 'publish',
    ]), 'created'];
}

// ------------------------------------------------------------------ tours
foreach ($data['tours'] as $t) {
    list($id, $how) = seed_upsert('programme', $t['slug'], $t['title']['fr']);

    update_field('type', 'voyage', $id);
    update_field('price', $t['price'], $id);
    update_field('title_en', $t['title']['en'], $id);
    update_field('title_ar', $t['title']['ar'], $id);

    seed_loc($id, 'subtitle',    $t['subtitle']);
    seed_loc($id, 'duration',    $t['duration']);
    seed_loc($id, 'dates_label', $t['dates']);
    if (!empty($t['priceNote'])) { seed_loc($id, 'price_note', $t['priceNote']); }

    // region is a key in the code; give the CMS a readable word per language
    $regions = [
        'Asie'        => ['fr' => 'Asie', 'en' => 'Asia', 'ar' => 'آسيا'],
        'Europe'      => ['fr' => 'Europe', 'en' => 'Europe', 'ar' => 'أوروبا'],
        'Afrique'     => ['fr' => 'Afrique', 'en' => 'Africa', 'ar' => 'إفريقيا'],
        'Ameriques'   => ['fr' => 'Amériques', 'en' => 'The Americas', 'ar' => 'الأمريكتان'],
        'MoyenOrient' => ['fr' => 'Moyen-Orient', 'en' => 'Middle East', 'ar' => 'الشرق الأوسط'],
    ];
    if (isset($regions[$t['region']])) { seed_loc($id, 'region', $regions[$t['region']]); }

    if (!empty($t['included']))    { seed_loc_list($id, 'included', $t['included']); }
    if (!empty($t['notIncluded'])) { seed_loc_list($id, 'not_included', $t['notIncluded']); }

    if (!empty($t['itinerary'])) {
        $rows = [];
        foreach ($t['itinerary'] as $leg) {
            $rows[] = [
                'day'      => $leg['day']['fr'] ?? '',
                'title_fr' => $leg['place']['fr'] ?? '',
                'title_en' => $leg['place']['en'] ?? '',
                'title_ar' => $leg['place']['ar'] ?? '',
            ];
        }
        update_field('itinerary', $rows, $id);
    }

    WP_CLI::log("  programme {$how}: {$t['slug']}");
}

// ------------------------------------------------------- pilgrimage (omra)
foreach ($data['pilgrimage'] as $p) {
    list($id, $how) = seed_upsert('omra', $p['slug'], $p['title']['ar']);

    update_field('category', $p['kind'] === 'hajj' ? 'hajj' : 'omra', $id);
    update_field('title_fr', $p['title']['fr'], $id);
    update_field('title_en', $p['title']['en'], $id);

    seed_loc($id, 'short_title',  $p['shortTitle']);
    seed_loc($id, 'price_from',   $p['priceFrom']);
    seed_loc($id, 'duration',     $p['duration']);
    seed_loc($id, 'flight',       $p['flight']);
    seed_loc($id, 'flight_route', $p['flightRoute']);

    if (!empty($p['dates']['fr'])) {
        $rows = [];
        foreach ($p['dates']['fr'] as $i => $_) {
            $rows[] = [
                'label_fr' => $p['dates']['fr'][$i] ?? '',
                'label_en' => $p['dates']['en'][$i] ?? '',
                'label_ar' => $p['dates']['ar'][$i] ?? '',
            ];
        }
        update_field('dates', $rows, $id);
    }

    if (!empty($p['includes'])) { seed_loc_list($id, 'includes', $p['includes']); }
    if (!empty($p['notes']))    { seed_loc_list($id, 'notes', $p['notes']); }

    if (!empty($p['tables'])) {
        $tables = [];
        foreach ($p['tables'] as $tb) {
            $rows = [];
            foreach ($tb['rows'] as $r) {
                $rows[] = [
                    'label_fr'     => $r['label']['fr'] ?? '',
                    'label_en'     => $r['label']['en'] ?? '',
                    'label_ar'     => $r['label']['ar'] ?? '',
                    'sub_label_fr' => $r['sub']['fr'] ?? '',
                    'sub_label_en' => $r['sub']['en'] ?? '',
                    'sub_label_ar' => $r['sub']['ar'] ?? '',
                    'quad'         => $r['quad'] ?? '',
                    'triple'       => $r['triple'] ?? '',
                    'double'       => $r['double'] ?? '',
                ];
            }
            $tables[] = [
                'name_fr' => $tb['name']['fr'] ?? '',
                'name_en' => $tb['name']['en'] ?? '',
                'name_ar' => $tb['name']['ar'] ?? '',
                'tag_fr'  => $tb['tag']['fr'] ?? '',
                'tag_en'  => $tb['tag']['en'] ?? '',
                'tag_ar'  => $tb['tag']['ar'] ?? '',
                'rows'    => $rows,
            ];
        }
        update_field('tables', $tables, $id);
    }

    WP_CLI::log("  omra {$how}: {$p['slug']}");
}

WP_CLI::success(sprintf(
    'seeded %d programmes and %d pilgrimage programmes',
    count($data['tours']),
    count($data['pilgrimage'])
));
