# Personal Website — Jannik Richter

A long-scroll personal site for Jannik Richter — Software Architect at Sanlam Fintech, Cape Town.

Static HTML + CSS + React (via CDN + Babel standalone). No build step.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure

- `index.html` — entry point, mounts the React app
- `site.css`, `colors_and_type.css` — design system + page styles
- `js/*.jsx` — section components (transpiled in-browser by Babel standalone)
- `assets/` — SVG shapes, logos, icons used by the layout

## Sections

Nav → Hero → Services → Projects folder → Selected Work → About → Why work with me → Now → Writing → Experience → Testimonials → Contact → Footer.

## Editing

Each section is a single JSX file under `js/`. Change copy or data arrays in place — no rebuild needed, just refresh.

## Adding a portrait

Drop a square or 4:5 ratio photo at `assets/portrait.jpg`. The About section will auto-detect it and replace the gradient placeholder.

## Credits

Design system handed off from Claude Design. Implementation by Jannik Richter (with help from Claude Code).
