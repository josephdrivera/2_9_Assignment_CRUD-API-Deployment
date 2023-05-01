const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../Models/User');
const config = require('../Config/config');

const localOptions = {
    usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        }
        )
    });


    const jwtOptions = {
        secret0rKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    const jwtAuth = new JwtStrategy(jwtOptions, function (payload, done) {
        User.findById(payload.sub, function (err, user) {
            if (err) {
                done(null, user)
            } else {
                done(null, false);
            }
        });
    });

});


passport.use(JwtStrategy);
passport.use(localLogin);