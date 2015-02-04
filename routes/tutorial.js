var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('tutorial', { title: 'Tutorial' });
});

module.exports = router;
