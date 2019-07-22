// var assert = require('assert');
// var expect = require('chai').expect;
// var should = require('chai').should();


// it('should return true if valid user id', function(){
//       var isValid = loginController.isValidUserId('abc123')
//       //assert.equal(isValid, true);
//       expect(isValid).to.be.true;
// });

// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("PatientAnswers", () => {
    describe("GET /", () => {
        // Test to get all patient answers
        it("should get all patient answers", (done) => {
             chai.request(app)
                 .get('/api/patientanswers')
                 .end((err, res) => {
                     res.should.have.status(200);
                     console.log(res);
                     res.body.should.be.an.instanceof(Object);
                     res.body.data.should.be.an.instanceof(Array);
                     res.body.data.should.be.an.instanceof(Array);
                     done();
                  });
         });
        // Test to get single student record
        // it("should get a single student record", (done) => {
        //      const id = 1;
        //      chai.request(app)
        //          .get(`/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(200);
        //              res.body.should.be.a('object');
        //              done();
        //           });
        //  });

        // // Test to get single student record
        // it("should not get a single student record", (done) => {
        //      const id = 5;
        //      chai.request(app)
        //          .get(`/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(404);
        //              done();
        //           });
        //  });
    });
});