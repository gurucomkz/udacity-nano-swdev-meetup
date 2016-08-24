'use strict';

/**
 * @ngdoc service
 * @name appMeetupApp.Accounts
 * @description
 * # Accounts
 * Factory in the appMeetupApp.
 */
angular.module('appMeetupApp')
  .factory('Accounts', function () {
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
