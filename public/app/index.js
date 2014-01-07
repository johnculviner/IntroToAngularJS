angular.module('faceFolio')
    .controller('index', function($scope, $http) {

        loadPeople();

        function loadPeople() {
            $http.get('/people')
                .then(function(resp) {
                    $scope.people = resp.data;
                })
        }
    });