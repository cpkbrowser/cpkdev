/**
 * 
 */
 //var static_url = 'http://localhost:3000/';
 var static_url = 'http://cpktestapp2.herokuapp.com/';
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
	$("#basic-modal-content").modal();
	document.getElementById('simplemodal-container').style.width = '100%';
	var hgt = document.getElementById('mdlInfoPane').offsetHeight + 10;
	document.getElementById('simplemodal-container').style.height = String(hgt) + 'px';
	
	getLinks(static_url + 'getPW_Links' + '?srch=' + info[5].innerHTML)
}

function getLinks(src_url) {
	var now = new Date();
	$.ajax({
		url: src_url,
		success: function(rslt2) {
			var oldLinks = document.getElementById('showLinks');
			var oldLinks2 = document.getElementById('hdnValues2').getElementsByTagName('div');
			if (oldLinks != null) {
				document.getElementById('hdnValues2').removeChild(oldLinks);
			} else if (oldLinks2 != null) {
				//Internet Explorer Work-Around
				$("#hdnValues2").empty();
			}
			$("#hdnValues2").append(rslt2.childNodes[0]);
			
			var containers = $("#showLinks .tv_container");
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
							tempName = val2.childNodes[1].childNodes[1].innerHTML;
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
							tempName = val3.childNodes[1].childNodes[1].innerHTML;
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
	var counter = 0;
	
	for (i = 0; i < ssnList.length; i++) {
		for (j = 0; j < ssnList[i].length; j++) {
			currWidth = $.fn.textWidth(String(ssnList[i][j].Item) + String(ssnList[i][j].Name));
			if (currWidth > mxWidth) {
				mxWidth = currWidth;
			}
		}
	}
	
	for (x = 0; x < ssnList.length; x++) {
	
		xChild = document.createElement('h3');
		xTextNode = document.createTextNode('Season ' + String(x + 1));
		xChild.appendChild(xTextNode);
		document.getElementById('lnkAccordion').appendChild(xChild);
		
		yChild = document.createElement('div');
		yChild.id = 'acrdSsn_' + String(x);
		yChild.style.height= '100%';
		uList = document.createElement('ul');
		
		for (y = 0; y < ssnList[x].length; y++) {
			lstItem = document.createElement('li');			
			yTextNode = document.createTextNode(String(ssnList[x][y].Item) + String(ssnList[x][y].Name));
			lstItem.style.minWidth = mxWidth + 'px';
			lstItem.appendChild(yTextNode);
			uList.appendChild(lstItem);	
		}
		
		uList.style.width = String(mxWidth + 80) + 'px'; 
		yChild.appendChild(uList);
		document.getElementById('lnkAccordion').appendChild(yChild);
		counter++;
	}
	//$("#lnkAccordion").accordion({heightStyle: 'panel', active: (counter - 1)});
	$("#lnkAccordion").accordion({heightStyle: 'panel', active: (counter - 1), activate: function (event, ui) {
            var scrollTop = $("#lnkAccordion").scrollTop();
            if(!ui.newHeader.length) return;
            var top = $(ui.newHeader).offset().top;
            $(this).animate({
                scrollTop: scrollTop + top - 175
            }, "fast");
        }});
	/* $("#lnkAccordion").accordion({heightStyle: 'panel', active: (counter - 1), activate: function (event, ui) {
        var scrollTop = $(".#lnkAccordion").scrollTop();
        //if(!ui.newHeader.length) return;
        var top = $(ui.newHeader).offset().top;
        $("html,body").animate({
            scrollTop: scrollTop + top - 35
        }, "fast");
    }}); */
	//$.scrollTo('#acrdSsn_' + String(counter - 1));
	//$('div#lnkAccordion').('#acrdSsn_' + String(counter - 1));
}


