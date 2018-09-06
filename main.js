const log4js = require('log4js');

module.exports = logger = () => {
  return log4js.getLogger();
};
