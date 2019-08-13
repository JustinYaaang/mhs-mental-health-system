var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose')
require('sinon-mongoose')
var questionnaire_sJSController = require('../../controller/v1/questionnaire_sJSController');
var Questionnaire_sJSModel = mongoose.model('Questionnaire_sJSModel')


describe('questionnaire_sJSController', function() {

    afterEach(() => {
        sinon.restore();
      })

    it('should return all questionnaires', function() {
        
        var req = { query: { } } ;
        var expectedModels = [];

        sinon
        .mock(Questionnaire_sJSModel)
        .expects('find')
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "SurveyJS questionnaires retrieved successfully",
            data: expectedModels
        };

        const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(200).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
        };
        const res = mockResponse();

        questionnaire_sJSController.index(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        Questionnaire_sJSModel.find.restore();
    });

    it('should return an 404 error when questionnaires retrieval fails', function() {
        
      var req = { query: { } } ;
            
      sinon
      .mock(Questionnaire_sJSModel)
      .expects('find')
      .chain('exec')
      .yields("error", null)

      const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().withArgs(404).returns(res);
        res.send = sinon.stub().returns(res);
        return res;
      };
      const res = mockResponse();

      questionnaire_sJSController.index(req, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.send, "error");
      Questionnaire_sJSModel.find.restore();
  });

  it('should create a new questionnaire', async function() {

      var req = {
          body: {}
      };

      const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().withArgs(404).returns(res);
        res.send = sinon.stub().returns(res);
        return res;
      };
      const res = mockResponse();

      var next = sinon.stub();
      var model = new Questionnaire_sJSModel(req.body);
      
      sinon
      .mock(model)
      .expects('save')
      .yields(null);
  
      questionnaire_sJSController.new(req, res, next);
      // sinon.assert.called(next);
  });


  it('should return questionnaire details', function() {
        
    var req = { params: { id : '123456'} };
    var expectedModels = [];

    sinon
    .mock(Questionnaire_sJSModel)
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

    questionnaire_sJSController.view(req, res);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, result);
    Questionnaire_sJSModel.findById.restore();
});

it('should update a questionnaire', function() {
        
  var req = { params: { id : '123456'}, body: { } };
  var expectedModels = [];

  sinon
  .mock(Questionnaire_sJSModel)
  .expects('findByIdAndUpdate')
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
      message: 'Questionnaire Info updated',
      data: expectedModels
  };

  questionnaire_sJSController.update(req, res);
  sinon.assert.calledWith(res.status, 200);
  sinon.assert.calledWith(res.send, result);
  Questionnaire_sJSModel.findByIdAndUpdate.restore();
});

it('should update a questionnaire with status', function() {
        
  var req = { params: { id : '123456', status: ''}, body: { } };
  var expectedModels = [];

  const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().withArgs(200).returns(res);
    res.send = sinon.stub().returns(res);
    return res;
  };
  const res = mockResponse();

  const mockDoc = () => {
    const doc = {};
    doc.status = '';
    doc.save = sinon.stub().returns(doc);
    return doc;
  };
  var doc = mockDoc();

  sinon
  .mock(Questionnaire_sJSModel)
  .expects('findById')
  .withArgs(req.params.id, )
  .yields(null, doc)

  var result = {
      message: 'Questionnaire Info updated',
      data: expectedModels
  };

  questionnaire_sJSController.updatewithstatus(req, res);
  // sinon.assert.calledWith(res.status, 200);
  // sinon.assert.calledWith(res.send, result);
  Questionnaire_sJSModel.findById.restore();
});

  it('should delete an patient questionnaire', function() {
      
      var req = { params: { id : '123456'} };

      sinon
      .mock(Questionnaire_sJSModel)
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

      questionnaire_sJSController.delete(req, res);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.send, result);
      Questionnaire_sJSModel.findByIdAndDelete.restore();
  });

    it('should return a 404 if deletion fails', function() {
        
      var req = { params: { id : '123456'} };

      sinon
      .mock(Questionnaire_sJSModel)
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

      questionnaire_sJSController.delete(req, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.send, "error");
      Questionnaire_sJSModel.findByIdAndDelete.restore();
  });

});

