var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose')
require('sinon-mongoose')
var questionnaireController = require('../../controller/v1/questionnaireController');
var QuestionnaireModel = mongoose.model('QuestionnaireModel')


describe('questionnaireController', function() {

    afterEach(() => {
        sinon.restore();
      })

    it('should return all questionnaires', function() {
        
        var req = { query: { } } ;
        var expectedModels = [];

        sinon
        .mock(QuestionnaireModel)
        .expects('find')
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "Questionnaire retrieved successfully",
            data: expectedModels
        };

        const mockResponse = () => {
          const res = {};
          res.send = sinon.stub().returns(res);
          return res;
        };
        const res = mockResponse();

        questionnaireController.index(req, res);
        sinon.assert.calledWith(res.send, result);
        QuestionnaireModel.find.restore();
    });

  it('should create a new questionnaire', async function() {

      var req = {
          body: {}
      };

      const mockResponse = () => {
        const res = {};
        res.send = sinon.stub().returns(res);
        return res;
      };
      const res = mockResponse();

      var next = sinon.stub();
      var model = new QuestionnaireModel(req.body);
      
      sinon
      .mock(model)
      .expects('save')
      .yields(null);
  
      questionnaireController.new(req, res, next);
      // sinon.assert.called(next);
  });


  it('should return questionnaire details', function() {
        
    var req = { params: { id : '123456'} };
    var expectedModels = [];

    sinon
    .mock(QuestionnaireModel)
    .expects('findById')
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
        message: 'Questionnaire details loading..',
        data: expectedModels
    };

    questionnaireController.view(req, res);
    sinon.assert.calledWith(res.send, result);
    QuestionnaireModel.findById.restore();
});

it('should update a questionnaire', function() {
        
  var req = { params: { id : '123456'}, body: { } };
  var expectedModels = [];

  sinon
  .mock(QuestionnaireModel)
  .expects('findByIdAndUpdate')
  .withArgs(req.params.id, req.body)
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
      message: 'Questionnaire Info updated',
      data: expectedModels
  };

  questionnaireController.update(req, res);
  sinon.assert.calledWith(res.status, 200);
  sinon.assert.calledWith(res.send, result);
  QuestionnaireModel.findByIdAndUpdate.restore();
});


  it('should delete an patient questionnaire', function() {
      
      var req = { params: { id : '123456'} };

      sinon
      .mock(QuestionnaireModel)
      .expects('findByIdAndDelete')
      .withArgs(req.params.id)
      .chain('exec')
      .yields(null, [])

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(200).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
        };

      const res = mockResponse();
      var result = {
          message: 'Questionnaire deleted'
      };

      questionnaireController.delete(req, res);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.send, result);
      QuestionnaireModel.findByIdAndDelete.restore();
  });

    it('should return a 404 if deletion fails', function() {
        
      var req = { params: { id : '123456'} };

      sinon
      .mock(QuestionnaireModel)
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

      questionnaireController.delete(req, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.send, "error");
      QuestionnaireModel.findByIdAndDelete.restore();
  });

});

