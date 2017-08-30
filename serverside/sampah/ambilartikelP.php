<?php
header('Access-Control-Allow-Origin: *');
    // variabel koneksi
        $db_name  = 'rumahsampah';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';
         
    // koneksi ke database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
     
    // query untuk menampilkan data
        $sql = 'SELECT `username`,`a`.`id_artikel`,`judul_artikel`,`isi_artikel`,`kategori`,`status`,`timestamp`,rating FROM `artikel` AS `a`,`user` as `u` ,(SELECT AVG(`rating`) as rating, id_artikel from rating group by id_artikel) as r WHERE `a`.`id_user`=`u`.`id_user` && status="Promoted" &&  `r`.`id_artikel`=`a`.`id_artikel` ORDER BY  rating DESC';
        $stmt = $dbh->prepare($sql);
    // execute the query
        $stmt->execute();
     
    // pecah hasilnya ke dalam bentuk array
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
     
    // konversi ke JSON
        $json = json_encode( $result );
        echo $json;
?>