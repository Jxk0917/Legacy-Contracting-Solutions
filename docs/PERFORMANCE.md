# Performance

Status: measured, diagnosed, closed. No open performance issues as of this
writing. Read this before starting another performance pass, so it doesn't
repeat work already done.

## How to benchmark this site

Always measure the built production output, never the dev server.

```
npm run build
cd _site
python -m http.server 5500
```

Then point Lighthouse, DevTools, or a script at `http://localhost:5500/`.
`npm start` (`eleventy --serve`) injects a live-reload client
(`/.11ty/reload-client.js`, a WebSocket-based module script) that does not
exist in the production build and measurably adds JS execution time and
network requests. It is for editing, not for judging speed. Comparing the
two directly (2026-09-19 measurement): dev server scored 85/100 on mobile
Lighthouse with 89.5ms of script evaluation; the same page built and served
statically scored 90/100 with 19.5ms of script evaluation. If a page feels
slow, confirm which one you're looking at before changing anything.

## Baseline (2026-09-19, production `_site`, homepage)

Measured with Lighthouse (mobile emulation, simulated slow 4G + 4x CPU
throttle) and a direct Puppeteer trace against a static file server. Numbers
in parentheses are the real, unthrottled localhost timings, which are the
more trustworthy figure for "is the build itself fast" - the throttled
numbers model a bad network, not an actual measurement, and Lighthouse's
simulated mode showed real run-to-run variance on this page (total byte
weight read 1010 / 999 / 823 KiB across three runs of the identical build).

- DOMContentLoaded: 41ms (unthrottled)
- Load event: 157ms (unthrottled)
- First/Largest Contentful Paint: 173ms (unthrottled); ~2.1s / ~3.3-3.6s
  simulated slow-4G
- Total Blocking Time: 70-100ms
- Cumulative Layout Shift: 0.02
- Total page weight: ~1MB, 18 requests (7 images / 746KB, 6 fonts / 207KB,
  2 stylesheets / 35KB, 1 script / 1KB, 1 document / 21KB)
- Main-thread JS execution: ~20ms (throttled); not a bottleneck
- Long tasks: none over 100ms unthrottled; the single throttled long task
  traces to the browser's normal first-layout pass over the page's ~245 DOM
  elements, not to application JS (`nav.js` is 847 bytes, no scroll
  listeners, no `IntersectionObserver` in app code, no rAF loops)

## What was checked and ruled out

- **`assets/reference/**` never ships in `_site`.** Verified directly - no
  Instagram captures, current-site screenshots, or raw reference photography
  in the build output.
- **No accidental multi-format image downloads.** Exactly one format per
  `<picture>` fetches (AVIF, in every browser that supports it); WebP/JPEG
  sit unused as fallbacks.
- **Lazy loading works.** On a real unthrottled load only 4 of 12 on-page
  images fetch; the rest stay deferred. (Lighthouse's throttled runs fetch a
  few more, because Chrome's native lazy-load lookahead distance widens
  under a simulated slow connection - expected browser behavior, not a site
  bug.)
- **No layout thrashing.** A CPU-throttled Chrome trace showed exactly 3
  layout passes and 12 style recalcs for the entire page load - one initial
  layout, two small ones from the hero's staggered entrance animation.
- **Fonts are self-hosted, `font-display: swap`, not render-blocking.**
  6 of 7 declared weight files are actually used; the 7th (`inter-500`) was
  dead and has been removed (see Fixes below).

## Fixes applied (2026-09-19)

Small, confirmed, zero-risk - none of these were "the" bottleneck, since
there wasn't one to find in the production build:

- Removed `inter-500.woff2` and its `@font-face` rule (`fonts.css`) - proven
  unused by every `font-weight: 500` rule on the site, all of which resolve
  to Barlow Condensed, not Inter.
- Removed `logo-260.webp` - unreferenced anywhere (the logo is deliberately
  PNG-only, for exact navy color match against `--navy`; see `CLAUDE.md`).
- Losslessly recompressed `logo-260.png`: 53,220 to 42,090 bytes (-21%),
  pixel-identical (verified via raw buffer comparison) - better PNG DEFLATE
  settings only, no re-encoding, no redrawing.

## Known, deliberately not fixed

- The "Recent Work" grid's `sizes` attribute (`index.html`) says
  `(min-width: 48rem) 32vw, 100vw`, but the grid's actual CSS breakpoints
  are 40rem (2-column) and 62rem (3-column). For viewports in the 40-62rem
  range this can pick a mismatched responsive-image candidate. Not fixed
  because it didn't affect any measured metric on the viewports tested, and
  the surrounding files carry substantial unrelated pending content work -
  see the note below on entangled files before editing `index.html`,
  `site.css`, `header.njk`, or `eleventy.config.mjs`.

## A note on git history for this area

As of the "Build real-photo site on brand palette and optimize image
pipeline" commit, several shared files (`site.css`, `index.html`,
`header.njk`, `eleventy.config.mjs`) mix a large amount of pre-existing
content/design work with small performance-specific edits, committed
together in one commit at the user's direction. If you need to isolate a
future change to just one concern in those files, check with whoever's
driving before assuming a clean diff is possible - it may not be separable
from surrounding uncommitted work without checking first.

## Do not, in a future performance pass, absent a real measurement showing a problem

- Reduce image quality below the current AVIF q50 / WebP q78 / JPEG q80
  settings in `tools/build-images.mjs`.
- Undo the native-resolution capping (no upscaling past a source photo's
  real pixel dimensions).
- Add an optimization library, bundler, or build-time minifier.
- Rewrite `sizes` attributes or other markup based on a dev-server
  measurement.
