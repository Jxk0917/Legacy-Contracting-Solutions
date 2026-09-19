import { readFileSync, existsSync } from "node:fs";

// Dimensions for every derivative written by tools/build-images.mjs. Used to set
// width/height on each <img> so nothing reflows while photos load.
const CREDITS_PATH = "src/assets/img/CREDITS.json";
const sizeIndex = new Map();
if (existsSync(CREDITS_PATH)) {
  for (const img of JSON.parse(readFileSync(CREDITS_PATH, "utf8")).images) {
    sizeIndex.set(img.file, { w: img.w, h: img.h });
  }
}

// Set by CI when this builds as a GitHub Pages *project* site (served under
// /<repo-name>/ rather than at the domain root). Empty locally, so `npm start`
// and `npm run build` keep working unprefixed unless PATH_PREFIX is set.
const PATH_PREFIX = process.env.PATH_PREFIX || "/";

// Joins the configured prefix onto a root-relative path, for URLs built in
// plain JS (the photo shortcode below) rather than through Nunjucks, which
// gets Eleventy's own `url` filter for this automatically.
function withPrefix(p) {
  return `${PATH_PREFIX.replace(/\/$/, "")}${p}`;
}

export default function (eleventyConfig) {
  // Static assets ship as-is. src/assets/... is served at /assets/...
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Responsive <picture> for a processed photo.
  //   {% photo "projects/lot-clearing-3", "Alt text", "(min-width: 62rem) 40vw, 100vw" %}
  // `name` is the path under /assets/img without the width suffix or extension.
  // Widths come from tools/build-images.mjs and are the same for every photo
  // except the hero, which passes its own list.
  eleventyConfig.addShortcode(
    "photo",
    (name, alt, sizes = "100vw", cls = "", eager = false, widths = [640, 1000, 1600]) => {
      if (alt === undefined || alt === null) {
        throw new Error(`photo shortcode: alt text is required (${name})`);
      }
      const mid = widths[Math.min(1, widths.length - 1)];
      const dim = sizeIndex.get(`${name}-${mid}`) || sizeIndex.get(`${name}-${widths[0]}`);
      const srcset = (ext) => widths.map((w) => `${withPrefix(`/assets/img/${name}-${w}.${ext}`)} ${w}w`).join(", ");

      return `<picture class="photo${cls ? " " + cls : ""}">
<source type="image/avif" srcset="${srcset("avif")}" sizes="${sizes}">
<source type="image/webp" srcset="${srcset("webp")}" sizes="${sizes}">
<img src="${withPrefix(`/assets/img/${name}-${mid}.jpg`)}" srcset="${srcset("jpg")}" sizes="${sizes}" alt="${String(alt).replace(/"/g, "&quot;")}"${
        dim ? ` width="${dim.w}" height="${dim.h}"` : ""
      } ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
    }
  );

  eleventyConfig.setServerOptions({ showAllHosts: true });

  // Digits only, for tel: hrefs. "210-840-8533" -> "2108408533"
  eleventyConfig.addFilter("telHref", (phone) =>
    `tel:+1${String(phone).replace(/\D/g, "")}`
  );

  // Projects filtered to one service category, for cross-linking Services -> Projects.
  eleventyConfig.addFilter("byCategory", (projects, categoryId) =>
    (projects || []).filter((p) => p.category === categoryId)
  );

  // Single record by key. Nunjucks has no usable selectattr, so this is explicit.
  eleventyConfig.addFilter("findBy", (items, key, value) =>
    (items || []).find((item) => item[key] === value)
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    pathPrefix: PATH_PREFIX,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
