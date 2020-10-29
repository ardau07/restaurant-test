const express = require('express');
const passport = require('passport');

const authRouter = require('./authRouter');
const restaurantRouter = require('./restaurantRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/restaurants', passport.authenticate('jwt', { session: false }), restaurantRouter);

module.exports = router;
