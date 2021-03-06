angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

  .run(function ($ionicPlatform, $rootScope, $http, MyStorageService) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    $rootScope.serviceBase = "http://localhost:9991/api/";
    $rootScope.serviceBase2 = "http://localhost:9991/";

    if (MyStorageService.token.get() != null) {
      $http.get($rootScope.serviceBase + "users/get-auth").then(function (response) {
        $rootScope.userAuthenticated = response.data;
        $http.get($rootScope.serviceBase + "users/ranking/punctuation").then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].id == $rootScope.userAuthenticated.id) {
              $rootScope.rank = i + 1;
            }
          }
        });
      });
    }
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.forum', {
        url: '/forum',
        views: {
          'menuContent': {
            templateUrl: 'templates/forum/forum.html',
            controller: 'ForumCtrl'
          }
        }
      })

      .state('app.question-answer', {
        url: '/forum/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/forum/question-answer.html',
            controller: 'ForumCtrl'
          }
        }
      })

      .state('app.question-new', {
        url: '/forum/new',
        views: {
          'menuContent': {
            templateUrl: 'templates/forum/question-new.html',
            controller: 'ForumCtrl'
          }
        }
      })

      .state('app.question-edit', {
        url: '/forum/edit/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/forum/question-edit.html',
            controller: 'ForumCtrl'
          }
        }
      })

      .state('app.rooms', {
        url: '/rooms',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/rooms.html',
            controller: 'RoomCtrl'
          }
        }
      })

      .state('app.room-new', {
        url: '/room-new/',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/room-new.html',
            controller: 'RoomCtrl'
          }
        }
      })

      .state('app.room-new-user', {
        url: '/room-new-user/:idroom',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/room-new-user.html',
            controller: 'RoomCtrl'
          }
        }
      })

      .state('app.classroom', {
        url: '/classroom/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/classroom.html',
            controller: 'RoomCtrl'
          }
        }
      })

      .state('app.category-new', {
        url: '/classroom/:id/category',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/new-category.html',
            controller: 'TaskCtrl'
          }
        }
      })

      .state('app.category-edit', {
        url: '/classroom/:id/category/:idCategory',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/edit-category.html',
            controller: 'TaskCtrl'
          }
        }
      })

      .state('app.task', {
        url: '/classroom/tasks/:taskid',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/activity.html',
            controller: 'TaskCtrl'
          }
        }
      })

      .state('app.task-edit', {
        url: '/classroom/tasks/:taskid',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/task-edit.html',
            controller: 'TaskCtrl'
          }
        }
      })

      .state('app.new-task', {
        url: '/classroom/:id/category/:idCategory/task',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/task-new.html',
            controller: 'TaskCtrl'
          }
        }
      })

      .state('app.activity', {
        url: '/activity',
        views: {
          'menuContent': {
            templateUrl: 'templates/rooms/activity.html',
            controller: 'RoomCtrl'
          }
        }
      })

      .state('app.ranking', {
        url: '/ranking',
        views: {
          'menuContent': {
            templateUrl: 'templates/ranking/ranking.html',
            controller: 'RankCtrl'
          }
        }
      })

      .state('app.perfil', {
        url: '/perfil',
        views: {
          'menuContent': {
            templateUrl: 'templates/perfil/perfil.html',
            controller: 'PerfilCtrl'
          }
        }
      })

      .state('app.perfil-edit', {
        url: '/perfil/edit/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/perfil/perfil-edit.html',
            controller: 'PerfilCtrl'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login/login.html',
            controller: 'AppCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/app/forum');
  });
