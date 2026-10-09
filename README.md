# Metabrand case media

Looping videos and posters for the portfolio cases on metabrand.digital, served by GitHub Pages:
`https://metabrand-agency.github.io/metabrand-media/<file>`

## Files
- `<brand>_<screen>.mp4` — case video, 2880×2040, 60 fps, H.264, faststart. Loops are seamless.
- `<brand>_<screen>.jpg` — poster with the same name: the first frame of the video, same aspect ratio.
- `<brand>-embed-blocks.html` (Vanadio: `embed-blocks.html`) — embed code for each block of a case page, in page order: omnimatrix, qorelo, sasono, vanadio.
- `embed-global.html` — the shared style and script (already installed site-wide in Webflow).

## Embed format
```html
<video class="case-video" muted loop playsinline poster="https://metabrand-agency.github.io/metabrand-media/omnimatrix_promo.jpg"></video>
```
The file name appears once, in the poster URL. The site script takes the video from the same name (`.jpg` → `.mp4`).
For another aspect ratio add `style="aspect-ratio:960/1360"`. An explicit `data-src` overrides the video URL.

## How it works
- A video starts loading only when its block is about 400 px from the screen and pauses when it leaves, so a case page never loads all videos at once.
- `muted` + `playsinline` + play() from the script is what lets the video autoplay on iPhone. GitHub Pages serves byte ranges, which Safari needs.
- In iPhone Low Power Mode the video does not start; the poster stays visible and the system play button is hidden.
- When replacing a file, give it a new name (e.g. `_2`) so browsers and the CDN do not serve the cached one.
