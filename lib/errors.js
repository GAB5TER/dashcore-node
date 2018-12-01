'use strict';

var createError = require('errno').create;

var OrecoreNodeError = createError('OrecoreNodeError');

var RPCError = createError('RPCError', OrecoreNodeError);

module.exports = {
  Error: OrecoreNodeError,
  RPCError: RPCError
};
