const path = require('path');
const { merge } = require('webpack-merge');
const TerraDevSite = require('./packages/terra-dev-site/src/webpack/plugin/TerraDevSite');
const WebpackConfigTerra = require('./packages/webpack-config-terra/lib/webpack.config');

const coreConfig = () => ({
  entry: {
    index: path.join(__dirname, 'index'),
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path'),
    },
    extensions: ['.jst'],
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

module.exports = (env, argv) => {
  const config = mergedConfig(env, argv);
  // Brittle
  config.module.rules[0].oneOf[0].test = /\.(jsx|js|jst)$/;
  return config;
};
