var PatientAuthModel = require('../models/patientauth')

exports.index = function(req, res, next) {}

exports.new = function(req, res, next) {}

exports.add = async (req, res) => {
  const enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(req.models._id, 'PATIENTS');
  res.status(200).send({
    message: 'check email successfully',
  });
}
