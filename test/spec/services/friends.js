'use strict';

describe('Service: Friends', function () {

  // load the service's module
  beforeEach(module('appMeetupApp'));

  // instantiate service
  var Friends;
  beforeEach(inject(function (_Friends_) {
    Friends = _Friends_;
  }));

  it('should do something', function () {
    expect(!!Friends).toBe(true);
  });

});
