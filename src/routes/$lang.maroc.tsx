import { createFileRoute, Link } from "@tanstack/react-router";
import { tFor, useLocale, useLocalized, useT, type TranslationKey } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG, destinationsMaroc } from "@/lib/tours";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const Route = createFileRoute("/$lang/maroc")({
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.maroc.title") },
        { name: "description", content: t("meta.maroc.desc") },
        { property: "og:title", content: t("meta.maroc.title") },
        { property: "og:description", content: t("meta.maroc.desc") },
        { property: "og:image", content: IMG.marrakech },
      ],
    };
  },
  component: MarocPage,
});

/** Titles live as keys; the price and the photo are the same in every language. */
const circuits: { key: TranslationKey; price: string; image: string }[] = [
  { key: "maroc.ifrane", price: "1 350 dhs", image: IMG.marrakech },
  { key: "maroc.imperial", price: "9 000 dhs", image: IMG.fes },
  { key: "maroc.south", price: "14 500 dhs", image: IMG.sahara },
];

function MarocPage() {
  const lang = useLocale();
  const t = useT();
  const { pick } = useLocalized();
  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative h-[70vh] overflow-hidden">
        <img src={IMG.sahara} alt={t("maroc.title")} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="relative z-10 flex h-full items-end pb-16 pt-40">
          <div className="container-page text-white">
            <div className="text-xs uppercase tracking-widest opacity-80">{t("maroc.eyebrow")}</div>
            <h1 className="mt-2 max-w-3xl font-display text-5xl sm:text-6xl">{t("maroc.title")}</h1>
            <p className="mt-4 max-w-xl opacity-90">{t("maroc.lead")}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <Reveal><h2 className="font-display text-4xl">{t("maroc.circuits")}</h2></Reveal>
        <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-3">
          {circuits.map((c) => (
            <StaggerItem key={c.key} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={t(c.key)} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl">{t(c.key)}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("tour.from")}</span>
                  <span className="font-display text-lg text-primary">
                    <bdi dir="ltr">{c.price}</bdi>
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="container-page py-16">
        <Reveal><h2 className="font-display text-4xl">{t("maroc.destinations")}</h2></Reveal>
        <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-3">
          {destinationsMaroc.map((d) => (
            <StaggerItem key={d.slug} className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition duration-300 hover:shadow-[var(--shadow-lift)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={pick(d.name)} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-accent">{pick(d.tagline)}</div>
                <h3 className="mt-1 font-display text-2xl">{pick(d.name)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pick(d.desc)}</p>
                {/* stretched over the card — see the same pattern on the home page */}
                <Link to="/$lang/contact" params={{ lang }} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']">
                  {t("action.book")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
      <Footer />
    </div>
  );
}
