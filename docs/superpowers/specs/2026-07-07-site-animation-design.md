# Site-wide animation pass — design

## Goal
Add consistent, subtle motion across the Capital Tours site: scroll-triggered reveals, staggered grid entrances, hover micro-interactions, and route transitions — without hurting performance or accessibility.

## Approach
Use `framer-motion` (new dependency). No dedicated animation library exists today beyond `tw-animate-css` (Tailwind CSS animation utilities, used incidentally by Radix components). Framer Motion gives declarative `whileInView`, `whileHover`, staggering, and `AnimatePresence` for route transitions, and integrates cleanly with React 19 + TanStack Router.

## Feel
Subtle & fast: ~0.4-0.5s durations, ~16px movement, ease-out. Matches a calm, premium travel-brand tone. All motion respects the OS-level reduced-motion preference automatically.

## Foundation

1. **Dependency**: add `framer-motion` to `package.json`.
2. **Reduced motion**: wrap the whole app in `<MotionConfig reducedMotion="user">` inside `src/routes/__root.tsx`'s `RootComponent`. This disables/minimizes animation automatically for users with OS "reduce motion" enabled — no extra logic needed elsewhere.
3. **Reusable primitives** in new `src/components/motion/`:
   - `Reveal.tsx` — `motion.div` wrapping children; animates `opacity 0→1` and `y 16→0` the first time it scrolls into view (`whileInView`, `viewport={{ once: true, margin: "-80px" }}`), duration 0.45s, ease `[0.22, 1, 0.36, 1]`. Accepts optional `delay` and `className` props, forwards `as` if needed (default `div`).
   - `StaggerGroup.tsx` / `StaggerItem.tsx` — `StaggerGroup` is a `motion.div` with `variants` defining `staggerChildren: 0.08`, triggered via `whileInView` once; `StaggerItem` is a `motion.div` using the same fade/slide variant as `Reveal`, consumed as children of `StaggerGroup`.
   - `HoverScale.tsx` — thin `motion.div` (or `motion.create(Link)` where wrapping a router `Link` directly) with `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`, transition duration 0.15s.

## Where it applies

**Scroll-reveal (`Reveal`)** — wrap each major section (not the whole page) on:
- `index.tsx`: HajjOmra, FeaturedTours, PillarStrip, MarocSection, MICE. (Hero excluded — above the fold, already has its own cross-fade.)
- `a-propos.tsx`, `contact.tsx`, `gallery.tsx`, `maroc.tsx`, `mice.tsx`, `transport.tsx`, `hajj-omra.index.tsx`, `hajj-omra.$slug.tsx`, `voyages.index.tsx`, `voyages.$slug.tsx`, `reservation.$slug.tsx`.

**Staggered grids (`StaggerGroup`/`StaggerItem`)**:
- Featured tours grid (index.tsx)
- Maroc destinations grid (index.tsx `MarocSection`, and `maroc.tsx` if it repeats the grid)
- Stat tiles (à-propos, 3-column grid)
- Gallery grid
- Voyages listing grid (`voyages.index.tsx`)

**Hover (`HoverScale`)**:
- `TourCard` (wraps the existing `Link`; keep the current CSS image-zoom/shadow transitions as-is, just add the card-level scale)
- Primary CTA buttons/links (hero CTAs, "Réserver" buttons)
- `Header` nav links

**Page transitions**:
- In `__root.tsx`, wrap `<Outlet />` in `AnimatePresence mode="wait"` + a `motion.div` keyed by `location.pathname` from `useRouter()`/`useLocation()`, animating `opacity 0→1`, 0.2s, no slide (avoids layout jank with the sticky header).

## Testing / verification
No automated animation tests. Verification is manual: run `npm run dev`, visit each modified route, confirm sections reveal on scroll, grids stagger, hovered cards/buttons/nav links scale, and navigating between routes cross-fades without layout jump. Also toggle OS "reduce motion" (or Chrome DevTools rendering emulation) and confirm animations are suppressed.

## Out of scope
- No animation library beyond framer-motion.
- No gesture-driven interactions (drag, swipe) beyond what embla-carousel already does.
- No changes to the Hero's existing slide cross-fade logic.
