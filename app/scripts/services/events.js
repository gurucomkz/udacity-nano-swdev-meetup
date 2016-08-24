'use strict';

/**
 * @ngdoc service
 * @name appMeetupApp.Events
 * @description
 * # Events
 * Factory in the appMeetupApp.
 */
angular.module('appMeetupApp')
  .factory('Events', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
