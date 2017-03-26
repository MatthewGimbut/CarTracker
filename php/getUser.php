<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$email = $_GET["email"];
$pass = $_GET["password"];

$hash = (string) password_hash($pass, PASSWORD_DEFAULT);

$stmt = $mysqli->prepare('SELECT * FROM users WHERE users.email=?') or die($mysqli->error);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

//$result = $mysqli->query("SELECT * FROM users WHERE users.email = $email");

$myArray = array();

while($row = $result->fetch_assoc()) {
  if(password_verify($pass, $row['password'])){
    $myArray[] = $row;
  }
}


$result->close();
$mysqli->close();

echo $_GET['callback'] . '('.json_encode($myArray).')';

?>
