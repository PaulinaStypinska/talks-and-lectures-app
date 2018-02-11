
describe("mainEventsController", function () {
    var scope, httpBackend, stateParams, createController;
  
    beforeEach(function () {
      module("myApp.events");
    });
  
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_) {
      httpBackend = _$httpBackend_;
      scope = _$rootScope_.$new();
      createController = function () {
        return _$controller_("mainEventsController", {
          $scope: scope
        });
      };
      httpBackend.when("GET", "/api/event")
        .respond(200, [
          {
            lid: stateParams.id
          }
        ]);
    }));
  
    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  
  
  });