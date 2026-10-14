# Logo figures

Renders the frames of `site-scripts/logo-figures-1.avif` / `.webp` (the small 3D figures that fly out of the header logo on hover).

- `sprites.html`: three.js 0.147 scene (same chrome studio as `mb-star3d.js`); put `three.min.js` next to it.
- `sprites.js`: Playwright script, `VARIANTS` = one row per figure (form, look, start angle, spin axis or wobble).
  Run with Chromium and SwiftShader: `node sprites.js` writes 160 px PNG frames to `frames/`.
- Atlas: frames scaled to 56 px, 24 per row, 8 rows; AVIF quality 50 (WebP quality 70 as the fallback).
  A new atlas gets a new number (`logo-figures-2`) and `BASE`, `ROWS`, `FRAMES` change in a new `logo-x.y.z.js`.

## logo-figures-2 (still figures, used by logo-2.0.0.js)
- 8 rows x 4 still views, 40 px tiles, WebP quality 82 (about 45 KB).
- Rows 0, 1, 2, 7 (the stars) are rendered face-on with small tilts by `static.js` (`poses` in `sprites.html`).
- Rows 3 to 6 (Big Idea, Clarity, Credibility, Control) are the 4 frames of each turn from `sprites.js` with the largest
  visible area, at least 3 frames apart: 3: 1, 10, 13, 22; 4: 7, 10, 19, 22; 5: 4, 7, 11, 15; 6: 2, 11, 14, 23.
