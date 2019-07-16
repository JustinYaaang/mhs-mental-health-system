const sendEmail = require('../util/sendEmail');

exports.register = function(req, res) {
  var mail = {
      from: 'NHS',
      subject: 'NHS Registration',
      to: req.model.email,
      text: `http://localhost:3000/api/v1/patients/checkemail?email=${req.model.email}&code=${req.model.code}`
  };
  sendEmail(mail);
  res.status(200).send({
    message: 'sent email',
  });
}
