module.exports.getThanksEmail = function() {
	var myString = (function () {
		/*
			<!DOCTYPE html>
			<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
			<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
			<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
			<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
				<head>
					<meta charset="utf-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<title>Thanks For Signing Up for CPKBrowser.</title>
					<meta name="description" content="">
					<meta name="viewport" content="width=device-width, initial-scale=1">
				</head>
				<body style="background-image: url(http://cpktestapp2.herokuapp.com/img/bg.png)">
					<!--[if lt IE 7]>
						<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
					<![endif]-->
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
							<h3 style="color:white; font-size:18px;">Shawn,</h3>
							<p style="line-height:2; color:white; font-size:14px;">
								Thank you for signing up for our free beta-user experience on CPK Browser, we are extremely happy to have you onboard! 
								As a beta user, you will have access to all of the premium content we create, including pop-up blockers, console applications, 
								category "Bins", and much more. While some of this is still not available, new releases are pushed every week, each release containing
								new functionality. Below is your user information, please save this for your records in case you need to reset your password:
							</p>				
							<h4>Shawn Brandt's Credentials</h4>
							<ul style="line-height: 2.2;">
								<li>User Name: <strong>djbigdad</strong></li>
								<li>Password: <strong>**********</strong></li>
								<!-- <li>Email: <strong>shawn_brandt_20@hotmail.com</strong></li> -->
								<li>Birthdate: <strong>12/25/1987</strong></li>
								<li>Phone Number: <strong>987.678.9865</strong></li>
								<li>Zip: <strong>66071</strong></li>
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
					<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>        
				</body>
			</html>
		*/
	});
	
	return myString.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
}