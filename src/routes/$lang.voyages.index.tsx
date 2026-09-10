import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { featuredTours, REGIONS, type Region } from "@/lib/tours";
import { tFor, useT } from "@/i18n";
import { useState } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const Route = createFileRoute("/$lang/voyages/")({
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.voyages.title") },
        { name: "description", content: t("meta.voyages.desc") },
        { property: "og:title", content: t("meta.voyages.title") },
        { property: "og:description", content: t("meta.voyages.desc") },
      ],
    };
  },
  component: VoyagesPage,
});

/** `null` is "no filter" — the region keys themselves stay untranslated. */
type Filter = Region | null;

function VoyagesPage() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>(null);
  const list = filter ? featuredTours.filter((x) => x.region === filter) : featuredTours;
  const filters: Filter[] = [null, ...REGIONS];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-40 pb-16 bg-sand">
        <div className="container-page">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t("home.organisedTrips")}
          </div>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl">{t("voyages.title")}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("voyages.lead")}</p>
        </div>
      </div>
      <div className="container-page py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((r) => (
            <button
              key={r ?? "all"}
              onClick={() => setFilter(r)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
              }`}
            >
              {t(r ? `region.${r}` : "region.all")}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="text-muted-foreground">{t("tour.noResults")}</p>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((tour) => (
              <StaggerItem key={tour.slug}>
                <TourCard tour={tour} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
      <Footer />
    </div>
  );
}
