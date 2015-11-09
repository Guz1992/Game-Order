function uib_w_9_popup_controller($scope, $ionicPopup) {

  // A confirm dialog
  $scope.show = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Adicionar Novo Jogador',
      template: '<input type="text" ng-model="data.wifi">'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

};