exports.authenticate = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var role = []
  // while (role.length == 0){
    await enforcer.getRolesForUser(String(req.models._id)).then((roles) => {
      role = roles;
    });
  // }
  req.role = role;
  next();
}

exports.new = async (req, res, next) => {
  req.body.patient_id = req.jwt.id;
  next();
}
