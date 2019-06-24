var QuestionnaireModel = require('../../models/questionnaire')

// Handle index actions
// get: api/questions
exports.index = function(req, res) {
  QuestionnaireModel.find({ is_root: 'true' }).exec(function(err, models) {
    if (err)
      res.json(err);
    res.json({
      status: "success",
      message: "Questionnaire retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/questions
exports.new = function(req, res) {
  var models = new QuestionnaireModel();
  models.question_id = req.body.question_id;
  // save the contact and check for errors
  models.save(function(err) {
    if (err)
      res.json(err);
    res.json({
      message: 'New Questionnaire created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/questions/:id
exports.view = function(req, res) {
  QuestionnaireModel.find({ _id: req.params.id}).populate('question_id').exec(function(err, models) {
    if (err)
      res.send(err);
    res.json({
      message: 'Questionnaire details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/questions/:id
exports.update = function(req, res) {
  QuestionnaireModel.findById(req.params.id, function(err, models) {
    if (err)
      res.send(err);
    models.question_id = req.body.question_id;
    // save the contact and check for errors
    models.save(function(err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Questionnaire Info updated',
        data: models
      });
    });
  });
};

// Handle delete question
// delete: api/questions/:id
exports.delete = function(req, res) {
  QuestionnaireModel.remove({
    _id: req.params.id
  }, function(err, questionnaire) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Questionnaire deleted'
    });
  });
};
