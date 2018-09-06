
module.exports = func = {
  assignSecondLevel,
};

function assignSecondLevel(target, source) {
  if(!(target instanceof Object)) throw new TypeError(`'target' must be an Object.`);
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
