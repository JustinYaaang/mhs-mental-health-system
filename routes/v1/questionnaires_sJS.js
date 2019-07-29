var router = require('express').Router();
var questionnaire_sJSController = require('../../controller/v1/questionnaire_sJSController');
var jwtAuth = require('../../auth/jwt')
var questionnaireAuth = require('../../auth/questionnaireAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, questionnaireAuth.index, questionnaireController.index)
  .post(jwtAuth.verify, questionnaireAuth.new, questionnaireController.new, questionnaireAuth.add);

router.route('/:id')
  .get(jwtAuth.verify, questionnaireAuth.view, questionnaireController.view)
  .patch(jwtAuth.verify, questionnaireAuth.update, questionnaireController.update)
  .put(jwtAuth.verify, questionnaireAuth.update, questionnaireController.update)
  .delete(jwtAuth.verify, questionnaireAuth.delete, questionnaireController.delete);


router.route('/')
  /**
   * @swagger
   * /api/v1/questionnaire_sJS:
   *    get:
   *      description: This should return all questionnaires
   */
  .get(jwtAuth.verify, questionnaire_sJSController.index, questionnaireController.index)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS:
   *    post:
   *      description: This will create a new questionnaire
   */
  .post(jwtAuth.verify, questionnaireAuth.new, questionnaire_sJSController.new, questionnaireAuth.add);
router.route('/:id')
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    get:
   *      description: Get a questionnaire by ID
   */
  .get(jwtAuth.verify, questionnaireAuth.view, questionnaire_sJSController.view)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    patch:
   *      description: Update a questionnaire by ID
   */
  .patch(jwtAuth.verify, questionnaireAuth.update, questionnaire_sJSController.update)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    put:
   *      description: Update a questionnaire by ID
   */
  .put(jwtAuth.verify, questionnaireAuth.update, questionnaire_sJSController.update)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    delete:
   *      description: Delete a questionnaire by ID
   */
  .delete(jwtAuth.verify, questionnaireAuth.delete, questionnaire_sJSController.delete);

router.route('/:id/:status')
  .patch(questionnaire_sJSController.updatewithstatus);
module.exports = router;
