var expect = require('chai').expect;
var mongoose = require('../../config/mongoose');
 
var PatientModel = require('../../models/patient')
 
describe('patients', function() {
    it('should be valid if role is PATIENT', function(done) {
        var model = new PatientModel({ role: 'PATIENT' });
        model.validate(function(err) {
            expect(err.errors.role).to.not.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(done) {
        var model = new PatientModel();
        model.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if password is empty', function(done) {
        var model = new PatientModel();
        model.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should be invalid if first_name is empty', function(done) {
        var model = new PatientModel();
        model.validate(function(err) {
            expect(err.errors.first_name).to.exist;
            done();
        });
    });

    it('should be invalid if last_name is empty', function(done) {
        var model = new PatientModel();
        model.validate(function(err) {
            expect(err.errors.last_name).to.exist;
            done();
        });
    });

    it('should be invalid if postcode is empty', function(done) {
        var model = new PatientModel();
        model.validate(function(err) {
            expect(err.errors.postcode).to.exist;
            done();
        });
    });
});