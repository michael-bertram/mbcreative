## Focused improvement: Project case studies

Right now `/projects/$slug` shows a title, one summary paragraph, the same description from the card, tags, and external links — essentially the card content again on a bigger page. Visitors who click through expect a story: what the project was, what you did, what you used, what came out of it. This plan turns those pages into proper case studies.

We'll keep all the other ideas you flagged (about polish, theme toggle, bespoke 404, animated section transitions) on the back-burner as separate follow-up rounds.

### What changes

**1. Extend the project data model in `src/data/portfolio.js`**

Each project gains optional, structured fields. Optional means existing entries keep working without immediately filling everything in.

- `cover` — hero image URL (can be a generated/branded placeholder for now)
- `gallery` — array of `{ src, alt, caption? }` for in-page screenshots
- `client` and `role` — short labels (e.g. "Personal project", "Lead developer")
- `timeframe` — human-readable (e.g. "Spring 2024, 3 weeks")
- `stack` — array of technologies used on this specific project
- `sections` — ordered narrative blocks: `{ heading, body }`. Typical headings: Context, Approach, What I built, Outcome, What I learned.
- `highlights` — short bullet list of standout outcomes for the sidebar (e.g. "Cut load time by 40%", "Shipped in 2 weeks")

Existing string `description` stays as a fallback when `sections` isn't filled in, so nothing breaks.

**2. Rebuild `/projects/$projectSlug` page**

New layout, top to bottom:

```text
[ ← Back to work ]

[ TYPE · YEAR · PLATFORM ]
[ Project Title                        ]
[ One-line summary                     ]

[ ===== Cover image (if provided) ===== ]

┌── Main column ─────────────┐ ┌─ Sidebar ─┐
│ Section: Context           │ │ Client    │
│ Section: Approach          │ │ Role      │
│ Section: What I built      │ │ Timeframe │
│ Section: Outcome           │ │ Stack     │
│                            │ │ Highlights│
│ [ Gallery grid ]           │ │ Links     │
│                            │ │ Tags      │
└────────────────────────────┘ └───────────┘

[ ← Previous project ]   [ Next project → ]
```

- Narrative `sections` render as styled blocks with consistent typography.
- Gallery uses a responsive 1/2-column grid; clicking opens a lightweight lightbox (existing shadcn `dialog` component).
- Sidebar gains Client / Role / Timeframe / Stack / Highlights above the existing Tags + Links.
- Previous/Next navigation cycles through `workProjects` (excluding Learning Resources, matching the `/projects` index filter).

**3. Update `ProjectCard` slightly**

If a project has a `cover`, show it as a thumbnail at the top of the card on the `/projects` grid. Cards without a cover stay text-only — no visual regression.

**4. Wire one project as the reference example**

I'll pick `website-builds` and fill in the new fields completely (cover, 3–4 gallery items using placeholder imagery, sections, stack, highlights) so you have a working template to copy. The other projects keep their current shape and degrade gracefully until you flesh them out.

**5. Improve the empty / not-found state**

The current "Project not found" screen stays, but I'll route it through `notFound()` + `notFoundComponent` so it's a proper 404 (better SEO, sets up the bespoke 404 work for a later round).

### Out of scope this round

- Theme toggle, animated section transitions, bespoke 404 design, About page polish — saved for follow-up plans once case studies land.
- A CMS or markdown loader for case studies. Content stays in `portfolio.js` for now; we can migrate to MDX later if you want to write longer-form posts.

### Technical notes

- Files touched: `src/data/portfolio.js`, `src/routes/projects.$projectSlug.jsx`, `src/components/project-card.jsx`. Possibly a small new `src/components/project-gallery.jsx` to keep the route file readable.
- Cover/gallery images: placeholders generated under `src/assets/` or referenced as URLs. Real images can be swapped in later without code changes.
- Previous/Next derived at render time from the filtered `workProjects` list — no extra data needed.
- All new fields are optional, so partial case studies render cleanly (sidebar items hide when empty, cover hides when missing, etc.).

### Follow-up rounds (not building now, just queued)

1. About page polish — visual timeline, talks/credentials, downloadable CV, photo.
2. Bespoke 404 + skeleton loaders matching the floating-cards motion language.
3. Animated section transitions — viewport-triggered fade/slide reveals.
4. Dark/light theme toggle — light variant of the purple palette.
