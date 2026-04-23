
# Developer Portfolio — Dark & Modern

A fast, SSR'd developer portfolio built with TanStack Start. Dark theme, bold accent color, clean typography, subtle motion. Each page is its own route for SEO and easy editing in your IDE after you sync to GitHub.

## Pages (separate routes)
- **Home (`/`)** — Hero (name, role, one-line pitch, CTAs to Projects/Contact), 3 featured projects, tech stack strip, short about teaser.
- **Projects (`/projects`)** — Full grid of projects with thumbnails, descriptions, tech tags, and links to live demo / GitHub.
- **About (`/about`)** — Longer bio, experience timeline, skills grouped by category, downloadable resume link.
- **Contact (`/contact`)** — Email, social links (GitHub, LinkedIn, X), and a simple contact form with validation.

Each route gets its own `head()` with unique title, description, and OG tags for proper sharing/SEO.

## Design
- Near-black background, high-contrast white text, single bold accent (electric violet) for links, hovers, and highlights.
- Inter for body, large display headings, generous whitespace.
- Sticky top nav with initials logo + links and active-state styling; mobile hamburger.
- Subtle motion: fade/slide on scroll, hover lifts on project cards, animated underline on links.
- Footer with socials and copyright.

## Components
- Header / nav, Footer
- Hero
- ProjectCard (image, title, summary, tags, demo + repo links)
- TechBadge strip
- Timeline (About)
- ContactForm (client-side validation)

## Content
Seeded with realistic placeholder content (sample name, 4–6 projects, bio, skills) — all in clearly-labeled data files so you can swap them easily once you're working in your IDE via GitHub.
