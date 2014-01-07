angular.module('faceFolio', [])

    .controller('person', function($scope) {

        $scope.statuses = [];

        $scope.addNewStatus = function() {
            $scope.statuses.push({
                text: $scope.newStatus,
                date: new Date()
            });

            $scope.newStatus = "";
        }
    });
