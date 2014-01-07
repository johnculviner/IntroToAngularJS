angular.module('faceFolio')
    .controller('statusFeed', function($scope, $http) {
        $http.get('/statuses')
            .success(function(resp) {
                $scope.statuses = resp;
            })
    })