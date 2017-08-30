<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","rumahsampah");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));
$idartikel = mysqli_real_escape_string($con, $data->idartikel);
$iduser = mysqli_real_escape_string($con, $data->iduser);
$rating = mysqli_real_escape_string($con, $data->rating);


$sql = "INSERT INTO rating (id_user, id_artikel, rating) values ('$iduser', '$idartikel', '$rating')";
if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

mysqli_close($conn); 	

?>