// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const mongodb = require('../server/src/utils/database');
const app = require('../server/src/app');

// eslint-disable-next-line no-unused-vars
const request = supertest(app);

describe('Test mongodb', () => {
  // Connect to Mongoose
  beforeAll(async () => {
    mongodb.connect();
  });

  // Cleans up database between each test
  afterEach(async () => {
    await mongodb.clean.removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await mongodb.clean.dropAllCollections();
    await mongodb.disconnect();
  });

  it('mongodb', async () => {
    expect(1).toBe(1);
  });
});
