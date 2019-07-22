exports.authenticate = async (req, res, next) => {
  const enforcer = await require('../config/casbin');
  await enforcer.getRolesForUser(String(req.models._id)).then((role) =>{
    req.role = role;
  });
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
