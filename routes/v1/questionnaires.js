var router = require('express').Router();
var questionnaireController = require('../../controller/v1/questionnaireController');
var JWT = require('../../auth/jwt')
var patient = require('../../auth/patient')
var clinician = require('../../auth/clinician')

router.route('/')
  .get(JWT.verify, patient.verify,  questionnaireController.index)
  .post(JWT.verify_strong,  questionnaireController.new);
router.route('/:id')
  .get(JWT.verify, patient.verify,  questionnaireController.view)
  .patch(JWT.verify_strong,  questionnaireController.update)
  .put(JWT.verify_strong,  questionnaireController.update)
  .delete(JWT.verify_strong,  questionnaireController.delete);

module.exports = router;
