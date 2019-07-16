var router = require('express').Router();
var patientController = require('../../controller/v1/patientController');
var jwt = require('../../auth/jwt');
var email = require('../../auth/email');


router.route('/authenticate')
  .post(patientController.authenticate, jwt.generate);

router.route('/register')
  .post(patientController.register, email.register);

router.route('/checkemail')
  .get(patientController.checkemail);

router.route('/:id')
  .get(patientController.view)
  .patch(patientController.update)
  .put(patientController.update)
  .delete(patientController.delete);

module.exports = router;
