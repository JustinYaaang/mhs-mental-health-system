var UserModel = require('../models/user')

exports.authenticate = async (req, res, next) => {
  // var enforcer = await require('../config/casbin');
  // var role = []
  // await enforcer.getImplicitRolesForUser(String(req.models._id)).then((roles) => {
  //   role = roles;
  // });
  // req.role = role;
  req.role = req.models.role;
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(req.models._id, 'PATIENT');
  res.status(200).send({
    message: 'check email successfully',
  });
}
