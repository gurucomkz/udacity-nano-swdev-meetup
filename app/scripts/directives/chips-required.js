'use strict';

/**
 * @ngdoc directive
 * @name appMeetupApp.directive:chipsRequired
 * @description
 * # chipsRequired
 */
angular.module('appMeetupApp')
.directive('chipsRequired', [
    '$timeout',
function ($timeout) {
    return {
        scope:{
            validIf:'='
        },
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            var $acCtrl;
            $timeout(function() {
                var s = element[0].querySelector('md-autocomplete-wrap'),
                    $acScope = angular.element(s).scope();

                $acCtrl = $acScope.$mdAutocompleteCtrl;

                $acCtrl.isRequired = true;
            });

            scope.$watchCollection('validIf', function(newVal){
                if($acCtrl){
                    $acCtrl.isRequired = !newVal || !( Array.isArray(newVal) && newVal.length>0 || newVal.length || parseFloat(newVal) );
                }
            })
        }
    };
}]);
