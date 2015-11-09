function uib_w_26_popup_controller($scope, $ionicPopup) {

  // A confirm dialog
  $scope.show = function(time) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirmar Vitória.',
      template: 'Você tem certeza que o "' + time + '" foi campeão?',
      buttons: [
      { text: 'Cancelar' },
      {
        text: '<b>Confirmar</b>',
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
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

};