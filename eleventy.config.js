import yaml from "js-yaml";

const escapeHtml = (value) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const inlineMd = (value) =>
  escapeHtml(value)
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/_(.*?)_/g, "<em>$1</em>");

const blockMd = (value) =>
  String(value || "")
    .trim()
    .split(/\n\n+/)
    .map((paragraph) => `<p>${inlineMd(paragraph).replaceAll("\n", "<br />")}</p>`)
    .join("\n");

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.ignores.add("src/admin/**");
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  eleventyConfig.addFilter("md", blockMd);
  eleventyConfig.addFilter("mdinline", inlineMd);
  eleventyConfig.addFilter("isItch", (href) => /itch\.io/i.test(String(href || "")));

  eleventyConfig.addCollection("games", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/games/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true,
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
