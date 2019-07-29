var router = require('express').Router();
var patientController = require('../../controller/v1/patientController');
var jwtAuth = require('../../auth/jwt');
var patientAuth = require('../../auth/patientAuth');
var email = require('../../auth/email');
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/authenticate')
  .post(patientController.authenticate, asyncMiddleware(patientAuth.authenticate), jwtAuth.generate);

router.route('/register')
  .post(patientController.register, email.register);

router.route('/checkemail')
  .get(patientController.checkemail, patientAuth.add);

router.route('/')
  .get(patientController.index)
  .post(patientController.new);

router.route('/:id')
  .get(patientController.view)
  .patch(patientController.update)
  .put(patientController.update)
  .delete(patientController.delete);

module.exports = router;
