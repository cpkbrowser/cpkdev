var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
var cpkAuth = require('../routes/cpkAuth');
require('date-utils');

router.post('/', function(req, res){
	
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		
		var db = mongoose.connection;		
		var testUser = mongoose.model('testUser');	
		var testUserProfile = mongoose.model('testUserProfile');
		
		var pass; 
		var salt;
		testUser.findOne({'username': String(req.body.username).trim()}, function(err, rslt1) {
			if (err) {
				mongoose.disconnect();
				res.end('Failed Query');				
			} else if (rslt1 == null) {
				mongoose.disconnect();
				res.end('null return value');
			} else {
				pass = rslt1.pwd;
				salt = rslt1.slt;				
				
				testUserProfile.findOne({'user_id': rslt1._id}, function (err2, rslt2) {
					if (err2 || rslt2 == null) {
						var valid = 'false';
						if (cpkAuth.cpkDecrypt(String(req.body.password).trim(), pass, salt)) {
							valid = 'true?&' + String(rslt1._id) + '?&' + String(rslt1.username);
						} 
						mongoose.disconnect();
						res.json({rslt: valid});
					} else {
						rslt2.last_signon = String(Date.today());
						var count = rslt2.cpk_points;
						count = (count + 1);
						rslt2.cpk_points = count;
						rslt2.save(function(err3, rslt3) {
							/* if (err3) {
								console.log('not saved');
							} else {
								console.log(rslt3.last_signon);								
							} */
							var valid = 'false';
							if (cpkAuth.cpkDecrypt(String(req.body.password).trim(), pass, salt)) {
								
								var age;
								console.log('age: ' + rslt1.age_range);
								if (rslt1.age_range == '0-17') {
									age = '1';
								} else if (rslt1.age_range == '18-25') {
									age = '1';
								} else if (rslt1.age_range == '26-40') {
									age = '2';
								} else {
									age = '3';
								}
								
								var gender;
								console.log('gender: ' + rslt1.gender);
								if (rslt1.gender == 'male') {
									gender = 'm';
								} else {
									gender = 'f';
								}
								
								valid = 'true?&' + String(rslt1._id) + '?&' + String(rslt1.username) + '?&' + age + '?&' + gender;
							} 
							mongoose.disconnect();
							res.json({rslt: valid});
						});
					}					
				});		
			}
		});		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;