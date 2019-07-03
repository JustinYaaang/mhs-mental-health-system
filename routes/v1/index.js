var router = require('express').Router();
var JWT = require('../../auth/jwt')

router.use('/questions', require('./questions'));
router.use('/questionnaires',JWT.verify, require('./questionnaires'));
router.use('/patientanswers', require('./patientanswers'));
router.use('/patients', require('./patients'));
router.use('/questionnaire_sJS', require('./questionnaires_sJS'));

module.exports = router;
