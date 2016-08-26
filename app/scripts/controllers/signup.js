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
    'Accounts',
function ($scope, Accounts) {
    'use strict';

    $scope.signupSuccess = true;
    $scope.signupMessage = false;
    $scope.onSubmit = function(){
        var signupResult = Accounts.create($scope.user);
        $scope.signupSuccess = signupResult;
        if(!signupResult){
            $scope.signupMessage = "User already exists. You can login, you know :)";
        }else{
            $scope.signupMessage = "Account created successfully. You can login now.";
        }
    };
    $scope.retryAction = function(){
        $scope.signupSuccess = false;
        $scope.signupMessage = false;
    };
    $scope.user = {
        name:'',
        email:'',
        password:'',

        company:'',
        title:'',
        birthday: null
    };

}]);
