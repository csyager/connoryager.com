<DOCTYPE! html>
<html>
<head>
	<?php
		session_start();
	 ?>
	<title>About Me - www.connoryager.com</title>
	<meta name="keywords" content="Yager, Connor, Webpage, Design, yager, connor, webpage, design, create, make website, web, page, site, html, teach, tutor, learn, HTML, coding, code, tags, attributes, tag, attribute, help, me, Craig, craig, chase, Chase, Kim, kim, Kimberly, kimberly">
	<meta encoding="utf-8">

	<script src="js/mobile.js"></script>
	<script type="text/javascript">
		window.onload(checkMobile());
	</script>

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="css/secondary.css">

</head>

<body>
	<?php $about_active = 'active'; ?>
	<?php include 'navigation.php'; ?>

<br>
<h1>About Me</h1>
<div id = "intro" style="width: 50%; float: left;" class="transbox">
	<p style="margin: 5%">My name is Connor Yager, and I am the creator and upkeeper of this blog.  I am a third year student at the University of Virginia, and am majoring in computer science in the School of Engineering and Applied Sciences.  On this page I will post information relavent to me and the things that I have done in my life.  This is meant to be a sort of living resume, and a way for viewers of my site to get to know me a little bit.</p>
	<p style="margin: 5%">With that, I invite you to continue reading if you would like to get to know me better, and to explore the rest of the site!</p>
	<p style="margin: 5%">-Connor</p>
</div>
<div id = "contact" style="width: 30%; float: right; border: all;" class="transbox">
	<h2 style="margin: 5%; color: white">Contact</h2>
	<p style="margin: 5%">To contact me, use any of the methods listed below:</p>
	<table border="1px" class="table-hover" style="min-width: 0px">
		<tr>
			<td>Phone</td>
			<td>(703) 336-3822</td>
		</tr>
		<tr>
			<td>Email</td>
			<td><a href="mailto: csy7ay@virginia.edu">csy7ay@virginia.edu</a></td>
		</tr>
		<tr>
			<td>Twitter</td>
			<td><a href="https://twitter.com/connor_yager" target="_blank">@connor_yager</a></td>
		</tr>
	</table>
</div>
<div style="float: left" class="normal">
	<h2 style="margin-left: 30px">Education</h2>
	<div class="transbox-orange">
		<p>Currently, I am a fourth year student at the University of Virginia's School of Engineering and Applied Sciences.  I attended Norfolk Academy in Norfolk, VA for my sophomore, junior, and senior years, where I graduated with high honors.  I spent my freshman year at W.T. Woodson High School in Fairfax, VA.</p>
		<p>At UVA, I am pursuing a bachelor's of science degree in computer science and a minor in physics.  I have taken classes in engineering and design, entrepreneurship, physics, chemistry, calculus (differential, integral, and multivariate), differential equations, electricity and magnetism, theory of computation, information theory, digital logic design, data structures, web development, discrete mathematics, software development, algorithms, computer architecture, cyber defense, database structures, operating systems, and more.</p>
		<p>My interests in the field of computer science are currently pretty diverse.  I enjoy learning about web development, particularly when I am tinkering with a new framework or way of approaching a problem.  I have taken on projects in web dev that are aimed at solving problems that I personally encounter in my day-to-day life, and find great satisfaction in developing applications with utility.  I also enjoy solving programatic puzzles, and have an interest in working professionally as part of a software-developement team.  Generally, I like optimizing user experience and interface, so find front-end work to be very interesting, but also love the feeling of combining a full-stack solution into a fully functional product.  This summer, I worked as a cybersecurity intern, and found the material that I was engaging with to be highly interesting, and could certainly see myself pursuing this career path as well.  While I clearly don't have a perfect vision of what I'm going to be doing, I do believe that exploring an expanse of topics and garnering experience in many fields of computing is an important part of my short time as a student, and look forward to the many possible directions that my life in computer science can or will take me. </p>
	</div>

	<br>
	<div class="row">
		<div class="img-thumbnail" style="width: 165px; margin: 50px">
				<img src="images/uva_logo.png">
		</div>
		<div class="img-thumbnail" style="width: 250px; height: 200px; margin-top: 50px">
				<img src="images/na_logo.png">
		</div>
	</div>
	<br>
	<h2 style="margin-left: 30px">Extracurriculars</h2>
	<div class="transbox">
		<p>Aside from my schoolwork at UVA, I participate in several extra-curricular activities.  Firstly, I am an executive member of the Alpha Mu chapter of the Delta Sigma Phi fraternity.  Rushing as a first year, I wasn't certain that I wanted to join a fraternity.  However, after finding a group of men who I truly admire and respect, I decided to join.  Delta Sig has made my college experience truly enjoyable, and I am thankful for everything that they have provided for me.  I now serve on the executive council, where I participate in the decision-making that goes into the day-to-day operations of our chapter.</p>
		<p>Secondly, I am a member of the Men's Club Lacrosse team.  In high school, I was interested in playing lacrosse at the varsity level, but found that in order to play I would have to make sacrifices in the kind of education that I wanted to pursue.  Playing club at UVA has been a great compromise, and has given me a way to pursue my passion in a fun and competitive environment, while still studying what I love.  I now serve as team treasurer, where I manage our cash-flow from team dues and work with the school to secure funding for our team.</p>
	</div>
	<h2 style="margin-left: 30px">Family</h2>
	<div class="transbox-orange">
		<p>While not at school I live with my parents, Kim and Craig Yager, and my younger brother Chase.  Both of my parents were pilots in the United States Navy, where my dad retired at the rank of Captain and my mom acheived the rank of Lieutenant Commander.  Prior to her time in the military, my mom majored in graphic design at Auburn University, and worked as a graphic designer for several years.  My dad earned a pre-law bachelor's degree at the University of California at Santa Barbara, and while serving in the military earned an M.B.A. at National University.  Following their time in the Navy, my mother worked as a commercial airline pilot for Delta Airlines, and my father worked for a company based in Virginia Beach, VA, called Check-6, which specifically hires former aviators to teach safety management to oil rig workers.  Currently, my dad works at the corporate level at 7-Eleven.</p>
		<p>My brother is a recent graduate of Norfolk Academy, and is an exemplary student and athlete.  While his grades are stellar in all subjects, he is particularly inclined towards the sciences and mathematics.  As a lacrosse player, Chase was named to the first team All-State team, was an All-American, and won the Bob Scott Award, which is awarded to only one player from each state who goes above and beyond in service to his team, school and community.</p>
		<p>Chase is now a freshman at Amherst College, where he is playing lacrosse and is undecided in his field-of-study, but hopes to major in a math or science.</p>
	</div>
	<div class="row">
		<div class="col col-md-4">
			<div class="img-thumbnail" style="margin: 50px">
				<img src="images/brothers.jpg" class="img-responsive">
				<div class="caption">
					<p style="color: black"><i>Me and my brother, Chase.</i></p>
				</div>
			</div>
		</div>
		<div class="col col-md-4">
			<div class="img-thumbnail" style="margin-top:50px">
				<img src="images/parents.jpg" class="img-responsive">
				<div class="caption">
					<p style="color: black"><i>Me with my dad, Craig, and my mom, Kim.</i></p>
				</div>
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
