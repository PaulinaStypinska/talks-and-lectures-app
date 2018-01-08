
angular.module('myApp.services.event-service', [])

  .factory('Event', function Event($http, $q) {

    var service = {
      events: {},
      getEvents: getEvents,
      filterCurrentEvents: filterCurrentEvents
    };

    return service;

    function getEvents() {

      let def = $q.defer();

      $http.get('/api/event', { 'Accept': 'application/json' })
        .success(function (response) {
          response = filterCurrentEvents(response);
          service.events = response;
          def.resolve(response);
        })
        .error(function () {
          def.reject("Failed to get events");
        });
      return def.promise;
    }

    function filterCurrentEvents(events) {
      return events.filter(function (el, i) {
        return events[i].datetime >= new Date().toISOString()
      });
    }

  });
