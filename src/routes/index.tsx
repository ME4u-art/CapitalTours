import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from "@/i18n";

/**
 * `/` carries no language, so it sends the visitor to one and never renders.
 *
 * The redirect happens on the server during `beforeLoad`, so a crawler and a
 * browser both land on a real URL — /fr/, /en/ or /ar/ — instead of an empty
 * page that only resolves once JavaScript runs.
 */
export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    throw redirect({
      to: "/$lang",
      params: { lang: preferredLocale(location.href) },
      replace: true,
    });
  },
});

/**
 * Pick a language from the browser's Accept-Language header when we can see
 * it, else French. Kept deliberately simple: order of preference wins, and
 * anything we do not publish in is ignored.
 */
function preferredLocale(_href: string): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  for (const tag of navigator.languages ?? []) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base) && (LOCALES as readonly string[]).includes(base))
      return base;
  }
  return DEFAULT_LOCALE;
}
