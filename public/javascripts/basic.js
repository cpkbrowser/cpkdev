//var static_url = 'http://localhost:3000/';
//var redir1 = 'http://localhost:3000/getBlank';
var static_url = 'http://cpktestapp2.herokuapp.com/';
var redir1 = 'http://cpktestapp2.herokuapp.com/getBlank';

$(document).ready(function() {
	
	$("#btnSearch").bind('keypress', onEnter_Search);
	$("#btnSrchSubmit").click(function() {
		onClick_Search();
	});	
	
	$('#user_password').bind('keypress', onEnter_Login);
	
	$("#navCntrlContainer").click(function() {
		mdlNavInfo_Click();
	});

	$('.season-select').click(function(e) {
		e.stopPropagation();
	});
	$('.episode-select').click(function(e) {
		e.stopPropagation();
	});
	$('.source-select').click(function(e) {
		e.stopPropagation();
	});
	$("#user_username").click(function(e) {
		e.stopPropagation();
	});
	$("#user_password").click(function(e) {
		e.stopPropagation();
	});
	$("#user_remember_me").click(function(e) {
		e.stopPropagation();
	});
	$("#frmUser").click(function(e) {
		e.stopPropagation();
	});
	$("#ddlLogin").click(function(e) {
		e.stopPropagation();
	});
	
	var prevent_bust = 0  
    window.onbeforeunload = function() { prevent_bust++ }  
    setInterval(function() {  
      if (prevent_bust > 0) {  
        prevent_bust -= 2
        window.top.location = static_url;
		//window.top.location = static_url;
      }  
    }, 1);
	
	$(document).bind('keyup', function(e) {
		if(e.which === 116) {
			window.onbeforeunload = function() {};
		} else if (e.which ===13) {
			$.modal.close()
		} else if (e.which === 118) {
			//loadCPKBin_Popular();
		}
	});
	
	$('#btnLogin').click(function() {
		beginLogin();
	});
	
	$('#srchItem_getMore').click(function() {
		var num = parseInt(document.getElementById('hdnRsltSetCounter').innerHTML, 10);		
		var shows = document.getElementById('hdnValues').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		if ((num + 36) < (shows.length * 6)) {
			//Put conditional statement here to change between plugins
			document.getElementById('hdnRsltSetCounter').innerHTML = num + 6;
			PWTV_processSearchResults();			
		} else {
		
		}
	});
	
	$('#srchItem_getLess').click(function() {
		var num = parseInt(document.getElementById('hdnRsltSetCounter').innerHTML, 10);
		if (num > 0) { 
			//Put conditional statement here to change between plugins
			document.getElementById('hdnRsltSetCounter').innerHTML = num - 6;
			PWTV_processSearchResults();
		} else {
			
		}
	});
	
});

function beginLogin() {	
	$.ajax({
		url: '/cpkconnect',
		type: 'POST',
		data: $('#frmUser').serialize(),
		dataTpe: 'json',
		success: function(rslt) {
			if (rslt.rslt.substring(0, 4) == 'true') {
				document.getElementById('userInfo_ID').innerHTML = rslt.rslt.split('?&')[1];
				document.getElementById('userInfo_username').innerHTML = rslt.rslt.split('?&')[2];
				loadCPKBins_Standard();
				
				document.getElementById('binCategoryContainer').style.display = 'block';
				document.getElementById('pFailedLogin').style.display = 'none';
				document.getElementById('srchbarContainer').click();
				document.getElementById('landingPage').style.display = 'none';
				document.getElementById('binCategoryContainer').style.display = 'block';
				$('#btnLogin').click(function() {});					
			} else {
				document.getElementById('pFailedLogin').style.display = 'block';
			}
		}
	});	
}

function onEnter_Search(e) {
	if (e.keyCode == 13) {		
		var val = document.getElementById('btnSearch').value.trim().replace(' ', '+');
		if (val == '') {
			alert('Please enter a show you want to watch');
		} else {
			
			$("#grdSrchResults").slideDown(150);
			
			temp_url = static_url + 'getSK?srch=' + val + '&type=tv';			
			$.ajax({
				url: temp_url,
				success: function (rslt) {	
					$("#hdnValues").empty();
					$("#hdnValues").append(rslt.childNodes[0]);
					clearSearchResults();
					document.getElementById('hdnRsltSetCounter').innerHTML = '0';
					
					//Put conditional statement here to change between plugins
					PWTV_processSearchResults();
				}
			}); 
		}
	}
}

function onEnter_Login(e) {
	if (e.keyCode == 13) {
		beginLogin();
	}
}

function onClick_Search() {
	$("#grdSrchResults").slideDown(150);
	var val = document.getElementById('btnSearch').value.trim().replace(' ', '+');
			
	temp_url = static_url + 'getSK?srch=' + val + '&type=tv';			
	$.ajax({
		url: temp_url,
		success: function (rslt) {	
			$("#hdnValues").empty();
			$("#hdnValues").append(rslt.childNodes[0]);
			clearSearchResults();
			
			//Put conditional statement here to change between plugins
			PWTV_processSearchResults();
		}
	}); 
}

function open_mdlInfo(t) {
	document.getElementById('mdlActive_Div').innerHTML = t.id;
	var info = document.getElementById(t.id).getElementsByTagName('div')[1].getElementsByTagName('p');
	
	//add conditional statement to allow for more plug-ins
	var testx = t.id.substring(0, 4);
	if (t.id.substring(0, 4) == 'srch') {
		var x1 = callAjax((static_url + 'getPW_Details'), ('?srch=' + info[5].innerHTML + '&type=false'));
		
		var child = document.createElement('div');
		child.innerHTML = String(x1);
		child = child.firstChild;
		document.getElementById('hdnValues').appendChild(child);
		
		var desc = String(document.getElementsByClassName('movie_info')[0].getElementsByTagName('table')[0].getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML);	
		document.getElementById('mdlInfo_Desc').innerHTML = desc.trim().replace(/\r?\n|\r/, '');
		var oldList = document.getElementsByClassName('movie_info')[0];
		document.getElementById('hdnValues').removeChild(oldList);
	} else {
		document.getElementById('mdlInfo_Desc').innerHTML = info[2].innerHTML;
	}
	
	document.getElementById('mdlInfo_Img').src = info[1].innerHTML;
	document.getElementById('mdlInfo_Name').innerHTML = info[0].innerHTML;
	document.getElementById('mdlInfo_Year').innerHTML = info[4].innerHTML;
	document.getElementById('mdlInfo_Genre').innerHTML = info[3].innerHTML;
	var newLink = info[5].innerHTML.replace('watch-', 'tv-');
	document.getElementById('mdlInfo_Link').innerHTML = newLink;
	document.getElementsByClassName('no-js')[0].style.overflow = 'hidden';
	document.getElementById('mdlInfoPane').style.display = 'block';
	document.getElementById('mdlVideoFrame').parentNode.style.display = 'none';
	$("#basic-modal-content").modal({
		onClose: function(dialog) {
			document.getElementsByClassName('no-js')[0].style.overflow = 'auto';
			$.modal.close();
			send_cpkShowData();
		}
	});	
	document.getElementById('simplemodal-container').style.width = '100%';
	var hgt = document.getElementById('mdlInfoPane').offsetHeight + 10;
	document.getElementById('simplemodal-container').style.height = String(hgt) + 'px';
	
	//add conditional statement to allow for more plug-ins
	if (t.id.substring(0, 4) == 'srch') {
		info[2].innerHTML = desc.trim();
	} 	
	PWTV_getEpisodes(static_url + 'getPW_Episodes' + '?srch=' + info[5].innerHTML)
}

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
		uList.className += ' season_list';
		
		for (y = 0; y < ssnList[x].length; y++) {
			lstItem = document.createElement('li');	
			lstItem.className += ' episode_item';		
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
		tmpEp = obj1.innerHTML.substring(1, 2);
		tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
		//add conditional statement to allow for more plug-ins
		PWTV_getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + tmpSsn + '-episode-' + tmpEp);
		loadCurrentValues(tmpSsn, tmpEp);
	} else {
		tmpSsn = obj1.parentNode.parentNode.id.replace('acrdSsn_', '');
		tmpEp = obj1.innerHTML.substring(1, 3);
		tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
		PWTV_getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + tmpSsn + '-episode-' + tmpEp);
		loadCurrentValues(tmpSsn, tmpEp);
	}
}

function loadCurrentValues(ssn, ep) {	
	$("#hdnValues5").empty();	
	var t1 = document.createTextNode(ssn);	
	var t2 = document.createTextNode(ep);	
	document.getElementById('hdnValues5').appendChild(t1);
	document.getElementById('hdnValues5').appendChild(t2);
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

function prepareMovieFrame(currLink) {
	document.getElementsByClassName('no-js')[0].style.overflow = 'auto';
	$.modal.close();
	document.getElementById('mdlInfoPane').style.display = 'none';
	var frame = document.getElementById('mdlVideoFrame');
	//add conditional statement to allow for more plug-ins
	//if (plugin_type == 'PW')
	frame.src = getVideo(currLink);
	frame.height = ($(window).height()) - 175
	frame.parentNode.style.display = 'block';
	
	$($(frame)).load(function() {
		$("#simplemodal-container").css('height', 'auto'); //To reset the container.
		$(window).trigger('resize.simplemodal'); 
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
			var frame = document.getElementById('mdlVideoFrame');
			frame.src = 'about:blank';
			frame.parentNode.style.display = 'none';
			document.getElementById('mdlInfoPane').style.display = 'block';
			$.modal.close();
			send_cpkShowData();
		}
	});	
	
	var modType = document.getElementById('hdnModalType').innerHTML;
	if (modType == 'tv') {
		document.getElementById('mdlNavEpisodes').style.display = 'inline-block';
	} else if (modType == 'movie') {
		document.getElementById('mdlNavEpisodes').style.display = 'none';
	}
}

function getVideo(lnkUrl) {
	//add conditional statement to allow for more plug-ins
	//if (plugin_type == 'PW')
	var rslt4 = callAjax(static_url + 'getPW_Video', '?srch=' + lnkUrl);
	//else
	//rslt4 = callAjax(static_url + 'someotherplugin', '?srch=' + lnkUrl);
	return rslt4;
}

function startMovie() {
	var div1 = document.getElementById('hdnValues6');	
	var lnk = div1.getElementsByTagName('li')[0];
	var lnk2;
	if (lnk.innerText == undefined) {
		lnk2 = lnk.lastChild.nodeValue;
	} else {
		lnk2 = lnk.innerText;
	}	
	prepareMovieFrame(lnk2);
}

function loadPreviousLink() {
	document.getElementById('mdlNavButtons').style.display = 'none';
	var div1 = document.getElementById('hdnValues6');
	var tmpIndex = div1.childNodes[1].nodeValue;
	var lnkIndex = parseInt(tmpIndex, 10);
	if (lnkIndex > 0) {
		lnkIndex = (lnkIndex - 1);
	} else {
		var lnkCount = div1.getElementsByTagName('li').length;
		lnkIndex = (lnkCount - 1);
	}
	var nextLink = div1.getElementsByTagName('li')[lnkIndex];
	div1.childNodes[1].nodeValue = lnkIndex;	
	
	var frame = document.getElementById('mdlVideoFrame');
	
	$($(frame)).load(function() {
		$("#simplemodal-container").css('height', 'auto'); //To reset the container.
		$(window).trigger('resize.simplemodal'); 
		
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
	
	var modType = document.getElementById('hdnModalType').innerHTML;
	if (modType == 'tv') {
		document.getElementById('mdlNavEpisodes').style.display = 'inline-block';
	} else if (modType == 'movie') {
		document.getElementById('mdlNavEpisodes').style.display = 'none';
	}
	document.getElementById('mdlNavButtons').style.display = 'inline-block';
}

function loadNextLink() {
	document.getElementById('mdlNavButtons').style.display = 'none';
	var div1 = document.getElementById('hdnValues6');
	var tmpIndex = div1.childNodes[1].nodeValue;
	var lnkIndex = parseInt(tmpIndex, 10);
	var lnkCount = div1.getElementsByTagName('li').length;
	if (lnkIndex < (lnkCount - 1)) {
		lnkIndex++;
	} else {
		lnkIndex = 0;
	}
	var nextLink = div1.getElementsByTagName('li')[lnkIndex];
	div1.childNodes[1].nodeValue = lnkIndex;	
	
	var frame = document.getElementById('mdlVideoFrame');
	
	$($(frame)).load(function() {
		$("#simplemodal-container").css('height', 'auto'); //To reset the container.
		$(window).trigger('resize.simplemodal'); 
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
	
	var modType = document.getElementById('hdnModalType').innerHTML;
	if (modType == 'tv') {
		document.getElementById('mdlNavEpisodes').style.display = 'inline-block';
	} else if (modType == 'movie') {
		document.getElementById('mdlNavEpisodes').style.display = 'none';
	}
	document.getElementById('mdlNavButtons').style.display = 'inline-block';
}

function loadPreviousEpisode() {
	document.getElementById('mdlNavButtons').style.display = 'none';
	//document.getElementsByClassName('modalCloseImg simplemodal-close')[0].display = 'none';
	var testx = document.getElementById('simplemodal-close');
	var div1 = document.getElementById('hdnValues5');	
	var tmpSsn = div1.childNodes[0].nodeValue;
	var ssn = parseInt(tmpSsn, 10);
	var tmpEp = div1.childNodes[1].nodeValue;
	var ep = parseInt(tmpEp, 10);
	
	var container = document.getElementById('hdnValues3').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td');
	var epCount = div1.getElementsByTagName('li').length;
	if (ep > 1) {
		ep = (ep - 1);
	} else {
		if (ssn > 1) {
			ssn = (ssn - 1);
			var tmpNum = container[(ssn - 1)].innerHTML;
			ep = tmpNum;			
		} else {
			alert('You are currently on the 1st epidode of the 1st season. Please click "Next Episode".');
			document.getElementById('mdlNavButtons').style.display = 'inline-block';
			return;
		}
	}
	
	div1.childNodes[0].nodeValue = ssn;
	div1.childNodes[1].nodeValue = ep;
	tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
	//add conditional statement to allow for more plug-ins
	PWTV_getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + ssn + '-episode-' + ep);
}

function loadNextEpisode() {	
	document.getElementById('mdlNavButtons').style.display = 'none';
	//document.getElementsByClassName('modalCloseImg simplemodal-close')[0].display = 'none';
	var testx = document.getElementById('simplemodal-close');
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
			document.getElementById('mdlNavButtons').style.display = 'inline-block';
			return;
		} else {
			ssn++;
			ep = 1;
		}
	}
	
	div1.childNodes[0].nodeValue = ssn;
	div1.childNodes[1].nodeValue = ep;
	tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
	//add conditional statement to allow for more plug-ins
	PWTV_getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + ssn + '-episode-' + ep);
}

$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

function send_cpkShowData() {
	var activeDiv = document.getElementById('mdlActive_Div').innerHTML;
	var showInfo = document.getElementById(activeDiv).getElementsByTagName('div')[1].getElementsByTagName('p');
	
	var showType;
	try {
		var ssnElements = document.getElementById('hdnValues3').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td');
		showType = 'tv';
	} catch (ex){
		showType = 'movie';
	}
	
	var ssnList = '';
	if (showType == 'tv') {
		for (i = 0; i < ssnElements.length; i++) {
			ssnList += (ssnElements[i].innerHTML + ',');
		}
	}
	ssnList = ssnList.substring(0, ssnList.length - 1);
	
	//add conditional statement to allow for more plug-ins
	var sHost = 'http://www.primewire.ag'
	var sName = String(showInfo[2].innerHTML).split(':')[0].replace(':', '');
	if (sName == null) {
		sName = showInfo[0].innerHTML;
	}
	
	var postData = {
		name: sName,
		show_type: showType,
		description: showInfo[2].innerHTML,
		tags: showInfo[3].innerHTML,
		year: showInfo[4].innerHTML,
		img_url: showInfo[1].innerHTML,
		host: sHost,
		link: showInfo[5].innerHTML,
		seasons: ssnList		
	}
	
	var request = $.ajax({
		url: '/cpkUpdShow',
		type: 'POST',
		data: postData,
		contentType: 'application/x-www-form-urlencoded',
		dataType: 'json'		
	});
	
	request.success(function(rslt) {
		//alert('succeeded');
	});
	
	request.fail(function(jqXHR, textStatus) {
		alert('Error Saving Show Info');
	});
	
	var x = '';
}

function send_cpkFavData(t) {

	if (String(document.getElementById('userInfo_ID').innerHTML) != 'null') {
		var prefix = String(t.id).split('_');
		var dataID = prefix[0] + '_' + prefix[1].replace('Fav', 'Info');
		var showType = '';
		
		var info = document.getElementById(dataID).parentNode.getElementsByTagName('div')[1].getElementsByTagName('p');
		
		//add conditional statement to allow for more plug-ins
		if (t.id.substring(0, 4) == 'srch') {
			var x1 = callAjax((static_url + 'getPW_Details'), ('?srch=' + info[5].innerHTML + '&type=true'));
			
			var child = document.createElement('div');
			child.innerHTML = String(x1);
			child = child.firstChild;
			document.getElementById('hdnValues').appendChild(child);
			
			var desc = String(document.getElementsByClassName('movie_info')[0].getElementsByTagName('table')[0].getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML);
			info[2].innerHTML = desc.replace(/\r?\n|\r/, '');
			
			var tmpType = document.getElementsByClassName('hdn_tmpShowType')[0];
			showType = tmpType.innerHTML;
			
			var oldList = document.getElementsByClassName('hdn_tmpContainer')[0];
			document.getElementById('hdnValues').removeChild(oldList);		
		} else {
			var x1 = callAjax((static_url + 'getPW_Details'), ('?srch=' + info[5].innerHTML + '&type=partial'));
			
			var child = document.createElement('div');
			child.innerHTML = String(x1);
			child = child.firstChild;
			document.getElementById('hdnValues').appendChild(child);
			
			var tmpType = document.getElementsByClassName('hdn_tmpShowType')[0];
			showType = tmpType.innerHTML;
			
			var oldList = document.getElementsByClassName('hdn_tmpShowType')[0];
			document.getElementById('hdnValues').removeChild(oldList);
		}
		var sHost = 'http://www.primewire.ag'
		var sName = String(info[2].innerHTML).split(':')[0].replace(':', '');
		if (sName == null) {
			sName = showInfo[0].innerHTML;
		}
		//end conditional statement
		
		var userID = document.getElementById('userInfo_ID').innerHTML;
		var username = document.getElementById('userInfo_username').innerHTML;
		var postData = {
			name: sName,
			show_type: showType,
			description: info[2].innerHTML,
			tags: info[3].innerHTML,
			year: info[4].innerHTML,
			img_url: info[1].innerHTML,
			host: sHost,
			link: info[5].innerHTML,
			seasons: '',
			userID: userID,
			userName: username
		}
		
		var request = $.ajax({
			url: '/cpkAddFavorite',
			type: 'POST',
			data: postData,
			contentType: 'application/x-www-form-urlencoded',
			dataType: 'json'		
		});
		
		request.success(function(rslt) {
			var x = '';
			//alert('succeeded');
		});
		
		request.fail(function(jqXHR, textStatus) {
			alert('Error Saving Show Info');
		});
	} else {
		alert('Please log-in to add shows to favorites list.');
	}
}

function mdlNavInfo_Click() {
	if (document.getElementById('navContainer').style.display == 'none') {
		document.getElementById('mdlNavButtons').style.height = 'auto';
		document.getElementById('navCntrlContainer').style.maxWidth = '180px';
		document.getElementById('navContainer').style.display = 'block';
	} else {
		document.getElementById('mdlNavButtons').style.height = 'auto';
		document.getElementById('navCntrlContainer').style.maxWidth = '75px';
		document.getElementById('navContainer').style.display = 'none';
	}
}

function callAjax(webUrl, queryString) {
    var xmlHttpObject = null;

    try {
        // Firefox, Opera 8.0+, Safari...

        xmlHttpObject = new XMLHttpRequest();
    }
    catch (ex) {
        // Internet Explorer...

        try {
            xmlHttpObject = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (ex) {
            xmlHttpObject = new ActiveXObject('Microsoft.XMLHTTP');
        }
    }

    if (xmlHttpObject == null) {
        window.alert('AJAX is not available in this browser');
        return;
    }

    xmlHttpObject.open("GET", webUrl + queryString, false);
    xmlHttpObject.send();

    var valueSent = xmlHttpObject.responseText;

    return valueSent;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function pad(width, string, padding) { 
  return (width <= string.length) ? string : pad(width, string + padding, padding)
}

function clearSearchResults() {
	for (var i = 0; i < 6; i++) {
		document.getElementById('srchItem_container' + i).style.display = 'none';
	}
}

// // When ready...
// window.addEventListener("load",function() {
// 	// Set a timeout...
// 	setTimeout(function(){
// 		// Hide the address bar!
// 		window.scrollTo(0, 1);
// 	}, 0);
// });




