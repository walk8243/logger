import { getLogger } from './lib/logger';
import { Logger } from 'log4js';

for (const env of [ undefined, 'default', 'debug', 'development', 'production' ]) {
  const logger = getLogger(env);
  console.log(`============= ${env} =============`);
  showLogs(logger);
  console.log('==========================');
  console.log();
}

function showLogs(logger: Logger) {
  logger.trace('Entering walk8243 testing');
  logger.debug('Walk8243 is coding.');
  logger.info('Walk8243 commits.');
  logger.warn('Walk8243 looked sleepy.');
  logger.error('Walk8243 is drowsy!');
  logger.fatal('Walk8243 has fallen asleep!');
}
