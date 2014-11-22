var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
require('date-utils');
require('../data/cpkShow')();

router.post('/', function(req, res){
		
	var db = mongoose.connection;

	db.on('error', console.error);
	db.once('open', function() {
				
		var db = mongoose.connection;		
		var testShow = mongoose.model('testShow');
		
		var sName = req.body.name;
		var sType = req.body.show_type;
		
		testShow.findOne({'name': String(sName).trim(), 'show_type': String(sType)}, function(err, rslt) {
			if (err) {
				mongoose.disconnect();
				res.end('Failed Query');
			} else if (rslt == null) {
			
				var newShow = new testShow({
					name: req.body.name,
					show_type: req.body.show_type,
					description: req.body.description,
					tags: req.body.tags,
					year: req.body.year,
					img_url: req.body.img_url,
					host: req.body.host,
					link: req.body.link,
					seasons: req.body.seasons,
					watch_count: 1			
				});		
				
				newShow.save(function(err, rslt) {
					if (err) {
						mongoose.disconnect();
						res.json({exists: false, created: true, success: 'no'});
					}
					mongoose.disconnect();
					res.json({exists: false, created: true, success: 'yes'});
				});
				
			} else {		
				mongoose.disconnect();
				res.json({exists: true, created: false});
			}
		});		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;