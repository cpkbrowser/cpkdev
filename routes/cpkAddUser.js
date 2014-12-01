var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
var cpkAuth = require('../routes/cpkAuth');
var crypto = require('crypto');
require('date-utils');

router.post('/', function(req, res){
	
	var db = mongoose.connection;

	db.on('error', console.error);
	db.once('open', function() {
		console.log('success');
		
		var db = mongoose.connection;		
		var testUser = mongoose.model('testUser');	
		var testUserProfile = mongoose.model('testUserProfile');
		
		var salt = crypto.randomBytes(64).toString('hex').substring(0, 15);
		var pass = cpkAuth.cpkEncrypt(String(req.body.password).trim(), salt); 		
		var act_type = 'beta';
		
		var expTime = Date.today();
		expTime.add({years: 10});		
		
		var new_user = new testUser({
			first_name: req.body.firstname,
			last_name: req.body.lastname,
			username: req.body.username,
			pwd: pass,
			slt: salt,
			account_type: act_type,
			email: req.body.email,
			phone: req.body.phone,
			birthday: req.body.bday,
			zip_code: req.body.zip,
			age_range: req.body.age,
			gender: req.body.gender,
			active_date: Date.today(),
			exp_date: expTime
		}); 
		
		/* console.dir(new_user);
		mongoose.disconnect();
		res.json({success: 'true'}); */
		
		new_user.save(function(err, rslt) {
			if (err) {
				mongoose.disconnect();
				res.json({usr_success: 'false', error: err});
			}
			var new_UserProfile = new testUserProfile({
				user_id: rslt._id,
				username: rslt.username,
				favorites: "",
				recently_watched: "",
				Theme: "cpkStandard"
			});
			new_UserProfile.save(function(err2, rslt2) {
				if (err2) {
					mongoose.disconnect();
					res.json({usr_success: 'true', up_success: 'false', error: err});
				}
				mongoose.disconnect();
				res.json({usr_success: 'true', up_success: 'true', id: rslt._id, userName: rslt.username});	
			});					
		}); 
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;