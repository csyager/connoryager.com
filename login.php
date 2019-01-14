<DOCTYPE! html>
<head>
  <title>Login - www.connoryager.com</title>
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
  <div id = "login" style = "margin-left: 10px">
    <h1>Login</h1>
    <form method = "post" action = "login.php" id = "login">
      <input type = "text" name = "user" id = "user" placeholder = "Username" style = "width: 300px; height: 30px; text-indent: 5px; padding: 0px; margin-bottom: 5px" required = "required"><br>
      <input type = "password" name = "password" id = "password" placeholder = "Password" style = "width:300px; height: 30px" required = "required"><br>
      <input type = "submit" name = "submit" value = "Login">
    </form>
  </div>
  <br>
  <input type = "submit" name = "signup" value = "I don't have an account!" style = "margin-left: 5px" onclick = "window.location.href='signup.php'">

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
        //mySQL username query
        $sql = "SELECT username, auth_key, email from users WHERE username = '" . $_POST['user'] . "' AND auth_key = '" . $_POST['password'] . "'";

        $result = $mysqli -> query($sql);
        $email = $result ->fetch_object() -> email;

        if ($result -> num_rows == 0){
          echo "<div class = 'transbox-red' id = 'login_error'><p style = 'text-color: white'>The username or password is incorrect</p></div>";
        } else {
          $_SESSION['user'] = $_POST['user'];
          $sql = "SELECT email from users WHERE username = '" . $_POST['user'] . "'";
          $_SESSION['email'] = $email;
          $_SESSION['password'] = $_POST['password'];
          header("Location: index.php");

        }
      }
   ?>
</body>
