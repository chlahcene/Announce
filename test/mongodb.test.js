// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const cleandb = require('../server/src/utils/database/cleanDb');
const mongodb = require('../server/src/models/mongodb');
const app = require('../server/src/app');

const request = supertest(app);
const databaseName = 'test';

describe('Test mongodb', () => {
  // Connect to Mongoose
  beforeAll(async () => {
    mongodb.connect(databaseName);
  });

  // Cleans up database between each test
  afterEach(async () => {
    await cleandb.removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await cleandb.dropAllCollections();
    await mongodb.disconnect();
  });

  it('mongodb', async () => {
    expect(1).toBe(1);
  });
});
