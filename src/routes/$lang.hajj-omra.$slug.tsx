import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pickFor, tFor, useLocale, useLocalized, useT } from "@/i18n";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { agencyPhones, agencyAddresses, whatsappNumber, type PriceRow } from "@/lib/pilgrimage";
import { content } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import {
  Plane,
  Check,
  Phone,
  CalendarDays,
  Clock,
  ChevronRight,
  MessageCircle,
  BadgeCheck,
} from "lucide-react";

export const Route = createFileRoute("/$lang/hajj-omra/$slug")({
  loader: async ({ params }) => {
    const program = await content.getPilgrimageProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ params, loaderData }) => {
    const t = tFor(params.lang);
    const pick = pickFor(params.lang);
    if (!loaderData) return { meta: [{ title: t("hajj.notFound") }] };
    const p = loaderData.program;
    const title = `${pick(p.title)} — Capital Tours`;
    return {
      meta: [
        { title },
        { name: "description", content: `${pick(p.intro)} ${t("tour.from")} ${pick(p.priceFrom)}.` },
        { property: "og:title", content: title },
        { property: "og:image", content: p.image },
      ],
    };
  },
  component: ProgramDetail,
  notFoundComponent: ProgramNotFound,
});

function ProgramNotFound() {
  const lang = useLocale();
  const t = useT();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container-page py-40 text-center">
        <h1 className="font-display text-4xl">{t("hajj.notFound")}</h1>
        <Link to="/$lang/hajj-omra" params={{ lang }} className="btn-primary mt-6 inline-flex">
          {t("hajj.backToPrograms")}
        </Link>
      </div>
      <Footer />
    </div>
  );
}

/** Prices are digits — always LTR, whatever direction the page runs in. */
function Price({ children }: { children: React.ReactNode }) {
  return <bdi dir="ltr">{children}</bdi>;
}

function PriceTable({ rows }: { rows: PriceRow[] }) {
  const t = useT();
  const { pick } = useLocalized();
  return (
    <>
      {/* mobile — one card per hotel, no horizontal scrolling */}
      <div className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.label.fr} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="bg-accent px-4 py-3 text-accent-foreground">
              <div className="text-sm font-semibold">{pick(r.label)}</div>
              {r.sub && <div className="mt-0.5 text-xs opacity-80">{pick(r.sub)}</div>}
            </div>
            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-border text-center">
              {[
                { room: t("hajj.roomDouble"), price: r.double, highlight: true },
                { room: t("hajj.roomTriple"), price: r.triple },
                { room: t("hajj.roomQuad"), price: r.quad },
              ].map((c) => (
                <div key={c.room} className="px-2 py-3">
                  <div className="text-xs text-muted-foreground">{c.room}</div>
                  <div className={`mt-1 text-sm font-semibold ${c.highlight ? "text-primary" : ""}`}>
                    <Price>{c.price}</Price>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* tablet & desktop — comparison table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border sm:block">
        <div className="grid grid-cols-4 gap-2 bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground">
          <span className="text-start">{t("hajj.hotel")}</span>
          <span>{t("hajj.roomDouble")}</span>
          <span>{t("hajj.roomTriple")}</span>
          <span>{t("hajj.roomQuad")}</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.label.fr} className={`grid grid-cols-4 items-center gap-2 border-b border-border px-4 py-3 text-center text-sm last:border-0 ${i % 2 ? "bg-sand" : "bg-card"}`}>
            <div className="text-start">
              <div className="font-medium">{pick(r.label)}</div>
              {r.sub && <div className="text-xs text-muted-foreground">{pick(r.sub)}</div>}
            </div>
            <div className="font-semibold text-primary"><Price>{r.double}</Price></div>
            <div className="font-semibold"><Price>{r.triple}</Price></div>
            <div className="font-semibold"><Price>{r.quad}</Price></div>
          </div>
        ))}
      </div>
    </>
  );
}

const selectClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Required() {
  return <span className="text-primary">*</span>;
}

function BookingForm({
  programTitle,
  hotels,
  dates,
  programs,
}: {
  programTitle: string;
  hotels: string[];
  dates: string[];
  programs: string[];
}) {
  const t = useT();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BadgeCheck className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-xl">{t("book.sentTitle")}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("book.sentBody").replace("{program}", programTitle)}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
      <div className="bg-accent px-6 py-4 text-center font-display text-xl font-semibold text-accent-foreground">
        {t("book.title")}
      </div>
      <form
        className="space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <p className="text-sm text-muted-foreground">{t("book.lead")}</p>
        {programs.length > 1 && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">{t("book.program")} <Required /></span>
            <select required defaultValue="" className={selectClass}>
              <option value="" disabled>{t("book.chooseProgram")}</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
        )}
        {dates.length > 1 && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">{t("book.date")} <Required /></span>
            <select required defaultValue="" className={selectClass}>
              <option value="" disabled>{t("book.chooseDate")}</option>
              {dates.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
        )}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("hajj.hotel")} <Required /></span>
          <select required defaultValue="" className={selectClass}>
            <option value="" disabled>{t("book.chooseHotel")}</option>
            {hotels.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("book.room")} <Required /></span>
          <select required defaultValue="" className={selectClass}>
            <option value="" disabled>{t("book.chooseRoom")}</option>
            <option value="double">{t("hajj.roomDouble")}</option>
            <option value="triple">{t("hajj.roomTriple")}</option>
            <option value="quad">{t("hajj.roomQuad")}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("book.people")} <Required /></span>
          <input type="number" min={1} defaultValue={1} required className={selectClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("book.fullName")} <Required /></span>
          <input required placeholder={t("book.fullName")} className={selectClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("contact.email")}</span>
          <input type="email" dir="ltr" placeholder="yourname@example.com" className={`${selectClass} text-start`} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("book.phone")} <Required /></span>
          <input required dir="ltr" placeholder="+212 6 00 00 00 00" className={`${selectClass} text-start`} />
        </label>
        <button type="submit" className="btn-primary w-full hover:-translate-y-0.5">{t("book.submit")}</button>
        <p className="text-[11px] leading-relaxed text-muted-foreground">{t("book.privacy")}</p>
      </form>
    </div>
  );
}

function ProgramDetail() {
  const lang = useLocale();
  const t = useT();
  const { pick, pickList } = useLocalized();
  const { program } = Route.useLoaderData();

  const dates = pickList(program.dates);

  return (
    <div className="min-h-screen">
      <Header />

      {/* hero */}
      <section className="relative overflow-hidden">
        <img src={program.image} alt={pick(program.title)} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60" />
        <div className="relative z-10 pb-10 pt-40">
          <div className="container-page text-white">
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">{pick(program.title)}</h1>
            <div className="mt-3 inline-flex flex-wrap items-baseline gap-2 text-lg">
              <span className="opacity-80">{t("tour.from")}</span>
              <span className="font-display text-3xl" style={{ color: "var(--brand-yellow)" }}>
                <bdi>{pick(program.priceFrom)}</bdi>
              </span>
              <span className="opacity-80">{t("tour.perPerson")}</span>
            </div>
            <div className="mt-5">
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary inline-flex"
              >
                {t("book.title")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* breadcrumb */}
      <div className="border-b border-border bg-sand">
        <div className="container-page flex items-center gap-1.5 py-3 text-sm text-muted-foreground">
          <Link to="/$lang" params={{ lang }} className="hover:text-primary">{t("nav.home")}</Link>
          <ChevronRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          <Link to="/$lang/hajj-omra" params={{ lang }} className="hover:text-primary">{t("hajj.eyebrow")}</Link>
          <ChevronRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          <span className="font-semibold text-foreground">{pick(program.shortTitle)}</span>
        </div>
      </div>

      {/* two-column content */}
      <section className="py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_360px]">
          <Reveal className="min-w-0">
            {/* trip facts */}
            <div className="rounded-3xl bg-primary p-6 text-white sm:p-8">
              <div className="text-lg font-semibold">
                <span className="opacity-80">{t("hajj.via")} : </span>{pick(program.flightRoute)}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {dates.map((d) => (
                  <span key={d} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
                    <CalendarDays className="h-4 w-4" /> {d}
                  </span>
                ))}
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
                  <Clock className="h-4 w-4" /> {pick(program.duration)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
                  <Plane className="h-4 w-4" /> {pick(program.flight)}
                </span>
              </div>
              {dates.length > 1 && (
                <p className="mt-3 text-sm opacity-80">{t("hajj.multiDates")}</p>
              )}
            </div>

            {/* description */}
            <h2 className="mt-10 font-display text-3xl text-primary">{t("hajj.tripDescription")}</h2>
            <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
              {pickList(program.description).map((p) => <p key={p}>{p}</p>)}
            </div>

            {/* prices and hotels */}
            <h2 className="mt-10 font-display text-3xl text-primary">{t("hajj.pricesTitle")}</h2>
            <div className="mt-4 space-y-8">
              {program.tables.map((table, i) => (
                <div key={i}>
                  {table.name && (
                    <div className="mb-3 flex items-center gap-3">
                      {table.tag && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                          {pick(table.tag)}
                        </span>
                      )}
                      <h3 className="font-display text-2xl">{pick(table.name)}</h3>
                    </div>
                  )}
                  <PriceTable rows={table.rows} />
                </div>
              ))}
              <p className="text-xs text-muted-foreground">{t("hajj.priceNote")}</p>
            </div>

            {/* what the price includes */}
            <h2 className="mt-10 font-display text-3xl text-primary">{t("hajj.included")}</h2>
            <ul className="mt-4 space-y-2">
              {pickList(program.includes).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* notes and badges */}
            {(program.notes.fr.length > 0 || program.badges.length > 0) && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {program.notes.fr.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="font-semibold text-primary">{t("hajj.note")}</div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {pickList(program.notes).map((n) => (
                        <li key={n} className="flex gap-2"><span className="text-primary">•</span> {n}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {program.badges.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {program.badges.map((b) => (
                      <div key={b.text.fr} className={`rounded-2xl px-5 py-4 text-center text-sm font-semibold text-white ${b.tone === "green" ? "bg-[#1f7a4d]" : "bg-primary"}`}>
                        {pick(b.text)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Reveal>

          {/* sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
          <Reveal className="space-y-5">
            <div className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="bg-accent px-6 py-4 text-center font-display text-lg font-semibold text-accent-foreground">
                {t("footer.contact")}
              </div>
              <div className="space-y-2 p-5" dir="ltr">
                {agencyPhones.slice(0, 2).map((tel) => (
                  <a key={tel} href={`tel:${tel.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:border-primary hover:text-primary">
                    <Phone className="h-4 w-4" /> {tel}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-3xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-[var(--shadow-soft)] hover:opacity-95"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-center">
                {t("hajj.whatsapp")}
                <span className="block text-sm font-normal opacity-90" dir="ltr">{whatsappNumber}</span>
              </span>
            </a>

            <div id="booking" className="scroll-mt-28">
              <BookingForm
                programTitle={pick(program.shortTitle)}
                hotels={program.tables.flatMap((tb) => tb.rows.map((r) => pick(r.label)))}
                dates={dates}
                programs={program.tables.flatMap((tb) => (tb.name ? [pick(tb.name)] : []))}
              />
            </div>
          </Reveal>
          </aside>
        </div>
      </section>

      {/* photo gallery */}
      {program.gallery.length > 0 && (
        <section className="bg-sand py-16">
          <div className="container-page">
            <div className="text-center">
              <div className="text-sm font-bold" style={{ color: "var(--brand-yellow)" }}>{t("hajj.galleryEyebrow")}</div>
              <h2 className="mt-1 font-display text-3xl text-primary sm:text-4xl">{t("hajj.gallery")}</h2>
            </div>
            <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {program.gallery.map((src, i) => (
                <StaggerItem key={src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                  <img src={src} alt={`${pick(program.shortTitle)} — ${t("hajj.photo")} ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* addresses */}
      <section className="py-16">
        <div className="container-page">
          <div className="rounded-3xl bg-sand px-8 py-8 text-center text-sm text-muted-foreground">
            {pick(agencyAddresses[0])} — {pick(agencyAddresses[1])}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
