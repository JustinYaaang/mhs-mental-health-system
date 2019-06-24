var router = require('express').Router();
var questionnaireController = require('../../controller/v1/questionnaireController');

router.route('/')
    .get(questionnaireController.index)
    .post(questionnaireController.new);
router.route('/:id')
    .get(questionnaireController.view)
    .patch(questionnaireController.update)
    .put(questionnaireController.update)
    .delete(questionnaireController.delete);

module.exports = router;
