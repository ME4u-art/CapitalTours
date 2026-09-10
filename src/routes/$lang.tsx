import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { DEFAULT_LOCALE, LOCALES, dirOf, isLocale, type Locale } from "@/i18n";

/**
 * Every page hangs off this segment, so the language is settled before any
 * component renders — SSR included. That is the point of putting it in the
 * URL: the first paint is already in the right language and direction, with
 * no flash of French before Arabic arrives.
 *
 * An unrecognised code is a 404 rather than a silent fallback, otherwise
 * /de/voyages would quietly serve French and Google would index it.
 */
export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
    return { locale: params.lang as Locale };
  },
  /**
   * Tell crawlers the same page exists in the other languages.
   *
   * This used to be implicit: the switcher rendered all three as anchors, so
   * they sat in the HTML. It is a dropdown now and renders nothing until it is
   * opened, which a crawler never does. rel="alternate" is the mechanism meant
   * for this anyway — it does not depend on how the switcher looks.
   */
  head: ({ matches }) => {
    // The layout's own match only knows "/fr" — the deepest match carries the
    // full path, which is what the alternate URLs have to point at.
    const pathname = matches[matches.length - 1]?.pathname ?? "";
    const rest = pathname.split("/").filter(Boolean).slice(1).join("/");
    const pathFor = (l: string) => `/${l}${rest ? `/${rest}` : ""}`;
    return {
      links: [
        ...LOCALES.map((l) => ({
          rel: "alternate",
          hreflang: l,
          href: pathFor(l),
        })),
        { rel: "alternate", hreflang: "x-default", href: pathFor(DEFAULT_LOCALE) },
      ],
    };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { lang } = Route.useParams();
  const locale = lang as Locale;

  // The shell renders <html> on the server; this keeps the attributes correct
  // after a client-side language switch, which never re-renders the shell.
  useEffect(() => {
    const el = document.documentElement;
    el.lang = locale;
    el.dir = dirOf(locale);
  }, [locale]);

  return <Outlet />;
}
