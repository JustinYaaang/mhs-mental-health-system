var router = require('express').Router();

/**
 * @swagger
 * resourcePath: /api
 * description: All about API
 */

router.use('/users', require('./users'));
router.use('/organisations', require('./organisations'));
router.use('/patients', require('./patients'));
router.use('/questionnaires',require('./questionnaires'));
router.use('/patientanswers', require('./patientanswers'));
router.use('/questionnaire_sJS', require('./questionnaires_sJS'));

module.exports = router;
