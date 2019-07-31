var router = require('express').Router();
var patientanswerController = require('../../controller/v1/patientanswerController');
var jwtAuth = require('../../auth/jwt');
var patientanswerAuth = require('../../auth/patientanswerAuth');
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, patientanswerAuth.index, patientanswerController.index)
  .post(jwtAuth.verify, patientanswerAuth.new, patientanswerController.new, patientanswerAuth.add);

router.route('/:id')
  .get(jwtAuth.verify, patientanswerAuth.view, patientanswerController.view)
  .patch(jwtAuth.verify, patientanswerAuth.update, patientanswerController.update)
  .put(jwtAuth.verify, patientanswerAuth.update, patientanswerController.update)
  .delete(jwtAuth.verify, patientanswerAuth.delete, patientanswerController.delete);

module.exports = router;
