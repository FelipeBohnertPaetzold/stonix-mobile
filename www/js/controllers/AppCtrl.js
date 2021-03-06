var app = angular.module('starter.controllers', [])

app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, $rootScope, $state, $ionicPopup, $timeout, MyStorageService, $ionicHistory) {

  window.http = $http;

  $scope.hideInputLogin = true;

  // sair - logout
  $scope.logout = function () {
    MyStorageService.token.clear();
    $rootScope.userAuthenticated = null;
    $scope.login();
  };

  $ionicModal.fromTemplateUrl('templates/tutorial/tutorial.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modalTutorial = modal;
  });

  $ionicModal.fromTemplateUrl('templates/login/login.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.login = function () {
    $scope.closeRegisterModal();
    $scope.modal.show();
  };
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/login/register.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modalRegister = modal;
  });

  $scope.tutorialOpenModal = function () {
    $scope.closeLogin();
    $scope.modalTutorial.show();
  };

  $scope.tutorialCloseModal = function () {
    $scope.modalTutorial.hide();
    $state.go('app.forum');
  };

  $scope.registerModal = function () {
    $scope.closeLogin();
    $scope.modalRegister.show();
  };
  $scope.closeRegisterModal = function () {
    $scope.modalRegister.hide();
  };

// Login
  $scope.logar = function (credentials) {

    $scope.hideInputLogin = false;
    $scope.hideInputLoad = true;

    $http.post($rootScope.serviceBase2 + "login", credentials)
      .then(
        function (response) {

          var tokenBearer = response.headers('Authorization');
          var token = tokenBearer.substring(7, tokenBearer.length);

          MyStorageService.token.set(token);

          $http.get($rootScope.serviceBase + "users/get-auth").then(function (response) {
            $rootScope.userAuthenticated = response.data;
            $scope.verificarTutor();
          });

          $scope.hideInputLogin = true;
          $scope.hideInputLoad = false;

          $scope.verificarTutor = function () {
            if ($rootScope.userAuthenticated.tutor == false) {
              $scope.tutorialOpenModal();
            } else {
              $scope.closeLogin();
              $rootScope.getAllQuestions();
            }
          }
          //$state.go('app.tutorial');
        },
        function (error) {
          popup("E-mail ou senha incorreto.");
          console.log(credentials);
          $scope.hideInputLogin = true;
          $scope.hideInputLoad = false;
        }
      );
  };

  // PopUp
  function popup(mensagem) {
    var myPopup = $ionicPopup.show({
      title: mensagem
    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2500);
  }
});

app.factory('AuthInterceptor', ['$q', '$window', '$location', '$injector', function ($q, $window, $state, $injector) {

  var MyStorageService = $injector.get("MyStorageService");

  return {
    request: function (config) {
      config.headers = config.headers || {};
      //insere o token no header do cabeçalho
      if (MyStorageService.token.get()) {
        config.headers.Authorization = MyStorageService.token.get();
      }
      return config || $q.when(config);
    },
    response: function (response) {
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      if (rejection.status === 403) {
        //limpa o token do storage
        MyStorageService.token.clear();
      } else {
        var message = rejection.data + '<br><br><i>' + rejection.status + ' - ' + rejection.statusText + '</i>';
      }
      return $q.reject(rejection);
    }
  };
}]);
