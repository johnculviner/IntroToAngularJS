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
    })

    .directive('fieldLocker', function() {
        return {
            scope: true,
            transclude: true,
            replace: true,
            template: '<span>' +
                        '<span ng-show="locked">{{value}}</span>' +
                        '<span ng-show="!locked" ng-transclude="">textbox will go here</span>' +
                        '<button ng-click="locked = false" ng-show="locked">Unlock</button>' +
                      '</span>',
            link: function(scope, ele, attrs) {

                scope.locked = true;

                scope.$watch(attrs.fieldLocker, function(val) {
                    scope.value = val;
                })


                scope.unlock = function() {
                    scope.locked = false;
                };

                scope.$on('saved', function() {
                    scope.locked = true;
                })

            }
        }
    });


