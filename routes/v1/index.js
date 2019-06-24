var router = require('express').Router();

router.use('/questions', require('./questions'));
router.use('/questionnaires', require('./questionnaires'));

module.exports = router;
