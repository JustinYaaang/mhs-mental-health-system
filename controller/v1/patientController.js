var PatientModel = require('../../models/patient')

exports.authenticate = function(req, res, next) {
  userModel.findOne({
    NHS_number: req.body.NHS_number
  }).exec(function(err, models) {
    if (err) {
      // register here
    } else {
      const token = jwt.sign({
        id: models._id
      }, req.app.get('secretKey'), {
        expiresIn: '1h'
      });
      res.status(200).send({
        message: "user found!!!",
        data: token
      });
    }
  });
},
