const log4js = require('log4js');

const defaults = {
  appenders: {
    out: { type: 'stdout', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - ' } },
    err: { type: 'stderr', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - ' } },
    logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
    logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
  },
  categories: {
    default: { appenders: ['logOut', 'logErr'], level: 'ALL' },
  },
};

module.exports = logger = () => {
  return log4js.configure(defaults).getLogger();
};
