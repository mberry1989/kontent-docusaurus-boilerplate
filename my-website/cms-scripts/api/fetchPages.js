const { deliveryClient } = require('../config')

async function fetchPages(contentType) {
    const sections = await deliveryClient.items()
        .notEqualsFilter('system.type', contentType)
        .depthParameter(2)
        .toPromise()
        .then(response => {
            return response;
        });

        return sections;
}

exports.fetchPages = fetchPages;