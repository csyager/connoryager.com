<DOCTYPE! html>
<html>
<head>

	<title>Report a Bug - www.connoryager.com</title>
	<meta name="keywords" content="Yager, Connor, Webpage, Design, yager, connor, webpage, design, create, make website, web, page, site, html, teach, tutor, learn, HTML, coding, code, tags, attributes, tag, attribute, help, me, Craig, craig, chase, Chase, Kim, kim, Kimberly, kimberly">
	<meta encoding="utf-8">

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/secondary.css">

	<?php
	if($_POST["submit"]){
		$submitted = true;
		$date = date("F j, Y, g:i a");
		$message = "Name: " . $_POST["name"] . "\r\nEmail: " . $_POST["email"] . "\r\nReason: " . $_POST["reason"] . "\r\nOther Reason: " . $_POST["otherReason"] . "\r\nProblem: " . $_POST["problem"];
		mail("connoryager4@gmail.com", "Bug Reported at " . $date, $message, "From: admin@connoryager.com");
	}
	?>

</head>

<script type="text/javascript">
	function unhide(){
		var elem = document.getElementById("hidden");
		if(elem.style.display="none"){
			elem.style.display="block";
		}
	}
	function hide(){
		var elem = document.getElementById("hidden");
		if(elem.style.display="block"){
			elem.style.display="none";
		}
	}
</script>

<body>
	<header>
		<h1>Connor Yager</h1>
	</header>
	<nav class = "navbar navbar-default regular">
		<div class = "container-fluid">
			<div class = "col" align="center">
				<a href = "index.htm" class = "btn">Home</a>
			</div>
			<div class = "col" align="center">
				<a href = "about.htm" class = "btn">About Connor</a>
			</div>
			<div class = "col" align="center">
				<a href = "blog.php" class = "btn">Blog</a>
			</div>
			<div class = "col" align="center">
				<a href = "photos.htm" class = "btn">Photos</a>
			</div>
			<div class = "col" align="center">
				<a href = "http://www.yagerwebpagedesign.com/" class = "btn">Yager Webpage Design</a>
			</div>
		</div>
	</nav>
	<nav class=" navbar navbar-default droptop">

		<div class="container-fluid">
			<div class="container btn col-sm-2 col-2" data-toggle="collapse" data-target="#dropper" onclick="makeX(this)" style="float: right;">
				<div class="bar1"></div>
				<div class="bar2"></div>
				<div class="bar3"></div>
			</div>
			<div id="dropper" class="collapse">
				<a href="index.htm" class="btn" style="font-size: 20px;">Home</a><br>
				<a href="about.htm" class="btn" style="font-size: 20px;">About Connor</a><br>
				<a href="blog.php" class="btn" style="font-size: 20px;">Blog</a><br>
				<a href="photos.htm" class="btn" style="font-size: 20px;">Photos</a><br>
				<a href="http://www.yagerwebpagedesign.com/" class="btn" style="font-size: 20px">Yager Webpage Design</a>
			</div>
		</div>
	</nav>

	<!--resize navbar js -->
	<script type="text/javascript">
  //source https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js
  function makeX(x) {
  	x.classList.toggle("change");
  }
</script>
<h1>Report a Bug</h1>
<div id="text">
	<div class="transbox-orange">
		<p>Thank you for making an effort to contribute to the site.  We're sorry that you found a problem worth reporting here!  Please fill out the form below, and we will address this problem as quickly as possible.  Thank you again for your contribution.</p>
	</div>
	<form method="post" action="bugReport.php" style="color: white; margin-left: 20px">
		<input type="text" name="name" id="name" placeholder="Name" required="required" style="width: 538px; height: 30px; text-indent: 5px; padding: 0px; margin-bottom: 5px" class="rounded"><br>
		<input type="email" name="email" id="email" placeholder="Email" required="required" style="width: 538px; height: 30px; text-indent: 5px; padding: 0px; margin-bottom: 5px" class="rounded">
		
		<p>Does the problem that you've encountered impede the functionality of the site?  Is it an asthetic problem?  A security risk?  Design flaw?  If none of these, click "other" and fill in a new answer.</p>
		<input type="radio" name="reason" value="functionality" onclick="hide()"> Functionality<br>
		<input type="radio" name="reason" value="asthetic" onclick="hide()"> Asthetic<br>
		<input type="radio" name="reason" value="security" onclick="hide()"> Security Risk<br>
		<input type="radio" name="reason" value="design" onclick="hide()"> Design Flaw<br>
		<input type="radio" name="reason" value="other" onclick="unhide()"> Other (please specify below")<br>
		<div id="hidden" style="display: none">
			<input type="text" name="otherReason" id="otherReason" style="width: 538px; height: 30px; text-indent: 5px; padding: 0px; margin-bottom: 5px" class="rounded">
		</div>
		<p>Briefly describe the bug or problem that you encountered.</p>
		<textarea name="problem" id="problem" rows="4" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded" required="required"></textarea><br>
		<br>
		<input type="submit" name="submit" value="Report" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px" class="btn btn-info"/>
	</form>
</div>
<script type="text/javascript">
	if (<?php echo $submitted ?>){
		document.getElementById("text").innerHTML="<div class=\"transbox-orange\"><p>Thank you for your submission.  We will address this problem as quickly as possible.</p></div>";
	}
</script>