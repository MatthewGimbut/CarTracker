<?php
    $mysqli = new mysqli('mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com','MikeDB','moscariello', 'CarTrackerInfo');

    //get the user's ID from the database
    $username = $_GET["username"];
    $userID = 0;

    $stmt = $mysqli->prepare("SELECT userID FROM users WHERE users.username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    while($row = $result->fetch_assoc()){
        $userID = $row['userID'];
    }

    //get the user's cars
    $stmt = $mysqli->prepare("SELECT * FROM cars WHERE cars.userID=?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $result = $stmt->get_result();

    //compare mileage to mileageLastInspection
    $myArray = array();

    $index = 0;
    while($row = $result->fetch_assoc()){
        $current = $row['mileage'];
        $last = $row['mileageLastInspection'];
        $since = $current - $last;

        if($since > 4999){
            $myArray[$index]=$row;
        }
        $index = $index + 1;
    }

    $stmt = null;
    $result->close();
    $mysqli->close();

    echo $_GET['callback'] . '('.json_encode($myArray).')';
?>
