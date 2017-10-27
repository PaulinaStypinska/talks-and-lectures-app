
describe("link option: isLoading property set to false", function () {
    var scope, elm, http;
    
      beforeEach(inject(function($rootScope, $http, $compile) {
        elm = angular.element(
          '<div data-loading>Directive test</div>'
        );
        http = $http;
        http = {
            pendingRequests: []
        };
        scope = $rootScope.$new();
        $compile(elm)(scope);
        scope.$digest();
      }));

      it("should return false for isLoading attribute", function() {   
        expect(scope.isLoading).toBe(false);
      });

      it("should trigger hide method on the element", function() {
        spyOn(elm, "hide");
        expect(elm.hide).toHaveBeenCalled();
      });

});