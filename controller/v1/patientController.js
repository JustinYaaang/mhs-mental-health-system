var PatientModel = require('../../models/patient')
var myJwt = require('../../auth/jwt');
var jwt = require('jsonwebtoken');

exports.authenticate = function(req, res, next) {
  PatientModel.findOne({
    NHS_number: req.body.NHS_number
  }).exec(function(err, models) {
    if (err)
      res.status(404).send(err)
    req.id = models._id;
    next();
  });
}

exports.register = function(req, res, next) {
  var models = new PatientModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    req.id = models._id;
    next();
  });

}
