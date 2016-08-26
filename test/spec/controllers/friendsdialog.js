'use strict';

describe('Controller: FriendsdialogCtrl', function () {

  // load the controller's module
  beforeEach(module('appMeetupApp'));

  var FriendsdialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FriendsdialogCtrl = $controller('FriendsdialogCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FriendsdialogCtrl.awesomeThings.length).toBe(3);
  });
});
