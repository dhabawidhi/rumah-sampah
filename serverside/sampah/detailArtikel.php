<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');

$con=mysqli_connect("localhost","root","","rumahsampah");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$id_artikel = $_GET['id'];

$result = $con->query("SELECT `username`,`u`.`id_user`,`a`.`id_artikel`,`judul_artikel`,`isi_artikel`,`kategori`,`timestamp`,`rating`,`status` FROM `artikel` AS `a`,`user` as `u`,(SELECT AVG(`rating`) as rating, id_artikel from rating group by id_artikel) as r  WHERE `a`.`id_user`=`u`.`id_user` &&  `a`.`id_artikel`='$id_artikel' && `r`.`id_artikel`='$id_artikel' ");
$rs = mysqli_fetch_array($result, MYSQLI_ASSOC);

$json = json_encode($rs);
echo $json; 

mysqli_close($con);
 
?>