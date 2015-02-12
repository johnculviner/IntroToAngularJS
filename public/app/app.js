angular.module('faceFolio', ['ui.router', 'ngResource'])

    .config(function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/"); //default on unmatched
        $stateProvider
            .state('statusFeed', {
                url: '/',
                templateUrl: 'app/statusFeed/statusFeed.html',
                controller: 'statusFeed'
            })
            .state('person', {
                url: '/person/:id',
                templateUrl: 'app/person/person.html',
                controller: 'person'
            });
    });