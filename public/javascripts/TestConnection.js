/**
 * 
 */
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
			
			//var test1 = 'http://localhost:3000/getSK?srch=' + val + '&type=tv';
			var test1 = 'http://cpktestapp2.herokuapp.com/getSK?srch=' + val + '&type=tv';
			$.ajax({
				url: test1,
				success: function (rslt) {
				
					var oldList = document.getElementById('showInfo');
					if (oldList != null) {
						document.getElementById('hdnValues').removeChild(oldList);
					}
					
					var child = document.createElement('div');
					child.innerHTML = String(rslt);
					child = child.firstChild;
					document.getElementById('hdnValues').appendChild(child);
					
					var shows = document.getElementById('showInfo').getElementsByTagName('tbody')[0].getElementsByTagName('td');
					var itemCount = 0;
					var counter = 1;
					for (i = 0; i < shows.length; i++) {
						var imgLink = '';
						var sName = '';
						switch (counter) {
							case 1:
								sName = shows[i].innerHTML;
								document.getElementById('srchItem_n' + itemCount).innerHTML = sName;
								break;
							case 4:
								imgLink = shows[i].innerHTML;
								document.getElementById('srchItem_img' + itemCount).src = imgLink;
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
					
					var then = new Date()
					var dif = then - now;
					var x = '';
					
					document.getElementById('srch_preLoader').style.display = "none";
					$("#hdnLoadResults").fadeIn(10);
				}
			});
		}
	}
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
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