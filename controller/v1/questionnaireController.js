var QuestionnaireModel = require('../../models/questionnaire')

// Handle index actions
// get: api/questionnaires
exports.index = function(req, res) {
  QuestionnaireModel.find({ is_root: 'true' }).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "Questionnaire retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/questionnaires
exports.new = function(req, res) {
  var models = new QuestionnaireModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    res.status(201).send({
      message: 'Questionnaire created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/questionnaires/:id
exports.view = function(req, res) {
  QuestionnaireModel.findById(req.params.id).populate('question_id').exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Questionnaire details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/questionnaires/:id
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
// delete: api/questionnaires/:id
exports.delete = function(req, res) {
  QuestionnaireModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Questionnaire deleted'
    });
  });
};
