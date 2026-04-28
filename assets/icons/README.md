SVG icons in this directory are exposed to the editor via `/wp-json/ctx-blocks/v1/icons`
and are rendered inline in the frontend.

Override order:
1. `/wp-content/themes/<child-theme>/assets/icons/*.svg`
2. `/wp-content/themes/<parent-theme>/assets/icons/*.svg`
3. `ctx-blocks/assets/icons/*.svg`

The icon key is the filename without `.svg`, for example:
- `arrow-right.svg` => `arrow-right`
- `external-link.svg` => `external-link`
