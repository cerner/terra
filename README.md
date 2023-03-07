<!-- Logo -->
<p align="center">
  <img height="128" width="128" src="https://github.com/cerner/terra-toolkit/raw/main/terra.png" />
</p>

<!-- Name -->
<h1 align="center">
  Terra
</h1>

[![Cerner OSS](https://badgen.net/badge/Cerner/OSS/blue)](http://engineering.cerner.com/2014/01/cerner-and-open-source/)
[![Build Status](https://github.com/cerner/terra/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/cerner/terra/actions/workflows/ci-cd.yml)


Terra is the core UI component library, unifying UX concepts and development across Cerner.

- [Notice](#notice)
- [Versioning](#versioning)
- [History](##history)
- [Package List](#package-list)
    - [Deprecated](#deprecated)
- [Supported Browsers](#supported-browsers)
- [Internationalization (I18n)](#internationalization-i18n)
- [Packages Requiring I18n](#packages-requiring-i18n)
- [Contributing](#contributing)
- [Local Development](#local-development)

## Notice

The other terra repos will eventually be archived and moved to this repo.

## Versioning

Terra packages will follow [SemVer](http://semver.org/) for versioning.

1. MAJOR versions represent breaking changes
2. MINOR versions represent added functionality in a backwards-compatible manner
3. PATCH versions represent backwards-compatible bug fixes

Consult the component CHANGELOGs, related issues, and PRs for more information.

## History

Terra was originally an open source project. The repos hosting the open source versions are as follows:

| Repo                                                                        | Description                                                                        |
|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [@terra-application](https://github.com/cerner/terra-application)           | mono-repo for a framework to support application development with terra components |
| [@terra-core](https://github.com/cerner/terra-core)                         | mono-repo for core terra components                                                |
| [@terra-clinical](https://github.com/cerner/terra-clinical)                 | mono-repo for terra react components used only in a clinical setting               |
| [@terra-framework](https://github.com/cerner/terra-framework)               | mono-repo for composed and higher order terra react components                     |
| [@terra-graphs](https://github.com/cerner/terra-graphs)                     | mono-repo for carbon-graphs                                                        |
| [@carbon-graphs](https://github.com/cerner/carbon-graphs)                   | original repo for carbon graphs. It was archived and moved to terra-graphs         |
| [@terra-toolkit ](https://github.com/cerner/terra-toolkit)                  | mono-repo for utility modules for use when developing using terra components       |
| [@terra-toolkit-boneyard](https://github.com/cerner/terra-toolkit-boneyard) | archived repo that hosts code for terra-toolkit's npm dependencies.                |
| [@terra-ui](https://github.com/cerner/terra-ui)                             | the combined doc site for terra-core, terra-framework, and terra-clinical          |

## Package List

| Packages                                                                                         |
|--------------------------------------------------------------------------------------------------|
| [browserslist-config-terra](./browserslist-config-terra/README.md)                               |
| [duplicate-package-checker-webpack-plugin](./duplicate-package-checker-webpack-plugin/README.md) |
| [eslint-config-terra](./eslint-config-terra/README.md)                                           |
| [jest-config-terra](./jest-config-terra/README.md)                                               |
| [package-json-lint](./package-json-lint/README.md)                                               |
| [package-json-lint-config-terra](./package-json-lint-config-terra/README.md)                     |
| [stylelint-config-terra](./stylelint-config-terra/README.md)                                     |
| [terra-aggregate-translations](./packages/terra-aggregate-translations/README.md)                |
| [terra-aggregator](./packages/terra-aggregator/README.md)                                        |
| [terra-alert](./packages/terra-alert/README.md)                                                  |
| [terra-application](./packages/terra-application/README.md)                                      |
| [terra-application-docs](./packages/terra-application-docs/README.md)                            |
| [terra-cli](./packages/terra-cli/README.md)                                                      |
| [terra-dev-site](./packages/terra-dev-site/README.md)                                            |
| [terra-enzyme-intl](./packages/terra-enzyme-intl/README.md)                                      |
| [terra-functional-testing](./packages/terra-functional-testing/README.md)                        |
| [terra-open-source-scripts](./packages/terra-open-source-scripts/README.md)                      |
| [terra-polyfill](./packages/terra-polyfill/README.md)                                            |
| [terra-toolkit-docs](./packages/terra-toolkit-docs/README.md)                                    |
| [webpack-config-terra](./webpack-config-terra/README.md)                                         |

<!-- AUTO-GENERATED-CONTENT:END *-->

<h3 id="deprecated">
  Deprecated
</h3>

| Terra Package      |
|--------------------|
| terra-form         |
| terra-i18n-plugin  |
| terra-legacy-theme |
| terra-modal        |

<h2 id="supported-browsers">
  Supported Browsers
</h2>

| Browser                     | Version |
|-----------------------------|---------|
| Chrome & Chrome for Android | Current |
| Edge                        | Current |
| Firefox                     | Current |
| Internet Explorer           | 10 & 11 |
| Safari & Mobile Safari      | Current |

<h2 id="internationalization-i18n">
  Internationalization (I18n)
</h2>

Please
review [Terra\'s Internationalization documentation](https://engineering.cerner.com/terra-ui/guides/terra-ui/internationalization/internationalization-intro)
for more information. Included are directions on consumption and how internationalization is setup.

<h3 id="packages-requiring-i18n">
  Packages Requiring I18n
</h3>

- [terra-action-header](./packages/terra-action-header/README.md)
- [terra-alert](./packages/terra-alert/README.md)
- [terra-demographics-banner](./packages/terra-demographics-banner/README.md)
- [terra-dialog](./packages/terra-dialog/README.md)
- [terra-form-checkbox](./packages/terra-form-checkbox/README.md)
- [terra-form-field](./packages/terra-form-field/README.md)
- [terra-form-radio](./packages/terra-form-radio/README.md)
- [terra-form-select](./packages/terra-form-select/README.md)
- [terra-i18n](./packages/terra-i18n/README.md)
- [terra-overlay](./packages/terra-overlay/README.md)
- [terra-search-field](./packages/terra-search-field/README.md)
- [terra-show-hide](./packages/terra-show-hide/README.md)
- [terra-status-view](./packages/terra-status-view/README.md)

## Contributing

Please read through our [contributing guidelines](./CONTRIBUTING.md). Included are directions for issue reporting and
pull
requests.

## Local Development

1. Install [Node Version Manager (NVM) and Node](https://github.com/creationix/nvm#install-script). The root directory
   contains a [`.nvmrc`](.nvmrc) file that specifies terra's node version. Once NVM is installed and you are within the
   root directory, your version of node will change to this version.
2. Install docker https://www.docker.com/ to run browser tests.
3. Install dependencies and run tests.

```sh
npm install
npm run test
```
