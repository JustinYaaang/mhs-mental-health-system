var PatientAuthModel = require('../models/patientauth')

exports.verify = function(req, res, next) {

  // no login
  if (!req.jwt) {
    req.query.is_public = true;
    req.query.is_published = true;
    next();
  } else {
    if (!req.jwt.is_clinician) {
      PatientAuthModel.find({
        patient_id: req.jwt.id
      }).exec(function(err, models) {
        if (err)
          res.status(404).send(err);
        req.query.id = []
        for (model of models) {
          req.query.id.push(model.questionnaire_id)
        }
        req.query.is_public = true;
        req.query.is_published = true;
        req.query = {
          $or: [{
            $and: [{
                _id: {
                  $in: req.query.id
                }
              },
              {
                is_published: true
              }
            ]
          }, {
            $and: [{
                is_published: true
              },
              {
                is_public: true
              }
            ]
          }]
        }
        console.log(req.query);
        next();
      });
    }
  }


}
