import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG } from "@/lib/tours";
import { Users, Mic, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/mice")({
  head: () => ({
    meta: [
      { title: "MICE — Séminaires, congrès & incentives | Capital Tours" },
      { name: "description", content: "Organisation de séminaires, conférences, congrès et voyages incentives. Capital Tours MICE." },
      { property: "og:title", content: "MICE — Capital Tours" },
      { property: "og:description", content: "Séminaires, conférences, congrès et voyages incentives." },
      { property: "og:image", content: IMG.marrakech },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 bg-sand">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">MICE</div>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl">Meetings, Incentives, Conferences & Exhibitions</h1>
            <p className="mt-4 text-muted-foreground">De la conception à la logistique, nous imaginons et produisons des événements professionnels sur mesure, au Maroc et à l'international.</p>
            <Link to="/contact" className="btn-primary mt-6 hover:-translate-y-0.5">Demander un devis</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={IMG.marrakech} alt="" className="aspect-square rounded-2xl object-cover" />
            <img src={IMG.prague} alt="" className="aspect-square rounded-2xl object-cover mt-8" />
            <img src={IMG.thailand} alt="" className="aspect-square rounded-2xl object-cover" />
            <img src={IMG.sahara} alt="" className="aspect-square rounded-2xl object-cover mt-8" />
          </div>
        </div>
      </section>
      <section className="container-page py-16 grid gap-6 md:grid-cols-4">
        {[
          { icon: Users, t: "Meetings", d: "Réunions d'entreprise clé en main." },
          { icon: Sparkles, t: "Incentives", d: "Voyages de motivation & récompenses." },
          { icon: Mic, t: "Conferences", d: "Congrès professionnels & scientifiques." },
          { icon: Building2, t: "Exhibitions", d: "Salons et événements grand format." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-3xl border border-border p-6">
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
