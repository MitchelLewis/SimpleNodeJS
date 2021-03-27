const chai    = require('chai');
const expect  = chai.expect;
const request = require('superagent');
const status  = require('http-status');
const router  = require('../routes/routes.js');
const rootServer = 'http://localhost:3000/'
describe('HelloWorld API', function() {
  before(function(done) {
    //Listen specifically on port 3000
    var express = require('express');
    const app = express();
    var port = 3000;
    app.use('/', router);
    server = app.listen(port, function() {done()});
  });

  after(function() {
    server.close()
  });

  it('should return OK when called via GET', function(done){
      request.get(rootServer)
        .end(
          function(err, res) {
            expect(err).to.not.be.an('error');
            expect(res.statusCode).to.equal(status.OK);
            expect(res.text).to.equal('Hello world!');
            done();
          });
  });

  it('should return 405 when called via POST', function(done) {
    request.post(rootServer)
      .end(
        function(err, res) {
          expect(err).to.be.an('error');
          expect(res.statusCode).to.equal(status.METHOD_NOT_ALLOWED);
          done();
        }
      )
  })
});
