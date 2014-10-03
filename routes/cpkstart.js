var express = require('express');
var router = express.Router();
var qs = require('querystring');

router.get('/', function(req, res){
  var str = req.url.split('?')[1];
  var query = qs.parse(str);
  if (query.test == 'US') {
	//res.write('Test');
	res.end('America');
  } else {
	//res.write('Test');
	res.end('Not America');
  }
  //res.send('test');
});

module.exports = router;