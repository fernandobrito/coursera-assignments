(function() {
  'use strict'

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .directive('foundItems', FoundItemsDirective)
  .service('MenuSearchService', MenuSearchService);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.term = '';

    ctrl.search = function(term) {
      MenuSearchService.getMatchedMenuItems(term).then(function(result) {
        ctrl.found = result;
      });
    };

    ctrl.remove = function(index) {
      ctrl.found.splice(index, 1)[0];
    };

    ctrl.isEmpty = function() {
      return (ctrl.found.length === 0);
    };
  };

  MenuSearchService.$inject = ['$http', '$q']
  function MenuSearchService($http, $q) {
    var service = this;
    var URL = 'https://davids-restaurant.herokuapp.com/menu_items.json';

    service.getMatchedMenuItems = function (term) {
      // If empty term, returns empty array inside promise
      if (term === '') {
        var deferred = $q.defer();
        deferred.resolve([]);
        return deferred.promise;
      }

      return $http.get(URL).then(function (result) {
        // process result and only keep items that match
        var foundItems = result.data.menu_items;

        var filteredItems = foundItems.filter(function(item) {
          return (item.description.toLowerCase().indexOf(term) !== -1)
        });

        // return processed items
        return filteredItems;
      });
    };

    return service;
  };

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'A',
      templateUrl: 'templates/items.html',
      scope: {
        items: '<foundItems',
        onRemove: '&'
      }
    };

    return ddo;
  };
})();