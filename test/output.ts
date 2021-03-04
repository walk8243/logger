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

	function checkLogFormat(exp: RegExp, target: string) {
		assert.ok(exp.test(target));
	}
});

