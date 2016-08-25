'use strict';

describe('Directive: pwGuide', function () {

  // load the directive's module
  beforeEach(module('appMeetupApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pw-guide></pw-guide>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pwGuide directive');
  }));
});
