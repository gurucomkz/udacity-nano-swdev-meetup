'use strict';

/**
 * @ngdoc directive
 * @name appMeetupApp.directive:autofocus
 * @description
 * # autofocus
 * Directive needed to make autofocus work while switching between angular routes
 */
angular.module('appMeetupApp')
.directive('autofocus', [
    '$timeout',
function($timeout) {
    return {
        scope: {
            focusMeIf:"="
        },
        link: function ( scope, element, attrs ) {
            if (scope.focusMeIf===undefined || scope.focusMeIf) {
                $timeout( function () { element[0].focus(); } );
            }
        }
    };
}]);
