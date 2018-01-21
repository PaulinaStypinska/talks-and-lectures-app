
describe("eventController", function () {
  var scope, httpBackend, stateParams, createController;

  beforeEach(function () {
    module("myApp.event");
  });

  beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_) {
    httpBackend = _$httpBackend_;
    scope = _$rootScope_.$new();
    stateParams = {
      id: "foo"
    };
    createController = function () {
      return _$controller_("eventController", {
        $scope: scope,
        $stateParams: stateParams
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

  it("should set the currentNavItem as event", function () {
    var controller = createController();
    httpBackend.flush();
    expect(scope.currentNavItem).toEqual("event");
  });

  it("should set the scope lid to the stateParam id", function () {
    var controller = createController();
    httpBackend.flush();
    expect(scope.lid).toEqual(stateParams.id);
  });

  it("should set the scope.lecture property", function () {
    var controller = createController();
    httpBackend.flush();
    expect(scope.lecture.lid).toEqual(stateParams.id);
  });

});