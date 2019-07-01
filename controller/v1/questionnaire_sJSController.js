var Questionnaire_sJSModel = require('../../models/questionnaire_sJS')


// Handle index actions
// get: api/questionnaire_sJS
exports.index = function(req, res) {
  Questionnaire_sJSModel.find().exec(function(err, models) {
      if (err)
        res.status(404).send(err);
      res.status(200).send({
        message: "SurveyJS questionnaires retrieved successfully",
        data: models
      });
    });
  };
  
  // Handle create contact actions
  // post: api/questionnaire_sJS
  exports.new = function(req, res) {
    var models = new Questionnaire_sJSModel(req.body);
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
  // get: api/questionnaire_sJS/:id
  exports.view = function(req, res) {
    Questionnaire_sJSModel.findById(req.params.id).populate('_id').exec(function(err, models) {
      if (err)
        res.status(404).send(err);
      res.status(200).send({
        message: 'Questionnaire details loading..',
        data: models
      });
    });
  };
  
  // Handle update questionnaire 
  // put: api/questionnaire_sJS/:id
  exports.update = function(req, res) {
    Questionnaire_sJSModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
      if (err)
        res.status(404).send(err);
      res.status(200).send({
        message: 'Questionnaire Info updated',
        data: models
      });
    });
  };
 
  // Handle update status 
  // put: api/questionnaire_sJS/:id/:status
  exports.update = function(req, res) {
    Questionnaire_sJSModel.findById(id, function (err, doc) {
      if (err)  res.status(404).send(err);
      doc.status = req.params.status;
      doc.save(function(err, models) {
        if (err)
          res.status(404).send(err);
        res.status(200).send({
          message: 'Questionnaire Info updated',
          data: models
        });
      });
    });


   /* Questionnaire_sJSModel.findByIdAndUpdate(req.params.id, req.body).exec(function(err, models) {
      if (err)
        res.status(404).send(err);
      res.status(200).send({
        message: 'Questionnaire Info updated',
        data: models
      });
    });*/



  };






  // Handle delete question
  // delete: api/questionnaire_sJS/:id
  exports.delete = function(req, res) {
    Questionnaire_sJSModel.findByIdAndDelete(req.params.id).exec(function(err, models) {
      if (err)
        res.status(404).send(err);
      res.status(200).send({
        message: 'Questionnaire deleted'
      });
    });
  };