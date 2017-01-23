(function() {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

SignUpService.$inject = [];
function SignUpService() {
  var service = this;
  var user = null;

  service.signUp = function (newUser) {
    console.log("signin up: ", newUser);
    user = newUser;
  };

  service.retrieveUser = function () {
    return user;
  };

  return service;
};

})();