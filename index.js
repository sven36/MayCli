#!/usr/bin/env node

'use strict';
//spawn跨平台的一个包
const spawn = require('cross-spawn');
const args = process.argv.slice(2);
var i = args.findIndex(
    x => x === 'build' || x === 'update' || x === 'start' || x === 'test' || x === 'mock'
);
const command = i === -1 ? args[0] : args[i];
const nodeArgs = i > 0 ? args.slice(0, i) : [];

switch (command) {
    case 'build':
    case 'update':
    case 'start':
    case 'mock':
    case 'test': {
      const result = spawn.sync(
        'node',
        nodeArgs
          .concat(require.resolve('./scripts/' + command))
          .concat(args.slice(i + 1)),
        { stdio: 'inherit' }
      );
      if (result.signal) {
        if (result.signal === 'SIGKILL') {
          console.log(
            'The build failed because the process exited too early. ' +
              'This probably means the system ran out of memory or someone called ' +
              '`kill -9` on the process.'
          );
        } else if (result.signal === 'SIGTERM') {
          console.log(
            'The build failed because the process exited too early. ' +
              'Someone might have called `kill` or `killall`, or the system could ' +
              'be shutting down.'
          );
        }
        process.exit(1);
      }
      process.exit(result.status);
      break;
    }
    default:
      console.log('Unknown command "' + command + '".');
      console.log('Perhaps you need to update xin-react-scripts?');
      break;
  }
