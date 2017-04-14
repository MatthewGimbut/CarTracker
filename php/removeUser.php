<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$userID = $_GET["userID"];

$stmt = $mysqli->prepare('DELETE FROM users WHERE users.userID=?') or die($mysqli->error);
$stmt->bind_param("i", $userID);
$stmt->execute();
//$result = $stmt->get_result();

$stmt = $mysqli->prepare('DELETE FROM cars WHERE cars.userID=?') or die($mysqli->error);
$stmt->bind_param("i", $userID);
$stmt->execute();

//$result->close();
$mysqli->close();

?>
