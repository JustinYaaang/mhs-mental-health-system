var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose')
require('sinon-mongoose')
var patientquestionnaireController = require('../../controller/v1/patientquestionnaireController');
var PatientQuestionnaireModel = mongoose.model('PatientQuestionnaireModel')


describe('patientquestionnaireController', function() {

    afterEach(() => {
        sinon.restore();
      })

    it('should return all patient questionnaires', function() {
        
        var req = { newquery: { _id: '' }, query: {'patient_id': '', 'questionnaire_id': ''} };
        var expectedModels = [];

        sinon
        .mock(PatientQuestionnaireModel)
        .expects('find')
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "PatientQuestionnaire retrieved successfully",
            data: expectedModels
        };

        var res = {
            send: sinon.stub()
        };

        patientquestionnaireController.index(req, res);
        sinon.assert.calledWith(res.send, result);
        PatientQuestionnaireModel.find.restore();
    });

    it('should return an error when something goes wrong with fetching patient questionnaires', function() {
        
      var req = { newquery: { _id: '' }, query: {'patient_id': '', 'questionnaire_id': ''} };
      sinon
      .mock(PatientQuestionnaireModel)
      .expects('find')
      .chain('exec')
      .yields("error", null)

      var res = {
          send: sinon.stub()
      };

      patientquestionnaireController.index(req, res);
      sinon.assert.calledWith(res.send, "error");
      PatientQuestionnaireModel.find.restore();
  });

    it('should create a new patient questionnaire', async function() {

        var req = {
            body: {}
        };

        var res = {
            send: sinon.stub()
        };

        var next = sinon.stub();
        var model = new PatientQuestionnaireModel(req.body);
        
        sinon
        .mock(model)
        .expects('save')
        .yields(null);
    
       patientquestionnaireController.new(req, res, next);
        // sinon.assert.called(next);
    });

    it('should delete an patient questionnaire', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [];

        sinon
        .mock(PatientQuestionnaireModel)
        .expects('findByIdAndDelete')
        .withArgs(req.params.id)
        .chain('exec')
        .yields(null, expectedModels)

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(200).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
          };

        const res = mockResponse();
        var result = {
            message: 'PatientQuestionnaire deleted'
        };

        patientquestionnaireController.delete(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientQuestionnaireModel.findByIdAndDelete.restore();
    });

    it('should return a 404 if deletion fails', function() {
        
      var req = { params: { id : '123456'} };

      sinon
      .mock(PatientQuestionnaireModel)
      .expects('findByIdAndDelete')
      .withArgs(req.params.id)
      .chain('exec')
      .yields("error", null)

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(404).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
        };

      const res = mockResponse();

      patientquestionnaireController.delete(req, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.send, "error");
      PatientQuestionnaireModel.findByIdAndDelete.restore();
  });

});

