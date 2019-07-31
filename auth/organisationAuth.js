var mongoose = require('mongoose');
var UserModel = require('../models/user')

exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  // console.log("All subjects", subjects, " <= organisationAuth");
  var result = [];
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "organisations", subject, req.method)) {
      if (mongoose.Types.ObjectId.isValid(subject)) {
        result.push(subject);
      }
    }
  }
  console.log(req.jwt.id, req.method, result, " <= organisationAuth");
  // Object.assign(obj1, obj2);

  var model = await UserModel.findOne({
    _id: req.jwt.id
  });
  if (model.role != "MAP") {
    req.query = {
      $and: [{
        _id: {
          $in: result
        }
      }, {
        organisation_id: model.organisation_id
      }]
    };
  } else {
    req.field = "postcode"
  }
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "organisations", req.body.role, req.method)) {
    var model = await UserModel.findOne({
      _id: req.jwt.id
    });
    req.body.organisation_id = model.organisation_id;
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
  await enforcer.addNamedGroupingPolicy("g2", String(req.models._id), String(req.models.role));
  await enforcer.addPolicy(String(req.models._id), "organisations", String(req.models._id), "(GET)");
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

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "organisations", req.params.id, req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
