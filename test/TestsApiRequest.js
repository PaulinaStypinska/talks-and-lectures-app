'use strict';

var assert = require('assert');
var nock = require('nock');
var apiRequest = require('../lib/data/db-population-example/makeApiRequest');
var request = require('request');
var apiRes = require('./responses/apiResponses');
var arrRes = require('./responses/arrResponses');
var insertData = require('../lib/data/db-population-example/insertData');

const MEETUP_URL = 'http://api.meetup.com/';
const EVENTBRITE_URL = 'https://www.eventbriteapi.com/v3/';



describe('api requests to populate tables', function() {
    this.timeout(0);
    
    it('tests nock', function (done) {
        nock('http://www.google.com')
        .get('/')
        .reply(200, 'Hello!')
        
        request('http://www.google.com/', function (err, res, body) {
            if (!err && res.statusCode == 200) {
                assert(body, 'Hello!');
                done();
            } else {
                throw new Error('Failed nock test #1');
            }
        });
        
    });
    
    it('should get a response from meetup',  function (done){
        var meetupKey = process.env.MEETUP_TOKEN;
        var meetupMethod = '2/open_events';
        var meetupParams = '&country=GB&city=London&fields=category,venue';
        nock(MEETUP_URL)
        .get(`/${meetupMethod}`)
        .query({key: meetupKey, country: 'GB', city: 'London', fields: 'category,venue'})
        .reply(200, 'results')
        apiRequest.sendRequest('http://api.meetup.com/%s?key=%s', meetupMethod, meetupKey, meetupParams, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                console.log(res.req.headers.host);
                assert(body, 'results');
                done();
            } else {
                throw new Error('Fail');
            }
        }); 
    });
    
    it('should get a response from eventbrite', function (done) {
        var eventbriteKey = process.env.EVENTBRITE_TOKEN;
        var eventbriteMethod = 'events/search/';
        var eventbriteParams = '&expand=category,format,venue';
        nock(EVENTBRITE_URL)
        .get(`/${eventbriteMethod}`)
        .query({token: eventbriteKey, expand: 'category,format,venue'})
        .reply(200, 'results')
        apiRequest.sendRequest('https://www.eventbriteapi.com/v3/%s?token=%s', eventbriteMethod, eventbriteKey, eventbriteParams, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                console.log(res.req.headers.host);
                assert(body, 'results');
                done();
            } else {
                throw new Error('Fail');
            }
        }); 
    });
    
    it('should transform results from meetup', function () {
        var response = {
            statusCode: 200,
            req: {
                headers: {
                        host: 'api.meetup.com'
                }    
            }
        };
        var body = JSON.stringify(apiRes.meetup);
        var actualRes = apiRequest.transformResults(null, response, body);
        assert.deepEqual(actualRes, arrRes.meetupRes, 'results from meetup are fine');
    });
    
    it('should transform results from eventbrite', function () {
        var response = {
            statusCode: 200,
            req: {
                headers: {
                        host: 'api.eventbrite.com'
                }    
            }
        };
        var body = JSON.stringify(apiRes.eventbrite);
        var actualRes = apiRequest.transformResults(null, response, body);
        assert.deepEqual(actualRes, arrRes.eventbriteRes, 'results from eventbrite are fine');
    });
    
    
});