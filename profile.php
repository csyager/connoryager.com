<DOCTYPE! html>
<html>
<head>
<?php
	session_start();
 ?>
	<title>Profile - www.connoryager.com</title>
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
  <br>
  <div id = 'profile' style = "margin-left: 10px">
    <h1><?php echo $_SESSION['user']; ?></h1><br>
    <div class="container" style="max-width: none; width: 100%;">
    	<div class="card-columns">
    		<div class="card mb-4">
          <div class="card-body">
            <h2 class="card-title">Your Info</h2>
            <form method = "post" action = "profile.php" id = "update">
            <table border="1px" style = "color:black; background-color: white; width: 500px" class = "table-hover">
              <tr>
                <td>Username</td>
                <td><input type="text" style = "width: 300px; height: 30px; text-indent: 5px; padding: 0px;" name = "user" value='<?php echo $_SESSION['user']; ?>' required></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input type="email" style = "width: 300px; height: 30px; padding: 0px;" name = "email" value='<?php echo $_SESSION['email']; ?>' required></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input type = "password" style = "width: 300px; height: 30px; text-indent: 5px; padding: 0px;" name = "pass" id = "pass" value='<?php echo $_SESSION['password']; ?>' required></td>
              </tr>
            </table>
            <input type="checkbox" onclick = "passReveal()"> Show Password<br><br>
            <input type="submit" name="submit" value="Update Profile" class="btn btn-info">
            </form>
            <script>
              function passReveal() {
                var pass = document.getElementById("pass");
                if (pass.type === "password") {
                  pass.type = "text";
                } else {
                  pass.type = "password";
                }
              }
            </script>
            <?php
                session_start();

                if($_POST['submit']){
                  //mysqli object and error handling

                  $mysqli = new mysqli('localhost', commentuser, cactus106, 'comments');
                  if ($mysqli -> connect_errno) {
                    echo "Error:  Failed to make a MySQL connection: \n";
                    echo "Errno:  " . $mysqli->connect_errno . "\n";
                    echo "Error:  " . $mysqli->connect_errno . "\n";
                  }

                  //mySQL check if username is unique
                  $sql = "SELECT username, email FROM users WHERE (username = '" . $_POST['user'] . "' OR email = '" . $_POST['email'] . "') AND username != '" . $_SESSION['username'] . "' AND email != '" . $_SESSION['email'] . "'";
                  $result = $mysqli -> query($sql);
                  if ($result -> num_rows != 0) {
                    echo "<div class = 'transbox-red' id = 'signup_error'><p style = 'text-color: white'>Username or email is already taken.</p></div>";
                  } else {
                    $olduser = $_SESSION['user'];
                    $_SESSION['user'] = $_POST['user'];
                    $_SESSION['email'] = $_POST['email'];
                    $_SESSION['password'] = $_POST['pass'];
                    //mySQL update user query
                    $sql = "UPDATE users SET username = '" . $_POST['user'] . "', auth_key = '" . $_POST['pass'] . "', email = '" . $_POST['email'] ."' WHERE username = '" . $olduser . "'";
                    $result = $mysqli -> query($sql);
                    //mySQL update username for all comments
                    $sql = "UPDATE comments set user = '" . $_POST['user'] . "' WHERE user = '" . $olduser . "'";
                    $result = $mysqli -> query($sql);

                    echo "<h2 style = 'color: black; margin-left: 5px'>Success! Account updated! Your changes will be reflected when you return home.</h2><br>";

                  }
                }
             ?>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <h2 class="card-title">Your Comments</h2>
            <?php
              $mysqli = new mysqli('localhost', commentuser, cactus106, 'comments');
              if ($mysqli -> connect_errno) {
                echo "Error:  Failed to make a MySQL connection: \n";
                echo "Errno:  " . $mysqli->connect_errno . "\n";
                echo "Error:  " . $mysqli->connect_errno . "\n";
              }

              $sql = "SELECT date, post, comment FROM comments WHERE user = '" . $_SESSION['user'] . "' ORDER BY (date) DESC";
              $result = $mysqli -> query($sql);
              while($row = $result->fetch_assoc()) {
                echo "<a href = 'blog.php#commentSection" . $row['post'] ."' class = 'normal' style='text-decoration:none; text-color: black'>At " . $row['date'] . ": <br>" . $row['comment']. "</a><hr>";
              }
            ?>


  </div>
