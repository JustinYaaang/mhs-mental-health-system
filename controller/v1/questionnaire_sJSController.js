var Questionnaire_sJSModel = require('../../models/questionnaire_sJS')


// Handle index actions
// get: api/questionnaire_sJS
exports.index = function (req, res) {
  Questionnaire_sJSModel.find(req.query).select('title description status').exec(function (err, models){
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: "SurveyJS questionnaires retrieved successfully",
      data: models
    });
  });
};

// Handles the create new questionnaire action
// post: api/questionnaire_sJS
exports.new = function (req, res, next) {
  var models = new Questionnaire_sJSModel(req.body);
  models.save(function (err) {
    if (err)
      res.status(404).send(err);
    req.models = models;
    next();
  });
};

// Handle view questionnaire by given ID
// get: api/questionnaire_sJS/:id
exports.view = function (req, res) {
  Questionnaire_sJSModel.findById(req.params.id).exec(function (err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Questionnaire details loading..',
      data: models
    });
  });
};

// Handle update questionnaire action
// put: api/questionnaire_sJS/:id
exports.update = function (req, res) {
  Questionnaire_sJSModel.findByIdAndUpdate(req.params.id, req.body).exec(function (err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Questionnaire Info updated',
      data: models
    });
  });
};

// Handle update status action by given a questionnaire id and the new status text
// put: api/questionnaire_sJS/:id/:status
exports.updatewithstatus = function (req, res) {
  Questionnaire_sJSModel.findById(req.params.id, function (err, doc) {
    if (err) {
      res.status(404).send(err); //exit here
    } else {
      doc.status = req.params.status;
      doc.save(function (err, models) {
        res.status(200).send({
          message: 'Questionnaire Info updated',
          data: models
        });
      });
    }
  });
};



// Handle delete questionnaire action given a ID
// delete: api/questionnaire_sJS/:id
exports.delete = function (req, res) {
  Questionnaire_sJSModel.findByIdAndDelete(req.params.id).exec(function (err, models) {
    if (err)
      res.status(404).send(err);
    res.status(200).send({
      message: 'Questionnaire deleted'
    });
  });
};
