import { createFileRoute, Link } from "@tanstack/react-router";
import { tFor, useLocale, useLocalized, useT, type TranslationKey } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG } from "@/lib/tours";
import { agencyPhones, agencyAddresses } from "@/lib/pilgrimage";
import { content } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import {
  Plane,
  Building2,
  Bus,
  MapPin,
  UserCheck,
  BadgeCheck,
  Check,
  Phone,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/$lang/hajj-omra/")({
  loader: async () => ({ programs: await content.getPilgrimagePrograms() }),
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.hajj.title") },
        { name: "description", content: t("meta.hajj.desc") },
        { property: "og:title", content: t("meta.hajj.title") },
        { property: "og:description", content: t("meta.hajj.ogDesc") },
        { property: "og:image", content: IMG.hajj },
      ],
    };
  },
  component: HajjOmraIndex,
});

const services: { icon: typeof Plane; label: TranslationKey }[] = [
  { icon: Plane, label: "hajj.svcFlight" },
  { icon: Building2, label: "hajj.svcHotel" },
  { icon: Bus, label: "hajj.svcTransfers" },
  { icon: MapPin, label: "hajj.svcVisits" },
  { icon: UserCheck, label: "hajj.svcGuide" },
  { icon: BadgeCheck, label: "hajj.svcVisa" },
];

const whyUs: TranslationKey[] = [
  "hajj.why1",
  "hajj.why2",
  "hajj.why3",
  "hajj.why4",
  "hajj.why5",
  "hajj.why6",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-bold" style={{ color: "var(--brand-yellow)" }}>{children}</div>;
}

function HajjOmraIndex() {
  const lang = useLocale();
  const t = useT();
  const { pick } = useLocalized();
  const { programs } = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      <Header />

      {/* No dir here any more: the page reads in whichever language the visitor
          chose, and `dir` is set once on <html> by the locale layout. */}
      <section className="relative h-[70vh] overflow-hidden">
        <img src={IMG.hajj} alt={t("hajj.eyebrow")} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />
        <div className="relative z-10 flex h-full items-end pb-16 pt-40">
          <div className="container-page text-white">
            <Eyebrow>{t("hajj.eyebrow")}</Eyebrow>
            <h1 className="mt-2 font-display text-5xl leading-tight sm:text-6xl">{t("hajj.heroTitle")}</h1>
            <p className="mt-4 max-w-2xl text-lg opacity-90">{t("hajj.heroLead")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/$lang/hajj-omra/$slug" params={{ lang, slug: "omra-2026" }} className="btn-primary hover:-translate-y-0.5">
                {t("hajj.omraCta")} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
              <Link to="/$lang/hajj-omra/$slug" params={{ lang, slug: "hajj-2027" }} className="btn-ghost hover:-translate-y-0.5">
                {t("hajj.hajjCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* programme cards — click through for the detail */}
      <section className="py-16">
        <div className="container-page">
          <Reveal className="text-center">
            <Eyebrow>{t("hajj.ourPrograms")}</Eyebrow>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">{t("hajj.chooseTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{t("hajj.chooseLead")}</p>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2">
            {programs.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  to="/$lang/hajj-omra/$slug"
                  params={{ lang, slug: p.slug }}
                  className="group relative block h-80 overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]"
                >
                  <img src={p.image} alt={pick(p.title)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{pick(p.shortTitle)}</span>
                    <h3 className="mt-3 font-display text-4xl">{t(`hajj.${p.kind}`)}</h3>
                    <p className="mt-2 max-w-md text-sm opacity-90">{pick(p.intro)}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="font-semibold" style={{ color: "var(--brand-yellow)" }}>
                        {t("tour.from")} {pick(p.priceFrom)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                        <CalendarDays className="h-3.5 w-3.5" /> {pick(p.datesLabel)}
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
                      {t("hajj.seeDetails")}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 rtl:-scale-x-100" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* what is included */}
      <section className="bg-sand py-16">
        <div className="container-page">
          <Reveal className="text-center">
            <Eyebrow>{t("hajj.allIncluded")}</Eyebrow>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl">{t("hajj.ourServices")}</h2>
          </Reveal>
          <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {services.map(({ icon: Icon, label }) => (
              <StaggerItem key={label} className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 text-center shadow-[var(--shadow-soft)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{t(label)}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* why us */}
      <section className="py-16">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <Eyebrow>{t("hajj.whyUs")}</Eyebrow>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl">{t("hajj.whyTitle")}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyUs.map((w) => (
                <li key={w} className="flex items-center gap-2 rounded-xl bg-sand px-4 py-3 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-primary" /> {t(w)}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="overflow-hidden rounded-3xl">
            <img src={IMG.hajj} alt={t("hajj.eyebrow")} className="h-80 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* get in touch */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal className="rounded-3xl bg-primary px-8 py-12 text-center text-white">
            <h2 className="font-display text-3xl sm:text-4xl">{t("hajj.bookNow")}</h2>
            <p className="mx-auto mt-3 max-w-xl opacity-90">{t("hajj.bookLead")}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3" dir="ltr">
              {agencyPhones.map((tel) => (
                <a key={tel} href={`tel:${tel.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25">
                  <Phone className="h-4 w-4" /> {tel}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm opacity-90">
              {pick(agencyAddresses[0])}
              <br />
              {pick(agencyAddresses[1])}
            </p>
            <p className="mt-2 text-sm opacity-80">{t("hajj.socials")}</p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
