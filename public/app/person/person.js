angular.module('faceFolio')
    .controller('person', function($stateParams, $http, $scope, $resource) {

        //load the person that was passed in via the query string
        var personResource = $resource('/people/:id', { id: $stateParams.id});
        $scope.person = personResource.get();

        $scope.updatePerson = function(form) {
            $scope.person.$save(function() {
                form.$dirty = false;
            });
        }


        var personStatuses = $resource('/people/:personId/statuses/:statusId',
            { personId : $stateParams.id, statusId:'@id'} );

        queryStatuses();

        function queryStatuses() {
            $scope.statuses = personStatuses.query();
        }

        $scope.addNewStatus = function() {

            var newStatus = new personStatuses({
                text: $scope.newStatus,
                date: new Date()
            });
            newStatus.$save();
            $scope.newStatus = "";

            queryStatuses();
        }


        $scope.deleteStatus = function(status) {
            status.$delete();
            queryStatuses();
        }
    });