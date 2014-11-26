var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var cheerio = require("cheerio");

router.get('/', function(req, res){
  
  function download(url, callback) {
	// Utility function that downloads a URL and invokes
	// callback with the data.
    http.get(url, function(res) {
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function() {
        callback(data);
      });
    }).on("error", function() {
      callback(null);
    });
  }
  
  var str = req.url.split('?')[1];
  var query = qs.parse(str);
  var srchKey = query.srch;
  var getType = query.type;
  
  var x = "http://www.primewire.ag" + srchKey;
  download(x, function(data) {
    if (data) {
	  var $ = cheerio.load(data);
	  var desc = $('.movie_info');
	  
	  var add1 = '';
	  if (getType == 'true') { 
		var isTV = $('.tv_container');
		if (isTV.length > 0) {
			add1 = '<div class="hdn_tmpShowType">tv</div></div>';
			desc = '<div class="hdn_tmpContainer">' + String(desc) + add1;
		} else {
			add1 = '<div class="hdn_tmpShowType">movie</div></div>';
			desc = '<div class="hdn_tmpContainer">' + String(desc) + add1;
		}
	  } else if (getType == 'partial') {
		var isTV = $('.tv_container');
		if (isTV.length > 0) {
			desc = '<div class="hdn_tmpShowType">tv</div>'
		} else {
			desc = '<div class="hdn_tmpShowType">movie</div>';
		}
	  }
	  
	  res.end(String(desc));
	  
	} else {
	  res.end('nothing');
	}
  });
  
});

module.exports = router;