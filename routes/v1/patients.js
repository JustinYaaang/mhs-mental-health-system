var router = require('express').Router();
var patientController = require('../../controller/v1/patientController');
var jwtAuth = require('../../auth/jwt');
var patientAuth = require('../../auth/patientAuth');
var email = require('../../auth/email');
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/authenticate')
  .post(patientController.authenticate, asyncMiddleware(patientAuth.authenticate), jwtAuth.generate);

router.route('/register')
  .post(patientController.register,
    // email.register,
    patientAuth.add
  );

router.route('/checkemail')
  .get(patientController.checkemail, patientAuth.add);

router.route('/')
  .get(jwtAuth.verify, patientAuth.index, patientController.index)

router.route('/:id')
  .get(jwtAuth.verify, patientAuth.view, patientController.view)
  .patch(jwtAuth.verify, patientAuth.update, patientController.update)
  .put(jwtAuth.verify, patientAuth.update, patientController.update)

module.exports = router;
