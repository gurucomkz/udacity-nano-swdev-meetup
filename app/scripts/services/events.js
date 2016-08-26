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
            localStorage.events = JSON.stringify([false]);
        }

        events = JSON.parse(localStorage.events);
        if(!events){
            events = [false];
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
            event.id = event.length;
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
