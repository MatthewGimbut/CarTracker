<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$username = $_GET["username"];
$email = $_GET["email"];
$newPassword1 = $_GET["newPassword1"];

// hash password before storing
$hash = (string) password_hash($newPassword1, PASSWORD_DEFAULT);

$result = $mysqli->prepare('UPDATE users SET users.password=? WHERE users.username=?');
$result->bind_param("ss",$hash,$username);
$result->execute();
$result->close();
$mysqli->close();

echo $_GET['callback'] . "({
        username: \"$username\",
        email: \"$email\",
        password: \"$hash\",
        })";

?>