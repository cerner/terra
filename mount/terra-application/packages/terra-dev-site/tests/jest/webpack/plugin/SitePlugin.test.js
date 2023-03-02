// eslint-disable-next-line no-unused-vars
jest.mock('webpack', () => ({ DefinePlugin: jest.fn(() => ({ apply: _compiler => ({}) })) }));
jest.mock('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const SitePlugin = require('../../../../src/webpack/plugin/SitePlugin');

const processPath = process.cwd();

describe('SitePlugin', () => {
  it('sets up site plugin with Prefix', () => {
    const config = {
      pathPrefix: 'pathPrefix',
      titleConfig: { title: 'title' },
      sourceFolder: 'src',
      distributionFolder: 'lib',
      defaultDirection: 'rtl',
      faviconFilePath: 'favicon',
      headHtml: [],
      excludeChunks: [],
      contentConfig: 'content',
    };
    const siteConfig = {
      config,
      entry: 'entry',
    };
    const plug = new SitePlugin(siteConfig);
    expect(plug.entry).toEqual(siteConfig.entry);
    expect(plug.siteConfig).toEqual(config);
    expect(plug.entryKey).toEqual('pathPrefix/index');
    expect(plug.resourceQuery).toEqual('?terra-entry-pathPrefix');
    expect(plug.htmlFileName).toEqual('pathPrefix/index.html');
    expect(plug.url).toEqual('/pathPrefix/');

    const compiler = {
      options: {
        output: {},
        module: {
          rules: [],
        },
        resolve: {},
        resolveLoader: {},
        devServer: {},
        entry: {},
      },
      hooks: {
        afterPlugins: {
          tap: jest.fn(),
        },
        done: {
          tap: jest.fn(),
        },
      },
    };

    plug.apply(compiler);
    expect(compiler.options.output.publicPath).toEqual('/');

    expect(compiler.options.entry).toEqual({
      'pathPrefix/index': '@cerner/terra-dev-site/lib/webpack/templates/entry.template?terra-entry-pathPrefix',
      redirect: '@cerner/terra-dev-site/lib/browser-router-redirect/redirect',
      rewriteHistory: '@cerner/terra-dev-site/lib/browser-router-redirect/rewriteHistory',
    });

    expect(compiler.options.module.rules).toMatchSnapshot();

    expect(compiler.options.resolve.plugins[0].extensions).toEqual(['.js']);

    expect(compiler.options.resolve.plugins[0].shouldSwitch).toBeTruthy();

    expect(compiler.options.resolve.plugins[0].dirs).toContainEqual({
      distribution: path.join(processPath, 'packages', 'terra-dev-site', 'lib'),
      source: path.join(processPath, 'packages', 'terra-dev-site', 'src'),
    });

    expect(compiler.options.resolve.plugins[1].alias).toContainEqual({
      alias: path.join(processPath, 'packages', 'terra-dev-site'),
      name: '@cerner/terra-dev-site',
      onlyModule: false,
    });

    expect(compiler.options.resolveLoader.modules).toEqual([
      path.resolve(__dirname, '..', '..', '..', '..', 'src', 'webpack', 'loaders'),
      'node_modules',
    ]);

    expect(compiler.options.devServer).toEqual({
      historyApiFallback: true,
    });

    expect(HtmlWebpackPlugin).toHaveBeenNthCalledWith(1, {
      filename: '404.html',
      template: path.join(__dirname, '..', '..', '..', '..', 'src', 'webpack', 'templates', '404.html'),
      inject: 'head',
      chunks: ['redirect'],
    });
    expect(HtmlWebpackPlugin).toHaveBeenNthCalledWith(2, {
      title: 'title',
      filename: 'pathPrefix/index.html',
      template: path.join(__dirname, '..', '..', '..', '..', 'src', 'webpack', 'templates', 'index.html'),
      favicon: 'favicon',
      headHtml: [''],
      publicPath: '/',
      excludeChunks: ['rewriteHistory', 'redirect'],
    });
    expect(webpack.DefinePlugin).toHaveBeenCalledWith({
      TERRA_DEV_SITE_BASENAME: JSON.stringify(''),
    });
  });

  it('sets up site plugin without Prefix', () => {
    HtmlWebpackPlugin.mockReset();
    const config = {
      titleConfig: { title: 'title' },
      sourceFolder: 'src',
      distributionFolder: 'lib',
      defaultDirection: 'rtl',
      faviconFilePath: 'favicon',
      headHtml: [],
      excludeChunks: ['chunk'],
      contentConfig: 'content',
    };
    const siteConfig = {
      config,
      entry: 'entry',
    };
    const plug = new SitePlugin(siteConfig);
    expect(plug.siteConfig).toEqual(config);
    expect(plug.entry).toEqual(siteConfig.entry);
    expect(plug.entryKey).toEqual('index');
    expect(plug.resourceQuery).toEqual('?terra-entry');
    expect(plug.htmlFileName).toEqual('index.html');
    expect(plug.url).toEqual('/');

    const compiler = {
      options: {
        output: {},
        module: {
          rules: [
            {
              oneOf: [],
            },
          ],
        },
        resolve: {},
        resolveLoader: {},
        devServer: {},
        entry: {},
      },
      hooks: {
        afterPlugins: {
          tap: jest.fn(),
        },
        done: {
          tap: jest.fn(),
        },
      },
    };

    plug.apply(compiler);
    expect(compiler.options.output.publicPath).toEqual('/');

    expect(compiler.options.entry).toEqual({
      index: '@cerner/terra-dev-site/lib/webpack/templates/entry.template?terra-entry',
    });

    expect(HtmlWebpackPlugin).toHaveBeenNthCalledWith(1, {
      title: 'title',
      filename: 'index.html',
      template: path.join(__dirname, '..', '..', '..', '..', 'src', 'webpack', 'templates', 'index.html'),
      favicon: 'favicon',
      headHtml: [''],
      publicPath: '/',
      excludeChunks: ['rewriteHistory', 'redirect', 'pathPrefix/index', 'chunk'],
    });
    // This is not called because one time setup has already been executed.
    expect(webpack.DefinePlugin).not.toHaveBeenCalled();
  });
});
