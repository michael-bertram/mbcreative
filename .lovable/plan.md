# Light Theme + Cleaner Work Page

Two changes: flip the whole site to a refined light theme, and redesign `/projects` with a calmer, section-grouped layout.

---

## 1. Full light theme

Rework `src/styles.css` so `:root` is a true light theme (the current `:root` is dark; `.dark` exists but is unused). Move the existing dark palette into `.dark` so we can keep an optional toggle later, but ship light as the default.

**New light palette** (warm, paper-like — closer to Vercel/Linear marketing pages):

```
--background:        oklch(0.99 0.005 280)     /* near-white, faintly warm */
--foreground:        oklch(0.22 0.02 280)      /* deep ink, not pure black */
--card:              oklch(1 0 0)              /* clean white cards */
--card-foreground:   oklch(0.22 0.02 280)
--muted:             oklch(0.96 0.005 280)
--muted-foreground:  oklch(0.48 0.02 280)
--secondary:         oklch(0.96 0.008 280)
--accent:            oklch(0.94 0.02 280)
--border:            oklch(0.22 0.02 280 / 8%) /* hairline */
--input:             oklch(0.22 0.02 280 / 12%)
--primary:           oklch(0.55 0.27 280)      /* keep violet identity */
--primary-foreground: oklch(0.99 0.005 280)
--primary-glow:      oklch(0.72 0.20 285)
--ring:              oklch(0.55 0.27 280)
--gradient-hero:     softer radial violet glows at low opacity
--shadow-elegant:    0 20px 60px -28px oklch(0.22 0.02 280 / 0.18)
```

**Component-level fixes that follow from the theme flip:**
- `FeaturedCategories`: section background currently hardcoded to `oklch(0.10 0.025 280)`. Replace with `bg-secondary/40` so it sits as a subtle off-white band on a white page. Tile gradient overlay (dark scrim) stays — covers are photographic and need the dark scrim for white-text legibility. Keep tile text white over the scrim.
- Hero: keep the violet radial glow but reduce opacity (~0.25 → 0.12) so it reads as a soft tint, not a wash.
- Tech strip + resources band: `bg-card/30` and `bg-secondary/20` already token-based, will adapt automatically.
- Project cards: hover shadow currently violet-tinted at high opacity — drop to ~0.15 alpha so it feels lighter.
- Logo cover backgrounds in `project-card.jsx`: `coverBg: "dark"` currently uses `oklch(0.14 0.02 280)`. Keep that for dark logos like Traqr — it stays correct on a light page (logo needs dark plate to be visible).
- `mb-logo-white.png` (used as MB Creative cover with `coverBg: "dark"`): still correct since we render it on a dark plate.
- Site header / footer: re-check borders read on white; `bg-card/30` becomes near-white, may need `bg-background/80` with backdrop blur to feel like a sticky chrome rather than disappearing.

---

## 2. Cleaner Work page

Current page = single intro + tab strip + flat 3-column grid of identical cards. Switch to a magazine-style sectioned layout.

### Layout

```
┌─────────────────────────────────────────────┐
│  Eyebrow: Selected work                     │
│  H1: Work                                   │
│  Lede paragraph (1 line, larger)            │
│                                             │
│  [All · Websites · Apps · Design]  ← pills  │
│   (anchor links on All view; filter on others)│
└─────────────────────────────────────────────┘

── When filter = All ──────────────────────────
  ## Websites                  4 projects →
  ─ hairline divider ─
  [feature card large] [card] [card]   ← asymmetric: first card spans 2 cols
  [card]               [card]

  ## Apps                      3 projects →
  ─ hairline divider ─
  …

  ## Design                    2 projects →
  …

── When filter ≠ All ──────────────────────────
  Single section, same heading + grid pattern.
```

**Pills not tabs** — replace the underline tab strip with rounded pill buttons (`rounded-full border bg-card`, active = `bg-foreground text-background`). Cleaner and more modern on a light bg.

**Section header** — left: section name (`font-display text-2xl`), right: count + "View all →" that filters to that type. Thin `border-border` divider underneath.

**Asymmetric grid per section**:
- Section feature card (first item): spans 2 cols on lg, taller aspect (4:3 → 16:10), bigger title.
- Remaining items: standard 3-col.
- Mobile: single column, all cards equal.

**Card refresh** (`project-card.jsx`):
- Drop heavy hover lift + shadow → use a subtle `border-foreground/15` on hover and `translate-y-0.5`.
- Cover aspect 16:10 (slightly taller, more editorial).
- Type label moves above the title as a small uppercase eyebrow; remove the year/type two-column header.
- Year + platform → small footer row above the tag chips.
- Tags: lighter pill style — no border, `bg-muted text-muted-foreground`.
- Logo covers: current `bg-white` plate stays; on dark logos, dark plate stays. Add a thin inner border so the plate edge reads on a white page.

### Routing / state
- Keep current `?filter=` URL contract — homepage deep-links still work.
- Pills update `?filter=` via existing `navigate({ search })`.
- Smooth-scroll to the corresponding `<section id="websites">` when arriving via deep-link with a specific filter (only on All view this matters; on filtered view there's only one section so no scroll needed).

---

## Technical details

**Files to edit**
- `src/styles.css` — rewrite `:root` for light, move current dark values into `.dark`, soften shadow + hero gradient.
- `src/components/featured-categories.jsx` — swap the hardcoded dark section bg for `bg-secondary/40`; nudge text colours that assume dark surroundings (the eyebrow + heading already use tokens, fine).
- `src/components/site-header.jsx` / `site-footer.jsx` — verify on white; likely change `bg-card/30` → `bg-background/80 backdrop-blur` for the header.
- `src/routes/projects.index.jsx` — replace tab strip with pill group; render either grouped sections (filter = All) or a single section; add per-section feature-card layout; smooth-scroll on mount when a specific filter is in the URL.
- `src/components/project-card.jsx` — restyle (eyebrow, lighter hover, tag pills, optional `featured` prop for the section-leading card).
- `src/routes/index.jsx` — minor: soften hero glow opacity if the new `--gradient-hero` doesn't already do it.

**No new files, no dependencies, no schema/route changes.**

---

## Open question

For the section-feature card, do you want **the same `ProjectCard` rendered larger**, or a distinct **editorial style** (full-bleed cover image, title overlaid, no chip row) for that one card per section? Editorial gives more visual rhythm; uniform-larger is safer/cleaner. I'll default to **uniform-larger** unless you say otherwise.
