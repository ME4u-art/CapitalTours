import { Link } from "@tanstack/react-router";
import { useLocale, useT } from "@/i18n";
import { Mail, Phone, MapPin } from "lucide-react";
import { NavTicker } from "./NavTicker";
import { agencyPhones } from "@/lib/pilgrimage";
import ministereTourisme from "@/assets/footer/ministere-tourisme.svg";
import iata from "@/assets/footer/iata.svg";

const legalKeys = [
  "footer.legal",
  "footer.cgu",
  "footer.privacy",
  "footer.cookies",
] as const;

// Both offices, translated per language — the shared agencyAddresses stays
// Arabic for the RTL programme pages.
const addressKeys = ["footer.hq1", "footer.hq2"] as const;

export function Footer() {
  const lang = useLocale();
  const t = useT();
  return (
    <>
      <NavTicker />
      <footer className="bg-sand text-foreground">
        <div className="container-page grid gap-10 py-16 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-semibold">
              Capital<span className="text-accent"> Tours</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("footer.agencyType")}
            </p>

            {/* accreditation badges */}
            <div className="mt-6 flex items-center gap-4">
              <img
                src={ministereTourisme}
                alt="Ministère du Tourisme, de l'Artisanat et de l'Économie Sociale et Solidaire"
                className="h-10 w-auto object-contain"
              />
              <img
                src={iata}
                alt="IATA"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide">
              {t("footer.findUs")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {addressKeys.map((key) => (
                <li key={key} className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {t(key)}
                </li>
              ))}
            </ul>

            <h4 className="mt-6 font-display text-sm font-bold uppercase tracking-wide">
              {t("footer.contact")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {agencyPhones.slice(0, 2).map((tel) => (
                <li key={tel} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />{" "}
                  <bdi dir="ltr">{tel}</bdi>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />{" "}
                <bdi dir="ltr">contact@capitaltours.ma</bdi>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide">
              {t("footer.ourTrips")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/$lang/voyages" params={{ lang }}>
                  {t("footer.organisedTrips")}
                </Link>
              </li>
              <li>
                <Link to="/$lang/maroc" params={{ lang }}>
                  {t("nav.maroc")}
                </Link>
              </li>
              <li>
                <Link to="/$lang/hajj-omra" params={{ lang }}>
                  {t("nav.hajjOmra")}
                </Link>
              </li>
            </ul>

            <h4 className="mt-6 font-display text-sm font-bold uppercase tracking-wide">
              {t("footer.services")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/$lang/mice" params={{ lang }}>
                  MICE
                </Link>
              </li>
              <li>
                <Link to="/$lang/transport" params={{ lang }}>
                  {t("nav.transport")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide">
              {t("footer.usefulLinks")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/$lang/a-propos" params={{ lang }}>
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/$lang/contact" params={{ lang }}>
                  {t("footer.contactLink")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} Capital Tours — {t("footer.rights")}
            </span>
            <div className="flex flex-wrap gap-4">
              {legalKeys.map((key) => (
                <a
                  key={key}
                  href="#"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  {t(key)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
