(function() {
  'use strict';
  
  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'app/menuapp/items/items.template.html',
    bindings: {
      items: '<'
    }
  });
})();