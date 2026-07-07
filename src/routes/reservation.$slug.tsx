import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { featuredTours } from "@/lib/tours";
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

export const Route = createFileRoute("/reservation/$slug")({
  loader: ({ params }) => {
    const tour = featuredTours.find((t) => t.slug === params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Réservation — ${loaderData.tour.title} | Capital Tours` : "Réservation" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Reservation,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <div className="container-page py-40 text-center">
        <h1 className="font-display text-4xl">Programme introuvable</h1>
        <Link to="/voyages" className="btn-primary mt-6 inline-flex">Voir nos programmes</Link>
      </div>
      <Footer />
    </div>
  ),
});

const DEPOSIT = "3 000 dhs";
const STEPS = ["Informations", "Paiement", "Confirmation"] as const;

function Reservation() {
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
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                      i <= step ? "bg-primary text-white" : "bg-white text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
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
              {step === 2 && <ConfirmStep reference={ref} tourTitle={tour.title} />}
            </div>

            {/* Right: order summary */}
            <aside className="h-fit overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] lg:sticky lg:top-32">
              <img src={tour.image} alt={tour.title} className="h-40 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-lg leading-tight">{tour.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tour.subtitle}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> {tour.dates}
                </div>
                <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prix / personne</span>
                    <span className="font-semibold">{tour.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Acompte à payer</span>
                    <span className="font-semibold text-primary">{DEPOSIT}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Solde à l'agence</span>
                    <span>Avant le départ</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs text-primary">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> Paiement sécurisé — acompte remboursable sous conditions.
                </div>
              </div>
            </aside>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
            ⓘ Démonstration — paiement simulé. En production, cette étape est connectée à la passerelle
            bancaire marocaine (Payzone / CMI). Aucune carte n'est réellement débitée.
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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="font-display text-2xl">Vos informations</h2>
      <p className="mt-1 text-sm text-muted-foreground">Renseignez le voyageur principal.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" required placeholder="Prénom" />
        <Field label="Nom" required placeholder="Nom" />
        <Field label="Email" type="email" required placeholder="Email" />
        <Field label="Téléphone" required placeholder="Téléphone" />
        <Field label="Nombre de voyageurs" type="number" min={1} defaultValue={2} required />
        <Field label="Ville de départ" placeholder="Ville de départ" />
      </div>
      <button type="submit" className="btn-primary mt-8 w-full hover:-translate-y-0.5">
        Continuer vers le paiement <ArrowRight className="h-4 w-4" />
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
  return (
    <form onSubmit={onPay}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Paiement de l'acompte</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          <Lock className="h-3 w-3" /> Sécurisé
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Réglez <b className="text-primary">{DEPOSIT}</b> pour confirmer votre réservation.
      </p>

      <div className="mt-6 space-y-4">
        <Field label="Titulaire de la carte" required placeholder="Titulaire de la carte" />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Numéro de carte</span>
          <div className="flex items-center rounded-xl border border-border bg-white px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <input
              required
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />
          </div>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Expiration" required placeholder="MM / AA" />
          <Field label="CVC" required placeholder="123" />
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="btn-primary mt-8 w-full hover:-translate-y-0.5 disabled:opacity-70"
      >
        {processing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Traitement…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> Payer {DEPOSIT}
          </>
        )}
      </button>
      <button
        type="button"
        onClick={onBack}
        disabled={processing}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </button>
    </form>
  );
}

function ConfirmStep({ reference, tourTitle }: { reference: string; tourTitle: string }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <BadgeCheck className="h-9 w-9" />
      </div>
      <h2 className="mt-5 font-display text-3xl">Réservation confirmée !</h2>
      <p className="mt-2 text-muted-foreground">
        Merci — votre acompte de <b className="text-primary">{DEPOSIT}</b> pour <b>{tourTitle}</b> a bien été reçu.
      </p>
      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-sand px-5 py-2 text-sm">
        Référence : <b className="font-mono tracking-wider text-primary">{reference}</b>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Un conseiller Capital Tours vous contactera sous 24h pour finaliser votre dossier.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/voyages" className="btn-primary hover:-translate-y-0.5">Découvrir d'autres programmes</Link>
        <Link to="/" className="btn-ghost hover:-translate-y-0.5">Retour à l'accueil</Link>
      </div>
    </div>
  );
}
