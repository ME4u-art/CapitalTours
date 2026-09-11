import { useParams } from "@tanstack/react-router";
import { fr, type Dictionary, type TranslationKey } from "./fr";
import { en } from "./en";
import { ar } from "./ar";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
  type Localized,
  type LocalizedList,
} from "./types";

export * from "./types";
export type { TranslationKey } from "./fr";

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en, ar };

/* Written as escapes on purpose: invisible characters in source invite a "cleanup". */
const NBSP = "\u00a0"; // no-break space
const LRI = "\u2066";  // left-to-right isolate
const PDI = "\u2069";  // pop directional isolate

/**
 * Make a number survive an Arabic paragraph. Two separate bugs:
 *
 * 1. "19 500" — a plain space is whitespace, and whitespace takes the
 *    paragraph's direction, so the number splits into two runs that then
 *    swap and the price renders "500 19". A no-break space is a bidi Common
 *    Separator instead, which keeps the digits one run.
 *
 * 2. "+1 000" — a sign beside a number still gets reordered and the plus
 *    lands on the wrong end: "1 000+". Isolating the signed number pins it
 *    left-to-right whatever surrounds it.
 *
 * Both checked in a browser rather than reasoned about — the bidi algorithm
 * is not something to take on trust. Only signed numbers are isolated; a
 * bare number is fine once its digits are bound.
 *
 * Applied in every language, not only Arabic: elsewhere the no-break space is
 * the correct thousands separator anyway, and it stops a price breaking
 * across two lines.
 *
 * Every visible string passes through translate/pick/pickList below, so this
 * covers the dictionaries and whatever the client later types into the CMS.
 */
const SIGNED_NUMBER = new RegExp(`[+−-]\\d[\\d${NBSP}]*`, "g");

const bindDigits = (s: string): string =>
  s
    .replace(/(\d) (?=\d)/g, `$1${NBSP}`)
    .replace(SIGNED_NUMBER, (m) => `${LRI}${m}${PDI}`);

/**
 * Look a key up in `locale`, falling back to French.
 *
 * A half-translated page still sells; a page full of blanks does not. The
 * fallback is loud in dev so gaps get noticed during the work, not by a
 * client six months later.
 */
export function translate(locale: Locale, key: TranslationKey): string {
  const value = DICTIONARIES[locale]?.[key];
  if (value) return bindDigits(value);
  if (import.meta.env.DEV && locale !== DEFAULT_LOCALE) {
    console.warn(
      `[i18n] missing ${locale} translation for "${key}" — showing French`,
    );
  }
  return bindDigits(fr[key]);
}

/**
 * Translator for `head()` and loaders, which run outside React and so cannot
 * call `useT`. Give it the raw `params.lang`; anything unrecognised is French.
 */
export function tFor(lang: unknown): (key: TranslationKey) => string {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return (key) => translate(locale, key);
}

/** Same, for localised content outside React. */
export function pickFor(lang: unknown): (value: Localized) => string {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return (value) => pick(locale, value);
}

/** The active locale, read from the `/$lang` route segment.
 *
 * `strict: false` because this is called from shared components (header,
 * footer, cards) that are not tied to one route. Anything unrecognised falls
 * back to French rather than throwing.
 */
export function useLocale(): Locale {
  const params = useParams({ strict: false }) as { lang?: string };
  return isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
}

/** Translator bound to the active locale: `const t = useT(); t("nav.contact")`. */
export function useT(): (key: TranslationKey) => string {
  const locale = useLocale();
  return (key) => translate(locale, key);
}

/** Pick the active language out of a piece of localised content. */
export function pick(locale: Locale, value: Localized): string {
  return bindDigits(value[locale] || value[DEFAULT_LOCALE]);
}

export function pickList(locale: Locale, value: LocalizedList): string[] {
  const list = value[locale];
  return (list && list.length ? list : value[DEFAULT_LOCALE]).map(bindDigits);
}

/** Hook form of `pick`, for use inside components. */
export function useLocalized(): {
  locale: Locale;
  pick: (value: Localized) => string;
  pickList: (value: LocalizedList) => string[];
} {
  const locale = useLocale();
  return {
    locale,
    pick: (value) => pick(locale, value),
    pickList: (value) => pickList(locale, value),
  };
}
