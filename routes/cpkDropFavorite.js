var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
require('date-utils');

router.post('/', function(req, res){
		
	var db = mongoose.connection;
	var testUserProfile = mongoose.model('testUserProfile');

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
				
		var db = mongoose.connection;		
		var testShow = mongoose.model('testShow');
		
		var sName = req.body.name;
		var sType = req.body.show_type;
		
		testShow.findOne({'name': String(sName).trim(), 'show_type': String(sType)}, function(err, rslt) {
			if (err) {
				mongoose.disconnect();
				console.log('err');
				res.end('Failed Query');
			} else if (rslt == null) {
				mongoose.disconnect();
				console.log('err');
				res.end('No Show Found');
			} else {
				testUserProfile.findOne({user_id: req.body.userID }, function(err2, rslt2) {
					if (err2) {
						mongoose.disconnect();
						res.json({exists: true, created: false, success: 'no'});
					} else if (rslt2 == null) {
						mongoose.disconnect();
						res.json({exists: true, created: false, success: 'error'});
					} else {
						rslt2.favorites = rslt2.favorites.replace((rslt._id + ';'), '');						
						rslt2.save(function(err3, rslt3) {
							if (err3) {
								mongoose.disconnect();
								res.json({exists: true, created: true, success: 'fail'});
							} else {
								mongoose.disconnect();
								res.json({exists: true, created: true, success: 'yes'});
							}
						});
						
					}					
				});			
			}
		});		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;