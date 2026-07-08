# "Nos partenaires" logo strip — design

## Goal
Add a "Nos partenaires" section to the homepage showing partner logos (Emirates, Royal Air Maroc, Amadeus) in a rounded bordered strip with an auto-scrolling ticker effect, matching the provided screenshot.

## Assets
Three logos provided as inline SVG (data-URI PNG wrapped in SVG), saved as:
- `src/assets/partners/emirates.svg`
- `src/assets/partners/ram.svg` (Royal Air Maroc)
- `src/assets/partners/amadeus.svg`

The fourth provided file (`Conrad-Rabat-Arzana-Emploi-Recrutement-1.svg`, mislabeled) is **not used** — dropped per user decision.

## Placement
New `Partners` section component added to `src/routes/index.tsx`, rendered in `HomePage` right before `<Footer />` (after `<MICE />`).

## Structure
- Centered heading: `<h2 className="font-display text-3xl sm:text-4xl">Nos partenaires</h2>` (matches heading style used elsewhere, e.g. `MarocSection`).
- Below it, a rounded bordered strip: `rounded-3xl border border-border` container (echoes `PillarStrip`'s `rounded-3xl border border-border bg-sand` styling for visual consistency), `overflow-hidden` to mask the scrolling track.
- Inside: a horizontally-scrolling track containing the 3 logos repeated 3 times back-to-back (9 logo slots total) so the loop looks continuous and not sparse, each logo separated by a vertical divider (`border-l border-border`), consistent height (e.g. `h-8` for logo images, generous horizontal padding per slot).

## Animation
- Pure CSS: a `@keyframes partners-scroll` translating the track from `translateX(0)` to `translateX(-33.333%)` (since the sequence is repeated 3x, translating by exactly one repeat-width creates a seamless loop back to the start).
- Applied via a Tailwind arbitrary-animation utility or a small addition to `src/styles.css` (`.animate-partners-scroll`), duration ~25s, `linear`, `infinite`.
- Pause on hover: `.partners-track:hover { animation-play-state: paused; }`.
- Reduced motion: wrap the animation rule in `@media (prefers-reduced-motion: no-preference)` so the track is simply static (no transform, no animation) when the user has reduced motion on — consistent with how `MotionConfig reducedMotion="user"` behaves for the rest of the site's framer-motion animations, even though this ticker itself doesn't use framer-motion (CSS keyframe animation is more efficient for a continuous infinite loop than framer-motion's `animate` + `repeat: Infinity`, and doesn't need JS to run).

## Testing / verification
No automated tests (visual feature, consistent with the rest of the site's animation work). Verify manually: run `npm run dev`, confirm the section appears above the Footer, logos scroll continuously and loop seamlessly, hovering pauses it, and toggling OS "reduce motion" freezes it to a static row.

## Out of scope
- No click-through/links on the logos.
- No CMS/dynamic partner list — hardcoded array of 3 partners in a new `src/lib/partners.ts`.
