
describe("link option: isLoading property set to false", function () {
  var scope, elm, http;

  beforeEach(function () {
    module("myApp.directives.loading");
  })

  beforeEach(inject(function ($rootScope, $http, $compile) {

    http = $http;
    http.pendingRequests = [];
    scope = $rootScope.$new();
    elm = angular.element(
      '<div data-loading>Directive test</div>'
    );
    angular.element(document.body).append(elm);
    $compile(elm)(scope);
  }));

  it("should return false for isLoading attribute", function () {
    expect(scope.isLoading()).toBe(false);
  });

  it("should trigger hide method on the element", function () {
    spyOn($.fn, "hide");
    scope.$digest();
    expect($.fn.hide).toHaveBeenCalled();
  });

});

describe("link option: isLoading property set to true", function () {
  var scope, elm, http;

  beforeEach(function () {
    module("myApp.directives.loading");
  })

  beforeEach(inject(function ($rootScope, $http, $compile) {

    http = $http;
    http.pendingRequests = ["one"];
    scope = $rootScope.$new();
    elm = angular.element(
      '<div data-loading>Directive test</div>'
    );
    angular.element(document.body).append(elm);
    $compile(elm)(scope);
  }));

  it("should return true for isLoading attribute", function () {
    expect(scope.isLoading()).toBe(true);
  });

  it("should trigger show method on the element", function () {
    spyOn($.fn, "show");
    scope.$digest();
    expect($.fn.show).toHaveBeenCalled();
  });

});