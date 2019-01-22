<DOCTYPE! html>
<html>
<head>
	<?php
		session_start();
	 ?>
	<title>Blog - www.connoryager.com</title>
	<meta name="keywords" content="Yager, Connor, Webpage, Design, yager, connor, webpage, design, create, make website, web, page, site, html, teach, tutor, learn, HTML, coding, code, tags, attributes, tag, attribute, help, me, Craig, craig, chase, Chase, Kim, kim, Kimberly, kimberly">
	<meta encoding="utf-8">

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="css/secondary.css">
	<!--read more/read less toggle-->
	<script>
		function change(id){
			var elem = document.getElementById(id);
			if(elem.innerHTML == 'Read More')
				elem.innerHTML = 'Read Less';
			else
				elem.innerHTML = 'Read More';
		}
		function commentChange(id){
			var elem = document.getElementById(id);
			if(elem.innerHTML=='View More Comments')
				elem.innerHTML = 'View Fewer Comments';
			else
				elem.innerHTML = 'View More Comments';
		}
	</script>

	<!--includes php to get IP address, used in footer and in postComment.php-->
	<?php include 'getIP.php';?>

</head>

<body>
	<header>
		<h1>Connor Yager</h1>
	</header>
	<nav class = "navbar navbar-default regular">
		<div class = "container-fluid">
			<div class = "col" align="center">
				<a href = "index.php" class = "btn">Home</a>
			</div>
			<div class = "col" align="center">
				<a href = "about.php" class = "btn">About Connor</a>
			</div>
			<div class = "col" align="center">
				<a href = "blog.php" class = "btn">Blog</a>
			</div>
			<div class = "col" align="center">
				<a href = "photos.php" class = "btn">Photos</a>
			</div>
			<div class = "col" align="center">
				<?php
					if (isset($_SESSION['user'])){
						echo '<div class="dropdown">
						  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'.$_SESSION['user'].
						  '</button>
						  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						    <a class="dropdown-item" href="profile.php">Profile</a>
						    <a class="dropdown-item" href="clearsession.php">Logout</a>
						  </div>
						</div>';

					} else {
						echo '<a href="login.php" class="btn">Login</a>';
					}
					?>
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
				<a href="index.php" class="btn" style="font-size: 20px;">Home</a><br>
				<a href="about.php" class="btn" style="font-size: 20px;">About Connor</a><br>
				<a href="blog.php" class="btn" style="font-size: 20px;">Blog</a><br>
				<a href="photos.php" class="btn" style="font-size: 20px;">Photos</a><br>
				<?php
					if (isset($_SESSION['user'])){
						echo '<div class="dropdown">
						  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'.$_SESSION['user'].
						  '</button>
						  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						    <a class="dropdown-item" href="profile.php">Profile</a>
						    <a class="dropdown-item" href="clearsession.php">Logout</a>
						  </div>
						</div>';

					} else {
						echo '<a href="login.php" class="btn" style="font-size:20px;">Login</a>';
					}
					?>
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
<h1>Blog</h1>

<!--where blacklisting errors will be displayed -->
<div class="transbox-red" id="blacklistError"></div>
<div class="container" style="max-width: none; width: 100%;">
	<div class="card-columns">

		<a id="post8"></a>
		<div class="card mb-4">
			<img class="card-img-top" src="images/network.jpg">
			<div class="card-body">
				<h2 class="card-title">Home Server</h2>
				<p class="card-text">To keep myself busy during winter break this year, I decided to spend some time repurposing my old laptop as a home server, which I could use to store files, run programs, and perhaps most importantly host this website!  I've never done anything related to computer networking before, so this was a bit of a learning experience, with lots of trial and error.  I got rid of the old operating system on the laptop and loaded up an Ubuntu distro, and then set it up to run Apache2, PHP, and MySQL.  I set up an ssh client so I can make changes from anywhere, and configured the router to forward all HTTP and HTTPS requests through to the server.  A few changes to this site's PHP has got all of the SQL queries running through the server, so now all comments and user data can be stored there.  The main motivation for doing this was that I could downgrade from the more expensive web host that I had been using, and can now pay for a really barebones service, since most of the bells and whistles that I had been paying for were now being hosted on my home server.</p>
				<div id = "blog8" class="collapse in">
					<p class="card-text">This project is certainly not perfect yet, and I have a lot of optimizations that I'm still trying to figure out.  However my hope is that I can continue to move towards self-sufficience, and that this will allow me to put more cool features in the site.  In fact, restructuring in this way is what got me thinking about the new user profile system, which I believe is far superior to the old system of leaving comments.  Hopefully updates and fixes will continue rolling out for this system, so please keep letting me know where you encounter problems using the "Report a Bug" feature.  Thanks for the support as the site and my development skills continue to improve, and hopefully I'll keep finding improvements that push what I know about web dev.</p>
				</div>
				<button id="button8" type="button" class="btn btn-info" data-toggle="collapse" data-target="#blog8" onclick="change(this.id)">Read More</button>
				<br>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment8">
					<textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>

					<?php
						if(isset($_SESSION['user'])){
							echo "<input action=\"blog.php\" name=\"submit8\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>
				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit8"])){
					$post = '8';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection8">
					<?php $disp_post = 8; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments8" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand8" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments8" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>

			</div>
			<div class="card-footer text-muted">
				Posted on January 21st, 2019 by Connor Yager
			</div>
		</div>
		<a id="post7"></a>
		<div class="card mb-4">
			<img class="card-img-top" src="images/gradpic2[rotated].jpg">
			<div class="card-body">
				<h2 class="card-title">Chase's Graduation</h2>
				<p class="card-text">My younger brother Chase just finished his senior year at Norfolk Academy, and had his final exercises last week.  Our grandpa Gordon (or as we call him, Papa) from Nashville and our grandmother Wendy from Santa Barbara were in attendance.  Chase recieved the William Henry Thompson Loyall Award for excellence in English, as well as the Alexander G. Kiehl Award for excellence as a Student-Athlete.  Chase will be attending Amherst College in Amherst, Massachussetts next year, where he will be playing lacrosse.</p>
				<div id="blog7" class="collapse in">
					<p class="card-text">Chase had an exceptional senior year, serving as Senior Class President, captain of the soccer, basketball, and lacrosse teams, a second-team All-State soccer player, a first-team All-State lacrosse player, first-team All-Conference in both soccer and lacrosse, as well as graduating with high honors.  We're all very proud of my little brother, and can't wait to see what he does in the next phase of his life!</p>
				</div>
				<button id="button7" type="button" class="btn btn-info" data-toggle="collapse" data-target="#blog7" onclick="change(this.id)">Read More</button>
				<br>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment7">
					<textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>

          <?php
            if(isset($_SESSION['user'])){
              echo "<input action=\"blog.php\" name=\"submit7\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>

				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit7"])){
					$post = '7';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection7">
					<?php $disp_post = 7; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments7" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand7" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments7" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>

			</div>
			<div class="card-footer text-muted">
				Posted on June 18th, 2018 by Connor Yager
			</div>
		</div>

		<a id="post6"></a>
		<div class="card mb-4">
			<img class="card-img-top" src="images/leadership.jpg">
			<div class="card-body">
				<h2 class="card-title">9th Grade Leadership Lab</h2>
				<p class="card-text">Last week, I worked as a counselor on a leadership retreat for rising 10th graders at Norfolk Academy.  73 students attended the trip to learn how to become better leaders and to prepare for the challenges of being in the upper school.  Five other alumni and I were selected to work alongside faculty members to facilitate the trip.</p>
				<div id="blog6" class="collapse in">
					<p class="card-text">Initially, I was skeptical of the trip, as the challenges seemed incredibly daunting, and perhaps too intense for a group of middle schoolers to handle.  However, I was incredibly blessed to receive the best 13 students I could have asked for.  Each one of them was incredibly mature in their own way, and I found that more often than not, they were teaching me about leadership, and not the other way around!  Over the course of the 7 days I was with them, I got to know them very well, and by the end of the week all of the students felt comfortable confiding in each other things that they would tell few others, if anyone at all.  In my mind, this made the trip a success, as this class will now have a shared experience that will connect them throughout their time in the upper school, and into life beyond that.  I'm very proud of the students and how far they came, and I can say that I myself was changed by my experiences with them for the better.</p><br>
				</div>
				<button id="button6" type="button" class="btn btn-info" data-toggle="collapse" data-target="#blog6" onclick="change(this.id)">Read More</button>
				<br>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment6">
					<textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>

					<?php
            if(isset($_SESSION['user'])){
              echo "<input action=\"blog.php\" name=\"submit6\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>
				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit6"])){
					$post = '6';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection6">
					<?php $disp_post = 6; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments6" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand6" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments6" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>

			</div>
			<div class="card-footer text-muted">
				Posted on June 12th, 2018 by Connor Yager
			</div>
		</div>

		<a id="post5"></a>
		<div class="card mb-4">
			<img class="card-img-top" src="images/laxchamp.jpg">
			<div class="card-body">
				<h2 class="card-title">NCLL National Champions!</h2>
				<p class="card-text">A few weeks ago, the UVA Men's Club Lacrosse team travelled to the US Naval Academy to compete for the club national championship.  After a close game with Penn State in the quarterfinals and another with Vermont in the semis, the team advanced to the championship game against Navy.  Playing the home team wasn't easy, but led by a strong defense, efficient offense, and some clutch saves by Carter Malkus in goal, the Hoos took the trophy home.  Carter and Grant Melchers, who played goalie during the quarterfinals and semifinals, were the co-MVPs of the tournament.</p>
				<br>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment5">
          <textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>
					<?php
            if(isset($_SESSION['user'])){
              echo "<input action=\"blog.php\" name=\"submit5\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>
				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit5"])){
					$post = '5';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection5">
					<?php $disp_post = 5; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments5" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand5" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments5" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>

			</div>
			<div class="card-footer text-muted">
				Posted on June 12th, 2018 by Connor Yager
			</div>
		</div>

		<a id="post4"></a>
		<div class="card mb-4">
			<img class="card-img-top" src="images/xtuple.jpg">
			<div class="card-body">
				<h2 class="card-title">xTuple</h2>
				<p class="card-text"><a href="https://github.com/csyager/Junk-Search-Extension">Click here to view Github</a></p>
				<p class="card-text">Over the last summer and winter break, I spent a few months working as an intern at xTuple, a small software company in Norfolk, VA.  xTuple produces an open-source ERP (enterprise resource management) software, which it markets to small-businesses.  ERPs provided an interface for distribution and manufacturing companies to track merchandise and distribution.  xTuple's ERP also comes with a built in CRM (customer resource manager), which allows the user company to track customer information, as well as communcations with that customer for thousands and thousands of individual customers.</p>
				<div id="blog4" class="collapse in">
					<p class="card-text">xTuple uses a PostgreSQL database to manage and store data.  xTuple uses their own software to run their company, and my task was to develop an extension for their desktop client that would allow the user to eliminate large groups of contacts at once based on an email address pattern.  The point of this was to eliminate groups of contacts that use junk email addresses to sign into their website.  This project involved creating a user interface using Qt and Javascript, and adding backend functionality using SQL.</p>
					<p class="card-text">My final tool had several functions.  The first was a simple query function based on a regular expression supplied by the user.  The results would populate a table at the bottom of the tool.  The user would be able to select individual contacts in the table, or use a "Select All" button to highlight all entries.  The user could then delete the selected contacts or move them into a separate SQL table to mark them for review.  Once the user was finished making changes, they would press a "Finalize" button, which commits the changes on the database.</p>
					<p class="card-text">I learned a lot through my time at xTuple, both as a developer and as what it meant to work at an engineering firm.  This summer I will be returning to work there as a paid member of the team, and will be working on a new project, which I hope will also challenge me to improve as a programmer.</p><br>

				</div>
				<button id="button4" type="button" class="btn btn-info" data-toggle="collapse" data-target="#blog4" onclick="change(this.id)">Read More</button>
				<br>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment4">
					<textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>

					<?php
            if(isset($_SESSION['user'])){
              echo "<input action=\"blog.php\" name=\"submit4\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>
				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit4"])){
					$post = '4';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection4">
					<?php $disp_post = 4; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments4" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand4" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments4" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>

			</div>
			<div class="card-footer text-muted">
				Posted on May 21st, 2018 by Connor Yager
			</div>
		</div>

		<a id="post3"></a>
		<div class="card mb-4">
			<img class="card-img-top" src="images/textbook1.PNG">
			<div class="card-body">
				<h2 class="card-title">CS 4640 Project</h2>
				<p class="card-text"><a href="https://github.com/csyager/cs4640" target="_blank">Click here to view Github</a></p>
				<p class="card-text">In our Programming Languages for Web Development class, my partner Kyle Leisure and I spent the semester learning the ins and out of web dev.  We explored many languages, starting with HTML and CSS and working into Javascript, PHP, Java Servlet, JSP, XML, Ajax, and AngularJS.  </p>
				<div id="blog3" class="collapse in">
					<p class="card-text">Our project was a peer-to-peer textbook sales site specifically for UVA students.  The site featured the ability to create an account and sign in, then create listings for textbooks.  The site also featured a side-by-side comparison of prices at the UVA bookstore, to help the user find the best price, as well as the ability to rate other users to ensure fair treatment by all users of the site.  The link to our source code can be found above.</p><br>

				</div>
				<button id="button3" type="button" class="btn btn-info" data-toggle="collapse" data-target="#blog3" onclick="change(this.id)" aria-expanded="true" aria-controls="blog2">Read More</button>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment3">
					<textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>

					<?php
            if(isset($_SESSION['user'])){
              echo "<input action=\"blog.php\" name=\"submit3\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>
				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit3"])){
					$post = '3';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection3">
					<?php $disp_post = 3; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments3" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand3" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments3" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>
			</div>
			<div class="card-footer text-muted">
				Posted on May 19th, 2018 by Connor Yager
			</div>
		</div>

		<a id="post2"></a>
		<div class="card mb-4">
			<img class="card-img-top" src="images/nola.jpg">
			<div class="card-body">
				<h2 class="card-title">NOLA Lacrosse Tournament</h2>
				<p class="card-text">I spent this past weekend at a lacrosse tournament in New Orleans.  "The Big Easy" was unlike anything I've ever seen.  While I truly don't understand how anything can possibly get done there, as the city appears to be just one big party, it was a very meaningful experience.  The city structure reminded me in a way of my trip to Europe last summer.  Something about the narrow, crowded roads and the culture that is present there reminded me that the United States actually does have its own culture, even if it isn't nearly as old as that of Europe.  This adventure definitely changed my perspective.</p>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment2">
					<textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>

					<?php
            if(isset($_SESSION['user'])){
              echo "<input action=\"blog.php\" name=\"submit2\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>
				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit2"])){
					$post = '2';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection2">
					<?php $disp_post = 2; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments2" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand2" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments2" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>
			</div>
			<div class="card-footer text-muted">
				Posted on February 13th, 2017 by Connor Yager
			</div>
		</div>

		<a id="post1"></a>
		<div class="card mb-4">
			<img class="card-img-top" src ="images/cozmo.PNG">
			<div class="card-body">
				<h2 class="card-title">Winter Break</h2>
				<p class="card-text">Thus far, it's been a relaxing break from my studies at UVA.  I think that it is a well-timed month off from all the activity of college life.  I've taken time to visit with friends from high school and to catch up with them on the new lives that we've been leading.  It's also given me a chance to focus on working on this website and other programming and coding projects that I wouldn't normally have time for in my busy schedule.</p>

				<div id="blog1" class="collapse in">
					<p>My only complaint is that things can get a little boring when you have nothing to do, and I really miss my friends from college and look forward to getting back together with them.</p>
					<p>Winter break has also been a good opportunity for me to find internship opportunities this summer, and to complete my resume and applications for the open positions.  I want to fill my summer with something productive, be it work or an internship or studies.  I want to be a part of an engineering firm to get experience in what working in those fields would be like, both to help with future work opportunities as well as to just get a better grasp of what I want to be doing in the future.  I think that these experiences would be valuable in determining what path I want to take in my studies and in pursuing a career, and I hope that I will have the opportunity to pursue these opportunities in the summer.</p>
				</div>
				<button id="button1" type="button" class="btn btn-info" data-toggle="collapse" data-target="#blog1" onclick="change(this.id)">Read More</button>
				<br>
				<br>
				<h3>Leave a Comment</h3>
				<form action="" method="post" id="comment1">
					<textarea name="comment" id="comment" rows="4" required="required" style="width: 538px; text-indent: 5px; margin-bottom: 5px" class="rounded"></textarea><br>

					<?php
            if(isset($_SESSION['user'])){
              echo "<input action=\"blog.php\" name=\"submit1\" type=\"submit\" value=\"Submit Comment\" style=\"text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 131px; height: 35px; font-size: 14px\" class=\"btn btn-info\"/>";
            } else {
              echo '<input onclick = "window.location.href = \'login.php\'" value = "Login to leave a comment" style="text-indent: 0px; padding: 5px; margin-bottom: 5px; width: 200px; font-size: 14px" class="btn btn-info">';
            }
          ?>
				</form>
				<h3>Comments</h3>
				<?php
				if(isset($_POST["submit1"])){
					$post = '1';
					include 'post_comment.php';
				}
				?>
				<div id="commentSection1">
					<?php $disp_post = 1; ?>
					<?php include 'fetch_comment.php';?>
					<div id="expandedComments1" class="collapse in">
						<?php include 'fetch_extras.php';?>
					</div>
					<button id="expand1" type="button" class="btn btn-info" data-toggle="collapse" data-target="#expandedComments1" style="width: 200px" onclick="commentChange(this.id)">View More Comments</button>
				</div>
			</div>
			<div class="card-footer text-muted">
				Posted on December 28th, 2016 by Connor Yager
			</div>
		</div>
	</div>
</div>
<br>
<br>

<footer class="footer" style="background-color: grey; bottom: 24">
	<div class="container" style="margin-left: 0px; margin-right: 0px; max-width: 100%">
		<span style="color: black" id="ip"><?php echo "IP Address:  " . getUserIP();?></span>
		<span style="float: right">
			<a href="reportForm.php" class="normal" style="color: black" target="_blank"><img src="images/redflag.png" style="width: 21.5px; height: 21.5px">Report a comment as inappropriate</a>
		</span>
	</div>
</footer>
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
<script>
	var blacklisted = <?php echo json_encode($blacklisted); ?>;
	var user = "<?php echo $_SESSION['user'] ?>";
	if(blacklisted){
		alert("Attention.  User " + user + " has been blacklisted.  You will not be able to leave comments.");
		document.getElementById("blacklistError").innerHTML="<p><b>Attention:</b>  User " + user + " has been blacklisted.  You will not be able to leave comments.  To appeal your blacklisting, <a href=\"appealForm.php\" class=\"normal\" target =\"_blank\">click here.</a></p>";
	} else {
		document.getElementById("blacklistError").style="visibility: hidden";
	}

</script>
</body>
</html>
