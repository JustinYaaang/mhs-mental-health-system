var router = require('express').Router();
var patientquestionnaireController = require('../../controller/v1/patientquestionnaireController');
var jwtAuth = require('../../auth/jwt');
var patientquestionnaireAuth = require('../../auth/patientquestionnaireAuth');
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, patientquestionnaireAuth.index, patientquestionnaireController.index)
  .post(jwtAuth.verify, patientquestionnaireAuth.new, patientquestionnaireController.new, patientquestionnaireAuth.add);

router.route('/:id')
  .delete(jwtAuth.verify, patientquestionnaireAuth.delete, patientquestionnaireController.delete, patientquestionnaireAuth.remove);

module.exports = router;
