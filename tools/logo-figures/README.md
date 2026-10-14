# Logo figures

Renders the frames of `site-scripts/logo-figures-1.avif` / `.webp` (the small 3D figures that fly out of the header logo on hover).

- `sprites.html`: three.js 0.147 scene (same chrome studio as `mb-star3d.js`); put `three.min.js` next to it.
- `sprites.js`: Playwright script, `VARIANTS` = one row per figure (form, look, start angle, spin axis or wobble).
  Run with Chromium and SwiftShader: `node sprites.js` writes 160 px PNG frames to `frames/`.
- Atlas: frames scaled to 56 px, 24 per row, 8 rows; AVIF quality 50 (WebP quality 70 as the fallback).
  A new atlas gets a new number (`logo-figures-2`) and `BASE`, `ROWS`, `FRAMES` change in a new `logo-x.y.z.js`.
