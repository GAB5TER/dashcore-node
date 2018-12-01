'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export orecore-lib', function() {
    var orecore = require('../');
    should.exist(orecore.lib);
    should.exist(orecore.lib.Transaction);
    should.exist(orecore.lib.Block);
  });
});
