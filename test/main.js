const assert  = require('assert'),
      sinon   = require('sinon');
const main    = require('../main');

describe('Module main', () => {
  it('logger', () => {
    assert.equal(typeof main, 'function');
    assert.ok(main() instanceof require('log4js/lib/logger'));
  });

  it('log check', () => {
    var logger = main();
    logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Comté.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');
  });
});
