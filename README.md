# Jannik Richter — playable portfolio

A Cape Town–inspired playable district showcasing The Club at the Center of the World and five native Unreal Engine tools. Built as a small, dependency-free static site with native JavaScript modules and Canvas 2D.

## Local development

Node.js 20+ is sufficient. `npm run dev` serves http://localhost:4173. `npm test` checks world boundaries, travel, responsive coordinate projection, and local discovery state. `npm run build` validates references and stages an explicit public-file allowlist into `dist/`.

## Cloudflare

Production is **https://jannikrichter.com**, served by the existing `personal-website-nikrich` Cloudflare Pages project. It is connected to this GitHub repository: pushing `main` triggers a production deployment. Pages must use build command `npm run build` and output directory `dist`; publishing the repository root bypasses asset fingerprinting and serves the wrong release package. These settings were corrected and verified on September 11, 2026.

`npm run deploy` updates the secondary Workers mirror at `https://personal-website-nikrich.nikrich.workers.dev`; it does not itself update the custom domain. No server, database, paid plugin source, credentials, or private game assets are deployed.

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
