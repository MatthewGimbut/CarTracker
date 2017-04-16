<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$userstmt = $mysqli->prepare('SELECT email,userID FROM users WHERE users.notifPref="daily"') or die($mysqli->error);
$userstmt->execute();
$users = $userstmt->get_result();

//Go through users whose emails were on the daily list
while($row = $users->fetch_assoc()) {
  $email = $row['email'];
  $userID = $row['userID'];

  $result = $mysqli->query("SELECT * FROM cars WHERE cars.userID=$userID") or die($mysqli->error);
  $str = "";

  while($car = $result->fetch_assoc()){
      $since = $car['mileage'] - $car['mileageLastInspection'];
      $str = $str . "<p>" . $car['year'] . " " . $car['make'] . " " . $car['model'] . ": " . $since . " miles since maintenance</p>\n";
  }

  //Execute the python script
  exec("python ../python/send_mail.py $email \"$str\"");
}

$users->close();
$result->close();
$mysqli->close();
?>
