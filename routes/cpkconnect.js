var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
require('../data/cpkUser')();

router.get('/', function(req, res){
	
	var db = mongoose.connection;

	db.on('error', console.error);
	db.once('open', function() {
		console.log('success');
		
		var db = mongoose.connection;
		
		var testUser = mongoose.model('testUser');
		
		/* var test = new testUser({
			name: 'Kyle Brown',
			email: 'mma_lenend03@live.com',
			username: 'admin',
			pwd: 'fake',
			account_type: 'admin'
		});
		
		test.save(function(err, test1) {
			if (err) {
				res.end('Save Failed');
			}
			res.end('Save Successful');
		}); */
		
		var test = testUser.find(function(err, rslt) {
			if (err) {
				res.end('Failed Query');				
			}
			console.dir(rslt);
			res.end('Successful Query');
		});
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');	
	
});

module.exports = router;