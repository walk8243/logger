import assert from 'assert';
import { reset, restore } from 'sinon';
import log4js from 'log4js';
import Log4jsLogger from 'log4js/lib/logger';
import * as walk8243Logger from '../logger';

describe('Library logger', () => {
	beforeEach(() => {
		reset();
	});
	after(() => {
		restore();
	});

	it('内容確認', () => {
		assert.deepStrictEqual(Object.keys(walk8243Logger), ['setting', 'getLogger', 'logger']);
		assert.strictEqual(typeof walk8243Logger.setting, 'object');
		assert.strictEqual(typeof walk8243Logger.getLogger, 'function');
		assert.strictEqual(typeof walk8243Logger.logger, 'object');
		assert.ok(walk8243Logger.logger instanceof Log4jsLogger);
	});

	describe('getLogger', () => {
		it('default', () => {
			const logger = walk8243Logger.getLogger('default');
			assert.strictEqual(logger.category, 'default');
			assert.strictEqual(logger.level, log4js.levels.ALL);
		});
		it('debug', () => {
			const logger = walk8243Logger.getLogger('debug');
			assert.strictEqual(logger.category, 'debug');
			assert.strictEqual(logger.level, log4js.levels.DEBUG);
		});
		it('development', () => {
			const logger = walk8243Logger.getLogger('development');
			assert.strictEqual(logger.category, 'development');
			assert.strictEqual(logger.level, log4js.levels.DEBUG);
		});
		it('production', () => {
			const logger = walk8243Logger.getLogger('production');
			assert.strictEqual(logger.category, 'production');
			assert.strictEqual(logger.level, log4js.levels.INFO);
		});
		it('color', () => {
			const logger = walk8243Logger.getLogger('color');
			assert.strictEqual(logger.category, 'color');
			assert.strictEqual(logger.level, log4js.levels.ALL);
		});
		it('console', () => {
			const logger = walk8243Logger.getLogger('console');
			assert.strictEqual(logger.category, 'console');
			assert.strictEqual(logger.level, log4js.levels.ALL);
		});
		it('undefined', () => {
			const logger = walk8243Logger.getLogger(undefined);
			assert.strictEqual(logger.category, 'MidSummer');
			assert.strictEqual(logger.level, log4js.levels.ALL);
		});
	});
});
