var router = require('express').Router();
var questionnaireController = require('../../controller/v1/questionnaireController');
var JWT = require('../../auth/jwt')
var questionnaireAuth = require('../../auth/questionnaireAuth')
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};
router.route('/')
  .get(JWT.verify, asyncMiddleware(questionnaireAuth.index), questionnaireController.index)
  .post(JWT.verify, questionnaireController.new);
router.route('/:id')
  .get(JWT.verify, questionnaireController.view)
  .patch(JWT.verify, questionnaireController.update)
  .put(JWT.verify, questionnaireController.update)
  .delete(JWT.verify, questionnaireController.delete);

module.exports = router;
