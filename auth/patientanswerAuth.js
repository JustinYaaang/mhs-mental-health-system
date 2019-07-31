var mongoose = require('mongoose');
var UserModel = require('../models/user');
var OrganisationModel = require('../models/organisation');

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  console.log("All subjects: ", subjects, " <= patientanswerAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "patientanswers", subject, req.method)) {
      if (req.jwt.id != subject) {
        if (mongoose.Types.ObjectId.isValid(subject)) {
          result.push(subject);
        }
      }
    }
  }
  console.log(req.jwt.id, req.method, result, " <= patientanswerAuth");

  var role = []
  await enforcer.getRolesForUser(String(req.jwt.id)).then((roles) => {
    role = roles;
  });

  if (role[0] == "STEP2") {
    var model = await UserModel.findOne({
      _id: req.jwt.id
    });
    req.query = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        service_id: model.organisation_id
      }, {
        score: {
          $lt: 7
        },
      }]
    };
  } else if (role[0] == "STEP3") {
    var model = await UserModel.findOne({
      _id: req.jwt.id
    });

    req.query = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        service_id: model.organisation_id
      }, {
        score: {
          $gt: 7
        },
      }]
    };
  } else if (role[0] == "SERVICEMANAGER") {
    var model = await UserModel.findOne({
      _id: req.jwt.id
    });
    req.query = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        service_id: model.organisation_id
      }]
    };
  } else {
    req.query = {
      _id: {
        $in: result
      }
    };
  }
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "patientanswers", req.body.role, req.method)) {
    req.body.patient_id = req.jwt.id;
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addNamedGroupingPolicy("g2", req.models._id, req.models.role);
  await enforcer.addPolicy(String(req.jwt.id), "patientanswers", String(req.models._id), "(GET)");
  await enforcer.addPolicy(String(req.models._id), "patientanswers", String(req.models._id), "(GET)")
  res.status(200).send({
    message: 'Added',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "patientanswers", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "patientanswers", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "patientanswers", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}