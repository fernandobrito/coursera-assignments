(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['$state', 'categories']
  function CategoriesListController($state, categories) {
    var categoriesList = this;

    categoriesList.categories = categories;

    categoriesList.noCategorySelected = function () {
      return $state.current.name === 'categoriesList';
    };
  };
})();