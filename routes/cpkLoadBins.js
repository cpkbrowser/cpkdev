var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
require('date-utils');

router.post('/', function(req, res){
		
	var db = mongoose.connection;

	db.on('error', console.error);
	db.once('open', function() {
		
		var testShow = mongoose.model('testShow');
		
		if (req.body.type == 'popular') {
			
			testShow.find({}).sort({watch_count: -1}).limit(20).exec(function (err, rslt) {
				if (err) {
					console.log('error' + String(err));
				}
				mongoose.disconnect();
				res.json({result: rslt});;
			});
		
		} else {
			mongoose.disconnect();
		}
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');
});

module.exports = router;