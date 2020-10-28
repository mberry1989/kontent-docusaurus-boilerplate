const { deliveryClient } = require('../config')
const fs = require('fs');

async function fetchArticles(contentType) {
    const items = await deliveryClient.items()
        .type(contentType)
        .toPromise()
        .then(response => {
            return response.items;
        });

        return items;
}

exports.fetchArticles = fetchArticles;





