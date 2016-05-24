/**
 * Created by stijn_000 on 17-5-2016.
 */
passport.use(new SteamStrategy({
        returnURL: 'http://localhost:3000/auth/steam/return',
        realm: 'http://localhost:3000/',
        apiKey: 'your steam API key'
    },
    function(identifier, profile, done) {
        User.findByOpenID({ openId: identifier }, function (err, user) {
            return done(err, user);
        });
    }
));