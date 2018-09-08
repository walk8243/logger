const log4js  = require('log4js'),
      clone   = require('rfdc')({ proto: true });
const func  = require('./func');

const defaults = {
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

module.exports = logger = {
  getLogger,
  def,
  none,
  color,
  nocolor,
};

function getLogger(category = 'MidSummer', options = {}) {
  return log4js
          .configure(func.assignSecondLevel(clone(defaults), options))
          .getLogger(category.toString());
}

function def(category = 'MidSummer') {
  return logger.color(category);
}

function none(category = 'MidSummer') {
  return log4js
          .configure(defaults)
          .getLogger(category.toString());

}

function color(category = 'MidSummer', options = {}) {
  var config = func.assignSecondLevel(clone(defaults), {
        appenders: {
          out: { type: 'stdout', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
          err: { type: 'stderr', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p]%] - %m' } },
        },
      });
  return log4js
          .configure(func.assignSecondLevel(config, options))
          .getLogger(category.toString());
}

function nocolor(category = 'MidSummer', options = {}) {
  var config = func.assignSecondLevel(clone(defaults), {
        appenders: {
          out: { type: 'stdout', layout: { type: 'pattern', pattern: '[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p] - %m' } },
          err: { type: 'stderr', layout: { type: 'pattern', pattern: '[%d{yyyy/MM/dd hh:mm:ss.SSS}] [%p] - %m' } },
        },
      });
  return log4js
          .configure(func.assignSecondLevel(config, options))
          .getLogger(category.toString());
}
