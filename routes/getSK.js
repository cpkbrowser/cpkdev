var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var cheerio = require("cheerio");

router.get('/', function(req, res){
  // Utility function that downloads a URL and invokes
  // callback with the data.
  function download(url, callback) {
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
  
  var x = "http://www.primewire.ag";
  download(x, function(data) {
    if (data) {
	  var $ = cheerio.load(data);
	  var key = $('.search_container input[name=key]').attr('value');
	  
	  var str = req.url.split('?')[1];
	  var query = qs.parse(str);
	  var srchKey = query.srch;
	  var type = query.type;
	  var getUrl = '';
	  
	  if (type == 'movie') {
	    getUrl = 'http://www.primewire.ag/index.php?search_keywords=' + srchKey.replace(" ", "+") + '&key=' + key + '&search_section=1'
	  } else {
	    getUrl = 'http://www.primewire.ag/index.php?search_keywords=' + srchKey.replace(" ", "+") + '&key=' + key + '&search_section=2'
	  }
	  
	  download(getUrl, function(data2) {
	    if (data) {
		  var shows = '';
		  var h = cheerio.load(data2);
		  var lngth = String(h('.index_item_ie').find("h2"));
		  res.end(lngth);
		} else {
		  res.end('nothing');
		}
	  });
	  //res.end(key);
	} else {
	  res.end('nothing');
	}
  });
  
});

module.exports = router;