import log4js from 'log4js';

log4js.addLayout('walk8243/short', (config) => {
	return (logEvent) => {
		const str = logEvent.data.map((d) => {
			if(typeof d == 'string') {
				return d.replace(/\s/g, ' ');
			} else if(d instanceof Error) {
				return d.name + ': ' + d.message.replace(/\s/g, ' ');
			} else if(typeof d == 'object') {
				return JSON.stringify(d);
			} else if(typeof d == 'function' || typeof d == 'symbol') {
				return d.toString();
			} else {
				return String(d);
			}
		}).join(' ');
		return `[${logEvent.level.levelStr}] ${str}`;
	};
});

export const setting: log4js.Configuration = {
	appenders: {
		_colorOut: { type: 'stdout', layout: { type: 'coloured' } },
		_colorErr: { type: 'stderr', layout: { type: 'coloured' } },
		_longOut: { type: 'stdout', layout: { type: 'basic' } },
		_longErr: { type: 'stderr', layout: { type: 'basic' } },
		_shortOut: { type: 'stdout', layout: { type: 'walk8243/short' } },
		_shortErr: { type: 'stderr', layout: { type: 'walk8243/short' } },
		colorOut: { type: 'logLevelFilter', appender: '_colorOut', level: 'TRACE', maxLevel: 'INFO' },
		colorErr: { type: 'logLevelFilter', appender: '_colorErr', level: 'WARN' },
		longOut: { type: 'logLevelFilter', appender: '_longOut', level: 'TRACE', maxLevel: 'INFO' },
		longErr: { type: 'logLevelFilter', appender: '_longErr', level: 'WARN' },
		shortOut: { type: 'logLevelFilter', appender: '_shortOut', level: 'TRACE', maxLevel: 'INFO' },
		shortErr: { type: 'logLevelFilter', appender: '_shortErr', level: 'WARN' },
	},
	categories: {
		default: { appenders: ['longOut', 'longErr'], level: 'ALL' },
		debug: { appenders: ['colorOut', 'colorErr'], level: 'DEBUG' },
		development: { appenders: ['shortOut', 'shortErr'], level: 'DEBUG' },
		production: { appenders: ['shortOut', 'shortErr'], level: 'INFO' },
		color: { appenders: ['colorOut', 'colorErr'], level: 'ALL' },
	},
};

log4js.configure(setting);

export function getLogger(category: string = 'MidSummer') {
	return log4js.getLogger(category);
}

export const logger = getLogger(process.env['LOGGER_CATEGORY'] ?? process.env['NODE_ENV'] ?? process.env['ENV']);
