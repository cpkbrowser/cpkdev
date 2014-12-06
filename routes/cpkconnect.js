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
		
		var pass; 
		var salt;
		var test = testUser.findOne({'username': String(req.body.username).trim()}, function(err, rslt) {
			if (err) {
				mongoose.disconnect();
				res.end('Failed Query');				
			} else if (rslt == null) {
				mongoose.disconnect();
				res.end('null return value');
			} else {
				pass = rslt.pwd;
				salt = rslt.slt;
				
				var valid = 'false';
				if (cpkAuth.cpkDecrypt(String(req.body.password).trim(), pass, salt)) {
					valid = 'true?&' + String(rslt._id) + '?&' + String(rslt.username);
				} else {
					
				}
				mongoose.disconnect();
				res.json({rslt: valid});
			}
		});
				
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//Below is an example of how to create a user
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* var expTime = Date.today();
		expTime.add({years: 10});
		
		//PlainText pwd is testpass1
		var test = new testUser({
			first_name: 'Kyle',
			last_name: 'Brown',
			username: 'admin',
			pwd: hash_digest,
			slt: 'fakesalt1',
			account_type: 'admin',
			email: 'mma_legend03@live.com',
			phone: '555-555-5555',
			birthday: '11/02/1989',
			zip_code: '67877',
			age_range: '18-25',
			gender: 'male',
			active_date: Date.today(),
			exp_date: expTime
		}); 
		
		test.save(function(err, test1) {
			if (err) {
				res.end('Save Failed');
				mongoose.disconnect();
			}
			res.end('Save Successful');
			mongoose.disconnect();
		});  */
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;