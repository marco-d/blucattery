module.exports = (config) => {
    config.addPassthroughCopy('./src/img/');
    config.addPassthroughCopy('./src/css/');
    config.addPassthroughCopy("./src/CNAME");
    // Returns work items, sorted by display order
config.addCollection('bricks', (collection) => {
	return collection
		.getFilteredByGlob('./src/bricks/*.md')
		.sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1));
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
