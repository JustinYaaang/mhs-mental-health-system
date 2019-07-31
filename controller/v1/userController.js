var UserModel = require('../../models/user')
var bcrypt = require('bcryptjs');

exports.authenticate = function(req, res, next) {
  UserModel.findOne({
    email: req.body.email,
  }).exec(function(err, models) {
    if (err)
      res.status(404).send(err)
    if (models) {
      if (bcrypt.compareSync(req.body.password, models.password)) {
        req.models = models;
        next();
      } else {
        res.status(401).send({
          message: 'wrong password',
        });
      }
    } else {
      res.status(401).send({
        message: 'User not found!',
      });
    }
  });
}

// Handle index actions
// get: api/Users
exports.index = function(req, res) {
  UserModel.find(req.query).populate('organisation').exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "User retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/Users
exports.new = function(req, res, next) {
  var models = new UserModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    req.models = models;
    next();
  });
};

// Handle view contact info
// get: api/Users/:id
exports.view = function(req, res) {
  UserModel.findById(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'User details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/Users/:id
exports.update = function(req, res) {
  UserModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'User Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/Users/:id
exports.delete = function(req, res) {
  UserModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'User deleted'
    });
  });
};
