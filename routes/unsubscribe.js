var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');

router.get('/', function(req, res){
	var db = mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
				
		var testUser = mongoose.model('testUser');
		
		var str = req.url.split('?')[1];
		var query = qs.parse(str);
		var username = query.username;
		
		testUser.findOne({'username': username}, function(err, rslt1) {
			if (err) {
				mongoose.disconnect();
				res.render('unsubscribed-fail', { title: 'Express' });
			} else if (rslt1 == null) {
				mongoose.disconnect();
				res.render('unsubscribed-fail', { title: 'Express' });
			} else {
				console.dir(rslt1);
				rslt1.send_mail = 'false';
				console.log(rslt1.send_mail);
				rslt1.save(function(err2, rslt2) {				
					if (err2) {
						console.dir(err2);
						mongoose.disconnect();
						res.render('unsubscribed-fail', { title: 'Express' });
					} else if (rslt2 == null) {
						console.log('null');
						mongoose.disconnect();
						res.render('unsubscribed-fail', { title: 'Express' });
					} else {
						console.dir(rslt2);
						mongoose.disconnect();
						res.render('unsubscribed', { title: 'Express' });
					}
				});				
			}
		});
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');
});

module.exports = router;