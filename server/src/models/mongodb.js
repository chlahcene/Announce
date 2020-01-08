const mongoose = require('mongoose');
const dbConfig = require('../../config/db.config');
const logger = require('../../config/logger.config');

/**
 * connect db
 */
const connect = (dbName = '') => {
  // connect the database
  let dbname = dbName;
  if (dbname === '') {
    dbname = dbConfig.dbName;
  }
  // url database
  const url = `${dbConfig.dbUrl}/${dbname}`;

  mongoose.Promise = global.Promise;
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useFindAndModify', false);

  try {
    mongoose.connect(url);
    logger.info(`connextion to database dbname on - ${url}`);
  } catch (error) {
    throw error(error);
  }
};

const disconnect = (done) => {
  mongoose.disconnect(done);
};

module.exports = {
  mongoose,
  connect,
  disconnect,
};
