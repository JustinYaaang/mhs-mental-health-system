exports.authenticate = async (req, res, next) => {
  // var enforcer = await require('../config/casbin');
  // var role = []
  // // while (role.length == 0) {
  // await enforcer.getImplicitRolesForUser(String(req.models._id)).then((roles) => {
  //   role = roles;
  // });
  // // };
  // req.role = role;
  req.role = req.models.role;
  next();
}

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  console.log("All subjects", subjects, " <= userAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "users", subject, req.method)) {
      if (req.jwt.id != subject) {
        result.push(subject);
      }
    }
  }
  req.query = {
    _id: {
      $in: result
    }
  };
  console.log(req.jwt.id, req.method, result, " <= userAuth");
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "users", req.body.role, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  var role = []
  console.log("adding", req.models, " <= userAuth");
  await enforcer.addGroupingPolicy(req.models.id, req.models.organisation_id);
  await enforcer.addPolicy(req.models.id, "organisations", req.models.organisation_id, "GET");
  await enforcer.addPolicy(req.models.id, "users", req.models.id, "(GET)|(PUT)");
  res.status(200).send({
    message: 'add successfully',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "users", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "users", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "users", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
