const winston = require('./winston');
const consoleLogger = require('./console');

let logger = winston;

const env = process.env.NODE_ENV;
if (env === 'test') {
  logger = consoleLogger;
}

module.exports = logger;
