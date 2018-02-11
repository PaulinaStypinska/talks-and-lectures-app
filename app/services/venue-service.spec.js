
describe("Service: venue-service", function () {
    var venueService, $httpBackend, url, result, getCall;
  
    beforeEach(function () {
      module("myApp.services.venue-service");
    })
  
    beforeEach(inject(function (Venue, _$httpBackend_) {
      venueService = Venue;
      $httpBackend = _$httpBackend_;
      getCall = $httpBackend.when("GET", "/api/venue").respond(200, []);
    }));
  
    afterEach(function () {
      call = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it("should make a successful api call to get venues", function () {
      var expectedResults = [];
      venueService.getVenues().then(function (response) {
        result = response;
      });
      $httpBackend.flush(1);
      expect(result).toEqual(expectedResults);
    });
  
    it("should make a unsuccessful api call to get venues", function () {
      var expectedResults = "Failed to get venue";
      getCall.respond(401, "");
      venueService.getVenues().catch(function (response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result).toEqual(expectedResults);
    });
  
  });