// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../server/src/app');

const request = supertest(app);

describe('Test the api path', () => {
  it('It should response the GET method 200', async () => {
    const response = await request.get('/api');
    expect(response.statusCode).toBe(200);
  });

  it('It should response the GET method 404', async () => {
    const response = await request.get('/api/kfjdaskldf;jas');
    expect(response.statusCode).toBe(404);
  });
});
