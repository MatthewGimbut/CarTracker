<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$carID = $_GET["carID"];
$mileageLastInspection = $_GET["inspectionMileage"];
$monthInspection = $_GET["monthInspection"];
$dayInspection = $_GET["dayInspection"];
$yearInspection = $_GET["yearInspection"];

$statement = $mysqli->prepare("UPDATE cars SET cars.mileageLastInspection = $mileageLastInspection,
											cars.monthInspection = $monthInspection,
											cars.dayInspection = $dayInspection,
											cars.yearInspection = $yearInspection WHERE carID = $carID");

$statement->execute();
$statement->close();
$mysqli->close();

echo $_GET['callback'] . "({mileage: $mileageLastInspection,
        monthMileage: $monthInspection,
        dayMileage: $dayInspection,
		yearMileage: $yearInspection})";
?>