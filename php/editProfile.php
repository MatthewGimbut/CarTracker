<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com', 'MikeDB', 'moscariello', 'CarTrackerInfo');

//get the user's ID from the database
$username = $_GET["username"];
$userID = 0;

$stmt = $mysqli->prepare("SELECT userID FROM users WHERE users.username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $userID = $row['userID'];
}

while ($row = $result->fetch_assoc()) {
    $myArray[] = $row;
}

echo $_GET['callback'] . '(' . json_encode($myArray) . ')';
?>
