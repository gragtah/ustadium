var express = require('express')
var request = require('request')
var config = require('./config')
// var xml2js = require('xml2js')
var vsprintf = require("sprintf-js").vsprintf

var app = express()
// var parser = new xml2js.Parser({ explicitArray: true })

// Root
app.get('/', function (req, res) {
      console.log("done")
      res.json({status: "ready"})
  // }).auth(user, pass) if needed
});

// Season schedule
// Eg. /weekly-schedule?year=2015&nfl_season=PRE&nfl_season_week=1
app.get('/season-schedule', function (req, res) {
  var q = req.query

  var uri = vsprintf("http://api.sportsdatallc.org/nfl-t1/%s/%s/schedule.json?api_key=%s",
  	[q.year, q.nfl_season, config.sports_data.api_key])

  request.get(uri,
   function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send (JSON.parse(body))
    }
  })
});

// Weekly schedule
// Eg. /weekly-schedule?year=2015&nfl_season=PRE&nfl_season_week=1
app.get('/weekly-schedule', function (req, res) {
  var q = req.query

  var uri = vsprintf("http://api.sportsdatallc.org/nfl-t1/%s/%s/%s/schedule.json?api_key=%s",
  	[q.year, q.nfl_season, q.nfl_season_week, config.sports_data.api_key])

  request.get(uri,
   function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send (JSON.parse(body))
    }
  })
});

// Game roster
// Eg. /game-roster?year=2014&nfl_season=PRE&nfl_season_week=0&away_team=NYG&home_team=BUF
app.get('/game-roster', function (req, res) {
  var q = req.query

  var uri = vsprintf("http://api.sportsdatallc.org/nfl-t1/%s/%s/%s/%s/%s/roster.json?api_key=%s",
  	[q.year, q.nfl_season, q.nfl_season_week, q.away_team, q.home_team, config.sports_data.api_key])

  request.get(uri,
   function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send (JSON.parse(body))
    }
  })
});

// Injuries
// Eg. /injuries?year=2014&nfl_season=PRE&nfl_season_week=0&away_team=NYG&home_team=BUF
app.get('/injuries', function (req, res) {
  var q = req.query

  var uri = vsprintf("http://api.sportsdatallc.org/nfl-t1/%s/%s/%s/%s/%s/injuries.json?api_key=%s",
  	[q.year, q.nfl_season, q.nfl_season_week, q.away_team, q.home_team, config.sports_data.api_key])

  request.get(uri,
   function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send (JSON.parse(body))
    }
  })
});


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

  console.log('ustadium listening at http://%s:%s', host, port);

});