/**
 * @ngdoc overview
 * @name appMeetupApp
 * @description
 * # appMeetupApp
 *
 * Main module of the application.
 */
angular
  .module('appMeetupApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'nemLogging',
    'ui-leaflet',
    'ngGeolocation'
])
.config(function ($routeProvider, $mdThemingProvider) {
    'use strict';

    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    $mdThemingProvider.theme('dark-red').backgroundPalette('red').dark();

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        controllerAs: 'create'
      })
      .otherwise({
        redirectTo: '/'
      });
});
