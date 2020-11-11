const path = require('path');

module.exports = {
  title: 'Kontent + Docusaurus',
  tagline: 'Build a headless walkthrough in 10 minutes',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/logo.svg',
  organizationName: 'kentico-michaelb', // Usually your GitHub org/user name.
  projectName: 'kontent-docusaurus-sample', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Kontent + Docusaurus',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
    },
  },
  plugins: [path.resolve(__dirname, 'cms-scripts')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
