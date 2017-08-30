<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost'; 

$user = 'root'; 

$pass = ''; 

$dbname = 'rumahsampah';
 
//mengubung ke host
$connect = mysql_connect($host, $user, $pass) or die(mysql_error());
$dbselect = mysql_select_db($dbname);

$id_post = $_GET['id'];
$outp = "";
$getproduk = mysql_query("SELECT username, isi_komentar FROM komentar as k, user as u WHERE id_artikel = '$id_post' && k.id_user=u.id_user");
while ($container = mysql_fetch_array($getproduk)) {
	if ($outp != "") {$outp .= ",";};
    $outp .= '{"username":"'  . $container["username"] . '",';
    $outp .= '"isi_komentar":"'   . $container["isi_komentar"] . '"}';	
}
$outp ='{"records":['.$outp.']}';
echo($outp);	
?>