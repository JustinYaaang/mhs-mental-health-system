var PatientModel = require('../../models/patient')

exports.authenticate = function(req, res, next) {
  PatientModel.findOne({
    NHS_number: req.body.NHS_number
  }).exec(function(err, models) {
    if (err) {
      // register here
      // save to loacl db
    } else {
      // TODO: if in ers
      const token = jwt.sign({
        id: models._id,
        is_patient: true
      }, req.app.get('secretKey'), {
        expiresIn: '1d'
      });
      res.status(200).send({
        message: "patient found",
        data: token
      });
    }
  });
}
