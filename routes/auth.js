var express = require('express');
var router = express.Router();
var passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;



passport.serializeUser(function(user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
});


passport.use(new GitHubStrategy({
        clientID: '87a220400b6b3f40a336',
        clientSecret: '10db67927fc03e6798ae3ced7cbf29d08454b947',
        callbackURL: "http://www.buyuanwanli.top/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        // });
        done(null, profile);
    }
));


router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
})

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        res.redirect('/');
    });



module.exports = router;
