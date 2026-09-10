import { Link } from "@tanstack/react-router";
import { useLocale, useT, type TranslationKey } from "@/i18n";
import { Mail, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { HoverScale } from "@/components/motion/HoverScale";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Nav entries carry a translation key rather than a label: the wording comes
 * from the active dictionary, so the same array serves all three languages.
 */
export const nav = [
  { to: "/$lang/voyages", key: "nav.voyages" },
  { to: "/$lang/hajj-omra", key: "nav.hajjOmra" },
  { to: "/$lang/maroc", key: "nav.maroc" },
  { to: "/$lang/transport", key: "nav.transport" },
  { to: "/$lang/mice", key: "nav.mice" },
  { to: "/$lang/a-propos", key: "nav.about" },
] as const satisfies readonly { to: string; key: TranslationKey }[];

export function Header() {
  const lang = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="bg-primary/90 text-primary-foreground backdrop-blur">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-2 text-[11px] sm:flex-row sm:items-center sm:text-sm">
          <span className="hidden opacity-80 sm:inline">
            {t("header.tagline")}
          </span>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="mailto:contact@capitaltours.ma"
              className="inline-flex items-center gap-1.5 hover:opacity-80"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />{" "}
              <bdi dir="ltr">contact@capitaltours.ma</bdi>
            </a>
            <a
              href="tel:+212000000000"
              className="inline-flex items-center gap-1.5 hover:opacity-80"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />{" "}
              <bdi dir="ltr">+212 5 35 62 63 63 / +212 5 35 94 47 25</bdi>
            </a>
          </div>
        </div>
      </div>

      <div className="container-page mt-3">
        <div className="flex items-center justify-between rounded-full border border-white/40 bg-white/85 px-3 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur sm:px-5 sm:py-3">
          <Link
            to="/$lang"
            params={{ lang }}
            className="flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="Capital Tours"
              className="my-[-8px] h-14 w-auto sm:h-16 md:h-20"
            />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <HoverScale key={n.to}>
                <Link
                  to={n.to}
                  params={{ lang }}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                >
                  {t(n.key)}
                </Link>
              </HoverScale>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher className="mr-1" />
            <HoverScale className="hidden sm:block">
              <Link
                to="/$lang/contact"
                params={{ lang }}
                className="btn-primary inline-flex"
              >
                Nous contacter
              </Link>
            </HoverScale>
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-lift)] lg:hidden">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                params={{ lang }}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {t(n.key)}
              </Link>
            ))}
            <Link
              to="/$lang/contact"
              params={{ lang }}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Nous contacter
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
