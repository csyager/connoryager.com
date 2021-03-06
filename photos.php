<DOCTYPE! html>
<html>
<head>
	<?php
		session_start();
	 ?>
	<title>Photos - www.connoryager.com</title>
	<meta name="keywords" content="Yager, Connor, Webpage, Design, yager, connor, webpage, design, create, make website, web, page, site, html, teach, tutor, learn, HTML, coding, code, tags, attributes, tag, attribute, help, me, Craig, craig, chase, Chase, Kim, kim, Kimberly, kimberly">
	<meta encoding="utf-8">

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="css/secondary.css">

</head>

<body>
	<?php $photos_active = 'active'; ?>
	<?php include 'navigation.php'; ?>
<br>
<h1>Photos</h1>
<div class="container">
	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href = "images/skydiving2.jpg">
					<img src="images/skydiving2.jpg" class="img-responsive">
					<div class="caption">
						<p>My family took a skydiving trip to close out our summer.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class = "img-thumbnail">
				<a href = "images/skydiving4.JPG">
					<img src = "images/skydiving4.JPG" class="img-responsive">
					<div class = "caption">
						<p>My instructor and me after pulling our 'chute.  Chase and his instructor are in the background.</p>
					</div>
				</a>
			</div>
		</div>
		<div class = "col-md-4">
			<div class = "img-thumbnail">
				<a href = "images/skydiving1.jpg">
					<img src = "images/skydiving1.jpg" class="img-responsive">
					<div class = "caption">
						<p>Myself after landing.  Good to be back on the ground!</p>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/gradpic1[rotated].jpg">
					<img src="images/gradpic1[rotated].jpg" class="img-responsive">
					<div class="caption">
						<p>My family celebrating with Chase, who just graduated from Norfolk Academy.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/gradpic3.jpg">
					<img src="images/gradpic3.jpg" class="img-responsive">
					<div class="caption">
						<p>Chase walking down the aisle at graduation.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/gradpic4.jpg">
					<img src="images/gradpic4.jpg" class="img-responsive">
					<div class="caption">
						<p>Chase shaking hands with Mr. Manning, the school headmaster, after recieving his diploma.</p>
					</div>
				</a>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/laxchamp2.jpg">
					<img src="images/laxchamp2.jpg" class="img-responsive">
					<div class="caption">
						<p>The men's club lacrosse team hoisting the NCLL national championship trophy</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/laxchamp3.jpg">
					<img src="images/laxchamp3.jpg" class="img-responsive">
					<div class="caption">
						<p>Myself and Robbie Berndt, an old teammate from Norfolk Academy.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/laxchamp4.jpg">
					<img src="images/laxchamp4.jpg" class="img-responsive">
				</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/emmet1L_lawn.jpg">
					<img src="images/emmet1L_lawn.jpg" class="img-responsive">
					<div class="caption">
						<p>All the members of Emmet 1L on the lawn during fall orientation, our first week on grounds.  From left to right, Jonah, Sidney, Ryan H., myself, Nathan, Jake, Jared, Josh, Adam, Max, Tom, Dan, Ryan T., Harrison, and Teddy.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/IMG_3675.JPG">
					<img src="images/IMG_3675.JPG" class="img-responsive">
					<div class="caption">
						<p>The view from a cliff on Old Rag.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/IMG_3704.jpg">
					<img src="images/IMG_3704.JPG" class="img-responsive">
					<div class="caption">
						<p>Picnic on the summit.</p>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/IMG_3713.JPG">
					<img src="images/IMG_3713.JPG" class="img-responsive">
					<div class="caption">
						<p>Emmet 1L team picture on the summit.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/lawn.JPG">
					<img src="images/lawn.JPG" class="img-responsive">
					<div class="caption">
						<p>Students studying on the lawn in the afternoon.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/red_bull.jpg">
					<img src="images/red_bull.jpg" class="img-responsive">
					<div class="caption">
						<p>Myself, Ryan, and Jake at the Red Bull Quicksticks event hosted by the club lacrosse team.</p>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/lambeth.jpg">
					<img src="images/lambeth.jpg" class="img-responsive">
					<div class="caption">
						<p>The beautiful Lambeth Field.  While the grass isn't as much fun to play on, the white columns and stone coliseum feel make it worth it.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/DSC00004.JPG">
					<img src="images/DSC00004.JPG" class="img-responsive">
					<div class="caption">
						<p>Arduino board connected to an RFIDuino, servo, GPS module, and piezo.  The board is programmed to cause the servo to change position and the piezo to buzz when the GPS module detects that it is moving at a speed over 5 miles per hour.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/scott_stadium.jpg">
					<img src="images/scott_stadium.jpg" class="img-responsive">
					<div class="caption">
						<p>From left to right, Tom, Jonah, Jake, myself, Connor (a fellow Norfolk Academy alum), and Ryan at a football game in Scott Stadium.</p>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/nola.jpg">
					<img src="images/nola.jpg" class="img-responsive">
					<div class="caption">
						<p>Had a great trip to New Orleans with the UVA Men's and Women's Club lacrosse teams!</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/grad1.jpg">
					<img src="images/grad1.jpg" class="img-responsive">
					<div class="caption">
						<p>Some of my closest friends from high school at graduation.  From left to right is myself, Sam Furchtenicht, Kam Kilafwasru, Denzel Brown, Marshall McCraw, Keivan Mohammaddi, David Yeh, Ben Rubow, Luke Morina, James Gaskill, and Ryan Dixon.  </p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/grad2.jpg">
					<img src="images/grad2.jpg" class="img-responsive">
					<div class="caption">
						<p>Some of the members of the NA lacrosse team.  From left to right, Morgan Wentz, myself, Matt McKnelly, Kam Kilafwasru, Daniel Schneider, Fletcher Pierce, Jordan Drees, Keenan McDowell, Tommy Inglima, Matt Ruland, Michael Frazier, and Coach Tom Duquette.</p>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/crutches.jpg">
					<img src="images/crutches.jpg" class="img-responsive">
					<div class="caption">
						<p>Tommy Inglima, myself, and Kam Kilafwasru after winning the TCIS tournament our Junior year.  I was on crutches at the time with an ACL injury but still enjoyed the game.</p>
					</div>
				</a>
			</div>
		</div>
		<div class="col-md-4">
			<div class="img-thumbnail">
				<a href="images/woodson_lax.jpg">
					<img src="images/woodson_lax.jpg" class="img-responsive">
					<div class="caption">
						<p>One more throwback!  This is a picture from my freshman year playing for Woodson High School.</p>
					</div>
				</a>
			</div>
		</div>
	</div>

</div>
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
