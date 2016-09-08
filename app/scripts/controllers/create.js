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
    '$geolocation',
function ($scope, Friends, Events, $mdDialog, Accounts, $geolocation) {
    'use strict';

    $scope.map = {
        center: null,
        zoom: 12
    };

    $scope.eventTypes = Events.getEventTypes();

    $scope.allContacts = Friends.list();

    $scope.onSubmit = function(){
        if(!$scope.event.host){
            return false;
        }
        var createResult = Events.create($scope.event);
        $scope.createSuccess = createResult;
        if(!createResult){
            $scope.createMessage = 'Failed to create event. Sorry';
        }else{
            $scope.createMessage = 'Event created.';
        }
    };

    $scope.retryAction = function(){
        $scope.createSuccess = false;
        $scope.createMessage = false;
    };

    $scope.resetForm = function(){
        $scope.retryAction();
        $scope.event = {
            creatorId: Accounts.current().id,
            name: '',
            type: '',
            host: '',
            guests: [],
            startDate: null,
            endDate: null,
            wholeDay: false,
            message: ''
        };
        $scope.contacts = $scope.event.guests;
    };

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
                $scope.event.guests.push(listToAdd[x]);
            }
        });
    };

    $scope.querySearch = function(query){
        var result = [];
        query = query.toLowerCase();
        for(var x in $scope.allContacts) {
            var candidate = $scope.allContacts[x];
            if($scope.event.guests.indexOf(candidate) >= 0){
                continue;
            }
            if(candidate && candidate.name){
                if(candidate.name.toLowerCase().indexOf(query) >= 0){
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
        if($scope.meAsHost){
            $scope.event.host = $scope.myName;
        }else{
            $scope.event.host = '';
        }
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

    $scope.selectedItemChange = function(host){
        $scope.event.host = host;
        console.log('host set to ' + host);
    };

    $scope.toggleWholeDay = function(){
        $scope.event.wholeDay = !$scope.event.wholeDay;
        if($scope.event.wholeDay){
            if(!$scope.event.startDate){
                $scope.event.startDate = new Date();
            }
            $scope.event.startDate.setMinutes(0);
            $scope.event.startDate.setSeconds(0);
            $scope.event.startDate.setMilliseconds(0);

            $scope.event.endDate = new Date($scope.event.startDate);
            $scope.event.startDate.setHours(9);
            $scope.event.endDate.setHours(18);
        }
    };

    $scope.openLocation = function(ev){
        $mdDialog.show({
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            controller: 'LocationdialogCtrl',
            templateUrl: 'views/locationdialog.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            onComplete: function(){
                $scope.locationDialogOpen = true;
            },
            onRemoving: function(){
                $scope.locationDialogOpen = false;
            }
        })
        .then(function(location) {
            $scope.event.location = location;
        });
    };

    $scope.setMyLocation = function(){
        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
            $scope.event.location = position.coords.latitude + ', ' + position.coords.longitude;
        });
    };

    $scope.resetForm();
}]);
