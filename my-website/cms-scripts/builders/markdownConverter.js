const TurndownService = require('turndown');

const convert = (codename, title, body_copy, url) => {
//markdown conversion
const turndownService = new TurndownService()
const markdown = turndownService.turndown(body_copy)

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