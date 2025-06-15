const fs = require("fs");
const path = require("path");

module.exports = (config) => {
  config.addPassthroughCopy("./src/img/");
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/CNAME");
  config.addPassthroughCopy("./src/robots.txt");
  // Returns work items, sorted by display order
  config.addCollection("bricks", (collection) => {
    return collection
      .getFilteredByGlob("./src/bricks/*.md")
      .sort((a, b) =>
        Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1
      );
  });
  // Galleria dinamica: carica immagini da /img/gallery/optimized/
  config.addCollection("galleryImages", () => {
    const dir = "src/img/gallery/optimized";
    return fs
      .readdirSync(dir)
      .filter(file => /\.(jpe?g|png|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        thumb: `/img/gallery/thumbs/${file}`,
        full: `/img/gallery/optimized/${file}`,
        alt: `Foto ${path.parse(file).name}`
      }));
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
