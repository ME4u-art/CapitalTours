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

/**
 * Look a key up in `locale`, falling back to French.
 *
 * A half-translated page still sells; a page full of blanks does not. The
 * fallback is loud in dev so gaps get noticed during the work, not by a
 * client six months later.
 */
export function translate(locale: Locale, key: TranslationKey): string {
  const value = DICTIONARIES[locale]?.[key];
  if (value) return value;
  if (import.meta.env.DEV && locale !== DEFAULT_LOCALE) {
    console.warn(
      `[i18n] missing ${locale} translation for "${key}" — showing French`,
    );
  }
  return fr[key];
}

/**
 * The active locale, read from the `/$lang` route segment.
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
  return value[locale] || value[DEFAULT_LOCALE];
}

export function pickList(locale: Locale, value: LocalizedList): string[] {
  const list = value[locale];
  return list && list.length ? list : value[DEFAULT_LOCALE];
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
