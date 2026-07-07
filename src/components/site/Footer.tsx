import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-semibold">
            Capital<span className="text-accent"> Tours</span>
          </div>
          <p className="mt-3 text-sm opacity-75">
            Votre agence de confiance pour l'Omra, le Hajj, les programmes du Ramadan et vos voyages organisés au départ du Maroc.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Facebook, href: "https://web.facebook.com/CapitalTrs/?locale=ar_AR&_rdc=1&_rdr", label: "Facebook" },
              { Icon: Instagram, href: "https://www.instagram.com/capitaltoursmaroc/?hl=ar", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-accent hover:text-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg">Explorer</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/hajj-omra">Omra &amp; Hajj</Link></li>
            <li><Link to="/maroc">Programmes Ramadan</Link></li>
            <li><Link to="/voyages">Nos programmes</Link></li>
            <li><Link to="/mice">Voyages organisés</Link></li>
            <li><Link to="/transport">Transport</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Agence</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/a-propos">Qui sommes-nous</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-80">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Fez, Maroc</li>
            <li className="flex gap-2"><Phone className="h-4 w-4" /> 06 62 21 84 65</li>
            <li className="flex gap-2"><Mail className="h-4 w-4" /> contact@capitaltours.ma</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-5 text-xs opacity-70">
          <span>© {new Date().getFullYear()} Capital Tours — Tous droits réservés.</span>
          <span>Démo réalisée pour Capital Tours</span>
        </div>
      </div>
    </footer>
  );
}
