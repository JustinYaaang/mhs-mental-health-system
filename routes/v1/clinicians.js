var router = require('express').Router();
var clinicianController = require('../../controller/v1/clinicianController');
var JWT = require('../../auth/jwt')

router.route('/authenticate')
  .post(clinicianController.authenticate, JWT.generate);

router.route('/register')
  .post(clinicianController.register, JWT.generate);

// router.route('/:id')
//   .get(patientController.view)
//   .patch(patientController.update)
//   .put(patientController.update)
//   .delete(patientController.delete);

module.exports = router;
