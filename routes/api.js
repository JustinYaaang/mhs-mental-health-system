var router = require('express').Router();

// router.use(function(req, res, next) {
//   console.log(req.method, req.url);
//   next();
// });

router.use('/', require('./v1/'));
router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));

module.exports = router;
