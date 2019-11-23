import * as assert from 'assert';
import sinon from 'sinon';
import log4js from 'log4js';
import rfdc from 'rfdc';
import * as walk8243Logger from '../../lib/logger';
const clone = rfdc({ proto: true });

describe('Library logger', () => {
  it('内容確認', () => {
    assert.deepEqual(Object.keys(walk8243Logger), ['getLogger', 'def', 'none', 'color', 'nocolor']);
    assert.equal(typeof walk8243Logger.getLogger, 'function');
    assert.equal(typeof walk8243Logger.def, 'function');
    assert.equal(typeof walk8243Logger.none, 'function');
    assert.equal(typeof walk8243Logger.color, 'function');
    assert.equal(typeof walk8243Logger.nocolor, 'function');
  });

  describe('Logger option', () => {
    let spyLog4jsConfigure: sinon.SinonSpy<[log4js.Configuration], log4js.Log4js>;
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
        const logger = walk8243Logger.getLogger();
        assert.equal((logger as any).category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is default', () => {
        const logger = walk8243Logger.getLogger('default');
        assert.equal((logger as any).category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is production', () => {
        const logger = walk8243Logger.getLogger('production');
        assert.equal((logger as any).category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is other string', () => {
        const logger = walk8243Logger.getLogger('other');
        assert.equal((logger as any).category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is number', () => {
        const logger = walk8243Logger.getLogger(123 as any);
        assert.equal((logger as any).category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        const logger = walk8243Logger.getLogger((() => true) as any);
        assert.equal((logger as any).category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { default: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = clone(loggerDefaultOption);
        for(let key of ['appenders', 'categories']) {
          Object.assign(expectLoggerOptions[key], (options as any)[key]);
        }
        const logger = walk8243Logger.getLogger(undefined, options);
        assert.equal((logger as any).category, 'MidSummer');
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
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { cheese: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = clone(loggerDefaultOption);
        for(let key of ['appenders', 'categories']) {
          Object.assign(expectLoggerOptions[key], (options as any)[key]);
        }
        const logger = walk8243Logger.getLogger('cheese', options);
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
        const logger = walk8243Logger.def();
        assert.equal((logger as any).category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        const logger = walk8243Logger.def('default');
        assert.equal((logger as any).category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        const logger = walk8243Logger.def('production');
        assert.equal((logger as any).category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        const logger = walk8243Logger.def('other');
        assert.equal((logger as any).category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        const logger = walk8243Logger.def(123 as any);
        assert.equal((logger as any).category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        const logger = walk8243Logger.def((() => true) as any);
        assert.equal((logger as any).category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { default: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = {
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
        const logger = (walk8243Logger as any).def(undefined, options);
        assert.equal((logger as any).category, 'MidSummer');
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
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { cheese: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = {
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
        const logger = (walk8243Logger as any).def('cheese', options);
        assert.equal((logger as any).category, 'cheese');
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
        const logger = walk8243Logger.none();
        assert.equal((logger as any).category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        const logger = walk8243Logger.none('default');
        assert.equal((logger as any).category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        const logger = walk8243Logger.none('production');
        assert.equal((logger as any).category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        const logger = walk8243Logger.none('other');
        assert.equal((logger as any).category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        const logger = walk8243Logger.none(123 as any);
        assert.equal((logger as any).category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        const logger = walk8243Logger.none((() => true) as any);
        assert.equal((logger as any).category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { default: { appenders: ['cheese'], level: 'error' } },
              };
        const logger = (walk8243Logger as any).none(undefined, options);
        assert.equal((logger as any).category, 'MidSummer');
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
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { cheese: { appenders: ['cheese'], level: 'error' } },
              };
        const logger = (walk8243Logger as any).none('cheese', options);
        assert.equal((logger as any).category, 'cheese');
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
        const logger = walk8243Logger.color();
        assert.equal((logger as any).category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        const logger = walk8243Logger.color('default');
        assert.equal((logger as any).category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        const logger = walk8243Logger.color('production');
        assert.equal((logger as any).category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        const logger = walk8243Logger.color('other');
        assert.equal((logger as any).category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        const logger = walk8243Logger.color(123 as any);
        assert.equal((logger as any).category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        const logger = walk8243Logger.color((() => true) as any);
        assert.equal((logger as any).category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { default: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = {
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
        const logger = walk8243Logger.color(undefined, options);
        assert.equal((logger as any).category, 'MidSummer');
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
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { cheese: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = {
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
        const logger = walk8243Logger.color('cheese', options);
        assert.equal((logger as any).category, 'cheese');
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
        const logger = walk8243Logger.nocolor();
        assert.equal((logger as any).category, 'MidSummer');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is default', () => {
        const logger = walk8243Logger.nocolor('default');
        assert.equal((logger as any).category, 'default');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is production', () => {
        const logger = walk8243Logger.nocolor('production');
        assert.equal((logger as any).category, 'production');
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is other string', () => {
        const logger = walk8243Logger.nocolor('other');
        assert.equal((logger as any).category, 'other');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
      });
      it('category is number', () => {
        const logger = walk8243Logger.nocolor(123 as any);
        assert.equal((logger as any).category, '123');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('category is function', () => {
        const logger = walk8243Logger.nocolor((() => true) as any);
        assert.equal((logger as any).category, '() => true');
        assert.ok(logger.isTraceEnabled());
        assert.ok(logger.isDebugEnabled());
        assert.ok(logger.isInfoEnabled());
        assert.ok(logger.isWarnEnabled());
        assert.ok(logger.isErrorEnabled());
        assert.ok(logger.isFatalEnabled());
        assert.ok(spyLog4jsConfigure.calledOnce);
      });
      it('option set', () => {
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { default: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = {
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
        const logger = walk8243Logger.nocolor(undefined, options);
        assert.equal((logger as any).category, 'MidSummer');
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
        const options = {
                appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
                categories: { cheese: { appenders: ['cheese'], level: 'error' } },
              };
        const expectLoggerOptions = {
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
        const logger = walk8243Logger.nocolor('cheese', options);
        assert.equal((logger as any).category, 'cheese');
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
