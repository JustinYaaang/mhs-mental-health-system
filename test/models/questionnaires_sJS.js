var expect = require('chai').expect;
var mongoose = require('../../config/mongoose');
 
var Questionnaire_sJSModel = require('../../models/questionnaire_sJS')
 
describe('questionnairesSJS', function() {
    it('should be invalid if role is not in ["FORM1", "FORM2"]', function(done) {
        var model = new Questionnaire_sJSModel({ role: 'UNKNOWN' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.exist;
            done();
        });
    });

    it('should be valid if role is in ["FORM1", "FORM2"]', function(done) {
        var model = new Questionnaire_sJSModel({ role: 'FORM2' });
 
        model.validate(function(err) {
            expect(err.errors.role).to.not.exist;
            done();
        });
    });

    it('should be invalid if is_published is empty', function(done) {
        var model = new Questionnaire_sJSModel();
 
        model.validate(function(err) {
            expect(err.errors.is_published).to.exist;
            done();
        });
    });

    it('should be invalid if is_public is empty', function(done) {
        var model = new Questionnaire_sJSModel();
 
        model.validate(function(err) {
            expect(err.errors.is_public).to.exist;
            done();
        });
    });

    it('should be invalid if title is empty', function(done) {
        var model = new Questionnaire_sJSModel();
 
        model.validate(function(err) {
            expect(err.errors.title).to.exist;
            done();
        });
    });

    it('should be invalid if description is empty', function(done) {
        var model = new Questionnaire_sJSModel();
 
        model.validate(function(err) {
            expect(err.errors.description).to.exist;
            done();
        });
    });

    it('should be invalid if body is empty', function(done) {
        var model = new Questionnaire_sJSModel();
 
        model.validate(function(err) {
            expect(err.errors.body).to.exist;
            done();
        });
    });

    it('should be invalid if rules is empty', function(done) {
        var model = new Questionnaire_sJSModel();
 
        model.validate(function(err) {
            expect(err.errors.rules).to.exist;
            done();
        });
    });
});