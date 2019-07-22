var router = require('express').Router();
var questionnaire_sJSController = require('../../controller/v1/questionnaire_sJSController');

router.route('/')
  /**
   * @swagger
   * /api/v1/questionnaire_sJS:
   *    get:
   *      description: This should return all questionnaires
   */
  .get(questionnaire_sJSController.index)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS:
   *    post:
   *      description: This will create a new questionnaire
   */
  .post(questionnaire_sJSController.new);
router.route('/:id')
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    get:
   *      description: Get a questionnaire by ID
   */
  .get(questionnaire_sJSController.view)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    patch:
   *      description: Update a questionnaire by ID
   */
  .patch(questionnaire_sJSController.update)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    put:
   *      description: Update a questionnaire by ID
   */
  .put(questionnaire_sJSController.update)
  /**
   * @swagger
   * /api/v1/questionnaire_sJS/:id:
   *    delete:
   *      description: Delete a questionnaire by ID
   */
  .delete(questionnaire_sJSController.delete);

router.route('/:id/:status')
  .patch(questionnaire_sJSController.updatewithstatus);
module.exports = router;
