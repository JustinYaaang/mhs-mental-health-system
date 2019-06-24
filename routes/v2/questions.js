var router = require('express').Router();

// api/questions
router.get('/', function(req, res) {
  res.json({ products: [] });
});

// api/questions/:id
router.get('/:id', function(req, res) {
  res.json({ id: req.params.id });
});

module.exports = router;
