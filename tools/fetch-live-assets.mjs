// Downloads the owner's own real images off the live site into the read-only
// reference tree.  node tools/fetch-live-assets.mjs
//
// Webador serves resized derivatives via ?enable-io=true&width=...; stripping the
// query string returns the original upload, so that is what we keep. Stock photos
// (pexels) are skipped on purpose: they are not Legacy's work and must not end up
// looking like it.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const manifest = JSON.parse(
  await import("node:fs/promises").then((fs) =>
    fs.readFile("assets/reference/current-site/image-manifest.json", "utf8")
  )
);

const BRAND = path.join("assets", "reference", "brand");
const PROJECTS = path.join("assets", "reference", "projects");
mkdirSync(BRAND, { recursive: true });
mkdirSync(PROJECTS, { recursive: true });

const STOCK = /pexels|unsplash|pixabay/i;
const seen = new Set();
const log = [];
let n = 0;

for (const img of manifest) {
  const original = img.src.split("?")[0];
  if (seen.has(original)) continue;
  seen.add(original);

  const base = path.basename(original).replace(/-high(\.\w+)$/, "$1");
  const isLogo = /image-ny2nq9|image-high-ny2nq9/.test(original) || base.startsWith("image-ny2nq9");

  if (STOCK.test(original)) {
    log.push({ skipped: "stock", url: original, alt: img.alt, page: img.page });
    continue;
  }

  let dest;
  if (isLogo) {
    dest = path.join(BRAND, `logo-original${path.extname(base) || ".png"}`);
  } else if (/^whatsapp-image/.test(base)) {
    // Undated, uncaptioned job photos. Keep the source hash so a photo can always
    // be traced back to the live site; do not imply a project name we don't have.
    const hash = base.match(/_([0-9a-f]{8})/)?.[1] || String(++n).padStart(2, "0");
    const date = base.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "undated";
    dest = path.join(PROJECTS, `job-${date}-${hash}${path.extname(base)}`);
  } else {
    dest = path.join(PROJECTS, base);
  }

  const res = await fetch(original, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.legacycontractingsolutionsllc.com/" },
  });
  if (!res.ok) {
    log.push({ failed: res.status, url: original });
    console.log(`FAIL ${res.status} ${original}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  log.push({ saved: dest, url: original, bytes: buf.length, pages: img.page });
  console.log(`${(buf.length / 1024).toFixed(0).padStart(6)} KB  ${dest}`);
}

writeFileSync(
  path.join("assets", "reference", "current-site", "download-log.json"),
  JSON.stringify(log, null, 2) + "\n"
);
console.log(`\nsaved ${log.filter((l) => l.saved).length}, skipped stock ${log.filter((l) => l.skipped).length}, failed ${log.filter((l) => l.failed).length}`);
