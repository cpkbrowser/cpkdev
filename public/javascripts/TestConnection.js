/**
 * 
 */
$(document).ready(function() {
	$("#btnSearch").bind('keypress', onEnter);	
});

function onEnter(e) {
	if (e.keyCode == 13) {
		var now = new Date();
		var val = document.getElementById('btnSearch').value.trim().replace(' ', '+');
		if (val == '') {
			alert('Please enter a show you want to watch');
		} else {
			//var test1 = callAjax('http://localhost:3000/', 'getSK?srch=' + val + '&type=tv');
			var test1 = callAjax('http://cpktestapp2.herokuapp.com/', 'getSK?srch=' + val + '&type=tv');
			var then = new Date()
			var dif = then - now;
			var x = '';
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