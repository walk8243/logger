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
    assert.ok(logger.isTraceEnabled());
    assert.ok(logger.isDebugEnabled());
    assert.ok(logger.isInfoEnabled());
    assert.ok(logger.isWarnEnabled());
    assert.ok(logger.isErrorEnabled());
    assert.ok(logger.isFatalEnabled());
  });

  it('set category', () => {
    var logger = main('production');
    assert.ok(logger.isTraceEnabled());
    assert.ok(logger.isDebugEnabled());
    assert.ok(logger.isInfoEnabled());
    assert.ok(logger.isWarnEnabled());
    assert.ok(logger.isErrorEnabled());
    assert.ok(logger.isFatalEnabled());
  });

  it('overwrite options', () => {
    var logger = main(undefined, {
      categories: {
        default: { appenders: ['logOut', 'logErr'], level: 'INFO' },
      },
    });
    assert.ok(!logger.isTraceEnabled());
    assert.ok(!logger.isDebugEnabled());
    assert.ok(logger.isInfoEnabled());
    assert.ok(logger.isWarnEnabled());
    assert.ok(logger.isErrorEnabled());
    assert.ok(logger.isFatalEnabled());
  });

  it('set category, overwrite options', () => {
    var logger = main('production', {
      categories: {
        production: { appenders: ['logOut', 'logErr'], level: 'INFO' },
      },
    });
    assert.ok(!logger.isTraceEnabled());
    assert.ok(!logger.isDebugEnabled());
    assert.ok(logger.isInfoEnabled());
    assert.ok(logger.isWarnEnabled());
    assert.ok(logger.isErrorEnabled());
    assert.ok(logger.isFatalEnabled());
  });
});

function showLogs(logger) {
  logger.trace('Entering cheese testing');
  logger.debug('Got cheese.');
  logger.info('Cheese is Comté.');
  logger.warn('Cheese is quite smelly.');
  logger.error('Cheese is too ripe!');
  logger.fatal('Cheese was breeding ground for listeria.');
}
