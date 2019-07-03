var PatientAuthModel = require('../models/patientauth')

exports.verify = function(req, res, next) {

  // no login
  if (!req.jwt){
    req.query.is_public = true;
    req.query.is_published = true;
  }
  next();
}
