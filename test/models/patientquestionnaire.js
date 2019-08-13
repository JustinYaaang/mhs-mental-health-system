var expect = require('chai').expect;
 
var PatientQuestionnaireModel = require('../../models/patientquestionnaire')
 
describe('patientquestionnaires', function() {
    it('should be invalid if patient_id is empty', function(done) {
        var model = new PatientQuestionnaireModel();
 
        model.validate(function(err) {
            expect(err.errors.patient_id).to.exist;
            done();
        });
    });

    it('should be invalid if questionnaire_id is empty', function(done) {
        var model = new PatientQuestionnaireModel();
 
        model.validate(function(err) {
            expect(err.errors.questionnaire_id).to.exist;
            done();
        });
    });
});