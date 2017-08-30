// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search/:searchKey',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }, 'fabContent': ""
    }
  })
  
    .state('app.playlists', {
      url: '/playlists',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        },'fabContent': {
                template: '<button ng-click="createThread()" id="fab-activity" class="button button-fab button-fab-bottom-left expanded button-calm flap" ng-show="showsubs"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

  .state('app.user', {
    url: '/user/:UserId',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
        controller : 'UserCtrl'
      }, 'fabContent': ""
    }
  })

  .state('app.thread', {
    url: '/thread/:ThreadId',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/thread.html',
        controller : 'ThreadCtrl'
      }, 'fabContent': ""
    }
  })

  .state('app.Kategori', {
    url: '/kategori/:idKategori',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/kategori.html',
        controller: 'KategoriCtrl'
      }, 'fabContent': ""
    }
  })

  .state('app.admin', {
    url: '/admin',
    views: {
      'menuContent': {
        templateUrl: 'templates/admin.html'
      }, 'fabContent': ""
    }
  })

  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html',
        controller: 'UserCtrl'
      }, 'fabContent': ""
    }
  })
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'UserCtrl'
      }, 'fabContent': ""
    }
  })
  .state('app.adminUsrLst', {
    url: '/adminUsrLst',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/adminUsrLst.html',
         controller : 'UserlistsCtrl'
      }, 'fabContent': ""
    }
  })

  .state('app.adminThrd', {
    url: '/adminThrd',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/adminThrd.html',
        controller: 'PlaylistsCtrl'
      }, 'fabContent': ""
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})