// This script can be used to format json files.
// To execute the script, run: node prettifyJSON.js <path to folder>

// TODO: Remove the following eslint-disable when linter rules are finalized in UXPLATFORM-8314
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return  */
/* eslint-disable no-restricted-syntax  */
/* eslint-disable no-console  */

const fs = require('fs');
const path = require('path');

if (process.argv.length === 2) {
  console.error('Expected at least one argument!');
  process.exit(1);
}
const targetDir = (process.argv[2] || 'Default');

// get all JSON files

const allPackageJSON = [];

const getAllPackageJSONRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      getAllPackageJSONRecursively(absolute);
    } else if (absolute.includes('package.json') && !absolute.includes('node_modules')) allPackageJSON.push(absolute);
  }
};

getAllPackageJSONRecursively(targetDir);

// Update JSON files

for (const JSONfile of allPackageJSON) {
  const oldJSON = JSON.parse(fs.readFileSync(JSONfile));
  const newJSON = {};

  if (oldJSON.name !== undefined) {
    newJSON.name = oldJSON.name;
    delete oldJSON.name;
  }

  if (oldJSON.version !== undefined) {
    newJSON.version = oldJSON.version;
    delete oldJSON.version;
  }

  if (oldJSON.description !== undefined) {
    newJSON.description = oldJSON.description;
    delete oldJSON.description;
  }

  if (oldJSON.author !== undefined) {
    newJSON.author = oldJSON.author;
    delete oldJSON.author;
  }

  if (oldJSON.main !== undefined) {
    newJSON.main = oldJSON.main;
    delete oldJSON.main;
  }

  if (oldJSON.engines !== undefined) {
    newJSON.engines = oldJSON.engines;
    delete oldJSON.engines;
  }

  if (oldJSON.repository !== undefined) {
    newJSON.repository = oldJSON.repository;
    delete oldJSON.repository;
  }

  if (oldJSON.bugs !== undefined) {
    newJSON.bugs = oldJSON.bugs;
    delete oldJSON.bugs;
  }

  if (oldJSON.homepage !== undefined) {
    newJSON.homepage = oldJSON.homepage;
    delete oldJSON.homepage;
  }

  if (oldJSON.private !== undefined) {
    newJSON.private = oldJSON.private;
    delete oldJSON.private;
  }

  if (oldJSON.publishConfig !== undefined) {
    newJSON.publishConfig = oldJSON.publishConfig;
    delete oldJSON.publishConfig;
  }

  if (oldJSON.license !== undefined) {
    newJSON.license = oldJSON.license;
    delete oldJSON.license;
  }

  if (oldJSON.keywords !== undefined) {
    newJSON.keywords = oldJSON.keywords;
    // alphabetize the list
    newJSON.keywords.sort(Intl.Collator().compare);
    delete oldJSON.keywords;
  }

  if (oldJSON.browserslist !== undefined) {
    newJSON.browserslist = oldJSON.browserslist;
    delete oldJSON.browserslist;
  }

  if (oldJSON.files !== undefined) {
    newJSON.files = oldJSON.files;
    // alphabetize the list
    newJSON.files.sort(Intl.Collator().compare);
    delete oldJSON.files;
  }

  if (oldJSON.bin !== undefined) {
    newJSON.bin = oldJSON.bin;
    delete oldJSON.bin;
  }

  if (oldJSON.eslintConfig !== undefined) {
    newJSON.eslintConfig = oldJSON.eslintConfig;
    delete oldJSON.eslintConfig;
  }

  if (oldJSON['package-json-lint'] !== undefined) {
    newJSON['package-json-lint'] = oldJSON['package-json-lint'];
    delete oldJSON['package-json-lint'];
  }

  if (oldJSON.stylelint !== undefined) {
    newJSON.stylelint = oldJSON.stylelint;
    delete oldJSON.stylelint;
  }

  if (oldJSON.dependencies !== undefined) {
    newJSON.dependencies = oldJSON.dependencies;
    delete oldJSON.dependencies;
  }

  if (oldJSON.devDependencies !== undefined) {
    newJSON.devDependencies = oldJSON.devDependencies;
    delete oldJSON.devDependencies;
  }

  if (oldJSON.peerDependencies !== undefined) {
    newJSON.peerDependencies = oldJSON.peerDependencies;
    delete oldJSON.peerDependencies;
  }

  if (oldJSON.scripts !== undefined) {
    newJSON.scripts = oldJSON.scripts;
    delete oldJSON.scripts;
  }

  // add any remaining tags to here so they can be manually added to the appropriate location
  if (Object.keys(oldJSON).length > 0) {
    newJSON.otherTags = oldJSON;
  }

  fs.writeFileSync(JSONfile, JSON.stringify(newJSON, null, 2));
  fs.appendFileSync(JSONfile, '\n');
}
