<?php
header('Access-Control-Allow-Origin: *');
    // variabel koneksi
        $db_name  = 'rumahsampah';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';
        
    // koneksi ke database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
     	$id = $_GET['id'];
    // query untuk menampilkan data
        $sql = 'SELECT * FROM `artikel` WHERE `id_user`="'.$id.'"';
        $stmt = $dbh->prepare($sql);
    // execute the query
        $stmt->execute();
     
    // pecah hasilnya ke dalam bentuk array
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
     
    // konversi ke JSON
        $json = json_encode( $result );
        echo $json;
?>