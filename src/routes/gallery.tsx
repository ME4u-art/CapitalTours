import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { galleryTitle } from "@/lib/pilgrimage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: galleryTitle }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-page py-20">
        <Reveal>
          <h1 className="font-display text-4xl">{galleryTitle}</h1>
          <p className="mt-3 text-muted-foreground">Quelques souvenirs de nos dernières sorties et pèlerinages.</p>
        </Reveal>

        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <StaggerItem key={i} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)]">
              <img src={src} alt={`${galleryTitle} ${i + 1}`} loading="lazy" className="h-56 w-full object-cover" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </main>
      <Footer />
    </div>
  );
}
