import { createFileRoute, Link } from "@tanstack/react-router";
import { tFor, useLocale, useT, type TranslationKey } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Car, ShieldCheck, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const promises: { icon: typeof Car; title: TranslationKey; desc: TranslationKey }[] = [
  { icon: Car, title: "transport.fleet", desc: "transport.fleetDesc" },
  { icon: ShieldCheck, title: "transport.safety", desc: "transport.safetyDesc" },
  { icon: Clock, title: "transport.always", desc: "transport.alwaysDesc" },
];

export const Route = createFileRoute("/$lang/transport")({
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.transport.title") },
        { name: "description", content: t("meta.transport.desc") },
        { property: "og:title", content: t("meta.transport.title") },
        { property: "og:description", content: t("meta.transport.desc") },
      ],
    };
  },
  component: TransportPage,
});

function TransportPage() {
  const lang = useLocale();
  const t = useT();
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">{t("nav.transport")}</div>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl">{t("transport.title")}</h1>
            <p className="mt-4 text-muted-foreground">{t("transport.lead")}</p>
            <Link to="/$lang/contact" params={{ lang }} className="btn-primary mt-6 hover:-translate-y-0.5">
              {t("transport.cta")}
            </Link>
          </Reveal>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-lift)]">
            <img src="/transport.jpg" alt={t("transport.fleet")} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <StaggerGroup className="container-page pb-16 grid gap-6 md:grid-cols-3">
        {promises.map(({ icon: I, title, desc }) => (
          <StaggerItem key={title} className="rounded-3xl bg-sand p-6">
            <I className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">
              <bdi>{t(title)}</bdi>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(desc)}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Footer />
    </div>
  );
}
