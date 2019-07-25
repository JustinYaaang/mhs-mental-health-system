exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "orgainisations", subject, req.method)) {
      result.push(subject);
    }
  }
  req.query = result;
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "orgainisations", req.body.role, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(req.models.id, req.models.role);
  res.status(200).send({
    message: 'add successfully',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "orgainisations", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "orgainisations", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.change = async (req, res) => {
  if (await enforcer.enforce(req.jwt.id, "orgainisations", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "orgainisations", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}