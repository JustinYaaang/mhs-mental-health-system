
var expect = require('chai').expect;
var sinon = require('sinon');
var mongoose = require('mongoose')
require('sinon-mongoose')
var userController = require('../../controller/v1/userController');
var users = require('../../bin/users');
var UserModel = mongoose.model('UserModel')

var user1 = users.user1;
var user2 = users.user2;

describe('userController', function() {

    afterEach(() => {
        sinon.restore();
      })

    //failed authentication with 404
    it('should fail authentication with 404 when an error occurs', function() {
        
        var req = { body: { email: '' } };
        var next = sinon.stub();

        sinon
        .mock(UserModel)
        .expects('findOne')
        .chain('exec')
        .yields("error", null)

        const mockResponse = () => {
            const res = {};
            res.status = sinon.stub().withArgs(404).returns(res);
            res.send = sinon.stub().returns(res);
            return res;
          };
        const res = mockResponse();

        userController.authenticate(req, res, next);
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.send, "error");
        UserModel.findOne.restore();
    });

    //successful authentication
    it('should pass authentication with correct password', function() {
        
      var req = { body: { email: '', password: '1234' } };
      var expectedModels = {password: '$2a$10$zPuYanamfGm3fxwElEpzXOR1takKUlDQz2OIQylvB9MKtBs/fC9uC'};

      sinon
      .mock(UserModel)
      .expects('findOne')
      .chain('exec')
      .yields(null, expectedModels)

      var res = sinon.stub();
      var next = sinon.stub();


      userController.authenticate(req, res, next);
      sinon.assert.called(next);
      UserModel.findOne.restore();
   });

   //failed authentication with 401
   it('should fail authentication with 401 when password is wrong', function() {
        
    var req = { body: { email: '', password: '123' } };
    var expectedModels = {password: '$2a$10$zPuYanamfGm3fxwElEpzXOR1takKUlDQz2OIQylvB9MKtBs/fC9uC'};

    sinon
    .mock(UserModel)
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

    userController.authenticate(req, res);
    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.send, result);
    UserModel.findOne.restore();
  });

  //failed authentication with 401
  it('should fail authentication with 401 when user is not found', function() {
        
    var req = { body: { email: ''} };

    sinon
    .mock(UserModel)
    .expects('findOne')
    .chain('exec')
    .yields(null, null)

    var result = {
        message: "User not found!",
    };

    const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().withArgs(401).returns(res);
        res.send = sinon.stub().returns(res);
        return res;
      };
    const res = mockResponse();

    userController.authenticate(req, res);
    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.send, result);
    UserModel.findOne.restore();
  });

    it('should return all user records', function() {
    
      var req = { };
      var expectedModels = [user1, user2];

      sinon
      .mock(UserModel)
      .expects('find')
      .chain('exec')
      .yields(null, expectedModels)

      var result = {
          message: "User retrieved successfully",
          data: expectedModels
      };

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(200).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
        };
      const res = mockResponse();

      userController.index(req, res);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.send, result);
      UserModel.find.restore();
    });

    it('should create a new user', function() {

      var next = sinon.stub();
      var req = {
          body: user1
      };

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(201).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
      };
      const res = mockResponse();
      var model = new UserModel(req.body);
      
      sinon
      .mock(model)
      .expects('save')
      .yields(null);

      userController.new(req, res, next);
      // sinon.assert.calledWith(res.status, 404);
      // sinon.assert.calledWith(res.send, result);
      // UserModel.aggregate.restore();
    });

    it('should return user record', function() {
        
      var req = { params: { id : '123456'} };
      var expectedModels = [user1];
      
      sinon
      .mock(UserModel)
      .expects('findById')
      .withArgs(req.params.id)
      .chain('populate')
      .withArgs('organisation_id')
      .chain('exec')
      .yields(null, expectedModels)

      var result = {
          message: 'User details loading..',
          data: expectedModels
      };

      const mockResponse = () => {
          const res = {};
          res.status = sinon.stub().withArgs(200).returns(res);
          res.send = sinon.stub().returns(res);
          return res;
        };
      const res = mockResponse();

      userController.view(req, res);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.send, result);
      UserModel.findById.restore();
  });
    
    it('should update user record', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [user1];
        
        sinon
        .mock(UserModel)
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
            message: 'User Info updated',
            data: expectedModels
        };

        userController.update(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        UserModel.findByIdAndUpdate.restore();
    });

    it('should delete a user record', function() {
        
        var req = { params: { id : '123456'} };
        var expectedModels = [user1];

        sinon
        .mock(UserModel)
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
            message: 'User deleted'
        };

        userController.delete(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.send, result);
        UserModel.findByIdAndDelete.restore();
    });

});

