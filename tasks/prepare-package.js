// This script is inspired by the OpenLayer prepare-package.js script

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const buildDir = path.resolve(__dirname, '../build/bgis');

// write out simplified package.json
delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.private;
fs.writeFileSync(
  path.join(buildDir, 'package.json'),
  JSON.stringify(pkg, null, 2),
  'utf-8'
);

// remove webpack js artefacts
fs.unlinkSync(path.join(buildDir, 'bgis_client.bundle.js'));
fs.unlinkSync(path.join(buildDir, 'bgis_core.bundle.js'));

// copy in readme and license files
fs.copyFileSync(
  path.resolve(__dirname, '../README.md'),
  path.join(buildDir, 'README.md')
);
fs.copyFileSync(
  path.resolve(__dirname, '../LICENSE.md'),
  path.join(buildDir, 'LICENSE.md')
);
