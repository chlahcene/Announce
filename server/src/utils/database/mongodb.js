const mongoose = require('mongoose');
const config = require('config');
const logger = require('../logger');
const clean = require('./clean');

const url = config.get('db.url');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
  mongoose.set('useCreateIndex', true);
}

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
/*
  mongoose.set('autoReconnect', true);
  mongoose.set('reconnectTries', 100000);
  mongoose.set('reconnectInterval', 1000);
  mongoose.set('socketTimeoutMS', 5000);
*/
const onError = (err) => {
  logger.error(`MongoDB connection error: ${err}`);
};

const onConnected = () => {
  logger.info('Connected to MongoDB');
};

const onReconnected = () => {
  logger.warn('MongoDB reconnected!');
};

const onSIGINT = () => {
  mongoose.connection.close(() => {
    logger.warn('MongoDB default connection disconnected through app termination!');
    // eslint-disable-next-line no-process-exit
    process.exit();
  });
};

/**
 * connect db
 */
const connect = () => {
  mongoose.connect(url);
  mongoose.connection.on('error', onError);
  mongoose.connection.on('connected', onConnected);
  mongoose.connection.on('reconnected', onReconnected);
  process.on('SIGINT', onSIGINT);
};

const disconnect = (done) => {
  mongoose.connection.close(done);
  logger.warn('MongoDB default connection disconnected');
};

module.exports = {
  mongoose,
  connect,
  disconnect,
  clean,
};
