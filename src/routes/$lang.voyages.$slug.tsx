import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pickFor, tFor, useLocale, useLocalized, useT } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { content } from "@/lib/content";
import { Calendar, Clock, MapPin, Check, X, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/$lang/voyages/$slug")({
  loader: async ({ params }) => {
    const tour = await content.getTour(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ params, loaderData }) => {
    const t = tFor(params.lang);
    const pick = pickFor(params.lang);
    if (!loaderData) {
      return { meta: [{ title: t("tour.notFound") }, { name: "robots", content: "noindex" }] };
    }
    const tour = loaderData.tour;
    const title = `${pick(tour.title)} — Capital Tours`;
    const desc = `${pick(tour.subtitle)}. ${pick(tour.duration)}. ${pick(tour.dates)}. ${t("tour.from")} ${tour.price}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: `${pick(tour.subtitle)}. ${pick(tour.duration)}.` },
        { property: "og:image", content: tour.image },
        { name: "twitter:image", content: tour.image },
      ],
    };
  },
  component: TourDetail,
  notFoundComponent: TourNotFound,
});

function TourNotFound() {
  const lang = useLocale();
  const t = useT();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container-page py-40 text-center">
        <h1 className="font-display text-4xl">{t("tour.notFound")}</h1>
        <Link to="/$lang/voyages" params={{ lang }} className="btn-primary mt-6 inline-flex">
          {t("tour.seeAll")}
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function TourDetail() {
  const lang = useLocale();
  const t = useT();
  const { pick, pickList } = useLocalized();
  const { tour } = Route.useLoaderData();

  const included = tour.included
    ? pickList(tour.included)
    : [t("tour.fbFlights"), t("tour.fbHotel"), t("tour.fbTransfers"), t("tour.fbGuiding")];

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img src={tour.image} alt={pick(tour.title)} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        <div className="relative z-10 flex h-full items-end pb-16 pt-40">
          <div className="container-page text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              <MapPin className="h-3 w-3" /> {t(`region.${tour.region}`)}
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl sm:text-6xl">{pick(tour.title)}</h1>
            <p className="mt-3 text-lg opacity-90">{pick(tour.subtitle)}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {pick(tour.duration)}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {pick(tour.dates)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <h2 className="font-display text-3xl">{t("tour.overview")}</h2>
          <p className="mt-4 text-muted-foreground">
            {pick(tour.subtitle)}. {t("tour.overviewBody")}
          </p>

          {tour.itinerary && (
            <>
              <h3 className="mt-10 font-display text-2xl">{t("tour.yourItinerary")}</h3>
              <ol className="mt-4 space-y-3">
                {tour.itinerary.map((it) => (
                  <li key={it.day.fr} className="flex gap-4 rounded-2xl bg-sand p-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary">{pick(it.day)}</div>
                      <div className="text-sm">{pick(it.place)}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}

          <h3 className="mt-10 font-display text-2xl">{t("tour.includedTitle")}</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {included.map((f) => (
              <li key={f} className="flex items-start gap-2 rounded-xl bg-sand px-4 py-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>

          {tour.notIncluded && (
            <>
              <h3 className="mt-10 font-display text-2xl">{t("tour.notIncludedTitle")}</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {pickList(tour.notIncluded).map((f) => (
                  <li key={f} className="flex items-start gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-32 h-fit rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <aside>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("tour.pricePerPerson")}</div>
          <div className="mt-2 font-display text-4xl text-primary">
            <bdi dir="ltr">{tour.price}</bdi>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {tour.priceNote ? pick(tour.priceNote) : t("tour.priceNoteDefault")}
          </p>
          <div className="mt-4 rounded-xl bg-secondary px-4 py-2 text-center text-xs font-medium text-primary">
            {t("tour.deposit")}
          </div>
          <Link to="/$lang/reservation/$slug" params={{ lang, slug: tour.slug }} className="btn-primary mt-3 w-full hover:-translate-y-0.5">
            {t("action.book")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/$lang/voyages" params={{ lang }} className="mt-3 block text-center text-sm text-primary underline">
            {t("tour.seeAll")}
          </Link>
        </aside>
        </Reveal>
      </section>
      <Footer />
    </div>
  );
}
