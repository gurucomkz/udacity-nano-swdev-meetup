'use strict';

/**
 * @ngdoc function
 * @name appMeetupApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appMeetupApp
 */
angular.module('appMeetupApp')
.controller('LoginCtrl', [
    '$scope',
    'Accounts',
function ($scope, Accounts) {
    'use strict';

    $scope.loginSuccess = true;
    $scope.loginMessage = false;
    $scope.onSubmit = function(){
        var loginResult = Accounts.login($scope.user.email, $scope.user.password);
        $scope.loginSuccess = loginResult;
        if(!loginResult){
            $scope.loginMessage = "Login failed. Maybe create account?";
        }else{
            $scope.loginMessage = "Login successfull. Please proceed.";
        }
    };
    $scope.retryAction = function(){
        $scope.loginSuccess = false;
        $scope.loginMessage = false;
    }

    $scope.user = {
        email:'',
        password:''
    };

}]);
