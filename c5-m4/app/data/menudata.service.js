(function() {
  'use strict';

  angular.module('Data')
  .service('MenuDataService', MenuDataService)
  .constant('ENDPOINT', 'https://davids-restaurant.herokuapp.com');

  MenuDataService.$inject = ['$http', '$q', 'ENDPOINT'];
  function MenuDataService($http, $q, ENDPOINT) {
    var service = this;

    service.getAllCategories = function () {
      var URL = ENDPOINT + '/categories.json';

      return $http.get(URL).then(function (result) {
        return result.data;
      });
    };

    service.getItemsForCategory = function (categoryShortName) {
      var URL = ENDPOINT + '/menu_items.json?category=' + categoryShortName;

      return $http.get(URL).then(function (result) {
        return result.data;
      });
    };
  };
})();