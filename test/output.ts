import assert from 'assert';
import { Level, levels } from 'log4js';
import { spy, SinonSpy } from 'sinon';
import { getLogger } from '../logger';

describe('output', () => {
	let spyStdoutWrite: SinonSpy;
	let spyStderrWrite: SinonSpy;
	before(() => {
		spyStdoutWrite = spy(process.stdout, 'write');
		spyStderrWrite = spy(process.stderr, 'write');
	});
	beforeEach(() => {
		spyStdoutWrite.resetHistory();
		spyStderrWrite.resetHistory();
	});
	after(() => {
		spyStdoutWrite.restore();
		spyStderrWrite.restore();
	});

	it('default', () => {
		const logger = getLogger();

		logger.info('walk8243');
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'walk8243');
		logger.info('first\nsecond');
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'first\nsecond');
		logger.info(true);
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'true');
		logger.info(46);
		checkBasicOutFormat(levels.INFO, 'MidSummer', '46');
		logger.info({ key: 'value' });
		checkBasicOutFormat(levels.INFO, 'MidSummer', '{ key: \'value\' }');
		logger.info([ 'aaa', 'bbb', 'ccc' ]);
		checkBasicOutFormat(levels.INFO, 'MidSummer', '\\[ \'aaa\', \'bbb\', \'ccc\' \\]');
		logger.info(undefined);
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'undefined');
		logger.info(null);
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'null');

		logger.info(Symbol('walk8243'));
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'Symbol\\(walk8243\\)');
		logger.info(function() { return 'walk8243'; });
		checkBasicOutFormat(levels.INFO, 'MidSummer', '\\[Function \\(anonymous\\)\\]');
		logger.info(new Error('walk8243'));
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'Error: walk8243(\n\\s+at .+)+');

		logger.info('walk8243', true, 46, { key: 'value' });
		checkBasicOutFormat(levels.INFO, 'MidSummer', 'walk8243 true 46 { key: \'value\' }');

		logger.error('walk8243');
		checkBasicErrFormat(levels.ERROR, 'MidSummer', 'walk8243');

		assert.strictEqual(spyStdoutWrite.callCount, 12);
		assert.strictEqual(spyStderrWrite.callCount, 1);
	});

	it('debug', () => {
		const logger = getLogger('debug');

		logger.info('walk8243');
		checkColorOutFormat(levels.INFO, 'debug', 'walk8243');
		logger.info('first\nsecond');
		checkColorOutFormat(levels.INFO, 'debug', 'first\nsecond');
		logger.info(true);
		checkColorOutFormat(levels.INFO, 'debug', 'true');
		logger.info(46);
		checkColorOutFormat(levels.INFO, 'debug', '46');
		logger.info({ key: 'value' });
		checkColorOutFormat(levels.INFO, 'debug', '{ key: \'value\' }');
		logger.info([ 'aaa', 'bbb', 'ccc' ]);
		checkColorOutFormat(levels.INFO, 'debug', '\\[ \'aaa\', \'bbb\', \'ccc\' \\]');
		logger.info(undefined);
		checkColorOutFormat(levels.INFO, 'debug', 'undefined');
		logger.info(null);
		checkColorOutFormat(levels.INFO, 'debug', 'null');

		logger.info(Symbol('walk8243'));
		checkColorOutFormat(levels.INFO, 'debug', 'Symbol\\(walk8243\\)');
		logger.info(function() { return 'walk8243'; });
		checkColorOutFormat(levels.INFO, 'debug', '\\[Function \\(anonymous\\)\\]');
		logger.info(new Error('walk8243'));
		checkColorOutFormat(levels.INFO, 'debug', 'Error: walk8243(\n\\s+at .+)+');

		logger.info('walk8243', true, 46, { key: 'value' });
		checkColorOutFormat(levels.INFO, 'debug', 'walk8243 true 46 { key: \'value\' }');

		logger.error('walk8243');
		checkColorErrFormat(levels.ERROR, 'debug', 'walk8243');

		assert.strictEqual(spyStdoutWrite.callCount, 12);
		assert.strictEqual(spyStderrWrite.callCount, 1);
	});

	function checkBasicOutFormat(level: Level, tag: string, msg: string) {
		const target = spyStdoutWrite.lastCall.args[0];
		checkBasicLogFormat(level, tag, msg, target);
	}
	function checkBasicErrFormat(level: Level, tag: string, msg: string) {
		const target = spyStderrWrite.lastCall.args[0];
		checkBasicLogFormat(level, tag, msg, target);
	}
	function checkBasicLogFormat(level: Level, tag: string, msg: string, target: string) {
		checkLogFormat(
			new RegExp(`^\\[\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}\\] \\[${level.levelStr}\\] ${tag} - ${msg}\\n$`),
			target
		);
	}

	function checkColorOutFormat(level: Level, tag: string, msg: string) {
		const target = spyStdoutWrite.lastCall.args[0];
		checkColorLogFormat(level, tag, msg, target);
	}
	function checkColorErrFormat(level: Level, tag: string, msg: string) {
		const target = spyStderrWrite.lastCall.args[0];
		checkColorLogFormat(level, tag, msg, target);
	}
	function checkColorLogFormat(level: Level, tag: string, msg: string, target: string) {
		let cn = 90;
		if(level.isEqualTo(levels.TRACE)) {
			cn = 34;
		} else if(level.isEqualTo(levels.DEBUG)) {
			cn = 36;
		} else if(level.isEqualTo(levels.INFO)) {
			cn = 32;
		} else if(level.isEqualTo(levels.WARN)) {
			cn = 33;
		} else if(level.isEqualTo(levels.ERROR)) {
			cn = 91;
		} else if(level.isEqualTo(levels.FATAL)) {
			cn = 35;
		}

		checkLogFormat(
			new RegExp(`^\\x1B\\[${String(cn)}m\\[\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}\\] \\[${level.levelStr}\\] ${tag} - \\x1B\\[39m${msg}\\n$`),
			target
		);
	}

	function checkLogFormat(exp: RegExp, target: string) {
		assert.ok(exp.test(target));
	}
});

