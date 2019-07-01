var router = require('express').Router();
var patientController = require('../../controller/v1/patientController');

router.route('/authenticate')
    .post(patientController.authenticate);

module.exports = router;
