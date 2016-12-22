(function() {
  'use strict'

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var ctrl = this;

    ctrl.toBuyList = ShoppingListCheckOffService.toBuyList;

    ctrl.addToBought = function (index) {
      var item = ctrl.toBuyList.splice(index, 1)[0];
      ShoppingListCheckOffService.addToBought(item);
    }
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var ctrl = this;

    ctrl.alreadyBoughtList = ShoppingListCheckOffService.alreadyBoughtList;
  };

  function ShoppingListCheckOffService() {
    var service = this;

    service.toBuyList = [
      { name: "Milk", quantity: 2 },
      { name: "Bread", quantity: 2 },
      { name: "Cheese", quantity: 3 }, 
      { name: "Ham", quantity: 1 },
      { name: "Cereals", quantity: 2 },
      { name: "Pasta", quantity: 1 }
    ];

    service.alreadyBoughtList = [];

    service.addToBought = function (item) {
      service.alreadyBoughtList.push(item);
    }

    return service;
  };
})();