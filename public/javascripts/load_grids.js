function loadCPKBin_Popular() {

	var request = $.ajax({
		url: '/cpkLoadBins',
		type: 'POST',
		data: {type: 'popular'},
		contentType: 'application/x-www-form-urlencoded',
		dataType: 'json'		
	});
	
	request.success(function(rslt) {
		var rtrn = rslt.result.length;
		createBinTable(rslt.result);
		//alert('succeeded');
	});
	
	request.fail(function(jqXHR, textStatus) {
		alert('Error Saving Show Info');
	});
}

function createBinTable(rslt) {
	var table = document.createElement('table');
	var body = document.createElement('tbody');
	for (i = 0; i < rslt.length; i++) {
		
		//load table for hidden elements
		var row = document.createElement('tr');
		var name = document.createElement('td');
		name.innerHTML = rslt[i].name.substring(0, 18);
		row.appendChild(name);
		var img = document.createElement('td');
		img.innerHTML = rslt[i].img_url;
		row.appendChild(img);
		var desc = document.createElement('td');
		desc.innerHTML = rslt[i].description;
		row.appendChild(desc);
		var genre = document.createElement('td');
		genre.innerHTML = rslt[i].tags;
		row.appendChild(genre);
		var year = document.createElement('td');
		year.innerHTML = rslt[i].year;
		row.appendChild(year);
		var link = document.createElement('td');
		link.innerHTML = rslt[i].link;
		row.appendChild(link);
		body.appendChild(row);
		
		//load first 6 elements
		if (i < 6) {
			document.getElementById('popItem_n' + i).innerHTML = rslt[i].name.substring(0, 18);
			document.getElementById('popItem_hdnName' + i).innerHTML = rslt[i].name.substring(0, 18);
			
			//add conditional statement to allow for more plug-ins
			if (rslt[i].img_url != '/images/noposter.jpg') {
				document.getElementById('popItem_img' + i).src = rslt[i].img_url;
			}
			document.getElementById('popItem_hdnImg' + i).innerHTML = rslt[i].img_url;
			
			document.getElementById('popItem_hdnDesc' + i).innerHTML = rslt[i].description;			
			document.getElementById('popItem_hdnYear' + i).innerHTML = rslt[i].year;
			document.getElementById('popItem_hdnLink' + i).innerHTML = rslt[i].link;
			document.getElementById('popItem_hdnGenre' + i).innerHTML = rslt[i].tags;
		}
		
	}
	table.appendChild(body);
	table.id = 'cpk_popEpisodes';
	document.getElementById('hdn_tblPopular').appendChild(table);
}