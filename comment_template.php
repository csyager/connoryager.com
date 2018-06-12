<DOCTYPE! html>
<html>
<head>

<title>Blog - www.connoryager.com</title>
<meta name="keywords" content="Yager, Connor, Webpage, Design, yager, connor, webpage, design, create, make website, web, page, site, html, teach, tutor, learn, HTML, coding, code, tags, attributes, tag, attribute, help, me, Craig, craig, chase, Chase, Kim, kim, Kimberly, kimberly">
<meta encoding="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
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
</script>


</head>

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
			<a href = "blog.htm" class = "btn">Blog</a>
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
              <a href="blog.htm" class="btn" style="font-size: 20px;">Blog</a><br>
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
<div id="respond">
<h3>Leave a Comment</h3>
<form action="" method="post" id="commentForm">
	<label for="user" class="required">Your name</label>
	<input type="text" name="user" id="user" value="" tabindex="1" required="required">
	<label for="email" class="required">Your email</label>
	<input type="email" name="email" id="email" value="" tabindex="2" required="required">
	<label for="comment" class="required">Your message</label>
	<textarea name="comment" id="comment" rows="10" tabindex="4" required="required"></textarea>

	<input name="submit" type="submit" value="Submit comment" />
</form>
</div>
<br>
<?php include 'post_comment.php';?>
<br>
<h3>Results</h3>
<h4>Post 1:</h4>
<span style="color:white">
<?php 
$link = mysql_connect('yagerwebpagedesignco.ipagemysql.com', 'cyager', 'password'); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
} 
mysql_select_db(cyager_comments); 

$query = mysql_query("SELECT comment FROM comments WHERE post = '1'");
$count = 0;
while($row = mysql_fetch_assoc($query)){
	echo mysql_result($query, $count);
	echo '<br>';
	$count++;
}

?> 
<br>
<h4>Post 2:</h4>
<?php 
$link = mysql_connect('yagerwebpagedesignco.ipagemysql.com', 'cyager', 'password'); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
} 
echo 'Connected successfully'; 
mysql_select_db(cyager_comments); 

$query = mysql_query("SELECT comment FROM comments WHERE post = '2'");
while($row = mysql_fetch_assoc($query)){
	print_r($row);
}
?> 
</span>