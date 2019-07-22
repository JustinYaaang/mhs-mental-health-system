var router = require('express').Router();
var patientController = require('../../controller/v1/patientController');
var jwt = require('../../auth/jwt');
var email = require('../../auth/email');
var patientAuth = require('../../auth/patientAuth');
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

/**
 * @swagger
 *
 * /api/v1/patients/authenticate:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.route('/authenticate')
  .post(patientController.authenticate, jwt.generate);

/**
 * @swagger
 *
 * /api/v1/patients/register:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: token
 */

router.route('/register')
  .post(patientController.register, email.register);

router.route('/checkemail')
  .get(patientController.checkemail, asyncMiddleware(patientAuth.add));

router.route('/:id')
  .get(patientController.view)
  .patch(patientController.update)
  .put(patientController.update)
  .delete(patientController.delete);

module.exports = router;
