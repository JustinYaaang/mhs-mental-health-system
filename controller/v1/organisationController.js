var OrganisationModel = require('../../models/organisation')

// Handle index actions
// get: api/Organisations
exports.index = function(req, res) {
  OrganisationModel.find(req.query).exec(function(err, models) {
    if (err)
      res.send(err);
    res.send({
      message: "Organisation retrieved successfully",
      data: models
    });
  });
};

// Handle create contact actions
// post: api/Organisations
exports.new = function(req, res) {
  var models = new OrganisationModel(req.body);
  models.save(function(err) {
    if (err)
      res.send(err);
    req.models = models;
    next();
  });
};

// Handle view contact info
// get: api/Organisations/:id
exports.view = function(req, res) {
  OrganisationModel.findById(req.params.id).populate('question_id').exec(function(err, models) {
    if (err)
      res.send(err);
    res.send({
      message: 'Organisation details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/Organisations/:id
exports.update = function(req, res) {
  OrganisationModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Organisation Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/Organisations/:id
exports.delete = function(req, res) {
  OrganisationModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Organisation deleted'
    });
  });
};
