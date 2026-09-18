export default function (eleventyConfig) {
  // Static assets ship as-is. src/assets/... is served at /assets/...
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

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
