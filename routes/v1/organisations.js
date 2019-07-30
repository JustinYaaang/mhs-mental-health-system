var router = require('express').Router();
var organisationController = require('../../controller/v1/organisationController');
var jwtAuth = require('../../auth/jwt');
var organisationAuth = require('../../auth/organisationAuth');
var asyncMiddleware = require('../../util/asyncMiddleware')

router.route('/')
  .get(jwtAuth.verify, organisationAuth.index, organisationController.index)
  .post(jwtAuth.verify, organisationAuth.new, organisationController.new, organisationAuth.add);

router.route('/:id')
  .get(jwtAuth.verify, organisationAuth.view, organisationController.view)
  .patch(jwtAuth.verify, organisationAuth.update, organisationController.update)
  .put(jwtAuth.verify, organisationAuth.update, organisationController.update)
  .delete(jwtAuth.verify, organisationAuth.delete, organisationController.delete);



module.exports = router;
