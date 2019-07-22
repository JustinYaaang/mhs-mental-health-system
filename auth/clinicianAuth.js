exports.index = async (req, res, next) => {
  const enforcer = await require('../config/casbin');
  await enforcer.getRolesForUser(req.jwt.id).then((role) => {
    if (role == 'ROOT') {
      console.log(req.query);
      next();
    } else {
      res.status(401).send({
        message: 'Not Allow!',
      });
    }
  });
}

exports.new = async (req, res, next) => {
  const enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "clinicians", req.body.role, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
}

exports.add = async (req, res) => {
  const enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(req.models.id, req.body.role);
  await enforcer.addPolicy(req.models.id, "clinicians", req.models.id, "(GET)|(PUT)")
  res.status(200).send({
    message: 'add successfully',
  });
}
