$(document).ready(function() {
	$("#btnTestJS").click(function () {
		if (document.getElementById('lblTest').innerHTML == "Hello World!") {
			document.getElementById('lblTest').innerHTML = "Second Hello Message";
		} else {
			document.getElementById('lblTest').innerHTML = "Hello World!";
		}
	});
});