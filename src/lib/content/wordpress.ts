/**
 * WordPress provider — reads the programmes from the agency's headless CMS.
 *
 * Server contract (wp-content/mu-plugins/travel-cms.php registers all of it):
 *   - CPT `programme`, REST base `programmes`
 *   - CPT `omra`,      REST base `omra-programmes`
 *   - every text a visitor reads is stored once per language, as
 *     `subtitle_fr` / `subtitle_en` / `subtitle_ar`
 *   - prices, slugs and images are stored once, untranslated
 *
 * Two deliberate choices:
 *
 * 1. Fields stay `Localized`. The CMS already holds all three languages, so
 *    the provider hands the whole object over and the pages keep calling
 *    `pick()` exactly as they did against the TS files.
 *
 * 2. Anything the CMS has no field for — a programme's photo, the badges, the
 *    intro — falls back to the bundled record with the same slug. The client
 *    edits text and prices in wp-admin; the design assets keep coming from the
 *    repo until someone gives them a home in the CMS.
 */
import { IMG, type Tour, type Region, REGIONS } from "@/lib/tours";
import type { PilgrimageProgram, PriceRow } from "@/lib/pilgrimage";
import { featuredTours } from "@/lib/tours";
import { pilgrimagePrograms } from "@/lib/pilgrimage";
import { LOCALES, type Localized, type LocalizedList } from "@/i18n";
import type { ContentProvider } from "./provider";
import { localProvider } from "./local";

type WpPost = {
  slug: string;
  title: { rendered: string };
  acf?: Record<string, unknown>;
  _embedded?: { "wp:featuredmedia"?: { source_url?: string }[] };
};

// ——— safe readers (ACF returns false / null / "" for an empty field) ———

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const rows = (v: unknown): Record<string, unknown>[] =>
  Array.isArray(v) ? (v as Record<string, unknown>[]) : [];

/** WP renders post titles as HTML — a typed apostrophe arrives as `&#8217;`. */
const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&#038;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8211;": "–",
  "&#8212;": "—",
  "&#8230;": "…",
  "&nbsp;": " ",
  "&lt;": "<",
  "&gt;": ">",
};
const decode = (s: string): string =>
  s.replace(/&(?:amp|#038|quot|#039|#8217|#8216|#8211|#8212|#8230|nbsp|lt|gt);/g, (m) => ENTITIES[m] ?? m);

/**
 * Read `base_fr` / `base_en` / `base_ar` into one Localized.
 *
 * A language the client hasn't filled in yet falls back to `fallback` — the
 * bundled wording — and only then to French, so a half-translated programme
 * reads in *some* language instead of showing a gap.
 */
function loc(acf: Record<string, unknown>, base: string, fallback?: Localized): Localized {
  const out = {} as Localized;
  for (const lang of LOCALES) {
    out[lang] = str(acf[`${base}_${lang}`]) || fallback?.[lang] || "";
  }
  const first = LOCALES.find((l) => out[l]);
  if (first) for (const lang of LOCALES) out[lang] ||= out[first];
  return out;
}

/** Same, for a repeater whose translated sub-field is `<sub>_fr|_en|_ar`. */
function locList(acf: Record<string, unknown>, field: string, sub: string, fallback?: LocalizedList): LocalizedList {
  const list = rows(acf[field]);
  if (!list.length) return fallback ?? { fr: [], en: [], ar: [] };
  const out = {} as LocalizedList;
  for (const lang of LOCALES) {
    // A row left blank in one language falls back to the row's French text,
    // so the three lists always line up index-for-index.
    out[lang] = list.map((r) => str(r[`${sub}_${lang}`]) || str(r[`${sub}_fr`]));
  }
  return out;
}

/** Localized read straight off one repeater row. */
function rowLoc(r: Record<string, unknown>, base: string): Localized {
  const out = {} as Localized;
  for (const lang of LOCALES) out[lang] = str(r[`${base}_${lang}`]);
  const first = LOCALES.find((l) => out[l]);
  if (first) for (const lang of LOCALES) out[lang] ||= out[first];
  return out;
}

const isEmpty = (v: Localized): boolean => LOCALES.every((l) => !v[l]);

/**
 * The CMS shows the client a readable region ("Moyen-Orient"), the filter on
 * /voyages compares a stable key. Map the words the seed wrote back to keys;
 * an unrecognised one keeps whatever the bundled programme said.
 */
const REGION_BY_WORD: Record<string, Region> = {
  asie: "Asie", asia: "Asie", "آسيا": "Asie",
  europe: "Europe", "أوروبا": "Europe",
  afrique: "Afrique", africa: "Afrique", "إفريقيا": "Afrique",
  ameriques: "Ameriques", "amériques": "Ameriques", "the americas": "Ameriques",
  americas: "Ameriques", "الأمريكتان": "Ameriques",
  moyenorient: "MoyenOrient", "moyen-orient": "MoyenOrient",
  "middle east": "MoyenOrient", "الشرق الأوسط": "MoyenOrient",
};

function toRegion(value: Localized, fallback: Region): Region {
  for (const lang of LOCALES) {
    const raw = value[lang];
    if (!raw) continue;
    const hit = REGION_BY_WORD[raw.toLowerCase()];
    if (hit) return hit;
    if ((REGIONS as readonly string[]).includes(raw)) return raw as Region;
  }
  return fallback;
}

// ——— mappers ————————————————————————————————————————————————

function mapTour(post: WpPost): Tour {
  const acf = post.acf ?? {};
  const local = featuredTours.find((t) => t.slug === post.slug);
  const frTitle = decode(post.title.rendered);

  const included = locList(acf, "included", "text", local?.included);
  const notIncluded = locList(acf, "not_included", "text", local?.notIncluded);
  const priceNote = loc(acf, "price_note", local?.priceNote);

  // Photos the client uploaded for this programme; the bundled record's own
  // gallery stands in until they add some.
  const gallery = rows(acf.gallery).map((r) => str(r.image)).filter(Boolean);

  const legs = rows(acf.itinerary)
    .map((r) => ({ day: rowLoc(r, "day"), place: rowLoc(r, "title") }))
    .filter((l) => !isEmpty(l.place));

  return {
    slug: post.slug,
    title: {
      fr: frTitle,
      en: str(acf.title_en) || local?.title.en || frTitle,
      ar: str(acf.title_ar) || local?.title.ar || frTitle,
    },
    subtitle: loc(acf, "subtitle", local?.subtitle),
    duration: loc(acf, "duration", local?.duration),
    dates: loc(acf, "dates_label", local?.dates),
    price: str(acf.price) || local?.price || "",
    // The CMS has no image field on `programme` yet — the featured image if
    // the client set one, else the photo this programme already shipped with.
    image: str(post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) || local?.image || IMG.hero,
    region: toRegion(loc(acf, "region"), local?.region ?? "Asie"),
    ...(isEmpty(priceNote) ? {} : { priceNote }),
    ...(gallery.length ? { gallery } : local?.gallery ? { gallery: local.gallery } : {}),
    ...(included.fr.length ? { included } : {}),
    ...(notIncluded.fr.length ? { notIncluded } : {}),
    ...(legs.length ? { itinerary: legs } : local?.itinerary ? { itinerary: local.itinerary } : {}),
  };
}

function mapPriceRows(v: unknown): PriceRow[] {
  return rows(v)
    .map((r) => {
      const sub = rowLoc(r, "sub_label");
      return {
        label: rowLoc(r, "label"),
        ...(isEmpty(sub) ? {} : { sub }),
        quad: str(r.quad),
        triple: str(r.triple),
        double: str(r.double),
      };
    })
    .filter((r) => !isEmpty(r.label));
}

/** `description` is one textarea per language, a paragraph per line. */
function mapDescription(acf: Record<string, unknown>, fallback?: LocalizedList): LocalizedList {
  const out = {} as LocalizedList;
  for (const lang of LOCALES) {
    out[lang] = str(acf[`description_${lang}`]).split("\n").map((s) => s.trim()).filter(Boolean);
  }
  return LOCALES.some((l) => out[l].length) ? out : fallback ?? { fr: [], en: [], ar: [] };
}

function mapPilgrimage(post: WpPost): PilgrimageProgram {
  const acf = post.acf ?? {};
  // Arabic is the language these are written in: it is the post title.
  const arTitle = decode(post.title.rendered);
  const local = pilgrimagePrograms.find((p) => p.slug === post.slug);

  const tables = rows(acf.tables)
    .map((tb) => {
      const name = rowLoc(tb, "name");
      const tag = rowLoc(tb, "tag");
      return {
        ...(isEmpty(name) ? {} : { name }),
        ...(isEmpty(tag) ? {} : { tag }),
        rows: mapPriceRows(tb.rows),
      };
    })
    .filter((tb) => tb.rows.length);

  const gallery = rows(acf.gallery).map((r) => str(r.image)).filter(Boolean);

  return {
    slug: post.slug,
    kind: str(acf.category) === "hajj" ? "hajj" : "omra",
    title: {
      fr: str(acf.title_fr) || local?.title.fr || arTitle,
      en: str(acf.title_en) || local?.title.en || arTitle,
      ar: arTitle,
    },
    shortTitle: loc(acf, "short_title", local?.shortTitle),
    priceFrom: loc(acf, "price_from", local?.priceFrom),
    duration: loc(acf, "duration", local?.duration),
    flight: loc(acf, "flight", local?.flight),
    flightRoute: loc(acf, "flight_route", local?.flightRoute),
    dates: locList(acf, "dates", "label", local?.dates),
    includes: locList(acf, "includes", "text", local?.includes),
    notes: locList(acf, "notes", "text", local?.notes),
    description: mapDescription(acf, local?.description),
    tables: tables.length ? tables : (local?.tables ?? []),
    gallery: gallery.length ? gallery : (local?.gallery ?? []),
    // No CMS field for these yet — they come from the bundled record.
    datesLabel: local?.datesLabel ?? { fr: "", en: "", ar: "" },
    intro: local?.intro ?? { fr: "", en: "", ar: "" },
    image: local?.image ?? IMG.hajj,
    badges: local?.badges ?? [],
  };
}

// ——— the provider ———————————————————————————————————————————

/**
 * One in-flight request per collection, and the answer is kept.
 *
 * The home page asks for tours and pilgrimages, a detail page asks again on
 * navigation; without this the CMS gets hit once per section per render.
 * A rebuild clears it, which is the right granularity for a site whose
 * content changes a few times a week.
 *
 * ponytail: no TTL. Add one when the client complains an edit took a deploy
 * to show up.
 */
function cached<T>(load: () => Promise<T>): () => Promise<T> {
  let promise: Promise<T> | null = null;
  return () => (promise ??= load().catch((e) => {
    promise = null; // a failed fetch must not be remembered
    throw e;
  }));
}

export function createWordPressProvider(wpUrl: string): ContentProvider {
  const base = wpUrl.replace(/\/+$/, "");

  /** null = the CMS is unreachable; the caller falls back to local data. */
  async function fetchPosts(restBase: string): Promise<WpPost[] | null> {
    try {
      const res = await fetch(`${base}/wp-json/wp/v2/${restBase}?per_page=100&_embed&acf_format=standard`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const posts = (await res.json()) as WpPost[];
      return Array.isArray(posts) ? posts : null;
    } catch (err) {
      // A CMS that is down must not take the site down with it.
      console.warn(`[content] ${base}/${restBase} unreachable, serving bundled content:`, err);
      return null;
    }
  }

  const tours = cached(() => fetchPosts("programmes"));
  const pilgrimages = cached(() => fetchPosts("omra-programmes"));

  // The list getters are the only ones that fetch; `getTour`/`getPilgrimageProgram`
  // read the cached list, so a detail page costs no extra request.
  const getTours = async (): Promise<Tour[]> => {
    const posts = await tours();
    return posts === null ? localProvider.getTours() : posts.map(mapTour);
  };
  const getPilgrimagePrograms = async (): Promise<PilgrimageProgram[]> => {
    const posts = await pilgrimages();
    return posts === null ? localProvider.getPilgrimagePrograms() : posts.map(mapPilgrimage);
  };

  return {
    getTours,
    getPilgrimagePrograms,
    getTour: async (slug) => (await getTours()).find((t) => t.slug === slug),
    getPilgrimageProgram: async (slug) => (await getPilgrimagePrograms()).find((p) => p.slug === slug),
  };
}
