# Restructure the Work section with real projects + branding

You've given me real content for 7 projects across three categories, plus brand logos. Right now the portfolio data is generic placeholder text, and the Work cards link to `/projects/$projectSlug` — but **no detail route file exists**, so clicking any card today silently 404s (or hits the root not-found). We should fix that as part of this pass.

## What changes

### 1. Replace placeholder data in `src/data/portfolio.js`

Rewrite the `projects` array to match your real work. Three categories, mapped to the existing `type` field used by filters:

- **Website** — The Moline Cross, Norton Bowling Club, Learn JS
- **Code** — Gather, Bowls Booker, Traqr (SaaS apps — `Code` keeps the existing filter chip working; we can rename the chip label to "Apps" if you prefer)
- **Design** — Norton Sports Charity / NS&LP brand system, MB Creative identity

Each entry gets: `slug`, `title`, `type`, `platform`, `summary`, `description`, `tags`, `year`, `cover` (logo import), plus a longer `sections` block for the detail page using the copy you provided (Project / Key Focus / Branding / Functionality). External sites get a `demoUrl` (themolinecross.co.uk, nortonbowlingclub.com, learnjs.co.uk, gather-app.co.uk).

### 2. Bring in the uploaded logos as project covers

Copy the uploaded files into `src/assets/logos/` and import them:

```text
user-uploads://Charity_Vector_Colour.png      → src/assets/logos/norton-sports-charity.png
user-uploads://Complex_Vector_Colour.png      → src/assets/logos/norton-sports-complex.png
user-uploads://Screenshot_2026-05-03_at_22.31.01.png → src/assets/logos/nslp.png
user-uploads://gather-logo-BooG84Xi.png       → src/assets/logos/gather.png
user-uploads://traqr-logo-DU5fn97p.png        → src/assets/logos/traqr.png
user-uploads://logo.webp                      → src/assets/logos/mb-creative.webp
```
(Norton Bowling Club, Moline Cross, Learn JS, Bowls Booker — no logo supplied yet, so they'll fall back to the existing icon-watermark tile until you upload them.)

### 3. Logo-friendly tile rendering in `floating-projects-showcase.jsx` + `project-card.jsx`

Most of the new covers are **logos on transparent/white backgrounds**, not photographic covers. If we drop them into the existing `object-cover` image slot they'll get cropped and look awful. Add an opt-in `coverMode: "logo"` field on a project; when set:

- Render the logo on a branded backdrop (white for dark logos like Norton/Gather, dark for the MB white logo, brand-blue tint for Traqr) using `object-contain` with padding instead of `object-cover`.
- Keep the dark gradient for text legibility but fade it more aggressively at the top so the logo stays visible.
- Skip the image parallax transform for logo tiles (parallax on a centered logo looks broken).

### 4. Create the missing detail route `src/routes/projects.$projectSlug.jsx`

Currently a typecheck/runtime hazard — the Link `to="/projects/$projectSlug"` resolves but the page renders nothing meaningful. Add a proper route:

- `Route.useParams()` → look up project by slug from `portfolio.js`
- Render: cover/logo, title, type, platform, year, external link button (`demoUrl`), description, the `sections` blocks (Context / Approach / Branding / etc.), tag list
- `notFoundComponent` for unknown slugs, `errorComponent` per project rules
- Per-route `head()` with title/description/og:image derived from the project

### 5. Homepage featured selection

`src/routes/index.jsx` already filters out `Learning Resource` and slices to 3. With the new dataset that gives a Website + a SaaS app + a Design piece — a nice mix. Update the slice to pick one of each category for variety:

```js
const pickOne = (t) => projects.find((p) => p.type === t);
const featured = ["Website", "Code", "Design"].map(pickOne).filter(Boolean);
```

### 6. Small copy/UX tweaks

- Rename the `Code` filter label on `/projects` to **Apps** (data stays `type: "Code"`, label only) — better fits Gather/Traqr/Bowls Booker.
- Add `demoUrl` rendering to the bento tile top-right (small external-link chip) so live sites are reachable directly from the showcase.

## Files touched

- `src/data/portfolio.js` — rewrite `projects` array with real content
- `src/assets/logos/*` — six new logo files copied from uploads
- `src/components/floating-projects-showcase.jsx` — add `coverMode: "logo"` rendering branch + external-link chip
- `src/components/project-card.jsx` — same logo rendering treatment
- `src/routes/projects.$projectSlug.jsx` — **new** detail page
- `src/routes/projects.index.jsx` — relabel `Code` filter to "Apps"
- `src/routes/index.jsx` — pick one project per category for the featured trio

## Open questions (won't block — sensible defaults below if you don't reply)

1. **Years** — you didn't list dates per project. Default: Moline Cross 2024, Norton Bowling 2023, Learn JS 2025, Gather 2025, Bowls Booker 2026, Traqr 2026, Norton brand 2023, MB Creative 2024.
2. **Bowls Booker / Moline Cross / Norton Bowling / Learn JS logos** — not uploaded. They'll use the icon-watermark fallback for now; ship logos later and I'll wire them in.
3. **"Code" → "Apps" filter rename** — happy to leave it as Code if you prefer the developer framing.
