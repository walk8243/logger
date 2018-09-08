const assert  = require('assert'),
      log4js  = require('log4js'),
      clone   = require('rfdc')({ proto: true }),
      sinon   = require('sinon');
const walk8243Logger  = require('../lib/logger');

describe.only('Library logger', () => {
  it('内容確認', () => {
    assert.deepEqual(Object.keys(walk8243Logger), ['getLogger', 'def', 'none', 'color', 'nocolor']);
    assert.equal(typeof walk8243Logger.getLogger, 'function');
    assert.equal(typeof walk8243Logger.def, 'function');
    assert.equal(typeof walk8243Logger.none, 'function');
    assert.equal(typeof walk8243Logger.color, 'function');
    assert.equal(typeof walk8243Logger.nocolor, 'function');
  });

  describe('Logger option', () => {
    var spyLog4jsConfigure;
    const loggerDefaultOption = {
            appenders: {
              out: { type: 'stdout' },
              err: { type: 'stderr' },
              logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
              logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
            },
            categories: {
              default: { appenders: ['logOut', 'logErr'], level: 'ALL' },
              production: { appenders: ['logOut', 'logErr'], level: 'INFO' },
            },
          };
    before(() => {
      spyLog4jsConfigure = sinon.spy(log4js, 'configure');
    });
    after(() => {
      spyLog4jsConfigure.restore();
    });
    afterEach(() => {
      spyLog4jsConfigure.resetHistory();
    });

    describe('getLogger', () => {
      it('no args', () => {
        var logger = walk8243Logger.getLogger();
        assert.equal(logger.category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is default', () => {
        var logger = walk8243Logger.getLogger('default');
        assert.equal(logger.category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is production', () => {
        var logger = walk8243Logger.getLogger('production');
        assert.equal(logger.category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is other string', () => {
        var logger = walk8243Logger.getLogger('other');
        assert.equal(logger.category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is number', () => {
        var logger = walk8243Logger.getLogger(123);
        assert.equal(logger.category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        var logger = walk8243Logger.getLogger(() => true);
        assert.equal(logger.category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { default: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = clone(loggerDefaultOption);
        for(let key of ['appenders', 'categories']) {
          Object.assign(expectLoggerOptions[key], options[key]);
        }
        var logger = walk8243Logger.getLogger(undefined, options);
        assert.equal(logger.category, 'MidSummer');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
      it('category is cheese, option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { cheese: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = clone(loggerDefaultOption);
        for(let key of ['appenders', 'categories']) {
          Object.assign(expectLoggerOptions[key], options[key]);
        }
        var logger = walk8243Logger.getLogger('cheese', options);
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
    });

    describe('def', () => {
      it('no args', () => {
        var logger = walk8243Logger.def();
        assert.equal(logger.category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        var logger = walk8243Logger.def('default');
        assert.equal(logger.category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        var logger = walk8243Logger.def('production');
        assert.equal(logger.category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        var logger = walk8243Logger.def('other');
        assert.equal(logger.category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        var logger = walk8243Logger.def(123);
        assert.equal(logger.category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        var logger = walk8243Logger.def(() => true);
        assert.equal(logger.category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { default: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = {
              appenders: {
                out: { type: 'stdout', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                err: { type: 'stderr', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
                logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' }
              },
              categories: {
                default: { appenders: [ 'logOut', 'logErr' ], level: 'ALL' },
                production: { appenders: [ 'logOut', 'logErr' ], level: 'INFO' }
              }
            };
        var logger = walk8243Logger.def(undefined, options);
        assert.equal(logger.category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
      it('category is cheese, option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { cheese: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = {
              appenders: {
                out: { type: 'stdout', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                err: { type: 'stderr', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
                logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' }
              },
              categories: {
                default: { appenders: [ 'logOut', 'logErr' ], level: 'ALL' },
                production: { appenders: [ 'logOut', 'logErr' ], level: 'INFO' }
              }
            };
        var logger = walk8243Logger.def('cheese', options);
        assert.equal(logger.category, 'cheese');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
    });

    describe('none', () => {
      it('no args', () => {
        var logger = walk8243Logger.none();
        assert.equal(logger.category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        var logger = walk8243Logger.none('default');
        assert.equal(logger.category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        var logger = walk8243Logger.none('production');
        assert.equal(logger.category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        var logger = walk8243Logger.none('other');
        assert.equal(logger.category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        var logger = walk8243Logger.none(123);
        assert.equal(logger.category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        var logger = walk8243Logger.none(() => true);
        assert.equal(logger.category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { default: { appenders: ['cheese'], level: 'error' } },
            };
        var logger = walk8243Logger.none(undefined, options);
        assert.equal(logger.category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], loggerDefaultOption);
      });
      it('category is cheese, option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { cheese: { appenders: ['cheese'], level: 'error' } },
            };
        var logger = walk8243Logger.none('cheese', options);
        assert.equal(logger.category, 'cheese');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], loggerDefaultOption);
      });
    });

    describe('color', () => {
      it('no args', () => {
        var logger = walk8243Logger.color();
        assert.equal(logger.category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        var logger = walk8243Logger.color('default');
        assert.equal(logger.category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        var logger = walk8243Logger.color('production');
        assert.equal(logger.category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        var logger = walk8243Logger.color('other');
        assert.equal(logger.category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        var logger = walk8243Logger.color(123);
        assert.equal(logger.category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        var logger = walk8243Logger.color(() => true);
        assert.equal(logger.category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { default: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = {
              appenders: {
                out: { type: 'stdout', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                err: { type: 'stderr', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
                logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
                cheese: { type: 'file', filename: 'cheese.log' }
              },
              categories: {
                default: { appenders: ['cheese'], level: 'error' },
                production: { appenders: [ 'logOut', 'logErr' ], level: 'INFO' }
              }
            };
        var logger = walk8243Logger.color(undefined, options);
        assert.equal(logger.category, 'MidSummer');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
      it('category is cheese, option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { cheese: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = {
              appenders: {
                out: { type: 'stdout', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                err: { type: 'stderr', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
                logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
                logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
                cheese: { type: 'file', filename: 'cheese.log' }
              },
              categories: {
                default: { appenders: [ 'logOut', 'logErr' ], level: 'ALL' },
                production: { appenders: [ 'logOut', 'logErr' ], level: 'INFO' },
                cheese: { appenders: ['cheese'], level: 'error' }
              }
            };
        var logger = walk8243Logger.color('cheese', options);
        assert.equal(logger.category, 'cheese');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
    });

    describe('nocolor', () => {
      it('no args', () => {
        var logger = walk8243Logger.nocolor();
        assert.equal(logger.category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        var logger = walk8243Logger.nocolor('default');
        assert.equal(logger.category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        var logger = walk8243Logger.nocolor('production');
        assert.equal(logger.category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        var logger = walk8243Logger.nocolor('other');
        assert.equal(logger.category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        var logger = walk8243Logger.nocolor(123);
        assert.equal(logger.category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        var logger = walk8243Logger.nocolor(() => true);
        assert.equal(logger.category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { default: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = {
              appenders: {
                out: { type: 'stdout', layout: { type: 'pattern', pattern: '[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p] - %m' } },
                err: { type: 'stderr', layout: { type: 'pattern', pattern: '[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p] - %m' } },
                logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
                logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
                cheese: { type: 'file', filename: 'cheese.log' }
              },
              categories: {
                default: { appenders: ['cheese'], level: 'error' },
                production: { appenders: [ 'logOut', 'logErr' ], level: 'INFO' }
              }
            };
        var logger = walk8243Logger.nocolor(undefined, options);
        assert.equal(logger.category, 'MidSummer');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
      it('category is cheese, option set', () => {
        var options = {
              appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
              categories: { cheese: { appenders: ['cheese'], level: 'error' } },
            },
            expectLoggerOptions = {
              appenders: {
                out: { type: 'stdout', layout: { type: 'pattern', pattern: '[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p] - %m' } },
                err: { type: 'stderr', layout: { type: 'pattern', pattern: '[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p] - %m' } },
                logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
                logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
                cheese: { type: 'file', filename: 'cheese.log' }
              },
              categories: {
                default: { appenders: [ 'logOut', 'logErr' ], level: 'ALL' },
                production: { appenders: [ 'logOut', 'logErr' ], level: 'INFO' },
                cheese: { appenders: ['cheese'], level: 'error' }
              }
            };
        var logger = walk8243Logger.nocolor('cheese', options);
        assert.equal(logger.category, 'cheese');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
        assert.deepEqual(spyLog4jsConfigure.getCall(0).args[0], expectLoggerOptions);
      });
    });
  });
});
