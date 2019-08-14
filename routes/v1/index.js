var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/organisations', require('./organisations'));
router.use('/patients', require('./patients'));
router.use('/patientanswers', require('./patientanswers'));
router.use('/questionnaire_sJS', require('./questionnaires_sJS'));
router.use('/patientquestionnaire', require('./patientquestionnaire'));


module.exports = router;
