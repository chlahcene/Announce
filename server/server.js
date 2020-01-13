/* eslint-disable no-process-exit */
const http = require('http');
const app = require('./src/app');
const mongodb = require('./src/utils/database');
const logger = require('./src/utils/logger');

const port = app.get('port');
const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  const eacces = 'EACCES';
  const eaddr = 'EADDRINUSE';

  if (error.code === eacces) {
    logger.error(`${bind} requires elevated privileges`);
    process.exit(1);
  } else if (error.code === eaddr) {
    logger.error(`${bind} is already in use`);
    process.exit(1);
  } else {
    throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const env = app.get('env');
  const hostname = app.get('hostname');
  logger.info(`Listening on ${bind} in ${env} environment`);
  logger.info(`Server ready at ${hostname} a port ${port}`);
};

/**
 * start the server
 */
const start = () => {
  mongodb.connect();
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
};

/**
 * stop the server
 */
const stop = () => {
  mongodb.disconnect();
  logger.warn('server stop');
  server.stop();
};

module.exports = {
  start,
  stop,
};
