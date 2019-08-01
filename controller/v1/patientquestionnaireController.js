var PatientQuestionnaireModel = require('../../models/patientquestionnaire')

// Handle index actions
// get: api/PatientQuestionnaires
exports.index = function(req, res) {
  PatientQuestionnaireModel.find(req.query).exec(function(err, models) {
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
exports.new = function(req, res) {
  var models = new PatientQuestionnaireModel(req.body);
  models.save(function(err) {
    if (err)
      res.send(err);
    req.models = models;
    next();
  });
};

// Handle view contact info
// get: api/PatientQuestionnaires/:id
exports.view = function(req, res) {
  PatientQuestionnaireModel.findById(req.params.id).exec(function(err, models) {
    if (err)
      res.send(err);
    res.send({
      message: 'PatientQuestionnaire details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/PatientQuestionnaires/:id
exports.update = function(req, res) {
  PatientQuestionnaireModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'PatientQuestionnaire Info updated',
      data: models
    });
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
