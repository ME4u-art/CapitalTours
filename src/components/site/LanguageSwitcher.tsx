import { useRouterState } from "@tanstack/react-router";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, useLocale, useT } from "@/i18n";

/**
 * Swaps the language segment of the current path, so switching keeps you on
 * the page you were reading instead of bouncing you home — the usual annoyance
 * with language switchers.
 *
 * Plain anchors rather than router links, deliberately: the href is built by
 * string surgery on the current path, so it works for every route including
 * detail pages, with no per-route mapping to keep in sync. The full reload it
 * causes is a fair price — and it guarantees `lang` and `dir` are re-rendered
 * from the server rather than patched on the client.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const current = useLocale();
  const t = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const rest = pathname.split("/").filter(Boolean).slice(1).join("/");

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label={t("header.langLabel")}
    >
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <a
            key={locale}
            href={`/${locale}${rest ? `/${rest}` : ""}`}
            hrefLang={locale}
            lang={locale}
            aria-label={LOCALE_LABELS[locale]}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground"
                : "rounded-full px-2.5 py-1 text-xs font-medium text-foreground/60 transition hover:bg-secondary/60 hover:text-foreground"
            }
          >
            {LOCALE_SHORT[locale]}
          </a>
        );
      })}
    </div>
  );
}
