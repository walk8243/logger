# @walk8243/logger

log4jsの設定にデフォルトを設ける

## Install

```.sh
# npm
npm install @walk8243/logger

# yarn
yarn add @walk8243/logger
```

## Usage

```.js
logger = require('@walk8243/logger').logger;
// logger = require('@walk8243/logger').getLogger();

logger.trace('Entering walk8243 testing');
logger.debug('Walk8243 is coding.');
logger.info('Walk8243 commits.');
logger.warn('Walk8243 looked sleepy.');
logger.error('Walk8243 is drowsy!');
logger.fatal('Walk8243 has fallen asleep!');
```

## Example

```.log
$ yarn run start

=============== undefined ==============
[2021-03-06T16:07:40.436] [TRACE] MidSummer - Entering walk8243 testing
[2021-03-06T16:07:40.437] [DEBUG] MidSummer - Walk8243 is coding.
[2021-03-06T16:07:40.440] [INFO] MidSummer - Walk8243 commits.
[2021-03-06T16:07:40.441] [WARN] MidSummer - Walk8243 looked sleepy.
[2021-03-06T16:07:40.441] [ERROR] MidSummer - Walk8243 is drowsy!
[2021-03-06T16:07:40.442] [FATAL] MidSummer - Walk8243 has fallen asleep!
[2021-03-06T16:07:40.442] [INFO] MidSummer - { str: 'value', num: 46, obj: { key: 'value' } }
[2021-03-06T16:07:40.443] [ERROR] MidSummer - Error: dummy
    at showLogs (F:\git\logger\index.js:20:18)
    at Object.<anonymous> (F:\git\logger\index.js:8:5)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
[2021-03-06T16:07:40.446] [INFO] MidSummer - first
second true 46 { key: 'value' } [ 'aaa', 'bbb', 'ccc' ] undefined null Symbol(walk8243) [Function (anonymous)]
========================================

================ default ===============
[2021-03-06T16:07:40.453] [TRACE] default - Entering walk8243 testing
[2021-03-06T16:07:40.454] [DEBUG] default - Walk8243 is coding.
[2021-03-06T16:07:40.454] [INFO] default - Walk8243 commits.
[2021-03-06T16:07:40.455] [WARN] default - Walk8243 looked sleepy.
[2021-03-06T16:07:40.455] [ERROR] default - Walk8243 is drowsy!
[2021-03-06T16:07:40.455] [FATAL] default - Walk8243 has fallen asleep!
[2021-03-06T16:07:40.456] [INFO] default - { str: 'value', num: 46, obj: { key: 'value' } }
[2021-03-06T16:07:40.456] [ERROR] default - Error: dummy
    at showLogs (F:\git\logger\index.js:20:18)
    at Object.<anonymous> (F:\git\logger\index.js:8:5)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
[2021-03-06T16:07:40.458] [INFO] default - first
second true 46 { key: 'value' } [ 'aaa', 'bbb', 'ccc' ] undefined null Symbol(walk8243) [Function (anonymous)]
========================================

================= debug ================
[2021-03-06T16:07:40.459] [DEBUG] debug - Walk8243 is coding.
[2021-03-06T16:07:40.460] [INFO] debug - Walk8243 commits.
[2021-03-06T16:07:40.460] [WARN] debug - Walk8243 looked sleepy.
[2021-03-06T16:07:40.460] [ERROR] debug - Walk8243 is drowsy!
[2021-03-06T16:07:40.461] [FATAL] debug - Walk8243 has fallen asleep!
[2021-03-06T16:07:40.461] [INFO] debug - { str: 'value', num: 46, obj: { key: 'value' } }
[2021-03-06T16:07:40.462] [ERROR] debug - Error: dummy
    at showLogs (F:\git\logger\index.js:20:18)
    at Object.<anonymous> (F:\git\logger\index.js:8:5)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
[2021-03-06T16:07:40.463] [INFO] debug - first
second true 46 { key: 'value' } [ 'aaa', 'bbb', 'ccc' ] undefined null Symbol(walk8243) [Function (anonymous)]
========================================

============== development =============
[DEBUG] Walk8243 is coding.
[INFO] Walk8243 commits.
[WARN] Walk8243 looked sleepy.
[ERROR] Walk8243 is drowsy!
[FATAL] Walk8243 has fallen asleep!
[INFO] {"str":"value","num":46,"obj":{"key":"value"}}
[ERROR] Error: dummy
[INFO] first second true 46 {"key":"value"} ["aaa","bbb","ccc"] undefined null Symbol(walk8243) [Function (anonymous)]
========================================

============== production ==============
[INFO] Walk8243 commits.
[WARN] Walk8243 looked sleepy.
[ERROR] Walk8243 is drowsy!
[FATAL] Walk8243 has fallen asleep!
[INFO] {"str":"value","num":46,"obj":{"key":"value"}}
[ERROR] Error: dummy
[INFO] first second true 46 {"key":"value"} ["aaa","bbb","ccc"] undefined null Symbol(walk8243) [Function (anonymous)]
========================================
```

## License

`@walk8243/logger` is released under the [MIT License](./LICENSE)
