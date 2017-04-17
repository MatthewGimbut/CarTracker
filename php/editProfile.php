<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com', 'MikeDB', 'moscariello', 'CarTrackerInfo') or die($mysqli->error);

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
    $statement = $mysqli->prepare("UPDATE users SET users.firstName=?  WHERE userID=?") or die($mysqli->error);
    $stmt->bind_param("si", $firstName, $userID);
    $statement->execute();
    $statement->close();
    echo "donefirst";
}

//updating last name
if($lastName !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.lastName = ? WHERE userID = ?") or die($mysqli->error);
    $stmt->bind_param("si", $lastName, $userID);
    $statement->execute();
    $statement->close();
     echo "donelast";
}

//updating bDay
if($bDay !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.birthDay = ? WHERE userID = ?") or die($mysqli->error);
    $stmt->bind_param("ii", $bDay, $userID);
    $statement->execute();
    $statement->close();
     echo "doneday"
}

//updating bMonth
if($bMonth !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.birthMonth = ? WHERE userID = ?") or die($mysqli->error);
    $stmt->bind_param("ii", $bMonth, $userID);
    $statement->execute();
    $statement->close();
     echo "donemonth";
}

//updating bYear
if($bYear !== null){
    $statement = $mysqli->prepare("UPDATE users SET users.birthYear = ? WHERE userID = ?") or die($mysqli->error);
    $stmt->bind_param("ii", $bYear, $userID);
    $statement->execute();
    $statement->close();
     echo "doneyear"
}

$stmt = $mysqli->prepare("SELECT * FROM users WHERE userID = ?") or die($mysqli->error);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $myArray[] = $row;
}

$mysqli->close();

echo $_GET['callback'] . '(' . json_encode($myArray) . ')';
?>
