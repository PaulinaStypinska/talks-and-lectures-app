
describe("Service: event-service", function () {
  var eventService, $httpBackend, url, result, getCall;

  beforeEach(function () {
    module("myApp.services.event-service");
  })

  beforeEach(inject(function (Event, _$httpBackend_) {
    eventService = Event;
    $httpBackend = _$httpBackend_;
    spyOn(eventService, "filterCurrentEvents").and.returnValue([]);
    getCall = $httpBackend.when("GET", "/api/event").respond(200, []);
  }));

  afterEach(function () {
    call = null;
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should make a successful api call to get events", function () {
    var expectedResults = [];
    eventService.getEvents().then(function (response) {
      result = response;
    });
    $httpBackend.flush(1);
    expect(result).toEqual(expectedResults);
  });

  it("should make a unsuccessful api call to get events", function () {
    var expectedResults = "Failed to get events";
    getCall.respond(401, "");
    eventService.getEvents().catch(function (response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result).toEqual(expectedResults);
  });

  it("should filter out dates older than now", function () {
    var testDate = new Date();
    var events = [
      {
        datetime: testDate.setDate(testDate.getDate() - 10)
      }
    ];
    expect(eventService.filterCurrentEvents(events).length).toEqual(0);
  });
});