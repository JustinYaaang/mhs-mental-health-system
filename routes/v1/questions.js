var router = require('express').Router();
var questionController = require('../../controller/v1/questionController');

router.route('/')
    .get(questionController.index)
    .post(questionController.new);
router.route('/:id')
    .get(questionController.view)
    .patch(questionController.update)
    .put(questionController.update)
    .delete(questionController.delete);

module.exports = router;
