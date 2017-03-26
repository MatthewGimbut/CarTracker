<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$firstName = $_GET["firstName"];
$lastName = $_GET["lastName"];
$username = $_GET["username"];
$email = $_GET["email"];
$password = $_GET["password"];
$bDay = $_GET["bDay"];
$bMonth = $_GET["bMonth"];
$bYear = $_GET["bYear"];

// hash password before storing
// use password_verify to verify
$hash = (string) password_hash($password, PASSWORD_DEFAULT);

// Prepare statement before execution to prevent exploits like SQL Injection
$result = $mysqli->prepare('INSERT INTO users (users.firstName,
											users.lastName,
											users.username,
											users.email,
											users.password,
											users.birthDay,
											users.birthMonth,
											users.birthYear) VALUES
											(?,?,?,?,?,?,?,?)');

$result->bind_param("sssssiii",
                $firstName,
								$lastName,
								$username,
								$email,
								$hash,
								$bDay,
								$bMonth,
								$bYear);

$result->execute();
$result->close();

//echo $result;
//$myArray = array();

//while($row = $result->fetch_assoc()) {
//	$myArray[] = $row;
//}
//echo $_GET['callback'] . '('.json_encode($myArray).')';

$mysqli->close();

echo $_GET['callback'] . "({firstName: ".$firstName.",
        lastName: ".$lastName.",
        username: ".$username.",
        email: ".$email.",
        password: ".$password.",
        birthDay: ".$bDay.",
        birthMonth: ".$bMonth.",
        birthYear: ".$bYear."})";

//$result->close();
?>
