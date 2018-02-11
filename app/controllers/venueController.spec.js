
describe("venueController", function () {
    var scope, httpBackend, stateParams, createController;
  
    beforeEach(function () {
      module("myApp.venue");
    });
  
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_) {
      httpBackend = _$httpBackend_;
      scope = _$rootScope_.$new();
      stateParams = {
        id: "foo"
      };
      createController = function () {
        return _$controller_("venueController", {
          $scope: scope,
          $stateParams: stateParams
        });
      };
      httpBackend.when("GET", "/api/venue")
        .respond(200, [
          {
            vid: stateParams.id
          }
        ]);
    }));
  
    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  
    it("should set the currentNavItem as venue", function () {
      var controller = createController();
      httpBackend.flush();
      expect(scope.currentNavItem).toEqual("venue");
    });
  
    it("should set the scope vid to the stateParam id", function () {
      var controller = createController();
      httpBackend.flush();
      expect(scope.vid).toEqual(stateParams.id);
    });
  
    it("should set the scope.venue property", function () {
      var controller = createController();
      httpBackend.flush();
      expect(scope.venue.vid).toEqual(stateParams.id);
    });
  
  });