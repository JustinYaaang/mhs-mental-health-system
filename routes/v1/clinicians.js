var router = require('express').Router();
var clinicianController = require('../../controller/v1/clinicianController');
var jwtAuth = require('../../auth/jwt')
var clinicianAuth = require('../../auth/clinicianAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/authenticate')
  .post(clinicianController.authenticate, clinicianAuth.authenticate, jwtAuth.generate);

router.route('/')
  .get(jwtAuth.verify, clinicianAuth.index, clinicianController.index)
  .post(jwtAuth.verify, clinicianAuth.new, clinicianController.new, clinicianAuth.add);


router.route('/:id')
  .get(clinicianController.view)
  .patch(clinicianController.update)
  .put(clinicianController.update)
  .delete(clinicianController.delete);

module.exports = router;
