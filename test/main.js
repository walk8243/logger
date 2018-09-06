const assert  = require('assert'),
      sinon   = require('sinon');
const main    = require('../main');

describe('Module main', () => {
  it('logger', () => {
    assert.equal(typeof main, 'function');
    assert.ok(main() instanceof require('log4js/lib/logger'));
  });
});
