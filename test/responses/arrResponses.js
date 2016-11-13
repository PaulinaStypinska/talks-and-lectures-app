'use strict';

var meetupRes = [
        {
          "description": "okie dokie",
          "url": "http://www.meetup.com/skillsmatter/events/229816467/",
          "category_id": 34,
          "title": "muCon 2016: The Microservices Conference",
          "datetime": "2016-11-07T09:00:00.000Z",
          "venue": {
            "address1": "10 South Place, EC2M 7EB",
            "address2": "London",
            "latitude": 51.518906,
            "longitude": -0.086611,
            "name": "Skills Matter at CodeNode",
            "post_code": null
          }
        }
      ];
var eventbriteRes = [
        {
          "category_id": 43,
          "description": null,
          "title": "Test Event 1",
          "datetime": "2014-02-22T19:00:00Z",
          "url": "http://www.eventbrite.com/e/test-event-1-tickets-10067458038",
          "venue": {
              "address1": "address1",
              "address2": "address2",
              "latitude": 8572550723,
              "longitude": 957302740,
              "post_code": "NW4 89H",
              "name": "fhskjf"
          }
        }
      ];

var dataArr = [ 
        {
              "description": "okie dokie",
              "url": "http://www.meetup.com/skillsmatter/events/229816467/",
              "category_id": 34,
              "title": "muCon 2016: The Microservices Conference",
              "datetime": "2016-11-07T09:00:00.000Z",
              "venue": {
                "address1": "10 South Place, EC2M 7EB",
                "address2": "London",
                "latitude": 51.518906,
                "longitude": -0.086611,
                "name": "Skills Matter at CodeNode",
                "post_code": null
              }
            }, {
              "category_id": 43,
              "description": null,
              "title": "Test Event 1",
              "datetime": "2014-02-22T19:00:00Z",
              "url": "http://www.eventbrite.com/e/test-event-1-tickets-10067458038",
              "venue": {
                  "address1": "address1",
                  "address2": "address2",
                  "post_code": "SE1 7DD",
                  "latitude": 51.515206,
                  "longitude": -0.089611,
                  "name": "afh;eief"
              }
            }
];
module.exports = {
    meetupRes: meetupRes,
    eventbriteRes: eventbriteRes,
    dataArr: dataArr
};