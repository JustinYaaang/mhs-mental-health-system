var router = require('express').Router();
var userController = require('../../controller/v1/userController');
var jwtAuth = require('../../auth/jwt')
var userAuth = require('../../auth/userAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/authenticate')
  .post(userController.authenticate, asyncMiddleware(userAuth.authenticate), jwtAuth.generate);

router.route('/')
  .get(jwtAuth.verify, userAuth.index, userController.index)
  .post(jwtAuth.verify, userController.new);


router.route('/:id')
  .get(jwtAuth.verify, userController.view)
  .patch(jwtAuth.verify, userController.update)
  .put(jwtAuth.verify, userController.update)
  .delete(jwtAuth.verify, userController.delete);

module.exports = router;
