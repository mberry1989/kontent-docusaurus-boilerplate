var unified = require('unified')
var parse = require('rehype-parse')
var rehype2remark = require('rehype-remark')
var stringify = require('remark-stringify')

const convert = (codename, title, body_copy, url) => {
    // HTML to Markdown
    var processor = unified()
        .use(parse)
        .use(rehype2remark)
        .use(stringify)    
    const markdown = processor.processSync(body_copy)

const data = `---
id: ${codename}
title: ${title}
sidebar_label: ${title}
slug: ${url}
---
${markdown}
`    

return data

}

exports.convert = convert;