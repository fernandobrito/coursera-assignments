(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig)
  .run(function($rootScope) {

    $rootScope.$on('$stateChangeError', 
      function(event, toState, toParams, fromState, fromParams, error){ 
        // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
        event.preventDefault();
        console.log(error); 
    })
  });

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/menuapp/templates/home.template.html'
    })

    .state('categoriesList', {
      url: '/categories',
      templateUrl: 'app/menuapp/templates/categories-list.template.html',
      controller: 'CategoriesListController as categoriesList',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categoriesList.itemsList', {
      url: '/{categoryShortName}/items',
      templateUrl: 'app/menuapp/templates/items-list.template.html',
      controller: 'ItemsListController as itemsList',
      resolve: {
        itemsData: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
  };
})();