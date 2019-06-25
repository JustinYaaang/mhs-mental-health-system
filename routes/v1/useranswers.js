var router = require('express').Router();
var useranswerController = require('../../controller/v1/useranswerController');

router.route('/')
    .get(useranswerController.index)
    .post(useranswerController.new);
router.route('/:id')
    .get(useranswerController.view)
    .patch(useranswerController.update)
    .put(useranswerController.update)
    .delete(useranswerController.delete);

module.exports = router;
