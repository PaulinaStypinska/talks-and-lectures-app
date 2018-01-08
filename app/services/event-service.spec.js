
describe("Service: event-service", function () {
  var eventService, $httpBackend_, url, result;

  beforeEach(function () {
    module("myApp.services.event-service");
  })

  beforeEach(inject(function (Event, _$httpBackend_) {
    eventService = Event;
    $httpBackend = _$httpBackend_;
    spyOn(eventService, "filterCurrentEvents").and.returnValue([]);
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should make a successful api call to get events", function () {
    var expectedResults = [];
    $httpBackend.when("GET", "/api/event").respond(200, []);
    eventService.getEvents().then(function (response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result).toEqual(expectedResults);
  });
});