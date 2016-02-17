function uib_w_22_popup_controller($scope, $ionicPopup) {
  $scope.data = {}

  // A confirm dialog
  $scope.show = function() {
    var confirmPopup = $ionicPopup.show({
      template: '<input autofocus type="text" ng-model="data.wifi" placeholder="Nome do Jogador">',
      title: 'Digite o nome do jogador.',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Salvar</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
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
        onCreate($scope.data.wifi);
      } else {
        console.log('You are not sure');
      }
    });
  };

};