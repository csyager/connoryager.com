<?php 
$username = file_get_contents("username.txt");
$password = file_get_contents("password.txt");
$blacklist= file_get_contents("blacklist.txt");
$ip = getUserIP();
$link = mysql_connect('yagerwebpagedesignco.ipagemysql.com', $username, $password); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
} 
mysql_select_db(cyager_comments); 

$user = $_POST['user'];
$email = $_POST['email'];
$comment = $_POST['comment'];
if($comment!=''&&!(strpos($blacklist, $ip))){
	$query = mysql_query("INSERT INTO comments (post, user, email, comment) VALUES ($post, '$user', '$email', '$comment')");
} 
while($row = mysql_fetch_assoc($query)){
	print_r($row);
}
?> 