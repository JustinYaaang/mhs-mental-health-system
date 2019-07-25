var router = require('express').Router();
var questionnaireController = require('../../controller/v1/questionnaireController');
var jwtAuth = require('../../auth/jwt')
var questionnaireAuth = require('../../auth/questionnaireAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, questionnaireAuth.index, questionnaireController.index)
  .post(jwtAuth.verify, questionnaireAuth.new, questionnaireController.new, questionnaireAuth.add);

router.route('/:id')
  .get(jwtAuth.verify, questionnaireAuth.view, questionnaireController.view)
  .patch(jwtAuth.verify, questionnaireAuth.update, questionnaireController.update)
  .put(jwtAuth.verify, questionnaireAuth.update, questionnaireController.update)
  .delete(jwtAuth.verify, questionnaireAuth.delete, questionnaireController.delete);

module.exports = router;
