/**
 * @ngdoc function
 * @name appMeetupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appMeetupApp
 */
angular.module('appMeetupApp')
.controller('MainCtrl', [
     '$scope',
     'Accounts',
     'Events',
function ($scope, Accounts, Events) {
     'use strict';
     $scope.events = Events.list();
     $scope.eventTypes = Events.getEventTypes();

     $scope.currentUser = Accounts.current();

     $scope.getAccountName = function(id){
         if(!id){
             return 'Unknown';
         }
         return Accounts.get(id).name;
     };

     $scope.chipTransform = function($chip){return $chip.name;};
}]);
