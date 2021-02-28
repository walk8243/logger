import log4js from 'log4js';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    stdout: { type: 'stdout', layout: { type: 'basic' } },
    stderr: { type: 'stderr', layout: { type: 'basic' } },
    logOut: { type: 'logLevelFilter', appender: 'stdout', level: 'TRACE', maxLevel: 'INFO' },
    logErr: { type: 'logLevelFilter', appender: 'stderr', level: 'WARN' },
  },
  categories: {
    default: { appenders: ['logOut', 'logErr'], level: 'ALL' },
    debug: { appenders: ['console'], level: 'ALL' },
    development: { appenders: ['logOut', 'logErr'], level: 'DEBUG' },
    production: { appenders: ['logOut', 'logErr'], level: 'INFO' },
    console: { appenders: ['console'], level: 'ALL' },
  },
});

export function getLogger(category: string = 'MidSummer') {
  return log4js.getLogger(category);
}

export const logger = getLogger();
