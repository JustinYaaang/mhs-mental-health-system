var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose')
require('sinon-mongoose')
var patientanswerController = require('../../controller/v1/patientanswerController');
var answers = require('../../bin/answers');
var PatientAnswerModel = mongoose.model('PatientAnswerModel')


var a1 = answers.a1;
var a2 = answers.a2;
var a3 = answers.a3;


describe('patientanswerController', function() {

    afterEach(() => {
        sinon.restore();
      })

      //select all 
      it('should return all patient answers', function() {
        
        var req = { newquery: '', query: { startDate: '', endDate: '', groupby: '' } };
        var expectedModels = [a1, a2, a3];

        sinon
        .mock(PatientAnswerModel)
        .expects('find')
        .withArgs(req.newquery)
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "PatientAnswer retrieved successfully",
            data: expectedModels
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(200).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
          };
        const res = mockResponse();

        patientanswerController.index(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientAnswerModel.find.restore();
    });

    //select with startDate || endDate
    it('should return all patient answers between a start and end date', function() {
        
        const mockquery = () => {
            const newquery = {};
            newquery.$and = sinon.stub().returns(newquery);
            newquery.$and.push = sinon.stub().returns(newquery);
            newquery.push = sinon.stub().returns(newquery);
            return newquery;
          };
        var req = { newquery: mockquery() , query: { startDate: '2019-08-06T22:56:46.792+00:00', endDate: '2019-08-06T22:56:46.792+00:00', groupby: '' } };
        var expectedModels = [a1, a2, a3];

        sinon
        .mock(PatientAnswerModel)
        .expects('find')
        .withArgs(req.newquery)
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "PatientAnswer retrieved successfully",
            data: expectedModels
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(200).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
          };
        const res = mockResponse();

        patientanswerController.index(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientAnswerModel.find.restore();
    });

    //select with groupbyDate
    it('should return all patient answers between a start and end date and group by date', function() {
        
        const mockquery = () => {
            const newquery = {};
            newquery.$and = sinon.stub().returns(newquery);
            newquery.$and.push = sinon.stub().returns(newquery);
            newquery.push = sinon.stub().returns(newquery);
            return newquery;
          };
        var req = { newquery: mockquery() , query: { startDate: '2019-08-06T22:56:46.792+00:00', endDate: '2019-08-06T22:56:46.792+00:00', groupby: 'date' } };
        var expectedModels = [a1, a2, a3];

        sinon
        .mock(PatientAnswerModel)
        .expects('aggregate')
        .chain('match')
        .chain('project')
        .chain('group')
        .chain('sort')
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "PatientAnswer groupby retrieved successfully",
            data: expectedModels
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(200).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
          };
        const res = mockResponse();

        patientanswerController.index(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientAnswerModel.aggregate.restore();
    });
    
    it('should create a new patient answer', function() {

        var req = {
            body: a1
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(404).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
        };

        const res = mockResponse();
        var next = sinon.stub();
        var model = new PatientAnswerModel(req.body);
        
        sinon
        .mock(model)
        .expects('save')
        .yields(null);

       patientanswerController.new(req, res, next);
        // sinon.assert.called(next);
    });

    it('should return patient answer', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [a1];
        
        sinon
        .mock(PatientAnswerModel)
        .expects('findById')
        .withArgs(req.params.id)
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: 'PatientAnswer details loading..',
            data: expectedModels
        };

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(200).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
          };

        const res = mockResponse();

        patientanswerController.view(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientAnswerModel.findById.restore();
    });
    
    it('should update patient answer', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [a1];
        
        sinon
        .mock(PatientAnswerModel)
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
            message: 'PatientAnswer Info updated',
            data: expectedModels
        };

        patientanswerController.update(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientAnswerModel.findByIdAndUpdate.restore();
    });

    it('should delete a patient answer', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [a1];

        sinon
        .mock(PatientAnswerModel)
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
            message: 'PatientAnswer deleted'
        };

        patientanswerController.delete(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        PatientAnswerModel.findByIdAndDelete.restore();
    });

});

