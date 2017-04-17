<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$username = $_GET["username"];
$email = $_GET["email"];
$newEmail1 = $_GET["newEmail1"];


$result = $mysqli->prepare('UPDATE users SET users.email=? WHERE users.username=?');
$result->bind_param("ss",$newEmail1,$username);
$result->execute();
$result->close();
$mysqli->close();

echo $_GET['callback'] . "({
        username: \"$username\",
        email: \"$email\",
        })";

?>