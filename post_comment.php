<?php
$ip = getUserIP();
$blacklist = file_get_contents("blacklist.txt");
$mysqli = new mysqli('localhost', commentuser, cactus106, 'comments');
if ($mysqli -> connect_errno) {
  echo "Error:  Failed to make a MySQL connection: \n";
  echo "Errno:  " . $mysqli->connect_errno . "\n";
  echo "Error:  " . $mysqli->connect_errno . "\n";
}

$user = $_SESSION['user'];
$email = $_SESSION['email'];
$comment = $_POST['comment'];

#this code replaces single-quotes with ascii codes
$user = str_replace("'", "&#39;", $user);
$comment = str_replace("'", "&#39;", $comment);
if(strpos($blacklist, $user)){
	$blacklisted = true;
} else { $blacklisted = false; }

if($comment!=''&&!$blacklisted){
	$sql = "INSERT INTO comments (post, user, email, comment, ip) VALUES ($post, '$user', '$email', '$comment', '$ip')";
  $mysqli -> query($sql);
}
?>
