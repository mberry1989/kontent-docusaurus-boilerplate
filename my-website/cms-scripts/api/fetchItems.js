const { deliveryClient } = require('../config')
const { resolveLinkInRichText } = require('../resolvers/linkResolver');
const { resolveItemInRichText } = require('../resolvers/itemResolver');
const fs = require('fs');

async function fetchItems(contentType) {
    const items = await deliveryClient.items()
        .type(contentType)
        .queryConfig({
            urlSlugResolver: resolveLinkInRichText,
            richTextResolver: resolveItemInRichText
            
        })
        .toPromise()
        .then(response => {
            return response.items;
        });

        return items;
}

exports.fetchItems = fetchItems;





