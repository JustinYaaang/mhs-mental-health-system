var PatientModel = require('../../models/patient')
var sendEmail = require('../../util/sendEmail');
var bcrypt = require('bcryptjs');

exports.authenticate = function(req, res, next) {
  PatientModel.findOne({
    email: req.body.email,
  }).exec(function(err, models) {
    if (err)
      res.status(404).send(err)
    if (models) {
      if (models.is_live){
        if (bcrypt.compareSync(req.body.password, models.password)){
          req.models = models;
          next();
        }else {
          res.status(401).send({
            message: 'wrong password',
          });
        }
      }else{
        res.status(401).send({
          message: 'no active account',
        });
      }
    } else {
      res.status(401).send({
        message: 'Patient not found!',
      });
    }
  });
}

exports.register = function(req, res, next) {
  var models = new PatientModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    console.log(models);
    req.model = models;
    next();
  });
}

exports.checkemail = function(req, res, next) {
  PatientModel.findOneAndUpdate(req.query, {
    is_live: true
  }).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    console.log(models);
    req.models = models;
    next();
  });

}

// Handle index actions
// get: api/Patients
exports.index = function(req, res) {
  PatientModel.find().exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "Patient retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/Patients
exports.new = function(req, res) {
  var models = new PatientModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    res.status(201).send({
      message: 'Patient created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/Patients/:id
exports.view = function(req, res) {
  PatientModel.findById(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Patient details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/Patients/:id
exports.update = function(req, res) {
  PatientModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Patient Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/Patients/:id
exports.delete = function(req, res) {
  PatientModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Patient deleted'
    });
  });
};
