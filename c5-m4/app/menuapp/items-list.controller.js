(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsListController', ItemsListController);

  ItemsListController.$inject = ['itemsData']
  function ItemsListController(itemsData) {
    var itemsList = this;

    itemsList.items = itemsData.menu_items;
    
    itemsList.categoryName = function () {
      return itemsData.category.name;
    };
  };
})();