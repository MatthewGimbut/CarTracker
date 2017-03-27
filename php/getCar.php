<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$result = $mysqli->query('SELECT * FROM cars WHERE cars.userID=111') or die($mysqli->error);

$myArray = array();

while($row = $result->fetch_assoc()) {
	$myArray[] = $row;
}

$result->close();
$mysqli->close();

echo $_GET['callback'] . '('.json_encode($myArray).')';

?>