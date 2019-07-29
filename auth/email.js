var sendEmail = require('../util/sendEmail');

exports.register = function(req, res) {
  var mail = {
      from: 'NHS',
      subject: 'NHS Registration',
      to: req.models.email,
      text: `http://localhost:3000/api/v1/patients/checkemail?email=${req.models.email}&code=${req.models.code}`
  };
  sendEmail(mail);
  res.status(200).send({
    message: 'sent email',
  });
}
