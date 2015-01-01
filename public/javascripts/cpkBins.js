$(document).ready(function() {
	
});

function getMore_Click(t) {
	var divID = t.id;
	if (divID == undefined) {
		divID = t.attributes[1].nodeValue;
	}
	if (divID.indexOf("getMore") == -1) {
		//Workaround for Safari / Tablets / old browsers
		divID = t.attributes.id.nodeValue;
	}
	var type = divID.substring(0, 1).toUpperCase() + divID.substring(1, 3);
	var prefix = divID.substring(0, 3);
	
	var container = t.parentNode.id;
	if (container == undefined) {
		container = t.attributes[1].nodeValue;
	}
	if (container.indexOf("MoreItems") == -1) {
		//Workaround for Safari / Tablets / old browsers
		container = t.attributes.id.nodeValue;
	}
	var cType = container.split('_')[0];
	
	if (document.getElementById('hdn' + type + 'SetLoaded').innerHTML != 'false') {
		var shows = document.getElementById('hdn_tbl' + cType).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		var popSetCounter = parseInt(document.getElementById('hdn' + type + 'SetCounter').innerHTML, 10);
		if (popSetCounter < 14) {
			popSetCounter++;
			document.getElementById('hdn' + type + 'SetCounter').innerHTML = popSetCounter;
			for (i = 0; i < 6; i++) {
				var tmpInfo = shows[i + popSetCounter].getElementsByTagName('td');
				var info = {
					name: tmpInfo[0].innerHTML,
					img_url: tmpInfo[1].innerHTML,
					description: tmpInfo[2].innerHTML,
					tags: tmpInfo[3].innerHTML,
					year: tmpInfo[4].innerHTML,
					link: tmpInfo[5].innerHTML,
					show_type: tmpInfo[6].innerHTML,
					actors: tmpInfo[7].innerHTML
				}
				changeCPKBinObjects(prefix + 'Item', i, info);
			}
		} else {
			
		}		
	}
}

function getLess_Click(t) {
	var divID = t.id;
	if (divID == undefined) {
		divID = t.attributes[1].nodeValue;
	}
	if (divID.indexOf("getMore") == -1) {
		//Workaround for Safari / Tablets / old browsers
		divID = t.attributes.id.nodeValue;
	}
	var type = divID.substring(0, 1).toUpperCase() + divID.substring(1, 3);
	var prefix = divID.substring(0, 3);
	
	var container = t.parentNode.id;
	if (container == undefined) {
		container = t.attributes[1].nodeValue;
	}
	if (container.indexOf("MoreItems") == -1) {
		//Workaround for Safari / Tablets / old browsers
		container = t.attributes.id.nodeValue;
	}
	var cType = container.split('_')[0];
	
	if (document.getElementById('hdn' + type + 'SetLoaded').innerHTML != 'false') {
		var shows = document.getElementById('hdn_tbl' + cType).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		var recSetCounter = parseInt(document.getElementById('hdn' + type + 'SetCounter').innerHTML, 10);
		if (recSetCounter > 0) {
			recSetCounter--;
			document.getElementById('hdn' + type + 'SetCounter').innerHTML = recSetCounter;
			for (i = 0; i < 6; i++) {
				var tmpInfo = shows[i + recSetCounter].getElementsByTagName('td');
				var info = {
					name: tmpInfo[0].innerHTML,
					img_url: tmpInfo[1].innerHTML,
					description: tmpInfo[2].innerHTML,
					tags: tmpInfo[3].innerHTML,
					year: tmpInfo[4].innerHTML,
					link: tmpInfo[5].innerHTML,
					show_type: tmpInfo[6].innerHTML,
					actors: tmpInfo[7].innerHTML
				}
				changeCPKBinObjects(prefix + 'Item', i, info);
			}
		} else {
			
		}
	}
}

function loadCPKBins_Standard() {
	
	var user_id = document.getElementById('userInfo_ID').innerHTML;
	var request = $.ajax({
		url: '/cpkLoadBins',
		type: 'POST',
		data: {popular: 'true', favorites: 'true', recent: 'true', userID: user_id},
		contentType: 'application/x-www-form-urlencoded',
		dataType: 'json'		
	});
	
	request.success(function(rslt) {
		var table1 = createBinTable(rslt.rsltPop, 'cpk_popShows', 'popItem');
		$('#hdn_tblPopular').empty();
		document.getElementById('hdn_tblPopular').appendChild(table1);
		document.getElementById('hdnPopSetLoaded').innerHTML = 'true';
		
		if (typeof rslt.rsltFav !== 'string') {
			var table2 = createBinTable(rslt.rsltFav, 'cpk_favShows', 'favItem');
			$('#hdn_tblFavorites').empty();
			document.getElementById('hdn_tblFavorites').appendChild(table2);
			document.getElementById('hdnFavSetLoaded').innerHTML = 'true';
			document.getElementById('hdnFavSetMax').innerHTML = rslt.rsltFav.length;
		}
		
		if (typeof rslt.rsltRec !== 'string') {
			var table3 = createBinTable(rslt.rsltRec, 'cpk_recShows', 'recItem');
			$('#hdn_tblRecent').empty();
			document.getElementById('hdn_tblRecent').appendChild(table3);
			document.getElementById('hdnRecSetLoaded').innerHTML = 'true';
			document.getElementById('hdnRecSetMax').innerHTML = rslt.rsltRec.length;
		}
		
	});
	
	request.fail(function(jqXHR, textStatus) {
		alert('Error Retrieving CPK Bins');
	});
}

function loadCPKBins_Categories(categories) {
	
}

function createBinTable(rslt, tmpID, binID) {
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
		//pre-render the image
		(new Image()).src = rslt[i].img_url;
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
		var type = document.createElement('td');
		type.innerHTML = rslt[i].show_type;
		row.appendChild(type);
		var actors = document.createElement('td');
		actors.innerHTML = rslt[i].actors;
		row.appendChild(actors);
		body.appendChild(row);
		
		//load first 6 elements
		if (i < 6) {
			changeCPKBinObjects(binID, i, rslt[i]);
			document.getElementById(binID + '_container' + i).style.display = 'block';
		}
		
	}
	if (rslt.length < 6) {
		for (i = rslt.length; i < 6; i++ ) {
			document.getElementById(binID + '_container' + i).style.display = 'none';
		}
	}
	table.appendChild(body);
	table.id = tmpID;
	return table;
}

function changeCPKBinObjects(prefix, i, info) {
	document.getElementById(prefix + '_n' + i).innerHTML = info.name.substring(0, 18);
	document.getElementById(prefix + '_hdnName' + i).innerHTML = info.name.substring(0, 18);
	
	//add conditional statement to allow for more plug-ins
	if (info.img_url != '/images/noposter.jpg') {
		document.getElementById(prefix + '_img' + i).src = info.img_url;
	}
	document.getElementById(prefix + '_hdnImg' + i).innerHTML = info.img_url;
	
	document.getElementById(prefix + '_hdnDesc' + i).innerHTML = info.description;			
	document.getElementById(prefix + '_hdnYear' + i).innerHTML = info.year;
	document.getElementById(prefix + '_hdnLink' + i).innerHTML = info.link;
	document.getElementById(prefix + '_hdnGenre' + i).innerHTML = info.tags;
	document.getElementById(prefix + '_hdnType' + i).innerHTML = info.show_type;
	document.getElementById(prefix + '_hdnActors' + i).innerHTML = info.actors;
}





