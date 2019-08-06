var router = require('express').Router();
var userController = require('../../controller/v1/userController');
var jwtAuth = require('../../auth/jwt')
var userAuth = require('../../auth/userAuth')
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/authenticate')
  .post(userController.authenticate, asyncMiddleware(userAuth.authenticate), jwtAuth.generate);

router.route('/')
  .get(jwtAuth.verify, userAuth.index, userController.index)
  .post(jwtAuth.verify, userAuth.new, userController.new, userAuth.add);


router.route('/:id')
  .get(jwtAuth.verify, userAuth.view, userController.view)
  .patch(jwtAuth.verify, userAuth.update, userController.update)
  .put(jwtAuth.verify, userAuth.update, userController.update)
  .delete(jwtAuth.verify, userAuth.delete, userController.delete);

module.exports = router;
