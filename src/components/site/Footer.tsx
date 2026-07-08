import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { NavTicker } from "./NavTicker";
import { agencyAddresses, agencyPhones } from "@/lib/pilgrimage";
import ministereTourisme from "@/assets/footer/ministere-tourisme.svg";
import iata from "@/assets/footer/iata.svg";

const legalLinks = ["Mentions légales", "CGU", "Politique de confidentialité", "Politique de cookies"];

export function Footer() {
  return (
    <>
      <NavTicker />
      <footer className="bg-sand text-foreground">
        <div className="container-page grid gap-10 py-16 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-semibold">
              Capital<span className="text-accent"> Tours</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Agence de voyages</p>

            {/* accreditation badges */}
            <div className="mt-6 flex items-center gap-4">
              <img src={ministereTourisme} alt="Ministère du Tourisme, de l'Artisanat et de l'Économie Sociale et Solidaire" className="h-10 w-auto object-contain" />
              <img src={iata} alt="IATA" className="h-10 w-auto object-contain" />
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide">Retrouvez-nous ici</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground" dir="rtl">
              {agencyAddresses.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>

            <h4 className="mt-6 font-display text-sm font-bold uppercase tracking-wide">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {agencyPhones.slice(0, 2).map((tel) => (
                <li key={tel} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" /> {tel}
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> contact@capitaltours.ma
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide">Nos voyages</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/voyages">Voyages organisés</Link></li>
              <li><Link to="/maroc">Départs Maroc</Link></li>
              <li><Link to="/hajj-omra">Hajj / Omra</Link></li>
            </ul>

            <h4 className="mt-6 font-display text-sm font-bold uppercase tracking-wide">Nos services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/mice">MICE</Link></li>
              <li><Link to="/transport">Transport</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide">Liens utiles</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/a-propos">Qui sommes-nous</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Capital Tours — Tous droits réservés.</span>
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((label) => (
                <a key={label} href="#" className="underline underline-offset-2 hover:text-foreground">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
