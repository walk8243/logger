import assert from 'assert';
import { Level, levels, Logger } from 'log4js';
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

	describe('default', () => {
		let logger: Logger;
		beforeEach(() => {
			logger = getLogger();
		});

		it('出力内容', () => {
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

		it('trace', () => {
			logger.trace('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('debug', () => {
			logger.debug('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('info', () => {
			logger.info('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('warn', () => {
			logger.warn('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('error', () => {
			logger.error('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('fatal', () => {
			logger.fatal('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
	});

	describe('debug', () => {
		let logger: Logger;
		beforeEach(() => {
			logger = getLogger('debug');
		});

		it('出力内容', () => {
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

		it('trace', () => {
			logger.trace('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('debug', () => {
			logger.debug('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('info', () => {
			logger.info('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('warn', () => {
			logger.warn('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('error', () => {
			logger.error('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('fatal', () => {
			logger.fatal('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
	});

	describe('development', () => {
		let logger: Logger;
		beforeEach(() => {
			logger = getLogger('development');
		});

		it('出力内容', () => {
			logger.info('walk8243');
			checkShortOutFormat(levels.INFO, 'development', 'walk8243');
			logger.info('first\nsecond');
			checkShortOutFormat(levels.INFO, 'development', 'first second');
			logger.info(true);
			checkShortOutFormat(levels.INFO, 'development', 'true');
			logger.info(46);
			checkShortOutFormat(levels.INFO, 'development', '46');
			logger.info({ key: 'value' });
			checkShortOutFormat(levels.INFO, 'development', '{"key":"value"}');
			logger.info([ 'aaa', 'bbb', 'ccc' ]);
			checkShortOutFormat(levels.INFO, 'development', '\\["aaa","bbb","ccc"\\]');
			logger.info(undefined);
			checkShortOutFormat(levels.INFO, 'development', 'undefined');
			logger.info(null);
			checkShortOutFormat(levels.INFO, 'development', 'null');

			logger.info(Symbol('walk8243'));
			checkShortOutFormat(levels.INFO, 'development', 'Symbol\\(walk8243\\)');
			logger.info(function() { return 'walk8243'; });
			checkShortOutFormat(levels.INFO, 'development', 'function \\(\\) { return \'walk8243\'; }');
			logger.info(new Error('walk8243'));
			checkShortOutFormat(levels.INFO, 'development', 'Error: walk8243');

			logger.info('walk8243', true, 46, { key: 'value' });
			checkShortOutFormat(levels.INFO, 'development', 'walk8243 true 46 {"key":"value"}');

			logger.error('walk8243');
			checkShortErrFormat(levels.ERROR, 'development', 'walk8243');

			assert.strictEqual(spyStdoutWrite.callCount, 12);
			assert.strictEqual(spyStderrWrite.callCount, 1);
		});

		it('trace', () => {
			logger.trace('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('debug', () => {
			logger.debug('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('info', () => {
			logger.info('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('warn', () => {
			logger.warn('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('error', () => {
			logger.error('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('fatal', () => {
			logger.fatal('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
	});

	describe('production', () => {
		let logger: Logger;
		beforeEach(() => {
			logger = getLogger('production');
		});

		it('出力内容', () => {
			logger.info('walk8243');
			checkShortOutFormat(levels.INFO, 'production', 'walk8243');
			logger.info('first\nsecond');
			checkShortOutFormat(levels.INFO, 'production', 'first second');
			logger.info(true);
			checkShortOutFormat(levels.INFO, 'production', 'true');
			logger.info(46);
			checkShortOutFormat(levels.INFO, 'production', '46');
			logger.info({ key: 'value' });
			checkShortOutFormat(levels.INFO, 'production', '{"key":"value"}');
			logger.info([ 'aaa', 'bbb', 'ccc' ]);
			checkShortOutFormat(levels.INFO, 'production', '\\["aaa","bbb","ccc"\\]');
			logger.info(undefined);
			checkShortOutFormat(levels.INFO, 'production', 'undefined');
			logger.info(null);
			checkShortOutFormat(levels.INFO, 'production', 'null');

			logger.info(Symbol('walk8243'));
			checkShortOutFormat(levels.INFO, 'production', 'Symbol\\(walk8243\\)');
			logger.info(function() { return 'walk8243'; });
			checkShortOutFormat(levels.INFO, 'production', 'function \\(\\) { return \'walk8243\'; }');
			logger.info(new Error('walk8243'));
			checkShortOutFormat(levels.INFO, 'production', 'Error: walk8243');

			logger.info('walk8243', true, 46, { key: 'value' });
			checkShortOutFormat(levels.INFO, 'production', 'walk8243 true 46 {"key":"value"}');

			logger.error('walk8243');
			checkShortErrFormat(levels.ERROR, 'production', 'walk8243');

			assert.strictEqual(spyStdoutWrite.callCount, 12);
			assert.strictEqual(spyStderrWrite.callCount, 1);
		});

		it('trace', () => {
			logger.trace('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('debug', () => {
			logger.debug('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('info', () => {
			logger.info('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('warn', () => {
			logger.warn('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('error', () => {
			logger.error('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('fatal', () => {
			logger.fatal('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
	});

	describe('color', () => {
		let logger: Logger;
		beforeEach(() => {
			logger = getLogger('color');
		});

		it('出力内容', () => {
			logger.info('walk8243');
			checkColorOutFormat(levels.INFO, 'color', 'walk8243');
			logger.info('first\nsecond');
			checkColorOutFormat(levels.INFO, 'color', 'first\nsecond');
			logger.info(true);
			checkColorOutFormat(levels.INFO, 'color', 'true');
			logger.info(46);
			checkColorOutFormat(levels.INFO, 'color', '46');
			logger.info({ key: 'value' });
			checkColorOutFormat(levels.INFO, 'color', '{ key: \'value\' }');
			logger.info([ 'aaa', 'bbb', 'ccc' ]);
			checkColorOutFormat(levels.INFO, 'color', '\\[ \'aaa\', \'bbb\', \'ccc\' \\]');
			logger.info(undefined);
			checkColorOutFormat(levels.INFO, 'color', 'undefined');
			logger.info(null);
			checkColorOutFormat(levels.INFO, 'color', 'null');

			logger.info(Symbol('walk8243'));
			checkColorOutFormat(levels.INFO, 'color', 'Symbol\\(walk8243\\)');
			logger.info(function() { return 'walk8243'; });
			checkColorOutFormat(levels.INFO, 'color', '\\[Function \\(anonymous\\)\\]');
			logger.info(new Error('walk8243'));
			checkColorOutFormat(levels.INFO, 'color', 'Error: walk8243(\n\\s+at .+)+');

			logger.info('walk8243', true, 46, { key: 'value' });
			checkColorOutFormat(levels.INFO, 'color', 'walk8243 true 46 { key: \'value\' }');

			logger.error('walk8243');
			checkColorErrFormat(levels.ERROR, 'color', 'walk8243');

			assert.strictEqual(spyStdoutWrite.callCount, 12);
			assert.strictEqual(spyStderrWrite.callCount, 1);
		});

		it('trace', () => {
			logger.trace('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('debug', () => {
			logger.debug('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('info', () => {
			logger.info('walk8243');
			assert.ok(spyStdoutWrite.called);
			assert.ok(spyStderrWrite.notCalled);
		});
		it('warn', () => {
			logger.warn('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('error', () => {
			logger.error('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
		it('fatal', () => {
			logger.fatal('walk8243');
			assert.ok(spyStdoutWrite.notCalled);
			assert.ok(spyStderrWrite.called);
		});
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

	function checkShortOutFormat(level: Level, tag: string, msg: string) {
		const target = spyStdoutWrite.lastCall.args[0];
		checkShortLogFormat(level, tag, msg, target);
	}
	function checkShortErrFormat(level: Level, tag: string, msg: string) {
		const target = spyStderrWrite.lastCall.args[0];
		checkShortLogFormat(level, tag, msg, target);
	}
	function checkShortLogFormat(level: Level, tag: string, msg: string, target: string) {
		checkLogFormat(
			new RegExp(`^\\[${level.levelStr}\\] ${msg}\\n$`),
			target
		);
	}

	function checkLogFormat(exp: RegExp, target: string) {
		assert.ok(exp.test(target));
	}
});

