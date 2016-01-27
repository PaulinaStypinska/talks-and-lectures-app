var express = require('express');
var router = express.Router();
var path = require('path');


//connect to the venues middleware
var venue = require('../lib/data/venue.js');
var lecture = require('../lib/data/lecture.js');



router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});


router.get('/venue', function(req, res) {

    venue.retrieve(function(err, results){
        if (err){
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        return res.json(results);
    })


});

router.get('/event', function(req, res) {

    lecture.retrieve(function(err, results){
            if (err){
              console.log(err);
              return res.status(500).json({ success: false, data: err});
            }
            return res.json(results);
        })

});

module.exports = router;
