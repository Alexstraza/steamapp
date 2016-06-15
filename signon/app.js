var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , session = require('express-session')
  , SteamStrategy = require('passport-steam').Strategy
  , steam = require('steam-web');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:20000/auth/steam/return',
    realm: 'http://localhost:20000/',
    apiKey: '8E9048FACE6C8ACD3714439FB9602D25'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
    idsteamo = profile.id;
      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

var app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: '-- S3CR3TS3SSI0N --',
    name: 'S3SS10N1D',
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/randomizegame', ensureAuthenticated, function(req, res){
  res.render('randomizegame', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
  console.log(req);
}

var server = app.listen(20000, function () {
  console.log('Sauna is running at at http://localhost',
    server.address().address, server.address().port);
});



var s = new steam({
    apiKey: '8E9048FACE6C8ACD3714439FB9602D25',
    format: 'json' //optional ['json', 'xml', 'vdf'],

});


s.getOwnedGames({
    steamid: '76561198058444302',
    callback: function(err,data) {
        var totalGames = (data.response.game_count);
        var result = Math.floor((Math.random() * totalGames  ));
        var randomGame = (data.response.games[result]);
        console.log(randomGame.appid);
    }
})

//76561198058444302
//s.getFriendList({
//    steamid: '76561198058444302',
//    relationship: 'all', //'all' or 'friend'
//    callback: function (err, data) {
//        console.log(data);
//        console.log(JSON.stringify(data))
//    },
//})


