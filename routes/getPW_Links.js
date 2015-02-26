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
  
  var x = "http://www.primewire.ag" + srchKey;
  //var x = "http://www.vodly.to" + srchKey;
  download(x, function(data) {
    if (data) {
	  var $ = cheerio.load(data);
	  var links = $('.movie_version_link');
	  var obj = [];
	  
	  var table = '<div id="showLinks" style="display: none;">';  
	  
	  links.each(function(i, e) { 
		//table += String($(e));
		if (i != 0) {
		    //table += String($(e));
			var children = $(this).children();
			lnk = children[0].attribs.href;
			if (lnk != null) {
				obj.push(lnk);
				console.log(lnk);
			}
		  }
	  });
	  
	  table += '</div>';
	  
	  res.end(JSON.stringify(obj));
	  
	} else {
	  res.end('nothing');
	}
  });
  
});

module.exports = router;