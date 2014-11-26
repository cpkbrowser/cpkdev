var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
var cpkAuth = require('../routes/cpkAuth');
require('date-utils');

router.post('/', function(req, res){
	
	var db = mongoose.connection;

	db.on('error', console.error);
	db.once('open', function() {
		console.log('success');
		
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
				console.dir(rslt);
				pass = rslt.pwd;
				salt = rslt.slt;
				
				var valid = 'false';
				if (cpkAuth.cpkDecrypt(String(req.body.password).trim(), pass, salt)) {
					console.log('validated');
					valid = 'true?&' + String(rslt._id);
				} else {
					console.log('error validating password');
				}
				mongoose.disconnect();
				console.log('disconnected');
				res.end(String(valid));
			}
		});
		
		//var hash_digest = cpkAuth.cpkEncrypt('testpass1', 'fakesalt1');				
		
		//res.end('done');
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//Below is an example of how to create a user
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* var expTime = Date.today();
		expTime.add({years: 10});
		
		//PlainText pwd is testpass1
		var test = new testUser({
			name: 'Kyle Brown',			
			username: 'admin',
			pwd: hash_digest,
			slt: 'fakesalt1',
			account_type: 'admin',
			email: 'mma_legend03@live.com',
			phone: '555-555-5555',
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
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//Below code shows how to use $in operator (this will be useful in loading Popular on CPK, other query data that is one to many)
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* var array1 = [];
		array1[0] = 'test';
		array1[1] = 'admin';
		var test = testUser.findOne({ 'username': { $in: array1 }}, function(err, rslt) {
			if (err) {
				res.end('Failed Query');				
			} else if (rslt == null) {
				res.end('null');
			} else {
				console.dir(rslt);
				res.end(String(rslt.name));
			}
		}); */
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;