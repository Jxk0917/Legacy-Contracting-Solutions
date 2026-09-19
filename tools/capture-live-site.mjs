// Captures the owner's current live site as read-only reference material.
// Re-runnable:  node tools/capture-live-site.mjs
//
// Writes screenshots, extracted copy, and an image manifest into
// assets/reference/current-site/. Nothing here is a build input; it exists so
// the redesign can be argued against what the owner has today.

import puppeteer from "puppeteer";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ORIGIN = "https://www.legacycontractingsolutionsllc.com";
const OUT = path.join("assets", "reference", "current-site");

// Nav order on the live site, so filenames sort the way the site reads.
const PAGES = [
  ["01-home", "/"],
  ["02-our-services", "/our-services"],
  ["03-about-us", "/about-us"],
  ["04-project-showcase", "/project-showcase"],
  ["05-testimonials", "/testimonials"],
];

const VIEWPORTS = [
  ["desktop", 1440, 900],
  ["tablet", 834, 1112],
  ["mobile", 390, 844],
];

// Pull every lazy image into view, then return to the top so the fold shot is
// actually the fold.
async function settle(page) {
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all(
      [...document.images]
        .filter((i) => !i.complete)
        .map((i) => new Promise((r) => { i.onload = i.onerror = r; }))
    )
  );
}

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
// Blank page used only as a canvas host for re-encoding.
const scratch = await browser.newPage();

// Full-page shots exist to show layout and flow, not pixels. Kept at 2x PNG they
// run ~100MB across the set, which is permanent weight in git history. Halve to
// 1x and encode as JPEG.
async function shrink(buf) {
  const out = await scratch.evaluate(async (b64) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = Math.round(img.width / 2);
    c.height = Math.round(img.height / 2);
    const x = c.getContext("2d");
    x.imageSmoothingQuality = "high";
    x.fillStyle = "#fff";
    x.fillRect(0, 0, c.width, c.height);
    x.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.82);
  }, buf.toString("base64"));
  return Buffer.from(out.split(",")[1], "base64");
}
await page.setUserAgent(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
);

const manifest = [];

for (const [vName, width, height] of VIEWPORTS) {
  mkdirSync(path.join(OUT, vName), { recursive: true });
  await page.setViewport({ width, height, deviceScaleFactor: 2, isMobile: vName === "mobile", hasTouch: vName === "mobile" });

  for (const [slug, route] of PAGES) {
    await page.goto(ORIGIN + route, { waitUntil: "networkidle2", timeout: 90000 });
    await settle(page);

    const fold = path.join(OUT, vName, `${slug}-fold.png`);
    await page.screenshot({ path: fold, fullPage: false });
    const full = path.join(OUT, vName, `${slug}-full.jpg`);
    writeFileSync(full, await shrink(await page.screenshot({ fullPage: true })));
    console.log(full);

    // Copy and image inventory only need capturing once.
    if (vName === "desktop") {
      const data = await page.evaluate(() => ({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || "",
        h1: [...document.querySelectorAll("h1")].map((n) => n.innerText.trim()),
        headings: [...document.querySelectorAll("h1,h2,h3")].map((n) => `${n.tagName} ${n.innerText.trim()}`),
        text: document.body.innerText,
        tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
        mailto: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
        images: [...document.querySelectorAll("img")].map((i) => ({
          src: i.currentSrc || i.src,
          alt: i.alt,
          natural: `${i.naturalWidth}x${i.naturalHeight}`,
        })),
      }));

      mkdirSync(path.join(OUT, "content"), { recursive: true });
      writeFileSync(
        path.join(OUT, "content", `${slug}.md`),
        [
          `# ${slug}  (${ORIGIN}${route})`,
          ``,
          `Captured: ${new Date().toISOString().slice(0, 10)}`,
          `Title: ${data.title}`,
          `Meta description: ${data.description || "(none)"}`,
          `tel: links: ${data.tel.length ? data.tel.join(", ") : "(none)"}`,
          `mailto: links: ${data.mailto.length ? data.mailto.join(", ") : "(none)"}`,
          ``,
          `## Heading outline`,
          ``,
          ...data.headings.map((h) => `- ${h}`),
          ``,
          `## Visible copy (verbatim)`,
          ``,
          "```",
          data.text,
          "```",
          ``,
        ].join("\n")
      );

      data.images.forEach((i) => manifest.push({ page: slug, ...i }));
    }

    // The live site's mobile nav is a disclosure; capture it open.
    if (vName === "mobile" && slug === "01-home") {
      const opened = await page.evaluate(() => {
        const btn = document.querySelector(
          'button[aria-expanded], [class*="menu"] button, button[class*="menu"], [class*="hamburger"], [class*="toggle"]'
        );
        if (!btn) return false;
        btn.click();
        return true;
      });
      if (opened) {
        await new Promise((r) => setTimeout(r, 700));
        const navShot = path.join(OUT, vName, `01-home-nav-open.png`);
        await page.screenshot({ path: navShot, fullPage: false });
        console.log(navShot);
      }
    }
  }
}

writeFileSync(path.join(OUT, "image-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(path.join(OUT, "image-manifest.json"));

await browser.close();
