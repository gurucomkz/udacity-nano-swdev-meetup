'use strict';

/**
 * @ngdoc function
 * @name appMeetupApp.controller:FriendsdialogCtrl
 * @description
 * # FriendsdialogCtrl
 * Controller of the appMeetupApp
 */
angular.module('appMeetupApp')
.controller('FriendsdialogCtrl', [
    '$scope',
    '$mdDialog',
function ($scope, $mdDialog) {
    var selected = [];

    $scope.toggle = function(item){
        var index = selected.indexOf(item);
        if(index < 0){
            selected.push(item);
        }else{
            selected.splice(index, 1);
        }
        console.log(selected);
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.apply = function() {
        $mdDialog.hide(selected);
    };
}]);
