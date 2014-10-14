var express = require('express');
var router = express.Router();

/* GET PW page. */
router.get('/', function(req, res) {
  res.render('test1', { title: 'Primewire' });
});

module.exports = router;