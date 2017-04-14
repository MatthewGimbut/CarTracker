<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$userID = $_GET["userID"];

$stmt = $mysqli->prepare('DELETE FROM users WHERE userID=?') or die($mysqli->error);
$stmt->bind_param("i", $userID);
$stmt->execute();
//$result = $stmt->get_result();

$stmt = $mysqli->prepare('DELETE FROM cars WHERE userID=?') or die($mysqli->error);
$stmt->bind_param("i", $userID);
$stmt->execute();

$stmt = null;

//$result->close();
$mysqli->close();

?>
