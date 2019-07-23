var router = require('express').Router();
var clinicianController = require('../../controller/v1/clinicianController');
var jwtAuth = require('../../auth/jwt')
var clinicianAuth = require('../../auth/clinicianAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/authenticate')
  .post(clinicianController.authenticate, asyncMiddleware(clinicianAuth.authenticate), jwtAuth.generate);

router.route('/')
  .get(jwtAuth.verify, clinicianAuth.index, clinicianController.index)
  .post(jwtAuth.verify, clinicianAuth.new, clinicianController.new, clinicianAuth.add);


router.route('/:id')
  .get(jwtAuth.verify, clinicianAuth.view, clinicianController.view)
  .patch(jwtAuth.verify, clinicianAuth.update, clinicianController.update)
  .put(jwtAuth.verify, clinicianAuth.update, clinicianController.update)
  .delete(jwtAuth.verify, clinicianAuth.delete, clinicianController.delete);

module.exports = router;
