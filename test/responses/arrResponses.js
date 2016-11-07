'use strict';

var meetupRes = [
        {
          "description": "okie dokie",
          "duration": 118800000,
          "event_url": "http://www.meetup.com/skillsmatter/events/229816467/",
          "group": {
            "category": {
              "id": 34,
              "name": "tech",
              "shortname": "tech"
            },
            "name": "OpenSource & Agile Community Events"
          },
          "name": "muCon 2016: The Microservices Conference",
          "status": "upcoming",
          "time": 1478509200000,
          "venue": {
            "address_1": "10 South Place, EC2M 7EB",
            "city": "London",
            "lat": 51.518906,
            "lon": -0.086611,
            "name": "Skills Matter at CodeNode"
          }
        }
      ];
var eventbriteRes = [
        {
          "category_id": 43,
          "description": {
            "html": null,
            "text": null
          },
          "name": {
            "html": "Test Event 1",
            "text": "Test Event 1"
          },
          "organizer": {
            "description": {
              "html": "<P>An organizer</P>",
              "text": "An organizer"
            },
            "id": 5867211989,
            "name": "Andrew's Amazing Conferences"
          },
          "start": {
            "utc": "2014-02-22T19:00:00Z"
          },
          "url": "http://www.eventbrite.com/e/test-event-1-tickets-10067458038",
          "venue": {
            "address": {
              "address1": "address1",
              "address2": "address2",
              "latitude": 8572550723,
              "longitude": 957302740,
              "postal_code": "NW4 89H"
            },
            "name": "fhskjf"
          }
        }
      ]
;
module.exports = {
    meetupRes: meetupRes,
    eventbriteRes: eventbriteRes
};