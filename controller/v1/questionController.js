var QuestionModel = require('../../models/question')

// Handle index actions
// get: api/questions
exports.index = function(req, res) {
  QuestionModel.find().exec(function(err, models) {
    if (err)
      res.json(err);
    res.json({
      status: "success",
      message: "Question retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/questions
exports.new = function(req, res) {
  var models = new QuestionModel();
  models.text = req.body.text;
  models.answers = req.body.answers;
  // save the contact and check for errors
  models.save(function(err) {
    if (err)
      res.json(err);
    res.json({
      message: 'New question created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/questions/:id
exports.view = function(req, res) {
  QuestionModel.findById(req.params.id, function(err, models) {
    if (err)
      res.send(err);
    res.json({
      message: 'Question details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/questions/:id
exports.update = function(req, res) {
  QuestionModel.findById(req.params.id, function(err, models) {
    if (err)
      res.send(err);
    models.text = req.body.text;
    models.answers = req.body.answers;
    // save the contact and check for errors
    models.save(function(err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Question Info updated',
        data: models
      });
    });
  });
};

// Handle delete question
// delete: api/questions/:id
exports.delete = function(req, res) {
  QuestionModel.remove({
    _id: req.params.id
  }, function(err, models) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Question deleted'
    });
  });
};
