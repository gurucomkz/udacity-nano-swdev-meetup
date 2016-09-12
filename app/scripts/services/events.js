/**
 * @ngdoc service
 * @name appMeetupApp.Events
 * @description
 * # Events
 * Factory in the appMeetupApp.
 */
angular.module('appMeetupApp')
.factory('Events', function () {
    'use strict';

    var eventTypes = {
        birthday: 'Birthday party',
        conference: 'Conference talk',
        wedding: 'Wedding',
        boardGame: 'Board Game'
    };
    var events;

    function _getEvents(){
        if(!localStorage.events){
            localStorage.events = JSON.stringify([]);
        }

        events = JSON.parse(localStorage.events);
        if(!events){
            events = [];
        }
    }

    function _saveEvents(){
        localStorage.events = JSON.stringify(events);
    }

    _getEvents();
    return {
        create: function(event){
            if(!event) {
                return false;
            }
            event.id = events.length+1;
            if(event.startTime && event.startTime.getHours){
                event.startDate.setHours(event.startTime.getHours());
                event.startDate.setMinutes(event.startTime.getMinutes());
                delete event.startTime;
            }
            if(event.endTime && event.endTime.getHours){
                event.endDate.setHours(event.endTime.getHours());
                event.endDate.setMinutes(event.endTime.getMinutes());
                delete event.endTime;
            }
            events.push(event);
            _saveEvents();

            return true;
        },
        list: function(){
            return events;
        },
        getEventTypes: function () {
            return eventTypes;
        }
    };
});
