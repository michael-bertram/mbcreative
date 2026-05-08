## Goals
1. Replace the three Featured Work cover images with new ones in the cream + blue palette.
2. Re-style the Learning Resources band as a high-contrast dark navy panel so it stands out against the cream page.
3. Tighten vertical spacing between homepage sections.
4. Keep the cursor-following blob mesh exactly as it is.

## Changes

### New cover images (cream + blue themed)
Regenerate three covers via image generation, saving to `src/assets/`:
- `cover-website-builds.jpg` — abstract composition suggesting browser windows / structured layouts, cream background with deep blue (#0087FF) accents and soft glow.
- `cover-apps.jpg` — abstract app/UI motif (cards, dashboards, motion), same cream + blue palette.
- `cover-design.jpg` — abstract typographic / geometric brand-mark composition in the same palette.

All three share a consistent treatment: cream/off-white base, layered blue gradients, soft grain, no people, editorial and minimal — so they read as a set against the cream site background. Existing imports in `src/components/featured-categories.jsx` keep working since filenames are reused.

### Learning Resources panel — dark navy
In `src/routes/index.jsx`, restyle the resources CTA section:
- Wrap the current grid in an inner container with a dark navy background (`bg-[oklch(0.18_0.04_255)]` or a new `--surface-dark` token), rounded-2xl, generous padding, soft shadow.
- Heading and body text switch to light foreground (`text-white`, `text-white/70`).
- The eyebrow with `BookOpen` icon stays primary blue but brighter on dark.
- The CTA button becomes a solid white pill with navy text (or `bg-primary` with white text) — high contrast against the panel.
- Outer `<section>` keeps the cream page background; only the inner card is dark, giving editorial contrast similar to the footer.

### Tighten section spacing (homepage only)
- Hero (`src/routes/index.jsx`): reduce `pb-24 sm:pb-32 lg:pb-40` → `pb-16 sm:pb-20 lg:pb-24`. Top padding unchanged (header clearance).
- Featured Work (`src/components/featured-categories.jsx`): reduce wrapper `py-24 sm:py-32` → `py-14 sm:py-20`, and `mb-10 sm:mb-14` header block → `mb-8 sm:mb-10`. Reduce `mt-12` on the "View all work" button → `mt-8`.
- Learning Resources section: keep `py-14` outer, but the new dark panel uses tighter internal padding (`p-8 sm:p-10`) so the whole band feels more compact.

### Optional token (only if needed)
If reused elsewhere, add `--surface-dark: oklch(0.18 0.04 255);` to `:root` in `src/styles.css` and reference via an arbitrary value or a new `bg-surface-dark` mapping. Otherwise inline the oklch value — single use is fine.

## Out of scope
- Cursor mesh / page-mesh blobs (kept as-is per user).
- Footer, header, About/Resources/Contact/Projects routes.
- Hero typography and animation.

## Visual outcome
- Featured Work tiles feel native to the cream + blue theme instead of clashing photographic covers.
- Learning Resources reads as a deliberate, premium dark band — clear visual stop on the page.
- Homepage flows tighter top-to-bottom without losing breathing room inside each section.
