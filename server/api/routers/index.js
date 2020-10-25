const express = require('express');
const passport = require('passport');

const authRouter = require('./authRouter');
const restaurantRouter = require('./restaurantRouter');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/restaurants', passport.authenticate('jwt', { session: false }), restaurantRouter);
router.use('/reviews', passport.authenticate('jwt', { session: false }), reviewRouter);

module.exports = router;
