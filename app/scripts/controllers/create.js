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

    var dateForm = function(d){ if(!d){d=new Date();} return [1900 + d.getYear(),d.getMonth()+1,d.getDate()].map(function(p){return p > 9 ? p : '0'+p;}).join(''); };
    var _nowDate;
    $scope.nowDate = function(){
        var d = new Date();

        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);

        if(!_nowDate || _nowDate.getTime() !== d.getTime()){
            _nowDate = d;
        }
        return _nowDate;
    };

    $scope.nowTime = null;
    $scope.minEndTime = null;

    var getNormTime = function(){
        var d = new Date();
        d.setYear(1970);
        d.setMonth(0);
        d.setDate(1);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    };
    var setNowTime = function(){
        var d = getNormTime();

        if($scope.event.startDate && (dateForm() !== dateForm($scope.event.startDate))){
            d.setMinutes(0);
            d.setHours(0);
        }

        if(!$scope.nowTime || $scope.nowTime.getTime() !== d.getTime()){
            $scope.nowTime = d;
        }
        return $scope.nowTime;
    };

    var setMinEndTime = function(){
        var d = getNormTime();

        if(!($scope.event.startDate && $scope.event.endDate) ||
            $scope.event.startDate && $scope.event.endDate &&
            (dateForm($scope.event.startDate) !== dateForm($scope.event.endDate)))
        {
            d.setMinutes(0);
            d.setHours(0);
        }else{
            if($scope.event.startTime){
                d.setHours($scope.event.startTime.getHours() + 1);
            }
        }

        if(!$scope.minEndTime || $scope.minEndTime.getTime() !== d.getTime()){
            $scope.minEndTime = d;
        }
        return $scope.minEndTime;
    };

    $scope.eventTypes = Events.getEventTypes();

    $scope.allContacts = Friends.list();

    $scope.currentUser = Accounts.current();

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
            creatorId: (Accounts.current() || {}).id,
            name: '',
            type: '',
            host: '',
            guests: [],
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
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

    $scope.myName = (Accounts.current() || {}).name;
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

            if(!$scope.event.startTime){
                $scope.event.startTime = new Date($scope.nowTime);
            }
            $scope.event.startTime.setMinutes(0);
            $scope.event.startTime.setHours(9);

            $scope.event.endDate = new Date($scope.event.startDate);

            $scope.event.endTime = new Date($scope.nowTime);
            $scope.event.endTime.setMinutes(0);
            $scope.event.endTime.setHours(18);
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
    setNowTime();

    $scope.$watch('event.startTime', function(newVal){
        if(!newVal){
            return;
        }
        if(!$scope.event.startDate){
            $scope.event.startDate = $scope.nowDate();
        }

        if(!$scope.event.endTime){
            $scope.event.endTime = new Date(newVal);
            $scope.event.endTime.setHours(newVal.getHours()+1);
        }

        setMinEndTime();
        // if($scope.event.startDate && $scope.event.endDate &&
        //     (dateForm($scope.event.endDate) === dateForm($scope.event.startDate)))
        // {
        //     if($scope.event.endTime.getTime() < newVal.getTime())
        //     {
        //         $scope.event.endTime.setHours(newVal.getHours()+1);
        //     }
        // }
        //
        // if($scope.event.endTime)

    });

    $scope.$watch('event.startDate', function(newVal){
        console.log(newVal);
        if(!newVal) {return;}
        setNowTime();
        if(!$scope.event.startTime){
            $scope.event.startTime = new Date($scope.nowTime);
            $scope.event.startTime.setHours($scope.event.startTime.getHours()+1);
            $scope.event.startTime.setMinutes(0);
        }

        if(newVal > $scope.event.endDate){
            $scope.event.endDate = new Date(newVal);
        }
    });

    $scope.$watch('event.endDate', function(newVal){
        if(!newVal) {return;}
        setMinEndTime();
    });
}]);
