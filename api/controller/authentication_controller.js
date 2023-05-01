const user = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
}

const signIn = (req, res, next) => {
    const user = req.user;
    res.send({ token: tokenForUser(user) });
}

const register = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }

    user.findOne({ email }, (err, existingUser) => {
        if (err) return next(err);

        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        const user = new User({ email, password });

        user.save(err => {
            if (err) return next(err);
            res.json({ user_id: user._id, token: tokenForUser(user) });
        });
    });
}

const login = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) });
}

module.exports = {
    signIn,
    register,
    login
}
