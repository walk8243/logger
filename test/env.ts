import assert from 'assert';

describe('logger env', () => {
	beforeEach(() => {
		delete process.env['LOGGER_CATEGORY'];
		delete process.env['NODE_ENV'];
		delete process.env['ENV'];
		delete require.cache[require.resolve('../logger')];
	});
	after(() => {
		delete require.cache[require.resolve('../logger')];
	});

	it('環境変数で指定しない', () => {
		const logger = require('../logger').logger;
		assert.strictEqual(logger['category'], 'MidSummer');
	});

	it('LOGGER_CATEGORYが指定されている', () => {
		process.env['LOGGER_CATEGORY'] = 'LOGGER_CATEGORY';
		const logger = require('../logger').logger;
		assert.strictEqual(logger['category'], 'LOGGER_CATEGORY');
	});
	it('NODE_ENVが指定されている', () => {
		process.env['NODE_ENV'] = 'NODE_ENV';
		const logger = require('../logger').logger;
		assert.strictEqual(logger['category'], 'NODE_ENV');
	});
	it('ENVが指定されている', () => {
		process.env['ENV'] = 'ENV';
		const logger = require('../logger').logger;
		assert.strictEqual(logger['category'], 'ENV');
	});

	it('LOGGER_CATEGORYとNODE_ENVが指定されている', () => {
		process.env['LOGGER_CATEGORY'] = 'LOGGER_CATEGORY';
		process.env['NODE_ENV'] = 'NODE_ENV';
		const logger = require('../logger').logger;
		assert.strictEqual(logger['category'], 'LOGGER_CATEGORY');
	});
	it('LOGGER_CATEGORYとENVが指定されている', () => {
		process.env['LOGGER_CATEGORY'] = 'LOGGER_CATEGORY';
		process.env['ENV'] = 'ENV';
		const logger = require('../logger').logger;
		assert.strictEqual(logger['category'], 'LOGGER_CATEGORY');
	});
	it('NODE_ENVとENVが指定されている', () => {
		process.env['NODE_ENV'] = 'NODE_ENV';
		process.env['ENV'] = 'ENV';
		const logger = require('../logger').logger;
		assert.strictEqual(logger['category'], 'NODE_ENV');
	});
});
