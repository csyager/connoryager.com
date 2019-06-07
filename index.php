<DOCTYPE! html>
<html>
<head>
<?php
	session_start();
 ?>
	<title>Home - www.connoryager.com</title>
	<meta name="keywords" content="Yager, Connor, Webpage, Design, yager, connor, webpage, design, create, make website, web, page, site, html, teach, tutor, learn, HTML, coding, code, tags, attributes, tag, attribute, help, me, Craig, craig, chase, Chase, Kim, kim, Kimberly, kimberly">
	<meta encoding="utf-8">

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="css/secondary.css">

</head>

<body onresize="pageChange()" onload="pageChange()">
	<header>
		<h1>Connor Yager</h1>
	</header>
	<?php include 'navigation.php'; ?>

	<!--resize navbar js -->
	<script type="text/javascript">
  //source https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js
  function makeX(x) {
  	x.classList.toggle("change");
  }
</script>
<br>
<script src = "js/timeofday.js"></script>
<div id="welcome" style="width: 80%; margin: 0 auto" class="transbox ">
	<p><b>Welcome to my website!</b>  I created this site using basic HTML coding, bootstrap CSS, javascript, SQL, and PHP as a place where I can record my thoughts, as well as post anything that I find funny or intriguing.  These posts are not meant to stir controversy in any way, although I am a supporter of thoughtful discussion, so if you find any of my thoughts interesting, or want to discuss them further, please feel free to leave a comment.  Thanks for visiting, and please feel free to explore my site!</p>
	<p><a href="https://github.com/csyager/connoryager.com" class="normal" style="color: white" target="_blank">Click here to view my source code on GitHub</a></p>
</div>
<br>
<script type="text/javascript">
	function pageChange(){
		var twitter = document.getElementById("twitter");
		var images = document.getElementById("images");
		if (innerWidth<850){
			twitter.style.float="";
			twitter.style.width="80%";
			images.style.width="90%";
			images.style.float="";
			twitter.style.margin="0px 10% 300px 10%";
			images.style.margin="0px 5% 0px 5%";
		}
		if (innerWidth>=850){
			twitter.style.float="left";
			twitter.style.width="25%";
			twitter.style.margin="0px 0px 0px 20px";
			images.style.margin="0px 20px 0px 0px";
			images.style.width="70%";
			images.style.float="right";
		}
	}

</script>
<div class="container" style="float: left; width: 25%; height: 500px; margin-left: 20px" id="twitter">
	<div>
		<a class="twitter-timeline" data-height="744" href="https://twitter.com/connor_yager?ref_src=twsrc%5Etfw">Tweets by connor_yager</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
	</div>
</div>
<br>
<br>
<div class="container" id="images" style="width: 70%; margin-right: 20px; float: right">
	<div>
		<div class="row align-items-center">
			<div class="col-sm">
				<img src="images/deltasig.jpg" class="img-thumbnail" style="width:100%">
			</div>
			<div class="col-sm">
				<img src="images/clax1.jpg" class="img-thumbnail" style="width:100%">
			</div>
			<div class="col-sm">
				<img src="images/IMG_3713.JPG" class="img-thumbnail" style="width:100%">
			</div>
			<div class="col-sm">
				<img src="images/IMG_3675.JPG" class="img-thumbnail" style="width:100%">
			</div>
		</div>
		<br>
		<div class="row align-items-center">
			<div class="col-sm">
				<img src="images/IMG_1448.JPG" class="img-thumbnail" style="width:100%">
			</div>
			<div class="col-sm">
				<img src="images/IMG_1451.JPG" class="img-thumbnail" style="width:100%">
			</div>
			<div class="col-sm">
				<img src="images/IMG_2560.JPG" class="img-thumbnail" style="width:100%">
			</div>
			<div class="col-sm">
				<img src="images/IMG_3701.JPG" class="img-thumbnail" style="width:100%">
			</div>
		</div>

	</div>
</div>
<br>
<br>

<footer class="footer" style="background-color: black">
	<div class="container text-center" style="margin-right: 0px">
		<a href="https://www.facebook.com/connor.yager.3"  target="_blank" class="normal"><i class="fa fa-facebook" style="color: orange"></i></a>&nbsp;
		<a href="https://twitter.com/connor_yager" target="_blank" class="normal"><i class="fa fa-twitter" style="color: orange"></i></a>&nbsp;
		<a href="https://www.linkedin.com/in/connor-yager-61b804128/" target="_blank" class="normal"><i class="fa fa-linkedin" style="color: orange"></i></a>&nbsp;
		<a href="https://www.instagram.com/connor_yager/" target="_blank" class="normal"><i class="fa fa-instagram" style="color: orange"></i></a>&nbsp;
		<a href="https://github.com/csyager" target="_blank" class="normal"><i class="fa fa-github" style="color: orange"></i></a>&nbsp;
		<span class="pull-right" ><a href="bugReport.php" class="normal" style="color: orange" target="_blank">Click here to report a bug</a></span>
	</div>
</footer>
</body>
</html>
