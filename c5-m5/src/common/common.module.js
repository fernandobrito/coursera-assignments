(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://pacific-citadel-76281.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
