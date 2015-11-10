function uib_w_22_popup_controller($scope, $ionicPopup) {
  $scope.data = {}

  // A confirm dialog
  $scope.show = function() {
    var confirmPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.wifi" placeholder="Nome do Jogador">',
    title: 'Digite o nome do jogador.',
    scope: $scope,
    buttons: [
      { text: 'Cancelar' },
      {
        text: '<b>Salvar</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });
    confirmPopup.then(function(res) {
      if(res) {
        console.log($scope.data.wifi);
      } else {
        console.log('You are not sure');
      }
    });
  };

};