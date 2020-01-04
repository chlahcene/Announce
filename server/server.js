const app = require('./src/app');
const mongodb = require('./src/models/mongodb');

/**
 * start the server
 */
const start = () => {
  mongodb.connect();
  app.start();
};

/**
 * stop the server
 */
const stop = () => {
  mongodb.disconnect();
  app.stopServer();
};

module.exports = {
  start,
  stop,
};
