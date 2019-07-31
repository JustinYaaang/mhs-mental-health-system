var mongoose = require('mongoose');
var PatientModel = require('../models/patient')

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  // console.log("All subjects: ", subjects, " <= questionAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "questionnaires", subject, req.method)) {
      if (req.jwt.id != subject) {
        if (mongoose.Types.ObjectId.isValid(subject)) {
          result.push(subject);
        }
      }
    }
  }
  console.log(req.jwt.id, req.method, result, " <= questionAuth");
  var role = []
  await enforcer.getRolesForUser(String(req.jwt.id)).then((roles) => {
    role = roles;
  });

  if (role[0] == "PATIENT") {
    req.query = {
      $and: [{
          _id: {
            $in: result
          }
        },
        {
          is_published: true
        }
      ]
    };
  } else {
    req.query = {
      _id: {
        $in: result
      }
    };
  }
  console.log(req.query, " <= questionnaireAuth");

  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.body.role, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addPolicy(String(req.models._id), "questionnaires", String(req.models._id), "(GET)")
  await enforcer.addNamedGroupingPolicy("g2", String(req.models._id), "QUESTIONNAIRE");
  if (req.models.is_public) {
    await enforcer.addNamedGroupingPolicy("g2", String(req.models._id), "FORM1");
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

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
