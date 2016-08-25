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
function ($scope, $mdSidenav, $timeout) {
    'use strict';

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
        }
    ];
    $scope.toggleLeft = buildDelayedToggler('left');

    function debounce(func, wait, context) {
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
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
      }, 200);
    }
}]);
