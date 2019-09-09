<?php
  $mysqli = new mysqli('localhost', commentuser, cactus106, 'comments');
  if ($mysqli -> connect_errno) {
    echo "Error:  Failed to make a MySQL connection: \n";
    echo "Errno:  " . $mysqli->connect_errno . "\n";
    echo "Error:  " . $mysqli->connect_errno . "\n";
  }

  $sql = "SELECT user, date, comment FROM comments WHERE post = " . $disp_post . " ORDER BY (date) DESC LIMIT 0, 3";
  $result = $mysqli -> query($sql);
  while($row = $result->fetch_assoc()) {
    echo $row['user'] . " at " . $row['date'] . ": <br>" . $row['comment']. "<hr>";
  }
?>
