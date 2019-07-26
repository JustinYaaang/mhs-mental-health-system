var router = require('express').Router();
var organisationController = require('../../controller/v1/organisationController');

router.route('/')
  .get(organisationController.index)
  .post(organisationController.new);

router.route('/:id')
  .get(organisationController.view)
  .patch(organisationController.update)
  .put(organisationController.update)
  .delete(organisationController.delete);

module.exports = router;
