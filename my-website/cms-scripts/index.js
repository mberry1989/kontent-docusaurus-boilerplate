const { fetchItems } = require('./api/fetchItems');
const { buildContent } = require('./builders/buildContent');
const { fetchPages } = require('./api/fetchPages');
const { buildSidebar } = require('./builders/buildSidebar');
const { fileSystemSync } = require('./ultilities/sync');
require('dotenv').config()

module.exports = function (context, options) {
  return {
    name: 'plugin-kontent-cms',
    extendCli(cli) {
      cli
        .command('sync-kontent')
        .description('Populate Docusaurus with content from a Kentico Kontent project.')
        .action(async function IntegrateKontent() {
          // calls to Headless CMS API for documentation content
          let response =  await fetchItems(process.env.DOC_CONTENT_TYPE);
          
          // adds the markdown files for 'docs' plugin using fs.writeFileSync   
          await buildContent(response)

          // calls to Headless CMS API for page and homepage web spotlight types
          let sections = await fetchPages(process.env.DOC_CONTENT_TYPE);

          // build ./sidebars.js with API navigation data using fs.writeFileSync
          await buildSidebar(sections);

          // deletes documentation from docusaurus project that is not present in the CMS
          await fileSystemSync(process.env.DOCS_DIR, process.env.DOC_CONTENT_TYPE)
        });
    },
  };
};