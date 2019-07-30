var UserModel = require('../models/user')

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  console.log("All subjects", subjects, " <= organisationAuth");
  var result = [];
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "organisations", subject, req.method)) {
      result.push(subject);
    }
  }
  req.query = {
    _id: {
      $in: result
    }
  };
  console.log(req.jwt.id, req.method, result, " <= organisationAuth");
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "organisations", req.body.role, req.method)) {
    UserModel.findOne({
      id: req.jwt.id
    }).exec(function(err, models) {
      if (err)
        res.send(err);
      req.body.organisation_id = models.organisation_id;
    });
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  console.log("adding", req.models, " <= organisationAuth");
  await enforcer.addGroupingPolicy(req.models.id, req.models.role);
  // await enforcer.addGroupingPolicy(req.models.id, req.models.organisation_id);
  await enforcer.addPolicy(req.models.organisation_id, "organisations", req.models.id, "(GET)");
  await enforcer.addPolicy(req.models.id, "organisations", req.models.id, "(GET)");
  res.status(200).send({
    message: 'add successfully',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.change = async (req, res) => {
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
