angular.module('starter.controllers', [])
 
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,$window,Users) {
  $scope.datauser = {};
  $scope.datauser.username="Stranger";
  $scope.datauser.id_user=-1;
  $scope.keysearch = "";
  $scope.signupData = [{}];
  $scope.loginData = {};
  $scope.showsubs = false;
  $scope.ismimin = false;
  $scope.thread ={};
  $scope.JK = [
    { text: "Laki - Laki", value: "L" },
    { text: "Perempuan", value: "P" }
  ];
  $scope.kategori = [
    { text: "Sampah Organik", value: "Organik" },
    { text: "Sampah Plastik", value: "Plastik" },
    { text: "Sampah Kaca", value: "Kaca" },
    { text: "Sampah Logam", value: "Logam" },
    { text: "Sampah Kertas", value: "Kertas" }
  ];
  var DEFAULT_PAGE_SIZE_STEP = 5;
  
  $scope.currentPage = 1;
  $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
  
  $scope.loadNextPage = function(){
    $scope.currentPage++;
    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
  }

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });
  
  $ionicModal.fromTemplateUrl('templates/createThread.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-assertive'
      });
    };

  $scope.showAlert2 = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };
  $scope.Search = function(key){ 
      if (!key){
            $scope.showAlert({
                title: "Information",
                message: "Keyword mohon diisi"
            });
     }else $window.location.href = '#/app/search/'+key;
  };
  $scope.createThread = function() {
    $scope.modal2.show();
  };

  
  $scope.closecreateThread = function() {
    $scope.modal2.hide();
  };
  
  $scope.addThread = function() {
        if (!$scope.thread.title){
            $scope.showAlert({
                title: "Information",
                message: "Title mohon diisi"
            });
        }else if (!$scope.thread.category){
            $scope.showAlert({
                title: "Information",
                message: "pilih category thread"
            });
        }else if (!$scope.thread.content){
            $scope.showAlert({
                title: "Information",
                message: "Isi thread mohon diisi"
            });
        }else {
        Users.create({
            title: $scope.thread.title,
            category: $scope.thread.category,
            content: $scope.thread.content,
            id : $scope.datauser.id_user
          }).success(function(data){
                $scope.showAlert2({
                   title: "Information",
                  message: "Artikel telah dibuat"
                });
              $scope.closecreateThread();
              $scope.thread ={};
            });
      }
  };
  $scope.closeSignup = function() {
    $scope.modal1.hide();
  };

  $scope.Signup = function() {
    $scope.modal1.show();
  };

  $scope.doSignUp = function() {
        if (!$scope.signupData.username){
            $scope.showAlert({
                title: "Information",
                message: "Username mohon diisi"
            });

        }else if ($scope.signupData.password1.length <= 5){
            $scope.showAlert({
                title: "Information",
                message: "Password lebih dari 8 karakter"
            });
        }else if ($scope.signupData.password1!=$scope.signupData.password2){
            $scope.showAlert({
                title: "Information",
                message: "Password tidak cocok"
            });
        
        }else if (!$scope.signupData.email){
            $scope.showAlert({
                title: "Information",
                message: "E-mail mohon diisi"
            });
        }else if (!$scope.signupData.JK){
            $scope.showAlert({
                title: "Information",
                message: "Jenis Kelamin mohon diisi"
            });
        }else { 
          Users.signup({
              username: $scope.signupData.username,
              password: $scope.signupData.password1,
              email:    $scope.signupData.email,
              JK:       $scope.signupData.JK
            }).success(function(data){
                $scope.showAlert2({
                   title: "Information",
                  message: "Username telah dibuat"
                });
                $scope.loginData.username = $scope.signupData.username;
                $scope.loginData.password = $scope.signupData.password1;
                $scope.doLogin();
                $scope.closeSignup();
            });
          }
  };

  $scope.doLogin = function() {
    if (!$scope.loginData.username){
            $scope.showAlert({
                title: "Information",
                message: "Mohon isi username"
            });
        }else if (!$scope.loginData.password){
            $scope.showAlert({
                title: "Information",
                message: "Password mohon diisi"
            });
        }else {
          Users.login($scope.loginData.username,$scope.loginData.password)
          .success(function(data){
            $scope.tempuser = data;
            if (!$scope.tempuser.username){
               $scope.datauser.username="Stranger";
              $scope.datauser.id_user=-1;
              $scope.showAlert({
                  title: "Information",
                  message: "Username dan password tidak cocok"
              });

          }else if ($scope.datauser.level_user==0){
            $scope.datauser = data;
            $scope.showsubs=true;
            $scope.ismimin=true;
            $ionicSideMenuDelegate.toggleLeft();
          }

          else{
            $scope.datauser = data;
            $window.location.href = '#/app/playlists';
            $scope.showsubs=true;
            $ionicSideMenuDelegate.toggleLeft();
          }
        })
      }
  };

     $scope.doLogout = function() {
        $window.location.href = '#/app/playlists';
        $scope.showsubs=false;
        $scope.ismimin=false;
        $scope.datauser.id_user=-1;
        $scope.datauser.username="Stranger";
        $scope.datauser.password="abc";
        $ionicSideMenuDelegate.toggleLeft();
        $scope.thread ={};
        $scope.signupData = [{}];
          $scope.loginData = {};
      };
})





.controller('PlaylistsCtrl', function($scope,$ionicPopup, Users) {
   $scope.dataArtikel={};
   $scope.showAlert2 = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };
   $scope.showData = function() {
      if ($scope.showsubs){
      Users.getArtikel().success(function(data) {
            $scope.dataArtikels = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
      } else if(!$scope.showsubs){
        Users.getArtikelP().success(function(data) {
            $scope.dataArtikels = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
      }
    };
    $scope.showData();

    $scope.deleteArtikel = function(idart){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Anda akan menghapus artikel ini',
        template: 'Anda yakin ?',
        cancelText: 'Batal', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'button-light', // String (default: 'button-default'). The type of the Cancel button.
        okText: 'OK', // String (default: 'OK'). The text of the OK button.
        okType: 'button-assertive', // String (default: 'button-positive'). The type of the OK button.
      });
      confirmPopup.then(function(res) {
        if(res) {
          Users.deleteArt(idart).success(function(data) {
            $scope.showAlert({
                  title: "Information",
                  message: "Artikel telah dihapus..!!!"
            });
          });
          $scope.dataArtikels.splice($scope.dataArtikels.indexOf(idart),1);
        } else {
          $scope.showAlert({
                  title: "Information",
                  message: "Dibatalkan..!!!"
          });
       }
      });
      
      
    }
    $scope.promoteArtikel = function(idart){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Promote artikel menyebabkan artikel dapat dibaca oleh umum',
        template: 'Anda yakin ?',
        cancelText: 'Batal', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'button-light', // String (default: 'button-default'). The type of the Cancel button.
        okText: 'Ya', // String (default: 'OK'). The text of the OK button.
        okType: 'button-assertive', // String (default: 'button-positive'). The type of the OK button.
      });
      confirmPopup.then(function(res) {
        if(res) {
          Users.promoteArt(idart).success(function(data) {
            $scope.showAlert2({
                  title: "Information",
                  message: "Artikel telah promosikan..!!!"
            });
          });
          $scope.dataArtikels.splice($scope.dataArtikels.indexOf(idart),1);
        } else {
          $scope.showAlert({
                  title: "Information",
                  message: "Dibatalkan..!!!"
          });
       }
      });
      
    }
   $scope.shouldShowDelete = false;
})




.controller('UserCtrl', function($scope,$stateParams,$ionicModal,$ionicPopup,Users) {

   $scope.JK = [
    { text: "Laki - Laki", value: "L" },
    { text: "Perempuan", value: "P" }
  ];

  $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-assertive'
      });
    };

  $scope.EditT=false;
  $scope.checkId = function(){
    if ($scope.datauser.id_user === $scope.dataUser.id_user){
      $scope.EditT=true;
    }
  };


  $scope.showDataUser = function() {
    Users.detailUser($stateParams.UserId)
      .success(function(data){
        $scope.dataUser = data;
        $scope.password2 = $scope.dataUser.password;
        $scope.checkId();
      }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        });
  };
  $scope.showArtikelUser = function() {
    Users.forumAct($stateParams.UserId)
      .success(function(data){
        $scope.userforum = data;
      }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        });
  };
  
  $scope.showDataUser();
  $scope.showArtikelUser();

  $ionicModal.fromTemplateUrl('templates/editUser.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });


  $scope.updateuser = function(){
    $scope.modal.show();
    
  }

  $scope.closeupdateuser = function(){
    $scope.modal.hide();
    $scope.showDataUser();
  }
  
  $scope.updatedatauser = function() {
        if ($scope.dataUser.username.length <= 8){
            $scope.showAlert({
                title: "Information",
                message: "Username lebih dari 8 karakter"
            });
        }else if (!$scope.dataUser.password){
            $scope.showAlert({
                title: "Information",
                message: "Password mohon diisi"
            });
        }else if (!$scope.dataUser.email_user){
            $scope.showAlert({
                title: "Information",
                message: "E-mail mohon diisi"
            });
        }else if (!$scope.dataUser.jenis_kelamin){
            $scope.showAlert({
                title: "Information",
                message: "Jenis Kelamin mohon diisi"
            });
        }else { 
          Users.editUser({
              username: $scope.dataUser.username,
              password: $scope.dataUser.password,
              email:    $scope.dataUser.email_user,
              JK:       $scope.dataUser.jenis_kelamin,
              id_user:  $scope.datauser.id_user

            }).success(function(data){
                $scope.showAlert({
                   title: "Information",
                  message: "Profil udah diupdate"
                });
                $scope.datauser.username = $scope.dataUser.username;
                $scope.datauser.password = $scope.dataUser.password;
                $scope.showDataUser();
                $scope.closeupdateuser();

            }).error(function(response) {
              $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        });;
          }
  };

  $scope.usertab = true ;
  $scope.activated1='active';
  $scope.activated2='';

  $scope.usertabF = function() {
    $scope.usertab= false;
    $scope.activated2= 'active';
    $scope.activated1='';
  };
  $scope.usertabT = function() {
    $scope.usertab= true;
    $scope.activated1='active';
    $scope.activated2='';
  };

})







.controller('ThreadCtrl', function($scope,$ionicModal,$ionicPopup,Users,$stateParams,$ionicPopover,$http) {
    $scope.idartikel=$stateParams.ThreadId;
    $scope.EditA=false;
    $scope.commentData={};
    
    var DEFAULT_PAGE_SIZE_STEP = 5;
  
    $scope.currentPage = 1;
    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
    
    $scope.loadNextPage = function(){
      $scope.currentPage++;
      $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
    }
    $scope.checkId = function(){
      if ($scope.datauser.id_user === $scope.detailArtikel.id_user){
        $scope.EditA=true;
      }
    };

    $scope.cekBintang = function(){
      Users.cekBintang($scope.detailArtikel.id_artikel,$scope.datauser.id_user)
        .success(function(data){
          $scope.bintang = data;
          if($scope.bintang.rating < 1){
            $scope.binbin = false;
          }else{
            $scope.binbin = true;
          }
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!!"
              });
        });
    }

    $scope.showDataId = function() {
      Users.getArtId($scope.idartikel).success(function(detailArtikel) {
            $scope.detailArtikel = detailArtikel;
            $scope.checkId();
            if ($scope.detailArtikel.rating < 1){
              $scope.detailArtikel.rating = 0.00;
            }
            $scope.cekBintang();
        }).error(function(response){
          $scope.showAlert({
                title: "Information",
                message: "OOPPSS..!!"
            });
        });
    };
    $scope.showDataId();
    
    

    $scope.CommentList = function(){
     Users.getComment($stateParams.ThreadId)
        .success(function(data){
          $scope.komentar = data.records;
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        });
    }
    
    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-assertive'
      });
    };

    
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $ionicModal.fromTemplateUrl('templates/comment.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal1 = modal;
    });

     $ionicModal.fromTemplateUrl('templates/updateArtikel.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal2 = modal;
    });

  $scope.rateartikel = function(bintang){
    if ($scope.datauser.id_user === -1){
      $scope.showAlert({
                title: "Information",
                message: "Log-in dulu yaaa..."
            });
    }else {

      $scope.cekBintang();
      if ($scope.bintang.rating >= 1 ){
        $scope.rating = bintang;
        Users.updateBintang({
          idartikel: $scope.detailArtikel.id_artikel,
          iduser: $scope.datauser.id_user,
          rating: $scope.rating 
        }).success(function(data){
          $scope.showAlert({
                  title: "Information",
                  message: "Rating diUpdate!!"
              });
          $scope.showDataId();
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!!"
              });
        });
      }else {
        $scope.rating = bintang;
        Users.tembakBintang({
          idartikel: $scope.detailArtikel.id_artikel,
          iduser: $scope.datauser.id_user,
          rating: $scope.rating 
        }).success(function(data){
          $scope.showAlert({
                  title: "Information",
                  message: "Rating dimasukkan!!"
              });
          $scope.showDataId();
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!!"
              });
        });
      }
    }
  }
  $scope.updateArt = function(){
    $scope.modal2.show();
  }

  $scope.closeupdateArt = function(){
    $scope.modal2.hide();
    $scope.showDataId();
  }

  $scope.updateArtikel = function() {
        if (!$scope.detailArtikel.judul_artikel){
            $scope.showAlert({
                title: "Information",
                message: "Judul mohon diisi"
            });
        }else if (!$scope.detailArtikel.kategori){
            $scope.showAlert({
                title: "Information",
                message: "Pilih Kategori Artikel"
            });
        }else if (!$scope.detailArtikel.isi_artikel){
            $scope.showAlert({
                title: "Information",
                message: "Isi Artikel mohon diisi"
            });
        }else {
        Users.editArtikel({
            title: $scope.detailArtikel.judul_artikel,
            category: $scope.detailArtikel.kategori,
            content: $scope.detailArtikel.isi_artikel,
            id : $scope.detailArtikel.id_artikel
          }).success(function(data){
              $scope.showAlert({
                  title: "Information",
                  message: "Artikel diubah!!"
              });
              $scope.showDataId();
            }).error(function(response){
              $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!!"
              });
          });
      }
  };
  
  $scope.closeComment = function() {
    $scope.modal1.hide();
  };

  $scope.comment = function() {
    $scope.modal1.show();
    $scope.CommentList();
  };

  $scope.addComment = function() {
        
        if (!$scope.commentData.content){
            $scope.showAlert({
                title: "Information",
                message: "Isi Komentar"
            });
        }else Users.postcomment({
            content: $scope.commentData.content,
            idArtikel: $stateParams.ThreadId,
            idUser:    $scope.datauser.id_user
          }).success(function(data) {
            $scope.showAlert({
                  title: "Informasi",
                  message: "Komentar telah diposting"
              });
            $scope.closeComment();
          }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        });
  };
})







.controller('UserlistsCtrl', function($scope,$ionicPopup, Users) {
   $scope.dataArtikel={};
   $scope.UserList = function() {
      Users.getAllU().success(function(data) {
            $scope.dataUsers = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.UserList();
    $scope.deleteUser = function(idU){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Anda akan menghapus user ini',
        template: 'Anda yakin ?',
        cancelText: 'Batal', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'button-light', // String (default: 'button-default'). The type of the Cancel button.
        okText: 'OK', // String (default: 'OK'). The text of the OK button.
        okType: 'button-assertive', // String (default: 'button-positive'). The type of the OK button.
      });
      confirmPopup.then(function(res) {
        if(res) {
          Users.deleteU(idU).success(function(data) {
            $scope.showAlert({
                  title: "Information",
                  message: "User telah dihapus..!!!"
            });
          });
          $scope.dataUsers.splice($scope.dataUsers.indexOf(idU),1);
        } else {
          $scope.showAlert({
                  title: "Information",
                  message: "Dibatalkan..!!!"
          });
       }
      });
      
      
    }

   $scope.shouldShowDelete = false;
})







.controller('KategoriCtrl', function($scope,$stateParams, Users) {
  $scope.Kategori = $stateParams.idKategori;
  var DEFAULT_PAGE_SIZE_STEP = 5;
  
  $scope.currentPage = 1;
  $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
  
  $scope.loadNextPage = function(){
    $scope.currentPage++;
    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
  }

   $scope.katArt = function() {
    if ($scope.showsubs){
      Users.getKatArt($stateParams.idKategori).success(function(data) {
            $scope.KatArtikel = data;
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }else if (!$scope.showsubs){
      Users.getKatArtP($stateParams.idKategori).success(function(data) {
            $scope.KatArtikel = data;
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
  };
    $scope.katArt();
    
})





.controller('SearchCtrl', function($scope,$stateParams, Users) {
  $scope.SearchKey = $stateParams.searchKey;
  var DEFAULT_PAGE_SIZE_STEP = 5;
  
  $scope.currentPage = 1;
  $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  
  
  $scope.loadNextPage = function(){
    $scope.currentPage++;
    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
  }

  $scope.SArt = function() {
    if($scope.showsubs){
      Users.getSArt($stateParams.searchKey).success(function(data) {
            $scope.SArtikel = data;
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    } else if (!$scope.showsubs){
      Users.getSArtP($stateParams.searchKey).success(function(data) {
            $scope.SArtikel = data;
        }).error(function(response){
            $scope.showAlert({
                  title: "Information",
                  message: "OOPPSS..!!"
              });
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
  };
    $scope.SArt();
    
})