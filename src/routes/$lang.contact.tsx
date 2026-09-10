import { createFileRoute } from "@tanstack/react-router";
import { tFor, useT } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.contact.title") },
        { name: "description", content: t("meta.contact.desc") },
        { property: "og:title", content: t("meta.contact.title") },
        { property: "og:description", content: t("meta.contact.desc") },
      ],
    };
  },
  component: ContactPage,
});

const field =
  "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function ContactPage() {
  const t = useT();
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 container-page grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">{t("footer.contact")}</div>
          <h1 className="mt-2 font-display text-5xl">{t("contact.title")}</h1>
          <p className="mt-4 text-muted-foreground">{t("contact.lead")}</p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><Phone className="h-4 w-4" /></span>
              <bdi dir="ltr">+212 5 35 62 63 63 / +212 5 35 94 47 25</bdi>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><Mail className="h-4 w-4" /></span>
              <bdi dir="ltr">contact@capitaltours.ma</bdi>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><MapPin className="h-4 w-4" /></span>
              {t("contact.city")}
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">{t("contact.firstName")}<input className={field} /></label>
              <label className="block text-sm">{t("contact.lastName")}<input className={field} /></label>
            </div>
            <label className="block text-sm">{t("contact.email")}<input type="email" dir="ltr" className={field} /></label>
            <label className="block text-sm">{t("contact.subject")}<input className={field} /></label>
            <label className="block text-sm">{t("contact.message")}<textarea rows={5} className={field} /></label>
            <button className="btn-primary w-full">{t("contact.send")}</button>
          </form>
        </Reveal>
      </section>
      <Footer />
    </div>
  );
}
