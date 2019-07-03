const jwt = require('jsonwebtoken');

exports.generate = function(req, res, next) {
  const token = jwt.sign({
    id: req._id
  }, req.app.get('secretKey'), {
    expiresIn: '1d'
  });
  return res.status(200).send({
    message: "token sent",
    data: token
  });
}

exports.verify = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
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
