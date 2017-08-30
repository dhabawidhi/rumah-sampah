<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","rumahsampah");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));
$isiKomen = mysqli_real_escape_string($con, $data->content);
$idA = mysqli_real_escape_string($con, $data->idArtikel);
$idU = mysqli_real_escape_string($con, $data->idUser);

$sql = "INSERT INTO komentar (id_user, id_artikel, isi_komentar) values ('$idU', '$idA', '$isiKomen')";
if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

mysqli_close($conn); 	

?>