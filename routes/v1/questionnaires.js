var router = require('express').Router();
var questionnaireController = require('../../controller/v1/questionnaireController');
var jwtAuth = require('../../auth/jwt')
var questionnaireAuth = require('../../auth/questionnaireAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, questionnaireAuth.index, questionnaireController.index)
  .post(jwtAuth.verify, questionnaireController.new);

router.route('/:id')
  .get(jwtAuth.verify, questionnaireController.view)
  .patch(jwtAuth.verify, questionnaireController.update)
  .put(jwtAuth.verify, questionnaireController.update)
  .delete(jwtAuth.verify, questionnaireController.delete);

module.exports = router;
