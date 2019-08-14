var router = require('express').Router();
var questionnaire_sJSController = require('../../controller/v1/questionnaire_sJSController');
var jwtAuth = require('../../auth/jwt')
var questionnaireAuth = require('../../auth/questionnaireAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, questionnaireAuth.index, questionnaire_sJSController.index)
  .post(jwtAuth.verify, questionnaireAuth.new, questionnaire_sJSController.new, questionnaireAuth.add);
router.route('/:id')
  .get(jwtAuth.verify, questionnaireAuth.view, questionnaire_sJSController.view)
  .patch(jwtAuth.verify, questionnaireAuth.update, questionnaire_sJSController.update)
  .put(jwtAuth.verify, questionnaireAuth.update, questionnaire_sJSController.update)
  .delete(jwtAuth.verify, questionnaireAuth.delete, questionnaire_sJSController.delete);

router.route('/:id/:status')
  .patch(questionnaire_sJSController.updatewithstatus);
module.exports = router;
