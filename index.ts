import { getLogger } from './logger';
import { Logger } from 'log4js';

for (const env of [ undefined, 'default', 'debug', 'development', 'production' ]) {
	const logger = getLogger(env);
	const envStr = String(env);
	console.log(`${'='.repeat(Math.ceil((38 - envStr.length) / 2))} ${envStr} ${'='.repeat(Math.floor((38 - envStr.length) / 2))}`);
	showLogs(logger);
	console.log('='.repeat(40));
	console.log();
}

function showLogs(logger: Logger) {
	logger.trace('Entering walk8243 testing');
	logger.debug('Walk8243 is coding.');
	logger.info('Walk8243 commits.');
	logger.warn('Walk8243 looked sleepy.');
	logger.error('Walk8243 is drowsy!');
	logger.fatal('Walk8243 has fallen asleep!');

	logger.info({ str: 'value', num: 46, obj: { key: 'value' } });
	logger.error(new Error('dummy'));
	logger.info('first\nsecond', true, 46, { key: 'value' }, [ 'aaa', 'bbb', 'ccc' ], undefined, null, Symbol('walk8243'), function() { return 'walk8243'; });
}
