var router = require('express').Router();
var patientanswerController = require('../../controller/v1/patientanswerController');

router.route('/')
    .get(patientanswerController.index)
    .post(patientanswerController.new);
router.route('/:id')
    .get(patientanswerController.view)
    .patch(patientanswerController.update)
    .put(patientanswerController.update)
    .delete(patientanswerController.delete);

module.exports = router;
