// Captures the owner's Instagram as read-only reference material.
//   node tools/capture-instagram.mjs
//
// Logged out, Instagram serves only the first 12 of 36 posts and no amount of
// scrolling gets the rest, so this captures what is reachable and records the
// gap rather than pretending the set is complete.
//
// Each post's /embed/captioned/ page carries a contextJSON GraphQL blob with the
// verbatim caption, location, timestamp and every carousel image at original
// resolution. That is the real source here; the screenshots are just for looking.

import puppeteer from "puppeteer";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const USER = "legacy_contractingsolutionsllc";
const PROFILE = `https://www.instagram.com/${USER}/`;
const OUT = path.join("assets", "reference", "instagram");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const VIEWPORTS = [
  ["desktop", 1440, 900],
  ["tablet", 834, 1112],
  ["mobile", 390, 844],
];

for (const d of ["profile", "posts", "media", "content"]) {
  mkdirSync(path.join(OUT, d), { recursive: true });
}

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const scratch = await browser.newPage();

// Same 1x JPEG treatment used for the website capture, for the same reason:
// these are layout reference, and 2x PNG is permanent weight in git history.
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

const page = await browser.newPage();
await page.setUserAgent(UA);

// ---------- profile ----------
let profileMeta = null;
let order = [];

for (const [vName, width, height] of VIEWPORTS) {
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 2,
    isMobile: vName === "mobile",
    hasTouch: vName === "mobile",
  });
  await page.goto(PROFILE, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3000));
  await page.evaluate(() => document.fonts.ready);

  // The signup interstitial is Instagram's, not the owner's. Keep one shot of it
  // for the record, then drop just that node so the grid is readable.
  if (vName === "desktop") {
    writeFileSync(path.join(OUT, "profile", "00-login-wall.jpg"), await shrink(await page.screenshot()));
  }
  await page.evaluate(() => {
    document.querySelectorAll('[role="dialog"]').forEach((d) => d.remove());
    // Removing the dialog leaves its dimming scrim behind. Drop any fixed element
    // that covers most of the viewport, but never one that contains post links -
    // the grid itself sits in a fixed container at some breakpoints.
    document.querySelectorAll("div, section").forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position !== "fixed") return;
      if (el.querySelector('a[href*="/p/"], a[href*="/reel/"]')) return;
      const r = el.getBoundingClientRect();
      if (r.width > innerWidth * 0.5 && r.height > innerHeight * 0.5) el.remove();
    });
    // The grid lives inside a fixed, internally-scrolling wrapper pinned to the
    // viewport, so the document never grows and fullPage returns one screen.
    // Unpin it rather than remove it - the posts are inside.
    document.querySelectorAll("div, section").forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position === "fixed" && /auto|scroll/.test(s.overflowY)) {
        el.style.position = "static";
        el.style.height = "auto";
        el.style.maxHeight = "none";
        el.style.overflow = "visible";
      }
    });
    // Instagram locks scrolling while the interstitial is up.
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.body.style.position = "static";
  });
  await new Promise((r) => setTimeout(r, 600));

  writeFileSync(path.join(OUT, "profile", `${vName}-fold.jpg`), await shrink(await page.screenshot()));

  // The grid lazy-loads, and fullPage measures the document before that happens.
  await page.evaluate(async () => {
    for (let y = 0; y < 6000; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 350));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  writeFileSync(path.join(OUT, "profile", `${vName}-full.jpg`), await shrink(await page.screenshot({ fullPage: true })));
  console.log(`profile/${vName}`);

  if (vName === "desktop") {
    profileMeta = await page.evaluate(() => ({
      title: document.title,
      bio: document.querySelector('meta[name="description"]')?.content || "",
      og: document.querySelector('meta[property="og:description"]')?.content || "",
      avatar: document.querySelector('meta[property="og:image"]')?.content || "",
      externalLinks: [...document.querySelectorAll("a")]
        .map((a) => a.href)
        .filter((h) => h && !h.includes("instagram.com") && !h.includes("facebook.com") && h.startsWith("http")),
      text: document.body.innerText.split("Meta\nAbout\nBlog")[0],
    }));
    order = await page.evaluate(() => [
      ...new Set(
        [...document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')].map((a) => a.getAttribute("href"))
      ),
    ]);
  }
}

// The avatar is a different lockup from the logo on the website, so it is worth
// having even though logged-out Instagram only serves it at 100x100. Larger
// derivatives are refused, so the filename carries the size to stop anyone
// mistaking this for a usable brand asset. The real file has to come from him.
if (profileMeta?.avatar) {
  for (const candidate of [
    profileMeta.avatar.replace(/s100x100/, "s1080x1080"),
    profileMeta.avatar.replace(/stp=[^&]*&/, ""),
    profileMeta.avatar,
  ]) {
    const res = await fetch(candidate, { headers: { "User-Agent": UA, Referer: "https://www.instagram.com/" } });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    // Reject the 100x100 fallback only if a bigger one actually came back.
    const dims = (() => {
      for (let i = 2; i < buf.length - 9; ) {
        if (buf[i] !== 0xff) { i++; continue; }
        const mk = buf[i + 1];
        if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc) {
          return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
      return { w: 0, h: 0 };
    })();
    writeFileSync(path.join(OUT, "profile", `avatar-${dims.w}x${dims.h}.jpg`), buf);
    console.log(`profile/avatar-${dims.w}x${dims.h}.jpg`);
    break;
  }
}

// Grid order is newest first; keep it so numbering matches what he sees.
const posts = order.map((href) => ({
  shortcode: href.match(/\/(?:p|reel)\/([^/]+)/)[1],
  kind: href.includes("/reel/") ? "reel" : "post",
}));
console.log(`\n${posts.length} posts reachable\n`);

// ---------- posts ----------
const records = [];
let i = 0;

for (const p of posts) {
  i++;
  const n = String(i).padStart(2, "0");
  const url = `https://www.instagram.com/p/${p.shortcode}/embed/captioned/`;
  await page.setViewport({ width: 700, height: 1100, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 2000));

  writeFileSync(
    path.join(OUT, "posts", `${n}-${p.shortcode}.jpg`),
    await shrink(await page.screenshot({ fullPage: true }))
  );

  const html = await page.content();
  let media = null;
  const m = html.match(/"contextJSON":"((?:[^"\\]|\\.)*)"/);
  if (m) {
    try {
      media = JSON.parse(JSON.parse('"' + m[1] + '"'))?.gql_data?.shortcode_media || null;
    } catch (e) {
      console.log(`  ${n} contextJSON parse failed: ${e.message}`);
    }
  }

  const caption = media?.edge_media_to_caption?.edges?.[0]?.node?.text || "";
  const children = media?.edge_sidecar_to_children?.edges?.map((e) => e.node) || (media ? [media] : []);

  // No date is recorded on purpose. The embed payload has no taken_at_timestamp,
  // and deriving one from the media id puts these posts in 2041, so the epoch
  // trick does not hold for this id scheme. Grid order still gives reliable
  // newest-first ordering, which is all we can honestly claim.
  const rec = {
    n,
    shortcode: p.shortcode,
    id: media?.id || null,
    kind: p.kind,
    type: media?.__typename || "unknown",
    url: `https://www.instagram.com/p/${p.shortcode}/`,
    takenAt: null,
    location: media?.location?.name || null,
    likes: media?.edge_liked_by?.count ?? media?.edge_media_preview_like?.count ?? null,
    isVideo: !!media?.is_video,
    caption,
    images: [],
  };

  let j = 0;
  for (const child of children) {
    j++;
    const src = child.display_url;
    if (!src) continue;
    const res = await fetch(src, { headers: { "User-Agent": UA, Referer: "https://www.instagram.com/" } });
    if (!res.ok) {
      console.log(`  ${n}-${j} FAIL ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const file = `${n}-${p.shortcode}-${String(j).padStart(2, "0")}.jpg`;
    writeFileSync(path.join(OUT, "media", file), buf);
    rec.images.push({
      file,
      dims: child.dimensions ? `${child.dimensions.width}x${child.dimensions.height}` : null,
      isVideo: !!child.is_video,
      // Instagram's own auto-generated alt text. Not usable as-is, but it is a
      // starting point for real alt text and it describes what is in frame.
      altText: child.accessibility_caption || null,
      // Signed CDN URL that expires within hours. Recorded to show a video exists
      // here, not as something that can be fetched later.
      videoUrl: child.video_url || null,
      bytes: buf.length,
    });
  }

  writeFileSync(
    path.join(OUT, "content", `${n}-${p.shortcode}.md`),
    [
      `# ${n} - ${p.shortcode} (${rec.type})`,
      ``,
      `URL: ${rec.url}`,
      `Posted: not exposed logged-out (grid position ${rec.n} of ${posts.length}, newest first)`,
      `Location tag: ${rec.location || "(none - any location is in the caption text)"}`,
      `Media: ${rec.images.length} file(s)${rec.isVideo ? " (video post: thumbnail only)" : ""}`,
      ...rec.images.map(
        (im) =>
          `  - ${im.file}  ${im.dims || ""}${im.isVideo ? "  [video thumbnail]" : ""}` +
          (im.altText ? `\n      IG auto-alt: ${im.altText}` : "")
      ),
      ``,
      `## Caption (verbatim)`,
      ``,
      "```",
      caption || "(no caption)",
      "```",
      ``,
    ].join("\n")
  );

  records.push(rec);
  console.log(
    `${n} ${p.shortcode} ${rec.type.padEnd(13)} ${(rec.location || "-").padEnd(20)} ${rec.images.length} img  ${caption
      .split("\n")[0]
      .slice(0, 60)}`
  );
}

writeFileSync(
  path.join(OUT, "posts.json"),
  JSON.stringify(
    {
      user: USER,
      capturedAt: new Date().toISOString(),
      profile: profileMeta,
      reachable: records.length,
      posts: records,
    },
    null,
    2
  ) + "\n"
);
console.log(`\nposts.json written (${records.length} posts, ${records.reduce((a, r) => a + r.images.length, 0)} images)`);

await browser.close();
