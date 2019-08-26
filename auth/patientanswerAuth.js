var mongoose = require('mongoose');
var UserModel = require('../models/user');
var OrganisationModel = require('../models/organisation');
var PatientModel = require('../models/patient')

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  console.log("All subjects: ", subjects, " <= patientanswerAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "patientanswers", subject, req.method)) {
      if (req.jwt.id != subject) {
        if (mongoose.Types.ObjectId.isValid(subject)) {
          result.push(mongoose.Types.ObjectId(subject));
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
    console.log(model.organisation_id);
    req.newquery = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        service_id: {
          $in: [mongoose.Types.ObjectId(model.organisation_id)]
        }
      }]
    };
  } else if (role[0] == "STEP3") {
    var model = await UserModel.findOne({
      _id: req.jwt.id
    });

    req.newquery = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        service_id: {
          $in: [mongoose.Types.ObjectId(model.organisation_id)]
        }
      }]
    };
  } else if (role[0] == "SERVICEMANAGER") {
    var model = await UserModel.findOne({
      _id: req.jwt.id
    });
    req.newquery = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        service_id: {
          $in: [mongoose.Types.ObjectId(model.organisation_id)]
        }
      }]
    };
  } else if (role[0] == "TRUSTMANAGER") {
    var user = await UserModel.findOne({
      _id: req.jwt.id
    });
    var organisations = await OrganisationModel.find({
      organisation_id: mongoose.Types.ObjectId(model.organisation_id)
    });
    var organisations_id = [];
    for (organisation of organisations) {
      organisations_id.push(mongoose.Types.ObjectId(organisation._id));
    }
    req.newquery = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        service_id: {
          $in: [mongoose.Types.ObjectId(model.organisation_id)]
        }
      }]
    };

  } else if (role[0] == "ADMIN") {
    req.newquery = {
      $and: [{
        _id: {
          $in: result
        }
      }]
    };

  } else {
    req.newquery = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        patient_id: req.jwt.id
      }]
    };
  }
  console.log(req.newquery, " <= patientanswerAuth");
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "patientanswers", req.body.role, req.method)) {
    req.body.patient_id = req.jwt.id;
    var model = await PatientModel.findOne({
      _id: req.jwt.id
    });
    req.body.service_id = model.service_id;
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addNamedGroupingPolicy("g2", String(req.models._id), String(req.models.role));
  await enforcer.addPolicy(String(req.models.patient_id), "patientanswers", String(req.models._id), "(GET)");
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
