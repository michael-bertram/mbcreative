## Goal

Three changes:

1. Homepage **Featured Work** becomes a curated "types of work" trio (Websites / Apps / Design) — each card is a category, not an individual project, and clicks deep-link to that filter on the Work page.
2. Fix incorrect logo assignments (Learn JS, MB Creative) and the invisible Traqr logo.
3. Bring back the rich image-first cover with parallax (the style previously used for the Websites card) for these category tiles.

---

## 1. Curated category tiles on the homepage

Replace the per-project featured trio with three **category cards**:

| Tile | Type filter | Cover | Link |
|---|---|---|---|
| Websites | `Website` | `cover-website-builds.jpg` (existing) | `/projects?filter=Website` |
| Apps | `Code` | new generated image (dashboard / SaaS feel) | `/projects?filter=Code` |
| Design | `Design` | new generated image (identity / branding feel) | `/projects?filter=Design` |

Each tile shows: type label, big title ("Websites" / "Apps" / "Design"), short description, a count ("3 projects"), and an "Explore →" CTA. Image-first with the same dark legibility gradient and **parallax on pointer-move + subtle zoom on hover** that the previous Websites tile had. Bento layout: one large feature tile (Websites) + two stacked tiles. Mobile keeps the sticky-stacked deck.

### Work page reads the filter from the URL

`src/routes/projects.index.jsx` already has the All / Websites / Apps / Design tabs. Update it to:
- Read `?filter=Website|Code|Design|All` on mount via TanStack Router's `useSearch`/`Route.useSearch` and seed `activeFilter`.
- Keep the URL in sync when the user changes tabs (`navigate({ search: { filter } })`).
- Smooth-scroll to the project grid after navigation so the user lands on the filtered list.

This means the homepage cards behave as "jump to Websites / Apps / Design on the Work page" rather than going to individual project detail pages.

---

## 2. Logo fixes in `src/data/portfolio.js`

- **Learn JS** — assign the file currently imported as `logoMbCreative` (`src/assets/logos/mb-creative.webp`) as Learn JS's cover. Rename the import to `logoLearnJs` and (optionally) move/rename the file to `learn-js.webp` for clarity. Use `coverMode: "logo"`, `coverBg: "dark"` (since it's a dark mark).
- **MB Creative** — use the existing site logo `src/assets/mb-logo.png` (or `mb-logo-white.png` on dark bg) as its cover. `coverMode: "logo"`, `coverBg: "dark"` with `mb-logo-white.png`.
- **Traqr** — currently rendered on a white background where the mark disappears. Switch `coverBg` to `"dark"` so the existing `traqr.png` reads correctly. If it still doesn't read on dark, we'll ask for a light-on-transparent version.

No project pages or routes change as a result — just the cover assets.

---

## 3. Image-first parallax for category tiles

The category tiles on the homepage will not use logo mode. They render the cover photo full-bleed with:
- `object-cover` + `scale(1.08)` parallax translation driven by pointer movement (same code path that exists today in `BentoTile`'s `onMove` handler — the `isLogo` branch currently disables it).
- Hover zoom + magnetic tilt (already implemented).
- The category's Lucide icon (`Globe` / `Code2` / `Palette`) as a soft watermark in the corner.

For the two missing covers (Apps, Design), generate two on-brand images sized ~1600×1000 and store them as:
- `src/assets/cover-apps.jpg`
- `src/assets/cover-design.jpg`

Style: same dark, gradient-tinted, slightly abstract aesthetic as `cover-website-builds.jpg` so the trio feels cohesive.

---

## Technical details

**Files to edit**
- `src/routes/index.jsx` — replace `featured` (currently picks one project per type) with a hard-coded `categories` array `[{ type, label, description, cover, count }]`, and pass to a new lightweight component.
- `src/components/floating-projects-showcase.jsx` — either:
  - extend it to accept `mode: "categories"` and render category tiles linking to `/projects?filter=...`, OR
  - create a sibling `src/components/featured-categories.jsx` that reuses the same bento + parallax styling but renders category data. Sibling component is cleaner; the existing showcase stays focused on real projects (still used elsewhere if needed).
- `src/routes/projects.index.jsx` — add `validateSearch: (s) => ({ filter: s.filter ?? "All" })`, use `Route.useSearch()` to drive `activeFilter`, and `useNavigate` to push search updates on tab click.
- `src/data/portfolio.js` — fix Learn JS / MB Creative / Traqr cover + bg mappings.
- `src/assets/` — add `cover-apps.jpg`, `cover-design.jpg` (generated). Optionally rename `logos/mb-creative.webp` → `logos/learn-js.webp`.

**No new routes, no schema changes, no new dependencies.**

---

## Open question

For the Apps and Design covers I'll generate new images in the same style as `cover-website-builds.jpg`. If you'd rather supply your own photography/artwork, upload them and I'll wire those in instead.
