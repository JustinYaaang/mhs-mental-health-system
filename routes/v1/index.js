var router = require('express').Router();

router.use('/questions', require('./questions'));
router.use('/questionnaires', require('./questionnaires'));
router.use('/patientanswers', require('./patientanswers'));

module.exports = router;
