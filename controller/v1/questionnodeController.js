var QuestionNodeModel = require('../../models/questionnode')

// Handle index actions
// get: api/QuestionNodes
exports.index = function(req, res) {
  QuestionNodeModel.find({ is_root: 'true' }).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "QuestionNode retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/QuestionNodes
exports.new = function(req, res) {
  var models = new QuestionNodeModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    res.status(201).send({
      message: 'QuestionNode created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/QuestionNodes/:id
exports.view = function(req, res) {
  QuestionNodeModel.findById(req.params.id).populate('question_id').exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'QuestionNode details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/QuestionNodes/:id
exports.update = function(req, res) {
  QuestionNodeModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'QuestionNode Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/QuestionNodes/:id
exports.delete = function(req, res) {
  QuestionNodeModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'QuestionNode deleted'
    });
  });
};
