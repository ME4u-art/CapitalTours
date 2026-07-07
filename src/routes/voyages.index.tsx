import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { featuredTours } from "@/lib/tours";
import { useState } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const Route = createFileRoute("/voyages/")({
  head: () => ({
    meta: [
      { title: "Nos voyages organisés — Capital Tours" },
      { name: "description", content: "Découvrez tous nos voyages organisés en groupe avec billet d'avion : Asie, Europe, Amériques et plus." },
      { property: "og:title", content: "Nos voyages organisés — Capital Tours" },
      { property: "og:description", content: "Voyages organisés en groupe au départ du Maroc." },
    ],
  }),
  component: VoyagesPage,
});

const regions = ["Tous", "Asie", "Europe", "Afrique", "Amériques", "Moyen-Orient"] as const;

function VoyagesPage() {
  const [filter, setFilter] = useState<(typeof regions)[number]>("Tous");
  const list = filter === "Tous" ? featuredTours : featuredTours.filter((t) => t.region === filter);
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-40 pb-16 bg-sand">
        <div className="container-page">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Voyages organisés</div>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl">Toutes nos destinations</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Circuits en groupe avec billet d'avion au départ du Maroc, encadrés par nos guides francophones.</p>
        </div>
      </div>
      <div className="container-page py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <StaggerItem key={t.slug}>
              <TourCard tour={t} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
      <Footer />
    </div>
  );
}
