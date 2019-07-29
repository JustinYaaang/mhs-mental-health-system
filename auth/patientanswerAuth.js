exports.new = async (req, res, next) => {
  req.body.patient_id = req.jwt.id;
  next();
}
