
describe("Service: genre-service", function () {
    var genreService, $httpBackend, url, result, getCall;
  
    beforeEach(function () {
      module("myApp.services.genre-service");
    })
  
    beforeEach(inject(function (Genre, _$httpBackend_) {
      genreService = Genre;
      $httpBackend = _$httpBackend_;
      getCall = $httpBackend.when("GET", "/api/genre").respond(200, []);
    }));
  
    afterEach(function () {
      call = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it("should make a successful api call to get genres", function () {
      var expectedResults = [];
      genreService.getGenres().then(function (response) {
        result = response;
      });
      $httpBackend.flush(1);
      expect(result).toEqual(expectedResults);
    });
  
    it("should make a unsuccessful api call to get genres", function () {
      var expectedResults = "Failed to get genres";
      getCall.respond(401, "");
      genreService.getGenres().catch(function (response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result).toEqual(expectedResults);
    });
  
  });