/**
 * 
 */
var static_url = window.location;
var redir1 = static_url + 'getBlank';

var temp_url = ''; 

function PWTV_processSearchResults(){

	var shows = document.getElementById('hdnValues').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('td');
	var rsltSetCounter = parseInt(document.getElementById('hdnRsltSetCounter').innerHTML, 10);
	
	var itemCount = 0;
	var counter = 1;
	var imgLink = '';
	var sName = '';
	var sDesc = '';
	var sYear = '';
	var sGenre = '';
	var sLink = '';
	for (i = rsltSetCounter; i < shows.length; i++) {						
		switch (counter) {
			case 1:
				sName = shows[i].innerHTML;
				if (sName == undefined) {
					sName = shows[i].textContent;
				}
				
				document.getElementById('srchItem_n' + itemCount).innerHTML = sName;
				document.getElementById('srchItem_hdnName' + itemCount).innerHTML = sName;
				break;
			case 2:
				
				break;
			case 3:
				sYear = shows[i].innerHTML;
				if (sYear == undefined) {
					sYear = shows[i].textContent;
				}
				document.getElementById('srchItem_hdnYear' + itemCount).innerHTML = sYear;
				break;
			case 4:
				imgLink = shows[i].innerHTML;
				if (imgLink == undefined) {
					imgLink = shows[i].textContent;
				}
				//add conditional statement to allow for more plug-ins
				if (imgLink != '/images/noposter.jpg') {
					document.getElementById('srchItem_img' + itemCount).src = imgLink;
				}
				document.getElementById('srchItem_hdnImg' + itemCount).innerHTML = imgLink;
				break;
			case 5:
				sLink = shows[i].innerHTML;
				if (sLink == undefined) {
					sLink = shows[i].textContent;
				}
				document.getElementById('srchItem_hdnLink' + itemCount).innerHTML = sLink;
				break;
			case 6:
				sGenre = shows[i].innerHTML;
				if (sGenre == undefined) {
					sGenre = shows[i].textContent;
				}
				document.getElementById('srchItem_hdnGenre' + itemCount).innerHTML = sGenre;
				break;
		}	
		
		if (counter == 6) {
			counter = 1;
			itemCount++;
		} else {
			counter++;
		}
		
		if (itemCount == 6) {
			i = shows.length;
		}
	}
	
	imgLink = ''; sName = ''; sDesc = ''; sYear = ''; sGenre = ''; sLink = '';					
	
	/* var then = new Date();
	var dif = then - now;
	var x = ''; */
	
	for (var i2 = 0; i2 < itemCount; i2++) {
		document.getElementById('srchItem_container' + i2).style.display = 'block';	
	}
	
	document.getElementById('srch_preLoader').style.display = "none";
	
	var isLoaded = document.getElementById('hdnRsltSetLoaded').innerHTML;
	if (isLoaded == 'false') {
		document.getElementById('hdnRsltSetLoaded').innerHTML = 'true';
		document.getElementById('hdnLoadResults').style.display = "none";
		$("#hdnLoadResults").fadeIn(10);
	}
}

function PWTV_getEpisodes(src_url) {
	var now = new Date();
	$.ajax({
		url: src_url,
		success: function(rslt2) {
			var rsltType = rslt2.childNodes[0].id;
			if (rsltType == undefined) {
				rsltType = rslt2.childNodes[0].attributes[1].nodeValue;
			}
			if (rsltType == "showEpisodes") {
				document.getElementById('hdnModalType').innerHTML = 'tv';
				PWTV_getEpisodes_processResults(rslt2);
				document.getElementById('mdlInfo_tabLinks').style.display = 'block';
				var fName = document.getElementById('mdlInfo_Name').innerHTML.trim().replace(' ', '-*-') + '_cookie';
				if (readCookie(fName) != null) {
					document.getElementById('mdlKeepWatch').style.display = 'block';
				}
			} else if (rsltType == "movieLinks") {
				$('#hdnValues3').empty();
				document.getElementById('hdnModalType').innerHTML = 'movie';
				PWTV_getMovieLinks_processResults(rslt2);
				document.getElementById('mdlInfo_tabLinks').style.display = 'none';
			}
			if (document.getElementById('hdnQuickLink').innerHTML == 'true') {
				quickLink_Click();
			}
		}
	});
}

function PWTV_getEpisodes_processResults(rslt2) {
		
	$("#hdnValues2").empty();
	$("#hdnValues2").append(rslt2.childNodes[0]);
	
	var containers = $("#showEpisodes .show_season");
	if (containers.length < 1) {
		//Internet Explorer Work-Around
		containers = document.getElementById('hdnValues2').getElementsByTagName('div')[0];
		containers = $(containers);
	}
	var linkList = new Array();
	var ssnList = new Array();
	var kvpEpisodes = new Array();
	var tempItem = '';
	var tempName = '';
	var ep;
	var epCount = 0;
	
	$.each(containers, function(i, val) {
		kvpEpisodes = new Array();
		ep = val.getElementsByTagName('div');
		epCount = 0;
		$.each(ep, function(i3, val3) {
			try {
				tempItem = val3.childNodes[1].childNodes[0].data.trim();
				if (val3.childNodes[1].childNodes.length > 1) {
					tempName = val3.childNodes[1].childNodes[1].innerHTML;
				} else {
					tempName = ' ';
				}
				if (tempName == null) {
					//Internet Explorer Work-Around							
					tempName = val3.childNodes[1].childNodes[1].textContent;
				}
				var tmpArray = {
					Item: tempItem,
					Name: tempName
				}
				if (tempItem != 'E0') {
					kvpEpisodes[epCount] = tmpArray;
					epCount += 1;
				}
				if (i3 == (ep.length - 1)) {
					ssnList[ssnList.length] = kvpEpisodes;								
				}
			} catch (e) {
				
			}
		}); 				
	});
	
	build_lnkAccordion(ssnList);
	loadSsnList(ssnList);
}

function PWTV_getLinks(lnkUrl) {
	var lnkList = {};
	document.getElementById('mdlNavButtons').style.display = 'none';
	$.ajax({
		url: lnkUrl,
		success: function(rslt3) {
			PWTV_getLinks_processResults(rslt3);
		}
	});	
}

function PWTV_getMovieLinks_processResults(rslt2) {
	$("#hdnValues7").empty();
	$("#hdnValues7").append(rslt2.childNodes[0]);
	
	lnkList = PWTV_getLinkArray();
	var topLink = PWTV_orderLinkList(lnkList);
	
	document.getElementById('mdlNavButtons').style.display = 'inline-block';
	document.getElementById('simplemodal-container').childNodes[0].display = 'inline';
	document.getElementById('mdlStartMovie').style.display = 'block';	
}

function PWTV_getLinks_processResults(rslt3) {
	
	$("#hdnValues4").empty();
	$("#hdnValues4").append(rslt3.childNodes[0]);
	
	lnkList = PWTV_getLinkArray();
	var topLink = PWTV_orderLinkList(lnkList);
	
	document.getElementById('mdlNavButtons').style.display = 'inline-block';
	document.getElementById('simplemodal-container').childNodes[0].display = 'inline';
	if (topLink != 'none') {
		prepareMovieFrame(topLink);
		create_RWCookie();
	} else {
		alert('No Links Found.');
	}
}

function create_RWCookie() {
	var sName = document.getElementById('mdlInfo_Name').innerHTML.replace(' ', '-*-') + '_cookie';
	var info = document.getElementById('hdnValues5').childNodes;
	var ssn = info[0].nodeValue;
	var ep = info[1].nodeValue;
	createCookie(sName, (ssn + '*' + ep), 7);
}

function PWTV_getLinkArray() {
	var lnkList = {};
	var modType = document.getElementById('hdnModalType').innerHTML;
	var containers;
	if (modType == 'tv') {
		containers = $("#showLinks .movie_version_link");
	} else if (modType == 'movie') {
		containers = $("#movieLinks .movie_version_link");
	}
    if (containers.length < 1) {
    	//Internet Explorer Work-Around
		if (modType == 'tv') {
			containers = document.getElementById('hdnValues4').getElementsByTagName('div')[0].getElementsByTagName('span');
			containers = $(containers);
		} else if (modType == 'movie') {
			containers = document.getElementById('hdnValues7').getElementsByTagName('div')[0].getElementsByTagName('span');
			containers = $(containers);
		}
    }
	var count = 0;
    $.each(containers, function(i, val) {
    	var x = val.getElementsByTagName('a')[0].getAttribute("href");
    	lnkList[i] = x;
		count++;
    });
	Object.defineProperty(lnkList, 'length', {
		__proto__: null,
		value: count
	});
	return lnkList;
}

function PWTV_orderLinkList(lnkList) {
	var authLinks = {};
	var a_count = 0;
	var unauthLinks = {};
	var u_count = 0;
	var tempLinks = {};
	var finalList = {};
	var tempItem = 0;
	var tmpString = '';
	var isMobile = window.mobilecheck();
		
	for (i = 0; i < lnkList.length; i++) {
		tmpString = String(lnkList[i]);
		if (tmpString.indexOf('Z29yaWxsYXZpZC5pbg') != -1) {
			//Gorillavid
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 9;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('bm93dmlkZW8uZXU') != -1) {
			//Nowvideo
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 8;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('c2hhcmVyZXBvLmNvbQ') != -1) {
			//ShareRepo
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 7;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('dGhldmlkZW8ubWU') != -1) {
			//theVideo
			authLinks[a_count] = new Array(2);
			if (isMobile.iOS() != null) {
				authLinks[a_count][0] = 18;
			} else {
				authLinks[a_count][0] = 6;
			}
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('c29ja3NoYXJlLmNvbQ') != -1) {
			//Sockshare
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 5;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('cHJvbXB0ZmlsZS5jb20') != -1) {
			//Promptfile
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 4;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('bm92YW1vdi5jb20') != -1) {
			//Novamov
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 3;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('bm9zdmlkZW8uY29t') != -1) {
		    //Nosvideo
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 2;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('cHV0bG9ja2VyLmNvbQ') != -1) {
			//Putlocker
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 1;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('ZnJhbWVndGZv') != -1) {
			//do nothing
		} else if (tmpString.indexOf('YmVzdHJlYW1zLm5ldA') != -1) {
			//do nothing
		} else if (tmpString.indexOf('bWlnaHR5dXBsb2FkLmNvbQ') != -1) {
			//do nothing
		} else if (tmpString.indexOf('dXBsb2FkYy5jb20') != -1) {
			//do nothing
		} else if (tmpString.indexOf('emFsYWEuY29t') != -1) {
			//do nothing
		} else {
			unauthLinks[u_count] = lnkList[i];
			u_count++;
		}
	}
	
	var swapped;
	do {
		var swapped = false;
		for (i = 0; i < (a_count - 1); i++) {
			if (authLinks[i][0] < authLinks[i + 1][0]) {
				tempItem = authLinks[i];
				authLinks[i] = authLinks[i + 1];
				authLinks[i + 1] = tempItem;
				swapped = true;
			}
		}
	} while (swapped)	
	
	var topLink;
	if (a_count > 0) {
		topLink = authLinks[0][1];
	} else if (u_count > 0) {
		topLink = unauthLinks[0];
	} else {
		topLink = 'none'
	}
	
	Object.defineProperty(authLinks, 'length', {
		__proto__: null,
		value: a_count
	});
	Object.defineProperty(unauthLinks, 'length', {
		__proto__: null,
		value: u_count
	});
	
	PWTV_loadLinkResults(authLinks, unauthLinks);
	
	return topLink;
}

function PWTV_loadLinkResults(authLinks, unauthLinks) {
	
	$("#hdnValues6").empty();

	var table = '<ul>';
	for (i = 0; i < authLinks.length; i++) {
		table += ('<li>' + authLinks[i][1] + '</li>');
	}
	for (i = 0; i < unauthLinks.length; i++) {
		table += ('<li>' + unauthLinks[i] + '</li>');
	}
	table += '</ul></div>';
	
	var div1 = document.createElement('div');
	div1.id = 'LinkList';
	div1.style.display = 'none';
	div1.innerHTML = table;
	div1 = div1.firstChild;
	
	var t1 = document.createTextNode('0');	
	document.getElementById('hdnValues6').appendChild(div1);
	document.getElementById('hdnValues6').appendChild(t1);
}





