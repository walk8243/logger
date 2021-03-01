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
logger = require('@walk8243/logger').getLogger();

logger.trace('Entering walk8243 testing');
logger.debug('Walk8243 is coding.');
logger.info('Walk8243 commits.');
logger.warn('Walk8243 looked sleepy.');
logger.error('Walk8243 is drowsy!');
logger.fatal('Walk8243 has fallen asleep!');
```

## Example

```.sh
yarn run start

============= undefined =============
[2021-03-02T02:38:28.758] [TRACE] MidSummer - Entering walk8243 testing
[2021-03-02T02:38:28.759] [DEBUG] MidSummer - Walk8243 is coding.
[2021-03-02T02:38:28.759] [INFO] MidSummer - Walk8243 commits.
[2021-03-02T02:38:28.759] [WARN] MidSummer - Walk8243 looked sleepy.
[2021-03-02T02:38:28.760] [ERROR] MidSummer - Walk8243 is drowsy!
[2021-03-02T02:38:28.760] [FATAL] MidSummer - Walk8243 has fallen asleep!
[2021-03-02T02:38:28.760] [INFO] MidSummer - { str: 'value', num: 46, obj: { key: 'value' } }
[2021-03-02T02:38:28.760] [ERROR] MidSummer - Error: dummy
    at showLogs (F:\git\logger\index.js:19:18)
    at Object.<anonymous> (F:\git\logger\index.js:7:5)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
[2021-03-02T02:38:28.764] [INFO] MidSummer - first
second true 46 { key: 'value' } [ 'aaa', 'bbb', 'ccc' ] undefined null Symbol(walk8243) [Function (anonymous)]
=====================================

============= default =============
[2021-03-02T02:38:28.767] [TRACE] default - Entering walk8243 testing
[2021-03-02T02:38:28.767] [DEBUG] default - Walk8243 is coding.
[2021-03-02T02:38:28.767] [INFO] default - Walk8243 commits.
[2021-03-02T02:38:28.768] [WARN] default - Walk8243 looked sleepy.
[2021-03-02T02:38:28.768] [ERROR] default - Walk8243 is drowsy!
[2021-03-02T02:38:28.768] [FATAL] default - Walk8243 has fallen asleep!
[2021-03-02T02:38:28.769] [INFO] default - { str: 'value', num: 46, obj: { key: 'value' } }
[2021-03-02T02:38:28.769] [ERROR] default - Error: dummy
    at showLogs (F:\git\logger\index.js:19:18)
    at Object.<anonymous> (F:\git\logger\index.js:7:5)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
[2021-03-02T02:38:28.770] [INFO] default - first
second true 46 { key: 'value' } [ 'aaa', 'bbb', 'ccc' ] undefined null Symbol(walk8243) [Function (anonymous)]
===================================

============= debug =============
[2021-03-02T02:38:28.784] [TRACE] debug - Entering walk8243 testing
[2021-03-02T02:38:28.784] [DEBUG] debug - Walk8243 is coding.
[2021-03-02T02:38:28.785] [INFO] debug - Walk8243 commits.
[2021-03-02T02:38:28.785] [WARN] debug - Walk8243 looked sleepy.
[2021-03-02T02:38:28.785] [ERROR] debug - Walk8243 is drowsy!
[2021-03-02T02:38:28.786] [FATAL] debug - Walk8243 has fallen asleep!
[2021-03-02T02:38:28.786] [INFO] debug - { str: 'value', num: 46, obj: { key: 'value' } }
[2021-03-02T02:38:28.786] [ERROR] debug - Error: dummy
    at showLogs (F:\git\logger\index.js:19:18)
    at Object.<anonymous> (F:\git\logger\index.js:7:5)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
[2021-03-02T02:38:28.815] [INFO] debug - first
second true 46 { key: 'value' } [ 'aaa', 'bbb', 'ccc' ] undefined null Symbol(walk8243) [Function (anonymous)]
=================================

============= development =============
[DEBUG] Walk8243 is coding.
[INFO] Walk8243 commits.
[WARN] Walk8243 looked sleepy.
[ERROR] Walk8243 is drowsy!
[FATAL] Walk8243 has fallen asleep!
[INFO] {"str":"value","num":46,"obj":{"key":"value"}}
[ERROR] Error: dummy
[INFO] first second true 46 {"key":"value"} ["aaa","bbb","ccc"]  null Symbol(walk8243) function () { return 'walk8243'; }
=======================================

============= production =============
[INFO] Walk8243 commits.
[WARN] Walk8243 looked sleepy.
[ERROR] Walk8243 is drowsy!
[FATAL] Walk8243 has fallen asleep!
[INFO] {"str":"value","num":46,"obj":{"key":"value"}}
[ERROR] Error: dummy
[INFO] first second true 46 {"key":"value"} ["aaa","bbb","ccc"]  null Symbol(walk8243) function () { return 'walk8243'; }
======================================
```

## License

`@walk8243/logger` is released under the [MIT License](./LICENSE)
