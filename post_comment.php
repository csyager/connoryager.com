<?php 
$link = mysql_connect('yagerwebpagedesignco.ipagemysql.com', 'cyager', 'password'); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
} 
mysql_select_db(cyager_comments); 

$user = $_POST['user'];
$email = $_POST['email'];
$comment = $_POST['comment'];
if($comment!=''){
	$query = mysql_query("INSERT INTO comments (post, user, email, comment) VALUES ($post, '$user', '$email', '$comment')");
}
while($row = mysql_fetch_assoc($query)){
	print_r($row);
}
?> 