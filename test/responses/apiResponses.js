'use strict';

var responseObjects = {
    "meetup": {
        "results": [{
            "venue": {
                "city": "London",
                "address_1": "10 South Place, EC2M 7EB",
                "name": "Skills Matter at CodeNode",
                "lon": -0.086611,
                "lat": 51.518906
            },
            "description": "okie dokie",
            "event_url": "http://www.meetup.com/skillsmatter/events/229816467/",
            "duration": 118800000,
            "name": "muCon 2016: The Microservices Conference",
            "time": 1478509200000,
            "group": {
            "name": "OpenSource & Agile Community Events",
                "category": {
                    "name": "tech",
                    "id": 34,
                    "shortname": "tech"
                }
            },
            "status": "upcoming"
            }]
    },
    "eventbrite": {
        "events": [
        {
            "name": {
                "text": "Test Event 1",
                "html": "Test Event 1"
            },
            "description": {
                "text": null,
                "html": null
            },
            "organizer": {
                "description": {
                    "text": "An organizer",
                    "html": "<P>An organizer<\/P>"
                },
                "id": 5867211989,
                "name": "Andrew's Amazing Conferences"
            },
            "venue": {
                "name": "fhskjf",
                "address": {
                    "address1": "address1",
                    "address2": "address2",
                    "postal_code": "NW4 89H",
                    "longitude": 957302740,
                    "latitude": 8572550723
                }
            },
            "url": "http://www.eventbrite.com/e/test-event-1-tickets-10067458038",
            "start": {
                "utc": "2014-02-22T19:00:00Z"
            },
            "category_id": 43
        }]
    }
};

module.exports = responseObjects;