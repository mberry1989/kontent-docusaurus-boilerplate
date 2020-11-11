const KenticoContent = require('@kentico/kontent-delivery');
require('dotenv').config()
const deliveryClient = new KenticoContent.DeliveryClient({
    projectId: process.env.PROJECT_ID,
    previewApiKey: process.env.USE_PREVIEW && process.env.USE_PREVIEW.toLowerCase() === 'true'
    ? process.env.PREVIEW_KEY
    : undefined,
    globalQueryConfig: {
        usePreviewMode: process.env.USE_PREVIEW && process.env.USE_PREVIEW.toLowerCase() === 'true', // Queries the Delivery Preview API.
    },
});

exports.deliveryClient = deliveryClient;