Plan

1. Make the main navigation more distinctive
- Replace the current simple text links with a more memorable desktop navigation treatment, such as a rounded floating/pill-style nav with subtle borders, background blur, active-state glow, and stronger hover movement.
- Keep the transparent-header behavior at the top of the page, including the white logo at the top and purple logo after scrolling.
- Improve the mobile menu so it feels consistent with the new navigation style rather than a plain dropdown list.

2. Separate “Projects” from “Learning Resources”
- Treat `/projects` as personal/work project portfolio only: websites, design, graphics, code, WordPress/Wix/client/personal work.
- Remove “Learning Resource” from the project filter tabs and from the project grid.
- Update the `/projects` page copy so it no longer describes teaching materials or developer learning resources as part of the same work collection.
- Keep `/resources` as its own dedicated area for developer learning resources, aimed at a different audience and connected to your job/developer advocacy work.

3. Refresh homepage content to reflect the split
- Update “Featured work” so it only features non-resource projects.
- Add a separate homepage callout for “Developer learning resources” linking to `/resources`, making it clear these are tutorials, workshops, demos, and WordPress/front-end learning materials.
- Adjust the wording so the portfolio feels like two complementary streams: project work and developer education.

4. Update data and card behavior
- Keep resource-related entries available for the `/resources` page, but stop showing them inside the project portfolio filters/grid.
- Optionally rename the project type model internally so “Learning Resource” is no longer treated as a project category in the main work UI.
- Ensure project cards still show useful metadata like platform, year, type, links, and tags.

Technical details
- Edit `src/components/site-header.tsx` for the new standout navigation styling and mobile menu presentation.
- Edit `src/routes/projects.tsx` to remove the “Learning Resource” filter and filter out resource-type entries from the portfolio grid.
- Edit `src/routes/index.tsx` so featured work excludes resources and adds a separate resources CTA section.
- Edit `src/data/portfolio.ts` only as needed to make the content categories clearer.
- Do not edit `src/routeTree.gen.ts`; it will be regenerated automatically by the TanStack router plugin.