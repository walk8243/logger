const log4js  = require('log4js'),
      clone   = require('rfdc')({ proto: true });
const func  = require('./lib/func');

const defaults = {
  appenders: {
    out: { type: 'stdout', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
    err: { type: 'stderr', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
    logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
    logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
  },
  categories: {
    default: { appenders: ['logOut', 'logErr'], level: 'ALL' },
  },
};

module.exports = logger = (category = 'MidSummer', options = {}) => {
  return log4js.configure(func.assignSecondLevel(clone(defaults), options)).getLogger(category);
};
