<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$email = $_GET["email"];
$bDay = $_GET["bDay"];
$bMonth = $_GET["bMonth"];
$bYear = $_GET["bYear"];
$newPassword = $_GET["newPassword"];
$username;

// hash password before storing
$hash = (string) password_hash($newPassword, PASSWORD_DEFAULT);

$stmt = $mysqli->prepare('SELECT * FROM users WHERE users.email=? AND users.birthMonth=?  AND users.birthDay=? AND users.birthYear=?') or die($mysqli->error);
$stmt->bind_param("siii", $email,$bMonth,$bDay,$bYear);
$stmt->execute();
$result = $stmt->get_result();

$myArray = array();
while($row = $result->fetch_assoc()) {
    $myArray[] = $row;
    $username = $row['username'];
}

$stmt = $mysqli->prepare('UPDATE users SET users.password=? WHERE users.username=?');
$stmt->bind_param("ss",$hash,$username);
$stmt->execute();
$result = $stmt->get_result();

//$result->close();
$mysqli->close();

echo $_GET['callback'] . '('.json_encode($myArray).')';
?>