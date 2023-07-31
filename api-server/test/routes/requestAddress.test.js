const request = require('supertest');
const app = require('../../server.js');

describe('POST /', () => {
  it('should return 200 OK', (done) => {
    const addresses = ['0x1234', '0x5678'];
    request(app)
      .post('/')
      .send({ addresses })
      .expect(200, done);
  });

  it('should return 400 if addresses is missing', (done) => {
    request(app)
      .post('/')
      .send({})
      .expect(400, done);
  });

  it('should return 400 if addresses is not an array', (done) => {
    request(app)
      .post('/')
      .send({ addresses: '0x1234' })
      .expect(400, done);
  });
});