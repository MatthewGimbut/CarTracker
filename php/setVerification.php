<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$username = $_GET["username"];

$stmt = $mysqli("UPDATE users SET verified=1 WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->close();

$mysqli->close();

?>