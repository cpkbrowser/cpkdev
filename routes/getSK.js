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
	  } else if (type == 'tv') {
	    getUrl = 'http://www.primewire.ag/index.php?search_keywords=' + srchKey.replace(" ", "+") + '&key=' + key + '&search_section=2'
	  }
	  
	  download(getUrl, function(data2) {
	    if (data) {
		
		  var h = cheerio.load(data2);
		  var item = h('.index_item_ie');		  
		  
		  var table = '<table id="showInfo" style="display: none;">\n';
		  table += '<thead><tr><td>Name</td><td>Description</td><td>Year</td><td>Image</td><td>Link</td></tr></thead>\n';
		  table += '<tbody>\n';
		  
		  item.each(function(i, e) {
			table += '<tr>\n  ';
			var title_year = String(h(e).find("h2")).replace('<h2>', '').replace('</h2>', '');
			var title = title_year.substring(0, (title_year.length - 6));
			var year = title_year.substring((title_year.length - 6));
			table += '<td>' + title.trim() + '</td>';
			table += '<td>' + '' + '</td>';
			table += '<td>' + year.replace('(', '').replace(')', '') + '</td>';
			table += '<td>' + String(h(e).find("img").attr('src')) + '</td>';
		    table += '<td>' + String(h(e).find("a").attr('href')) + '</td>';
			var genres = '';
			var grpGenre = h('.item_categories', e).find("a");
			grpGenre.each(function(i2, e2) {
			  genres += String(h(e2).text()) + '; ';
			});
			table += '<td>' + genres.trim() + '</td>';
			table += '\n</tr>\n';
		  });
		  
		  table += '</tbody>\n</table>';
		  res.end(String(table));
		  
		} else {
		  res.end('nothing');
		}
	  });	  
	} else {
	  res.end('nothing');
	}
  });
  
});

module.exports = router;