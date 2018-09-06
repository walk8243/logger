module.exports = func = {
  assignSecondLevel,
  judgeAssociativeArray,
};

function assignSecondLevel(target, source) {
  if(!func.judgeAssociativeArray(target)) throw new TypeError(`'target' must be an Object.`);
  for(var key in source) {
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
    if(target instanceof Array || target instanceof Function) {
      return false;
    }
  } else return false;
  return true;
}
