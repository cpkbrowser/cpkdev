/**
 * 
 */
$(document).ready(function() {
	$("#btnTest1").click(function () {
		var now = new Date();
		var test1 = callAjax('http://localhost:3000/', 'getSK?srch=the+league&type=tv');
		var then = new Date()
		var dif = then - now;
		var x = '';
	});
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