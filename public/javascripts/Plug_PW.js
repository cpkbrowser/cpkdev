/**
 * 
 */
 //var static_url = 'http://localhost:3000/';
 //var redir1 = 'http://localhost:3000/getBlank';
 var static_url = 'http://cpktestapp2.herokuapp.com/';
 var redir1 = 'http://cpktestapp2.herokuapp.com/getBlank';
 var temp_url = ''; 
 
$(document).ready(function() {
	$("#btnSearch").bind('keypress', onEnter_Search);
});

function onEnter_Search(e) {
	if (e.keyCode == 13) {
		var now = new Date();
		var val = document.getElementById('btnSearch').value.trim().replace(' ', '+');
		if (val == '') {
			alert('Please enter a show you want to watch');
		} else {
			
			$("#grdSrchResults").slideDown(150);
			
			temp_url = static_url + 'getSK?srch=' + val + '&type=tv';			
			$.ajax({
				url: temp_url,
				success: function (rslt) {
				
					var oldList = document.getElementById('showInfo');
					var oldList2 = document.getElementById('hdnValues').getElementsByTagName('table');
					if (oldList != null) {
						document.getElementById('hdnValues').removeChild(oldList);
					} else if (oldList2 != null) {
						//Internet Explorer Work-Around
						$("#hdnValues").empty();
					}
					$("#hdnValues").append(rslt.childNodes[0]);
					clearSearchResults();					
					var shows = document.getElementById('hdnValues').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('td');
					
					var itemCount = 0;
					var counter = 1;
					var imgLink = '';
					var sName = '';
					var sDesc = '';
					var sYear = '';
					var sGenre = '';
					var sLink = '';
					for (i = 0; i < shows.length; i++) {						
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
								document.getElementById('srchItem_img' + itemCount).src = imgLink;
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
					
					var then = new Date();
					var dif = then - now;
					var x = '';
					
					for (var i2 = 0; i2 < itemCount; i2++) {
						document.getElementById('srchItem_container' + i2).style.display = 'block';	
					}
					
					document.getElementById('srch_preLoader').style.display = "none";
					document.getElementById('hdnLoadResults').style.display = "none";
					$("#hdnLoadResults").fadeIn(10);					
				}
			}); 
		}
	}
}

function open_mdlInfo(t) {
	var info = document.getElementById(t.id).getElementsByTagName('div')[1].getElementsByTagName('p');
	
	var x1 = callAjax((static_url + 'getPW_Details'), ('?srch=' + info[5].innerHTML));
	var child = document.createElement('div');
	child.innerHTML = String(x1);
	child = child.firstChild;
	document.getElementById('hdnValues').appendChild(child);
	
	var desc = String(document.getElementsByClassName('movie_info')[0].getElementsByTagName('table')[0].getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML);
	document.getElementById('mdlInfo_Desc').innerHTML = desc.trim()
	var oldList = document.getElementsByClassName('movie_info')[0];
	document.getElementById('hdnValues').removeChild(oldList);
	
	document.getElementById('mdlInfo_Img').src = info[1].innerHTML;
	document.getElementById('mdlInfo_Name').innerHTML = info[0].innerHTML;
	document.getElementById('mdlInfo_Year').innerHTML = info[4].innerHTML;
	document.getElementById('mdlInfo_Genre').innerHTML = info[3].innerHTML;
	var newLink = info[5].innerHTML.replace('watch-', 'tv-');
	document.getElementById('mdlInfo_Link').innerHTML = newLink;
	document.getElementsByClassName('no-js')[0].style.overflow = 'hidden';
	document.getElementById('mdlInfoPane').style.display = 'block';
	document.getElementsByTagName('iframe')[0].parentNode.style.display = 'none';
	$("#basic-modal-content").modal({
		onClose: function(dialog) {
			document.getElementsByClassName('no-js')[0].style.overflow = 'auto';
			$.modal.close();
		}
	});	
	document.getElementById('simplemodal-container').style.width = '100%';
	var hgt = document.getElementById('mdlInfoPane').offsetHeight + 10;
	document.getElementById('simplemodal-container').style.height = String(hgt) + 'px';
	
	getEpisodes(static_url + 'getPW_Episodes' + '?srch=' + info[5].innerHTML)
}

function getEpisodes(src_url) {
	var now = new Date();
	$.ajax({
		url: src_url,
		success: function(rslt2) {
			var oldEpisodes = document.getElementById('showEpisodes');
			var oldEpisodes2 = document.getElementById('hdnValues2').getElementsByTagName('div');
			if (oldEpisodes != null) {
				document.getElementById('hdnValues2').removeChild(oldEpisodes);
			} else if (oldEpisodes2 != null) {
				//Internet Explorer Work-Around
				$("#hdnValues2").empty();
			}
			$("#hdnValues2").append(rslt2.childNodes[0]);
			
			var containers = $("#showEpisodes .tv_container");
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
				if (i == 0) {
					ep = val.getElementsByTagName('div');
					$.each(ep, function(i2, val2) {
						try {
							tempItem = val2.childNodes[1].childNodes[0].data.trim();
							if (val2.childNodes[1].childNodes.length > 1) {
								tempName = val2.childNodes[1].childNodes[1].innerHTML;
							} else {
								tempName = ' ';
							}
							if (tempName == null) {
								//Internet Explorer Work-Around
								tempName = val2.childNodes[1].childNodes[1].textContent;
							}
							var tmpArray = {
								Item: tempItem,
								Name: tempName
							}
							if (tempItem == 'Episode 1' && epCount > 0) {
								ssnList[ssnList.length] = kvpEpisodes;
								kvpEpisodes = new Array();
								epCount = 0;
							} 
							if (tempItem != 'Episode 0') {
								kvpEpisodes[epCount] = tmpArray;
								epCount += 1;
							}
							if (i2 == (ep.length - 1)) {
								ssnList[ssnList.length] = kvpEpisodes;								
							}
						} catch (e) {
							
						}
					});
				} else {
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
								tempName = val2.childNodes[1].childNodes[1].textContent;
							}
							var tmpArray = {
								Item: tempItem,
								Name: tempName
							}
							if (tempItem != 'Episode 0') {
								kvpEpisodes[epCount] = tmpArray;
								epCount += 1;
							}
							if (i3 == (ep.length - 1)) {
								ssnList[ssnList.length] = kvpEpisodes;								
							}
						} catch (e) {
							
						}
					});
				}				
			});			
			var then = new Date();
			var dif = then - now;
			var x1 = '';
			build_lnkAccordion(ssnList);
			loadSsnList(ssnList);
		}
	});
}

$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

function build_lnkAccordion(ssnList) {
	
	var xChild;
	var yChild;
	var xTextNode;
	var yTextNode;
	var uList;
	var lstItem;
	var mxWidth = 1;
	var currWidth;
	var tmpSsn;
	var tmpEp;
	var tmpLink;
	
	for (i = 0; i < ssnList.length; i++) {
		for (j = 0; j < ssnList[i].length; j++) {
			currWidth = $.fn.textWidth(String(ssnList[i][j].Item) + String(ssnList[i][j].Name));
			if (currWidth > mxWidth) {
				mxWidth = currWidth;
			}
		}
	}
	
	for (x = (ssnList.length - 1); x >= 0; x--) {
	
		xChild = document.createElement('h3');
		xTextNode = document.createTextNode('Season ' + String(x + 1));
		xChild.appendChild(xTextNode);
		document.getElementById('lnkAccordion').appendChild(xChild);
		
		yChild = document.createElement('div');
		yChild.id = 'acrdSsn_' + String(x + 1);
		yChild.style.height= '100%';
		uList = document.createElement('ul');
		
		for (y = 0; y < ssnList[x].length; y++) {
			lstItem = document.createElement('li');			
			yTextNode = document.createTextNode(String(ssnList[x][y].Item) + String(ssnList[x][y].Name));
			lstItem.style.minWidth = mxWidth + 'px';
			if (y > 8) {
				$(lstItem).click(function() { onClick_Link(1, this); });
			} else {
				$(lstItem).click(function() { onClick_Link(0, this); });
			}
			$(lstItem).css('cursor', 'pointer');
			lstItem.appendChild(yTextNode);
			uList.appendChild(lstItem);	
		}
		
		uList.style.width = String(mxWidth + 80) + 'px'; 
		yChild.appendChild(uList);
		document.getElementById('lnkAccordion').appendChild(yChild);
	}
	$("#lnkAccordion").accordion({heightStyle: 'panel', active: 0, activate: function (event, ui) {
            var scrollTop = $("#lnkAccordion").scrollTop();
            if(!ui.newHeader.length) return;
            var top = $(ui.newHeader).offset().top;
            $(this).animate({
                scrollTop: scrollTop + top - 175
            }, "fast");
        }
	});
}

function onClick_Link(flag1, obj1) {
	if (flag1 == 0) {
		tmpSsn = obj1.parentNode.parentNode.id.replace('acrdSsn_', '');
		tmpEp = obj1.innerHTML.substring(8, 9);
		tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
		getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + tmpSsn + '-episode-' + tmpEp);
		loadCurrentValues(tmpSsn, tmpEp);
	} else {
		tmpSsn = obj1.parentNode.parentNode.id.replace('acrdSsn_', '');
		tmpEp = obj1.innerHTML.substring(8, 10);
		tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
		getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + tmpSsn + '-episode-' + tmpEp);
		loadCurrentValues(tmpSsn, tmpEp);
	}
}

function loadSsnList(ssnList) {
	$("#hdnValues3").empty();	
	var table = '<table><tbody><tr>';
	for (i = 0; i < ssnList.length; i++) {
		table += '<td>' + ssnList[i].length + '</td>';
	}
	table += '</tr></tbody></table>';
	var div1 = document.getElementById('hdnValues3');
	div1.innerHTML = table;
}

function getLinks(lnkUrl) {
	var lnkList = {};
	document.getElementById('mdlNavButtons').style.display = 'none';
	$.ajax({
		url: lnkUrl,
		success: function(rslt3) {
			var oldLinks = document.getElementById('showLinks');
			var oldLinks2 = document.getElementById('hdnValues4').getElementsByTagName('div');
			if (oldLinks != null) {
				document.getElementById('hdnValues4').removeChild(oldLinks);
			} else if (oldLinks2 != null) {
				//Internet Explorer Work-Around
				$("#hdnValues4").empty();
			}
			$("#hdnValues4").append(rslt3.childNodes[0]);
			
			lnkList = getLinkArray();
			var topLink = orderLinkList(lnkList);
			
			document.getElementById('mdlNavButtons').style.display = 'inline-block';
			document.getElementById('simplemodal-container').childNodes[0].display = 'inline';
			if (topLink != 'none') {
				prepareMovieFrame(topLink);
			} else {
				alert('No Links Found.');
			}
		}
	});	
}

function getLinkArray() {
	var lnkList = {};
	var containers = $("#showLinks .movie_version_link");
    if (containers.length < 1) {
    	//Internet Explorer Work-Around
    	containers = document.getElementById('hdnValues4').getElementsByTagName('div')[0].getElementsByTagName('span');
    	containers = $(containers);
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

function prepareMovieFrame(currLink) {
	document.getElementsByClassName('no-js')[0].style.overflow = 'auto';
	$.modal.close();
	document.getElementById('mdlInfoPane').style.display = 'none';
	var frame = document.getElementsByTagName('iframe')[0];
	frame.src = getVideo(currLink);
	frame.height = ($(window).height()) - 175
	frame.parentNode.style.display = 'block';
	
	$($(frame)).load(function() {
		var prevent_bust = 0  
		window.onbeforeunload = function() { prevent_bust++ }  
		setInterval(function() {  
		  if (prevent_bust > 0) {  
		    prevent_bust -= 2
		    window.top.location = redir1
		  }  
		}, 1);	
	});
	
	document.getElementsByClassName('no-js')[0].style.overflow = 'hidden';
	$("#basic-modal-content").modal({
		onClose: function(dialog) {
			document.getElementsByClassName('no-js')[0].style.overflow = 'auto';
			var frame = document.getElementsByTagName('iframe')[0];
			frame.src = 'about:blank';
			frame.parentNode.style.display = 'none';
			document.getElementById('mdlInfoPane').style.display = 'block';
			$.modal.close();
		}
	});	
}

function getVideo(lnkUrl) {
	var rslt4 = callAjax(static_url + 'getPW_Video', '?srch=' + lnkUrl);
	return rslt4;
}

function orderLinkList(lnkList) {
	var authLinks = {};
	var a_count = 0;
	var unauthLinks = {};
	var u_count = 0;
	var tempLinks = {};
	var finalList = {};
	var tempItem = 0;
	var tmpString = '';
	
	for (i = 0; i < lnkList.length; i++) {
		tmpString = String(lnkList[i]);
		if (tmpString.indexOf('Z29yaWxsYXZpZC5pbg') != -1) {
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 7;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('bm9zdmlkZW8uY29t') != -1) {
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 6;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('c29ja3NoYXJlLmNvbQ') != -1) {
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 5;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('cHJvbXB0ZmlsZS5jb20') != -1) {
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 4;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('bm93dmlkZW8uZXU') != -1) {
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 3;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('cHV0bG9ja2VyLmNvbQ') != -1) {
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 2;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
		} else if (tmpString.indexOf('bm92YW1vdi5jb20') != -1) {
			authLinks[a_count] = new Array(2);
			authLinks[a_count][0] = 1;
			authLinks[a_count][1] = lnkList[i];
			a_count++;
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
	
	loadLinkResults(authLinks, unauthLinks);
	
	return topLink;
}

function loadLinkResults(authLinks, unauthLinks) {
	
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
	
	var t1 = document.createTextNode('1');	
	document.getElementById('hdnValues6').appendChild(div1);
	document.getElementById('hdnValues6').appendChild(t1);
}

function loadNextLink() {
	document.getElementById('mdlNavButtons').style.display = 'none';
	var div1 = document.getElementById('hdnValues6');
	var lnkIndex = div1.childNodes[1].nodeValue;
	var nextLink = div1.getElementsByTagName('li')[lnkIndex];
	div1.childNodes[1].nodeValue = parseInt(lnkIndex, 10) + 1;	
	
	var frame = document.getElementById('mdlVideoFrame');
	
	$($(frame)).load(function() {
		var prevent_bust = 0  
		window.onbeforeunload = function() { prevent_bust++ }  
		setInterval(function() {  
		  if (prevent_bust > 0) {  
		    prevent_bust -= 2
		    window.top.location = redir1
		  }  
		}, 1);	
	});
	
	if (nextLink.innerText == undefined) {
		frame.src = getVideo(nextLink.lastChild.nodeValue);
	} else {
		frame.src = getVideo(nextLink.innerText);
	}
	document.getElementById('mdlNavButtons').style.display = 'inline-block';
}

function loadCurrentValues(ssn, ep) {	
	$("#hdnValues5").empty();	
	var t1 = document.createTextNode(ssn);	
	var t2 = document.createTextNode(ep);	
	document.getElementById('hdnValues5').appendChild(t1);
	document.getElementById('hdnValues5').appendChild(t2);
}

function loadNextEpisode() {	
	document.getElementById('mdlNavButtons').style.display = 'none';
	//document.getElementsByClassName('modalCloseImg simplemodal-close')[0].display = 'none';
	document.getElementById('simplemodal-container').childNodes[0].display = 'none';
	var div1 = document.getElementById('hdnValues5');	
	var tmpSsn = div1.childNodes[0].nodeValue;
	var ssn = parseInt(tmpSsn, 10);
	var tmpEp = div1.childNodes[1].nodeValue;
	var ep = parseInt(tmpEp, 10) + 1;
	
	var container = document.getElementById('hdnValues3').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td');
	var tmpNum = container[(ssn - 1)].innerHTML;
	var maxEpisode = parseInt(tmpNum, 10);
	if (ep > maxEpisode) {
		if (container.length <= ssn) {
			alert('You have finished the series.');
			return;
		} else {
			ssn++;
			ep = 1;
		}
	}
	
	div1.childNodes[0].nodeValue = ssn;
	div1.childNodes[1].nodeValue = ep;
	tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
	getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + ssn + '-episode-' + ep);
}



