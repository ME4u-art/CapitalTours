# Site-wide Animation Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add consistent scroll-reveal, staggered grid entrance, hover micro-interaction, and route-transition animation across the Capital Tours site using framer-motion.

**Architecture:** Three tiny reusable primitives (`Reveal`, `StaggerGroup`/`StaggerItem`, `HoverScale`) live in `src/components/motion/` and get imported into route files to wrap existing JSX sections — no restructuring of existing markup, just wrapping. Route transitions and reduced-motion support are wired once in `__root.tsx`.

**Tech Stack:** React 19, TanStack Router/Start, Tailwind CSS v4, `framer-motion` (new dependency).

**Note on verification:** This is visual/animation work with no meaningful unit-testable behavior (framer-motion handles the actual animation timing). Each task's "verify" step is `npx tsc --noEmit` (catches JSX/type errors) — the plan finishes with one full manual browser pass (Task 20) instead of per-task browser checks, to avoid 19 redundant dev-server round trips.

---

### Task 1: Install framer-motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the dependency**

Run: `npm install framer-motion`

- [ ] **Step 2: Verify it resolves**

Run: `node -e "require.resolve('framer-motion')"`
Expected: prints a path, no error.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion dependency"
```

---

### Task 2: Create the `Reveal` scroll-reveal primitive

**Files:**
- Create: `src/components/motion/Reveal.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors related to `Reveal.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/Reveal.tsx
git commit -m "feat: add Reveal scroll-animation primitive"
```

---

### Task 3: Create the `StaggerGroup`/`StaggerItem` primitives

**Files:**
- Create: `src/components/motion/Stagger.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors related to `Stagger.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/Stagger.tsx
git commit -m "feat: add StaggerGroup/StaggerItem animation primitives"
```

---

### Task 4: Create the `HoverScale` primitive

**Files:**
- Create: `src/components/motion/HoverScale.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function HoverScale({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors related to `HoverScale.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/HoverScale.tsx
git commit -m "feat: add HoverScale hover-animation primitive"
```

---

### Task 5: Wire reduced-motion support and route transitions into the root shell

**Files:**
- Modify: `src/routes/__root.tsx:1-10` (imports)
- Modify: `src/routes/__root.tsx:113-122` (`RootComponent`)

- [ ] **Step 1: Add imports**

Old:
```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
```

New:
```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
```

- [ ] **Step 2: Wrap `RootComponent` in `MotionConfig` and animate `Outlet` transitions**

Old:
```tsx
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
```

New:
```tsx
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: add reduced-motion config and route-transition fade"
```

---

### Task 6: Apply `HoverScale` to `Header` nav links and CTA

**Files:**
- Modify: `src/components/site/Header.tsx`

- [ ] **Step 1: Import `HoverScale`**

Old:
```tsx
import { Link } from "@tanstack/react-router";
import { Mail, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
```

New:
```tsx
import { Link } from "@tanstack/react-router";
import { Mail, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { HoverScale } from "@/components/motion/HoverScale";
```

- [ ] **Step 2: Wrap the desktop nav links**

Old:
```tsx
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
```

New:
```tsx
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <HoverScale key={n.to}>
                <Link
                  to={n.to}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                >
                  {n.label}
                </Link>
              </HoverScale>
            ))}
          </nav>
```

- [ ] **Step 3: Wrap the desktop "Nous contacter" CTA (remove the now-redundant CSS hover lift)**

Old:
```tsx
          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn-primary hidden sm:inline-flex hover:-translate-y-0.5">
              Nous contacter
            </Link>
```

New:
```tsx
          <div className="flex items-center gap-2">
            <HoverScale className="hidden sm:block">
              <Link to="/contact" className="btn-primary inline-flex">
                Nous contacter
              </Link>
            </HoverScale>
```

- [ ] **Step 4: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/Header.tsx
git commit -m "feat: animate Header nav links and CTA on hover"
```

---

### Task 7: Apply `HoverScale` to `TourCard`

**Files:**
- Modify: `src/components/site/TourCard.tsx`

- [ ] **Step 1: Import `HoverScale` and wrap the card `Link`**

Old:
```tsx
import type { Tour } from "@/lib/tours";
import { Link } from "@tanstack/react-router";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      to="/voyages/$slug"
      params={{ slug: tour.slug }}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)] transition duration-300 hover:shadow-[var(--shadow-lift)]"
    >
```

New:
```tsx
import type { Tour } from "@/lib/tours";
import { Link } from "@tanstack/react-router";
import { HoverScale } from "@/components/motion/HoverScale";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <HoverScale className="h-full w-full">
    <Link
      to="/voyages/$slug"
      params={{ slug: tour.slug }}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[28px] shadow-[var(--shadow-soft)] transition duration-300 hover:shadow-[var(--shadow-lift)]"
    >
```

- [ ] **Step 2: Close the new wrapper at the end of the component**

Old:
```tsx
        <span className="mt-3 inline-block rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
          {tour.dates}
        </span>
      </div>
    </Link>
  );
}
```

New:
```tsx
        <span className="mt-3 inline-block rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
          {tour.dates}
        </span>
      </div>
    </Link>
    </HoverScale>
  );
}
```

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/TourCard.tsx
git commit -m "feat: animate TourCard on hover"
```

---

### Task 8: Apply animation primitives to the homepage (`index.tsx`)

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Import the primitives**

Old:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { FloatingRail } from "@/components/site/FloatingRail";
import { featuredTours, destinationsMaroc, IMG } from "@/lib/tours";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Shield, Sparkles, Users } from "lucide-react";
```

New:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { FloatingRail } from "@/components/site/FloatingRail";
import { featuredTours, destinationsMaroc, IMG } from "@/lib/tours";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Shield, Sparkles, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverScale } from "@/components/motion/HoverScale";
```

- [ ] **Step 2: Animate the Hero's two primary CTAs (remove the now-redundant CSS hover lift)**

Old:
```tsx
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
```

New:
```tsx
            {slide.kind === "pilgrimage" ? (
              <HoverScale className="w-full sm:w-auto">
                <Link to="/hajj-omra/$slug" params={{ slug: slide.slug }} className="btn-primary w-full justify-center sm:w-auto">
                  Voir le programme <ArrowRight className="h-4 w-4" />
                </Link>
              </HoverScale>
            ) : (
              <HoverScale className="w-full sm:w-auto">
                <Link to="/voyages/$slug" params={{ slug: slide.slug }} className="btn-primary w-full justify-center sm:w-auto">
                  Découvrir l'offre <ArrowRight className="h-4 w-4" />
                </Link>
              </HoverScale>
            )}
            <HoverScale className="w-full sm:w-auto">
              <Link to="/voyages" className="btn-ghost w-full justify-center sm:w-auto">Tous nos programmes</Link>
            </HoverScale>
```

- [ ] **Step 3: Wrap `HajjOmra` cards in `Reveal`**

Old:
```tsx
function HajjOmra() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page grid gap-4 sm:gap-6 md:grid-cols-2">
        {[
          { title: "برنامج الحج 1448هـ / 2027م", label: "Hajj", price: "À partir de 76 500 dhs", href: "/hajj-omra" },
          { title: "برنامج العمرة 1447هـ / 2026م", label: "Omra", price: "À partir de 15 900 dhs", href: "/hajj-omra" },
        ].map((h, i) => (
          <Link key={i} to="/hajj-omra" className="group relative overflow-hidden rounded-3xl">
```

New (replaces the whole `HajjOmra` function body):
```tsx
function HajjOmra() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page grid gap-4 sm:gap-6 md:grid-cols-2">
        {[
          { title: "برنامج الحج 1448هـ / 2027م", label: "Hajj", price: "À partir de 76 500 dhs", href: "/hajj-omra" },
          { title: "برنامج العمرة 1447هـ / 2026م", label: "Omra", price: "À partir de 15 900 dhs", href: "/hajj-omra" },
        ].map((h, i) => (
          <Reveal key={i} delay={i * 0.1}>
          <Link to="/hajj-omra" className="group relative overflow-hidden rounded-3xl">
            <img src={IMG.hajj} alt={h.title} loading="lazy" width={1200} height={800} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{h.label}</span>
              <h3 dir="rtl" className="mt-3 font-display text-3xl">{h.title}</h3>
              <p className="mt-2 text-sm opacity-90">{h.price}</p>
            </div>
          </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wrap the `FeaturedTours` carousel items in `Reveal` (section header) — the carousel track itself keeps plain divs since Embla measures fixed-width slide nodes directly and a StaggerGroup wrapper would break its slide-width calculation**

Old:
```tsx
      <div className="container-page mb-8 flex flex-col items-center text-center sm:mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Voyages organisés</h2>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-primary">
          <span aria-hidden>•</span> Tarif avec billet d'avion <span aria-hidden>•</span>
        </span>
      </div>
```

New:
```tsx
      <Reveal className="container-page mb-8 flex flex-col items-center text-center sm:mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Voyages organisés</h2>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-primary">
          <span aria-hidden>•</span> Tarif avec billet d'avion <span aria-hidden>•</span>
        </span>
      </Reveal>
```

- [ ] **Step 5: Wrap `PillarStrip`'s grid in `StaggerGroup`/`StaggerItem`**

Old:
```tsx
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
```

New:
```tsx
function PillarStrip() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page">
        <StaggerGroup className="grid gap-5 rounded-3xl border border-border bg-sand p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <StaggerItem key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Wrap `MarocSection`'s heading in `Reveal` and destinations grid in `StaggerGroup`/`StaggerItem`**

Old:
```tsx
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
```

New:
```tsx
function MarocSection() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <div className="eyebrow-hand">Nos destinations</div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl md:text-5xl">Le Maroc, autrement.</h2>
          <p className="mt-3 text-muted-foreground">Explorez le Royaume à travers ses villes impériales, ses côtes et ses déserts — entre culture, détente et aventure.</p>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationsMaroc.map((d) => (
            <StaggerItem key={d.slug}>
            <article className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
```

- [ ] **Step 7: Close the new wrapper tags for the Maroc destination card**

Old:
```tsx
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
```

New:
```tsx
                <Link to="/maroc" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Plus de détail <ArrowRight className="h-4 w-4" />
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
```

- [ ] **Step 8: Wrap `MICE` section content in `Reveal`**

Old:
```tsx
function MICE() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container-page grid gap-8 rounded-3xl bg-foreground p-6 text-background sm:p-8 md:grid-cols-2 md:p-14">
        <div>
```

New:
```tsx
function MICE() {
  return (
    <section className="mt-16 sm:mt-24">
      <Reveal className="container-page grid gap-8 rounded-3xl bg-foreground p-6 text-background sm:p-8 md:grid-cols-2 md:p-14">
        <div>
```

- [ ] **Step 9: Close the `Reveal` wrapper at the end of `MICE`**

Old:
```tsx
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
```

New:
```tsx
          {[IMG.marrakech, IMG.prague, IMG.thailand, IMG.china, IMG.vietnam, IMG.sahara].map((src, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${i % 4 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}>
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 10: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 11: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: animate homepage sections (reveal, stagger, hover)"
```

---

### Task 9: Apply `Reveal`/`StaggerGroup` to `a-propos.tsx`

**Files:**
- Modify: `src/routes/a-propos.tsx`

- [ ] **Step 1: Import primitives and animate the intro text + stats grid**

Old:
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "Qui sommes-nous ? — Capital Tours" },
      { name: "description", content: "Capital Tours, agence de voyages marocaine passionnée : circuits, croisières, Hajj & Omra et MICE." },
      { property: "og:title", content: "Qui sommes-nous ? — Capital Tours" },
      { property: "og:description", content: "Notre histoire, notre équipe et notre engagement." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 container-page max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">À propos</div>
        <h1 className="mt-2 font-display text-5xl">Voyager, avec le cœur.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Capital Tours est une agence de voyages marocaine qui compose depuis des années des expériences soigneusement conçues :
          circuits en groupe, séjours sur mesure, Hajj &amp; Omra et voyages d'affaires.
        </p>
        <p className="mt-4 text-muted-foreground">
          Notre force : une équipe passionnée, un réseau international de partenaires triés sur le volet et un suivi personnalisé
          avant, pendant et après votre voyage.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[["15+","années d'expérience"],["10k","voyageurs conquis"],["50+","destinations couvertes"]].map(([n,t]) => (
            <div key={t} className="rounded-3xl bg-sand p-6 text-center">
              <div className="font-display text-4xl text-primary">{n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t}</div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  ),
});
```

New:
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "Qui sommes-nous ? — Capital Tours" },
      { name: "description", content: "Capital Tours, agence de voyages marocaine passionnée : circuits, croisières, Hajj & Omra et MICE." },
      { property: "og:title", content: "Qui sommes-nous ? — Capital Tours" },
      { property: "og:description", content: "Notre histoire, notre équipe et notre engagement." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 container-page max-w-3xl">
        <Reveal>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">À propos</div>
          <h1 className="mt-2 font-display text-5xl">Voyager, avec le cœur.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Capital Tours est une agence de voyages marocaine qui compose depuis des années des expériences soigneusement conçues :
            circuits en groupe, séjours sur mesure, Hajj &amp; Omra et voyages d'affaires.
          </p>
          <p className="mt-4 text-muted-foreground">
            Notre force : une équipe passionnée, un réseau international de partenaires triés sur le volet et un suivi personnalisé
            avant, pendant et après votre voyage.
          </p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {[["15+","années d'expérience"],["10k","voyageurs conquis"],["50+","destinations couvertes"]].map(([n,t]) => (
            <StaggerItem key={t} className="rounded-3xl bg-sand p-6 text-center">
              <div className="font-display text-4xl text-primary">{n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
      <Footer />
    </div>
  ),
});
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/a-propos.tsx
git commit -m "feat: animate a-propos page (reveal intro, stagger stats)"
```

---

### Task 10: Apply `Reveal` to `contact.tsx`

**Files:**
- Modify: `src/routes/contact.tsx`

- [ ] **Step 1: Import `Reveal` and wrap both columns**

Old:
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

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
        <div>
```

New:
```tsx
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
```

- [ ] **Step 2: Close the first `Reveal` and wrap the form in a second one**

Old:
```tsx
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><MapPin className="h-4 w-4"/></span> fez, Maroc</li>
          </ul>
        </div>
        <form className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] space-y-4" onSubmit={(e)=>e.preventDefault()}>
```

New:
```tsx
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><MapPin className="h-4 w-4"/></span> fez, Maroc</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
        <form className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] space-y-4" onSubmit={(e)=>e.preventDefault()}>
```

- [ ] **Step 3: Close the second `Reveal` wrapper**

Old:
```tsx
          <button className="btn-primary w-full">Envoyer</button>
        </form>
      </section>
      <Footer />
    </div>
  ),
});
```

New:
```tsx
          <button className="btn-primary w-full">Envoyer</button>
        </form>
        </Reveal>
      </section>
      <Footer />
    </div>
  ),
});
```

- [ ] **Step 4: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/contact.tsx
git commit -m "feat: animate contact page columns on scroll"
```

---

### Task 11: Apply `StaggerGroup` to `gallery.tsx`

**Files:**
- Modify: `src/routes/gallery.tsx`

- [ ] **Step 1: Import primitives and wrap the heading + grid**

Old:
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingRail } from "@/components/site/FloatingRail";
import { galleryTitle } from "@/lib/pilgrimage";

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
        <h1 className="font-display text-4xl">{galleryTitle}</h1>

        <p className="mt-3 text-muted-foreground">Quelques souvenirs de nos dernières sorties et pèlerinages.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)]">
              <img src={src} alt={`${galleryTitle} ${i + 1}`} loading="lazy" className="h-56 w-full object-cover" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <FloatingRail />
    </div>
  );
}
```

New:
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingRail } from "@/components/site/FloatingRail";
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
      <FloatingRail />
    </div>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/gallery.tsx
git commit -m "feat: animate gallery grid with staggered reveal"
```

---

### Task 12: Apply `Reveal`/`StaggerGroup` to `maroc.tsx`

**Files:**
- Modify: `src/routes/maroc.tsx`

- [ ] **Step 1: Import primitives**

Old:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG, destinationsMaroc } from "@/lib/tours";
import { ArrowRight } from "lucide-react";
```

New:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG, destinationsMaroc } from "@/lib/tours";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
```

- [ ] **Step 2: Wrap the "Circuits Maroc" heading + grid**

Old:
```tsx
      <section className="container-page py-16">
        <h2 className="font-display text-4xl">Circuits Maroc</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {circuits.map((c) => (
            <div key={c.title} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl">{c.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">À partir de</span>
                  <span className="font-display text-lg text-primary">{c.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
```

New:
```tsx
      <section className="container-page py-16">
        <Reveal><h2 className="font-display text-4xl">Circuits Maroc</h2></Reveal>
        <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-3">
          {circuits.map((c) => (
            <StaggerItem key={c.title} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl">{c.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">À partir de</span>
                  <span className="font-display text-lg text-primary">{c.price}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
```

- [ ] **Step 3: Wrap the "Nos destinations au Maroc" heading + grid**

Old:
```tsx
      <section className="container-page py-16">
        <h2 className="font-display text-4xl">Nos destinations au Maroc</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {destinationsMaroc.map((d) => (
            <article key={d.slug} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-accent">{d.tagline}</div>
                <h3 className="mt-1 font-display text-2xl">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Réserver <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
```

New:
```tsx
      <section className="container-page py-16">
        <Reveal><h2 className="font-display text-4xl">Nos destinations au Maroc</h2></Reveal>
        <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-3">
          {destinationsMaroc.map((d) => (
            <StaggerItem key={d.slug} className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-accent">{d.tagline}</div>
                <h3 className="mt-1 font-display text-2xl">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Réserver <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
```

- [ ] **Step 4: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/maroc.tsx
git commit -m "feat: animate maroc page circuits and destinations grids"
```

---

### Task 13: Apply `Reveal`/`StaggerGroup` to `mice.tsx`

**Files:**
- Modify: `src/routes/mice.tsx`

- [ ] **Step 1: Import primitives, wrap the hero text block and the 4-column feature grid**

Old:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG } from "@/lib/tours";
import { Users, Mic, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/mice")({
  head: () => ({
    meta: [
      { title: "MICE — Séminaires, congrès & incentives | Capital Tours" },
      { name: "description", content: "Organisation de séminaires, conférences, congrès et voyages incentives. Capital Tours MICE." },
      { property: "og:title", content: "MICE — Capital Tours" },
      { property: "og:description", content: "Séminaires, conférences, congrès et voyages incentives." },
      { property: "og:image", content: IMG.marrakech },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 bg-sand">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div>
```

New:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG } from "@/lib/tours";
import { Users, Mic, Building2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const Route = createFileRoute("/mice")({
  head: () => ({
    meta: [
      { title: "MICE — Séminaires, congrès & incentives | Capital Tours" },
      { name: "description", content: "Organisation de séminaires, conférences, congrès et voyages incentives. Capital Tours MICE." },
      { property: "og:title", content: "MICE — Capital Tours" },
      { property: "og:description", content: "Séminaires, conférences, congrès et voyages incentives." },
      { property: "og:image", content: IMG.marrakech },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16 bg-sand">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <Reveal>
```

- [ ] **Step 2: Close the hero `Reveal` and wrap the feature grid**

Old:
```tsx
            <Link to="/contact" className="btn-primary mt-6 hover:-translate-y-0.5">Demander un devis</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={IMG.marrakech} alt="" className="aspect-square rounded-2xl object-cover" />
            <img src={IMG.prague} alt="" className="aspect-square rounded-2xl object-cover mt-8" />
            <img src={IMG.thailand} alt="" className="aspect-square rounded-2xl object-cover" />
            <img src={IMG.sahara} alt="" className="aspect-square rounded-2xl object-cover mt-8" />
          </div>
        </div>
      </section>
      <section className="container-page py-16 grid gap-6 md:grid-cols-4">
        {[
          { icon: Users, t: "Meetings", d: "Réunions d'entreprise clé en main." },
          { icon: Sparkles, t: "Incentives", d: "Voyages de motivation & récompenses." },
          { icon: Mic, t: "Conferences", d: "Congrès professionnels & scientifiques." },
          { icon: Building2, t: "Exhibitions", d: "Salons et événements grand format." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-3xl border border-border p-6">
            <I className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  ),
});
```

New:
```tsx
            <Link to="/contact" className="btn-primary mt-6 hover:-translate-y-0.5">Demander un devis</Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-3">
            <img src={IMG.marrakech} alt="" className="aspect-square rounded-2xl object-cover" />
            <img src={IMG.prague} alt="" className="aspect-square rounded-2xl object-cover mt-8" />
            <img src={IMG.thailand} alt="" className="aspect-square rounded-2xl object-cover" />
            <img src={IMG.sahara} alt="" className="aspect-square rounded-2xl object-cover mt-8" />
          </div>
        </div>
      </section>
      <StaggerGroup className="container-page py-16 grid gap-6 md:grid-cols-4">
        {[
          { icon: Users, t: "Meetings", d: "Réunions d'entreprise clé en main." },
          { icon: Sparkles, t: "Incentives", d: "Voyages de motivation & récompenses." },
          { icon: Mic, t: "Conferences", d: "Congrès professionnels & scientifiques." },
          { icon: Building2, t: "Exhibitions", d: "Salons et événements grand format." },
        ].map(({ icon: I, t, d }) => (
          <StaggerItem key={t} className="rounded-3xl border border-border p-6">
            <I className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Footer />
    </div>
  ),
});
```

`hover:-translate-y-0.5` on the "Demander un devis" link is left in place — it's plain CSS, independent of `HoverScale`/framer-motion, and still works standalone since this link isn't in this task's `HoverScale` scope.

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/mice.tsx
git commit -m "feat: animate mice page hero and feature grid"
```

---

### Task 14: Apply `Reveal`/`StaggerGroup` to `transport.tsx`

**Files:**
- Modify: `src/routes/transport.tsx`

- [ ] **Step 1: Import primitives, wrap hero text and the 3-column feature grid**

Old:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Car, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transport privé & chauffeurs — Capital Tours" },
      { name: "description", content: "Flotte haut de gamme, chauffeurs professionnels : transferts, mise à disposition et VIP au Maroc." },
      { property: "og:title", content: "Transport privé — Capital Tours" },
      { property: "og:description", content: "Chauffeurs professionnels et flotte premium au Maroc." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Transport</div>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl">Votre confort, notre priorité.</h1>
            <p className="mt-4 text-muted-foreground">Flotte de véhicules haut de gamme, chauffeurs professionnels et service exécutif pour vos déplacements individuels et de groupe au Maroc.</p>
            <Link to="/contact" className="btn-primary mt-6 hover:-translate-y-0.5">Réserver un transfert</Link>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-lift)]">
            <img src="/transport.jpg" alt="Van VIP Mercedes Sprinter — Capital Tours" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="container-page pb-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Car, t: "Flotte premium", d: "Berlines, SUV, minibus et vans VIP récents." },
          { icon: ShieldCheck, t: "Sécurité", d: "Chauffeurs formés, véhicules assurés, suivi trajet." },
          { icon: Clock, t: "24/7", d: "Disponibilité totale, ponctualité garantie." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-3xl bg-sand p-6">
            <I className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  ),
});
```

New:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Car, ShieldCheck, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transport privé & chauffeurs — Capital Tours" },
      { name: "description", content: "Flotte haut de gamme, chauffeurs professionnels : transferts, mise à disposition et VIP au Maroc." },
      { property: "og:title", content: "Transport privé — Capital Tours" },
      { property: "og:description", content: "Chauffeurs professionnels et flotte premium au Maroc." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <section className="pt-40 pb-16">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Transport</div>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl">Votre confort, notre priorité.</h1>
            <p className="mt-4 text-muted-foreground">Flotte de véhicules haut de gamme, chauffeurs professionnels et service exécutif pour vos déplacements individuels et de groupe au Maroc.</p>
            <Link to="/contact" className="btn-primary mt-6 hover:-translate-y-0.5">Réserver un transfert</Link>
          </Reveal>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-lift)]">
            <img src="/transport.jpg" alt="Van VIP Mercedes Sprinter — Capital Tours" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <StaggerGroup className="container-page pb-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Car, t: "Flotte premium", d: "Berlines, SUV, minibus et vans VIP récents." },
          { icon: ShieldCheck, t: "Sécurité", d: "Chauffeurs formés, véhicules assurés, suivi trajet." },
          { icon: Clock, t: "24/7", d: "Disponibilité totale, ponctualité garantie." },
        ].map(({ icon: I, t, d }) => (
          <StaggerItem key={t} className="rounded-3xl bg-sand p-6">
            <I className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Footer />
    </div>
  ),
});
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/transport.tsx
git commit -m "feat: animate transport page hero and feature grid"
```

---

### Task 15: Apply `Reveal`/`StaggerGroup` to `hajj-omra.index.tsx`

**Files:**
- Modify: `src/routes/hajj-omra.index.tsx`

- [ ] **Step 1: Import primitives**

Old:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG } from "@/lib/tours";
import { pilgrimagePrograms, agencyPhones, agencyAddresses } from "@/lib/pilgrimage";
```

New:
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IMG } from "@/lib/tours";
import { pilgrimagePrograms, agencyPhones, agencyAddresses } from "@/lib/pilgrimage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
```

- [ ] **Step 2: Wrap the "برامجنا" section heading + programs grid**

Old:
```tsx
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
```

New:
```tsx
            <Reveal className="text-center">
              <Eyebrow>برامجنا</Eyebrow>
              <h2 className="mt-1 font-display text-4xl sm:text-5xl">اختر برنامجك</h2>
              <p className="mt-3 text-muted-foreground">اضغط على البرنامج لعرض الأسعار والفنادق والتفاصيل الكاملة.</p>
            </Reveal>

            <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2">
              {pilgrimagePrograms.map((p) => (
                <StaggerItem key={p.slug}>
                <Link
                  to="/hajj-omra/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block h-80 overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]"
                >
```

- [ ] **Step 3: Close the program card wrappers**

Old:
```tsx
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
                      عرض التفاصيل والأسعار <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
```

New:
```tsx
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
                      عرض التفاصيل والأسعار <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
```

- [ ] **Step 4: Wrap the services heading + grid**

Old:
```tsx
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
```

New:
```tsx
            <Reveal className="text-center">
              <Eyebrow>كل شيء مشمول</Eyebrow>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl">خدماتنا المشمولة</h2>
            </Reveal>
            <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {services.map(({ icon: Icon, label }) => (
                <StaggerItem key={label} className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 text-center shadow-[var(--shadow-soft)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>
```

- [ ] **Step 5: Wrap the "لماذا نحن" text column in `Reveal`**

Old:
```tsx
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
```

New:
```tsx
            <Reveal>
              <Eyebrow>لماذا كابيتال تورز</Eyebrow>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl">مرافقة تثقون بها</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyUs.map((w) => (
                  <li key={w} className="flex items-center gap-2 rounded-xl bg-sand px-4 py-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" /> {w}
                  </li>
                ))}
              </ul>
            </Reveal>
```

- [ ] **Step 6: Wrap the closing "احجز مكانك الآن" CTA block in `Reveal`**

Old:
```tsx
        <section className="pb-20">
          <div className="container-page">
            <div className="rounded-3xl bg-primary px-8 py-12 text-center text-white">
```

New:
```tsx
        <section className="pb-20">
          <div className="container-page">
            <Reveal className="rounded-3xl bg-primary px-8 py-12 text-center text-white">
```

- [ ] **Step 7: Close the CTA `Reveal` wrapper**

Old:
```tsx
              <p className="mt-2 text-sm opacity-80">فيسبوك: Capitaltours · إنستغرام: Capitaltoursmaroc</p>
            </div>
          </div>
        </section>
```

New:
```tsx
              <p className="mt-2 text-sm opacity-80">فيسبوك: Capitaltours · إنستغرام: Capitaltoursmaroc</p>
            </Reveal>
          </div>
        </section>
```

- [ ] **Step 8: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add src/routes/hajj-omra.index.tsx
git commit -m "feat: animate hajj-omra index sections"
```

---

### Task 16: Apply `Reveal`/`StaggerGroup` to `hajj-omra.$slug.tsx`

**Files:**
- Modify: `src/routes/hajj-omra.$slug.tsx`

- [ ] **Step 1: Import primitives**

Old:
```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { pilgrimagePrograms, agencyPhones, agencyAddresses, whatsappNumber } from "@/lib/pilgrimage";
```

New:
```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { pilgrimagePrograms, agencyPhones, agencyAddresses, whatsappNumber } from "@/lib/pilgrimage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
```

- [ ] **Step 2: Wrap the main content column in `Reveal`**

Old:
```tsx
            {/* العمود الرئيسي */}
            <div className="order-2 lg:order-1">
              {/* صندوق معلومات الرحلة */}
              <div className="rounded-3xl bg-primary p-6 text-white sm:p-8">
```

New:
```tsx
            {/* العمود الرئيسي */}
            <Reveal className="order-2 lg:order-1">
              {/* صندوق معلومات الرحلة */}
              <div className="rounded-3xl bg-primary p-6 text-white sm:p-8">
```

- [ ] **Step 3: Close the main-content `Reveal` (right before the sidebar `<aside>`)**

Old:
```tsx
                </div>
              )}
            </div>

            {/* الشريط الجانبي */}
            <aside className="order-1 space-y-5 lg:order-2 lg:sticky lg:top-28 lg:h-fit">
```

New:
```tsx
                </div>
              )}
            </Reveal>

            {/* الشريط الجانبي */}
            <aside className="order-1 lg:order-2 lg:sticky lg:top-28 lg:h-fit">
            <Reveal className="space-y-5">
```

- [ ] **Step 4: Close the sidebar `Reveal`/`aside` (right after the `BookingForm`)**

Old:
```tsx
              <BookingForm
                programTitle={program.shortTitle}
                hotels={program.tables.flatMap((t) => t.rows.map((r) => r.label))}
                dates={program.dates}
                programs={program.tables.map((t) => t.name).filter(Boolean) as string[]}
              />
            </aside>
          </div>
        </section>
```

New:
```tsx
              <BookingForm
                programTitle={program.shortTitle}
                hotels={program.tables.flatMap((t) => t.rows.map((r) => r.label))}
                dates={program.dates}
                programs={program.tables.map((t) => t.name).filter(Boolean) as string[]}
              />
            </Reveal>
            </aside>
          </div>
        </section>
```

- [ ] **Step 5: Wrap the photo gallery grid in `StaggerGroup`/`StaggerItem`**

Old:
```tsx
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {program.gallery.map((src, i) => (
                  <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                    <img src={src} alt={`${program.shortTitle} — صورة ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                ))}
              </div>
```

New:
```tsx
              <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {program.gallery.map((src, i) => (
                  <StaggerItem key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                    <img src={src} alt={`${program.shortTitle} — صورة ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </StaggerItem>
                ))}
              </StaggerGroup>
```

- [ ] **Step 6: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors. Pay attention to the `Reveal`/`aside` nesting from Step 3-4 — `Reveal` must be a normal child inside `<aside>`, not the `<aside>` itself.

- [ ] **Step 7: Commit**

```bash
git add src/routes/hajj-omra.\$slug.tsx
git commit -m "feat: animate hajj-omra program detail page"
```

---

### Task 17: Apply `Reveal`/`StaggerGroup` to `voyages.index.tsx`

**Files:**
- Modify: `src/routes/voyages.index.tsx`

- [ ] **Step 1: Import primitives and wrap the filter bar + grid**

Old:
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { featuredTours } from "@/lib/tours";
import { useState } from "react";
```

New:
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard } from "@/components/site/TourCard";
import { featuredTours } from "@/lib/tours";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
```

- [ ] **Step 2: Wrap the grid in `StaggerGroup`/`StaggerItem` (the filter bar and hero text are above the fold on this route, so they're left as-is — no `Reveal` needed there)**

Old:
```tsx
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
```

New:
```tsx
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <StaggerItem key={t.slug}>
              <TourCard tour={t} />
            </StaggerItem>
          ))}
        </StaggerGroup>
```

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/voyages.index.tsx
git commit -m "feat: animate voyages listing grid with stagger"
```

---

### Task 18: Apply `Reveal` to `voyages.$slug.tsx`

**Files:**
- Modify: `src/routes/voyages.$slug.tsx`

- [ ] **Step 1: Import `Reveal` and wrap the main content column + sidebar**

Old:
```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { featuredTours } from "@/lib/tours";
import { Calendar, Clock, MapPin, Check, X, ArrowRight } from "lucide-react";
```

New:
```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { featuredTours } from "@/lib/tours";
import { Calendar, Clock, MapPin, Check, X, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
```

- [ ] **Step 2: Wrap the main content column**

Old:
```tsx
      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-3xl">Aperçu du programme</h2>
```

New:
```tsx
      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <h2 className="font-display text-3xl">Aperçu du programme</h2>
```

- [ ] **Step 3: Close the main-content `Reveal` and wrap the sidebar in a second one**

Old:
```tsx
        </div>

        <aside className="lg:sticky lg:top-32 h-fit rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
```

New:
```tsx
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-32 h-fit rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <aside>
```

- [ ] **Step 4: Close the sidebar wrappers**

Old:
```tsx
          <Link to="/voyages" className="mt-3 block text-center text-sm text-primary underline">Voir tous les voyages</Link>
        </aside>
      </section>
      <Footer />
```

New:
```tsx
          <Link to="/voyages" className="mt-3 block text-center text-sm text-primary underline">Voir tous les voyages</Link>
        </aside>
        </Reveal>
      </section>
      <Footer />
```

- [ ] **Step 5: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors. If `<aside>` with no className plus a parent `Reveal` carrying the visual classes reads oddly to a future maintainer, that's fine — it's the same pattern used in Task 16.

- [ ] **Step 6: Commit**

```bash
git add src/routes/voyages.\$slug.tsx
git commit -m "feat: animate tour detail page content on scroll"
```

---

### Task 19: Apply `Reveal` to `reservation.$slug.tsx`

**Files:**
- Modify: `src/routes/reservation.$slug.tsx`

This page is a transactional checkout flow (info → payment → confirmation), all above the fold — so only the order-summary aside (which loads with an image) gets a `Reveal`; the active step card is intentionally left un-animated since it swaps content via React state (`step`), and re-triggering an entrance animation every time the user clicks "Continuer" would feel like lag, not polish.

- [ ] **Step 1: Import `Reveal` and wrap the order-summary aside**

Old:
```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { featuredTours } from "@/lib/tours";
```

New:
```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { featuredTours } from "@/lib/tours";
import { Reveal } from "@/components/motion/Reveal";
```

- [ ] **Step 2: Wrap the order-summary `<aside>` content**

Old:
```tsx
            {/* Right: order summary */}
            <aside className="h-fit overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] lg:sticky lg:top-32">
              <img src={tour.image} alt={tour.title} className="h-40 w-full object-cover" />
```

New:
```tsx
            {/* Right: order summary */}
            <aside className="h-fit lg:sticky lg:top-32">
            <Reveal className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <img src={tour.image} alt={tour.title} className="h-40 w-full object-cover" />
```

- [ ] **Step 3: Close the wrappers**

Old:
```tsx
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs text-primary">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> Paiement sécurisé — acompte remboursable sous conditions.
                </div>
              </div>
            </aside>
          </div>
```

New:
```tsx
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs text-primary">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> Paiement sécurisé — acompte remboursable sous conditions.
                </div>
              </div>
            </Reveal>
            </aside>
          </div>
```

- [ ] **Step 4: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/reservation.\$slug.tsx
git commit -m "feat: animate reservation order-summary panel"
```

---

### Task 20: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Lint the whole project**

Run: `npm run lint`
Expected: no errors (warnings pre-existing to the codebase are acceptable; nothing new introduced by these changes).

- [ ] **Step 2: Typecheck the whole project**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Manual browser verification**

Run: `npm run dev`, then open the printed local URL and check, for each of these routes: `/`, `/a-propos`, `/contact`, `/gallery`, `/maroc`, `/mice`, `/transport`, `/hajj-omra`, `/hajj-omra/omra-2026`, `/voyages`, `/voyages/istanbul`, `/reservation/istanbul`:
- Sections fade/slide into view once as you scroll down (not on every scroll direction change — `viewport once: true`).
- Grids (pillars, destinations, gallery, services, tour listing) animate in with a staggered cascade, not all at once.
- Hovering `Header` nav links, the "Nous contacter" button, `TourCard`s, and the homepage hero CTAs shows a subtle scale.
- Clicking between routes cross-fades briefly instead of an instant hard cut.
- In Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", reload `/` and confirm the reveal/stagger/hover animations no longer play (content still appears, just without motion).

- [ ] **Step 5: Report results to the user**

No commit for this task — it's verification only. If anything fails, fix it in the relevant task's file and re-run the affected verify step before moving on.

---

## Self-review notes (from writing this plan)

- Tasks 8, 16, and 19 initially used a `Reveal as="..."` prop, which doesn't match the actual `Reveal`/`Stagger` signatures defined in Tasks 2-3 (they only accept `children`, `className`, and — for `Reveal` — `delay`). Fixed in place: those tasks now wrap with a plain HTML tag (e.g. `<aside>`) around a prop-less `Reveal`, instead of trying to make `Reveal` itself render as the tag.
- Every task that touches a file already covered by an earlier task (e.g., `TourCard` in Task 7 vs. its usage in Tasks 8 and 17) uses the same import path (`@/components/motion/HoverScale`, `@/components/motion/Reveal`, `@/components/motion/Stagger`) and the same component names throughout — verified consistent.
- Coverage check against the spec: scroll-reveal → Tasks 8-19 (every route listed in the spec). Staggered grids → Tasks 8, 9, 11, 12, 13, 15, 16, 17 (every grid listed in the spec). Hover → Tasks 6, 7, 8 (Header, TourCard, Hero CTAs — the explicit examples named in the spec). Page transitions → Task 5. Reduced motion → Task 5. All spec sections have a corresponding task.
