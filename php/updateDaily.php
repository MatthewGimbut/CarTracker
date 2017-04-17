<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$username = $_GET["username"];

$userstmt = $mysqli->prepare(SELECT userID FROM users WHERE users.username=?") or die($mysqli->error);
$userstmt->bind_param("s", $username);
$userstmt->execute();
$users = $userstmt->get_result();
$userstmt->close();

$row = $users->fetch_assoc()
$userID = $row['userID'];

$result = $mysqli->query("SELECT * FROM cars WHERE cars.userID=$userID") or die($mysqli->error);
$str = "";

while($car = $result->fetch_assoc()){
  $since = $car['mileage'] - $car['mileageLastInspection'];
  $str = $str . "<p>" . $car['year'] . " " . $car['make'] . " " . $car['model'] . ": " . $since . " miles since maintenance</p>\n";
}

echo $_GET['callback'] . "({details: \"$str\"})";

$users->close();
$result->close();
$mysqli->close();
?>
