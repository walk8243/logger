module.exports = func = {
  assignSecondLevel,
  judgeAssociativeArray,
};

function assignSecondLevel(target, source) {
  if(!func.judgeAssociativeArray(target)) throw new TypeError(`'target' must be an Object.`);
  for(let key in source) {
    if(source.hasOwnProperty(key)) {
      if(target.hasOwnProperty(key)) {
        Object.assign(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function judgeAssociativeArray(target) {
  if(target instanceof Object) {
    if(target instanceof Array
        || target instanceof Function
        || target instanceof Error
        || target instanceof RegExp
        || target instanceof ArrayBuffer
        || target instanceof DataView
        || target instanceof Promise) {
      return false;
    } else if(target.constructor.constructor.name === 'GeneratorFunction') {
      return false;
    }
  } else return false;
  return true;
}