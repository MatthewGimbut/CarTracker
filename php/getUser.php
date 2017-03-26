<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$email = $_GET["email"];

$result = $mysqli->query("SELECT * FROM users WHERE users.email = $email");

$myArray = array();
 
while($row = $result->fetch_assoc()) {
	$myArray[] = $row;
}


$result->close();
$mysqli->close();

echo $_GET['callback'] . '('.json_encode($myArray).')';

?>