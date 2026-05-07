# Footer redesign + home page banner cleanup

## Reference
The uploaded screenshot shows a centered footer with:
- Logo
- "Got questions?" heading
- "Feel free to reach out." accent line (will use the new primary blue `#0087FF` instead of purple)
- A row of social icons
- Copyright line

## Changes

### 1. Rebuild `src/components/site-footer.jsx`
Replace the current left/right split layout with a centered stacked layout:

```text
        [ MB Creative logo ]

         Got questions?
       Feel free to reach out.   ← link to /contact, primary blue

      [LinkedIn] [GitHub] [X] [Email]

        © 2026 Michael Bertram
```

Details:
- Use existing `logoMbCreative` asset (`@/assets/mb-logo-white.png`) — sized ~40–48px tall, centered.
- "Feel free to reach out." wraps the text in a `Link` to `/contact`, styled with `text-primary` and a subtle hover.
- Icons row: `Linkedin`, `Github`, `Twitter` (X), `Mail` from `lucide-react`, pulling URLs from `profile.socials` and `profile.email` (already imported). Drop the existing icon-button background style in favor of plain centered icons matching the reference.
- Copyright line below icons, muted text.
- Container: `max-w-6xl`, vertical padding ~`py-16`, all items center-aligned with `flex flex-col items-center gap-y-*`.
- Keep top border (`border-t border-border`) for separation.

### 2. Home page "About teaser" banner (currently above the footer)
The section starting "I care about craft, performance…" in `src/routes/index.jsx` duplicates content that already lives on `/about`. Recommendation:

- **Remove it from the home page** — the home already ends strongly with the Resources CTA, and About is one click away in the nav.
- **Do not duplicate it elsewhere** — `/about` already covers this material. If on inspection `/about` is light, we can fold the teaser copy into the top of that page instead. I'll check `src/routes/about.jsx` during implementation and only move content over if it actually adds something new; otherwise just delete the section.

No other pages need the banner — it's a personal intro, which only makes sense on About.

## Files touched
- `src/components/site-footer.jsx` — rewritten
- `src/routes/index.jsx` — remove the About teaser `<section>`
- `src/routes/about.jsx` — only if the teaser copy adds value there
