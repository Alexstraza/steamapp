var express = require('express');
var app = express();
var passport = require('passport'); 
var util = require('util')
var SteamStrategy = require('passport-steam').Strategy;
var session = require('express-session');



var data;
var userName;

app.set("view engine","jade")

app.get('/', function (req, res) {

    res.render('result');

});



passport.serializeUser(function(user,done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:30000/auth/steam/return',
    realm: 'http://localhost:30000/',
    apiKey: '8E9048FACE6C8ACD3714439FB9602D25'
  },
  function(identifier, profile, done) {
      process.nextTick(function(){

      profile.identifier = identifier;   
      return done(null, profile);
    });
  }
));


app.use(session({secret: "-- S3CR3TS3SSI0N --"}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


// main menu route
app.get('/', function (req, res) {
  var html = "<ul>\
    <li><a href='/auth/steam'>Steam</a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>";

  if (req.isAuthenticated()) {
    html += "<p>authenticated as user:</p>"
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
      //console.log(req.user._json.steamid);

    //set variable for push
      data = req;
      userName = data.user._json.personaname;
      steamId = data.user._json.steamid;

      //sql test
      var mysql      = require('mysql');
      var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '',
          database : 'steam'
      });


      connection.query('SELECT * FROM customers', function(err, rows, fields) {
               if (!err)
              console.log(rows);
          else
              console.log('Error while performing Query.');
          console.log(err);
      });

      app.get('/', function (req, res) {

        connection.query('SELECT * FROM customers', function(err, rows, fields) {
            
            if (err) 
                console.log(err)
            else
                document.getElementById("username_data").innerHTML = rows;
            
        });
    });

     




        //var post  = {id: 99};
        //var query = connection.query('INSERT INTO customers SET ?', post, function(err, result) {
        //  //console.log('Neat!');
        //});

          var query = connection.query('INSERT INTO customers (id, name) VALUES ("' + steamId + '", "' + userName + '")',
              function selectCb(err, results, fields) {


              });

  }


  res.send(html);
});





app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

 


var server = app.listen(30000, function () {
  console.log('Example app listening at http://%s:%s',
    server.address().address, server.address().port);
});

