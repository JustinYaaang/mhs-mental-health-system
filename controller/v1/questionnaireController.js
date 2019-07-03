var QuestionnaireModel = require('../../models/questionnaire')

// Handle index actions
// get: api/Questionnaires
exports.index = function(req, res) {
  QuestionnaireModel.find(req.query).exec(function(err, models) {
    if (err)
      res.send(err);
    res.send({
      message: "Questionnaire retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/Questionnaires
exports.new = function(req, res) {
  var models = new QuestionnaireModel(req.body);
  models.save(function(err) {
    if (err)
      res.send(err);
    res.send({
      message: 'Questionnaire created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/Questionnaires/:id
exports.view = function(req, res) {
  QuestionnaireModel.findById(req.params.id).populate('question_id').exec(function(err, models) {
    if (err)
      res.send(err);
    res.send({
      message: 'Questionnaire details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/Questionnaires/:id
exports.update = function(req, res) {
  QuestionnaireModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Questionnaire Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/Questionnaires/:id
exports.delete = function(req, res) {
  QuestionnaireModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Questionnaire deleted'
    });
  });
};
