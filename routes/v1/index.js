var router = require('express').Router();

router.use('/questions', require('./questions'));
router.use('/questionnaires',require('./questionnaires'));
router.use('/patientanswers', require('./patientanswers'));
router.use('/patients', require('./patients'));
router.use('/questionnaire_sJS', require('./questionnaires_sJS'));

module.exports = router;
