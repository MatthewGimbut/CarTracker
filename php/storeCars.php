<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$make = $_GET["make"];
$model = $_GET["model"];
$trim = $_GET["trim"];
$year = $_GET["year"];
$username = $_GET["username"];

//First get userID since we don't save it in the cookies
//TODO: SAVE USERID IN THE COOKIES
$stmt = $mysqli->prepare("SELECT userID FROM users WHERE users.username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_assoc();
$userID = $row['userID'];

$result->close();
$result = null;


$stmt = $mysqli->prepare('INSERT INTO cars (cars.userID,
                                                cars.make,
                                                cars.model,
                                                cars.year,
                                                cars.trim) VALUES
											(?,?,?,?,?)');

$stmt->bind_param("issis", $userID, $make, $model, $year, $trim);

$stmt->execute();
$stmt->close();
$stmt = null;

$mysqli->close();

echo $_GET['callback'] . "({userID: \"$userID\",
        make: \"$make\",
        model: \"$model\",
        trim: \"$trim\",
        year: \"$year\"})";

?>
