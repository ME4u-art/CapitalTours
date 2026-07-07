import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Capital Tours" },
      { name: "description", content: "Contactez notre équipe pour un devis, une réservation ou un renseignement." },
      { property: "og:title", content: "Contact — Capital Tours" },
      { property: "og:description", content: "Contactez notre équipe." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 container-page grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</div>
          <h1 className="mt-2 font-display text-5xl">Parlons de votre prochain voyage.</h1>
          <p className="mt-4 text-muted-foreground">Notre équipe vous répond sous 24h ouvrées.</p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><Phone className="h-4 w-4"/></span>  +212 5 35 62 63 63 / +212 5 35 94 47 25</li>
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><Mail className="h-4 w-4"/></span> contact@capitaltours.ma</li>
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><MapPin className="h-4 w-4"/></span> fez, Maroc</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
        <form className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] space-y-4" onSubmit={(e)=>e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">Prénom<input className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></label>
            <label className="block text-sm">Nom<input className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></label>
          </div>
          <label className="block text-sm">Email<input type="email" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></label>
          <label className="block text-sm">Sujet<input className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></label>
          <label className="block text-sm">Message<textarea rows={5} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></label>
          <button className="btn-primary w-full">Envoyer</button>
        </form>
        </Reveal>
      </section>
      <Footer />
    </div>
  ),
});
