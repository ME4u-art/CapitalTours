import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Car, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transport privé & chauffeurs — Capital Tours" },
      { name: "description", content: "Flotte haut de gamme, chauffeurs professionnels : transferts, mise à disposition et VIP au Maroc." },
      { property: "og:title", content: "Transport privé — Capital Tours" },
      { property: "og:description", content: "Chauffeurs professionnels et flotte premium au Maroc." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Transport</div>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl">Votre confort, notre priorité.</h1>
            <p className="mt-4 text-muted-foreground">Flotte de véhicules haut de gamme, chauffeurs professionnels et service exécutif pour vos déplacements individuels et de groupe au Maroc.</p>
            <Link to="/contact" className="btn-primary mt-6 hover:-translate-y-0.5">Réserver un transfert</Link>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-lift)]">
            <img src="/transport.jpg" alt="Van VIP Mercedes Sprinter — Capital Tours" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="container-page pb-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Car, t: "Flotte premium", d: "Berlines, SUV, minibus et vans VIP récents." },
          { icon: ShieldCheck, t: "Sécurité", d: "Chauffeurs formés, véhicules assurés, suivi trajet." },
          { icon: Clock, t: "24/7", d: "Disponibilité totale, ponctualité garantie." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-3xl bg-sand p-6">
            <I className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  ),
});
