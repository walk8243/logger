const walk8243Logger  = require('./lib/logger');

for(let key of ['getLogger', 'def', 'none', 'color', 'nocolor']) {
  if(walk8243Logger.hasOwnProperty(key)) {
    let logger = walk8243Logger[key]();
    console.log(`\n- ${key}`);
    console.log(logger);
    showLogs(logger);
  }
}

let logger = walk8243Logger.def('production');
console.log(`\n- def`);
console.log(logger);
showLogs(logger);


function showLogs(logger) {
  logger.trace('Entering walk8243 testing');
  logger.debug('Walk8243 is coding.');
  logger.info('Walk8243 commits.');
  logger.warn('Walk8243 looked sleepy.');
  logger.error('Walk8243 is drowsy!');
  logger.fatal('Walk8243 has fallen asleep!');
}