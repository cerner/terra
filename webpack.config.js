const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const { TerraDevSite } = require('@cerner/terra-dev-site');
const WebpackConfigTerra = require('@cerner/webpack-config-terra');

const html = fs.readFileSync(require.resolve('./tests/terra-dev-site/head.html'), 'utf8');

const coreConfig = () => ({
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
    new TerraDevSite({
      pathPrefix: 'extended',
      contentDirectory: 'dev-site-extended-test',
      primaryNavigationItems: [{
        path: '/home',
        label: 'Home',
        contentExtension: 'home',
        additionalContent: [
          {
            label: 'Home',
            filePath: path.resolve(process.cwd(), 'packages', 'terra-dev-site', 'README.md'),
          },
        ],
      }, {
        path: '/extended',
        label: 'Extended',
        contentExtension: 'extended',
      }, {
        path: '/dev_tools',
        label: 'Developer Tools',
        contentExtension: 'tool',
      }, {
        path: '/single-page-test',
        label: 'Single Page Test',
        contentExtension: 'spt',
      }, {
        path: '/secondary-nav-test',
        label: 'Secondary Nav Test',
        contentExtension: 'snt',
      }, {
        path: '/folder-first',
        label: 'Folder First Test',
        contentExtension: 'ff',
      }, {
        path: '/empty',
        label: 'Empty',
        contentExtension: 'empty',
      }, {
        path: '/components',
        label: 'Components',
        contentExtension: 'doc',
      }, {
        path: '/test',
        label: 'Test',
        contentExtension: 'test',
      }],
      titleConfig: {
        title: 'Terra Dev Site - Extended',
      },
      additionalSearchDirectories: [
        path.resolve(process.cwd(), 'packages', 'terra-application-docs', 'lib', 'additionalSearchDirectory'),
      ],
      headHtml: [
        '<script> console.log("Inline head html script") </script>',
        html,
      ],
      extensionItems: [
        {
          iconPath: 'terra-icon/lib/icon/IconAllergy',
          key: 'terra-application-docs.test-extension',
          text: 'Test Extension',
          modalFilePath: path.resolve(process.cwd(), 'tests', 'terra-dev-site', 'test-extension', 'TestExtension'),
        },
      ],
      excludeChunks: ['terra-application-test/index'],
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
