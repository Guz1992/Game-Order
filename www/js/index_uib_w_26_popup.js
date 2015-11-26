function uib_w_26_popup_controller($scope, $ionicPopup) {
  $scope.data = {}
  // A confirm dialog
  $scope.show = function(time) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirmar Vitória.',
      template: 'Você tem certeza que o "' + time + '" foi Perdedor?',
      buttons: [
      { text: 'Cancelar',
        type: 'button-negative',
        onTap: function(e){
          console.log('acerola');
        }
       },
      {
        text: '<b>Confirmar</b>',
        type: 'button-positive',
        onTap: function(e) {
          removerTime(time);
        }
      }
    ]
    });
  };

};