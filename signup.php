<DOCTYPE! html>
<head>
  <title>Sign Up - www.connoryager.com</title>
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
  <div id = "signup" style = "margin-left: 10px">
    <h1>Sign Up</h1>
    <form method = "post" action = "signup.php" id = "signup">
      <input type = "text" name = "user" id = "user" placeholder = "Username" style = "width: 300px; height: 30px; text-indent: 10px; padding: 0px; margin-bottom: 5px" required = "required"><br>
      <input type = "password" name = "password" id = "password" placeholder = "Password" style = "width: 300px; height: 30px; text-indent: 5px; padding: 0px; margin-bottom: 5px" required = "required"><br>
      <input type = "password" name = "password_confirm" id = "password_confirm" placeholder = "Confirm Password" style = "width: 300px; height: 30px; text-indent: 5px; padding: 0px; margin-bottom: 5px" required = "required"><br>
      <input type = "email" name = "email" placeholder = "Email" style = "width: 300px; height: 30px; text-indent: 5px; padding: 0px; margin-bottom: 5px" required = "required"><br>
      <input type = "submit" name = "submit" value = "Sign Up">
    </form>
  </div>

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
        $sql = "SELECT username, email FROM users WHERE username = '" . $_POST['user'] . "' OR email = '" . $_POST['email'] . "'";
        $result = $mysqli -> query($sql);
        if ($result -> num_rows != 0) {
          echo "<div class = 'transbox-red' id = 'signup_error'><p style = 'text-color: white'>Username or email is already taken.</p></div>";
        } else if ($_POST['password'] != $_POST['password_confirm']){
          echo "<div class = 'transbox-red' id = 'signup_error'><p style = 'text-color: white'>Passwords do not match.</p></div>";
        } else {
          //mySQL add user query
          $password = $_POST['password'];
          $hash = password_hash($password, PASSWORD_DEFAULT);
          $sql = "INSERT INTO users(username, auth_key, email) VALUES('" . $_POST['user'] . "'" . ", '" . $hash . "', '" . $_POST['email'] ."')";
          $result = $mysqli -> query($sql);

          echo "<h2 style = 'color: white; margin-left: 5px'>Success! Account Created</h2><br>";
          $_SESSION['user'] = $_POST['user'];
          $_SESSION['email'] = $_POST['email'];
          $_SESSION['password'] = $_POST['password'];
          echo "<input type = \"submit\" name = \"signup\" value = \"Click here to return home.\" style = \"margin-left: 5px\" onclick = \"window.location.href='index.php'\">";
        }
      }
   ?>
