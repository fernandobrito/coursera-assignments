(function() {
'use strict';

angular.module('public')
.config(routeConfig)
.run(["$rootScope", function($rootScope) {
  $rootScope.$on('$stateChangeError', 
  function(event, toState, toParams, fromState, fromParams, error) { 
        console.log(error);
        event.preventDefault();
  });
}]);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signup', {
      url: '/sign-up',
      templateUrl: 'src/public/sign-up/sign-up.html',
      controller: 'SignUpController as signUpCtrl'
    })
    .state('public.myinfo', {
      url: '/my-info',
      templateUrl: 'src/public/my-info/my-info.html',
      controller: 'MyInfoController as myInfoCtrl',
      resolve: {
        user: ['SignUpService', function (SignUpService) {
          return SignUpService.retrieveUser();
        }],
        item: ['MenuService', 'user', function (MenuService, user) {
          if (user) {
            return MenuService.getMenuItem(user.favoriteItem);
          } else {
            return null;
          }
        }]
      }
    });
}
})();
