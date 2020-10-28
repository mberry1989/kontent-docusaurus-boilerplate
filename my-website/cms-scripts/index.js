const { fetchArticles } = require('./api/fetchArticles');
const { buildArticles } = require('./builders/buildArticles');
const { fetchPages } = require('./api/fetchPages');
const { buildSidebar } = require('./builders/buildSidebar');

module.exports = function (context, options) {
  return {
    name: 'plugin-kontent-cms',
    extendCli(cli) {
      cli
        .command('add kontent')
        .description('Populate Docusaurus with content from a Kentico Kontent project.')
        .action(async function IntegrateKontent() {
          //calls to Headless CMS API for documentation content
          let response =  await fetchArticles('documentation');// need to replace hard-coded content types
          
          // adds the markdown files for 'docs' plugin using fs.writeFileSync   
          await buildArticles(response)

          let sections = await fetchPages();

          // build ./sidebars.js with API navigation data using fs.writeFileSync
          await buildSidebar(sections);
        });
    },
  };
};