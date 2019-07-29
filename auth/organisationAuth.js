exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  console.log(subjects);
  var result = [];
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "organisations", subject, req.method)) {
      result.push(subject);
    }
  }
  console.log(req.jwt.id, " get ", result);
  req.query = {
    _id: {
      $in: result
    }
  };
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "organisations", req.body.role, req.method)) {
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
  await enforcer.addPolicy(req.models.id, "organisations", req.models.id, "GET")
  res.status(200).send({
    message: 'add successfully',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.change = async (req, res) => {
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {
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
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
