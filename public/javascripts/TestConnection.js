/**
 * 
 */
$(document).ready(function() {
	var test1 = callAjax('http://cpktestapp2.herokuapp.com/', 'cpkstart?test=EN');
	document.getElementById('lblTest').innerHTML = test1;
	//sleep(750);
	//alert('Done');
});

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