<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');

$con=mysqli_connect("localhost","root","","rumahsampah");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$id_user = $_GET['id'];

$result = $con->query("SELECT * FROM `user` as `u` WHERE  `u`.`id_user`='$id_user'");
$rs = mysqli_fetch_array($result, MYSQLI_ASSOC);

$json = json_encode($rs);
echo $json; 

mysqli_close($con);
 
?>