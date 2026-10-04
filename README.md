# Jannik Richter — Worlds, tools & other obsessions

A dark, cinematic portfolio for games, audio tools, AI and software systems. Updated October 4, 2026.

## Development

Node.js 20+: `npm ci`, `npm run dev` (localhost:4174), `npm test`, `npm run build`. The development server rebuilds and reloads the preview on source changes. The production build bundles Three.js and the interactions with esbuild, then fingerprints the CSS and JavaScript.

Edit `index.html` for content and `portfolio.css` for layout. `js/portfolio.js` handles filters, project dialogs, the menu and motion preference. `js/scene.js` renders an original procedural WebGL sculpture. `js/choreography.js` coordinates the camera-style hero exit and pinned project transitions from scroll position. `js/section-scroll.js` advances the desktop opening and featured chapters one deliberate wheel or keyboard gesture at a time, absorbs trackpad inertia, and returns to native scrolling for longer reading sections. `js/gallery.js` creates the interactive project index with original SVG object studies.

Desktop project scenes pin only when the viewport is at least 900px wide and 640px high. Smaller screens use a normal vertical sequence. Reduced-motion preference and the motion toggle disable the choreography and restore all chapters. The project gallery supports pointer and keyboard focus, with descriptions associated with project links. Smaller screens show each project's illustration and copy together. All core content and outbound links remain available without JavaScript or WebGL. There are no trackers, forms or autoplaying audio/video.

The original playable-district implementation and older JSX remain as historical source and are excluded from the production build. Their legacy engine tests remain valid. Current checks cover filters, gallery selection, unique illustration IDs, project dialogs, menu focus, motion fallback, fragments gesture boundaries, and build fingerprints. Release tests build into an isolated temporary directory so they cannot overwrite the live development preview.

## Hosting

Production: https://jannikrichter.com on the existing `personal-website-nikrich` Cloudflare Pages project. The repository's `main` branch triggers production deployment. Build command: `npm run build`. Output: `dist`. Only the explicit public-file allowlist in `scripts/build.mjs` is deployed.

The existing `npm run deploy` command updates only the separate Workers mirror at https://personal-website-nikrich.nikrich.workers.dev. It does not update the custom domain. Preserve Pages hosting and DNS.

## Content

Featured: The Club, Hungry Ghost Audio, and Lockstep. The index contains Hive, Poltergeist, Conduit, GeoScape, Ultimate Road Tool, Deck Building Toolkit, Save Compatibility Lab, Reduced Recipes, Unreal Assets and Hungry Ghost. Unreleased work is labelled in development. Lockstep is described as fair-source, with its repository as the source for current capabilities and licensing.

Biography and existing project descriptions come from the original repository and the user's recent work. Public links/status were checked October 4. See `ARTWORK.md` for asset provenance. No private product source or credentials are in the public build.
