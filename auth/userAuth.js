var mongoose = require('mongoose');
var UserModel = require('../models/user');
var OrganisationModel = require('../models/organisation');

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
  // console.log("All subjects", subjects, " <= userAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "users", subject, req.method)) {
      if (mongoose.Types.ObjectId.isValid(subject)){
        result.push(subject);
      }
    }
  }
  var model = await UserModel.findOne({
    _id: req.jwt.id
  });

  var models = await OrganisationModel.find({
    organisation_id: model.organisation_id
  });

  var organisation_ids = [];
  for (model of models) {
    organisation_ids.push(model._id);
  }

  req.query = {
    $and: [{
      _id: {
        $in: result
      }
    }, {
      organisation_id: {
        $in: organisation_ids
      }
    }]
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
  await enforcer.addNamedGroupingPolicy("g", String(req.models._id), String(req.models.role));
  await enforcer.addPolicy(String(req.models._id), "users", String(req.models._id), "(GET)|(PUT)");
  res.status(200).send({
    message: 'add successfully',
  });
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    req.params.id = req.jwt.id;
  }
  if (await enforcer.enforce(req.jwt.id, "users", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    req.params.id = req.jwt.id;
  }
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
