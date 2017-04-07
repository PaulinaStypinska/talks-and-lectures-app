var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var token = process.env.PRERENDER_TOKEN;

//methods

var routes = require('./app/routes/index');

var app = express();
var port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//for prerender set up

app.use(require('prerender-node').set('prerenderToken', token));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'app')));


app.use('/', routes);   



app.use(function(req, res, next) {
  console.log("in this function");
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error');
});



// app.use(function(err, req, res) {
//     res.status(err.status || 500);
//     res.render('error.html', {
//       message: err.message,
//       error: err
//     });
//   });



// app.use(function(err, req, res) {
//   res.status(err.status || 500);
//   res.render('error.html', {
//     message: err.message,
//     error: {}
//   });
// });

app.listen(port, function(){
  console.log("listening in on port 8080");
});

module.exports = app;
