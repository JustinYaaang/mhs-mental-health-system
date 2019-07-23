exports.authenticate = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var role = []
  while (role.length == 0){
    await enforcer.getRolesForUser(String(req.models._id)).then((roles) => {
      role = roles;
    });
  }
  req.role = role;
  next();
}

exports.index = function(req, res, next) {}

exports.new = function(req, res, next) {}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(req.models._id, 'PATIENTS');
  res.status(200).send({
    message: 'check email successfully',
  });
}
