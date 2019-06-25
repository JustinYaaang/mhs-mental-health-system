var UserAnswerModel = require('../../models/useranswer')

// Handle index actions
// get: api/useranswers
exports.index = function(req, res) {
  UserAnswerModel.find().exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "UserAnswer retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/useranswers
exports.new = function(req, res) {
  var models = new UserAnswerModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    res.status(201).send({
      message: 'UserAnswer created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/useranswers/:id
exports.view = function(req, res) {
  UserAnswerModel.findById(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'UserAnswer details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/useranswers/:id
exports.update = function(req, res) {
  UserAnswerModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'UserAnswer Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/useranswers/:id
exports.delete = function(req, res) {
  UserAnswerModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'UserAnswer deleted'
    });
  });
};
