<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","rumahsampah");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));
$title = mysqli_real_escape_string($con, $data->title);
$category = mysqli_real_escape_string($con, $data->category);
$content = mysqli_real_escape_string($con, $data->content);
$id = mysqli_real_escape_string($con, $data->id);



$sql = "UPDATE artikel SET  judul_artikel='$title', isi_artikel='$content', kategori='$category' WHERE id_artikel='$id'";
if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

mysqli_close($conn); 	
?>