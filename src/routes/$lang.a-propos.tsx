import { createFileRoute } from "@tanstack/react-router";
import { tFor, useT, type TranslationKey } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

/** The figures are the same in every language; only their labels change. */
const stats: { value: string; label: TranslationKey }[] = [
  { value: "15+", label: "about.statYears" },
  { value: "10k", label: "about.statTravellers" },
  { value: "50+", label: "about.statDestinations" },
];

export const Route = createFileRoute("/$lang/a-propos")({
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.about.title") },
        { name: "description", content: t("meta.about.desc") },
        { property: "og:title", content: t("meta.about.title") },
        { property: "og:description", content: t("meta.about.desc") },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const t = useT();
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 container-page max-w-3xl">
        <Reveal>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">{t("about.eyebrow")}</div>
          <h1 className="mt-2 font-display text-5xl">{t("about.title")}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{t("about.p1")}</p>
          <p className="mt-4 text-muted-foreground">{t("about.p2")}</p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <StaggerItem key={label} className="rounded-3xl bg-sand p-6 text-center">
              <div className="font-display text-4xl text-primary">
                <bdi dir="ltr">{value}</bdi>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{t(label)}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
      <Footer />
    </div>
  );
}
