var expect = require('chai').expect;
var mongoose = require('../../config/mongoose');
 
var UserModel = require('../../models/user')
 
describe('questionnairesSJS', function() {
    it('should be invalid if role is not in ["ADMIN", "TRUSTMANAGER", "SERVICEMANAGER", "STEP2", "STEP3"]', function(done) {
        var model = new UserModel({ role: 'UNKNOWN' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.exist;
            done();
        });
    });

    it('should be valid if role is in ["ADMIN", "TRUSTMANAGER", "SERVICEMANAGER", "STEP2", "STEP3"]', function(done) {
        var model = new UserModel({ role: 'ADMIN' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.not.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(done) {
        var model = new UserModel();
 
        model.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if password is empty', function(done) {
        var model = new UserModel();
 
        model.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should be invalid if first_name is empty', function(done) {
        var model = new UserModel();
 
        model.validate(function(err) {
            expect(err.errors.first_name).to.exist;
            done();
        });
    });

    it('should be invalid if last_name is empty', function(done) {
        var model = new UserModel();
 
        model.validate(function(err) {
            expect(err.errors.last_name).to.exist;
            done();
        });
    });
});