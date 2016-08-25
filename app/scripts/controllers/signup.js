'use strict';

/**
 * @ngdoc function
 * @name appMeetupApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the appMeetupApp
 */
angular.module('appMeetupApp')
.controller('SignupCtrl', [
    '$scope',
function ($scope) {
    'use strict';
    $scope.user = {
        name:'',
        email:'',
        password:'',

        company:'',
        title:'',
        birthday: null
    };

}]);
