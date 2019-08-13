var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose')
require('sinon-mongoose')
var organisationController = require('../../controller/v1/organisationController');
var organisations = require('../../bin/organisations');
var OrganisationModel = mongoose.model('OrganisationModel')


var org1 = organisations.org1;
var org2 = organisations.org2;
var org3 = organisations.org3;


describe('organisationController', function() {

    afterEach(() => {
        sinon.restore();
      })

    it('should return all organisations', function() {
        
        var req = { query: '', field: '' };
        var expectedModels = [org1, org2, org3];

        sinon
        .mock(OrganisationModel)
        .expects('find')
        .withArgs(req.query)
        .chain('select')
        .withArgs(req.field)
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "Organisation retrieved successfully",
            data: expectedModels
        };

        var res = {
            send: sinon.stub()
        };

        organisationController.index(req, res);
        sinon.assert.calledWith(res.send, result);
        OrganisationModel.find.restore();
    });

    it('should return return one organisation', function() {
        
        var req = { query: '123456', field: '' };
        var expectedModels = [org1];
        
        sinon
        .mock(OrganisationModel)
        .expects('find')
        .withArgs(req.query)
        .chain('select')
        .withArgs(req.field)
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: "Organisation retrieved successfully",
            data: expectedModels
        };

        var res = {
            send: sinon.stub()
        };

        organisationController.index(req, res);
        sinon.assert.calledWith(res.send, result);
        OrganisationModel.find.restore();
        
    });

    it('should create a new organisation', async function() {

        var req = {
            body: org1
        };

        var res = {
            send: sinon.stub()
        };

        var next = sinon.stub();
        var model = new OrganisationModel(req.body);
        
        sinon
        .mock(model)
        .expects('save')
        .yields(null);

    
       organisationController.new(req, res, next);
        // sinon.assert.called(next);
    });

    it('should return organisation details', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [org1];
        
        sinon
        .mock(OrganisationModel)
        .expects('findById')
        .withArgs(req.params.id)
        .chain('populate')
        .withArgs('question_id')
        .chain('exec')
        .yields(null, expectedModels)

        var result = {
            message: 'Organisation details loading..',
            data: expectedModels
        };

        var res = {
            send: sinon.stub()
        };

        organisationController.view(req, res);
        sinon.assert.calledWith(res.send, result);
        OrganisationModel.findById.restore();
    });
    
    it('should update organisation details', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [org1];
        
        sinon
        .mock(OrganisationModel)
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
            message: 'Organisation Info updated',
            data: expectedModels
        };

        organisationController.update(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        OrganisationModel.findByIdAndUpdate.restore();
    });

    it('should delete an organisation', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [org1];

        sinon
        .mock(OrganisationModel)
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
            message: 'Organisation deleted'
        };

        organisationController.delete(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        OrganisationModel.findByIdAndDelete.restore();
    });

    it('should return all services', function() {
        
        var req = {};
        var expectedModels = [org1];
        
        sinon
        .mock(OrganisationModel)
        .expects('find')
        .withArgs({role: 'SERVICE'})
        .chain('exec')
        .yields(null, expectedModels)

        var res = {
            send: sinon.stub()
        };

        var result = {
            message: 'Organisation retrieved successfully',
            data: expectedModels
        };

        organisationController.fetch(req, res);
        sinon.assert.calledWith(res.send, result);
        OrganisationModel.find.restore();
    });

});

