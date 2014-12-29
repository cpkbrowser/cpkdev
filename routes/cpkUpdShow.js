var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
require('date-utils');

router.post('/', function(req, res){
		
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
				
		var db = mongoose.connection;		
		var testShow = mongoose.model('testShow');
		
		var sName = req.body.name;
		var sType = req.body.show_type;
		
		testShow.findOne({'name': String(sName).trim(), 'show_type': String(sType)}, function(err, rslt) {
			if (err) {
				mongoose.disconnect();
				res.json({exists: 'failed query'});
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
					watch_count: 1,
					actors: req.body.actors
				});		
				
				newShow.save(function(err, rslt) {
					if (err) {
						mongoose.disconnect();
						res.json({exists: false, created: true, success: 'no'});
					} else {
						mongoose.disconnect();
						res.json({exists: false, created: true, success: 'yes'});
					}
				});
				
			} else {
			
				var count = rslt.watch_count;
				count = (count + 1);
				
				rslt.watch_count = count;
				rslt.seasons = req.body.seasons;
				rslt.actors = req.body.actors;
				rslt.save(function(err2, rslt2) {
					if (err2) {
						mongoose.disconnect();
						res.json({exists: true, created: false, success: 'no'});
					} else {
						mongoose.disconnect();
						res.json({exists: true, created: true, success: 'yes'});
					}					
				});				
			}
		});		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;