const mongoose = require('mongoose');
const dbConfig = require('../../config/db.config');

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
  mongoose.connect(url);
};

const disconnect = (done) => {
  mongoose.disconnect(done);
};

module.exports = {
  mongoose,
  connect,
  disconnect,
};
