'use strict';

var assert = require('assert');
var nock = require('nock');
var apiRequest = require('../lib/data/db-population-example/makeApiRequest');
var request = require('request');

const MEETUP_URL = 'http://api.meetup.com/';
const EVENTBRITE_URL = 'https://www.eventbriteapi.com/v3/';


describe('api requests to populate tables', () => {
    
    it('tests nock',  (done) => {
        nock('http://www.google.com')
        .get('/')
        .reply(200, 'Hello!')
        
        request('http://www.google.com/', (err, res, body) => {
            if (!err && res.statusCode == 200) {
                assert(body, 'Hello!');
                done();
            } else {
                throw new Error('Failed nock test #1');
            }
        });
        
    });
    
    it('should get a response from meetup',  (done) => {
        var meetupKey = process.env.MEETUP_TOKEN;
        var meetupMethod = '2/open_events';
        var meetupParams = '&country=GB&city=London';
        nock(MEETUP_URL)
        .get(`/${meetupMethod}`)
        .query({key: meetupKey, country: 'GB', city: 'London'})
        .reply(200, 'results')
        .log(console.log)
        apiRequest.sendRequest('http://api.meetup.com/%s?key=%s', meetupMethod, meetupKey, meetupParams, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(res.req.headers.host);
                assert(body, 'results');
                done();
            } else {
                throw new Error('Fail');
            }
        }); 
    });
    
    it('should get a response from eventbrite',  (done) => {
        var eventbriteKey = process.env.EVENTBRITE_TOKEN;
        var eventbriteMethod = 'events/search/';
        var eventbriteParams = '&expand=category,format,venue';
        nock(EVENTBRITE_URL)
        .get(`/${eventbriteMethod}`)
        .query({token: eventbriteKey, expand: 'category,format,venue'})
        .reply(200, 'results')
        .log(console.log)
        apiRequest.sendRequest('https://www.eventbriteapi.com/v3/%s?token=%s', eventbriteMethod, eventbriteKey, eventbriteParams, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(res.req.headers.host);
                assert(body, 'results');
                done();
            } else {
                throw new Error('Fail');
            }
        }); 
    });
    
});