## Replace floating cards with an animated bento grid

The current `FloatingProjectsShowcase` is fun but hard to scan. We'll replace it with an **image-first bento grid** — an asymmetric layout of project tiles dominated by their cover images, with rich (but tasteful) motion: scroll reveals, image parallax/zoom on hover, magnetic cursor follow on tiles, and an animated gradient border on the featured tile.

### What it will look like

```
┌─────────────────────┬───────────┐
│                     │           │
│    FEATURED (2x2)   │  Tile 2   │
│    big image        │           │
│                     ├───────────┤
│                     │  Tile 3   │
├──────────┬──────────┼───────────┤
│  Tile 4  │  Tile 5  │  Tile 6   │
└──────────┴──────────┴───────────┘
```

- 6 tiles on desktop, 12-col grid with mixed `col-span` / `row-span`.
- Tablet: 2 cols, featured spans 2. Mobile: single column stack.
- Each tile is mostly cover image; title + type + tags slide up over a dark gradient on hover. Year shown as a small chip in the corner.
- Tiles without a `cover` image get a generated gradient background derived from their type so the layout still feels intentional.

### Motion (rich, but consistent)

- **Scroll reveal**: each tile fades + slides up with a small stagger using `IntersectionObserver` (no extra deps).
- **Hover**: image scales `1.08` and shifts slightly (parallax), overlay darkens, info panel slides up from the bottom, an arrow icon translates up-right.
- **Magnetic cursor**: tile tilts ~4° toward the pointer (desktop / fine pointer only), eased with rAF. Disabled for `prefers-reduced-motion` and coarse pointers.
- **Featured tile**: animated conic-gradient border (slow rotation) using a `::before` pseudo via inline style + CSS keyframe added to `src/styles.css`.
- **Filter chips** above the grid (All / Websites / Code / Design / Learning) — clicking re-flows the grid with a FLIP-style transition (using `View Transitions API` where available, falling back to a CSS `transition-all` on transforms).

### Files

- **Replace** `src/components/floating-projects-showcase.jsx` with a new component (same export name + props signature) implementing the bento grid. Keeps the call site in `src/routes/index.jsx` working unchanged. The `variant` prop becomes a no-op (accepted but ignored) for backward compatibility.
- **Edit** `src/routes/index.jsx`: remove the `.slice(0, 5)` cap so up to 6 projects are shown; pass them through.
- **Edit** `src/styles.css`: add two keyframes — `bento-reveal` (fade + translateY) and `bento-border-spin` (conic-gradient rotation for the featured tile border).
- **No new dependencies.**

### Technical notes

- Built with Tailwind utility classes; grid uses `grid-cols-12` + `auto-rows-[minmax(160px,auto)]` with explicit `col-span` / `row-span` per tile.
- Cover image: `<img loading="lazy" />` inside a `relative overflow-hidden` wrapper, scale handled via `transition-transform duration-700`.
- Magnetic tilt uses one shared `pointermove` handler per tile with rAF throttling; `transform-style: preserve-3d` + `perspective` on the wrapper.
- Each tile is a `<Link to="/projects/$projectSlug">` so the whole tile is clickable (current behaviour).
- Respects `prefers-reduced-motion`: reveals become instant, hover scale/tilt disabled, gradient border static.
- Accessible: tiles are real links with visible focus rings; overlay text has sufficient contrast against the dark gradient regardless of cover image.

### Out of scope

- No changes to project detail pages or the `/projects` index.
- No changes to data shape in `src/data/portfolio.js` (covers are still optional).
