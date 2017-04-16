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

//get all other possibly changed data
$firstName = $_GET["firstName"];
$lastName = $_GET["lastName"];
$bDay = $_GET["bDay"];
$bMonth = $_GET["bMonth"];
$bYear = $_GET["bYear"];

//updating first name
if ($firstName !== null) {
    $statement = $mysqli->prepare("UPDATE users SET users.firstName = $firstName WHERE userID = $userID");
    $statement->execute();
    $statement->close();
}

//updating last name
if($lastName !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.lastName = $lastName WHERE userID = $userID");
    $statement->execute();
    $statement->close();
}

//updating bDay
if($bDay !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.birthDay = $bDay WHERE userID = $userID");
    $statement->execute();
    $statement->close();
}

//updating bMonth
if($bMonth !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.birthMonth = $bMonth WHERE userID = $userID");
    $statement->execute();
    $statement->close();
}

//updating bYear
if($bYear !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.birthYear = $bYear WHERE userID = $userID");
    $statement->execute();
    $statement->close();
}

$result = $mysqli->prepare(SELECT * FROM users WHERE userID = $userID);

while ($row = $result->fetch_assoc()) {
    $myArray[] = $row;
}

$mysqli->close();

echo $_GET['callback'] . '(' . json_encode($myArray) . ')';
?>
