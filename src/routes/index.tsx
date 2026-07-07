import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { FloatingRail } from "@/components/site/FloatingRail";
import { featuredTours, destinationsMaroc, IMG } from "@/lib/tours";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Shield, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capital Tours — Agence de voyages au Maroc" },
      { name: "description", content: "Voyages organisés, circuits, croisières, Hajj & Omra et MICE. Découvrez le monde avec Capital Tours, votre agence de voyages basée au Maroc." },
      { property: "og:title", content: "Capital Tours — Agence de voyages au Maroc" },
      { property: "og:description", content: "Voyages organisés, circuits, croisières, Hajj & Omra et MICE." },
      { property: "og:type", content: "website" },
    ],
  }),
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
      <Footer />
      <FloatingRail />
    </div>
  );
}

const heroSlides = [
  { kind: "pilgrimage", slug: "omra-2026", image: IMG.hajj, badge: "عمرة 2026 · Omra", title: "Omra 2026", accent: "vol direct vers Médine.", subtitle: "Hôtels proches du Haram et encadrement complet — plusieurs départs en juillet & août 2026.", price: "À partir de 17 000 dh" },
  { kind: "pilgrimage", slug: "hajj-2027", image: "/Hajj.jpg", badge: "الحج 1448هـ · Hajj 2027", title: "Hajj 1448H / 2027", accent: "un pèlerinage accompagné.", subtitle: "3 formules (Économique, Moyen, Touristique 5★), vol direct et tout compris.", price: "À partir de 77 000 dh" },
  { kind: "tour", slug: "maldives-sri-lanka", image: IMG.thailand, badge: "Été 2026 — Nouveaux programmes", title: "Maldives & Sri Lanka", accent: "évasion tropicale.", subtitle: "Casa · Malé · Colombo — 14 jours entre plages paradisiaques et culture. Du 18 au 31 juillet.", price: "À partir de 30 800 dh" },
  { kind: "tour", slug: "saint-petersbourg-moscou", image: IMG.prague, badge: "Été 2026 — Nouveaux programmes", title: "Saint-Pétersbourg / Moscou", accent: "palais impériaux.", subtitle: "9 jours entre la Neva et la Place Rouge. Du 2 au 10 août 2026.", price: "À partir de 18 500 dh" },
  { kind: "tour", slug: "istanbul", image: IMG.hero, badge: "Été 2026 — Nouveaux programmes", title: "Istanbul", accent: "entre deux continents.", subtitle: "Départ Rabat · Hôtel Eyfel 3★ · 3 jours d'excursions. Plusieurs dates en juillet & août.", price: "À partir de 8 800 dh" },
] as const;

function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[i];

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      {/* cross-fading programme photos */}
      {heroSlides.map((s, idx) => (
        <img
          key={s.slug}
          src={s.image}
          alt={s.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

      <div className="relative z-10 flex min-h-[92vh] items-end pb-20 pt-36 sm:pb-24 sm:pt-40">
        <div className="container-page">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" /> {slide.badge}
          </span>
          <h1 key={slide.slug} className="mt-6 max-w-4xl font-display text-4xl leading-[1.02] text-white sm:text-5xl md:text-7xl">
            {slide.title}, <br className="hidden sm:inline" />
            <em className="not-italic text-accent">{slide.accent}</em>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">{slide.subtitle}</p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="w-full rounded-2xl bg-accent px-5 py-3 text-accent-foreground shadow-lg sm:w-auto">
              <div className="text-xs font-medium uppercase opacity-80">À partir de</div>
              <div className="font-display text-2xl font-semibold">{slide.price.replace("À partir de ", "")}</div>
            </div>
            {slide.kind === "pilgrimage" ? (
              <Link to="/hajj-omra/$slug" params={{ slug: slide.slug }} className="btn-primary w-full justify-center hover:-translate-y-0.5 sm:w-auto">
                Voir le programme <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link to="/voyages/$slug" params={{ slug: slide.slug }} className="btn-primary w-full justify-center hover:-translate-y-0.5 sm:w-auto">
                Découvrir l'offre <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link to="/voyages" className="btn-ghost w-full justify-center hover:-translate-y-0.5 sm:w-auto">Tous nos programmes</Link>
          </div>

          {/* slide dots */}
          <div className="mt-8 flex gap-2">
            {heroSlides.map((s, idx) => (
              <button
                key={s.slug}
                onClick={() => setI(idx)}
                aria-label={`Aller au programme ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${idx === i ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedTours() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative mt-16 overflow-hidden py-4 sm:mt-20">
      {/* centered header + pill */}
      <div className="container-page mb-8 flex flex-col items-center text-center sm:mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Voyages organisés</h2>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-primary">
          <span aria-hidden>•</span> Tarif avec billet d'avion <span aria-hidden>•</span>
        </span>
      </div>

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
              {featuredTours.map((t) => (
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
          aria-label="Précédent"
          className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow text-white shadow-lg transition hover:brightness-105 sm:flex md:left-6 md:h-14 md:w-14"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Suivant"
          className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow text-white shadow-lg transition hover:brightness-105 sm:flex md:right-6 md:h-14 md:w-14"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="container-page mt-10 text-center">
        <Link to="/voyages" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
          Voir tous les voyages <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

const pillars = [
  { icon: Compass, title: "20+ destinations", desc: "Asie, Europe, Amériques, Afrique — la planète à portée de main." },
  { icon: Users, title: "Voyages en groupe", desc: "Guides francophones, ambiance conviviale, moments partagés." },
  { icon: Shield, title: "Agence de confiance", desc: "Une équipe marocaine à votre écoute avant, pendant et après." },
  { icon: Sparkles, title: "Sur mesure", desc: "Circuits, croisières, MICE : tout se compose autour de vous." },
];

function PillarStrip() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page">
        <div className="grid gap-5 rounded-3xl border border-border bg-sand p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HajjOmra() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page grid gap-4 sm:gap-6 md:grid-cols-2">
        {[
          { title: "برنامج الحج 1448هـ / 2027م", label: "Hajj", price: "À partir de 76 500 dhs", href: "/hajj-omra" },
          { title: "برنامج العمرة 1447هـ / 2026م", label: "Omra", price: "À partir de 15 900 dhs", href: "/hajj-omra" },
        ].map((h, i) => (
          <Link key={i} to="/hajj-omra" className="group relative overflow-hidden rounded-3xl">
            <img src={IMG.hajj} alt={h.title} loading="lazy" width={1200} height={800} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{h.label}</span>
              <h3 dir="rtl" className="mt-3 font-display text-3xl">{h.title}</h3>
              <p className="mt-2 text-sm opacity-90">{h.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MarocSection() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <div className="eyebrow-hand">Nos destinations</div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl md:text-5xl">Le Maroc, autrement.</h2>
          <p className="mt-3 text-muted-foreground">Explorez le Royaume à travers ses villes impériales, ses côtes et ses déserts — entre culture, détente et aventure.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationsMaroc.map((d) => (
            <article key={d.slug} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-accent">{d.tagline}</div>
                <h3 className="mt-2 font-display text-2xl">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                <Link to="/maroc" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Plus de détail <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CruiseBanner() {
  return (
    <section className="mt-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={IMG.cruise} alt="Croisière" loading="lazy" width={1920} height={800} className="h-[380px] w-full object-cover md:h-[440px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-page">
              <div className="max-w-lg text-white">
                <div className="eyebrow-hand">Nos croisières</div>
                <h2 className="mt-1 font-display text-4xl sm:text-5xl">Découvrez le monde au fil de l'eau.</h2>
                <p className="mt-3 opacity-90">Caraïbes, Méditerranée orientale, tour du monde — nos partenaires : Royal Caribbean, MSC et bien plus.</p>
                <Link to="/voyages" className="btn-primary mt-6 hover:-translate-y-0.5">
                  Voir les croisières <ArrowRight className="h-4 w-4" />
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
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page grid gap-8 rounded-3xl bg-foreground p-6 text-background sm:p-8 md:grid-cols-2 md:p-14">
        <div>
          <div className="eyebrow-hand">MICE</div>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl">Meetings, Incentives, Conferences &amp; Exhibitions</h2>
          <p className="mt-4 opacity-80">
            Capital Tours vous accompagne dans l'organisation de séminaires, conférences, congrès et voyages incentives.
            De la conception à la logistique, nous créons des expériences professionnelles mémorables.
          </p>
          <Link to="/mice" className="btn-primary mt-6 hover:-translate-y-0.5">
            En savoir plus <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {[IMG.marrakech, IMG.prague, IMG.thailand, IMG.china, IMG.vietnam, IMG.sahara].map((src, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${i % 4 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}>
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
