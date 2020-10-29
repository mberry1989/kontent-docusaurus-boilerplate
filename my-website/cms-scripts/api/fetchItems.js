const { deliveryClient } = require('../config')
const fs = require('fs');

async function fetchItems(contentType) {
    const items = await deliveryClient.items()
        .type(contentType)
        .toPromise()
        .then(response => {
            return response.items;
        });

        return items;
}

exports.fetchItems = fetchItems;





