const { fetchItems } = require('./api/fetchItems');
const { buildContent } = require('./builders/buildContent');
const { fetchPages } = require('./api/fetchPages');
const { buildSidebar } = require('./builders/buildSidebar');
const { fileSystemSync } = require('./ultilities/sync');

module.exports = function (context, options) {
  return {
    name: 'plugin-kontent-cms',
    extendCli(cli) {
      cli
        .command('sync-kontent')
        .description('Populate Docusaurus with content from a Kentico Kontent project.')
        .action(async function IntegrateKontent() {
          // calls to Headless CMS API for documentation content
          let response =  await fetchItems('documentation');// need to replace hard-coded content types
          
          // adds the markdown files for 'docs' plugin using fs.writeFileSync   
          await buildContent(response)

          // calls to Headless CMS API for page and homepage web spotlight types
          let sections = await fetchPages();

          // build ./sidebars.js with API navigation data using fs.writeFileSync
          await buildSidebar(sections);

          let docsPath = './docs'
          await fileSystemSync(docsPath)
        });
    },
  };
};