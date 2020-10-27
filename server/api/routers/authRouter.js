const express = require('express');
const passport = require('passport');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.get('/user', passport.authenticate('jwt', { session: false }), authController.getUser);

module.exports = router;
