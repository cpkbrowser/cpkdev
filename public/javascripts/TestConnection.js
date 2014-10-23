/**
 * 
 */
 var static_url = 'http://localhost:3000/';
 //var static_url = 'http://cpktestapp2.herokuapp.com/';
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
					if (oldList != null) {
						document.getElementById('hdnValues').removeChild(oldList);
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
}


