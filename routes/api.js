var router = require('express').Router();

router.use('/', require('./v1/'));
router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));

module.exports = router;
