var ClinicianModel = require('../../models/clinician')
var bcrypt = require('bcrypt');

exports.authenticate = function(req, res, next) {
  ClinicianModel.findOne({
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
        message: 'Clinician not found!',
      });
    }
  });
}

// Handle index actions
// get: api/Clinicians
exports.index = function(req, res) {
  ClinicianModel.find().exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "Clinician retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/Clinicians
exports.new = function(req, res, next) {
  var models = new ClinicianModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    req.models = models;
    next();
  });
};

// Handle view contact info
// get: api/Clinicians/:id
exports.view = function(req, res) {
  ClinicianModel.findById(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Clinician details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/Clinicians/:id
exports.update = function(req, res) {
  ClinicianModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Clinician Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/Clinicians/:id
exports.delete = function(req, res) {
  ClinicianModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Clinician deleted'
    });
  });
};
