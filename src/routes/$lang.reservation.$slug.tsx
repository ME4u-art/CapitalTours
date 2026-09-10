import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pickFor, tFor, useLocale, useLocalized, useT, type TranslationKey } from "@/i18n";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { featuredTours } from "@/lib/tours";
import { Reveal } from "@/components/motion/Reveal";
import {
  Calendar,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Loader2,
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";

export const Route = createFileRoute("/$lang/reservation/$slug")({
  loader: ({ params }) => {
    const tour = featuredTours.find((t) => t.slug === params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ params, loaderData }) => {
    const t = tFor(params.lang);
    const pick = pickFor(params.lang);
    return {
      meta: [
        {
          title: loaderData
            ? `${t("meta.reservation")} — ${pick(loaderData.tour.title)} | Capital Tours`
            : t("meta.reservation"),
        },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: Reservation,
  notFoundComponent: ReservationNotFound,
});

function ReservationNotFound() {
  const lang = useLocale();
  const t = useT();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container-page py-40 text-center">
        <h1 className="font-display text-4xl">{t("res.notFound")}</h1>
        <Link to="/$lang/voyages" params={{ lang }} className="btn-primary mt-6 inline-flex">
          {t("res.seePrograms")}
        </Link>
      </div>
      <Footer />
    </div>
  );
}

const DEPOSIT = "3 000 dhs";
const STEPS: TranslationKey[] = ["res.step1", "res.step2", "res.step3"];

function Reservation() {
  const t = useT();
  const { pick } = useLocalized();
  const { tour } = Route.useLoaderData();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [ref] = useState(() => "CT-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    // Simulated gateway round-trip (Payzone / CMI would go here in production).
    setTimeout(() => {
      setProcessing(false);
      setStep(2);
    }, 1900);
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-sand pb-20 pt-40">
        <div className="container-page">
          {/* Stepper */}
          <div className="mx-auto mb-10 flex max-w-xl items-center justify-between">
            {STEPS.map((key, i) => (
              <div key={key} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                      i <= step ? "bg-primary text-white" : "bg-white text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {t(key)}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 rounded ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Left: the active step */}
            <div className="rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              {step === 0 && <InfoStep onNext={() => setStep(1)} />}
              {step === 1 && (
                <PaymentStep processing={processing} onPay={pay} onBack={() => setStep(0)} />
              )}
              {step === 2 && <ConfirmStep reference={ref} tourTitle={pick(tour.title)} />}
            </div>

            {/* Right: order summary */}
            <aside className="h-fit lg:sticky lg:top-32">
            <Reveal className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <img src={tour.image} alt={pick(tour.title)} className="h-40 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-lg leading-tight">{pick(tour.title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{pick(tour.subtitle)}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> {pick(tour.dates)}
                </div>
                <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("res.pricePerPerson")}</span>
                    <span className="font-semibold"><bdi dir="ltr">{tour.price}</bdi></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("res.depositDue")}</span>
                    <span className="font-semibold text-primary"><bdi dir="ltr">{DEPOSIT}</bdi></span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t("res.balance")}</span>
                    <span>{t("res.beforeDeparture")}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs text-primary">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> {t("res.secureNote")}
                </div>
              </div>
            </Reveal>
            </aside>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
            ⓘ {t("res.demoNote")}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function InfoStep({ onNext }: { onNext: () => void }) {
  const t = useT();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="font-display text-2xl">{t("res.yourInfo")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("res.mainTraveller")}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label={t("contact.firstName")} required placeholder={t("contact.firstName")} />
        <Field label={t("contact.lastName")} required placeholder={t("contact.lastName")} />
        <Field label={t("contact.email")} type="email" dir="ltr" required placeholder={t("contact.email")} />
        <Field label={t("res.phone")} dir="ltr" required placeholder={t("res.phone")} />
        <Field label={t("res.travellers")} type="number" min={1} defaultValue={2} required />
        <Field label={t("res.departureCity")} placeholder={t("res.departureCity")} />
      </div>
      <button type="submit" className="btn-primary mt-8 w-full hover:-translate-y-0.5">
        {t("res.continue")} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function PaymentStep({
  processing,
  onPay,
  onBack,
}: {
  processing: boolean;
  onPay: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const t = useT();
  return (
    <form onSubmit={onPay}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">{t("res.payTitle")}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          <Lock className="h-3 w-3" /> {t("res.secureBadge")}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("res.payLead").replace("{amount}", DEPOSIT)}
      </p>

      <div className="mt-6 space-y-4">
        <Field label={t("res.cardHolder")} required placeholder={t("res.cardHolder")} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("res.cardNumber")}</span>
          <div className="flex items-center rounded-xl border border-border bg-white px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <input
              required
              dir="ltr"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />
          </div>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t("res.expiry")} dir="ltr" required placeholder="MM / AA" />
          <Field label={t("res.cvc")} dir="ltr" required placeholder="123" />
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="btn-primary mt-8 w-full hover:-translate-y-0.5 disabled:opacity-70"
      >
        {processing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {t("res.processing")}
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> {t("res.pay")} <bdi dir="ltr">{DEPOSIT}</bdi>
          </>
        )}
      </button>
      <button
        type="button"
        onClick={onBack}
        disabled={processing}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4" /> {t("res.back")}
      </button>
    </form>
  );
}

function ConfirmStep({ reference, tourTitle }: { reference: string; tourTitle: string }) {
  const lang = useLocale();
  const t = useT();
  return (
    <div className="py-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <BadgeCheck className="h-9 w-9" />
      </div>
      <h2 className="mt-5 font-display text-3xl">{t("res.confirmed")}</h2>
      <p className="mt-2 text-muted-foreground">
        {t("res.thanks").replace("{amount}", DEPOSIT).replace("{tour}", tourTitle)}
      </p>
      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-sand px-5 py-2 text-sm">
        {t("res.reference")} : <b className="font-mono tracking-wider text-primary"><bdi dir="ltr">{reference}</bdi></b>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{t("res.followUp")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/$lang/voyages" params={{ lang }} className="btn-primary hover:-translate-y-0.5">
          {t("res.otherPrograms")}
        </Link>
        <Link to="/$lang" params={{ lang }} className="btn-ghost hover:-translate-y-0.5">
          {t("action.backHome")}
        </Link>
      </div>
    </div>
  );
}
