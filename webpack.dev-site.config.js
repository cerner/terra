const path = require('path');
const { merge } = require('webpack-merge');
const { TerraDevSite } = require('./packages/terra-dev-site/index.js');
const WebpackConfigTerra = require('./packages/webpack-config-terra/lib/webpack.config');

const coreConfig = () => ({
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path'),
    },
  },
  plugins: [
    new TerraDevSite({
      titleConfig: {
        title: 'Terra',
      },
      primaryNavigationItems: [{
        path: '/home',
        label: 'Home',
        contentExtension: 'home',
        additionalContent: [
          {
            label: 'Home',
            filePath: path.resolve(process.cwd(), 'README.md'),
          },
        ],
      },
      // {
      //   path: '/about',
      //   label: 'About',
      //   contentExtension: 'about',
      // },

      {
        path: '/application',
        label: 'Application',
        contentExtension: 'app',
      },
      // {
      //   path: '/components',
      //   label: 'Components',
      //   contentExtension: 'doc',
      // }, {
      //   path: '/graphs',
      //   label: 'Graphs',
      //   contentExtension: 'graph',
      // },
      {
        path: '/dev_tools',
        label: 'Developer Tools',
        contentExtension: 'tool',
      }, {
        path: '/guides',
        label: 'Guides',
        contentExtension: 'guide',
      }, {
        path: '/tests',
        label: 'Tests',
        contentExtension: 'test',
      }],
      //      sideEffectImportFilePaths: [
      //        '../../../../terra-ui-repo/src/initializeXFC.js',
      //        '../../../../terra-ui-repo/src/IllustrationGrid.scss',
      //      ],

    }),
  ],
});

const mergedConfig = (env, argv) => (
  merge(WebpackConfigTerra(env, argv), coreConfig())
);

module.exports = mergedConfig;
