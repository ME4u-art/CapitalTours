import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { dirOf, isLocale, type Locale } from "@/i18n";

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
