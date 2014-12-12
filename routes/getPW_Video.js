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
	  if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
	    /* if (url.parse(res.headers.locations).hostname) {
		  data = url.parse(res.headers.locations).hostname;
		} else {
		  data = res.headers.locations;
		} */
		data = res.headers.location;
		callback(data);
	  } else {
      
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on("end", function() {
          callback(data);
        });
	  
	  }
	  
    }).on("error", function() {
      callback('Error');
    });
  }
  
  var tmpStr = req.url.split('?');
  var str = '';
  for (i = 1; i < tmpStr.length; i++) {
	str += ('?' + tmpStr[i]);
  }
  str = str.replace('?srch=', '');
  //res.end(str);
  var x = "http://www.primewire.ag" + str;
  
  download(x, function(data) {
    if (data) {
	  
	  var x1 = String(data).indexOf('<noframes>') + 10;
	  var x2 = String(data).indexOf('</noframes>')
	  
	  //console.log(String(data).substring(x1, x2));
	  
	  res.end(String(data).substring(x1, x2));
	  
	} else {
	  res.end('nothing');
	}
  }); 
  
});

module.exports = router;