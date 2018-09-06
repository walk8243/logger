const main  = require('./main');

const logger = main();
showLogs(logger);

function showLogs(logger) {
  logger.trace('Entering walk8243 testing');
  logger.debug('Walk8243 is coding.');
  logger.info('Walk8243 commits.');
  logger.warn('Walk8243 looked sleepy.');
  logger.error('Walk8243 is drowsy!');
  logger.fatal('Walk8243 went to bed.');
}
