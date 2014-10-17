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
	
	$("#srchResults_btnInfo0").click(function() {
		$("#basic-modal-content").modal();
		/* $("#basic-modal-content").modal({
			onClose: function(dialog) {
				$("#simplemodal-container").fadeOut(50);
				document.getElementById('mdlInfo').style.display = 'none';
				$("#basic-modal-content").modal.close();
			},
			autoOpen: false,
            position: 'center',
            title: 'EDIT',
            draggable: true,
            resizable: true,
            modal: true
		}); */
	});
});
