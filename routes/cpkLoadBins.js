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
		
		var testShow = mongoose.model('testShow');
		var testUserProfile = mongoose.model('testUserProfile');
		var objPop;
		var objFav;
		var objRec;
		
		function getPopularOnCPK() {
			
			testShow.find({}).sort({watch_count: -1}).limit(20).exec(function (popErr, popRslt) {
				if (popErr) {
					mongoose.disconnect();
					res.json({rsltPop: 'DB Error'});
				} else {
					if (req.body.favorites == 'true') {
						objPop = popRslt;
						getFavorites();
					} else {
						mongoose.disconnect();
						res.json({rsltPop: popRslt});
					}
				}
			});		
			
		}
		
		function getFavorites() {
			
			if (req.body.userID != null) {
				testUserProfile.findOne({user_id: req.body.userID }, function (upErr, upRslt) {
					if (upErr) {
						mongoose.disconnect();
						res.json({rsltPop: objPop, rsltFav: 'DB Error'});
					} else if (upRslt == null) {
						mongoose.disconnect();
						res.json({rsltPop: objPop, rsltFav: 'No User Profile'});
					} else {
						var list = upRslt.favorites.substring(0, upRslt.favorites.length - 1).split(';');
						testShow.find({_id: {$in: list}}, function(sErr, sRslt) {
							if (sErr) {
								mongoose.disconnect();
								res.json({rsltPop: objPop, rsltFav: 'Error Finding Show List'});
							} else {
								objFav = sRslt;
								getRecentItems();
							}
						});
					}
				});
			} else {
				mongoose.disconnect();
				res.json({rsltPop: objPop, rsltFav: 'user ID error'});
			}
		}
		
		function getRecentItems() {
			
			if (req.body.userID != null) {
				testUserProfile.findOne({user_id: req.body.userID }, function (upErr, upRslt) {
					if (upErr) {
						mongoose.disconnect();
						res.json({rsltPop: objPop, rsltFav: objFav, rsltRec: 'DB Error'});
					} else if (upRslt == null) {
						mongoose.disconnect();
						res.json({rsltPop: objPop, rsltFav: objFav, rsltRec: 'Error Finding Show List'});
					} else {
						var list = upRslt.recently_watched.substring(0, upRslt.recently_watched.length - 1).split(';');
						testShow.find({_id: {$in: list}}, function(sErr, sRslt) {
							if (sErr) {
								mongoose.disconnect();
								res.json({rsltPop: objPop, rsltFav: objFav, objRec: 'Error Finding Show List'});
							} else {
								mongoose.disconnect();
								res.json({rsltPop: objPop, rsltFav: objFav, rsltRec: sRslt});
							}
						});
					}
				});
			} else {
				mongoose.disconnect();
				res.json({rsltPop: objPop, rsltFav: 'user ID error'});
			}
		}
		
		if (req.body.popular == 'true') {
			getPopularOnCPK();
		} else if (req.body.favorites == 'true') {
			getFavorites();
		} else if (req.body.recent == 'true') {
			getRecentItems();
		}
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');
});

module.exports = router;