var email = require("emailjs");

module.exports.SendMail = function(emlToAddr, emlSubject, emlMessage, emlHtml) {
	
	var server  = email.server.connect({
		user: "media@cpkbrowser.com", 
		password: "mediaman.4all", 
		host: "just39.justhost.com", 
		port: 465,
		ssl: true
	});
	
	var message = {
		text: emlMessage, 
		from: "CPK Browser <media@cpkbrowser.com>", 
		to: emlToAddr,
		subject: emlSubject,
		attachment: 
		[
			{data: emlHtml, alternative:true}
		]
	};  
	
	server.send(message, function(err, message) {
		if (err) {
			console.log(err);
			return true;
		} else {
			console.log('Message Sent');
			return false;
		}
	});
	
};

module.exports.prepareThanks = function(info, msg) {
	var rtrn = msg.replace(/xyzNAMEzyx/g, info.first_name).replace(/xyzUSERzyx/g, info.username).replace(/xyzPASSzyx/g, info.pass);
	rtrn = rtrn.replace(/xyzBDAYzyx/g, info.bday).replace(/xyzPHONEzyx/g, info.phone).replace(/xyzZIPzyx/g, info.zip);
	return rtrn;
};

module.exports.thanksTemplate = function() {
	var myString = (function () {
		/*
<html>
<body style="background-color: #353535">
<div style="font-family: verdana, arial, sans-serif; padding-top: 10px; margin:0 auto; display:block; max-width: 800px;">
<img style="width: 98.3%; max-width: 798px; height:auto; border: 7px solid black; border-bottom: none;
-webkit-border-top-left-radius: 24px;
-webkit-border-top-right-radius: 24px;
-moz-border-radius-topleft: 24px;
-moz-border-radius-topright: 24px;
border-top-left-radius: 24px;
border-top-right-radius: 24px;" src="http://cpkbrowser.com/ThankYouEmail.jpg">
</img>
<div style="color:white; border: 7px solid black; margin-top: -3px; background: black; padding:20px 10px 10px 10px;
-webkit-border-bottom-left-radius: 24px;
-webkit-border-bottom-right-radius: 24px;
-moz-border-radius-bottomleft: 24px;
-moz-border-radius-bottomright: 24px;
border-bottom-left-radius: 24px;
border-bottom-right-radius: 24px;">
<h1 style="color:#ee2225; margin-top:0; font-size: 27px; padding-bottom: 10px; border-bottom: 1px solid #ee2225; text-align: center;">Welcome to CPK Browser!</h1>
<h3 style="color:white; font-size:18px;">xyzNAMEzyx,</h3>
<p style="line-height:2; color:white; font-size:14px;">
Thank you for signing up for our free beta-user experience on CPK Browser, we are extremely happy to have you onboard! 
As a beta user, you will have access to all of the premium content we create, including pop-up blockers, console applications, 
category "Bins", and much more. While some of this is still not available, new releases are pushed every week, each release containing
new functionality. Below is your user information, please save this for your records in case you need to reset your password:
</p>				
<h4>User Information</h4>
<ul style="line-height: 2.2;">
<li>User Name: <strong>xyzUSERzyx</strong></li>
<li>Password: <strong>xyzPASSzyx</strong></li>
<li>Birthdate: <strong>xyzBDAYzyx</strong></li>
<li>Phone Number: <strong>xyzPHONEzyx</strong></li>
<li>Zip: <strong>xyzZIPzyx</strong></li>
</ul>
<p style="line-height:2; color:white; font-size:14px;">
If you have any questions, concerns, or just want to talk about our product, please send an email to Support@cpkbrowser.com. 
Thank you again for signing up for CPK Browser, have a great day!
</p>
<p style="font-size: 14px; padding-top: 20px; border-top: 1px solid #ee2225; color: white; text-align: center;">
<a style="color: #ee2225; text-decoration: none;" href="http://www.cpkbrowser.com">&copy;&nbsp;CPKBrowser.com</a><br>			
</p>
</div>
</div>       
</body>
</html>
		*/
	});
	
	return myString.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
}