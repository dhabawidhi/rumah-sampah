<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","rumahsampah");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));
$username = mysqli_real_escape_string($con, $data->username);
$password = mysqli_real_escape_string($con, $data->password);
$email = mysqli_real_escape_string($con, $data->email);
$JK = mysqli_real_escape_string($con, $data->JK);
$id = mysqli_real_escape_string($con, $data->id_user);


$sql = "UPDATE user SET username='$username', password='$password', email_user='$email', jenis_kelamin='$JK' WHERE id_user='$id' ";
if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

mysqli_close($conn); 	

?>