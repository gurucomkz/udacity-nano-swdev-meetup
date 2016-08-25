'use strict';

describe('Controller: ApplayoutCtrl', function () {

  // load the controller's module
  beforeEach(module('appMeetupApp'));

  var ApplayoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApplayoutCtrl = $controller('ApplayoutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ApplayoutCtrl.awesomeThings.length).toBe(3);
  });
});
