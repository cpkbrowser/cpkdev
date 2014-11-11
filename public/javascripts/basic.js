$(document).ready(function() {
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
        window.top.location = 'http://localhost:3000/getBlank'
		//window.top.location = 'http://cpktestapp2.herokuapp.com/getBlank'
      }  
    }, 1);
	
	$(document).bind('keydown keyup', function(e) {
		if(e.which === 116) {
			window.onbeforeunload = function() {};
		}
	});
	
});

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

function clearSearchResults() {
	for (var i = 0; i < 6; i++) {
		document.getElementById('srchItem_container' + i).style.display = 'none';
	}
}
