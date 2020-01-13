module.exports = {
  app: {
    port: 7000,
    host: 'localhost',
    secret: 'your-secret',
    logging: {
      file: true,
    },
  },
  db: {
    url: 'mongodb://localhost:27017',
    host: 'localhost',
    port: 27017,
    dbName: 'fellah',
  },
};
