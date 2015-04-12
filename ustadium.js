var express = require('express')
var request = require('request')
var config = require('./config')
var xml2js = require('xml2js')

var app = express()
var parser = new xml2js.Parser({ explicitArray: true })

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  // res.send('Hello World!');
  request.get('http://www.google.com',
   function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("done") // Show the HTML for the Google homepage.
      // console.log(config.sports_data.api_key)

      res.send(body)
      // return res.json(body)
    }
  }).auth('api_key_here')
});


app.get('/weekly-schedule', function (req, res) {
  // res.send('Hello World!');
  request.get('http(s)://api.sportsdatallc.org/nfl-t1/2015/[nfl_season]/[nfl_season_week]/schedule.[format]?api_key=' + config.sports_data.api_key,
   function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("done")//body) // Show the HTML for the Google homepage.
      res.send(body)
    }
  }).auth('api_key_here')
});


// ==============================================================

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});