exports.verify = function(req, res, next) {
  if (req.jwt.is_clinician) {
    next();
  }else{
    return res.status(403).send({
      success: false,
      message: 'Is not clinician.'
    });
  }

}
