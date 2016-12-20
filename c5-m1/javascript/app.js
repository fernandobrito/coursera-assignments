(function() {
    'use strict'

    angular.module('LunchChecker', [])
    .controller('LunchCheckerController', LunchCheckerController);

    LunchCheckerController.$inject = ["$scope"];
    function LunchCheckerController($scope) {
        $scope.items = "";
        $scope.message = "";
        $scope.cssClass = "";

        $scope.updateMessage = function() {
            var message = "";
            var cssClass = "";

            if ($scope.items != "") {
                var count = countItems();

                cssClass = "green";

                if (count <= 3) {
                    message = "Enjoy!";
                } else {
                    message = "Too much!";
                }
            } else {
                message = "Please enter data first";
                cssClass = "red";
            }

            $scope.message = message;
            $scope.cssClass = cssClass;
        };

        function countItems() {
            var items = $scope.items.split(",");
            var filteredItems = items.filter(function(value) {
                return value.trim() != "";
            });

            return filteredItems.length;
        };
    };
})();