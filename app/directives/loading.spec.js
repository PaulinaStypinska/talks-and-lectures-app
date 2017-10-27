
describe("link option: isLoading property", function () {
    var scope, http;
    
      beforeEach(module('myApp'));
    
      beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
          '<p>Directive test</p>'
        );
        $http = {
            pendingRequests: []
        };
        scope = $rootScope;
        $compile(scope);
        scope.$digest();
      }));

});