exports.authenticate = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  await enforcer.getRolesForUser(String(req.models._id)).then((role) =>{
    req.role = role;
  });
  next();
}

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  await enforcer.getRolesForUser(req.jwt.id).then((role) => {
    if (role == 'ROOT') {
      next();
    } else if (role == 'MANAGER') {
      next();
    } else {
      res.status(401).send({
        message: 'Not Allow!',
      });
    }
  });
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "clinicians", req.body.role, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "clinicians", req.params.id, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
}

exports.update = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "clinicians", req.params.id, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "clinicians", req.params.id, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(req.models.id, req.body.role);
  await enforcer.addPolicy(req.models.id, "clinicians", req.models.id, "(GET)|(PUT)")
  res.status(200).send({
    message: 'add successfully',
  });
}
