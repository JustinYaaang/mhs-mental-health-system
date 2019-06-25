var QuestionModel = require('../../models/question')

// Handle index actions
// get: api/questions
exports.index = function(req, res) {
  QuestionModel.find().exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "Question retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/questions
exports.new = function(req, res) {
  var models = new QuestionModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    res.status(201).send({
      message: 'Question created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/questions/:id
exports.view = function(req, res) {
  QuestionModel.findById(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Question details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/questions/:id
exports.update = function(req, res) {
  QuestionModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Question Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/questions/:id
exports.delete = function(req, res) {
  QuestionModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Question deleted'
    });
  });
};
