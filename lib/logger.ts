import log4js from 'log4js';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    _longOut: { type: 'stdout', layout: { type: 'basic' } },
    _longErr: { type: 'stderr', layout: { type: 'basic' } },
    _shortOut: { type: 'stdout', layout: { type: 'pattern', pattern: '[%p] %m' } },
    _shortErr: { type: 'stderr', layout: { type: 'pattern', pattern: '[%p] %m' } },
    longOut: { type: 'logLevelFilter', appender: '_longOut', level: 'TRACE', maxLevel: 'INFO' },
    longErr: { type: 'logLevelFilter', appender: '_longErr', level: 'WARN' },
    shortOut: { type: 'logLevelFilter', appender: '_shortOut', level: 'TRACE', maxLevel: 'INFO' },
    shortErr: { type: 'logLevelFilter', appender: '_shortErr', level: 'WARN' },
  },
  categories: {
    default: { appenders: ['longOut', 'longErr'], level: 'ALL' },
    debug: { appenders: ['console'], level: 'ALL' },
    development: { appenders: ['shortOut', 'shortErr'], level: 'DEBUG' },
    production: { appenders: ['shortOut', 'shortErr'], level: 'INFO' },
    console: { appenders: ['console'], level: 'ALL' },
  },
});

export function getLogger(category: string = 'MidSummer') {
  return log4js.getLogger(category);
}

export const logger = getLogger();
