# Refining the Floating Projects Showcase

Two issues to fix:
1. **Crowding** — the stage sits too close to the heading above it.
2. **Over-tilted cards** — the 3D rotations are too aggressive and make text harder to scan.

Both are easy tweaks to `src/components/floating-projects-showcase.jsx`. Below are the spacing fix (small, applied either way) plus four layout/motion directions — pick whichever feels right and we'll apply it.

## Spacing fix (applied in all options)

- Increase the gap between the heading block and the stage from `mb-12` to `mb-20 sm:mb-24`.
- Bump the stage's top padding inside the section (`pt-20 sm:pt-28` → `pt-24 sm:pt-32`) so the topmost cards don't kiss the headline.
- Add a small `mt-6` cushion above the stage for extra air on smaller screens.

## Pick a direction for the cards

### Option A — Subtle tilt (closest to today, just calmer)
Keep the same five-card scattered layout, but dial everything back:
- Rotations roughly halved: `rotateX` ~8–10°, `rotateY` ±8–10°, `rotateZ` ±1–2°.
- Reduce parallax `depth` values by ~40% so scroll movement is gentler.
- Pointer-tilt strength reduced from `14` → `6`.
- Result: still a "floating workspace" feel, but reads as polished rather than dramatic.

### Option B — Flat stack with light float
Cards sit almost flat to the page (no Y/X rotation), with only a faint Z-rotation (±1–2°) for a "tossed on a desk" feel:
- Drop perspective entirely (or push to `2400px` so it barely registers).
- Keep gentle vertical drift + scroll parallax.
- Cards become much more readable; the *arrangement* does the work, not the 3D.

### Option C — Fanned deck (centered, overlapping)
Cards arranged as an overlapping fan across the centre, like a hand of cards:
- Five cards spread along a shallow arc, each rotated ±2–6° around its bottom-centre.
- Hovered card lifts forward and straightens (`rotateZ(0)` + slight Y translate).
- Stage height reduced (`h-[420px] sm:h-[480px]`) since the layout is more compact.
- Feels editorial and deliberate; great for hover interaction.

### Option D — Isometric grid
Cards laid out on a shared isometric plane (single shared `rotateX(12deg) rotateZ(-8deg)` on the stage, cards themselves untilted):
- Looks like a tidy 3D dashboard.
- All cards share one vanishing point, so it feels designed rather than scattered.
- Pointer movement subtly shifts the whole stage rather than individual cards.

## Recommendation

**Option A** is the smallest change and likely solves what you're describing — same character, just toned down and with breathing room above. **Option C** is the bigger upgrade if you want the section to feel more like a signature moment.

Let me know which option (or mix) and I'll implement it.
