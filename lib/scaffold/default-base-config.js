'use strict';

var path = require('path');

/**
 * Will return the path and default orenode-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to Galactrum database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }

  var datadir = options.datadir || path.resolve(process.env.HOME, '.galactrum');

  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['galactrumd', 'web'],
      servicesConfig: {
        galactrumd: {
          spawn: {
            datadir: datadir,
            exec: path.resolve(__dirname, datadir, 'galactrumd')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
