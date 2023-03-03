const jestConfig = require('./packages/jest-config-terra');

module.exports = {
  ...jestConfig,
  coveragePathIgnorePatterns: [
    ...jestConfig.coveragePathIgnorePatterns,
    './terra-polyfill/src/index.js',
  ],
  globalSetup: './jest.globalSetup.js',
  moduleDirectories: [
    'aggregated-translations',
    'node_modules',
  ],
  modulePathIgnorePatterns: [
    'packages/terra-cli/tests/jest/fixtures',
    'packages/duplicate-package-checker-webpack-plugin/tests/jest',
  ],
  setupFiles: [
    './jest.enzymeSetup.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  transform: {
    '^.+\\.(js|jsx)$': './packages/jest-config-terra/lib/jestBabelTransform',
  },
  testEnvironment: './packages/jest-config-terra/lib/JestEnvironmentJsdomTerra.js',
  watchPathIgnorePatterns: [
    './tests/jest/reports/results/terra-functional-testing.json',
  ],
};
