<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$carID = $_GET["carID"];

$stmt = $mysqli->prepare('DELETE FROM cars WHERE carID=?') or die($mysqli->error);
$stmt->bind_param("i", $carID);
$stmt->execute();

$stmt->close();
$mysqli->close();

?>
