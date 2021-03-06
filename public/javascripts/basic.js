/**
 * 
 */
var static_url = window.location;
var redir1 = static_url + 'getBlank';

$(document).ready(function() {	
	var isMobile = window.mobilecheck();
	
	/* if(isMobile.Android()){ 
		var ratio = 610 / screen.width;
		viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'width=device-width, initial-scale=' + ratio + ', maximum-scale=' + ratio + ', user-scalable=0');
	} */
	
	$('.disruption-notice').marquee({speed: 10, leftToRight: false});
	$("#btnSearch").bind('keypress', onEnter_Search);
	$("#btnSrchSubmit").click(function() {
		onClick_Search();
	});	
	
	$("#country-signup").autocomplete({
		source: countryList()
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
	
	$("#okAddCategoryBins").click(function() {
		prepareChangeCategoryBins();
	});
	
	/* $("#submit_fourth").click(function() {
		createUser();
	}); */
	
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
	$("body").click(function(e) {
		var container = $(".search-options");
		var btn = $("#btnCatMenu");
		if (!container.is(e.target) && container.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0) {
			container.hide();
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
			/* var request = $.ajax({
				url: '/realAddressHere',
				type: 'GET',
				contentType: 'application/x-www-form-urlencoded',
				dataType: 'json'		
			}); */
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
	open_mdlInfo(btn1, 'true');
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
				document.getElementById('userInfo_age').innerHTML = rslt.rslt.split('?&')[3];
				document.getElementById('userInfo_gender').innerHTML = rslt.rslt.split('?&')[4];
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
				document.getElementById('divUserAccess').style.display = 'none';	
				document.getElementById('divUserMenu').style.display = 'block';
				$("#btnSignOut").click(function() {
					eraseCookie('cpkuser');
					eraseCookie('cpkpass');
					window.onbeforeunload = function() {};
					window.location.href = window.location.href;
				});
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
				$("html, body").animate({ scrollTop: 0 }, "slow");
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

function open_mdlInfo(t, type) {
	document.getElementById('mdlActive_Div').innerHTML = t.id;
	//var info = document.getElementById(t.id).getElementsByTagName('div')[1].getElementsByTagName('p');
	var info;
	if (type == 'false') {
		info = t.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('p');
	} else {
		info = t.parentNode.getElementsByTagName('div')[1].getElementsByTagName('p');
	}
	var fullName = "";
	
	//add conditional statement to allow for more plug-ins
	if (t.id.substring(0, 4) == 'srch') {
		var x1 = callAjax((static_url + 'getPW_Details'), ('?srch=' + info[5].innerHTML + '&type=false'));
		
		var child = document.createElement('div');
		child.innerHTML = String(x1);
		child = child.firstChild;
		document.getElementById('hdnValues').appendChild(child);
		
		var actors = "";
		try {
			var actorList = document.getElementsByClassName('movie_info')[0].getElementsByClassName('movie_info_actors')[0].getElementsByTagName('a');
			for (i = 0; i < actorList.length; i++) {
				actors += actorList[i].childNodes[0].nodeValue + ';';
			}
			actors = actors.substring(0, actors.length - 1);
			document.getElementById('mdlInfo_Actors').innerHTML = actors;
		} catch (ex) {}
		
		var desc = String(document.getElementsByClassName('movie_info')[0].getElementsByTagName('table')[0].getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML);	
		document.getElementById('mdlInfo_Desc').innerHTML = desc.trim().replace(/\r?\n|\r/, '');
		fullName = desc.split(':')[0];
		var oldList = document.getElementsByClassName('movie_info')[0];
		document.getElementById('hdnValues').removeChild(oldList);
	} else {
		document.getElementById('mdlInfo_Desc').innerHTML = info[2].innerHTML;
		document.getElementById('mdlInfo_Actors').innerHTML = info[7].innerHTML;
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
		}
	});	
	$(".modalCloseImg").click(function() {
		send_cpkShowData('false');
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
	var fName = document.getElementById('mdlInfo_Name').innerHTML.trim().replace(/ /g, '-*-') + '_cookie';
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
	/* var isMobile = window.mobilecheck();
	if (isMobile.iOS()) {
		frame.height = 1200
	} else {
		frame.height = ($(window).height()) - 175
	}  */	
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
		}
	});	
	$(".modalCloseImg").click(function() {
		send_cpkShowData('true');
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
	
	/* if (isMobile.iOS()) {
		//add class to iframe
		$("#mdlMoviePane").addClass('iframeScroll');
	} */
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
	var showInfo = document.getElementById(activeDiv).parentNode.getElementsByTagName('div')[1].getElementsByTagName('p');
	
	var showType = document.getElementById('hdnModalType').innerHTML;
	if (showType == 'movie' || showType == 'tv') {
		var ssnList = '';
		var ssnElements;
		if (showType == 'tv') {
			try {
				ssnElements = document.getElementById('hdnValues3').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td');
			} catch (ex) { 
				ssnElements = ""; 
			}
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
		
		var actorList = document.getElementById('mdlInfo_Actors').innerHTML;
		var postData = {
			name: sName,
			show_type: showType,
			description: showInfo[2].innerHTML,
			tags: showInfo[3].innerHTML,
			year: showInfo[4].innerHTML,
			img_url: showInfo[1].innerHTML,
			host: sHost,
			link: showInfo[5].innerHTML,
			seasons: ssnList,
			actors: actorList
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
				
				request2.success(function(rslt2) {
					var table = createBinTable(rslt2.rsltRec, 'cpk_recShows', 'recItem');
					$('#hdn_tblRecent').empty();
					document.getElementById('hdn_tblRecent').appendChild(table);
					document.getElementById('hdnRecSetLoaded').innerHTML = 'true';
					document.getElementById('hdnRecSetMax').innerHTML = rslt2.rsltRec.length;
					//alert('succeeded');
				});
			});
		}
		
		request.fail(function(jqXHR, textStatus) {
			alert('Error Saving Show Info');
		});
	}		
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
			showType = document.getElementById(dataID.replace('btnInfo', 'hdnType')).innerHTML;
		}
		
		if (showType == 'movie' || showType == 'tv') {
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
		}
	} else {
		alert('Please log-in to add shows to favorites list.');
	}
}

function send_cpkDropFav(t) {
	if (String(document.getElementById('userInfo_ID').innerHTML) != 'null') { 
		
		var prefix = String(t.id).split('_');
		var dataID = prefix[0] + '_' + prefix[1].replace('Fav', 'Info');
		var info = document.getElementById(dataID).parentNode.getElementsByTagName('div')[1].getElementsByTagName('p');
		var showType = document.getElementById(dataID.replace('btnInfo', 'hdnType')).innerHTML;
		
		if (showType == 'movie' || showType == 'tv') {
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
				url: '/cpkDropFavorite',
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
		}
		
	} else {
		alert('Please log-in to remove shows from favorites list.');
	}
}

function send_cpkRecentData(tmpID, sType) {
	var test = document.getElementById('mdlInfo_Actors').innerHTML;
	if (String(document.getElementById('userInfo_ID').innerHTML) != 'null') {
		var prefix = String(tmpID).split('_');
		var dataID = prefix[0] + '_' + prefix[1].replace('dropdownMenu', 'btnInfo');
		
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

function imgCategoryBin_Click(name) {
	if (document.getElementById('userInfo_ID').innerHTML != 'null') {
		var list = document.getElementById('hdnBinCategoryList').innerHTML;
		if (list.indexOf(name) == -1) {
			$(name).removeClass('Inactive_Category');
			document.getElementById('hdnBinCategoryList').innerHTML = (list + name + ';');
		} else {
			$(name).addClass('Inactive_Category');
			document.getElementById('hdnBinCategoryList').innerHTML = list.replace((name + ';'), '');
		}
		if (document.getElementById('okAddCategoryBins').style.display == 'none') {
			document.getElementById('okAddCategoryBins').style.display = 'block';
			document.getElementById('cancelAddCategoryBins').style.display = 'block';
		}
	} else {
		alert('Please Log-in or Sign-up to access Category Bins');
	}
}

function prepareChangeCategoryBins() {
	var tmpList = document.getElementById('hdnBinCategoryList').innerHTML;
	tmpList = tmpList.substring(0, tmpList.length - 1).replace(/[\#]/g, '').replace(/imgCat/g, '').toLowerCase();
	
	var fgm = ((tmpList.indexOf('fgm') == -1) ? 'false' : 'true');
	var ppvs = ((tmpList.indexOf('ppvs') == -1) ? 'false' : 'true');
	var music = ((tmpList.indexOf('music') == -1) ? 'false' : 'true');
	var dnm = ((tmpList.indexOf('dnm') == -1) ? 'false' : 'true');
	var cmd = ((tmpList.indexOf('cmd') == -1) ? 'false' : 'true');
	var ana = ((tmpList.indexOf('ana') == -1) ? 'false' : 'true');
	var nwr = ((tmpList.indexOf('nwr') == -1) ? 'false' : 'true');
	var adult = ((tmpList.indexOf('adult') == -1) ? 'false' : 'true');
	var doc = ((tmpList.indexOf('doc') == -1) ? 'false' : 'true');
	var hbo = ((tmpList.indexOf('hbo') == -1) ? 'false' : 'true');
	var sci = ((tmpList.indexOf('sci') == -1) ? 'false' : 'true');
	var disney = ((tmpList.indexOf('kids') == -1) ? 'false' : 'true');
	
	var postData = {
		fgm: fgm,
		ppvs: ppvs,	
		music: music,
		dnm: dnm,
		cmd: cmd,
		ana: ana,
		nwr: nwr,
		adult: adult,
		doc: doc,
		hbo: hbo,
		sci: sci,
		disney: disney,
		numBins: tmpList.split(';').length
	};
	
	loadCPKBins_Categories(postData);
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
		case 'cpkpoints1':
			var id = document.getElementById('userInfo_ID').innerHTML;
			var age = document.getElementById('userInfo_age').innerHTML;
			var gender = document.getElementById('userInfo_gender').innerHTML;
			src = 'https://asmwall.com/adwall/publisher/29752/profile/1524?subid1=' + id + '&gender=' + gender + '&age_range_id=' + age + '&category=23';
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

function btnCatMenu_Click() {
	if (document.getElementById('catMenu_Options').style.display == 'none') {
		$('.search-options').show();
	} else {
		$('.search-options').hide();
	}	
}

function countryList() {
	var data = 
		[ 
			{"label": "Afghanistan"},                             
			{"label": "Albania"},                                     
			{"label": "Algeria"},                                     
			{"label": "American Samoa"},                              
			{"label": "AndorrA"},                                     
			{"label": "Angola"},                                      
			{"label": "Anguilla"},                                    
			{"label": "Antarctica"},                                  
			{"label": "Antigua and Barbuda"},                         
			{"label": "Argentina"},                                   
			{"label": "Armenia"},                                     
			{"label": "Aruba"},                                       
			{"label": "Australia"},                                   
			{"label": "Austria"},                                     
			{"label": "Azerbaijan"},                                  
			{"label": "Bahamas"},                                     
			{"label": "Bahrain"},                                     
			{"label": "Bangladesh"},                                  
			{"label": "Barbados"},                                    
			{"label": "Belarus"},                                     
			{"label": "Belgium"},                                     
			{"label": "Belize"},                                      
			{"label": "Benin"},                                       
			{"label": "Bermuda"},                                     
			{"label": "Bhutan"},                                      
			{"label": "Bolivia"},                                     
			{"label": "Bosnia and Herzegovina"},                      
			{"label": "Botswana"},                                    
			{"label": "Bouvet Island"},                               
			{"label": "Brazil"},                                      
			{"label": "British Indian Ocean Territory"},              
			{"label": "Brunei Darussalam"},                           
			{"label": "Bulgaria"},                                    
			{"label": "Burkina Faso"},                                
			{"label": "Burundi"},                                     
			{"label": "Cambodia"},                                    
			{"label": "Cameroon"},                                    
			{"label": "Canada"},                                      
			{"label": "Cape Verde"},                                  
			{"label": "Cayman Islands"},                              
			{"label": "Central African Republic"},                    
			{"label": "Chad"},                                        
			{"label": "Chile"},                                       
			{"label": "China"},                                       
			{"label": "Christmas Island"},                            
			{"label": "Cocos (Keeling) Islands"},                     
			{"label": "Colombia"},                                    
			{"label": "Comoros"},                                     
			{"label": "Congo"},                                       
			{"label": "Congo"},                                        
			{"label": "Cook Islands"},                                
			{"label": "Costa Rica"},                                  
			{"label": "Cote D'Ivoire"},                              
			{"label": "Croatia"},                                     
			{"label": "Cuba"},                                        
			{"label": "Cyprus"},                                      
			{"label": "Czech Republic"},                              
			{"label": "Denmark"},                                     
			{"label": "Djibouti"},                                    
			{"label": "Dominica"},                                    
			{"label": "Dominican Republic"},                          
			{"label": "Ecuador"},                                     
			{"label": "Egypt"},                                       
			{"label": "El Salvador"},                                 
			{"label": "Equatorial Guinea"},                           
			{"label": "Eritrea"},                                     
			{"label": "Estonia"},                                     
			{"label": "Ethiopia"},                                    
			{"label": "Falkland Islands (Malvinas)"},                 
			{"label": "Faroe Islands"},                               
			{"label": "Fiji"},                                        
			{"label": "Finland"},                                     
			{"label": "France"},                                      
			{"label": "French Guiana"},                               
			{"label": "French Polynesia"},                            
			{"label": "French Southern Territories"},                 
			{"label": "Gabon"},                                       
			{"label": "Gambia"},                                      
			{"label": "Georgia"},                                     
			{"label": "Germany"},                                     
			{"label": "Ghana"},                                       
			{"label": "Gibraltar"},                                   
			{"label": "Greece"},                                      
			{"label": "Greenland"},                                   
			{"label": "Grenada"},                                     
			{"label": "Guadeloupe"},                                  
			{"label": "Guam"},                                        
			{"label": "Guatemala"},                                   
			{"label": "Guernsey"},                                    
			{"label": "Guinea"},                                      
			{"label": "Guinea-Bissau"},                               
			{"label": "Guyana"},                                      
			{"label": "Haiti"},                                       
			{"label": "Heard Island and Mcdonald Islands"},           
			{"label": "Holy See (Vatican City State)"},               
			{"label": "Honduras"},                                    
			{"label": "Hong Kong"},                                   
			{"label": "Hungary"},                                     
			{"label": "Iceland"},                                     
			{"label": "India"},                                       
			{"label": "Indonesia"},                                   
			{"label": "Iran"},                                         
			{"label": "Iraq"},                                        
			{"label": "Ireland"},                                     
			{"label": "Isle of Man"},                                 
			{"label": "Israel"},                                      
			{"label": "Italy"},                                       
			{"label": "Jamaica"},                                     
			{"label": "Japan"},                                       
			{"label": "Jersey"},                                      
			{"label": "Jordan"},                                      
			{"label": "Kazakhstan"},                                  
			{"label": "Kenya"},                                       
			{"label": "Kiribati"},                                    
			{"label": "North Korea"},                                        
			{"label": "South Korea"},                                        
			{"label": "Kuwait"},                                      
			{"label": "Kyrgyzstan"},                                  
			{"label": "Lao People'S Democratic Republic"},           
			{"label": "Latvia"},                                      
			{"label": "Lebanon"},                                     
			{"label": "Lesotho"},                                     
			{"label": "Liberia"},                                     
			{"label": "Libyan Arab Jamahiriya"},                      
			{"label": "Liechtenstein"},                               
			{"label": "Lithuania"},                                   
			{"label": "Luxembourg"},                                  
			{"label": "Macao"},                                       
			{"label": "Macedonia"},                                    
			{"label": "Madagascar"},                                  
			{"label": "Malawi"},                                      
			{"label": "Malaysia"},                                    
			{"label": "Maldives"},                                    
			{"label": "Mali"},                                        
			{"label": "Malta"},                                       
			{"label": "Marshall Islands"},                            
			{"label": "Martinique"},                                  
			{"label": "Mauritania"},                                  
			{"label": "Mauritius"},                                   
			{"label": "Mayotte"},                                     
			{"label": "Mexico"},                                      
			{"label": "Micronesia"},                                   
			{"label": "Moldova"},                                      
			{"label": "Monaco"},                                      
			{"label": "Mongolia"},                                    
			{"label": "Montserrat"},                                  
			{"label": "Morocco"},                                     
			{"label": "Mozambique"},                                  
			{"label": "Myanmar"},                                     
			{"label": "Namibia"},                                     
			{"label": "Nauru"},                                       
			{"label": "Nepal"},                                       
			{"label": "Netherlands"},                                 
			{"label": "Netherlands Antilles"},                        
			{"label": "New Caledonia"},                               
			{"label": "New Zealand"},                                 
			{"label": "Nicaragua"},                                   
			{"label": "Niger"},                                       
			{"label": "Nigeria"},                                     
			{"label": "Niue"},                                        
			{"label": "Norfolk Island"},                              
			{"label": "Northern Mariana Islands"},                    
			{"label": "Norway"},                                      
			{"label": "Oman"},                                        
			{"label": "Pakistan"},                                    
			{"label": "Palau"},                                       
			{"label": "Palestinian Territory"},                        
			{"label": "Panama"},                                      
			{"label": "Papua New Guinea"},                            
			{"label": "Paraguay"},                                    
			{"label": "Peru"},                                        
			{"label": "Philippines"},                                 
			{"label": "Pitcairn"},                                    
			{"label": "Poland"},                                      
			{"label": "Portugal"},                                    
			{"label": "Puerto Rico"},                                 
			{"label": "Qatar"},                                       
			{"label": "Reunion"},                                     
			{"label": "Romania"},                                     
			{"label": "Russian Federation"},                          
			{"label": "RWANDA"},                                      
			{"label": "Saint Helena"},                                
			{"label": "Saint Kitts and Nevis"},                       
			{"label": "Saint Lucia"},                                 
			{"label": "Saint Pierre and Miquelon"},                   
			{"label": "Saint Vincent and the Grenadines"},            
			{"label": "Samoa"},                                       
			{"label": "San Marino"},                                  
			{"label": "Sao Tome and Principe"},                       
			{"label": "Saudi Arabia"},                                
			{"label": "Senegal"},                                     
			{"label": "Serbia and Montenegro"},                       
			{"label": "Seychelles"},                                  
			{"label": "Sierra Leone"},                                
			{"label": "Singapore"},                                   
			{"label": "Slovakia"},                                    
			{"label": "Slovenia"},                                    
			{"label": "Solomon Islands"},                             
			{"label": "Somalia"},                                     
			{"label": "South Africa"},                                
			{"label": "South Georgia and the South Sandwich Islands"},
			{"label": "Spain"},                                       
			{"label": "Sri Lanka"},                                   
			{"label": "Sudan"},                                       
			{"label": "Suriname"},                                    
			{"label": "Svalbard and Jan Mayen"},                      
			{"label": "Swaziland"},                                   
			{"label": "Sweden"},                                      
			{"label": "Switzerland"},                                 
			{"label": "Syrian Arab Republic"},                        
			{"label": "Taiwan"},                                       
			{"label": "Tajikistan"},                                  
			{"label": "Tanzania"},                                     
			{"label": "Thailand"},                                    
			{"label": "Timor-Leste"},                                 
			{"label": "Togo"},                                        
			{"label": "Tokelau"},                                     
			{"label": "Tonga"},                                       
			{"label": "Trinidad and Tobago"},                         
			{"label": "Tunisia"},                                     
			{"label": "Turkey"},                                      
			{"label": "Turkmenistan"},                                
			{"label": "Turks and Caicos Islands"},                    
			{"label": "Tuvalu"},                                      
			{"label": "Uganda"},                                      
			{"label": "Ukraine"},                                     
			{"label": "United Arab Emirates"},                        
			{"label": "United Kingdom"},                              
			{"label": "United States"},                               
			{"label": "United States Minor Outlying Islands"},        
			{"label": "Uruguay"},                                     
			{"label": "Uzbekistan"},                                  
			{"label": "Vanuatu"},                                     
			{"label": "Venezuela"},                                   
			{"label": "Viet Nam"},                                    
			{"label": "Virgin Islands"},                               
			{"label": "Virgin Islands"},                               
			{"label": "Wallis and Futuna"},                           
			{"label": "Western Sahara"},                              
			{"label": "Yemen"},                                       
			{"label": "Zambia"},                                      
			{"label": "Zimbabwe"}                                    
		]	
	return data;
}



