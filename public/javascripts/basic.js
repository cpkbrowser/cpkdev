/**
 * 
 */
var static_url = window.location;
var redir1 = static_url + 'getBlank';

$(document).ready(function() {	
	
	$('.disruption-notice').marquee({speed: 10, leftToRight: false});
	$("#btnSearch").bind('keypress', onEnter_Search);
	$("#btnSrchSubmit").click(function() {
		onClick_Search();
	});	
	
	$('#user_password').bind('keypress', onEnter_Login);
	
	$("#navCntrlContainer").click(function() {
		mdlNavInfo_Click();
	});
	
	$("#helpCntrlContainer").click(function() {
		mdlHelp_Click();
	});
	
	$("#btnSignUp").click(function() {
		signUp_onClick();
	});
	
	$("#backToTop").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	
	$("#submit_fourth").click(function() {
		createUser();
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
	$("#user_remember_me").click(function() {
		var cbx = document.getElementById('user_remember_me');
		if (cbx.value == '0') {
			document.getElementById('user_remember_me').value = '1';
		} else {
			document.getElementById('user_remember_me').value = '0';
		}
	});
	
	var usrCookie = readCookie('cpkuser');
	var passCookie = readCookie('cpkpass');
	if (usrCookie && passCookie) {
		document.getElementById('hdnUserCookieExists').innerHTML = 'true';
		document.getElementById('user_username').value = usrCookie;
		document.getElementById('user_password').value = passCookie;
		var x = document.getElementById('user_remember_me').value;
		beginLogin();
	}
	
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
		} else if (e.which === 13) {
			$.modal.close()
		} else if (e.which === 118) {
			
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

function onClick_Img(t) {
	var btn1 = t.parentNode.getElementsByClassName('row')[0].getElementsByTagName('div')[1].childNodes[1];
	document.getElementById('hdnQuickLink').innerHTML = 'true';
	open_mdlInfo(btn1);
}

function quickLink_Click() {
	var sType = document.getElementById('hdnModalType').innerHTML;
	if (sType == 'tv') {
		//Set Tab header to active
		var act1 = document.getElementById('mdlInfo').getElementsByTagName('ul')[0].getElementsByTagName('li');
		$(act1[0]).removeClass('active');
		$(act1[1]).addClass('active');
		
		//Set Tab content to active
		var act2 = document.getElementById('mdlInfo').getElementsByClassName('tab-pane');
		$(act2[0]).removeClass('active');
		$(act2[1]).addClass('active');
	} else {
		//Set Tab header to active
		var act1 = document.getElementById('mdlInfo').getElementsByTagName('ul')[0].getElementsByTagName('li');
		$(act1[1]).removeClass('active');
		$(act1[0]).addClass('active');
		
		//Set Tab content to active
		var act2 = document.getElementById('mdlInfo').getElementsByClassName('tab-pane');
		$(act2[1]).removeClass('active');
		$(act2[0]).addClass('active');
	}
	document.getElementById('hdnQuickLink').innerHTML = 'false';
}

function beginLogin() {	
	document.getElementById('vidGridContainer').style.display = 'block';
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
				if (document.getElementById('user_remember_me').value == '1') {
					if (readCookie('cpkuser') == null) {
						createCookie('cpkuser', document.getElementById('user_username').value, 30);
						createCookie('cpkpass', document.getElementById('user_password').value, 30);
					}
				}
				$('#btnLogin').click(function() {});					
			} else {
				document.getElementById('pFailedLogin').style.display = 'block';
			}
		}
	});	
}

function signUp_onClick() {
	//document.getElementById('landingPage').style.display = 'none';
	document.getElementById('signup-container').style.display = 'block';	
	document.getElementById('signup-container').style.paddingBottom = '70px';
	$('html, body').animate({
        scrollTop: $("#signup-container").offset().top + $("#landingPage").offset().top
    }, 10);
}

function createUser() {
	var postData = {
		firstname: document.getElementById('firstname').value,
		lastname: document.getElementById('lastname').value,
		username: document.getElementById('username').value,
		password: document.getElementById('password').value,
		email: document.getElementById('email').value,
		phone: document.getElementById('phone').value,
		bday: document.getElementById('bday').value,
		country: document.getElementById('country-signup').value,
		zip: document.getElementById('zip').value,
		age: document.getElementById('age').value,
		gender: document.getElementById('gender').value,
		referred: document.getElementById('referred-by').value
	};
	
	var request = $.ajax({
		url: '/cpkAddUser',
		type: 'POST',
		data: postData,
		contentType: 'application/x-www-form-urlencoded',
		dataType: 'json'		
	});
	
	request.success(function(rslt) {
		if (rslt.usr_exists != 'false') {
			if (rslt.usr_exists == 'true') {
				alert('Username Already Exists');
			} else if (rslt.usr_exists == 'error') {
				alert('Error Creating User. Please try again later or contact support');
			}		
		} else if (rslt.usr_success == 'true') {
			if (rslt.up_success == 'true') {
				document.getElementById('signup-container').style.display = 'none';
				document.getElementById('user_username').value = rslt.userName;
				document.getElementById('user_password').value = document.getElementById('password').value;
				beginLogin();
			} else {
				alert('User was successfuly created, however the corresponding User Profile failed upon creation. Please contact support.')
			}
		} else {
			alert('Error Creating User. Please try again later or contact support');
		}
	});
}

function onEnter_Search(e) {
	if (e.keyCode == 13) {		
		var val = document.getElementById('btnSearch').value.trim().replace(' ', '+');
		if (val == '') {
			alert('Please enter a show you want to watch');
		} else {
			document.getElementById('vidGridContainer').style.display = 'block';
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
	document.getElementById('vidGridContainer').style.display = 'block';
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
	var fullName = "";
	
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
		fullName = desc.split(':')[0];
		var oldList = document.getElementsByClassName('movie_info')[0];
		document.getElementById('hdnValues').removeChild(oldList);
	} else {
		document.getElementById('mdlInfo_Desc').innerHTML = info[2].innerHTML;
		fullName = info[0].innerHTML;
	}
	
	document.getElementById('mdlInfo_Img').src = info[1].innerHTML;
	document.getElementById('mdlInfo_Name').innerHTML = fullName;
	document.getElementById('mdlInfo_Year').innerHTML = info[4].innerHTML;
	document.getElementById('mdlInfo_Genre').innerHTML = info[3].innerHTML;
	var newLink = info[5].innerHTML.replace('watch-', 'tv-');
	document.getElementById('mdlInfo_Link').innerHTML = newLink;
	document.getElementsByClassName('no-js')[0].style.overflow = 'hidden';
	document.getElementById('mdlInfoPane').style.display = 'block';
	document.getElementById('mdlVideoFrame').parentNode.style.display = 'none';
	document.getElementById('mdlKeepWatch').style.display = 'none';
	$("#basic-modal-content").modal({
		onClose: function(dialog) {
			document.getElementsByClassName('no-js')[0].style.overflow = 'auto';
			$.modal.close();
			send_cpkShowData('false');
		}
	});	
	document.getElementById('simplemodal-container').style.width = '100%';
	var hgt = document.getElementById('mdlInfoPane').offsetHeight + 10;
	document.getElementById('simplemodal-container').style.height = String(hgt) + 'px';
	
	//add conditional statement to allow for more plug-ins
	if (t.id.substring(0, 4) == 'srch') {
		info[2].innerHTML = desc.trim();
	} 	
	PWTV_getEpisodes(static_url + 'getPW_Episodes' + '?srch=' + info[5].innerHTML);	
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
	if (String(document.getElementById('userInfo_ID').innerHTML) != 'null') {
		send_cpkRecentData(document.getElementById('mdlActive_Div').innerHTML, 'tv');
	}
}

function ContinueShow() {
	var tmpLink = document.getElementById('mdlInfo_Link').innerHTML;
	var fName = document.getElementById('mdlInfo_Name').innerHTML.trim().replace(' ', '-*-') + '_cookie';
	var info = readCookie(fName).split('*');
	//PWTV_getLinks(static_url + 'getPW_Links' + '?srch=' + tmpLink + '/season-' + tmpSsn + '-episode-' + tmpEp);
	loadCurrentValues(info[0], info[1]);
	loadNextEpisode();
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
	//frame.src = currLink;
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
			send_cpkShowData('true');
		}
	});	
	
	var modType = document.getElementById('hdnModalType').innerHTML;
	if (modType == 'tv') {
		document.getElementById('mdlNavEpisodes').style.display = 'inline-block';
	} else if (modType == 'movie') {
		document.getElementById('mdlNavEpisodes').style.display = 'none';
	}
	
	var tipList = document.getElementById('hdnValues8').childNodes[0];
	if (tipList != null) {
		var tmpDiv = document.getElementById('hdnValues6');
		var tmpIndex = tmpDiv.childNodes[1].nodeValue;
		var lnkIndex = parseInt(tmpIndex, 10);
		var tipType = tipList.childNodes[lnkIndex].innerHTML.split('*-*')[0];
		var tipValue = tipList.childNodes[lnkIndex].innerHTML.split('*-*')[1];
		document.getElementById('mdlToolTipType').innerHTML = tipType;
		document.getElementById('mdlExtToolTip').innerHTML = tipValue;
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
	
	if (String(document.getElementById('userInfo_ID').innerHTML) != 'null') {
		send_cpkRecentData(document.getElementById('mdlActive_Div').innerHTML, 'movie');
	}
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
		//frame.src = nextLink.lastChild.nodeValue;
	} else {
		frame.src = getVideo(nextLink.innerText);
		//frame.src = nextLink.innerText;
	}
	
	var modType = document.getElementById('hdnModalType').innerHTML;
	if (modType == 'tv') {
		document.getElementById('mdlNavEpisodes').style.display = 'inline-block';
	} else if (modType == 'movie') {
		document.getElementById('mdlNavEpisodes').style.display = 'none';
	}
	document.getElementById('mdlNavButtons').style.display = 'inline-block';
	
	var tipList = document.getElementById('hdnValues8').childNodes[0];
	if (tipList != null) {
		try {
			var tipType = tipList.childNodes[lnkIndex].innerHTML.split('*-*')[0];
			var tipValue = tipList.childNodes[lnkIndex].innerHTML.split('*-*')[1];
			document.getElementById('mdlToolTipType').innerHTML = tipType;
			document.getElementById('mdlExtToolTip').innerHTML = tipValue;
		} catch (err) {
			document.getElementById('mdlToolTipType').innerHTML = 'Unknown';
			document.getElementById('mdlExtToolTip').innerHTML = 'No Suggestions Available';
		}			
	}
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
		//frame.src = nextLink.lastChild.nodeValue;
	} else {
		frame.src = getVideo(nextLink.innerText);
		//frame.src = nextLink.innerText;
	}
	
	var modType = document.getElementById('hdnModalType').innerHTML;
	if (modType == 'tv') {
		document.getElementById('mdlNavEpisodes').style.display = 'inline-block';
	} else if (modType == 'movie') {
		document.getElementById('mdlNavEpisodes').style.display = 'none';
	}
	document.getElementById('mdlNavButtons').style.display = 'inline-block';
	
	var tipList = document.getElementById('hdnValues8').childNodes[0];
	if (tipList != null) {
		try {
			var tipType = tipList.childNodes[lnkIndex].innerHTML.split('*-*')[0];
			var tipValue = tipList.childNodes[lnkIndex].innerHTML.split('*-*')[1];
			document.getElementById('mdlToolTipType').innerHTML = tipType;
			document.getElementById('mdlExtToolTip').innerHTML = tipValue;
		} catch (err) {
			document.getElementById('mdlToolTipType').innerHTML = 'Unknown';
			document.getElementById('mdlExtToolTip').innerHTML = 'No Suggestions Available';
		}
	}
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

function send_cpkShowData(watched) {
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
	
	if (watched == 'true') {
		request.success(function(rslt) {
			var user_id = document.getElementById('userInfo_ID').innerHTML;
			var request2 = $.ajax({
				url: '/cpkLoadBins',
				type: 'POST',
				data: {popular: 'false', favorites: 'false', recent: 'true', userID: user_id},
				contentType: 'application/x-www-form-urlencoded',
				dataType: 'json'		
			});
			
			request2.success(function(rslt) {
				var table = createBinTable(rslt.rsltRec, 'cpk_recShows', 'recItem');
				$('#hdn_tblRecent').empty();
				document.getElementById('hdn_tblRecent').appendChild(table);
				document.getElementById('hdnRecSetLoaded').innerHTML = 'true';
				document.getElementById('hdnRecSetMax').innerHTML = rslt.rsltRec.length;
				//alert('succeeded');
			});
		});
	}
	
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
			var user_id = document.getElementById('userInfo_ID').innerHTML;
			var request2 = $.ajax({
				url: '/cpkLoadBins',
				type: 'POST',
				data: {popular: 'false', favorites: 'true', recent: 'false', userID: user_id},
				contentType: 'application/x-www-form-urlencoded',
				dataType: 'json'		
			});
			
			request2.success(function(rslt2) {
				var table2 = createBinTable(rslt2.rsltFav, 'cpk_favShows', 'favItem');
				$('#hdn_tblFavorites').empty();
				document.getElementById('hdn_tblFavorites').appendChild(table2);
				document.getElementById('hdnFavSetLoaded').innerHTML = 'true';
				document.getElementById('hdnFavSetMax').innerHTML = rslt2.rsltFav.length;
				//alert('succeeded');
			});
			
			request2.fail(function(jqXHR, textStatus) {
				alert('Error Retrieving Favorites');
			});
		});
		
		request.fail(function(jqXHR, textStatus) {
			alert('Error Saving Favorites');
		});
	} else {
		alert('Please log-in to add shows to favorites list.');
	}
}

function send_cpkRecentData(tmpID, sType) {
	if (String(document.getElementById('userInfo_ID').innerHTML) != 'null') {
		var prefix = String(tmpID).split('_');
		var dataID = prefix[0] + 'Item_' + prefix[1].replace('dropdownMenu', 'btnInfo');
		
		var info = document.getElementById(dataID).parentNode.getElementsByTagName('div')[1].getElementsByTagName('p');
		
		//add conditional statement to allow for more plug-ins
		var sHost = 'http://www.primewire.ag'
		var sName = String(info[2].innerHTML).split(':')[0].replace(':', '');
		if (sName == null) {
			sName = showInfo[0].innerHTML;
		}
		
		var userID = document.getElementById('userInfo_ID').innerHTML;
		var username = document.getElementById('userInfo_username').innerHTML;
		var postData = {
			name: sName,
			show_type: sType,
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
			url: '/cpkUpdateRecent',
			type: 'POST',
			data: postData,
			contentType: 'application/x-www-form-urlencoded',
			dataType: 'json'		
		});
		
		request.success(function(rslt) {
			var x = '';
		});
		
	} else {
		alert('Please log-in to add shows to recently watched list.');
	}
}

function mdlNavInfo_Click() {
	if (document.getElementById('navContainer').style.display == 'none') {
		document.getElementById('mdlNavButtons').style.height = 'auto';
		document.getElementById('navCntrlContainer').style.maxWidth = '180px';
		document.getElementById('navContainer').style.display = 'block';
		if (document.getElementById('helpCntrlContainer').style.display == 'none') {
			document.getElementById('navCntrlContainer').style.zIndex = '999';
		} else {
			document.getElementById('navCntrlContainer').style.zIndex = '9999';
		}		
	} else {
		document.getElementById('mdlNavButtons').style.height = 'auto';
		document.getElementById('navCntrlContainer').style.maxWidth = '75px';
		document.getElementById('navContainer').style.display = 'none';
		document.getElementById('navCntrlContainer').style.zIndex = '0';
	}
}

function mdlHelp_Click() {
	if (document.getElementById('helpContainer').style.display == 'none') {
		document.getElementById('helpCntrlContainer').style.maxWidth = '250px';
		document.getElementById('helpContainer').style.display = 'block';
		if (document.getElementById('navCntrlContainer').style.display == 'none') {
			document.getElementById('helpCntrlContainer').style.zIndex = '999';
		} else {
			document.getElementById('helpCntrlContainer').style.zIndex = '9999';
		}				
	} else {
		document.getElementById('helpCntrlContainer').style.maxWidth = '75px';
		document.getElementById('helpContainer').style.display = 'none';
		document.getElementById('helpCntrlContainer').style.zIndex = '0';
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

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

window.mobilecheck = function() {
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || false);
		},
		Test: function() {
			return navigator.userAgent.match(/Chrome/i);
		}
	};
	return isMobile
}

function openCPKLinks(t) {
	var src = "";
	switch (t) {
		case 'privacy':
			src = static_url + 'privacy';
			break;
		case 'faq':
			src = static_url + 'faq';
			break;
		case 'legal':
			src = static_url + 'legal';
			break;
		case 'tos':
			src = static_url + 'tos';
			break;
		case 'logout':			
			eraseCookie('cpkuser');
			eraseCookie('cpkpass');
			window.onbeforeunload = function() {};
			window.location.href = window.location.href;
			return false;
			break;			
	}
	
	document.getElementById('iframeCPK').src = src;
	var hgt = $(window).height();
	var hdrHgt = $("#hdrAll").height();
	hgt = (hgt - hdrHgt) - 5;
	document.getElementById('iframeCPK').style.minHeight = hgt.toString() + 'px';
	
	document.getElementById('dn-container').style.display = 'none';
	document.getElementById('vidGridContainer').style.display = 'none';
	document.getElementById('landingPage').style.display = 'none';
	document.getElementById('cpkFooter').style.display = 'none';
	document.getElementsByTagName('header')[0].style.marginBottom = '0px';
	document.getElementById('internalLinks').style.display = 'block';
}

function closeCPKInternal() {
	document.getElementById('iframeCPK').src = 'about:blank';
	var srch1 = document.getElementById('srchItem_n0').innerHTML;
	var pop1 = document.getElementById('popItem_n0').innerHTML;
	if (srch1 != 'Title of Movie or Episode' || pop1 != 'Title of Movie or Episode') {
		document.getElementById('vidGridContainer').style.display = 'block';
	}
	if (document.getElementById('userInfo_ID').innerHTML == 'null') {
		document.getElementById('landingPage').style.display = 'block';
	}
	document.getElementById('cpkFooter').style.display = 'block';
	document.getElementsByTagName('header')[0].style.marginBottom = '20px';
	document.getElementById('internalLinks').style.display = 'none';
	document.getElementById('dn-container').style.display = 'block';
}




