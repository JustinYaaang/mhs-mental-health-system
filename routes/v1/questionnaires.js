var router = require('express').Router();
var questionnaireController = require('../../controller/v1/questionnaireController');
var JWT = require('../../auth/jwt')
var patient = require('../../auth/patient')
var clinician = require('../../auth/clinician')

router.route('/')
  .get(JWT.verify, patient.verify, clinician.verify, questionnaireController.index)
  .post(JWT.verify_strong, clinician.verify, questionnaireController.new);
router.route('/:id')
  .get(JWT.verify, patient.verify, clinician.verify, questionnaireController.view)
  .patch(JWT.verify_strong, clinician.verify, questionnaireController.update)
  .put(JWT.verify_strong, clinician.verify, questionnaireController.update)
  .delete(JWT.verify_strong, clinician.verify, questionnaireController.delete);

module.exports = router;
