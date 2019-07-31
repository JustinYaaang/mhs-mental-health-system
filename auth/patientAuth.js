var mongoose = require('mongoose');
var UserModel = require('../models/user')

exports.authenticate = async (req, res, next) => {
  // var enforcer = await require('../config/casbin');
  // var role = []
  // await enforcer.getImplicitRolesForUser(String(req.models._id)).then((roles) => {
  //   role = roles;
  // });
  // req.role = role;
  req.role = req.models.role;
  next();
}

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  // console.log("All subjects: ", subjects, " <= questionAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "patients", subject, req.method)) {
      if (req.jwt.id != subject) {
        if (mongoose.Types.ObjectId.isValid(subject)) {
          result.push(subject);
        }
      }
    }
  }
  console.log(req.jwt.id, req.method, result, " <= patientAuth");
  var role = []
  await enforcer.getRolesForUser(String(req.jwt.id)).then((roles) => {
    role = roles;
  });

  if (role[0] == "PATIENT") {
    req.query = {
      _id: {
        $in: result
      }
    };
  } else {
  }
  console.log(req.query, " <= patientAuth");

  next();
}

exports.new = async (req, res, next) => {
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy("g", req.models._id, 'PATIENT');
  await enforcer.addGroupingPolicy("g2", req.models._id, 'PATIENT');
  await enforcer.addPolicy(String(req.models._id), "patients", String(req.models._id), "(GET)|(PUT)")
  res.status(200).send({
    message: 'check email successfully',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    req.params.id = req.jwt.id;
  }
  if (await enforcer.enforce(req.jwt.id, "patients", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    req.params.id = req.jwt.id;
  }
  if (await enforcer.enforce(req.jwt.id, "patients", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
