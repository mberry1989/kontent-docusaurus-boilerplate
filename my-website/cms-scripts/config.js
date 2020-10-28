const KenticoContent = require('@kentico/kontent-delivery');
require('dotenv').config()

const deliveryClient = new KenticoContent.DeliveryClient({
    projectId: process.env.PROJECT_ID,
    previewApiKey: process.env.PREVIEW_KEY,
    globalQueryConfig: {
        usePreviewMode: true, // Queries the Delivery Preview API.
    },
});

exports.deliveryClient = deliveryClient;