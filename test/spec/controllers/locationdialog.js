'use strict';

describe('Controller: LocationdialogCtrl', function () {

  // load the controller's module
  beforeEach(module('appMeetupApp'));

  var LocationdialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LocationdialogCtrl = $controller('LocationdialogCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LocationdialogCtrl.awesomeThings.length).toBe(3);
  });
});
