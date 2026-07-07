import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { featuredTours } from "@/lib/tours";
import { Calendar, Clock, MapPin, Check, X, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/voyages/$slug")({
  loader: ({ params }) => {
    const tour = featuredTours.find((t) => t.slug === params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Voyage introuvable" }, { name: "robots", content: "noindex" }] };
    const t = loaderData.tour;
    return {
      meta: [
        { title: `${t.title} — Capital Tours` },
        { name: "description", content: `${t.subtitle}. ${t.duration}. ${t.dates}. À partir de ${t.price}.` },
        { property: "og:title", content: `${t.title} — Capital Tours` },
        { property: "og:description", content: `${t.subtitle}. ${t.duration}.` },
        { property: "og:image", content: t.image },
        { name: "twitter:image", content: t.image },
      ],
    };
  },
  component: TourDetail,
  notFoundComponent: () => (
    <div className="min-h-screen"><Header />
      <div className="container-page py-40 text-center">
        <h1 className="font-display text-4xl">Voyage introuvable</h1>
        <Link to="/voyages" className="btn-primary mt-6 inline-flex">Voir tous les voyages</Link>
      </div>
      <Footer />
    </div>
  ),
});

function TourDetail() {
  const { tour } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img src={tour.image} alt={tour.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        <div className="relative z-10 flex h-full items-end pb-16 pt-40">
          <div className="container-page text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              <MapPin className="h-3 w-3" /> {tour.region}
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl sm:text-6xl">{tour.title}</h1>
            <p className="mt-3 text-lg opacity-90">{tour.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {tour.duration}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {tour.dates}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-3xl">Aperçu du programme</h2>
          <p className="mt-4 text-muted-foreground">
            {tour.subtitle}. Un programme organisé par Capital Tours et encadré par nos équipes, du départ au retour.
          </p>

          {tour.itinerary && (
            <>
              <h3 className="mt-10 font-display text-2xl">Votre itinéraire</h3>
              <ol className="mt-4 space-y-3">
                {tour.itinerary.map((it) => (
                  <li key={it.day} className="flex gap-4 rounded-2xl bg-sand p-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary">{it.day}</div>
                      <div className="text-sm">{it.place}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}

          <h3 className="mt-10 font-display text-2xl">Ce que comprend le programme</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {(tour.included ?? ["Vols internationaux", "Hébergement", "Transferts", "Encadrement"]).map((f) => (
              <li key={f} className="flex items-start gap-2 rounded-xl bg-sand px-4 py-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>

          {tour.notIncluded && (
            <>
              <h3 className="mt-10 font-display text-2xl">Non inclus</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {tour.notIncluded.map((f) => (
                  <li key={f} className="flex items-start gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-32 h-fit rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Prix par personne</div>
          <div className="mt-2 font-display text-4xl text-primary">{tour.price}</div>
          <p className="mt-2 text-xs text-muted-foreground">{tour.priceNote ?? "Base chambre double, sous réserve de disponibilité."}</p>
          <div className="mt-4 rounded-xl bg-secondary px-4 py-2 text-center text-xs font-medium text-primary">
            Réservez en ligne — acompte 3 000 dhs
          </div>
          <Link to="/reservation/$slug" params={{ slug: tour.slug }} className="btn-primary mt-3 w-full hover:-translate-y-0.5">Réserver <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/voyages" className="mt-3 block text-center text-sm text-primary underline">Voir tous les voyages</Link>
        </aside>
      </section>
      <Footer />
    </div>
  );
}
