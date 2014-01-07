angular.module('faceFolio')
    .controller('person', function($stateParams, $http, $scope, $resource) {

        //load the person that was passed in via the query string
        var personResource = $resource('/people/:id', { id: $stateParams.id});
        $scope.person = personResource.get();

        $scope.updatePerson = function(form) {
            $scope.person.$save(function() {
                form.$dirty = false;
            });
        };


        $scope.statuses = [];

        $scope.addNewStatus = function() {
            $scope.statuses.push({
                text: $scope.newStatus,
                date: new Date()
            });

            $scope.newStatus = "";
        }

    });