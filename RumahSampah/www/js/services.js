angular.module('starter.services', [])

.factory('Users', function($http) {

  return {
    cekBintang: function(idA,idU) {
      return  $http.get("http://192.168.43.127/sampah/cekRate.php?idA="+idA+"& idU="+idU);
    },
    create: function(thread) {
      return $http.post('http://192.168.43.127/sampah/createartikel.php',thread,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
      });
    },
    deleteArt: function(ArtikelId) {
      return $http.get('http://192.168.43.127/sampah/hapusArtikel.php?id='+ArtikelId);
    },
    deleteU: function(UId) {
      return $http.get('http://192.168.43.127/sampah/hapusUser.php?id='+UId);
    },
    detailUser: function(UserId) {
      return $http.get('http://192.168.43.127/sampah/detailuser.php?id='+UserId);
    },
    editArtikel: function(artikelData) {
      return $http.post('http://192.168.43.127/sampah/editArtikel.php',artikelData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
      });
    },
    editUser: function(userData) {
      return $http.post('http://192.168.43.127/sampah/editUser.php',userData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
      });
    },
    forumAct: function(UserId) {
      return $http.get('http://192.168.43.127/sampah/aktivitasForum.php?id='+UserId);
    },
    getArtikel: function() {
      return $http.get('http://192.168.43.127/sampah/ambilArtikel.php');
    },
    getArtikelP: function() {
      return $http.get('http://192.168.43.127/sampah/ambilArtikelP.php');
    },
    getAllU: function() {
      return $http.get('http://192.168.43.127/sampah/ambilUser.php');
    },
    getArtId: function(ArtikelId) {
      return $http.get('http://192.168.43.127/sampah/detailArtikel.php?id='+ArtikelId);
    },
    getComment: function(ArtId) {
      return  $http.get("http://192.168.43.127/sampah/listkomentar.php?id="+ArtId);
    },
    getKatArt: function(Katid) {
      return  $http.get("http://192.168.43.127/sampah/kategori.php?id="+Katid);
    },
    getKatArtP: function(Katid) {
      return  $http.get("http://192.168.43.127/sampah/kategoriP.php?id="+Katid);
    },
    getSArt: function(key) {
      return  $http.get("http://192.168.43.127/sampah/searchArtikel.php?id="+key);
    },
    getSArtP: function(key) {
      return  $http.get("http://192.168.43.127/sampah/searchArtikelP.php?id="+key);
    },
    signup: function(signupData) {
      return $http.post('http://192.168.43.127/sampah/signup.php',signupData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
      });
    },
    updateBintang: function(rateData) {
      return $http.post('http://192.168.43.127/sampah/updateBintang.php',rateData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
      });
    },
    tembakBintang: function(rateData) {
      return $http.post('http://192.168.43.127/sampah/tembakBintang.php',rateData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
      });
    },
    login: function(name,pass) {
      return $http.get('http://192.168.43.127/sampah/login.php?username='+name+'& password='+pass);
    },
    promoteArt: function(ArtikelId) {
      return $http.get('http://192.168.43.127/sampah/promoteArtikel.php?id='+ArtikelId);
    },
    postcomment: function(commentData) {
      return $http.post('http://192.168.43.127/sampah/PostComment.php',commentData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
      });
    }
  };
});