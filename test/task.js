const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

// assertion style
chai.should();

chai.use(chaiHttp);

describe('Task API', () => {
  /**
   * Test the GET route
   */
  describe('GET /users', () => {
    it('it should get all users', done => {
      chai
        .request(server)
        .get('/users')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });
  });

  /**
   * Test the GET  by ID route
   */
  describe('GET /users/:id', () => {
    it('it should get a user by id', done => {
      chai
        .request(server)
        .get('/users/61485dec26e11c23753507e2')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  /**
   * Test the PUT route
   */
  /**
   * Test the PATCH route
   */
  /**
   * Test the DELETE route
   */
});
