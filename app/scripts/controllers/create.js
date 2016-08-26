/**
 * @ngdoc function
 * @name appMeetupApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the appMeetupApp
 */
angular.module('appMeetupApp')
.controller('CreateCtrl', [
    '$scope',
    'Friends',
    'Events',
    '$mdDialog',
    'Accounts',
function ($scope, Friends, Events, $mdDialog, Accounts) {
    'use strict';
    
    $scope.event = {
        name: '',
        type: '',
        host: '',

    };
    $scope.eventTypes = Events.getEventTypes();

    $scope.contacts = [];
    $scope.allContacts = Friends.list();

    $scope.openFriendsList = function(ev){
        $mdDialog.show({
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            controller: 'FriendsdialogCtrl',
            templateUrl: 'views/friendsdialog.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        })
        .then(function(listToAdd) {
            for(var x in listToAdd) {
                $scope.contacts.push(listToAdd[x]);
            }
        });
    };

    $scope.querySearch = function(query){
        var result = [];
        query = query.toLowerCase();
        for(var x in $scope.allContacts) {
            var candidate = $scope.allContacts[x];
            if(candidate && candidate.name){
                if(candidate.name.toLowerCase().indexOf(query)>=0){
                    result.push(candidate);
                }
            }
        }
        return result;
    };

    $scope.myName = Accounts.current().name;
    $scope.meAsHost = false;
    $scope.toggleMeAsHost = function(){
        $scope.meAsHost = !$scope.meAsHost;
    };
    $scope.hostSearchText = '';

    $scope.hostQuerySearch = function(query){
        var result = [];
        query = query.toLowerCase();
        for(var x in $scope.allContacts) {
            var candidate = $scope.allContacts[x];
            if(candidate && candidate.name){
                if(candidate.name.toLowerCase().indexOf(query)>=0){
                    result.push(candidate.name);
                }
            }
        }
        return result;
    };

}]);
