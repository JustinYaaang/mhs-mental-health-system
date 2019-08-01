var router = require('express').Router();
var patientquestionnaireController = require('../../controller/v1/patientquestionnaireController');
var jwtAuth = require('../../auth/jwt');
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, patientquestionnaireController.index)
  .post(jwtAuth.verify, patientquestionnaireController.new);

router.route('/:id')
  .get(jwtAuth.verify, patientquestionnaireController.view)
  .patch(jwtAuth.verify, patientquestionnaireController.update)
  .put(jwtAuth.verify, patientquestionnaireController.update)
  .delete(jwtAuth.verify, patientquestionnaireController.delete);

module.exports = router;
