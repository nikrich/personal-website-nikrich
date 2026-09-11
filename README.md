# Jannik Richter — playable portfolio

A Cape Town–inspired playable district showcasing The Club at the Center of the World and five native Unreal Engine tools. Built as a small, dependency-free static site with native JavaScript modules and Canvas 2D.

## Local development

Node.js 20+ is sufficient. `npm run dev` serves http://localhost:4173. `npm test` checks world boundaries, travel, responsive coordinate projection, and local discovery state. `npm run build` validates references and stages an explicit public-file allowlist into `dist/`.

## Cloudflare

`npm run deploy` builds and deploys the static site with Wrangler to the `personal-website-nikrich` Cloudflare Worker. Requires authorized Cloudflare Workers access. No server, database, paid plugin source, credentials, or private game assets are deployed. Custom domains can be attached to this Worker separately.

Only `dist/` is public. The build includes custom response headers and a real 404 page. Old JSX sections remain in source as reference material and are excluded from deployment.

## Editing

- `js/content.js`: project descriptions, links, availability, timeline, and map destinations.
- `js/world.js`: interface, modal details, discovery state, keyboard/touch controls, and a small original dialogue vignette.
- `js/engine.js`: pure movement, boundary, and coordinate-projection logic.
- `world.css`: responsive design and motion preferences.
- `index.html`: semantic shell, metadata, and no-JavaScript fallback.

Discoveries are saved only in the visitor’s browser under `jr-district-v1`. All content is accessible without completing the quest. Native dialogs support Escape, focus containment, and focus restoration. Reduced motion disables ambient animation and makes click travel immediate. Animation suspends when the tab is hidden. There is no analytics or form backend.

## Content and image provenance

Personal biography, professional history, testimonials, and contact details come from the original repository’s JSX sections. Unreal plugin descriptions and release status come from the local product documentation and unrealtools.com source as of September 11, 2026. The game summary and banner come from the project README and docs/banner.png. No playable game build or private game source is included.

The district backdrop is original AI-generated portfolio artwork; it is not footage of The Club. Product covers are the existing Hungry Ghost product assets. Conduit and GeoScape tiles use technical diagrams, not product screenshots. The Club dialogue vignette is original website writing inspired by the documented premise, clearly labelled in the interface.

Production builds fingerprint the stylesheet and every JavaScript module, including module imports. This prevents the custom domain’s browser cache lifetime from retaining stale layouts after deployment. Mobile card media uses a consistent aspect ratio with automatic height; cards also use a minimum readable width before adding columns.
