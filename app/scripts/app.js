'use strict';

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
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
