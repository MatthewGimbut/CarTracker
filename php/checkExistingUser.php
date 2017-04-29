<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$username = $_GET["username"];
$email = $_GET["email"];


$userResult = $mysqli->prepare('SELECT username FROM users WHERE users.username = ?');
$userResult->bind_param("s", $username);
$userResult->execute();
$userResult->store_result();
$usernameExists = ($userResult->num_rows);
$userResult->close();

$emailResult = $mysqli->prepare('SELECT email FROM users WHERE users.email = ?');
$emailResult->bind_param("s", $email);
$emailResult->execute();
$emailResult->store_result();
$emailExists = ($emailResult->num_rows);
$emailResult->close();

$mysqli->close();

echo $_GET['callback'] . "({userFields: $usernameExists,
							emailFields: $emailExists})";

?>