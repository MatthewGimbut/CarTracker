<?php

$mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

$userstmt = $mysqli->prepare('SELECT email,userID FROM users WHERE users.notifPref="daily"') or die($mysqli->error);
$userstmt->execute();
$users = $userstmt->get_result();

//Go through users whose emails were on the daily list
while($row = $users->fetch_assoc()) {
  $email = $row['email'];
  $userID = $row['userID'];

  $carsstmt = $mysqli->prepare("SELECT year,make,model,mileage,mileageLastInspection FROM cars WHERE userID=?") or die($mysqli->error);
  $carsstmt->bind_param("i", $userID);
  $cars = $carsstmt->get_result();
  $str = "";

  while($car = $cars->fetch_assoc()){
      $since = $car['mileage'] - $car['mileageLastInspection'];
      $str = $str . $car['year'] . $car['make'] . $car['model'] . ": " . $since . " miles since maintenance\n";

      //Execute the python script
      exec('python ../python/send_mail.py $email $str');
      echo('python ../python/send_mail.py $email $str');
  }
}


$users->close();
$userstmt = null;
$cars->close();
$carsstmt = null;
$mysqli->close();
?>
