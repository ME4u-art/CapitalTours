import { createFileRoute, Link } from "@tanstack/react-router";
import { tFor, useLocale, useLocalized, useT } from "@/i18n";
import { useCallback, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { destinationsMaroc, IMG } from "@/lib/tours";
import { content } from "@/lib/content";
import { partners } from "@/lib/partners";
import businessNewspaper from "@/assets/mice/business-newspaper.jpg";
import streetProfessionals from "@/assets/mice/street-professionals.jpg";
import skyscrapersBlue from "@/assets/mice/skyscrapers-blue.jpg";
import skyscrapersDusk from "@/assets/mice/skyscrapers-dusk.jpg";
import teamCoworking from "@/assets/mice/team-coworking.jpg";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverScale } from "@/components/motion/HoverScale";

export const Route = createFileRoute("/$lang/")({
  // Both collections in one loader: the home page shows a slice of each, and
  // two sections asking separately would mean two round trips before paint.
  loader: async () => ({
    tours: await content.getTours(),
    pilgrimages: await content.getPilgrimagePrograms(),
  }),
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.home.title") },
        { name: "description", content: t("meta.home.desc") },
        { property: "og:title", content: t("meta.home.title") },
        { property: "og:description", content: t("meta.home.ogDesc") },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HajjOmra />
      <FeaturedTours />
      <PillarStrip />
      <MarocSection />
      <MICE />
      <Partners />
      <Footer />
    </div>
  );
}

/**
 * Hero programmes. Badge, accent and subtitle are the words a visitor reads,
 * so they carry all three languages; the slug, image and price are the same
 * whichever language you are browsing in and stay written once.
 */
const heroSlides = [
  {
    kind: "pilgrimage",
    slug: "omra-2026",
    image: IMG.hajj,
    badge: { fr: "عمرة 2026 · Omra", en: "عمرة 2026 · Umrah", ar: "عمرة 2026" },
    title: { fr: "Omra 2026", en: "Umrah 2026", ar: "عمرة 2026" },
    accent: {
      fr: "vol direct vers Médine.",
      en: "direct flight to Madinah.",
      ar: "رحلة مباشرة إلى المدينة المنورة.",
    },
    subtitle: {
      fr: "Hôtels proches du Haram et encadrement complet — plusieurs départs en juillet & août 2026.",
      en: "Hotels close to the Haram with full guidance — several departures in July and August 2026.",
      ar: "فنادق قريبة من الحرم وتأطير كامل — عدة انطلاقات في يوليوز وغشت 2026.",
    },
    price: "À partir de 17 000 dh",
  },
  {
    kind: "pilgrimage",
    slug: "hajj-2027",
    image: "/Hajj.jpg",
    badge: {
      fr: "الحج 1448هـ · Hajj 2027",
      en: "الحج 1448هـ · Hajj 2027",
      ar: "الحج 1448 هـ",
    },
    title: {
      fr: "Hajj 1448H / 2027",
      en: "Hajj 1448H / 2027",
      ar: "الحج 1448هـ / 2027",
    },
    accent: {
      fr: "un pèlerinage accompagné.",
      en: "a guided pilgrimage.",
      ar: "حج بمرافقة كاملة.",
    },
    subtitle: {
      fr: "3 formules (Économique, Moyen, Touristique 5★), vol direct et tout compris.",
      en: "Three packages (economy, mid-range, 5-star), direct flight, all inclusive.",
      ar: "ثلاث صيغ (اقتصادي، متوسط، سياحي 5 نجوم)، رحلة مباشرة وكل شيء مشمول.",
    },
    price: "À partir de 77 000 dh",
  },
  {
    kind: "tour",
    slug: "maldives-sri-lanka",
    image: IMG.thailand,
    badge: {
      fr: "Été 2026 — Nouveaux programmes",
      en: "Summer 2026 — new programmes",
      ar: "صيف 2026 — برامج جديدة",
    },
    title: {
      fr: "Maldives & Sri Lanka",
      en: "Maldives & Sri Lanka",
      ar: "جزر المالديف وسريلانكا",
    },
    accent: {
      fr: "évasion tropicale.",
      en: "a tropical escape.",
      ar: "عطلة استوائية.",
    },
    subtitle: {
      fr: "Casa · Malé · Colombo — 14 jours entre plages paradisiaques et culture. Du 18 au 31 juillet.",
      en: "Casablanca · Malé · Colombo — 14 days of beaches and culture. 18 to 31 July.",
      ar: "الدار البيضاء · ماليه · كولومبو — 14 يومًا بين الشواطئ والثقافة. من 18 إلى 31 يوليوز.",
    },
    price: "À partir de 30 800 dh",
  },
  {
    kind: "tour",
    slug: "saint-petersbourg-moscou",
    image: IMG.prague,
    badge: {
      fr: "Été 2026 — Nouveaux programmes",
      en: "Summer 2026 — new programmes",
      ar: "صيف 2026 — برامج جديدة",
    },
    title: {
      fr: "Saint-Pétersbourg / Moscou",
      en: "Saint Petersburg / Moscow",
      ar: "سان بطرسبرغ / موسكو",
    },
    accent: {
      fr: "palais impériaux.",
      en: "imperial palaces.",
      ar: "قصور إمبراطورية.",
    },
    subtitle: {
      fr: "9 jours entre la Neva et la Place Rouge. Du 2 au 10 août 2026.",
      en: "Nine days between the Neva and Red Square. 2 to 10 August 2026.",
      ar: "9 أيام بين نهر النيفا والساحة الحمراء. من 2 إلى 10 غشت 2026.",
    },
    price: "À partir de 18 500 dh",
  },
  {
    kind: "tour",
    slug: "istanbul",
    image: IMG.hero,
    badge: {
      fr: "Été 2026 — Nouveaux programmes",
      en: "Summer 2026 — new programmes",
      ar: "صيف 2026 — برامج جديدة",
    },
    title: { fr: "Istanbul", en: "Istanbul", ar: "إسطنبول" },
    accent: {
      fr: "entre deux continents.",
      en: "between two continents.",
      ar: "بين قارتين.",
    },
    subtitle: {
      fr: "Départ Rabat · Hôtel Eyfel 3★ · 3 jours d'excursions. Plusieurs dates en juillet & août.",
      en: "Departing Rabat · Eyfel Hotel 3★ · three days of excursions. Several dates in July and August.",
      ar: "انطلاق من الرباط · فندق إيفل 3 نجوم · 3 أيام من الرحلات. عدة تواريخ في يوليوز وغشت.",
    },
    price: "À partir de 8 800 dh",
  },
] as const;

function Hero() {
  const t = useT();
  const { pick: pickL } = useLocalized();
  const lang = useLocale();
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setI(((idx % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current && !document.hidden)
        setI((p) => (p + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[i];

  return (
    <section
      className="relative min-h-[92svh] w-full overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={(e) => {
        paused.current = true;
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        paused.current = false;
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 48) goTo(dx < 0 ? i + 1 : i - 1);
      }}
    >
      {/* cross-fading programme photos with a slow Ken Burns drift */}
      {heroSlides.map((s, idx) => (
        <img
          key={s.slug}
          src={s.image}
          alt={pickL(s.title)}
          loading={idx === 0 ? "eager" : "lazy"}
          fetchPriority={idx === 0 ? "high" : "low"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "hero-kenburns opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-black/30" />

      {/* centered slide content */}
      <div className="relative z-10 flex min-h-[92svh] items-center justify-center px-14 pb-24 pt-36 sm:px-20 sm:pt-40">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" /> {pickL(slide.badge)}
              </span>
              <h1 className="mt-5 font-display text-[2.5rem] leading-[1.05] text-white drop-shadow-md sm:mt-6 sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
                {pickL(slide.title)},{" "}
                <em className="not-italic text-accent">
                  {pickL(slide.accent)}
                </em>
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] text-white/90 drop-shadow sm:mt-5 sm:text-xl">
                {pickL(slide.subtitle)}
              </p>
              <div className="mt-7 inline-flex items-baseline gap-2 rounded-full border border-white/60 bg-white/10 px-7 py-2.5 text-white backdrop-blur sm:mt-8">
                <span className="text-sm opacity-80">{t("tour.from")}</span>
                <bdi
                  dir="ltr"
                  className="font-display text-2xl font-semibold sm:text-3xl"
                >
                  {slide.price.replace("À partir de ", "")}
                </bdi>
              </div>
              <HoverScale className="mt-6">
                {slide.kind === "pilgrimage" ? (
                  <Link
                    to="/$lang/hajj-omra/$slug"
                    params={{ lang, slug: slide.slug }}
                    className="btn-primary"
                  >
                    {t("home.heroCta")} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/$lang/voyages/$slug"
                    params={{ lang, slug: slide.slug }}
                    className="btn-primary"
                  >
                    {t("home.heroCta")} <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </HoverScale>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* side arrows — vertically centered on the edges */}
      <button
        onClick={() => goTo(i - 1)}
        aria-label={t("home.prevProgram")}
        className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:left-6 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => goTo(i + 1)}
        aria-label={t("home.nextProgram")}
        className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:right-6 sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* dots — centered at the bottom */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center sm:bottom-8">
        {heroSlides.map((s, idx) => (
          <button
            key={s.slug}
            onClick={() => goTo(idx)}
            aria-label={`Aller au programme ${idx + 1}`}
            className="group flex h-9 items-center px-2"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${idx === i ? "w-8 bg-white" : "w-2 bg-white/50 group-hover:bg-white/80"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function FeaturedTours() {
  const { tours } = Route.useLoaderData();
  const t = useT();
  const lang = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative mt-16 overflow-hidden py-4 sm:mt-20">
      {/* centered header + pill */}
      <Reveal className="container-page mb-8 flex flex-col items-center text-center sm:mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          {t("home.organisedTrips")}
        </h2>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-primary">
          <span aria-hidden>•</span> {t("home.fareWithFlight")}{" "}
          <span aria-hidden>•</span>
        </span>
      </Reveal>

      {/* decorative yellow arc (echoes terratour's drawn line) */}
      <svg
        className="pointer-events-none absolute left-0 right-0 top-24 -z-0 mx-auto hidden h-64 w-full max-w-[1300px] md:block"
        viewBox="0 0 1300 260"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M-20 240 C 250 40, 520 40, 650 120 S 1050 240, 1320 40"
          stroke="#f2b705"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative">
        <div className="container-page">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="-ml-6 flex">
              {tours.map((t) => (
                <div
                  key={t.slug}
                  className="min-w-0 shrink-0 grow-0 basis-[82%] pl-6 sm:basis-[46%] lg:basis-[33.333%]"
                >
                  <TourCard tour={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* yellow circular nav arrows */}
        <button
          onClick={scrollPrev}
          aria-label={t("home.prev")}
          className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow text-white shadow-lg transition hover:brightness-105 sm:flex md:left-6 md:h-14 md:w-14"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={scrollNext}
          aria-label={t("home.next")}
          className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow text-white shadow-lg transition hover:brightness-105 sm:flex md:right-6 md:h-14 md:w-14"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="container-page mt-10 text-center">
        <Link
          to="/$lang/voyages"
          params={{ lang }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          {t("home.seeAllTrips")}
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
}

const pillars = [
  {
    icon: Compass,
    title: {
      fr: "20+ destinations",
      en: "20+ destinations",
      ar: "أكثر من 20 وجهة",
    },
    desc: {
      fr: "Asie, Europe, Amériques, Afrique — la planète à portée de main.",
      en: "Asia, Europe, the Americas, Africa — the planet within reach.",
      ar: "آسيا وأوروبا والأمريكتان وإفريقيا — العالم في متناول يدك.",
    },
  },
  {
    icon: Users,
    title: { fr: "Voyages en groupe", en: "Group travel", ar: "رحلات جماعية" },
    desc: {
      fr: "Guides francophones, ambiance conviviale, moments partagés.",
      en: "French-speaking guides, a friendly group, shared moments.",
      ar: "مرشدون ناطقون بالفرنسية، أجواء ودية، ولحظات مشتركة.",
    },
  },
  {
    icon: Shield,
    title: {
      fr: "Agence de confiance",
      en: "An agency you can trust",
      ar: "وكالة موثوقة",
    },
    desc: {
      fr: "Une équipe marocaine à votre écoute avant, pendant et après.",
      en: "A Moroccan team on hand before, during and after your trip.",
      ar: "فريق مغربي في خدمتك قبل الرحلة وأثناءها وبعدها.",
    },
  },
  {
    icon: Sparkles,
    title: { fr: "Sur mesure", en: "Tailor-made", ar: "حسب الطلب" },
    desc: {
      fr: "Circuits, croisières, MICE : tout se compose autour de vous.",
      en: "Tours, cruises, MICE — everything built around you.",
      ar: "جولات ورحلات بحرية ومؤتمرات: كل شيء يُصمم حولك.",
    },
  },
];

function PillarStrip() {
  const { pick: pickL } = useLocalized();
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page">
        <StaggerGroup className="grid gap-5 rounded-3xl border border-border bg-sand p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <StaggerItem key={title.fr} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg">{pickL(title)}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pickL(desc)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function HajjOmra() {
  const { pilgrimages } = Route.useLoaderData();
  const lang = useLocale();
  const t = useT();
  const { pick } = useLocalized();
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Driven off the real programmes rather than a hardcoded copy: this
            block used to quote its own prices, and they had drifted below the
            ones on the programme pages. One source, no drift. */}
        {pilgrimages.map((h, i) => (
          <Reveal key={h.slug} delay={i * 0.1}>
            <Link
              to="/$lang/hajj-omra/$slug"
              params={{ lang, slug: h.slug }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src={h.image}
                alt={pick(h.title)}
                loading="lazy"
                width={1200}
                height={800}
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                  {t(`hajj.${h.kind}`)}
                </span>
                <h3 className="mt-3 font-display text-3xl">{pick(h.title)}</h3>
                <p className="mt-2 text-sm opacity-90">
                  {t("tour.from")} <bdi>{pick(h.priceFrom)}</bdi>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MarocSection() {
  const t = useT();
  const { pick: pickL } = useLocalized();
  const lang = useLocale();
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <div className="eyebrow-hand">{t("home.destinations")}</div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl md:text-5xl">
            {t("home.moroccoTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("home.moroccoLead")}</p>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationsMaroc.map((d) => (
            <StaggerItem key={d.slug}>
              <article className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition duration-300 hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={d.image}
                    alt={pickL(d.name)}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-accent">
                    {pickL(d.tagline)}
                  </div>
                  <h3 className="mt-2 font-display text-2xl">{pickL(d.name)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{pickL(d.desc)}</p>
                {/* The link stretches over the whole card (after:absolute
                    inset-0): the photo reads as clickable, so it has to be.
                    One real anchor, not a click handler on the article — it
                    stays keyboard-reachable and middle-clickable. */}
                  <Link
                    to="/$lang/maroc"
                    params={{ lang }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
                  >
                    {t("action.moreDetail")} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function CruiseBanner() {
  const t = useT();
  const lang = useLocale();
  return (
    <section className="mt-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={IMG.cruise}
            alt={t("home.cruises")}
            loading="lazy"
            width={1920}
            height={800}
            className="h-[380px] w-full object-cover md:h-[440px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-page">
              <div className="max-w-lg text-white">
                <div className="eyebrow-hand">{t("home.cruises")}</div>
                <h2 className="mt-1 font-display text-4xl sm:text-5xl">
                  {t("home.cruisesTitle")}
                </h2>
                <p className="mt-3 opacity-90">{t("home.cruisesLead")}</p>
                <Link
                  to="/$lang/voyages"
                  params={{ lang }}
                  className="btn-primary mt-6 hover:-translate-y-0.5"
                >
                  {t("home.seeCruises")}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MICE() {
  const t = useT();
  const lang = useLocale();
  return (
    <section className="mt-16 sm:mt-24">
      <Reveal className="container-page grid gap-8 rounded-3xl bg-foreground p-6 text-background sm:p-8 md:grid-cols-2 md:p-14">
        <div>
          <div className="eyebrow-hand">MICE</div>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl">
            {t("home.miceTitle")}
          </h2>
          <p className="mt-4 opacity-80">{t("home.miceLead")}</p>
          <Link
            to="/$lang/mice"
            params={{ lang }}
            className="btn-primary mt-6 hover:-translate-y-0.5"
          >
            {t("action.learnMore")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {[
            businessNewspaper,
            skyscrapersBlue,
            streetProfessionals,
            teamCoworking,
            skyscrapersDusk,
          ].map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl ${i % 4 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Partners() {
  const t = useT();
  const loop = [...partners, ...partners, ...partners];
  return (
    <section className="mt-16 mb-16 sm:mt-24 sm:mb-24">
      <div className="container-page">
        <Reveal>
          <h2 className="text-center font-display text-3xl sm:text-4xl">
            {t("home.partners")}
          </h2>
          <div className="mt-8 overflow-hidden rounded-3xl border border-border">
            <div className="partners-track">
              {loop.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex h-28 w-48 shrink-0 items-center justify-center border-l border-border py-6 first:border-l-0"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className={`${p.tall ? "max-h-16" : "max-h-10"} max-w-[75%] object-contain`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
