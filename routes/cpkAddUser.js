var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
var cpkAuth = require('../routes/cpkAuth');
var crypto = require('crypto');
require('date-utils');
var mail = require("../routes/cpkSendMail");

router.post('/', function(req, res){
	
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		
		var db = mongoose.connection;		
		var testUser = mongoose.model('testUser');	
		var testUserProfile = mongoose.model('testUserProfile');
		
		testUser.findOne({'username': String(req.body.username).trim()}, function(err, rslt) {
			if (err) {
				mongoose.disconnect();
				res.json({usr_exists: 'error'});
			} else if (rslt != null) {
				mongoose.disconnect();
				res.json({usr_exists: 'true'});
			} else {
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
					country: req.body.country,
					zip_code: req.body.zip,
					age_range: req.body.age,
					gender: req.body.gender,
					active_date: Date.today(),
					exp_date: expTime
				}); 
				
				/* console.dir(new_user);
				mongoose.disconnect();
				res.json({success: 'true'}); */
				
				new_user.save(function(err2, rslt2) {
					if (err2) {
						mongoose.disconnect();
						res.json({usr_exists: 'false', usr_success: 'false', error: err2});
					} else if (rslt2 == null) {
						mongoose.disconnect();
						res.json({usr_exists: 'false', usr_success: 'false'});
					} else {
						var new_UserProfile = new testUserProfile({
							user_id: rslt2._id,
							username: rslt2.username,
							favorites: "",
							recently_watched: "",
							Theme: "cpkStandard",
							last_signon: String(Date.today()),
							referred_by: req.body.referred,
							cpk_points: 1
						});
						new_UserProfile.save(function(err3, rslt3) {
							if (err3) {
								mongoose.disconnect();
								res.json({usr_exists: 'false', usr_success: 'true', up_success: 'false', error: err2});
							} else if (rslt3 == null) {
								mongoose.disconnect();
								res.json({usr_exists: 'false', usr_success: 'true', up_success: 'false'});	
							} else {
								mongoose.disconnect();
								
								var tmpPass = req.body.password;
								str = new Array(tmpPass.length - 1).join('*');
								var fStr = tmpPass.substring(0, 1) + str + tmpPass.substring(tmpPass.length - 1, tmpPass.length);
								var info = {
									first_name: req.body.firstname,
									username: req.body.username,
									pass: fStr,
									bday: req.body.bday,
									phone: req.body.phone,
									zip: req.body.zip
								};
								var msg = mail.thanksTemplate();
								var message = mail.prepareThanks(info, msg);
								var toEml = req.body.first_name + " " + req.body.last_name + " <" + req.body.email + ">";
								mail.SendMail(toEml, "Welcome to CPK Browser!", "Welcome to CPK Browser! You must have HTML enabled in your email settings to view this message.", String(message));
								
								res.json({usr_exists: 'false', usr_success: 'true', up_success: 'true', id: rslt2._id, userName: rslt2.username});	
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