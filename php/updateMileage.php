<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$mileage = $_GET["mileage"];
$monthMileage = $_GET["monthMileage"];
$dayMileage = $_GET["dayMileage"];
$yearMileage = $_GET["yearMileage"];

$mysqli->query('UPDATE cars SET cars.mileage = '.$mileage.',
											cars.monthMileage = '.$monthMileage.',
											cars.dayMileage = '.$dayMileage.',
											cars.yearMileage = '.$yearMileage.' WHERE carID = 1');


$mysqli->close();

echo $_GET['callback'] . "({mileage: $mileage,
        monthMileage: $monthMileage,
        dayMileage: $dayMileage,
		yearMileage: $yearMileage})";
?>
