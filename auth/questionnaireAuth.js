exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  console.log("All subjects: ", subjects, " <= questionAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "questionnaires", subject, req.method)) {
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
  console.log(req.jwt.id, req.method, result, " <= questionAuth");
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", "QUESTIONNAIRE", req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addPolicy(req.models._id, "questionnaires", req.models._id, "GET")
  await enforcer.addGroupingPolicy(req.models._id, "QUESTIONNAIRE");
  if (req.models.is_public) {
    await enforcer.addGroupingPolicy(req.models._id, "FORM1");
  }
  res.status(200).send({
    message: 'Added',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.change = async (req, res) => {
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
