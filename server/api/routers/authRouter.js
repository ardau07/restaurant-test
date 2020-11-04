const express = require('express');
const passport = require('passport');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router
  .route('/user')
  .get(passport.authenticate('jwt', { session: false }), authController.getUser)
  .put(passport.authenticate('jwt', { session: false }), authController.updateUser)
  .delete(passport.authenticate('jwt', { session: false }), authController.deleteUser);

module.exports = router;
