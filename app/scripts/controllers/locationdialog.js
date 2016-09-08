'use strict';

/**
 * @ngdoc function
 * @name appMeetupApp.controller:LocationdialogCtrl
 * @description
 * # LocationdialogCtrl
 * Controller of the appMeetupApp
 */
angular.module('appMeetupApp')
.controller('LocationdialogCtrl', [
    '$scope',
    '$mdDialog',
    '$geolocation',
function ($scope, $mdDialog, $geolocation) {

    $scope.map = {
        center: {
            lat: 0,
            lng: 0,
            zoom: 1
        },
        markers:{
            place:{
                lat: 40.095,
                lng: -3.823,
                focus: true,
                draggable: true
            },
        },
        decoded:''
    };

    $scope.mapEvents = {
        map:{
            enable: ['dragend','dblclick'],
            logic: 'emit'
        }
    };

    //  http://nominatim.openstreetmap.org/reverse?format=json&lat=52.5487429714954&lon=-1.81602098644987&zoom=18&addressdetails=1

    $scope.$on('leafletDirectiveMap.dblclick', function(event, marker){
        console.log([event, marker]);
        $scope.map.markers.place.lat = marker.leafletEvent.latlng.lat;
        $scope.map.markers.place.lng = marker.leafletEvent.latlng.lng;
    });

    $scope.$on('leafletDirectiveMap.dragend', function(event, marker){
        console.log([event, marker]);
    });

    $geolocation.getCurrentPosition({
        timeout: 60000
    }).then(function(position) {
        $scope.map.center.lat = position.coords.latitude;
        $scope.map.center.lng = position.coords.longitude;

        $scope.map.markers.place.lat = position.coords.latitude;
        $scope.map.markers.place.lng = position.coords.longitude;

        $scope.map.center.zoom = 18;
    });

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.apply = function() {
        $mdDialog.hide($scope.map.markers.place.lat + ', ' + $scope.map.markers.place.lng);
    };
}]);
