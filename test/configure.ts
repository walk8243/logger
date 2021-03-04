import assert from 'assert';
import { spy, stub } from 'sinon';
import { setting } from '../logger';

describe('configure', () => {
	let log4js: { getLogger: (args?: string) => any, configure: (args: any) => void, Logger: any };
	beforeEach(() => {
		delete require.cache[require.resolve('../logger')];
		delete require.cache[require.resolve('log4js')];
		log4js = require('log4js');
	});
	after(() => {
		delete require.cache[require.resolve('../logger')];
		delete require.cache[require.resolve('log4js')];
	});

	it('require', () => {
		const stubLog4jsConfigure = stub(log4js, 'configure' as any);

		assert.ok(stubLog4jsConfigure.notCalled);
		require('../logger');
		assert.ok(stubLog4jsConfigure.calledOnce);
		assert.deepStrictEqual(stubLog4jsConfigure.firstCall.args, [setting]);

		stubLog4jsConfigure.restore();
	});

	it('configureを複数回', () => {
		const spyStdoutWrite = spy(process.stdout, 'write');
		assert.strictEqual(spyStdoutWrite.callCount, 0);

		const logger1 = log4js.getLogger('development');
		logger1.info('aaaa');
		assert.strictEqual(spyStdoutWrite.callCount, 0);

		require('../logger');
		const logger2 = log4js.getLogger('development');
		logger1.info('aaaa');
		logger2.info('aaaa');
		assert.strictEqual(spyStdoutWrite.callCount, 2);

		log4js.configure({
			appenders: {
				test: { type: 'stdout', layout: { type: 'messagePassThrough' } },
				development: { type: 'stdout', layout: { type: 'messagePassThrough' } }
			},
			categories: {
				default: { appenders: ['test'], level: 'ALL' },
				development: { appenders: ['development'], level: 'ALL' }
			}
		});
		const logger3 = log4js.getLogger('development');
		logger1.info('aaaa');
		logger2.info('aaaa');
		logger3.info('aaaa');
		assert.strictEqual(spyStdoutWrite.callCount, 5);

		spyStdoutWrite.restore();
	});
});
