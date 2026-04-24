Plan: split portfolio work from WordPress-powered learning resources

What we’ll build

1. Rename/reframe Projects as Portfolio or Work
- Keep your main portfolio items in the app for now: websites, coded builds, Wix sites, logos, graphics, and design work.
- Use flexible item types so a Wix site, coded site, logo, graphic, or resource can all be represented cleanly.
- Update navigation and page copy so it feels broader than just “Projects”.

2. Add category filtering for your mixed work
- Add filters such as:
  - Websites
  - Design
  - Learning resources
  - Code / development
- Cards can show the type, year, summary, tags, and relevant links.
- Wix work can be shown as finished website links, screenshots, and short case-study descriptions rather than repositories.

3. Add a dedicated Learning Resources section powered by your existing WordPress site
- Create a separate route, likely `/resources`, for learning resources.
- Pull only resource-style content from WordPress, not the whole portfolio.
- Display title, excerpt, date, featured image where available, and a link to read the full resource.
- Keep this separate from the local website/design portfolio so WordPress is used only where it makes sense.

4. Prepare the WordPress content model
- Use your existing WordPress site as the CMS source for learning resources.
- Best option: create a category or tag in WordPress, for example `learning-resources`, and the app fetches only posts with that category/tag.
- If you already use a custom post type for resources, the app can target that instead.

5. Keep the first version practical
- Start with static/local portfolio content for websites and design work.
- Add WordPress integration only for learning resources.
- Later, if you decide you want WordPress to manage everything, the same card structure can be extended.

Technical approach

- Update `src/data/portfolio.ts` so portfolio items support broader fields like `type`, `platform`, `image`, `liveUrl`, `repoUrl`, and `resourceUrl`.
- Update `ProjectCard` to become a more general portfolio/work card.
- Update `/projects` route copy and filters, or rename it to `/work` if preferred.
- Add a new `/resources` route with its own SEO metadata.
- Fetch WordPress learning resources server-side from your existing WordPress site.
- If your site is on WordPress.com, we can use the WordPress.com connector.
- If it is self-hosted WordPress, we’ll use its public REST API endpoint, for example:

```text
https://yourdomain.com/wp-json/wp/v2/posts?categories=RESOURCE_CATEGORY_ID
```

What I’ll need from you when implementing

- The URL of your existing WordPress site.
- Whether learning resources are currently posts, pages, or a custom post type.
- The category/tag you want to use for resources, or approval to use/create a naming convention like `Learning Resources`.

Recommended first implementation

- Keep the route as `/projects` for now but change the visible label to “Work”.
- Add a new “Resources” navigation item.
- Replace placeholder project examples with a small starter set of real-looking categories and structure that you can fill in.
- Connect `/resources` to WordPress once the site URL and resource category/tag are confirmed.