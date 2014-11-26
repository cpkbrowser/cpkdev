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
		var testUserProfile = mongoose.model('testUserProfile');
		var objPop;
		var objFav;
		
		function getPopularOnCPK() {
			if (req.body.popular == 'true') {
				
				testShow.find({}).sort({watch_count: -1}).limit(20).exec(function (popErr, popRslt) {
					if (popErr) {
						console.log('error' + String(popErr));
						mongoose.disconnect();
						res.json({rsltPop: 'DB Error'});
					}
					console.log(req.body.favorites);
					if (req.body.favorites == 'true') {
						objPop = popRslt;
						getFavorites();
					} else {
						mongoose.disconnect();
						res.json({rsltPop: popRslt});
					}
				});
			
			} else {
				mongoose.disconnect();
			}
		}
		
		function getFavorites() {
			console.log(req.body.userID);
			if (req.body.userID != null) {
				testUserProfile.findOne({user_id: req.body.userID }, function (upErr, upRslt) {
					if (upErr) {
						console.log('error' + String(upErr));
						mongoose.disconnect();
						res.json({rsltPop: objPop, rsltFav: 'DB Error'});
					} else if (upRslt == null) {
						mongoose.disconnect();
						res.json({rsltPop: objPop, rsltFav: 'No User Profile'});
					} else {
						var list = upRslt.favorites.substring(0, upRslt.favorites.length - 1).split(';');
						testShow.find({_id: {$in: list}}, function(sErr, sRslt) {
							if (sErr) {
								console.log('Error Finding Show List');
								mongoose.disconnect();
								res.json({rsltPop: objPop, rsltFav: 'Error Finding Show List'});
							} else {
								mongoose.disconnect();
								res.json({rsltPop: objPop, rsltFav: sRslt});
							}
						});
					}
				});
			} else {
				mongoose.disconnect();
				res.json({rsltPop: objPop, rsltFav: 'user ID error'});
			}
		}
		
		getPopularOnCPK();
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');
});

module.exports = router;