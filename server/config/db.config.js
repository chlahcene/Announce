const { DB_URL, DB_NAME, DB_NAME_TEST } = process.env;

module.exports = {
  dbName: DB_NAME,
  dbNameTest: DB_NAME_TEST,
  dbUrl: DB_URL,
};
