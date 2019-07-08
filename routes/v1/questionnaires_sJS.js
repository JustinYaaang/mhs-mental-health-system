var router = require('express').Router();
var questionnaire_sJSController = require('../../controller/v1/questionnaire_sJSController');

router.route('/')
    .get(questionnaire_sJSController.index)
    .post(questionnaire_sJSController.new);
router.route('/:id')
    .get(questionnaire_sJSController.view)
    .patch(questionnaire_sJSController.update)
    .put(questionnaire_sJSController.update)
    .delete(questionnaire_sJSController.delete);

router.route('/:id/:status')
    .patch(questionnaire_sJSController.updatewithstatus);
module.exports = router;
