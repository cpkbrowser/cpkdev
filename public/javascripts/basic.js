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
	/* $("#btnTest1").click(function() {
		var srchTerm = window.frames[0].document.getElementById('search_term').value;		
		$('#pw_back').contents().find('#btnSearch').click();
		var pw_iframe = document.getElementById('pw_back');
		pw_iframe.onload = function () {
			var dmn = document.domain;
			window.frames[0].document.domain = dmn;
			document.getElementById('pw_back').style.display = "inline";
			//var x = document.getElementById('pw_back').contentWindow.location.href;
			var y = '';
		};
	}); */
});
