app.controller('TutorialCtrl', function ($scope, $rootScope, $state, $http, $ionicSlideBoxDelegate, $ionicPopup, $timeout) {
  // Called to navigate to the main app
  $scope.startApp = function () {
    $state.go('main');
  };
  $scope.next = function () {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function () {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.$index = 0;
  $scope.slideHasChanged = function (index) {
    $scope.$index = index;
  };

  $scope.finalTutor = function () {
    $rootScope.userAuthenticated.tutor = true;
    $rootScope.userAuthenticated.xp = $rootScope.userAuthenticated.xp + 20;
    $http.put($rootScope.serviceBase + 'users', $rootScope.userAuthenticated).then(function (response) {
      $rootScope.userAuthenticated = response.data;
    });
    $scope.cancel();
    popup("Uauuu você concluiu o tutorial! 20 de XP a mais para você :)");
  }

  $scope.finalTutor = function () {
    $rootScope.userAuthenticated.tutor = true;
    $rootScope.userAuthenticated.xp = $rootScope.userAuthenticated.xp + 20;
    $http.put($rootScope.serviceBase + 'users', $rootScope.userAuthenticated).then(function (response) {
      $rootScope.userAuthenticated = response.data;
    });
    popup("Uauuu você concluiu o tutorial! 20 de XP a mais para você :)");
    $scope.tutorialCloseModal();
  }

  function popup(mensagem) {
    var myPopup = $ionicPopup.show({
      title: mensagem
    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2500);
  }
});
