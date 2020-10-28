const { deliveryClient } = require('../config')

async function fetchPages() {
    const sections = await deliveryClient.items()
        .notEqualsFilter('system.type', 'documentation')
        .depthParameter(2)
        .toPromise()
        .then(response => {
            return response;
        });

        return sections;
}

exports.fetchPages = fetchPages;