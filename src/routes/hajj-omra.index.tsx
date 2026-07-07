import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG } from "@/lib/tours";
import { pilgrimagePrograms, agencyPhones, agencyAddresses } from "@/lib/pilgrimage";
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
  ArrowLeft,
} from "lucide-react";

export const Route = createFileRoute("/hajj-omra/")({
  head: () => ({
    meta: [
      { title: "العمرة والحج — Capital Tours" },
      { name: "description", content: "برامج العمرة (طيران مباشر إلى المدينة المنورة) والحج 1448هـ / 2027م مع كابيتال تورز. الأسعار والفنادق والتواريخ انطلاقاً من المغرب." },
      { property: "og:title", content: "العمرة والحج — Capital Tours" },
      { property: "og:description", content: "العمرة والحج انطلاقاً من المغرب — الأسعار والفنادق والتواريخ." },
      { property: "og:image", content: IMG.hajj },
    ],
  }),
  component: HajjOmraIndex,
});

const services = [
  { icon: Plane, label: "تذكرة الطيران ذهاباً وإياباً" },
  { icon: Building2, label: "الإقامة في الفنادق" },
  { icon: Bus, label: "التنقلات داخل السعودية" },
  { icon: MapPin, label: "زيارات بمكة والمدينة" },
  { icon: UserCheck, label: "مرشد مرافق للمجموعة" },
  { icon: BadgeCheck, label: "رسوم التأشيرة مشمولة" },
];

const whyUs = [
  "مجموعات مؤطَّرة ومريحة",
  "مرشدون دينيون ذوو خبرة",
  "مرافقة روحية",
  "فنادق قريبة من الحرم",
  "مساعدة على مدار الساعة",
  "طيران مباشر — وكالة موثوقة",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-bold" style={{ color: "var(--brand-yellow)" }}>{children}</div>;
}

function HajjOmraIndex() {
  return (
    <div className="min-h-screen">
      <Header />

      <div dir="rtl">
        {/* البطل */}
        <section className="relative h-[70vh] overflow-hidden">
          <img src={IMG.hajj} alt="الكعبة المشرفة" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />
          <div className="relative z-10 flex h-full items-end pb-16 pt-40">
            <div className="container-page text-white">
              <Eyebrow>العمرة والحج</Eyebrow>
              <h1 className="mt-2 font-display text-5xl leading-tight sm:text-6xl">سافروا بكل طمأنينة إلى الأماكن المقدسة</h1>
              <p className="mt-4 max-w-2xl text-lg opacity-90">
                برامج متكاملة، وتأطير ديني، وفنادق قريبة من الحرم، وطيران مباشر — انطلاقاً من المغرب.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/hajj-omra/$slug" params={{ slug: "omra-2026" }} className="btn-primary hover:-translate-y-0.5">
                  برنامج العمرة <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link to="/hajj-omra/$slug" params={{ slug: "hajj-2027" }} className="btn-ghost hover:-translate-y-0.5">
                  برنامج الحج 2027
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* بطاقات البرامج — انقر للتفاصيل */}
        <section className="py-16">
          <div className="container-page">
            <div className="text-center">
              <Eyebrow>برامجنا</Eyebrow>
              <h2 className="mt-1 font-display text-4xl sm:text-5xl">اختر برنامجك</h2>
              <p className="mt-3 text-muted-foreground">اضغط على البرنامج لعرض الأسعار والفنادق والتفاصيل الكاملة.</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {pilgrimagePrograms.map((p) => (
                <Link
                  key={p.slug}
                  to="/hajj-omra/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block h-80 overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]"
                >
                  <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{p.shortTitle}</span>
                    <h3 className="mt-3 font-display text-4xl">{p.kind}</h3>
                    <p className="mt-2 max-w-md text-sm opacity-90">{p.intro}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="font-semibold" style={{ color: "var(--brand-yellow)" }}>ابتداءً من {p.priceFrom}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                        <CalendarDays className="h-3.5 w-3.5" /> {p.datesLabel}
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
                      عرض التفاصيل والأسعار <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* الخدمات المشمولة */}
        <section className="bg-sand py-16">
          <div className="container-page">
            <div className="text-center">
              <Eyebrow>كل شيء مشمول</Eyebrow>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl">خدماتنا المشمولة</h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {services.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 text-center shadow-[var(--shadow-soft)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* لماذا نحن */}
        <section className="py-16">
          <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>لماذا كابيتال تورز</Eyebrow>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl">مرافقة تثقون بها</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyUs.map((w) => (
                  <li key={w} className="flex items-center gap-2 rounded-xl bg-sand px-4 py-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" /> {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl">
              <img src={IMG.hajj} alt="الحج والعمرة" className="h-80 w-full object-cover" />
            </div>
          </div>
        </section>

        {/* التواصل */}
        <section className="pb-20">
          <div className="container-page">
            <div className="rounded-3xl bg-primary px-8 py-12 text-center text-white">
              <h2 className="font-display text-3xl sm:text-4xl">احجز مكانك الآن</h2>
              <p className="mx-auto mt-3 max-w-xl opacity-90">يرافقكم مستشارونا لاختيار الصيغة المثالية. تواصلوا مع كابيتال تورز:</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3" dir="ltr">
                {agencyPhones.map((tel) => (
                  <a key={tel} href={`tel:${tel.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25">
                    <Phone className="h-4 w-4" /> {tel}
                  </a>
                ))}
              </div>
              <p className="mt-6 text-sm opacity-90">
                {agencyAddresses[0]}
                <br />
                {agencyAddresses[1]}
              </p>
              <p className="mt-2 text-sm opacity-80">فيسبوك: Capitaltours · إنستغرام: Capitaltoursmaroc</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
