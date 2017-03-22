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

$result = $mysqli->query('INSERT INTO users (users.firstName, 
											users.lastName, 
											users.username, 
											users.email,
											users.password,  
											users.birthDay, 
											users.birthMonth, 
											users.birthYear) VALUES 
											('.$firstName.', '
											.$lastName.', '
											.$username.', '
											.$email.', '
											.$password.', '
											.$bDay.', ' 
											.$bMonth.', '
											.$bYear.')');
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
        bDay: ".$bDay.",
        bMonth: ".$bMonth.",
        bYear: ".$bYear."})";

//$result->close();


?>