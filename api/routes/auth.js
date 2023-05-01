const express = require('express');
const passport = require('passport');
const router = express.Router();
const passportService = require('../services/passport');

const protectedRoutes = passport.authenticate('local', { session: false });

const AuthenticationController = require('../controllers/authentication_controller');





router.post('/register', AuthenticationController.register);
router.post('/login', protectedRoutes, AuthenticationController.login);


module.exports = router;