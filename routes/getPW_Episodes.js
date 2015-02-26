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
	  var links = $('.tv_container');
	  
	  if (links.length > 0) {
	    
	    var table = '<div id="showEpisodes" style="display: none;">';  
	    
	    links.each(function(i, e) { 
		  table += String($(e));
	    });
	    
	    table += '</div>';
	    
	    res.end(String(table));
		
	  } else {
		
		links = $('.movie_version_link');
		var obj = [];
		
		links.each(function(i, e) { 
		  if (i != 0) {
		    //table += String($(e));
			var children = $(this).children();
			lnk = children[0].attribs.href;
			if (lnk != null) {
				obj.push(lnk);
			}
		  }
	    });
	        
	    res.end(JSON.stringify(obj));
		
	  }
	  
	} else {
	  res.end('nothing');
	}
  });
  
});

module.exports = router;