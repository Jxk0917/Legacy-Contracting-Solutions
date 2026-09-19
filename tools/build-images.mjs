// Turns read-only reference photography into optimized working copies.
//   node tools/build-images.mjs
//
// Reads from assets/reference/ (never written to) and writes WebP + JPEG
// derivatives into src/assets/img/, resized and encoded with sharp
// (mozjpeg + libwebp), which produces far smaller files than the Chromium
// canvas encoder this script used to go through.
//
// The manifest below is the single place where "which real photo represents
// which job" is decided. Every entry traces to a captured source, and the
// note field records why that photo was chosen.

import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const REF = "assets/reference";
const OUT = "src/assets/img";

const IG = `${REF}/instagram/media`;
const FRAMES = `${REF}/instagram/media/frames`;
const WEB = `${REF}/projects`;

// gravity: where to anchor the crop, as [x, y] fractions. 0.5,0.5 is centre.
const M = [
  // ---- hero ----
  {
    src: `${WEB}/landscape.jpg`,
    out: "hero/site-work",
    aspects: { wide: 16 / 9, tall: 4 / 5 },
    widths: { wide: [2000, 1400, 900], tall: [900, 640] },
    gravity: [0.42, 0.62],
    note: "Bobcat T450 on open land, fresh grading, big sky. The clearest single 'we own equipment and move dirt' frame in the whole capture, and wide enough to carry a headline.",
  },

  // ---- projects ----
  {
    src: `${FRAMES}/01-DdLeCkJT_S3/frame-04-excavator-loading-dump-truck.jpg`,
    out: "projects/boerne-pool-excavation-1",
    gravity: [0.5, 0.45],
    note: "Excavator loading the dump trailer. Two machines in one frame.",
  },
  { src: `${FRAMES}/01-DdLeCkJT_S3/frame-03-excavator-trench-midwork.jpg`, out: "projects/boerne-pool-excavation-2", note: "Trench depth with a worker for scale." },
  { src: `${FRAMES}/01-DdLeCkJT_S3/frame-01-topdown-excavator-digging.jpg`, out: "projects/boerne-pool-excavation-3", note: "Overhead, shows the dig outline." },

  { src: `${FRAMES}/02-DdLw3rfTk6i/frame-03-finished-stained-fence-closeup.jpg`, out: "projects/fence-refurbishment-1", note: "Finished stain, full saturation." },
  { src: `${FRAMES}/02-DdLw3rfTk6i/frame-02-sprayer-staining-in-progress.jpg`, out: "projects/fence-refurbishment-2", note: "Sprayer rig mid-job, shows it is his own equipment." },
  { src: `${FRAMES}/02-DdLw3rfTk6i/frame-01-finished-stained-gate.jpg`, out: "projects/fence-refurbishment-3", note: "Gate section finished." },

  { src: `${IG}/03-DdLvnC4lscd-02.jpg`, out: "projects/bandera-concrete-slab-1", note: "Finished 600 sq ft slab, hand floated." },
  { src: `${IG}/03-DdLvnC4lscd-01.jpg`, out: "projects/bandera-concrete-slab-2", note: "Placing around existing posts, the hard part of this job." },

  { src: `${IG}/04-DdLu88WFu6e-01.jpg`, out: "projects/concrete-2000-sqft-1", note: "Finished drive, the largest documented pour." },
  { src: `${IG}/04-DdLu88WFu6e-04.jpg`, out: "projects/concrete-2000-sqft-2", note: "Forms and reinforcement set, before the pour." },
  { src: `${IG}/04-DdLu88WFu6e-03.jpg`, out: "projects/concrete-2000-sqft-3", note: "Finished walkway running to the house." },

  { src: `${IG}/05-DdLuLPBFuIb-02.jpg`, out: "projects/pool-removal-1", note: "The pool as found. Reads as a genuine before." },
  { src: `${IG}/05-DdLuLPBFuIb-04.jpg`, out: "projects/pool-removal-2", note: "Backfilled and graded flat. The after." },
  { src: `${IG}/05-DdLuLPBFuIb-01.jpg`, out: "projects/pool-removal-3", note: "Graded yard, wider view." },

  { src: `${FRAMES}/07-DdLmODGTwAj/frame-02-finished-gate-stucco-column.jpg`, out: "projects/fair-oaks-king-ranch-fence-1", note: "Gate against the stucco column. Clearest finished result." },
  { src: `${IG}/07-DdLmODGTwAj-01.jpg`, out: "projects/fair-oaks-king-ranch-fence-2", note: "Column and ironwork detail." },
  { src: `${FRAMES}/07-DdLmODGTwAj/frame-03-stucco-column-freshly-built.jpg`, out: "projects/fair-oaks-king-ranch-fence-3", note: "Column before the panel went on, evidence of the masonry step." },

  { src: `${IG}/09-DdLj4vblog3-03.jpg`, out: "projects/lot-clearing-1", note: "Overgrown lot as found." },
  { src: `${IG}/09-DdLj4vblog3-02.jpg`, out: "projects/lot-clearing-2", note: "Skid steer mid-clear." },
  { src: `${IG}/09-DdLj4vblog3-05.jpg`, out: "projects/lot-clearing-3", note: "Finished, graded and surfaced. The after." },

  { src: `${IG}/06-DdLpLArFikN-05.jpg`, out: "projects/hauling-1", note: "Trailer tipping a gravel load. The service in one frame." },
  { src: `${IG}/06-DdLpLArFikN-08.jpg`, out: "projects/hauling-2", gravity: [0.5, 0.55], note: "Two skid steers on a residential job. Strongest equipment-ownership proof." },
  { src: `${IG}/06-DdLpLArFikN-10.jpg`, out: "projects/hauling-3", note: "Truck and dump trailer, clean side view." },

  // ---- services ----
  { src: `${IG}/09-DdLj4vblog3-02.jpg`, out: "services/excavation", note: "Skid steer working a cleared strip. Unmistakably excavation at thumbnail size, where the finished pool ring just read as a sandy circle." },
  { src: `${WEB}/concreto.jpg`, out: "services/concrete", note: "Finished drive approach, clean edges." },
  { src: `${WEB}/job-2025-07-15-aabe148a.jpg`, out: "services/fencing", gravity: [0.5, 0.5], note: "New cedar privacy fence. Best fence photograph in the capture." },
  { src: `${IG}/06-DdLpLArFikN-04.jpg`, out: "services/hauling", note: "Loaded dump trailer, gate open." },
  { src: `${IG}/08-DdLkqNelqFM-03.jpg`, out: "services/demolition", note: "Torn-out fencing and timber stacked for haul-off. Reads as removal at a glance, unlike the wider grading shots." },

  // ---- supporting ----
  { src: `${IG}/11-DNrLDMU6Oa0-01.jpg`, out: "work/backyard-complete", note: "Finished pool and deck. The aspirational end state of the work he does." },
  { src: `${IG}/10-DdLgX4kFrss-04.jpg`, out: "work/pool-complete", note: "Pool set and standing where the excavation was." },
  { src: `${IG}/06-DdLpLArFikN-13.jpg`, out: "work/truck", gravity: [0.5, 0.55], note: "His truck. Used small, as a capability note." },
];

const DEFAULT_ASPECT = 3 / 2;
const DEFAULT_WIDTHS = [1600, 1000, 640];
// mozjpeg/libwebp/avif quality (0-100 scale), not the 0-1 scale the old
// canvas encoder used. These land visibly sharp at web display sizes while
// cutting file weight to a fraction of the canvas encoder's output. AVIF's
// scale is more efficient than WebP's, so 50 there looks comparable to
// WebP at 78, at roughly half the bytes on high-detail photos.
const QUALITY = { avif: 50, webp: 78, jpeg: 80 };

let made = 0;
const index = [];

for (const item of M) {
  if (!existsSync(item.src)) {
    console.log(`MISSING  ${item.src}`);
    continue;
  }

  // Phone photos carry an EXIF orientation flag. .rotate() with no args
  // applies it and bakes it into the pixel data, then strips the tag.
  const oriented = await sharp(item.src).rotate().toBuffer();
  const { width: iw, height: ih } = await sharp(oriented).metadata();

  const aspects = item.aspects || { "": item.aspect || DEFAULT_ASPECT };
  const gravity = item.gravity || [0.5, 0.5];

  for (const [variant, aspect] of Object.entries(aspects)) {
    const widths = (item.widths && item.widths[variant]) || item.widthList || DEFAULT_WIDTHS;

    // Cover-crop the source to the target aspect, anchored at gravity.
    let sw, sh;
    if (iw / ih > aspect) {
      sh = ih;
      sw = Math.round(ih * aspect);
    } else {
      sw = iw;
      sh = Math.round(iw / aspect);
    }
    const sx = Math.round((iw - sw) * gravity[0]);
    const sy = Math.round((ih - sh) * gravity[1]);

    for (const w of widths) {
      const h = Math.round(w / aspect);

      // Never upscale past the source's own crop resolution: some reference
      // photos (frame grabs, older phone shots) are narrower than 1600px, and
      // asking for a wider derivative than the source has would just blur it
      // up and bloat the file for no real detail. Cap the actual encode to
      // what the source has; keep the filename/index at the nominal width so
      // the aspect ratio (and the <picture> markup that names these files)
      // stays exactly as designed.
      const encodeW = Math.min(w, sw);
      const encodeH = Math.round(encodeW / aspect);
      const pipeline = sharp(oriented)
        .extract({ left: sx, top: sy, width: sw, height: sh })
        .resize(encodeW, encodeH, { fit: "fill" });

      const suffix = variant ? `-${variant}` : "";
      const base = `${item.out}${suffix}-${w}`;
      const dest = path.join(OUT, base);
      mkdirSync(path.dirname(dest), { recursive: true });

      await pipeline.clone().avif({ quality: QUALITY.avif, effort: 4 }).toFile(`${dest}.avif`);
      await pipeline.clone().webp({ quality: QUALITY.webp, effort: 6 }).toFile(`${dest}.webp`);
      await pipeline.clone().jpeg({ quality: QUALITY.jpeg, mozjpeg: true }).toFile(`${dest}.jpg`);
      made += 3;

      index.push({ file: base, w, h, from: item.src, note: item.note });
    }
  }
  console.log(`${item.out.padEnd(42)} <- ${path.basename(item.src)}`);
}

// Provenance record, so any photo on the site can be traced back to its source.
writeFileSync(
  path.join(OUT, "CREDITS.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), source: "assets/reference (read-only)", images: index }, null, 2) + "\n"
);

console.log(`\n${made} files written into ${OUT}`);
