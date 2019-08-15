var PatientQuestionnaireModel = require('../../models/patientquestionnaire')

// Handle index actions
// get: api/PatientQuestionnaires
exports.index = function(req, res) {
  var query = {};
  query.$and = [];
  query.$and.push(req.newquery._id);
  if ('patient_id' in req.query) {
    query.$and.push({
      patient_id: req.query.patient_id
    });
  }
  if ('questionnaire_id' in req.query) {
    query.$and.push({
      questionnaire_id: req.query.questionnaire_id
    });
  }
  PatientQuestionnaireModel.find(query).exec(function(err, models) {
    if (err)
      res.send(err);
    res.send({
      message: "PatientQuestionnaire retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/PatientQuestionnaires
exports.new = function(req, res, next) {
  var models = new PatientQuestionnaireModel(req.body);
  models.save(function(err) {
    if (err)
      res.send(err);
    req.models = models;
    next();
  });
};

// Handle delete question
// delete: api/PatientQuestionnaires/:id
exports.delete = function(req, res) {
  PatientQuestionnaireModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'PatientQuestionnaire deleted'
    });
  });
};
