const fs = require('fs');
const markdownConverter = require('./markdownConverter');
require('dotenv').config()

async function buildContent(response) {
    for (var item of response){
        //documentation content
        const title = item.title.value;
        const codename = item.system.codename;
        const body_copy = item.body_copy.resolveHtml();

        //note: homepage content needs '/' url to accomodate 'docs' plugin
        const  url = item.url.value;
            
        //convert JSON values to markdown
        const data = markdownConverter.convert(codename, title, body_copy, url)

        // use .mdx to leverage Docusaurus markdown features for inline components
        fs.writeFileSync(`${process.env.DOCS_DIR}/${codename}.mdx`, data)
    }
}

exports.buildContent = buildContent;