(function() {
  'use strict';
  
  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'app/menuapp/categories/categories.template.html',
    bindings: {
      categories: '<'
    }
  });
})();