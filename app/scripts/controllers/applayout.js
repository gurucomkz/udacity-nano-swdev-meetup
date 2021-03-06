/**
 * @ngdoc function
 * @name appMeetupApp.controller:ApplayoutCtrl
 * @description
 * # ApplayoutCtrl
 * Controller of the appMeetupApp
 */
angular.module('appMeetupApp')
.controller('ApplayoutCtrl', [
    '$scope',
    '$mdSidenav',
    '$timeout',
    'Accounts',
function ($scope, $mdSidenav, $timeout, Accounts) {
    'use strict';

    $scope.currentAccount = Accounts.current;
    $scope.logout = Accounts.logout;

    $scope.sections = [
        {
            'name': 'List Events',
            'url': '#/'
        },
        {
            'name': 'Login',
            'url': '#/login'
        },
        {
            'name': 'Create Event',
            'url': '#/create'
        },
        {
            'name': 'Signup',
            'url': '#/signup'
        },
        {
            'name': 'Logout',
            'action': $scope.logout
        }
    ];

    function debounce(func, wait) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
    }
    function buildDelayedToggler(navID) {
        return debounce(function() {
            $mdSidenav(navID).toggle();
        }, 200);
    }

    $scope.toggleLeft = buildDelayedToggler('left');
}]);
