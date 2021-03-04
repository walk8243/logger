import * as assert from 'assert';
import { stub, reset, restore } from 'sinon';
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

	describe('logger', () => {
		beforeEach(() => {
			delete process.env['LOGGER_CATEGORY'];
			delete process.env['NODE_ENV'];
			delete process.env['ENV'];
			delete require.cache[require.resolve('../../lib/logger')];
		});
		after(() => {
			delete require.cache[require.resolve('../../lib/logger')];
			require('../../lib/logger');
		});

		it('環境変数で指定しない', () => {
			const logger = require('../../lib/logger').logger;
			assert.strictEqual(logger['category'], 'MidSummer');
		});

		it('LOGGER_CATEGORYが指定されている', () => {
			process.env['LOGGER_CATEGORY'] = 'LOGGER_CATEGORY';
			const logger = require('../../lib/logger').logger;
			assert.strictEqual(logger['category'], 'LOGGER_CATEGORY');
		});
		it('NODE_ENVが指定されている', () => {
			process.env['NODE_ENV'] = 'NODE_ENV';
			const logger = require('../../lib/logger').logger;
			assert.strictEqual(logger['category'], 'NODE_ENV');
		});
		it('ENVが指定されている', () => {
			process.env['ENV'] = 'ENV';
			const logger = require('../../lib/logger').logger;
			assert.strictEqual(logger['category'], 'ENV');
		});

		it('LOGGER_CATEGORYとNODE_ENVが指定されている', () => {
			process.env['LOGGER_CATEGORY'] = 'LOGGER_CATEGORY';
			process.env['NODE_ENV'] = 'NODE_ENV';
			const logger = require('../../lib/logger').logger;
			assert.strictEqual(logger['category'], 'LOGGER_CATEGORY');
		});
		it('LOGGER_CATEGORYとENVが指定されている', () => {
			process.env['LOGGER_CATEGORY'] = 'LOGGER_CATEGORY';
			process.env['ENV'] = 'ENV';
			const logger = require('../../lib/logger').logger;
			assert.strictEqual(logger['category'], 'LOGGER_CATEGORY');
		});
		it('NODE_ENVとENVが指定されている', () => {
			process.env['NODE_ENV'] = 'NODE_ENV';
			process.env['ENV'] = 'ENV';
			const logger = require('../../lib/logger').logger;
			assert.strictEqual(logger['category'], 'NODE_ENV');
		});
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
			assert.strictEqual(logger.level, log4js.levels.ALL);
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
	
	describe('configure', () => {
		let tmpLog4js: log4js.Log4js;
		beforeEach(() => {
			delete require.cache[require.resolve('../../lib/logger')];
			delete require.cache[require.resolve('log4js')];
			tmpLog4js = require('log4js');
		});

		it('require', () => {
			const stubLog4jsConfigure = stub(tmpLog4js, 'configure');

			assert.ok(stubLog4jsConfigure.notCalled);
			require('../../lib/logger');
			assert.ok(stubLog4jsConfigure.calledOnce);
			assert.deepStrictEqual(stubLog4jsConfigure.firstCall.args, [walk8243Logger.setting]);

			stubLog4jsConfigure.restore();
		});

		it('log4js', () => {
			let logger: log4js.Logger;

			logger = log4js.getLogger();
			logger.info('aaaa');

			const setting = require('../../lib/logger').setting;
			logger = log4js.getLogger();
			logger.info('aaaa');

			log4js.configure({
				appenders: {
					test: { type: 'stdout', layout: { type: 'messagePassThrough' } }
				},
				categories: {
					default: { appenders: ['test'], level: 'ALL' }
				}
			});
			logger = log4js.getLogger();
			logger.info('aaaa');
			
			log4js.configure(setting);
			logger = log4js.getLogger();
			logger.info('aaaa');
			logger = log4js.getLogger('development');
			logger.info('aaaa');
		});

		it('configure以前', () => {
			const logger1 = log4js.getLogger('development');
			logger1.info('aaaa');

			require('../../lib/logger');
			const logger2 = log4js.getLogger('development');
			logger1.info('aaaa');
			logger2.info('aaaa');
		});
	});
});
