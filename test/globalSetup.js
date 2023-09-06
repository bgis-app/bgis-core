/**
 * Create a local http server to serve an image
 * for use in the global map (@link helpers.ts)
 */

import {globals} from './jest.config';

const http = require('http');
const fs = require('fs');
const path = require('path');

const requestListener = (request, response) => {
  if(request.url === '/static-image') {
    const filePath = path.join(__dirname, 'spec/bgis/data/online_communities.png');
    const stat = fs.statSync(filePath);

    response.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  }
};

module.exports = async () => {
  const server = http.createServer(requestListener);
  server.listen(globals.SERVERPORT);
  global.SERVER = server;
};
