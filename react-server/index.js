// import app from './server';
// import http from 'http';
const http = require('http');
const app = require('./server').default;
var server = http.createServer(app.callback());

let currentApp = app;

server.listen(process.env.PORT || 3003, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    const newApp = require('./server').default;
    server.close();
    server = http.createServer(newApp.callback());
    server.listen(process.env.PORT || 3003);
  });
}

