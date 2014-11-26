$(document).ready(function() {

	//Tie Button Click Events
	
	//Popular on CPK Next Button
	$('#popItem_getMore').click(function() {
		if (document.getElementById('hdnPopSetLoaded').innerHTML != 'false') {
			var shows = document.getElementById('hdn_tblPopular').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			var popSetCounter = parseInt(document.getElementById('hdnPopSetCounter').innerHTML, 10);
			if (popSetCounter < 14) {
				popSetCounter++;
				document.getElementById('hdnPopSetCounter').innerHTML = popSetCounter;
				for (i = 0; i < 6; i++) {
					var tmpInfo = shows[i + popSetCounter].getElementsByTagName('td');
					var info = {
						name: tmpInfo[0].innerHTML,
						img_url: tmpInfo[1].innerHTML,
						description: tmpInfo[2].innerHTML,
						tags: tmpInfo[3].innerHTML,
						year: tmpInfo[4].innerHTML,
						link: tmpInfo[5].innerHTML
					}
					changeCPKBinObjects('popItem', i, info);
				}
			} else {
				
			}
		}
	});
	
	//Popular on CPK Previous Button
	$('#popItem_getLess').click(function() {
		if (document.getElementById('hdnPopSetLoaded').innerHTML != 'false') {
			var shows = document.getElementById('hdn_tblPopular').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			var popSetCounter = parseInt(document.getElementById('hdnPopSetCounter').innerHTML, 10);
			if (popSetCounter > 0) {
				popSetCounter--;
				document.getElementById('hdnPopSetCounter').innerHTML = popSetCounter;
				for (i = 0; i < 6; i++) {
					var tmpInfo = shows[i + popSetCounter].getElementsByTagName('td');
					var info = {
						name: tmpInfo[0].innerHTML,
						img_url: tmpInfo[1].innerHTML,
						description: tmpInfo[2].innerHTML,
						tags: tmpInfo[3].innerHTML,
						year: tmpInfo[4].innerHTML,
						link: tmpInfo[5].innerHTML
					}
					changeCPKBinObjects('popItem', i, info);
				}
			} else {
				
			}
		}
	});
	
	//CPK User - Favorites - Next Button
	$('#favItem_getMore').click(function() {
		if (document.getElementById('hdnFavSetLoaded').innerHTML != 'false') {
			var shows = document.getElementById('hdn_tblFavorites').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			var favSetCounter = parseInt(document.getElementById('hdnFavSetCounter').innerHTML, 10);
			if (favSetCounter < 14) {
				favSetCounter++;
				document.getElementById('hdnFavSetCounter').innerHTML = favSetCounter;
				for (i = 0; i < 6; i++) {
					var tmpInfo = shows[i + favSetCounter].getElementsByTagName('td');
					var info = {
						name: tmpInfo[0].innerHTML,
						img_url: tmpInfo[1].innerHTML,
						description: tmpInfo[2].innerHTML,
						tags: tmpInfo[3].innerHTML,
						year: tmpInfo[4].innerHTML,
						link: tmpInfo[5].innerHTML
					}
					changeCPKBinObjects('favItem', i, info);
				}
			} else {
				
			}
		}
	});
	
	//CPK User - Favorites - Previous Button
	$('#favItem_getLess').click(function() {
		if (document.getElementById('hdnFavSetLoaded').innerHTML != 'false') {
			var shows = document.getElementById('hdn_tblFavorites').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			var favSetCounter = parseInt(document.getElementById('hdnFavSetCounter').innerHTML, 10);
			if (favSetCounter > 0) {
				favSetCounter--;
				document.getElementById('hdnFavSetCounter').innerHTML = favSetCounter;
				for (i = 0; i < 6; i++) {
					var tmpInfo = shows[i + favSetCounter].getElementsByTagName('td');
					var info = {
						name: tmpInfo[0].innerHTML,
						img_url: tmpInfo[1].innerHTML,
						description: tmpInfo[2].innerHTML,
						tags: tmpInfo[3].innerHTML,
						year: tmpInfo[4].innerHTML,
						link: tmpInfo[5].innerHTML
					}
					changeCPKBinObjects('favItem', i, info);
				}
			} else {
				
			}
		}
	});
});

function loadCPKBins_Standard() {
	
	var user_id = document.getElementById('userInfo_ID').innerHTML;
	var request = $.ajax({
		url: '/cpkLoadBins',
		type: 'POST',
		data: {popular: 'true', favorites: 'true', userID: user_id},
		contentType: 'application/x-www-form-urlencoded',
		dataType: 'json'		
	});
	
	request.success(function(rslt) {
		var table1 = createBinTable(rslt.rsltPop, 'cpk_popShows', 'popItem');
		document.getElementById('hdn_tblPopular').appendChild(table1);
		document.getElementById('hdnPopSetLoaded').innerHTML = 'true';
		
		var table2 = createBinTable(rslt.rsltFav, 'cpk_favShows', 'favItem');
		document.getElementById('hdn_tblFavorites').appendChild(table2);
		document.getElementById('hdnFavSetLoaded').innerHTML = 'true';
		//alert('succeeded');
	});
	
	request.fail(function(jqXHR, textStatus) {
		alert('Error Saving Show Info');
	});
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
			changeCPKBinObjects(binID, i, rslt[i]);
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
}





