var PatientAnswerModel = require('../../models/patientanswer')

// Handle index actions
// get: api/patientanswers
exports.index = function(req, res) {
  var query = {};
  if (req.query.startDate || req.query.endDate) {
    query.createdAt = {};
    query.createdAt.$gte = new Date(req.query.startDate);
    query.createdAt.$lt = new Date(req.query.endDate);
  }

  if (req.query.groupby == 'date') {
    PatientAnswerModel.aggregate()
      .match(query)
      .project({
        'dow': {
          '$dayOfWeek': '$createdAt'
        },
        'date': {
          '$dateToString': {
            'format': '%Y-%m-%d',
            'date': '$createdAt'
          }
        }
      })
      .group({
        _id: '$date',
        dayOfWeek: {
          $avg: '$dow'
        },
        count: {
          '$sum': 1
        }
      }).sort({
        _id: 1
      }).exec(function(err, results) {
        if (err)
          res.status(404).send(err);
        res.status(200).send({
          message: 'PatientAnswer retrieved successfully',
          data: results
        });
      });
  } else {

    PatientAnswerModel.find(query).exec(function(err, models) {
      if (err)
        res.status(404).send(err);
      res.status(200).send({
        message: 'PatientAnswer retrieved successfully',
        data: models
      });
    });
  }
};

// Handle create contact actions
// post: api/patientanswers
exports.new = function(req, res) {
  var models = new PatientAnswerModel(req.body);
  models.save(function(err) {
    if (err)
      res.status(404).send(err);
    res.status(201).send({
      message: 'PatientAnswer created!',
      data: models
    });
  });
};

// Handle view contact info
// get: api/patientanswers/:id
exports.view = function(req, res) {
  PatientAnswerModel.findById(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'PatientAnswer details loading..',
      data: models
    });
  });
};

// Handle update contact info
// put: api/patientanswers/:id
exports.update = function(req, res) {
  PatientAnswerModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'PatientAnswer Info updated',
      data: models
    });
  });
};

// Handle delete question
// delete: api/patientanswers/:id
exports.delete = function(req, res) {
  PatientAnswerModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'PatientAnswer deleted'
    });
  });
};
