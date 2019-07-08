var ClinicianModel = require('../../models/clinician')

exports.authenticate = function(req, res, next) {
  ClinicianModel.findOne({
    NHS_number: req.body.NHS_number
  }).exec(function(err, models) {
    if (err)
      res.status(404).send(err)
    if(models){
      req.id = models._id;
      req.is_clinician = true;
      next();
    }else{
      res.status(401).send({
        message: 'Clinician not found!',
      });
    }
  });
}

exports.register = function(req, res, next) {
  var models = new ClinicianModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    req.id = models._id;
    req.is_clinician = true;
    next();
  });
}
