(function() {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService', 'MenuService', '$scope'];
function SignUpController(SignUpService, MenuService, $scope) {
  var $ctrl = this;
  
  $ctrl.signedUp = false;

  $ctrl.submit = function () {
    validMenuItem($ctrl.user.favoriteItem).then(function (itemExists) {
      if (itemExists) {
        SignUpService.signUp($ctrl.user);
        $ctrl.signedUp = true;
        $ctrl.user = {};

        $scope.newsletterForm.$setPristine();
        $scope.newsletterForm.$setUntouched();
      } else {
        $ctrl.user.favoriteItem = "";
        alert('Sorry, but we could not locate your favorite menu item. Please make sure you entered a valid code.');
      };
    }); 
  };

  var validMenuItem = function (shortName) {
    return MenuService.getMenuItem(shortName).then(function (item) {
      return item != null;
    });
  };
};

})();