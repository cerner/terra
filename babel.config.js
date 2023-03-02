module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');

  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'entry', corejs: { version: 3.6, proposals: true } }],
      '@babel/preset-react',
    ],

    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-async-generators',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-transform-runtime',
    ],

    ignore: ['./terra-polyfill/src/index.js'],
  };
};
