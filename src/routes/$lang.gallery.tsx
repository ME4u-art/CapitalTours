import { createFileRoute } from "@tanstack/react-router";
import { tFor, useT } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const images = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
];

export const Route = createFileRoute("/$lang/gallery")({
  head: ({ params }) => {
    const t = tFor(params.lang);
    return {
      meta: [
        { title: t("meta.gallery.title") },
        { name: "description", content: t("gallery.lead") },
      ],
    };
  },
  component: GalleryPage,
});

function GalleryPage() {
  const t = useT();
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page py-20">
        <Reveal>
          <h1 className="font-display text-4xl">{t("gallery.title")}</h1>
          <p className="mt-3 text-muted-foreground">{t("gallery.lead")}</p>
        </Reveal>

        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <StaggerItem key={src} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)]">
              <img src={src} alt={`${t("gallery.title")} ${i + 1}`} loading="lazy" className="h-56 w-full object-cover" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </main>
      <Footer />
    </div>
  );
}
