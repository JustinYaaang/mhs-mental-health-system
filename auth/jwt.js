const jwt = require('jsonwebtoken');

exports.generate = function(req, res, next) {
  const token = jwt.sign({
    id: req._id,
    is_clinician: req.is_clinician
  }, req.app.get('secretKey'), {
    expiresIn: '1d'
  });
  return res.status(200).send({
    message: "token sent",
    data: token
  });
}

exports.verify_strong = function(req, res, next) {
  // check header or url parameters or post parameters for token
  // var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    var token = req.headers.authorization.split(' ')[1];
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
      // decode token
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.jwt = decoded;
        // console.log(req.jwt);
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}

exports.verify = function(req, res, next) {
  // check header or url parameters or post parameters for token
  // var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    var token = req.headers.authorization.split(' ')[1];
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
      // decode token
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.jwt = decoded;
        // console.log(req.jwt);
      }
    });
  }
  next();
}
