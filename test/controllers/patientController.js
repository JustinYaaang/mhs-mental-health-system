
var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose')
require('sinon-mongoose')
var patientController = require('../../controller/v1/patientController');
var patients = require('../../bin/patients');
var PatientModel = mongoose.model('PatientModel')


var p1 = patients.p1;
var p2 = patients.p2;


describe('patientController', function() {

    afterEach(() => {
        sinon.restore();
      })

    //failed authentication with 404
    it('should fail authentication with 404 when patient not found', function() {
        
        var req = { body: { email: '' } };
        var expectedModels = [p1, p2];

        sinon
        .mock(PatientModel)
        .expects('findOne')
        .chain('exec')
        .yields("error", expectedModels)

        var result = {
            message: "PatientAnswer retrieved successfully",
            data: expectedModels
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(404).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
          };
        const res = mockResponse();

        patientController.authenticate(req, res);
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.send, "error");
        PatientModel.findOne.restore();
    });

    //successful authentication
    it('should pass authentication with correct password', function() {
        
      var req = { body: { email: '', password: '1234' } };
      var expectedModels = {is_live : true, password: '$2a$10$zPuYanamfGm3fxwElEpzXOR1takKUlDQz2OIQylvB9MKtBs/fC9uC'};

      sinon
      .mock(PatientModel)
      .expects('findOne')
      .chain('exec')
      .yields(null, expectedModels)

      var res = sinon.stub();
      var next = sinon.stub();


      patientController.authenticate(req, res, next);
      sinon.assert.called(next);
      PatientModel.findOne.restore();
   });

   //failed authentication with 401
   it('should fail authentication with 401 when password is wrong', function() {
        
    var req = { body: { email: '', password: '123' } };
    var expectedModels = {is_live : true, password: '$2a$10$zPuYanamfGm3fxwElEpzXOR1takKUlDQz2OIQylvB9MKtBs/fC9uC'};

    sinon
    .mock(PatientModel)
    .expects('findOne')
    .chain('exec')
    .yields(null, expectedModels)

    var result = {
        message: "wrong password",
    };

    const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().withArgs(401).returns(res);
        res.send = sinon.stub().returns(res);
        return res;
      };
    const res = mockResponse();

    patientController.authenticate(req, res);
    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.send, result);
    PatientModel.findOne.restore();
  });

  //failed authentication with 401
  it('should fail authentication with 401 when account is not active', function() {
        
    var req = { body: { email: ''} };
    var expectedModels = {is_live : false};

    sinon
    .mock(PatientModel)
    .expects('findOne')
    .chain('exec')
    .yields(null, expectedModels)

    var result = {
        message: "no active account",
    };

    const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().withArgs(401).returns(res);
        res.send = sinon.stub().returns(res);
        return res;
      };
    const res = mockResponse();

    patientController.authenticate(req, res);
    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.send, result);
    PatientModel.findOne.restore();
  });

  //failed authentication with 401
  it('should fail authentication with 401 when patient is not found', function() {
        
    var req = { body: { email: ''} };
    var expectedModels = null;

    sinon
    .mock(PatientModel)
    .expects('findOne')
    .chain('exec')
    .yields(null, expectedModels)

    var result = {
        message: "Patient not found!",
    };

    const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().withArgs(401).returns(res);
        res.send = sinon.stub().returns(res);
        return res;
      };
    const res = mockResponse();

    patientController.authenticate(req, res);
    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.send, result);
    PatientModel.findOne.restore();
  });
    
    it('should register a new patient', function() {

        var req = {
            body: p1
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(404).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();
        var next = sinon.stub();
        var models = new PatientModel(req.body);

        sinon
        .mock(models)
        .expects('save')
        .yields(null);

       patientController.register(req, res, next);
      // sinon.assert.called(next);
    });

    it('should update a patient record', function() {
        
      var req = {
        query: p1
        };

      var expectedModels = [p1];

      sinon
      .mock(PatientModel)
      .expects('findOneAndUpdate')
      .withArgs(req.query, {is_live: true})
      .chain('exec')
      .yields(null, expectedModels)

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(404).returns(res);
          return res;
      };

      const res = mockResponse();
      var next = sinon.stub();

      patientController.checkemail(req, res, next);
        // sinon.assert.called(next);
    });

    it('should return all patient records', function() {
    
      var req = { };
      var expectedModels = [p1, p2];

      sinon
      .mock(PatientModel)
      .expects('find')
      .chain('exec')
      .yields(null, expectedModels)

      var result = {
          message: "Patient retrieved successfully",
          data: expectedModels
      };

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(200).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
        };
      const res = mockResponse();

      patientController.index(req, res);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.send, result);
      PatientModel.find.restore();
    });

    it('should create a new patient', function() {

      var req = {
          body: p1
      };

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(201).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
      };
      const res = mockResponse();
      var model = new PatientModel(req.body);
      
      sinon
      .mock(model)
      .expects('save')
      .yields(null);

      var result = {
        message: 'Patient created!',
        data: model
      };

      patientController.new(req, res);
      // sinon.assert.calledWith(res.status, 404);
      // sinon.assert.calledWith(res.send, result);
      // PatientModel.aggregate.restore();
    });

    it('should return patient record', function() {
        
      var req = { params: { id : '123456'} };
      var expectedModels = [p1];
      
      sinon
      .mock(PatientModel)
      .expects('findById')
      .withArgs(req.params.id)
      .chain('exec')
      .yields(null, expectedModels)

      var result = {
          message: 'Patient details loading..',
          data: expectedModels
      };

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(200).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
        };

      const res = mockResponse();

      patientController.view(req, res);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.send, result);
      PatientModel.findById.restore();
  });
    
    it('should update patient answer', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [p1];
        
        sinon
        .mock(PatientModel)
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
            message: 'Patient Info updated',
            data: expectedModels
        };

        patientController.update(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientModel.findByIdAndUpdate.restore();
    });

    it('should delete a patient answer', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [p1];

        sinon
        .mock(PatientModel)
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
            message: 'Patient deleted'
        };

        patientController.delete(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientModel.findByIdAndDelete.restore();
    });

});

