# Kentico Kontent Docusaurus Boilerplate

This boilerplate [Docusaurus v2 static site generator](https://v2.docusaurus.io/) project uses the [Kentico Kontent Delivery JavaScript SDK](https://github.com/Kentico/kontent-delivery-sdk-js) to retrieve content.

A full demonstration of a Kontent + Docusaurus site that also acts as a tutorial for running this boilerplate can be seen here: [Docusaurus + Kontent Sample](https://sad-clarke-a5925e.netlify.app/)

## Table of Contents
- [Kontent Setup](#kontent-setup)
- [Application Setup](#application-setup)
- [How It Works](#how-it-works)
- [Content Administration](#content-administration)
  - [Content Model Definitions](#content-model-definitions)
- [Resolving Links and Content Items in Rich Text](#resolving-links-and-content-items-in-rich-text)
- [Web Spotlight (optional)](#web-spotlight-optional)
- [Deploying to Netlify](#deploying-to-netlify)
- [Getting Support](#getting-support-and-contributing)

## Kontent Setup
   
### Importing the Kontent + Docusaurus Template

To create a boilerplate project containing a homepage, one documentation section, and a documentation page:

1.  [Create a project in Kentico Kontent](https://docs.kontent.ai/tutorials/manage-kontent/projects/manage-projects#a-creating-projects "Kentico Kontent")
2.  In the Kontent user interface, choose _Project settings_ from the app menu.
3.  Under _Production Environment Settings_, choose _API keys_
4.  Enable the Management API
5.  Navigate to the [Kontent Template Manager](https://kentico.github.io/kontent-template-manager/import "Kontent Template Manager")
6.  Drop the [kontent-backup-Docusaurus-Template.zip](https://github.com/kentico-michaelb/kontent-docusaurus-boilerplate/blob/main/my-website/kontent-backup-DocusaurusTemplate.zip "Kontent Docusaurus Template Zip") export onto the Kontent Template Manager
7.  Copy & paste the **Project ID** and the **Management API keys** from your newly created Kontent project into the respective fields in the template manager
8.  Check *Publish language variants after import*
9.  Click *Prepare for import *on the template manager
10.  Click *Import data*

## Application Setup

### Running the Application
To run the app:
1. Clone the app repository with your favorite GIT client
1. Open the solution in Visual Studio Code or your favorite IDE
1. Update the Kontent project ID in `.env` - detailed instructions available [below](#connecting-to-your-sample-project)
1. From the terminal run:
   1. `cd my-website`
   1. `npm install`
   
### Connecting to your Sample Project

1. In Kentico Kontent, choose _Project settings_ from the app menu
1. Under _Production Environment Settings_, choose _API keys_
1. Open the `.env` file
1. Use the _Delivery API_ value from your Kentico Kontent project as the *PROJECT_ID* value
1. Set USE_PREVIEW to _false_
1. Save the changes
1. Run `npm run kontent` from the terminal to sync with Kentico Kontent
1. Run `npm start` from the terminal to start the site on _http://localhost:3000_

#### Example .env contents:

```
PROJECT_ID=1a1b1111-2c22-3333-d4ef-ghij5klm5n5o
USE_PREVIEW=true
PREVIEW_KEY=ew0KIC...
DOCS_DIR=./docs
DOC_CONTENT_TYPE=documentation
PAGE_CONTENT_TYPE=page
```

The Kontent + Docusaurus sample populates the **docs** directory with markdown content and uses the **documentation** and **page** content types within Kentico Kontent to determine navigation vs. content pages.  These values are configurable in the *.env* file, but changing them is not recommended.

**Note:** Setting **USE_PREVIEW** to _false_ will cause the sample to use only published versions of the content in Kentico Kontent. 

## How It Works
This boilerplate uses a custom Docusaurus plugin: [cms-scripts](https://github.com/kentico-michaelb/kontent-docusaurus-boilerplate/tree/main/my-website/cms-scripts). The plugin is run using a CLI command that leverages the `extendCli` Docusaurus lifecycle API, and creates markdown files in the "docs" directory. The plugin pipeline is:

1. Fetch documentation content items from the Kentico Kontent Delivery API
1. Convert documentation items returned as JSON into physical markdown files and save them to the "docs" directory
1. Fetch pages (that act as navigation items) from the from Kentico Kontent Delivery API
1. Construct a sidebar object from the page items returned
1. Save the sidebar to "sidebar.js" in the root of the site to accomodate the [Docusaurus "docs" feature](https://v2.docusaurus.io/docs/docs-introduction/#sidebar)

More information about Docusaurus plugins and API lifecycles can be seen in their documentation here:
[Creating Plugins](https://v2.docusaurus.io/docs/using-plugins/#creating-plugins)
[Lifecycle APIs](https://v2.docusaurus.io/docs/lifecycle-apis)

## Content Administration
1. Navigate to <https://app.kontent.ai> in your browser.
1. Sign in with your credentials.
1. Manage content in the content administration interface of your sample project.

### Content Model Definitions

* Homepage
  * The homepage is the root node of the site, and as the root stores all expandable navigation sections in its _Subpages_ element. It also acts as an expandable navigation section itself.
  * The first *Documentation* item in its _Content_ element will act as the default homepage. **IMPORTANT:** This first Documentation item in the Homepage's _Content_ element must use "/" as its URL slug.
* Page
  * The **Page** content type are reflected as sections in the site's sidebar navigation
  * A **Page**'s _Subpages_ element can contains other page items (to create nested sections) or documentation items
* Documentation
  * The **Documentation** content type are primary content node.  They store the titles and body copy.
* Callout
  * The **Callout** content type renders colored informational text boxes and are to be used in the body copy of documentation items.

## Resolving Links and Content Items in Rich Text
The API query used in [cms-scripts/api/fetchItems.js](https://github.com/kentico-michaelb/kontent-docusaurus-boilerplate/blob/main/my-website/cms-scripts/api/fetchItems.js) is set to resolve links and inline content items on the query level as described in the Kentico Kontent JavaScript SDK documentation [here](https://github.com/Kentico/kontent-delivery-sdk-js/blob/master/DOCS.md#resolve-url-slugs-on-query-level).

```javascript
const { resolveLinkInRichText } = require('../resolvers/linkResolver');
const { resolveItemInRichText } = require('../resolvers/itemResolver');

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
```

#### Links:
Link resolution is configured in [cms-scripts/resolvers/linkResolver.js](https://github.com/kentico-michaelb/kontent-docusaurus-boilerplate/blob/main/my-website/cms-scripts/resolvers/linkResolver.js) to evaluate the "link type" of links returned in the `fetchItems.js` API call, then return a url property handled by the JavaScript SDK.

```javascript
require('dotenv').config()

const resolveLinkInRichText = (link, context) => {
    if (link.type === process.env.DOC_CONTENT_TYPE){
      return { url: `${link.urlSlug}`};
    }
    return { url: 'unsupported-link'};
  }

  exports.resolveLinkInRichText = resolveLinkInRichText;
```

#### Content Items:
Content item resolution is configured in [cms-scripts/resolvers/itemResolver.js](https://github.com/kentico-michaelb/kontent-docusaurus-boilerplate/blob/main/my-website/cms-scripts/resolvers/itemResolver.js) to evaluate the content type of inline content items returned in the `fetchItems.js` API call, then return a markup or markdown that the [markdown converter](https://github.com/kentico-michaelb/kontent-docusaurus-boilerplate/blob/main/my-website/cms-scripts/builders/markdownConverter.js) can include in the physical markdown file content.

```javascript
const resolveItemInRichText = (item) => {
    switch (item.system.type) {
        case 'callout':
            return `:::${item.type.value[0].name} ${item.title.value} ${item.body.value}:::`

        case 'youtube_video':     
            return `<a href="http://www.youtube.com/watch?v=${item.video_id.value}"><img src="http://img.youtube.com/vi/${item.video_id.value}/0.jpg" alt="${item.video_title.value}"/></a>`
        
        default:
            return `> Content not available.`
    }
}

exports.resolveItemInRichText = resolveItemInRichText;
```

Executing the inline resolution requires calling the JavaScript SDK's `resolveHTML()` method on the rich text element containing the inline content items.

```javascript
const body_copy = item.body_copy.resolveHtml()
```
found in [buildContent.js](https://github.com/kentico-michaelb/kontent-docusaurus-boilerplate/blob/main/my-website/cms-scripts/builders/buildContent.js).

## Web Spotlight (optional)
Web Spotlight is an additional (optional) tool for Kentico Kontent focused on website management. For this project, it allows for:

*   Seeing the hierarchy of a website in a page tree 
*   Creating new pages from the page tree
*   Previewing of changes in Kontent

Web Spotlight is a paid feature and must be activated by a member of the Kentico Kontent Sales team for your subscription before it can be used. More information about Web Spotlight and activation can be seen in the [official Kentico Kontent documentation](https://docs.kontent.ai/tutorials/set-up-kontent/set-up-your-project/web-spotlight "Web Spotlight documentation").

Web Spotlight uses Kentico Kontent's "Preview" functionality in order to show the live view of the site within the UI.

To set up preview URLs for your project:

1.  In Kentico Kontent, choose  Project settings   from the app menu.
2.  Under Environment settings, choose Preview URLs.
3.  Type in the preview URLs for each type of preview-able content.

More details about setting up preview and Web Spotlight can be seen in the [official Kentico Kontent documentation.](https://docs.kontent.ai/tutorials/develop-apps/build-strong-foundation/set-up-preview "Kontent Documentation - set up preview for content items")

**Note:** Preview URLs require an `https://` protocol and a URL accessible to Kontent. Without a valid SSL certificate, Kontent responds with secure connection errors. When developing apps locally, see how to [serve pages over HTTPS](https://create-react-app.dev/docs/using-https-in-development/) in combination with [ngrok](https://ngrok.com/docs)'s forwarded address.

## Deploying to Netlify
When deploying to Netlify, set:

  **Base Directory:** my-website

  **Build Command:** npm run kontent && npm run build

  **Publish Directory:** build

as well as the environmental variables  mentioned in the [Add Environmental Variables](#example-.env-contents) section.

For more advanced automation and build options, information about leveraging Kentico Kontent webhooks and Netlify build triggers can be seen in the [official Kentico Kontent documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/netlify-automation).

## This sample site also uses:
*   [Docusaurus preset-classic](https://v2.docusaurus.io/docs/installation "Docusaurus Installation")
*   [Dotenv](https://www.npmjs.com/package/dotenv "Dotenv")
*   [Remark-rehype](https://github.com/remarkjs/remark-rehype "Remark-rehype")
*   [Remark-stringify](https://www.npmjs.com/package/remark-stringify "Remark-stringify")

## Getting Support and Contributing
> Coming soon.