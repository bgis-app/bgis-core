// This script is inspired by the OpenLayer prepare-package.js script

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const buildDir = path.resolve(__dirname, '../build/site');

// update the version number in util.js
const indexPath = path.join(buildDir, 'index.html');
const versionRegEx = /(\{\{VERSION\}\})/g;
const utilSrc = fs
  .readFileSync(indexPath, 'utf-8')
  .replace(versionRegEx, `${pkg.version}`);
fs.writeFileSync(indexPath, utilSrc, 'utf-8');
