var router = require('express').Router();
var questionnaireController = require('../../controller/v1/questionnaireController');
var JWT = require('../../auth/jwt')
var patient = require('../../auth/patient')

router.route('/')
    .get(JWT.verify, patient.verify, questionnaireController.index)
    .post(JWT.verify_strong,questionnaireController.new);
router.route('/:id')
    .get(questionnaireController.view)
    .patch(questionnaireController.update)
    .put(questionnaireController.update)
    .delete(questionnaireController.delete);

module.exports = router;
