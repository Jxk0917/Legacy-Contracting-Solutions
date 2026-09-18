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

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();

for (const [vName, width, height] of viewports) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  for (const [pName, url] of pages) {
    await page.goto(base + url, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(outDir, `${pName}-${vName}.png`);
    await page.screenshot({ path: file, fullPage: vName === "desktop" });
    console.log(file);
  }
}

await browser.close();
