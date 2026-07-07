import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG, destinationsMaroc } from "@/lib/tours";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/maroc")({
  head: () => ({
    meta: [
      { title: "Départs Maroc — Circuits & séjours au Maroc | Capital Tours" },
      { name: "description", content: "Découvrez le Maroc avec nos circuits soignés : Marrakech, Fès, Sahara, villes impériales et côte atlantique." },
      { property: "og:title", content: "Départs Maroc — Capital Tours" },
      { property: "og:description", content: "Circuits et séjours au Maroc." },
      { property: "og:image", content: IMG.marrakech },
    ],
  }),
  component: MarocPage,
});

const circuits = [
  { title: "Une journée au cœur d'Ifrane", price: "1 350 dhs", image: IMG.marrakech },
  { title: "Au cœur des villes impériales", price: "9 000 dhs", image: IMG.fes },
  { title: "Sud du Maroc", price: "14 500 dhs", image: IMG.sahara },
];

function MarocPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative h-[70vh] overflow-hidden">
        <img src={IMG.sahara} alt="Sahara marocain" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="relative z-10 flex h-full items-end pb-16 pt-40">
          <div className="container-page text-white">
            <div className="text-xs uppercase tracking-widest opacity-80">Départs garantis Maroc</div>
            <h1 className="mt-2 max-w-3xl font-display text-5xl sm:text-6xl">Explorez le Maroc autrement.</h1>
            <p className="mt-4 max-w-xl opacity-90">Voyages soigneusement conçus, mêlant découverte culturelle, détente et aventure.</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display text-4xl">Circuits Maroc</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {circuits.map((c) => (
            <div key={c.title} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl">{c.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">À partir de</span>
                  <span className="font-display text-lg text-primary">{c.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display text-4xl">Nos destinations au Maroc</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {destinationsMaroc.map((d) => (
            <article key={d.slug} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-accent">{d.tagline}</div>
                <h3 className="mt-1 font-display text-2xl">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Réserver <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
