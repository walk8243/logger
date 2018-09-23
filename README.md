# walk8243-logger
log4jsの設定にデフォルトを設ける

## Install
```.sh
npm i walk8243-logger
```

## Usage
```.js
logger = require('walk8243-logger').getLogger();

logger.trace('Entering walk8243 testing');
logger.debug('Walk8243 is coding.');
logger.info('Walk8243 commits.');
logger.warn('Walk8243 looked sleepy.');
logger.error('Walk8243 is drowsy!');
logger.fatal('Walk8243 has fallen asleep!');
```

## License
`walk8243-logger` is released under the [MIT License](https://github.com/walk8243/walk8243-logger/blob/master/LICENSE.md)
