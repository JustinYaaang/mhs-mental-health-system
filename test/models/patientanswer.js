var expect = require('chai').expect;
 
var PatientAnswerModel = require('../../models/patientanswer')
 
describe('patientanswers', function() {
    it('should be invalid if role is not in ["FORM1ANSWER", "FORM2ANSWER"]', function(done) {
        var model = new PatientAnswerModel({ role: 'UNKNOWN' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.exist;
            done();
        });
    });

    it('should be valid if role is in ["FORM1ANSWER", "FORM2ANSWER"]', function(done) {
        var model = new PatientAnswerModel({ role: 'FORM2ANSWER' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.not.exist;
            done();
        });
    });

    it('should be invalid if title is empty', function(done) {
        var model = new PatientAnswerModel();
 
        model.validate(function(err) {
            expect(err.errors.title).to.exist;
            done();
        });
    });

    it('should be invalid if body is empty', function(done) {
        var model = new PatientAnswerModel();
 
        model.validate(function(err) {
            expect(err.errors.body).to.exist;
            done();
        });
    });

    it('should be invalid if status is not in ["PENDING", "RESOLVED"]', function(done) {
        var model = new PatientAnswerModel({ status: 'UNKNOWN' });
 
        model.validate(function(err) {
            expect(err.errors.status).to.exist;
            done();
        });
    });

    it('should be valid if role is in ["PENDING", "RESOLVED"]', function(done) {
        var model = new PatientAnswerModel({ status: 'RESOLVED' });
 
        model.validate(function(err) {
            expect(err.errors.status).to.not.exist;
            done();
        });
    });

    it('should be invalid if questionnaireBody is empty', function(done) {
        var model = new PatientAnswerModel();
 
        model.validate(function(err) {
            expect(err.errors.questionnaireBody).to.exist;
            done();
        });
    });

    it('should be invalid if rules is empty', function(done) {
        var model = new PatientAnswerModel();
 
        model.validate(function(err) {
            expect(err.errors.rules).to.exist;
            done();
        });
    });

    it('should be invalid if patient_id is empty', function(done) {
        var model = new PatientAnswerModel();
 
        model.validate(function(err) {
            expect(err.errors.patient_id).to.exist;
            done();
        });
    });

    it('should be invalid if service_id is empty', function(done) {
        var model = new PatientAnswerModel();
 
        model.validate(function(err) {
            expect(err.errors.service_id).to.exist;
            done();
        });
    });
});