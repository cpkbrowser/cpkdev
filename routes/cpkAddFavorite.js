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
				console.log('null');
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
				
				newShow.save(function(err2, rslt2) {
					if (err2) {
						mongoose.disconnect();
						res.json({exists: false, created: true, success: 'no'});
					} else {
						
						testUserProfile.findOne({user_id: req.body.userID }, function(err3, rslt3) {
							if (err3) {
								mongoose.disconnect();
								res.json({exists: false, created: true, success: 'error finding user profile'});
							} else {
								var tmpFavs = rslt3.favorites.split(';');
								if (tmpFavs.length > 20) {
									if (rslt3.favorites.indexOf(rslt2._id) == -1) {
										rslt3.favorites = rslt3.favorites.slice(25);
										console.log('sliced');
									}
								}
								if (rslt3.favorites.indexOf(rslt2._id) == -1) {
									rslt3.favorites = rslt3.favorites + rslt2._id + ';';
									rslt3.save(function(err4, rslt4) {
										if (err4) {
											mongoose.disconnect();
											res.json({exists: false, created: true, success: 'error updating user profile'});
										} else {
											mongoose.disconnect();
											res.json({exists: false, created: true, success: 'yes'});
										}
									});
								} else {
									mongoose.disconnect();
									res.json({exists: false, created: true, success: 'pre-existed'});
								}
								
							}
						});
						
					}
				});
				
			} else {				
				
				testUserProfile.findOne({user_id: req.body.userID }, function(err2, rslt2) {
				
					if (err2) {
						mongoose.disconnect();
						res.json({exists: true, created: false, success: 'no'});
					} else {					
						var tmpFavs = rslt2.favorites.split(';');
						if (tmpFavs.length > 20) {
							if (rslt2.favorites.indexOf(rslt._id) == -1) {
								rslt2.favorites = rslt2.favorites.slice(25);
								console.log('sliced');
							}
						}
						if (rslt2.favorites.indexOf(rslt._id) == -1) {
							rslt2.favorites = rslt2.favorites + rslt._id + ';';						
							rslt2.save(function(err3, rslt3) {
								if (err3) {
									mongoose.disconnect();
									res.json({exists: true, created: true, success: 'fail'});
								} else {
									mongoose.disconnect();
									res.json({exists: true, created: true, success: 'yes'});
								}
							});
						} else {
							mongoose.disconnect();
							res.json({exists: true, created: true, success: 'pre-existed'});
						}
					}
					
				});			
			}
		});		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;