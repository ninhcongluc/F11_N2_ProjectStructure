const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('Tetsting API', () => {
  describe('Get all users /users', () => {
    it('It should return list of users', done => {
      chai
        .request(server)
        .get('/test/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Testing for create user /users', () => {
    it('It should return list of users', done => {
      chai
        .request(server)
        .post('/test/users')
        .send({
          name: 'ASAD',
          username: 'anhluc123',
          password: '123@123avx',
          email: 'ninhcongluc@gmail.com',
          status: 'user',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
