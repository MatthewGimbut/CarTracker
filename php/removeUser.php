<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$username = $_GET["username"];
$userID = 0;

$stmt = $mysqli->prepare("SELECT userID FROM users WHERE users.username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_assoc();
$userID = $row['userID'];

$stmt = $mysqli->prepare('DELETE FROM users WHERE userID=?') or die($mysqli->error);
$stmt->bind_param("i", $userID);
$stmt->execute();

$stmt = $mysqli->prepare('DELETE FROM cars WHERE userID=?') or die($mysqli->error);
$stmt->bind_param("i", $userID);
$stmt->execute();

$stmt->close();
$result->close();
$mysqli->close();

?>
