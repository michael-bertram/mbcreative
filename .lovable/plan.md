## Goals

Address three issues with the homepage Featured Work section:

1. **Flow / duplication** — homepage currently shows all 6 projects (including Learning Resources), and each card links to the same place as cards on `/projects`.
2. **Theming** — synthetic purple/teal gradient fallbacks don't match the site palette; only *Website Builds* (which has a real cover image) looks right.
3. **Mobile** — tiles currently stack as a flat vertical list. You want a stacked / overlapping deck where cards come forward as you scroll.

---

## 1. Fix the flow & remove duplication

- Filter homepage featured to **work only** (exclude `Learning Resource`) — Resources already get their own teaser section directly below.
- Cap to **3 hero items** on the homepage (the strongest: Website Builds, Brand & Logo Work, Developer Demo Projects). This makes "Featured" actually mean curated, not "first 6".
- Reframe the section heading slightly — "Selected work" rather than "A look at recent projects" — to clearly signal it's a curated subset, with the existing "View all work" CTA leading to the full `/projects` page.
- Cards continue to link to `/projects/$projectSlug` — that's correct (same destination on both pages is expected; only Website Builds currently has a full detail page populated, which is fine).

Edit: `src/routes/index.jsx` — change the slice to a curated filter; pass 3 items.

## 2. Retheme the tile fallbacks

Replace the saturated `TYPE_GRADIENTS` map with palette-aligned surfaces using the existing CSS tokens (`--card`, `--primary`, `--secondary`, the same `oklch` values already used elsewhere in the section background). Tiles without a cover image get:

- A subtle dark card surface (`bg-card`) with a soft primary-tinted radial in one corner.
- A large, low-opacity type-icon watermark (Lucide: `Globe` for Website, `Code2` for Code, `Palette` for Design, `BookOpen` for Learning Resource) so each tile still feels distinct without clashing colours.
- The animated conic border on the featured tile keeps its current primary→accent gradient (already on-palette).

Edit: `src/components/floating-projects-showcase.jsx` — replace `TYPE_GRADIENTS` + the gradient `<div>` fallback with the new themed surface + icon watermark.

## 3. Mobile stacked-card scroll

Below `md`, switch from the vertical grid stack to a **sticky-stacked card deck**:

```text
┌──────────────┐  ← top of section
│   Card 1     │  sticky, sits at top
└──────────────┘
   ┌──────────────┐  ← scrolls up, slides over card 1
   │   Card 2     │
   └──────────────┘
       ┌──────────────┐
       │   Card 3     │
       └──────────────┘
```

Implementation:

- Mobile-only wrapper (`md:hidden`) renders each tile inside a `position: sticky; top: 80px` container with progressively increasing `top` offsets (`top: calc(80px + i * 12px)`) so previous cards peek out behind the active one.
- Each card scales down slightly and fades as the next one covers it, driven by `IntersectionObserver` thresholds (no scroll listener spam) — the entering card animates from `scale(0.94) translateY(24px)` to `scale(1) translateY(0)`.
- Desktop (`md:` and up) keeps the existing bento grid unchanged.
- Respects `prefers-reduced-motion`: cards still stack via sticky, but skip the scale/fade transitions.

Edit: `src/components/floating-projects-showcase.jsx` — add a parallel mobile render branch; share the same `BentoTile` content (image + overlay + meta) but wrap it in the sticky deck container.

---

## Files

- `src/routes/index.jsx` — curated featured list (3 work items, no Learning Resources).
- `src/components/floating-projects-showcase.jsx` — retheme fallback tiles, add mobile sticky-deck render path, light heading copy tweak.
- `src/styles.css` — small additions only if needed for the mobile deck transition (likely none; Tailwind utilities should cover it).

No changes to `/projects`, project detail pages, or `portfolio.js` data shape.
