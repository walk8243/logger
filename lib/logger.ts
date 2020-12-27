import log4js from 'log4js';
import rfdc from 'rfdc';
import func from './func';

const clone = rfdc({ proto: true });

const defaults = {
  appenders: {
    out: { type: 'stdout' },
    err: { type: 'stderr' },
    logOut: { type: 'logLevelFilter', appender: 'out', level: 'TRACE', maxLevel: 'INFO' },
    logErr: { type: 'logLevelFilter', appender: 'err', level: 'WARN' },
  },
  categories: {
    default: { appenders: ['logOut', 'logErr'], level: 'ALL' },
    development: { appenders: ['logOut', 'logErr'], level: 'DEBUG' },
    production: { appenders: ['logOut', 'logErr'], level: 'INFO' },
  },
};

export function getLogger(category = 'MidSummer', options = {}) {
  return log4js
          .configure(func.assignSecondLevel(clone(defaults), options))
          .getLogger(category.toString());
}

export function def(category?: string) {
  return color(category);
}

export function none(category = 'MidSummer') {
  return log4js
          .configure(defaults)
          .getLogger(category.toString());
}

export function color(category = 'MidSummer', options = {}) {
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

export function nocolor(category = 'MidSummer', options = {}) {
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
