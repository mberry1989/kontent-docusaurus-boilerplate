# Kentico Kontent Docusaurus Sample

This boilerplate [Docusaurus v2 static site generator](https://v2.docusaurus.io/) project uses the [Kentico Kontent Delivery JavaScript SDK](https://github.com/Kentico/kontent-delivery-sdk-js) to retrieve content.

## Table of Contents
- [Kontent Setup](#kontent-setup)
- [Application Setup](#application-setup)
- [How It Works](#how-it-works)
  - [Resolving Links and Content Items in Rich Text](#resolving-links-and-content-items-in-rich-text)
- [Content Administration](#content-administration)
- [Deploying to Netlify](#deploying-to-netlify)
- [Getting Support](#getting-support-and-contributing)

## Kontent Setup
   
### Importing the Kontent + Docusaurus Template

1.  In [Kentico Kontent](https://app.kontent.ai "Kentico Kontent"), choose _Project settings_ from the app menu.
2.  Under _Production Environment Settings_, choose _API keys_
3.  Enable the Management API
4.  Navigate to the [Kontent Template Manager](https://kentico.github.io/kontent-template-manager/import "Kontent Template Manager")
5.  Drop the [kontent-backup-Docusaurus-Template.zip](https://github.com/kentico-michaelb/kontent-docusaurus-sample/blob/master/my-website/kontent-backup-DocusaurusTemplate.zip "Kontent Docusaurus Template Zip") export onto the Kontent Template Manager
6.  Copy & paste the **Project ID** and the **Management API keys** from your newly created Kontent project into the respective fields in the template manager
7.  Check *Publish language variants after import*
8.  Click *Prepare for import *on the template manager
9.  Click *Import data*

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
If you already have a [Kentico Kontent account](https://app.kontent.ai), you can connect this application to your version of the Sample project.

1. In Kentico Kontent, choose _Project settings_ from the app menu
1. Under _Production Environment Settings_, choose _API keys_
1. Open the `.env` file
1. Use the values from your Kentico Kontent project as the PROJECT_ID value
1. Save the changes
1. Run `npm run kontent` from the terminal
1. Run `npm start` from the terminal

## How It Works
>Coming soon

## Content Administration
1. Navigate to <https://app.kontent.ai> in your browser.
1. Sign in with your credentials.
1. Manage content in the content administration interface of your sample project.

You can learn more about content editing with Kentico Kontent in our [Documentation](https://docs.kontent.ai/).

## Deploying to Netlify
>Coming soon.

## This sample site also uses:
*   [Docusaurus preset-classic](https://v2.docusaurus.io/docs/installation "Docusaurus Installation")
*   [Dotenv](https://www.npmjs.com/package/dotenv "Dotenv")
*   [Remark-rehype](https://github.com/remarkjs/remark-rehype "Remark-rehype")
*   [Remark-stringify](https://www.npmjs.com/package/remark-stringify "Remark-stringify")

## Getting Support and Contributing
> Coming soon.