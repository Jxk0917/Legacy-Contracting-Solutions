// Screenshot helper for visual checks against the running dev server.
//   node tools/shot.mjs [outDir] [baseUrl]
import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outDir = process.argv[2] || "shots";
const base = process.argv[3] || "http://localhost:8080";

const pages = [
  ["home", "/"],
  ["services", "/services/"],
  ["projects", "/projects/"],
  ["about", "/about/"],
  ["contact", "/contact/"],
];

const viewports = [
  ["desktop", 1440, 900],
  ["tablet", 834, 1112],
  ["mobile", 390, 844],
];

mkdirSync(outDir, { recursive: true });

// Eleventy rewrites passthrough assets during a build, so for a moment the
// stylesheet can be missing and a capture taken then shows an unstyled page.
// Wait for it to come back before shooting anything.
async function waitForStylesheet() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`${base}/assets/css/site.css`, { cache: "no-store" });
      if (res.ok && (await res.text()).length > 2000) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`stylesheet never became available at ${base}`);
}
await waitForStylesheet();

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();

for (const [vName, width, height] of viewports) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  for (const [pName, url] of pages) {
    await page.goto(base + url, { waitUntil: "networkidle0" });
    // Pull every lazy image into view before capturing, then return to the top.
    // Lazy images are correct for real visitors but make a capture unreliable,
    // because the browser can defer them past the point of the screenshot.
    // Promote everything to eager before walking the page.
    await page.evaluate(() => {
      for (const img of document.images) img.loading = "eager";
    });
    await page.evaluate(async () => {
      // Bound the walk. Reading scrollHeight each iteration never terminates
      // cleanly, because every lazy image that loads makes the page taller.
      const step = Math.floor(window.innerHeight * 0.8);
      const maxSteps = 60;
      for (let i = 0; i < maxSteps; i++) {
        const y = i * step;
        if (y > document.body.scrollHeight) break;
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 250));
    });
    await page.evaluate(() => document.fonts.ready);
    // A deferred lazy image can sit incomplete without ever firing load or
    // error, so this waits with a ceiling rather than indefinitely.
    await page.evaluate(async () => {
      const pending = [...document.images].filter((i) => !i.complete);
      await Promise.race([
        Promise.all(pending.map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
        new Promise((r) => setTimeout(r, 4000)),
      ]);
    });
    const file = path.join(outDir, `${pName}-${vName}.png`);
    await page.screenshot({ path: file, fullPage: vName === "desktop" });
    console.log(file);
  }
}

await browser.close();
