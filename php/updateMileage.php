<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$carID = $_GET["carID"];
$mileage = $_GET["mileage"];
$monthMileage = $_GET["monthMileage"];
$dayMileage = $_GET["dayMileage"];
$yearMileage = $_GET["yearMileage"];

$statement = $mysqli->prepare("UPDATE cars SET cars.mileage = $mileage,
											cars.monthMileage = $monthMileage,
											cars.dayMileage = $dayMileage,
											cars.yearMileage = $yearMileage WHERE carID = $carID");

$statement->execute();
$statement->close();
$mysqli->close();

echo $_GET['callback'] . "({mileage: $mileage,
        monthMileage: $monthMileage,
        dayMileage: $dayMileage,
		yearMileage: $yearMileage})";
?>
