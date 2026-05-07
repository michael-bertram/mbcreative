## Goals
1. Switch the site background to a warm cream tone.
2. Replace the contained hero gradient with a full-width animated blue gradient that sits behind the page top, fades into the cream background, and removes the visible seam between the hero and the Featured Work section.
3. Give interior pages (About, Resources, Contact, Projects, Project detail) enough top padding so the fixed header (h-20 / h-16 when scrolled) never overlaps content.

## Changes

### `src/styles.css`
- Update `--background` to a cream tone (warm off-white, e.g. `oklch(0.975 0.018 85)`) and adjust `--card` / `--secondary` / `--muted` slightly warmer to harmonise.
- Replace `--gradient-hero` with a top-anchored blue band that fades to transparent before reaching the bottom, so the cream background shows through and the hero blends seamlessly into Featured Work. Approx:
  ```
  --gradient-hero:
    radial-gradient(ellipse 90% 70% at 20% -10%, color-mix(in oklab, #0087FF 40%, white) 0%, transparent 70%),
    radial-gradient(ellipse 80% 60% at 80% -5%, color-mix(in oklab, #0087FF 30%, white) 0%, transparent 65%),
    linear-gradient(to bottom, color-mix(in oklab, #0087FF 18%, transparent) 0%, transparent 60%);
  ```
- Rework the `hero-drift` keyframes to translate the blue blobs horizontally across the top of the page (sweep left↔right rather than the current diagonal drift), with a slow ~20s loop.
- Update `.hero-animated` so the gradient sits at the top, doesn't repeat, and the section's own background colour is transparent (lets cream show at the bottom edge for a soft fade).
- Keep `prefers-reduced-motion` override.

### `src/routes/index.jsx`
- Remove the bottom border / background on the Featured Work wrapper section if needed so the hero fades directly into it (the hero already has no bottom divider; just confirm no `border-y` on the next section creates a hard line). The "Developer learning resources" band keeps its `border-y` since it's intentionally a banded CTA.
- Reduce hero bottom padding slightly so the gradient tail overlaps the next section visually.

### Interior pages — top padding fix
The fixed header is 80px (h-20) tall and the root `<main>` uses `-mt-16`. Interior pages currently use `py-20 sm:py-24` which still gets clipped. Bump top padding so content starts well below the header:
- `src/routes/about.jsx` — change wrapper to `pt-32 sm:pt-40 pb-20`.
- `src/routes/resources.jsx` — same: `pt-32 sm:pt-40 pb-20 sm:pb-24`.
- `src/routes/contact.jsx` — same treatment on its top-level wrapper.
- `src/routes/projects.index.jsx` and `src/routes/projects.$projectSlug.jsx` — apply the same top padding adjustment to their top-level wrappers.
- Home page is unchanged (the hero already has `pt-40 sm:pt-48`).

## Visual outcome
- Cream page background throughout.
- A soft blue light glows from the top of the home hero, animates by drifting horizontally, and dissolves smoothly into the cream — no hard line before Featured Work.
- About/Resources/Contact/Projects headings sit comfortably below the floating header at all scroll positions and breakpoints.
